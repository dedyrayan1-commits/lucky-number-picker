import NumberCircle from "./NumberCircle";
import MarketHeader from "./MarketHeader";

import { Prediction } from "@/types/prediction";
import { calculateAccuracy } from "@/lib/calculateAccuracy";

type PredictionCardProps = {
  prediction: Prediction;
};

export default function PredictionCard({
  prediction,
}: PredictionCardProps) {
  const hasOfficialResult =
    prediction.official_result.length > 0;

  const accuracy = calculateAccuracy(
    prediction.prediction,
    prediction.official_result
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <MarketHeader
        countryCode={prediction.country_code}
        name={prediction.name}
        drawNumber={prediction.draw_number}
        drawDate={prediction.draw_date}
      />

      <hr className="my-6" />

      <h3 className="mb-3 font-semibold">
        Prediction
      </h3>

      <div className="flex flex-wrap gap-3">
        {prediction.prediction.map((number, index) => (
          <NumberCircle
            key={`prediction-${index}`}
            value={number}
            variant={
              accuracy.matchedNumbers.includes(number)
                ? "matched"
                : "default"
            }
          />
        ))}
      </div>

      <hr className="my-6" />

      <h3 className="mb-3 font-semibold">
        Official Result
      </h3>

      {hasOfficialResult ? (
        <div className="flex flex-wrap gap-3">
          {prediction.official_result.map((number, index) => (
            <NumberCircle
              key={`official-${index}`}
              value={number}
              variant={
                accuracy.matchedNumbers.includes(number)
                  ? "matched"
                  : "default"
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-gray-400">
          Pending Official Result
        </p>
      )}

      <hr className="my-6" />

      <h3 className="mb-3 font-semibold">
        Accuracy
      </h3>

      {hasOfficialResult ? (
        <p className="font-semibold text-emerald-600">
          🎯 {accuracy.totalMatchedNumbers} / {prediction.prediction.length} Numbers Matched
          Matched
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">
          Pending
        </p>
      )}
    </div>
  );
}