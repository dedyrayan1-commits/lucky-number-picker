import Image from "next/image";
import Link from "next/link";

const regularMarkets = [
  {
    code: "HK",
    name: "Hong Kong Lotto",
    result: "1 Result / Hari",
    icon: "/premium-v5/flag-hk.png",
  },
  {
    code: "AU",
    name: "Sydney Lotto",
    result: "1 Result / Hari",
    icon: "/premium-v5/flag-au.png",
  },
  {
    code: "SG",
    name: "Singapore",
    result: "1 Result / Hari",
    icon: "/premium-v5/flag-sg.png",
  },
];

const vipMarkets = [
  { code: "HK", name: "Hong Kong Lotto", icon: "/premium-v5/flag-hk.png" },
  { code: "AU", name: "Sydney Lotto", icon: "/premium-v5/flag-au.png" },
  { code: "SG", name: "Singapore", icon: "/premium-v5/flag-sg.png" },
  { code: "MO", name: "Toto Macau 4D", icon: "/premium-v5/flag-mo.png" },
];

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-[#02050a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px]">

        <section className="relative overflow-hidden px-4 pb-10 pt-4 text-center">
          <div className="absolute left-0 top-[88px] h-px w-[27%] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
          <div className="absolute right-0 top-[88px] h-px w-[27%] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />

          <p className="text-sm font-black uppercase tracking-[0.45em] text-amber-300">
            ✦ MEMBER PREMIUM ✦
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase italic tracking-tight sm:text-5xl lg:text-6xl">
            Pilih Paket{" "}
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Membership
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-300 sm:text-base">
            Pilih paket yang sesuai untuk mendapatkan akses prediksi Lucky Number Picker selama 7 hari.
          </p>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          {/* REGULAR */}
          <article className="relative overflow-hidden rounded-[30px] border border-lime-400/80 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.24),transparent_34%),linear-gradient(180deg,#062b17_0%,#06140c_46%,#020617_100%)] p-5 shadow-[0_0_60px_rgba(34,197,94,0.18)] sm:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-200 to-transparent" />

            <div className="flex items-center gap-4">
              <Image
                src="/premium-v5/premium-shield.png"
                alt="Premium Regular"
                width={82}
                height={98}
                className="h-[86px] w-[72px] object-contain"
              />

              <div>
                <p className="text-lg font-black uppercase italic">Premium</p>
                <h2 className="text-4xl font-black uppercase italic leading-none text-lime-400">
                  Regular
                </h2>
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-lg border border-lime-400/40 bg-lime-400/10 px-4 py-1.5 text-sm font-black uppercase text-lime-300">
              3 Market Premium
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-5xl font-black">Rp15.000</span>
              <span className="pb-1 text-lg font-black uppercase text-lime-300">/ 7 hari</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Akses prediksi market Regular selama masa aktif membership.
            </p>

            <div className="mt-6 space-y-3">
              {regularMarkets.map((market) => (
                <div
                  key={market.code}
                  className="rounded-2xl border border-lime-400/25 bg-black/30 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={market.icon}
                      alt={market.name}
                      width={62}
                      height={62}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div>
                      <div className="text-xl font-black text-lime-300">{market.code}</div>
                      <div className="text-sm font-black uppercase tracking-wide">{market.name}</div>
                      <div className="mt-1 text-xs font-semibold text-lime-300">{market.result}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-lime-300/15 bg-black/20 px-4 py-3 text-sm font-semibold">
              🔄 Update prediksi setiap hari
            </div>

            <Link
              href="/checkout?plan=premium_regular"
              className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-green-500 via-lime-500 to-green-600 px-5 py-4 font-black uppercase shadow-[0_0_28px_rgba(74,222,128,0.24)] transition hover:brightness-110"
            >
              <span>Pilih Premium Regular</span>
              <span className="text-2xl">→</span>
            </Link>
          </article>

          {/* TOTO */}
          <article className="relative overflow-hidden rounded-[30px] border border-cyan-400/80 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_34%),linear-gradient(180deg,#062d43_0%,#06131d_46%,#020617_100%)] p-5 shadow-[0_0_60px_rgba(34,211,238,0.18)] sm:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

            <div className="flex items-center gap-4">
              <Image
                src="/premium-v5/premium-diamond.png"
                alt="Premium Toto Macau 4D"
                width={98}
                height={98}
                className="h-[84px] w-[84px] object-contain"
              />

              <div>
                <p className="text-lg font-black uppercase italic">Premium</p>
                <h2 className="text-3xl font-black uppercase italic leading-none text-cyan-300 sm:text-4xl">
                  Toto Macau 4D
                </h2>
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-lg border border-cyan-300/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-black uppercase text-cyan-300">
              Market Khusus
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-5xl font-black">Rp20.000</span>
              <span className="pb-1 text-lg font-black uppercase text-cyan-300">/ 7 hari</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Paket khusus untuk mendapatkan akses prediksi Toto Macau.
            </p>

            <div className="mt-6 rounded-2xl border border-cyan-300/25 bg-black/30 p-5">
              <div className="flex items-center gap-4">
                <Image
                  src="/premium-v5/flag-mo.png"
                  alt="Toto Macau 4D"
                  width={78}
                  height={78}
                  className="h-[72px] w-[72px] rounded-full object-cover"
                />

                <div>
                  <div className="text-xl font-black uppercase italic">Toto Macau 4D</div>
                  <div className="mt-1 text-xl font-black text-cyan-300">6 Result / Hari</div>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {[
                "⚡ Hingga 6 update prediksi setiap hari",
                "◷ Mengikuti setiap jadwal result",
                "💎 Prediksi Premium Toto",
                "▣ Masa aktif 7 hari",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-cyan-300/10 bg-black/20 px-4 py-3 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/checkout?plan=premium_toto"
              className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-5 py-4 font-black uppercase shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:brightness-110"
            >
              <span>Pilih Premium Toto Macau 4D</span>
              <span className="text-2xl">→</span>
            </Link>
          </article>

          {/* VIP */}
          <article className="relative overflow-hidden rounded-[30px] border border-amber-300/85 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.24),transparent_34%),linear-gradient(180deg,#382006_0%,#171006_46%,#020617_100%)] p-5 shadow-[0_0_64px_rgba(251,191,36,0.20)] sm:p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-100 to-transparent" />

            <div className="flex items-center gap-4">
              <Image
                src="/premium-v5/premium-crown.png"
                alt="VIP"
                width={112}
                height={98}
                className="h-[88px] w-[100px] object-contain"
              />

              <div>
                <p className="text-lg font-black uppercase italic">Akses Lengkap</p>
                <h2 className="text-5xl font-black uppercase italic leading-none text-amber-300">VIP</h2>
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-lg border border-amber-300/40 bg-amber-400/10 px-4 py-1.5 text-sm font-black uppercase text-amber-300">
              Akses Semua Market
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-5xl font-black">Rp30.000</span>
              <span className="pb-1 text-lg font-black uppercase text-amber-300">/ 7 hari</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Akses lengkap ke seluruh market Lucky Number Picker.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {vipMarkets.map((market) => (
                <div
                  key={market.code}
                  className="rounded-2xl border border-amber-300/25 bg-black/30 p-4 text-center"
                >
                  <Image
                    src={market.icon}
                    alt={market.name}
                    width={64}
                    height={64}
                    className="mx-auto h-14 w-14 rounded-full object-cover"
                  />
                  <div className="mt-3 text-xl font-black text-amber-300">{market.code}</div>
                  <div className="mt-1 text-xs font-black uppercase leading-4">{market.name}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5">
              {[
                "👑 Akses semua market",
                "⚡ Hingga 6 update Toto Macau setiap hari",
                "🎯 Prediksi paling lengkap",
                "▣ Masa aktif 7 hari",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-amber-300/10 bg-black/20 px-4 py-3 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/checkout?plan=vip"
              className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-5 py-4 font-black uppercase text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.26)] transition hover:brightness-110"
            >
              <span>Pilih VIP</span>
              <span className="text-2xl">→</span>
            </Link>
          </article>
        </section>

        <section className="mt-6 grid gap-0 overflow-hidden rounded-[24px] border border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["🎯", "Prediksi Akurat", "Update prediksi setiap hari"],
            ["🛡️", "Aman & Terpercaya", "Sistem aman dan nyaman"],
            ["🕒", "Update Real Time", "Data cepat setiap hari"],
            ["🏆", "Akses Premium", "Pilihan paket sesuai kebutuhan"],
          ].map(([icon, title, desc], index) => (
            <div
              key={title}
              className={`flex min-h-[106px] items-center gap-4 p-5 ${
                index > 0 ? "border-t border-slate-700/50 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <div className="text-5xl">{icon}</div>
              <div>
                <div className="font-black uppercase">{title}</div>
                <div className="mt-1 text-sm leading-5 text-slate-400">{desc}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}