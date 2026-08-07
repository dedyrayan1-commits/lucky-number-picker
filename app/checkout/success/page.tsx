import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/20 bg-slate-900 p-10 text-center">

        <h1 className="text-5xl font-bold text-emerald-400">
          Order Berhasil
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Order Anda berhasil dibuat.
        </p>

        <p className="mt-2 text-slate-400">
          Tahap berikutnya adalah proses pembayaran.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <button
            disabled
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold opacity-60"
          >
            Bayar Sekarang
          </button>

        </div>

      </div>

    </main>
  );
}