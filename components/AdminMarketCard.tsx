"use client";

import { useState } from "react";
import NumberInputRow from "./NumberInputRow";
import { createClient } from "@/lib/supabase/client";

type AdminMarketCardProps = {
  marketId: number;
  marketName: string;
  prediction: number[];
  officialResult: number[];
  status: string;
};

export default function AdminMarketCard({
  marketId,
  marketName,
  prediction,
  officialResult,
  status,
}: AdminMarketCardProps) {
  const supabase = createClient();
  
  const [predictionNumbers, setPredictionNumbers] = useState(
    prediction.map((number) => number.toString())
  );

  const [officialNumbers, setOfficialNumbers] = useState(
    officialResult.map((number) => number.toString())
  );

  const [currentStatus, setCurrentStatus] = useState(status);

  async function handleSave() {
    const { error } = await supabase
      .from("markets")
      .update({
        prediction: predictionNumbers.map(Number),
        official_result: officialNumbers.map(Number),
        status: currentStatus,
      })
      .eq("id", marketId);

    if (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
      return;
    }

    alert("Data berhasil disimpan.");
  }

  return (
    <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-md">
      <h2 className="text-2xl font-bold">{marketName}</h2>

      {/* Prediction */}
      <div className="mt-6">
        <h3 className="mb-2 font-semibold">
          Prediction (6 Numbers)
        </h3>

        <NumberInputRow
          numbers={predictionNumbers}
          onChange={(index, value) => {
            const newNumbers = [...predictionNumbers];
            newNumbers[index] = value;
            setPredictionNumbers(newNumbers);
          }}
        />
      </div>

      {/* Official Result */}
      <div className="mt-8">
        <h3 className="mb-2 font-semibold">
          Official Result (4 Numbers)
        </h3>

        <NumberInputRow
          numbers={officialNumbers}
          onChange={(index, value) => {
            const newNumbers = [...officialNumbers];
            newNumbers[index] = value;
            setOfficialNumbers(newNumbers);
          }}
        />
      </div>

      {/* Status */}
      <div className="mt-8">
        <h3 className="mb-2 font-semibold">Status</h3>

        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <button
          onClick={handleSave}
          className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}