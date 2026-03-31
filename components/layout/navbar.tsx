"use client";

import Link from "next/link";
import { LogOut, Newspaper, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data: session } = useSession();
  const initials = session?.user?.name?.slice(0, 2).toUpperCase() || "NF";

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-background/80 backdrop-blur-xl dark:border-white/10">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Personalized News Feed</p>
              <p className="text-xs text-muted-foreground">Editorial intelligence for every reader</p>
            </div>
          </Link>
          <Badge className="hidden md:inline-flex">
            <Sparkles className="mr-1 h-3 w-3" />
            Personalized daily briefing
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Feed</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/saved">Saved</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/profile">Profile</Link>
            </Button>
          </nav>
          <ThemeToggle />
          {session?.user ? (
            <>
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" onClick={() => signOut({ callbackUrl: "/login" })}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
