export type AccuracyResult = {
  matchedNumbers: string[];
  totalMatchedNumbers: number;
};

export function calculateAccuracy(
  prediction: string,
  officialResult: string
): AccuracyResult {
  const matchedNumbers = prediction
    .split("")
    .filter((number) =>
      officialResult.includes(number)
    );

  return {
    matchedNumbers,
    totalMatchedNumbers: matchedNumbers.length,
  };
}