"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setStatus("loading");
    setMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      if (!data.session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setStatus("error");
          setMessage(signInError.message);
          return;
        }
      }

      // Full page redirect so the next request includes the auth cookies
      window.location.href = "/arena";
      return;
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-brand-primary">Sign up</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Create an account with your email and password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="signup-email" className="sr-only">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="sr-only">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === "loading"}
            minLength={6}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <p className="mt-1 text-xs text-text-secondary">At least 6 characters</p>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading" || !email.trim() || !password}
        >
          {status === "loading" ? "Creating account…" : "Create account"}
        </Button>
      </form>

      {message && (
        <p
          role="alert"
          className={`text-center text-sm ${status === "error" ? "text-destructive" : "text-text-secondary"}`}
        >
          {message}
        </p>
      )}

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-primary hover:underline">
          Sign in
        </Link>
        {" · "}
        <Link href="/" className="text-brand-primary hover:underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormFallback />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupFormFallback() {
  return (
    <div className="mx-auto max-w-sm space-y-6 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-brand-primary">Sign up</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Create an account with your email and password.
        </p>
      </div>
      <div className="h-[120px] animate-pulse rounded-lg bg-black/5" aria-hidden />
      <p className="text-center text-sm text-text-secondary">
        <Link href="/" className="text-brand-primary hover:underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}
