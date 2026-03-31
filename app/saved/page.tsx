import type { Article } from "@/types";
import { ArticleCard } from "@/components/feed/article-card";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { requireOnboardedUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function SavedPage() {
  const user = await requireOnboardedUser();
  const savedArticles = await prisma.savedArticle.findMany({
    where: { userId: user.id },
    orderBy: { publishedAt: "desc" }
  });

  const articles: Article[] = savedArticles.map((article) => ({
    id: article.id,
    title: article.title,
    description: article.description || "Saved article",
    url: article.url,
    urlToImage: article.image,
    publishedAt: article.publishedAt.toISOString(),
    source: article.source,
    author: article.author,
    category: (article.category?.toLowerCase() as Article["category"]) || "technology",
    isSaved: true
  }));

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Saved"
        title="Your reading list"
        description="Everything you bookmarked for later stays here, ordered by newest publication date."
      />
      {articles.length === 0 ? (
        <EmptyState
          title="No saved articles yet"
          description="Bookmark stories from the main feed to build your reading list."
          ctaHref="/"
          ctaLabel="Browse feed"
        />
      ) : (
        <div className="grid news-grid gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
