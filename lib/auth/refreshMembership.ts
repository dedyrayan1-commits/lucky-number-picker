import { serviceClient } from "@/lib/supabase/service";

export async function refreshMembership(profile: {
  id: string;
  membership: string;
  membership_expired_at: string | null;
}) {
  if (
    profile.membership === "free" ||
    !profile.membership_expired_at
  ) {
    return;
  }

  const expiredAt = new Date(profile.membership_expired_at);

  if (expiredAt > new Date()) {
    return;
  }

  await serviceClient
    .from("profiles")
    .update({
      membership: "free",
      membership_expired_at: null,
    })
    .eq("id", profile.id);
}