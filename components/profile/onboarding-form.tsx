"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { NEWS_CATEGORIES } from "@/lib/constants";
import type { CategoryValue } from "@/types";
import { Button } from "@/components/ui/button";

export function OnboardingForm({
  initialPreferences = [],
  initialCountry = "us"
}: {
  initialPreferences?: CategoryValue[];
  initialCountry?: string;
}) {
  const router = useRouter();
  const [preferences, setPreferences] = useState<CategoryValue[]>(initialPreferences);
  const [country, setCountry] = useState(initialCountry);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ preferences, country })
    });
    setLoading(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {NEWS_CATEGORIES.map((category) => {
          const selected = preferences.includes(category.value);
          return (
            <button
              key={category.value}
              type="button"
              onClick={() =>
                setPreferences((current) =>
                  current.includes(category.value)
                    ? current.filter((item) => item !== category.value)
                    : [...current, category.value]
                )
              }
              className={`rounded-[28px] border p-5 text-left transition-all ${
                selected
                  ? "border-primary bg-primary/8 shadow-soft"
                  : "border-border bg-white/60 hover:-translate-y-1 hover:border-primary/40 dark:bg-slate-950/40"
              }`}
            >
              <p className="font-display text-xl font-semibold">{category.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Curate more {category.label.toLowerCase()} coverage into your daily feed.
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-medium">
            Default country
          </label>
          <input
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value.toLowerCase())}
            maxLength={2}
            className="h-11 rounded-2xl border border-border bg-background/70 px-4 text-sm uppercase"
          />
        </div>
        <Button disabled={loading || preferences.length === 0} onClick={submit}>
          {loading ? "Saving..." : "Finish onboarding"}
        </Button>
      </div>
    </div>
  );
}
