import { z } from "zod";

import { NEWS_CATEGORIES } from "@/lib/constants";

const categoryValues = NEWS_CATEGORIES.map((item) => item.value);

export const credentialsSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  name: z.string().min(2, "Name must be at least 2 characters long.").optional()
});

export const onboardingSchema = z.object({
  preferences: z
    .array(z.enum(categoryValues as [string, ...string[]]))
    .min(1, "Pick at least one category.")
    .max(6),
  country: z.string().min(2).max(2).default("us")
});

export const feedQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  search: z.string().optional().default(""),
  category: z.string().optional().default("all"),
  sort: z.enum(["relevance", "date"]).default("relevance"),
  latest: z.coerce.boolean().optional().default(false),
  favoritesOnly: z.coerce.boolean().optional().default(false)
});
