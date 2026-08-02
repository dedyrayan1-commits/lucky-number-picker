export default function PremiumPredictionSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-white">

      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          PREMIUM PREDICTION
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Today's Prediction
        </h2>

        <p className="mt-6 text-lg text-slate-300">
          Prediksi hari ini tersedia khusus bagi Member Premium.
        </p>

        <div className="mt-10 flex justify-center gap-3">

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-700 text-2xl font-bold blur-sm"
            >
              8
            </div>
          ))}

        </div>

        <p className="mt-8 text-amber-300 font-semibold">
          🔒 Premium Member Only
        </p>

        <button
          className="mt-8 rounded-xl bg-amber-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          👑 Upgrade Menjadi Member Premium
        </button>

      </div>

    </section>
  );
}