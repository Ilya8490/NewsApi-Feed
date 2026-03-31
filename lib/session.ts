import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireUser() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireOnboardedUser() {
  const user = await requireUser();

  if (!user.onboardingDone) {
    redirect("/onboarding");
  }

  return user;
}
