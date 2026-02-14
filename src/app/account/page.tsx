import { redirect } from "next/navigation";
import { createClient, upsertProfileForUser } from "@/lib/supabase/server";
import { AccountClient } from "./AccountClient";
import { ProfileSettingsForm } from "@/components/account/ProfileSettingsForm";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await upsertProfileForUser(user.id, user.email ?? null);

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, school_id")
    .eq("id", user.id)
    .single();

  const { data: schools } = await supabase
    .from("schools")
    .select("id, name")
    .eq("is_active", true)
    .order("name", { ascending: true });

  const initialProfile = {
    username: profile?.username ?? null,
    school_id: profile?.school_id ?? null,
  };
  const schoolOptions = (schools ?? []).map((s) => ({ id: s.id, name: s.name }));

  return (
    <div className="mx-auto max-w-md space-y-8 pt-8">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-brand-primary">Account</h1>
      </div>

      <div className="rounded-xl border border-black/10 bg-surface-raised p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">Profile</h2>
        <ProfileSettingsForm initialProfile={initialProfile} schools={schoolOptions} />
      </div>

      <AccountClient email={user.email ?? undefined} />
    </div>
  );
}
