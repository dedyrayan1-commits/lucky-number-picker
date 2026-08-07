import { MEMBERSHIP_PACKAGES } from "@/lib/membership";
import { serviceClient } from "@/lib/supabase/service";

type ActivateMembershipParams = {
  userId: string;
  packageId: keyof typeof MEMBERSHIP_PACKAGES;
};

export async function activateMembership({
  userId,
  packageId,
}: ActivateMembershipParams) {
  const membership = MEMBERSHIP_PACKAGES[packageId];

  if (!membership) {
    throw new Error("Membership package tidak ditemukan.");
  }

  const expiredAt = new Date();

  expiredAt.setDate(
    expiredAt.getDate() + membership.durationDays
  );

  const { error } = await serviceClient
    .from("profiles")
    .update({
      membership: membership.id,
      membership_expired_at: expiredAt.toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return expiredAt;
}