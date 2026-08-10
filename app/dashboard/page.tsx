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
          {/* Prediction */}
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

          {/* Official Result */}
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

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Halo, {profile?.full_name ?? "User"} 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Selamat datang kembali di Lucky Number Picker.
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* Hero */}
        <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-slate-900 p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                Membership
              </p>

              <h2 className="mt-3 text-5xl font-bold capitalize">
                {profile?.membership ?? "Free"}
              </h2>

              <p className="mt-4 max-w-md text-slate-300">
                Gunakan Lucky Number Picker untuk melihat prediksi market pilihan Anda.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">
                  Hari Ini
                </p>

                <p className="mt-3 font-semibold">
                  {today}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">
                  Status Akun
                </p>

                <p className="mt-3 font-semibold capitalize text-emerald-400">
                  {profile?.role}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">
                  Favorite Numbers
                </p>

                <p className="mt-3 text-3xl font-bold">
                  0
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">
                  Prediction History
                </p>

                <p className="mt-3 text-3xl font-bold">
                  0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Top Advertisement */}
        <div className="mt-8">
          {dashboardTopAd ? (
            dashboardTopAd.target_url ? (
              <a
                href={dashboardTopAd.target_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dashboardTopAd.title}
                className="block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:-translate-y-1"
              >
                <div
                  className="h-[100px] w-full bg-cover bg-center md:h-[150px]"
                  style={{
                    backgroundImage: `url("${dashboardTopAd.image_url}")`,
                  }}
                />
              </a>
            ) : (
              <div
                aria-label={dashboardTopAd.title}
                className="h-[100px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 bg-cover bg-center shadow-lg md:h-[150px]"
                style={{
                  backgroundImage: `url("${dashboardTopAd.image_url}")`,
                }}
              />
            )
          ) : (
            <AdFallback />
          )}
        </div>

        {/* Regular Markets */}
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

        {/* Premium Special */}
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

        {/* Dashboard Bottom Advertisement */}
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