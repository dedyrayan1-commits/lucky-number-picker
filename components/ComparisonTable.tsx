export default function ComparisonTable() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-white">
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950">
          <div className="p-5 font-semibold">Fitur</div>
          <div className="p-5 text-center font-semibold">Gratis</div>
          <div className="p-5 text-center font-semibold text-amber-400">
            Premium
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-slate-800">
          <div className="p-5">Hasil Resmi Harian</div>
          <div className="p-5 text-center">✅</div>
          <div className="p-5 text-center">✅</div>
        </div>

        <div className="grid grid-cols-3 border-b border-slate-800">
          <div className="p-5">Prediksi Harian</div>
          <div className="p-5 text-center">❌</div>
          <div className="p-5 text-center">✅</div>
        </div>

        <div className="grid grid-cols-3 border-b border-slate-800">
          <div className="p-5">Riwayat Prediksi</div>
          <div className="p-5 text-center">❌</div>
          <div className="p-5 text-center">✅</div>
        </div>

        <div className="grid grid-cols-3 border-b border-slate-800">
          <div className="p-5">Update Premium</div>
          <div className="p-5 text-center">❌</div>
          <div className="p-5 text-center">✅</div>
        </div>

        <div className="grid grid-cols-3">
          <div className="p-5">Dukungan Prioritas</div>
          <div className="p-5 text-center">❌</div>
          <div className="p-5 text-center">✅</div>
        </div>

      </div>
    </section>
  );
}