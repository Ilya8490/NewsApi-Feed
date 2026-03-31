import type { Metadata } from "next";

import "@/app/globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Personalized News Feed",
  description: "A startup-grade personalized news platform built with Next.js, Prisma, PostgreSQL, and NewsAPI."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <Providers>
          <Navbar />
          <main className="container py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
