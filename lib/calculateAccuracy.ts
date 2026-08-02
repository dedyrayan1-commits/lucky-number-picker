export type AccuracyResult = {
  matchedNumbers: number[];
  totalMatchedNumbers: number;
};

export function calculateAccuracy(
  prediction: number[],
  officialResult: number[]
): AccuracyResult {
  const matchedNumbers = prediction.filter((number) =>
    officialResult.includes(number)
  );

  return {
    matchedNumbers,
    totalMatchedNumbers: matchedNumbers.length,
  };
}