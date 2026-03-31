"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useFeedStore } from "@/store/feed-store";
import type { Article, FeedResponse } from "@/types";
import { ArticleCard } from "@/components/feed/article-card";
import { FeedSkeleton } from "@/components/feed/feed-skeleton";
import { EmptyState } from "@/components/shared/empty-state";

type FeedClientProps = {
  initialArticles: Article[];
  initialSavedUrls: string[];
};

export function FeedClient({ initialArticles, initialSavedUrls }: FeedClientProps) {
  const { category, search, sort, latest, favoritesOnly } = useFeedStore();
  const didHydrate = useRef(false);
  const [articles, setArticles] = useState<Article[]>(
    initialArticles.map((article) => ({
      ...article,
      isSaved: initialSavedUrls.includes(article.url)
    }))
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filterKey = useMemo(() => {
    const params = new URLSearchParams({
      category,
      search,
      sort,
      latest: String(latest),
      favoritesOnly: String(favoritesOnly)
    });

    return params.toString();
  }, [category, favoritesOnly, latest, search, sort]);

  const loadFeed = useCallback(
    async (nextPage: number, replace = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(nextPage),
          category,
          search,
          sort,
          latest: String(latest),
          favoritesOnly: String(favoritesOnly)
        });

        const response = await fetch(`/api/feed?${params.toString()}`);
        const json = (await response.json()) as FeedResponse;

        const nextArticles = json.articles.map((article) => ({
          ...article,
          isSaved: initialSavedUrls.includes(article.url) || Boolean(article.isSaved)
        }));

        setArticles((current) => (replace ? nextArticles : [...current, ...nextArticles]));
        setHasMore(json.hasMore);
        setPage(nextPage);
      } finally {
        setLoading(false);
      }
    },
    [category, favoritesOnly, initialSavedUrls, latest, search, sort]
  );

  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      return;
    }

    void loadFeed(1, true);
  }, [filterKey, loadFeed]);

  const sentinelRef = useInfiniteScroll(
    () => {
      if (!loading && hasMore && !favoritesOnly) {
        void loadFeed(page + 1);
      }
    },
    hasMore && !favoritesOnly
  );

  const visibleArticles = favoritesOnly ? articles.filter((article) => article.isSaved) : articles;

  if (!loading && visibleArticles.length === 0) {
    return (
      <EmptyState
        title="Your feed is quiet right now"
        description="Try a different keyword, broaden the category filter, or revisit onboarding to expand your interests."
        ctaHref="/onboarding"
        ctaLabel="Update interests"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid news-grid gap-5">
        {visibleArticles.map((article) => (
          <ArticleCard
            key={article.url}
            article={article}
            onSaveChange={(changedArticle, nextSaved) => {
              setArticles((current) =>
                current.map((item) => (item.url === changedArticle.url ? { ...item, isSaved: nextSaved } : item))
              );
            }}
          />
        ))}
      </div>

      {loading ? <FeedSkeleton /> : null}
      <div ref={sentinelRef} className="h-4" />
    </div>
  );
}
