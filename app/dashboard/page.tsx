import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import AdFallback from "@/components/AdFallback";

import {
  canSeeRegularPrediction,
  canSeeTotoPrediction,
} from "@/lib/auth/membership";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: markets } = await supabase
    .from("markets")
    .select("*")
    .order("id");

  const now = new Date().toISOString();

  const {
    data: dashboardTopAd,
    error: dashboardTopAdError,
  } = await supabase
    .from("ads")
    .select("id, title, image_url, target_url")
    .eq("position", "dashboard_top")
    .eq("is_active", true)
    .or(`start_at.is.null,start_at.lte.${now}`)
    .or(`end_at.is.null,end_at.gte.${now}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (dashboardTopAdError) {
    console.error(
      "DASHBOARD TOP AD ERROR:",
      dashboardTopAdError
    );
  }

  const {
    data: dashboardBottomAd,
    error: dashboardBottomAdError,
  } = await supabase
    .from("ads")
    .select("id, title, image_url, target_url")
    .eq("position", "dashboard_bottom")
    .eq("is_active", true)
    .or(`start_at.is.null,start_at.lte.${now}`)
    .or(`end_at.is.null,end_at.gte.${now}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (dashboardBottomAdError) {
    console.error(
      "DASHBOARD BOTTOM AD ERROR:",
      dashboardBottomAdError
    );
  }

  const today = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const canSeeRegular = canSeeRegularPrediction(
    profile?.membership
  );

  const canSeeToto = canSeeTotoPrediction(
    profile?.membership
  );

  const regularMarkets =
    markets?.filter(
      (market) => market.name !== "Toto Macau"
    ) ?? [];

  const specialMarkets =
    markets?.filter(
      (market) => market.name === "Toto Macau"
    ) ?? [];

  const membership = profile?.membership ?? "free";

  const membershipVisual =
    membership === "premium_regular"
      ? {
          eyebrow: "MEMBERSHIP AKTIF",
          title: "PREMIUM REGULAR",
          description: "Akses premium untuk market Hong Kong, Sydney, dan Singapore.",
          accent: "text-emerald-300",
          badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
          border: "border-emerald-400/35",
          glow: "shadow-[0_0_60px_rgba(16,185,129,0.12)]",
          overlay:
            "from-emerald-950/95 via-slate-950/82 to-slate-950/68",
          image: "/premium-v5/premium-shield.png",
          imageAlt: "Premium Regular",
          cta: "Lihat Paket Lain",
        }
      : membership === "premium_toto"
        ? {
            eyebrow: "MEMBERSHIP AKTIF",
            title: "PREMIUM TOTO",
            description: "Akses khusus untuk market Toto Macau 4D.",
            accent: "text-cyan-300",
            badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
            border: "border-cyan-400/40",
            glow: "shadow-[0_0_65px_rgba(34,211,238,0.14)]",
            overlay:
              "from-[#041a2a]/95 via-[#061827]/82 to-slate-950/60",
            image: "/premium-v5/premium-diamond.png",
            imageAlt: "Premium Toto Macau 4D",
            cta: "Lihat Paket Lain",
          }
        : membership === "vip"
          ? {
              eyebrow: "MEMBERSHIP AKTIF",
              title: "VIP",
              description: "Akses lengkap ke seluruh market Lucky Number Picker.",
              accent: "text-amber-300",
              badge: "border-amber-300/30 bg-amber-300/10 text-amber-300",
              border: "border-amber-300/45",
              glow: "shadow-[0_0_65px_rgba(251,191,36,0.14)]",
              overlay:
                "from-amber-950/95 via-slate-950/82 to-slate-950/68",
              image: "/premium-v5/premium-crown.png",
              imageAlt: "VIP",
              cta: "Lihat Paket Lain",
            }
          : {
              eyebrow: "MEMBERSHIP",
              title: "FREE",
              description: "Upgrade membership untuk membuka akses prediksi premium.",
              accent: "text-slate-200",
              badge: "border-slate-500/30 bg-slate-500/10 text-slate-200",
              border: "border-slate-700",
              glow: "shadow-[0_0_45px_rgba(15,23,42,0.18)]",
              overlay:
                "from-slate-950/98 via-slate-950/90 to-slate-950/72",
              image: "/premium-v5/premium-diamond.png",
              imageAlt: "Membership",
              cta: "Upgrade Membership",
            };

  function MarketCard({ market }: { market: any }) {
    const showPrediction =
      market.status === "Published" ||
      market.status === "Finished";

    const showOfficial =
      market.status === "Finished";

    const canSeePrediction =
      market.name === "Toto Macau"
        ? canSeeToto
        : canSeeRegular;

    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">
            {market.name}
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              market.status === "Draft"
                ? "bg-yellow-500/20 text-yellow-400"
                : market.status === "Published"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-cyan-500/20 text-cyan-400"
            }`}
          >
            {market.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">
              Prediction
            </p>

            <p className="mt-2 text-3xl font-bold tracking-[0.2em]">
              {!showPrediction
                ? "------"
                : canSeePrediction
                  ? market.prediction || "------"
                  : "🔒 Premium Only"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-sm text-slate-400">
              Official Result
            </p>

            <p className="mt-2 text-3xl font-bold tracking-[0.2em]">
              {showOfficial
                ? market.official_result || "----"
                : "----"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              MEMBER DASHBOARD
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Halo,{" "}
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                {profile?.full_name ?? "User"}
              </span>{" "}
              👋
            </h1>

            <p className="mt-3 text-slate-400">
              Selamat datang kembali di Lucky Number Picker.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-2 shadow-lg">
            <LogoutButton />
          </div>
        </div>

        <div
          className={`relative mt-10 overflow-hidden rounded-[32px] border ${membershipVisual.border} ${membershipVisual.glow}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/dashboard/macau-tower-night.jpg")',
            }}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-r ${membershipVisual.overlay}`}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.14),transparent_34%)]" />

          <div className="relative grid gap-7 p-5 md:p-7 lg:grid-cols-[1.15fr_1fr] lg:p-8">
            <div className="flex flex-col justify-between">
              <div>
                <div
                  className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.28em] ${membershipVisual.badge}`}
                >
                  {membershipVisual.eyebrow}
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-black/25 backdrop-blur-sm">
                    <Image
                      src={membershipVisual.image}
                      alt={membershipVisual.imageAlt}
                      width={104}
                      height={104}
                      className="h-16 w-16 object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
                      Status Membership
                    </p>

                    <h2
                      className={`mt-2 text-4xl font-black uppercase italic tracking-tight md:text-5xl ${membershipVisual.accent}`}
                    >
                      {membershipVisual.title}
                    </h2>
                  </div>
                </div>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                  {membershipVisual.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold backdrop-blur-sm">
                    Membership:{" "}
                    <span className={membershipVisual.accent}>
                      {membership.replaceAll("_", " ")}
                    </span>
                  </div>

                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-300 backdrop-blur-sm">
                    ● Aktif
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-black text-white shadow-[0_0_28px_rgba(34,211,238,0.18)] transition hover:brightness-110"
                >
                  👑 {membershipVisual.cta}
                </Link>

                <Link
                  href="/predictions"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-6 py-3.5 font-semibold text-slate-100 backdrop-blur-sm transition hover:bg-white/10"
                >
                  🎯 Lihat Prediksi
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-400/20 bg-slate-950/60 p-5 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Hari Ini
                    </p>
                    <p className="mt-3 font-bold leading-6 text-white">
                      {today}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-xl">
                    📅
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-5 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Status Akun
                    </p>
                    <p className="mt-3 font-bold capitalize text-emerald-300">
                      {profile?.role}
                    </p>
                    <p className="mt-2 text-xs text-emerald-200/70">
                      Akun aktif
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-xl">
                    👤
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/20 bg-slate-950/60 p-5 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Favorite Numbers
                    </p>
                    <p className="mt-3 text-3xl font-black">
                      0
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 text-xl">
                    ☆
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-400/20 bg-slate-950/60 p-5 backdrop-blur-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Prediction History
                    </p>
                    <p className="mt-3 text-3xl font-black">
                      0
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-xl">
                    ◷
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {dashboardTopAd ? (
            dashboardTopAd.target_url ? (
              <a
                href={dashboardTopAd.target_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dashboardTopAd.title}
                className="group block overflow-hidden rounded-[26px] border border-cyan-400/20 bg-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
              >
                <div
                  className="h-[120px] w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.01] md:h-[180px]"
                  style={{
                    backgroundImage: `url("${dashboardTopAd.image_url}")`,
                  }}
                />
              </a>
            ) : (
              <div
                aria-label={dashboardTopAd.title}
                className="h-[120px] w-full overflow-hidden rounded-[26px] border border-cyan-400/20 bg-slate-900 bg-cover bg-center shadow-[0_0_30px_rgba(34,211,238,0.08)] md:h-[180px]"
                style={{
                  backgroundImage: `url("${dashboardTopAd.image_url}")`,
                }}
              />
            )
          ) : (
            <div className="relative overflow-hidden rounded-[26px] border border-cyan-400/20 bg-[radial-gradient(circle_at_left,rgba(34,211,238,0.12),transparent_34%),linear-gradient(90deg,#07111f_0%,#0b1628_48%,#07101c_100%)] shadow-[0_0_32px_rgba(34,211,238,0.08)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

              <div className="relative flex min-h-[120px] items-center justify-between gap-5 px-5 py-4 md:min-h-[180px] md:px-7">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-2xl md:h-14 md:w-14">
                    📢
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.32em] text-cyan-300 md:text-xs">
                      Lucky Number Picker
                    </p>
                    <h3 className="mt-1 truncate text-lg font-black uppercase tracking-wide text-white md:text-2xl">
                      Tempat Reklame Premium
                    </h3>
                    <p className="mt-1 hidden text-sm text-slate-400 sm:block">
                      Area promosi eksklusif untuk mitra dan pengiklan pilihan.
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 items-center gap-3 sm:flex">
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    Advertising Space
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-slate-400">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-3xl font-bold">
            🎯 Regular Markets
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {regularMarkets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
              />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-6 text-3xl font-bold text-amber-300">
            👑 Premium Special
          </h2>

          <div className="grid gap-6">
            {specialMarkets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          {dashboardBottomAd ? (
            dashboardBottomAd.target_url ? (
              <a
                href={dashboardBottomAd.target_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dashboardBottomAd.title}
                className="block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:-translate-y-1"
              >
                <div
                  className="h-[100px] w-full bg-cover bg-center md:h-[150px]"
                  style={{
                    backgroundImage: `url("${dashboardBottomAd.image_url}")`,
                  }}
                />
              </a>
            ) : (
              <div
                aria-label={dashboardBottomAd.title}
                className="h-[100px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 bg-cover bg-center shadow-lg md:h-[150px]"
                style={{
                  backgroundImage: `url("${dashboardBottomAd.image_url}")`,
                }}
              />
            )
          ) : (
            <AdFallback />
          )}
        </div>

      </div>
    </main>
  );
}