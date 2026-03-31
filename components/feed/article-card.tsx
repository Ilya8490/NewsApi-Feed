"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { useState } from "react";

import type { Article } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ArticleCard({
  article,
  onSaveChange
}: {
  article: Article;
  onSaveChange?: (article: Article, nextSaved: boolean) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(Boolean(article.isSaved));

  async function toggleSave() {
    try {
      setSaving(true);
      const method = saved ? "DELETE" : "POST";
      const response = await fetch("/api/saved", {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
      });

      if (!response.ok) {
        throw new Error("Unable to update saved articles.");
      }

      const nextSaved = !saved;
      setSaved(nextSaved);
      onSaveChange?.(article, nextSaved);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/40 bg-white/70 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-950/50">
      <div className="relative aspect-[1.45/1] overflow-hidden bg-secondary">
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge className="capitalize">{article.category}</Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{article.source}</p>
          <h3 className="line-clamp-2 font-display text-xl font-semibold leading-snug">{article.title}</h3>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{article.description}</p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Button variant={saved ? "secondary" : "outline"} size="sm" onClick={toggleSave} disabled={saving}>
            {saved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
            {saved ? "Saved" : "Save"}
          </Button>
          <Button asChild size="sm">
            <Link href={article.url} target="_blank" rel="noreferrer">
              Open article
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
