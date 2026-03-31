import { Badge } from "@/components/ui/badge";

export function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
