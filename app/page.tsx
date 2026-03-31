import { FeedClient } from "@/components/feed/feed-client";
import { FeedHero } from "@/components/feed/feed-hero";
import { SidebarFilters } from "@/components/layout/sidebar-filters";
import { getPersonalizedFeed } from "@/lib/news";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import type { CategoryValue } from "@/types";

export default async function HomePage() {
  const session = await getAuthSession();
  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { savedArticles: true }
      })
    : null;

  const preferences = (user?.preferences.map((item) => item.toLowerCase()) as CategoryValue[]) || ["technology"];
  const initialFeed = await getPersonalizedFeed({
    preferences,
    country: user?.country,
    page: 1
  });

  return (
    <div className="space-y-8">
      <FeedHero userName={user?.name} />
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <SidebarFilters />
        <FeedClient
          initialArticles={initialFeed.articles}
          initialSavedUrls={user?.savedArticles.map((article) => article.url) || []}
        />
      </div>
    </div>
  );
}
