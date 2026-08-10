import NumberCircle from "./NumberCircle";

import { Prediction } from "@/types/prediction";

type PredictionCardProps = {
  prediction: Prediction;
};

export default function PredictionCard({
  prediction,
}: PredictionCardProps) {
  const hasOfficialResult =
    prediction.official_result.length > 0;

  const matchedNumbers = prediction.prediction
    .split("")
    .filter((number) =>
      prediction.official_result.includes(number)
    );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white">

      <div>
        <h2 className="text-2xl font-bold">
          {prediction.name}
        </h2>

        <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
          <span>
            Draw Number: {prediction.draw_number || "-"}
          </span>

          <span>
            Draw Date: {prediction.draw_date || "-"}
          </span>

          <span>
            Status: {prediction.status}
          </span>
        </div>
      </div>

      <hr className="my-6 border-slate-800" />

      {/* Prediction */}
      <h3 className="mb-3 font-semibold">
        Prediction
      </h3>

      <div className="flex flex-wrap gap-3">
        {prediction.prediction
          .split("")
          .map((number, index) => (
            <NumberCircle
              key={`prediction-${index}`}
              value={Number(number)}
              variant={
                matchedNumbers.includes(number)
                  ? "matched"
                  : "default"
              }
            />
          ))}
      </div>

      <hr className="my-6 border-slate-800" />

      {/* Official Result */}
      <h3 className="mb-3 font-semibold">
        Official Result
      </h3>

      {hasOfficialResult ? (
        <div className="flex flex-wrap gap-3">
          {prediction.official_result
            .split("")
            .map((number, index) => (
              <NumberCircle
                key={`official-${index}`}
                value={Number(number)}
                variant={
                  matchedNumbers.includes(number)
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

      <hr className="my-6 border-slate-800" />

      {/* Accuracy */}
      <h3 className="mb-3 font-semibold">
        Accuracy
      </h3>

      {hasOfficialResult ? (
        <p className="font-semibold text-emerald-600">
          🎯 {matchedNumbers.length} /{" "}
          {prediction.prediction.length} Numbers Matched
        </p>
      ) : (
        <p className="text-sm italic text-gray-400">
          Pending
        </p>
      )}

    </div>
  );
}