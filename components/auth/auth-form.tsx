"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Chrome } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { credentialsSchema } from "@/lib/validations";

type AuthMode = "login" | "signup";

const formSchema = credentialsSchema.extend({
  name: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError("");

    const response = await signIn("credentials", {
      ...values,
      mode,
      redirect: false
    });

    setLoading(false);

    if (response?.error) {
      setError(response.error);
      return;
    }

    router.push(mode === "signup" ? "/onboarding" : "/");
    router.refresh();
  }

  return (
    <Card className="glass-panel border-white/40">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle>{mode === "login" ? "Welcome back" : "Create your account"}</CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Sign in to continue your personalized news briefing."
              : "Set up your account and we’ll shape the feed around your interests."}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: mode === "signup" ? "/onboarding" : "/" })}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {mode === "signup" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} placeholder="Jamie Rivera" />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} placeholder="At least 8 characters" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
          <Link className="font-medium text-foreground underline-offset-4 hover:underline" href={mode === "login" ? "/login?mode=signup" : "/login"}>
            {mode === "login" ? "Sign up" : "Log in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
