import { OnboardingForm } from "@/components/profile/onboarding-form";
import { ProfileOverview } from "@/components/profile/profile-overview";
import { SectionHeader } from "@/components/shared/section-header";
import { requireOnboardedUser } from "@/lib/session";

export default async function ProfilePage() {
  const user = await requireOnboardedUser();

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Profile"
        title="Manage your preferences"
        description="Tune the feed, switch country defaults, and keep your personalized briefing aligned with what you care about."
      />
      <ProfileOverview
        name={user.name}
        email={user.email}
        country={user.country}
        preferences={user.preferences.map((item) => item.toLowerCase())}
      />
      <div className="glass-panel rounded-[36px] p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">Update interests</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Changes apply immediately to your homepage feed.
        </p>
        <div className="mt-6">
          <OnboardingForm
            initialPreferences={user.preferences.map((item) => item.toLowerCase()) as never[]}
            initialCountry={user.country}
          />
        </div>
      </div>
    </div>
  );
}
