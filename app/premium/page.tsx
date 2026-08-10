import Link from "next/link";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            MEMBER PREMIUM
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            Pilih Paket Membership
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Pilih paket yang sesuai untuk mendapatkan akses prediksi
            Lucky Number Picker selama 7 hari.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {/* Premium Regular */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              PREMIUM REGULAR
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Premium Regular
            </h2>

            <div className="mt-6">
              <span className="text-4xl font-bold">
                Rp15.000
              </span>

              <span className="ml-2 text-slate-400">
                / 7 hari
              </span>
            </div>

            <p className="mt-6 text-slate-300">
              Akses prediksi market Regular selama masa aktif membership.
            </p>

            <div className="mt-8 space-y-3 text-slate-300">
              <p>✓ Hong Kong Lotto</p>
              <p>✓ Singapore</p>
              <p>✓ Sydney Lotto</p>
              <p>✓ Masa aktif 7 hari</p>
            </div>

            <Link
              href="/checkout?plan=premium_regular"
              className="mt-10 block w-full rounded-xl bg-emerald-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Pilih Premium Regular
            </Link>
          </div>

          {/* Premium Toto Macau */}
          <div className="rounded-3xl border border-cyan-500/30 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              PREMIUM TOTO
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Premium Toto Macau 4D
            </h2>

            <div className="mt-6">
              <span className="text-4xl font-bold">
                Rp20.000
              </span>

              <span className="ml-2 text-slate-400">
                / 7 hari
              </span>
            </div>

            <p className="mt-6 text-slate-300">
              Paket khusus untuk mendapatkan akses prediksi Toto Macau.
            </p>

            <div className="mt-8 space-y-3 text-slate-300">
              <p>✓ Toto Macau</p>
              <p>✓ Prediksi Premium Toto</p>
              <p>✓ Pembaruan setiap hari</p>
              <p>✓ Masa aktif 7 hari</p>
            </div>

            <Link
              href="/checkout?plan=premium_toto"
              className="mt-10 block w-full rounded-xl bg-cyan-600 px-6 py-4 text-center font-semibold text-white transition hover:bg-cyan-700"
            >
              Pilih Premium Toto Macau 4D
            </Link>
          </div>

          {/* VIP */}
          <div className="rounded-3xl border border-amber-400/40 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              VIP
            </p>

            <h2 className="mt-4 text-3xl font-bold text-amber-300">
              VIP
            </h2>

            <div className="mt-6">
              <span className="text-4xl font-bold">
                Rp30.000
              </span>

              <span className="ml-2 text-slate-400">
                / 7 hari
              </span>
            </div>

            <p className="mt-6 text-slate-300">
              Akses lengkap ke seluruh market Lucky Number Picker.
            </p>

            <div className="mt-8 space-y-3 text-slate-300">
              <p>✓ Hong Kong Lotto</p>
              <p>✓ Singapore</p>
              <p>✓ Sydney Lotto</p>
              <p>✓ Toto Macau</p>
              <p>✓ Seluruh prediksi premium</p>
              <p>✓ Masa aktif 7 hari</p>
            </div>

            <Link
              href="/checkout?plan=vip"
              className="mt-10 block w-full rounded-xl bg-amber-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Pilih VIP
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}