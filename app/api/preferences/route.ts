import { NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { onboardingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = onboardingSchema.parse(body);

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      preferences: parsed.preferences.map((item) => item.toUpperCase()) as never[],
      country: parsed.country.toLowerCase(),
      onboardingDone: true
    }
  });

  return NextResponse.json({
    user
  });
}
