import { CountryCode } from "@/types/prediction";

export function getCountryFlag(
  countryCode: CountryCode
): string {
  switch (countryCode) {
    case "HK":
      return "🇭🇰";

    case "SG":
      return "🇸🇬";

    case "SYD":
      return "🇦🇺";

    case "MACAU":
      return "🇲🇴";

    default:
      return "🌍";
  }
}