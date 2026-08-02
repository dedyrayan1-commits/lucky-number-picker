"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
    >
      Logout
    </button>
  );
}