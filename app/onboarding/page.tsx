import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/profile/onboarding-form";
import { SectionHeader } from "@/components/shared/section-header";
import { requireUser } from "@/lib/session";

export default async function OnboardingPage() {
  const user = await requireUser();

  if (user.onboardingDone && user.preferences.length > 0) {
    redirect("/");
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Onboarding"
        title="Choose the stories you want more of"
        description="Your feed blends the categories you select into one cleaner front page. You can update these anytime from profile."
      />
      <div className="glass-panel rounded-[36px] p-6 sm:p-8">
        <OnboardingForm
          initialPreferences={user.preferences.map((item) => item.toLowerCase()) as never[]}
          initialCountry={user.country}
        />
      </div>
    </div>
  );
}
