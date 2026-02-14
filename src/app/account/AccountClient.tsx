"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface AccountClientProps {
  email?: string;
}

export function AccountClient({ email }: AccountClientProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {email && (
        <p className="text-center text-sm text-text-secondary">
          Signed in as <span className="font-medium text-text-primary">{email}</span>
        </p>
      )}
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          Sign out
        </Button>
        <p className="text-center text-sm text-text-secondary">
          <Link href="/arena" className="text-brand-primary hover:underline">
            Go to Arena
          </Link>
          {" · "}
          <Link href="/" className="text-brand-primary hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
