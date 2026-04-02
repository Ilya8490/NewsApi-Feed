import { withAuth } from "next-auth/middleware";

import { authOptions } from "@/lib/auth";

export const proxy = withAuth({
  pages: authOptions.pages
});

export const config = {
  matcher: ["/saved", "/profile", "/onboarding"]
};
