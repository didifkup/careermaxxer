import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase();

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!ADMIN_EMAIL) {
    redirect("/arena");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=" + encodeURIComponent("/admin/import"));
  }

  const userEmail = user.email?.trim().toLowerCase();
  if (userEmail !== ADMIN_EMAIL) {
    redirect("/arena");
  }

  return <>{children}</>;
}
