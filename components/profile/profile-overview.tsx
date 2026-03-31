import { NEWS_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export function ProfileOverview({
  name,
  email,
  country,
  preferences
}: {
  name: string | null;
  email: string | null;
  country: string;
  preferences: string[];
}) {
  return (
    <div className="glass-panel rounded-[32px] p-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Profile</p>
        <h1 className="font-display text-3xl font-semibold">{name || "Reader profile"}</h1>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Country</p>
          <p className="mt-1 text-lg font-medium uppercase">{country}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Interests</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {preferences.map((preference) => (
              <Badge key={preference}>
                {NEWS_CATEGORIES.find((item) => item.value === preference)?.label || preference}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
