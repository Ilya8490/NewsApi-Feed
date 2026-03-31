"use client";

import { Search } from "lucide-react";

import { NEWS_CATEGORIES } from "@/lib/constants";
import { useFeedStore } from "@/store/feed-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function SidebarFilters() {
  const {
    category,
    search,
    sort,
    latest,
    favoritesOnly,
    setCategory,
    setSearch,
    setSort,
    setLatest,
    setFavoritesOnly
  } = useFeedStore();

  return (
    <aside className="glass-panel h-fit rounded-[28px] p-5">
      <div className="space-y-6">
        <div>
          <p className="font-display text-lg font-semibold">Refine your briefing</p>
          <p className="mt-1 text-sm text-muted-foreground">Mix categories, sort intent, and jump straight to what matters.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              className="pl-10"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="AI, markets, sports..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All interests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All interests</SelectItem>
              {NEWS_CATEGORIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sort by</Label>
          <Select value={sort} onValueChange={(value) => setSort(value as "relevance" | "date")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 rounded-[24px] bg-secondary/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Latest first</p>
              <p className="text-xs text-muted-foreground">Prioritize breaking coverage</p>
            </div>
            <Switch checked={latest} onCheckedChange={setLatest} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Only favorites</p>
              <p className="text-xs text-muted-foreground">Show saved articles only</p>
            </div>
            <Switch checked={favoritesOnly} onCheckedChange={setFavoritesOnly} />
          </div>
        </div>
      </div>
    </aside>
  );
}
