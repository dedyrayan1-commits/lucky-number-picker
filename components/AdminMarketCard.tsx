"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type AdminMarketCardProps = {
  marketId: number;
  marketName: string;
  prediction: string;
  officialResult: string;
  drawNumber: string;
  drawDate: string;
  countryCode: string;
  status: string;
};

export default function AdminMarketCard({
  marketId,
  marketName,
  prediction,
  officialResult,
  drawNumber,
  drawDate,
  countryCode,
  status,
}: AdminMarketCardProps) {
  const supabase = createClient();

  const [predictionValue, setPredictionValue] = useState(
    prediction ?? ""
  );

  const [officialResultValue, setOfficialResultValue] = useState(
    officialResult ?? ""
  );

  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (predictionValue.length !== 6) {
      toast.error(
        "Prediction harus terdiri dari tepat 6 digit."
      );
      return;
    }

    if (
      officialResultValue &&
      officialResultValue.length !== 4
    ) {
      toast.error(
        "Official Result harus terdiri dari tepat 4 digit."
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("markets")
      .update({
        prediction: predictionValue,
        official_result: officialResultValue,
        status: currentStatus,
      })
      .eq("id", marketId);

    setLoading(false);

    if (error) {
      console.error(error);

      toast.error("Gagal menyimpan data.", {
        description: "Silakan coba beberapa saat lagi.",
      });

      return;
    }

    toast.success("Data berhasil disimpan.", {
      description: `${marketName} berhasil diperbarui.`,
    });
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white">
      <h2 className="text-2xl font-bold">
        {marketName}
      </h2>

      {/* Prediction */}
      <div className="mt-6">
        <label className="mb-2 block text-sm text-slate-400">
          Prediction (6 Digit)
        </label>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={predictionValue}
          onChange={(e) =>
            setPredictionValue(
              e.target.value.replace(/\D/g, "")
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-center text-2xl font-bold tracking-[0.35em] outline-none transition focus:border-emerald-500"
        />
      </div>

      {/* Official Result */}
      <div className="mt-6">
        <label className="mb-2 block text-sm text-slate-400">
          Official Result (4 Digit)
        </label>

        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={officialResultValue}
          onChange={(e) =>
            setOfficialResultValue(
              e.target.value.replace(/\D/g, "")
            )
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-center text-2xl font-bold tracking-[0.35em] outline-none transition focus:border-cyan-500"
        />
      </div>

      {/* Market Information */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Draw Number
          </p>

          <p className="mt-1 font-semibold">
            {drawNumber || "-"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Draw Date
          </p>

          <p className="mt-1 font-semibold">
            {drawDate || "-"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Country
          </p>

          <p className="mt-1 font-semibold">
            {countryCode || "-"}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6">
        <label className="mb-2 block text-sm text-slate-400">
          Status
        </label>

        <select
          value={currentStatus}
          onChange={(e) =>
            setCurrentStatus(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none transition focus:border-emerald-500"
        >
          <option value="Draft">
            Draft
          </option>

          <option value="Published">
            Published
          </option>

          <option value="Finished">
            Finished
          </option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Simpan"
        )}
      </button>
    </div>
  );
}