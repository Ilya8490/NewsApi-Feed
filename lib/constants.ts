export const NEWS_CATEGORIES = [
  { label: "Technology", value: "technology" },
  { label: "Business", value: "business" },
  { label: "Sports", value: "sports" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Entertainment", value: "entertainment" }
] as const;

export const DEFAULT_COUNTRY = process.env.DEFAULT_NEWS_COUNTRY || "us";
export const FEED_PAGE_SIZE = 12;
