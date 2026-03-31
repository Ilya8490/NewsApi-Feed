import { NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Article } from "@/types";

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const items = await prisma.savedArticle.findMany({
    where: { userId: user.id },
    orderBy: { publishedAt: "desc" }
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const article = (await request.json()) as Article;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const savedArticle = await prisma.savedArticle.upsert({
    where: {
      userId_url: {
        userId: user.id,
        url: article.url
      }
    },
    create: {
      userId: user.id,
      title: article.title,
      url: article.url,
      image: article.urlToImage,
      source: article.source,
      description: article.description,
      author: article.author,
      category: article.category,
      publishedAt: new Date(article.publishedAt)
    },
    update: {
      title: article.title,
      image: article.urlToImage,
      source: article.source,
      description: article.description,
      author: article.author,
      category: article.category,
      publishedAt: new Date(article.publishedAt)
    }
  });

  return NextResponse.json({ item: savedArticle });
}

export async function DELETE(request: Request) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const article = (await request.json()) as Article;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  await prisma.savedArticle.deleteMany({
    where: {
      userId: user.id,
      url: article.url
    }
  });

  return NextResponse.json({ success: true });
}
