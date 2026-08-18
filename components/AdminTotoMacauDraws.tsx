"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type DrawStatus = "Draft" | "Published" | "Finished";

type TotoMacauDraw = {
  draw_round: number;
  prediction: string;
  official_result: string;
  status: DrawStatus;
};

type AdminTotoMacauDrawsProps = {
  marketId: number;
};

const EMPTY_DRAWS: TotoMacauDraw[] = Array.from(
  { length: 6 },
  (_, index) => ({
    draw_round: index + 1,
    prediction: "",
    official_result: "",
    status: "Draft",
  })
);

function getJakartaDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default function AdminTotoMacauDraws({
  marketId,
}: AdminTotoMacauDrawsProps) {
  const supabase = createClient();

  const [drawDate, setDrawDate] = useState(getJakartaDate());
  const [draws, setDraws] =
    useState<TotoMacauDraw[]>(EMPTY_DRAWS);

  const [loading, setLoading] = useState(true);
  const [savingRound, setSavingRound] =
    useState<number | null>(null);

  useEffect(() => {
    async function loadDraws() {
      setLoading(true);

      const { data, error } = await supabase
        .from("toto_macau_draws")
        .select(
          "draw_round, prediction, official_result, status"
        )
        .eq("market_id", marketId)
        .eq("draw_date", drawDate)
        .order("draw_round");

      if (error) {
        console.error(
          "LOAD TOTO MACAU DRAWS ERROR:",
          error
        );

        toast.error(
          "Gagal memuat data Toto Macau."
        );

        setLoading(false);
        return;
      }

      const loadedDraws = EMPTY_DRAWS.map(
        (emptyDraw) => {
          const savedDraw = data?.find(
            (item) =>
              item.draw_round ===
              emptyDraw.draw_round
          );

          if (!savedDraw) {
            return { ...emptyDraw };
          }

          return {
            draw_round: savedDraw.draw_round,
            prediction:
              savedDraw.prediction ?? "",
            official_result:
              savedDraw.official_result ?? "",
            status:
              (savedDraw.status ??
                "Draft") as DrawStatus,
          };
        }
      );

      setDraws(loadedDraws);
      setLoading(false);
    }

    void loadDraws();
  }, [drawDate, marketId, supabase]);

  function updateDraw(
    round: number,
    field:
      | "prediction"
      | "official_result"
      | "status",
    value: string
  ) {
    setDraws((current) =>
      current.map((draw) =>
        draw.draw_round === round
          ? {
              ...draw,
              [field]: value,
            }
          : draw
      )
    );
  }

  async function handleSave(
    draw: TotoMacauDraw
  ) {
    if (draw.prediction.length !== 6) {
      toast.error(
        `Draw ${draw.draw_round}: Prediction harus tepat 6 digit.`
      );
      return;
    }

    if (
      draw.official_result &&
      draw.official_result.length !== 4
    ) {
      toast.error(
        `Draw ${draw.draw_round}: Official Result harus tepat 4 digit.`
      );
      return;
    }

    setSavingRound(draw.draw_round);

    const { error } = await supabase
      .from("toto_macau_draws")
      .upsert(
        {
          market_id: marketId,
          draw_date: drawDate,
          draw_round: draw.draw_round,
          prediction: draw.prediction,
          official_result:
            draw.official_result || null,
          status: draw.status,
          updated_at:
            new Date().toISOString(),
        },
        {
          onConflict:
            "market_id,draw_date,draw_round",
        }
      );

    setSavingRound(null);

    if (error) {
      console.error(
        "SAVE TOTO MACAU DRAW ERROR:",
        error
      );

      toast.error(
        `Draw ${draw.draw_round} gagal disimpan.`
      );

      return;
    }

    toast.success(
      `Toto Macau Draw ${draw.draw_round} berhasil disimpan.`
    );
  }

  return (
    <div className="rounded-3xl border border-cyan-500/25 bg-slate-900 p-6 text-white shadow-[0_0_40px_rgba(34,211,238,0.06)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
            Premium Special
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Toto Macau — 6 Draw
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Kelola enam prediction dan official
            result untuk setiap hari.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tanggal Draw
          </label>

          <input
            type="date"
            value={drawDate}
            onChange={(event) =>
              setDrawDate(event.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold outline-none transition focus:border-cyan-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-8 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Memuat 6 draw Toto Macau...
        </div>
      ) : (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {draws.map((draw) => (
            <div
              key={draw.draw_round}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-cyan-300">
                  DRAW #{draw.draw_round}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    draw.status === "Draft"
                      ? "bg-yellow-500/15 text-yellow-300"
                      : draw.status ===
                          "Published"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-cyan-500/15 text-cyan-300"
                  }`}
                >
                  {draw.status}
                </span>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm text-slate-400">
                  Prediction (6 Digit)
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={draw.prediction}
                  onChange={(event) =>
                    updateDraw(
                      draw.draw_round,
                      "prediction",
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="------"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-center text-2xl font-black tracking-[0.3em] outline-none transition focus:border-emerald-500"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm text-slate-400">
                  Official Result (4 Digit)
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={draw.official_result}
                  onChange={(event) =>
                    updateDraw(
                      draw.draw_round,
                      "official_result",
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="----"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-center text-2xl font-black tracking-[0.3em] outline-none transition focus:border-cyan-500"
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm text-slate-400">
                  Status
                </label>

                <select
                  value={draw.status}
                  onChange={(event) =>
                    updateDraw(
                      draw.draw_round,
                      "status",
                      event.target
                        .value as DrawStatus
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none transition focus:border-cyan-500"
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
                type="button"
                onClick={() =>
                  void handleSave(draw)
                }
                disabled={
                  savingRound ===
                  draw.draw_round
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingRound ===
                draw.draw_round ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  `Simpan Draw ${draw.draw_round}`
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}