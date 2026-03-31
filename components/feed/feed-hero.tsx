import { ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FeedHero({ userName }: { userName?: string | null }) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/40 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(255,255,255,0.85)_35%,rgba(16,185,129,0.12))] px-6 py-10 shadow-soft dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.20),rgba(2,6,23,0.82)_35%,rgba(20,184,166,0.12))] sm:px-10">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div className="space-y-5">
          <Badge className="bg-white/70 text-foreground dark:bg-white/10 dark:text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            Tailored from your interests
          </Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {userName ? `${userName}, here’s your calm, high-signal news briefing.` : "A smarter front page, tuned to your interests."}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Personalize by category, search across the latest coverage, and save the stories worth revisiting.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Refresh briefing</Button>
            <Button variant="outline">
              Recommended for you
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { label: "Mixed categories", value: "6 interest lanes" },
            { label: "Response caching", value: "10 min server cache" },
            { label: "Saved reading", value: "Cross-device bookmarks" }
          ].map((item) => (
            <div key={item.label} className="rounded-[28px] border border-white/50 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-1 font-display text-xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
