export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/saved", "/profile", "/onboarding"]
};
