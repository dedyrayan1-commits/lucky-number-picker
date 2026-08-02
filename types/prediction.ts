export type CountryCode = "HK" | "SG" | "SYD" | "MACAU";

export type PredictionStatus =
  | "Draft"
  | "Published"
  | "Completed";

export interface Prediction {
  id: number;

  name: string;

  country_code: CountryCode;

  draw_number: string;

  draw_date: string;

  prediction: number[];

  official_result: number[];

  status: PredictionStatus;

  created_at: string;

  updated_at: string;
}