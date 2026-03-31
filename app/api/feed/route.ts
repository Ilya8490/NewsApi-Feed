import { NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";
import { getPersonalizedFeed } from "@/lib/news";
import { prisma } from "@/lib/prisma";
import { feedQuerySchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = feedQuerySchema.parse(Object.fromEntries(searchParams.entries()));
    const session = await getAuthSession();
    const user = session?.user?.email
      ? await prisma.user.findUnique({
          where: { email: session.user.email },
          include: { savedArticles: true }
        })
      : null;

    const preferences = user?.preferences.length
      ? user.preferences.map((item) => item.toLowerCase())
      : ["technology"];

    const feed = await getPersonalizedFeed({
      preferences: preferences as never[],
      country: user?.country,
      page: parsed.page,
      search: parsed.search,
      category: parsed.category,
      sort: parsed.sort,
      latest: parsed.latest
    });

    const savedUrlSet = new Set(user?.savedArticles.map((article) => article.url) || []);
    const articles = feed.articles.map((article) => ({
      ...article,
      isSaved: savedUrlSet.has(article.url)
    }));

    return NextResponse.json({
      ...feed,
      articles
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unable to fetch personalized feed."
      },
      { status: 500 }
    );
  }
}
