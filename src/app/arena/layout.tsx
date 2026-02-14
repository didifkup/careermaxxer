import { redirect } from "next/navigation";
import { createClient, upsertProfileForUser } from "@/lib/supabase/server";

export default async function ArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=" + encodeURIComponent("/arena"));
  }

  await upsertProfileForUser(user.id, user.email ?? null);

  return <>{children}</>;
}
