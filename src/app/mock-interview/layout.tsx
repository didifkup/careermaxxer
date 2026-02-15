import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MockInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=" + encodeURIComponent("/mock-interview"));
  }

  return <>{children}</>;
}
