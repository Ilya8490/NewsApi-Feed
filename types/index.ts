export type CategoryValue =
  | "technology"
  | "business"
  | "sports"
  | "health"
  | "science"
  | "entertainment";

export type SortMode = "relevance" | "date";

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
  author: string | null;
  category: CategoryValue;
  content?: string | null;
  isSaved?: boolean;
}

export interface FeedResponse {
  articles: Article[];
  page: number;
  hasMore: boolean;
  totalResults: number;
}
