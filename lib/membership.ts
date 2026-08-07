export const MEMBERSHIP_PACKAGES = {
  premium_regular: {
    id: "premium_regular",
    name: "Premium Regular",
    price: 10000,
    durationDays: 7,
  },

  premium_toto: {
    id: "premium_toto",
    name: "Premium Toto Macau",
    price: 15000,
    durationDays: 7,
  },

  vip: {
    id: "vip",
    name: "VIP",
    price: 20000,
    durationDays: 7,
  },
} as const;

export type MembershipPackageId =
  keyof typeof MEMBERSHIP_PACKAGES;