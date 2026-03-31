import { AuthForm } from "@/components/auth/auth-form";
import { Badge } from "@/components/ui/badge";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "login";

  return (
    <div className="grid min-h-[calc(100vh-10rem)] gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
      <section className="space-y-6">
        <Badge>Startup-grade editorial experience</Badge>
        <div className="space-y-4">
          <h1 className="max-w-2xl font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Read the day with less noise and more relevance.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Personalized News Feed combines your interests, smart sorting, bookmarks, and clean reading surfaces into one focused product experience.
          </p>
        </div>
        <div className="grid max-w-xl gap-3 sm:grid-cols-3">
          {["Personalized onboarding", "Infinite scrolling feed", "Saved article library"].map((item) => (
            <div key={item} className="rounded-[24px] border border-white/40 bg-white/70 p-4 text-sm shadow-soft dark:border-white/10 dark:bg-slate-950/40">
              {item}
            </div>
          ))}
        </div>
      </section>
      <AuthForm mode={mode} />
    </div>
  );
}
