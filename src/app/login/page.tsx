"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = useMemo(
    () => (searchParams.get("next") ?? "/account").replace(/^[^/]/, "/$&"),
    [searchParams]
  );

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const callbackUrl = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: callbackUrl },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("sent");
      setMessage("Check your email for the sign-in link.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-brand-primary">Sign in</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Enter your email and we&apos;ll send you a magic link.
        </p>
      </div>

      <form onSubmit={handleMagicLink} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "sent"}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading" || status === "sent" || !email.trim()}
        >
          {status === "loading" ? "Sending…" : status === "sent" ? "Check your email" : "Send magic link"}
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
        <Link href="/" className="text-brand-primary hover:underline">
          Back to home
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginFormFallback() {
  return (
    <div className="mx-auto max-w-sm space-y-6 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-brand-primary">Sign in</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Enter your email and we&apos;ll send you a magic link.
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
