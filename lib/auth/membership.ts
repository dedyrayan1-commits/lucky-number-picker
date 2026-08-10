export type Membership =
  | "free"
  | "premium_regular"
  | "premium_toto"
  | "vip";

export function isFreeMember(
  membership: string | null | undefined
) {
  return membership === "free";
}

export function isPremiumRegular(
  membership: string | null | undefined
) {
  return membership === "premium_regular";
}

export function isPremiumToto(
  membership: string | null | undefined
) {
  return membership === "premium_toto";
}

export function isVip(
  membership: string | null | undefined
) {
  return membership === "vip";
}

export function canSeeRegularPrediction(
  membership: string | null | undefined
) {
  return (
    membership === "premium_regular" ||
    membership === "vip"
  );
}

export function canSeeTotoPrediction(
  membership: string | null | undefined
) {
  return (
    membership === "premium_toto" ||
    membership === "vip"
  );
}