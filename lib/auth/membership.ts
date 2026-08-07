export type Membership =
  | "free"
  | "premium_regular"
  | "premium_toto"
  | "vip";

export function isFreeMember(
  membership: Membership | string | null | undefined
) {
  return membership === "free";
}

export function isPremiumRegular(
  membership: Membership | string | null | undefined
) {
  return membership === "premium_regular";
}

export function isPremiumToto(
  membership: Membership | string | null | undefined
) {
  return membership === "premium_toto";
}

export function isVip(
  membership: Membership | string | null | undefined
) {
  return membership === "vip";
}

export function canSeeRegularPrediction(
  membership: Membership | string | null | undefined
) {
  return (
    isPremiumRegular(membership) ||
    isVip(membership)
  );
}

export function canSeeTotoPrediction(
  membership: Membership | string | null | undefined
) {
  return (
    isPremiumToto(membership) ||
    isVip(membership)
  );
}