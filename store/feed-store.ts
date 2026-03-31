"use client";

import { create } from "zustand";

import type { SortMode } from "@/types";

type FeedStore = {
  category: string;
  search: string;
  sort: SortMode;
  latest: boolean;
  favoritesOnly: boolean;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setSort: (sort: SortMode) => void;
  setLatest: (latest: boolean) => void;
  setFavoritesOnly: (favoritesOnly: boolean) => void;
  reset: () => void;
};

const initialState = {
  category: "all",
  search: "",
  sort: "relevance" as SortMode,
  latest: false,
  favoritesOnly: false
};

export const useFeedStore = create<FeedStore>((set) => ({
  ...initialState,
  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  setLatest: (latest) => set({ latest }),
  setFavoritesOnly: (favoritesOnly) => set({ favoritesOnly }),
  reset: () => set(initialState)
}));
