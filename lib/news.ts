import { unstable_noStore as noStore } from "next/cache";

import { DEFAULT_COUNTRY, FEED_PAGE_SIZE } from "@/lib/constants";
import type { Article, CategoryValue, SortMode } from "@/types";

type FeedParams = {
  preferences: CategoryValue[];
  country?: string;
  page: number;
  search?: string;
  category?: string;
  sort?: SortMode;
  latest?: boolean;
};

type NewsApiArticle = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
  author: string | null;
  content: string | null;
};

const newsCache = new Map<string, { expiresAt: number; data: NewsApiArticle[] }>();
const CACHE_TTL_MS = 1000 * 60 * 10;

function buildCacheKey(parts: string[]) {
  return parts.join("::");
}

function categoryQuery(category: string) {
  return new URLSearchParams({
    apiKey: process.env.NEWS_API_KEY || "",
    category,
    pageSize: String(FEED_PAGE_SIZE),
    language: "en"
  });
}

async function fetchCategoryArticles(category: CategoryValue, country: string, page: number) {
  const params = categoryQuery(category);
  params.set("country", country);
  params.set("page", String(page));

  const cacheKey = buildCacheKey([category, country, String(page)]);
  const cached = newsCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  const response = await fetch(`https://newsapi.org/v2/top-headlines?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 600 }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`NewsAPI request failed: ${response.status} ${errorBody}`);
  }

  const json = (await response.json()) as { articles: NewsApiArticle[] };
  newsCache.set(cacheKey, {
    data: json.articles || [],
    expiresAt: Date.now() + CACHE_TTL_MS
  });
  return json.articles || [];
}

function normalizeArticle(article: NewsApiArticle, category: CategoryValue): Article {
  return {
    id: Buffer.from(article.url).toString("base64"),
    title: article.title,
    description: article.description || "Read the full story for more details.",
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    source: article.source?.name || "Unknown source",
    author: article.author,
    category,
    content: article.content
  };
}

function dedupeArticles(articles: Article[]) {
  const seen = new Map<string, Article>();
  for (const article of articles) {
    const key = article.url || article.title;
    if (!seen.has(key)) {
      seen.set(key, article);
    }
  }
  return Array.from(seen.values());
}

function scoreArticle(article: Article, search: string) {
  if (!search) return 0;
  const lowerSearch = search.toLowerCase();
  const haystack = `${article.title} ${article.description} ${article.source}`.toLowerCase();
  return haystack.includes(lowerSearch) ? 10 : 0;
}

export async function getPersonalizedFeed({
  preferences,
  country = DEFAULT_COUNTRY,
  page,
  search = "",
  category = "all",
  sort = "relevance",
  latest = false
}: FeedParams) {
  noStore();

  if (!process.env.NEWS_API_KEY) {
    throw new Error("NEWS_API_KEY is missing.");
  }

  const selectedCategories: CategoryValue[] =
    category !== "all"
      ? preferences.filter((item): item is CategoryValue => item === category)
      : preferences.length > 0
        ? preferences
        : ["technology"];

  const results = await Promise.all(
    selectedCategories.map(async (selectedCategory) => {
      const records = await fetchCategoryArticles(selectedCategory, country, page);
      return records.map((article) => normalizeArticle(article, selectedCategory));
    })
  );

  const query = search.trim().toLowerCase();

  let articles = dedupeArticles(results.flat()).filter((article) => {
    if (!query) return true;
    return `${article.title} ${article.description} ${article.source}`.toLowerCase().includes(query);
  });

  articles = articles.sort((a, b) => {
    if (latest || sort === "date") {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }

    return scoreArticle(b, query) - scoreArticle(a, query);
  });

  return {
    articles,
    page,
    hasMore: articles.length >= Math.min(FEED_PAGE_SIZE, selectedCategories.length * FEED_PAGE_SIZE),
    totalResults: articles.length
  };
}
