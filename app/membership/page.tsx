import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MembershipPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, membership")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            Upgrade Membership
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Pilih paket membership yang sesuai dengan kebutuhan Anda.
          </p>

          <p className="mt-2 text-emerald-400">
            Membership Saat Ini :
            <span className="ml-2 font-bold capitalize">
              {profile?.membership}
            </span>
          </p>

        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {/* Premium Regular */}
          <div className="rounded-3xl border border-emerald-500/30 bg-slate-900 p-8">

            <h2 className="text-3xl font-bold">
              Premium Regular
            </h2>

            <p className="mt-2 text-slate-400">
              Untuk pemain Hong Kong, Singapore dan Sydney.
            </p>

            <div className="mt-8 space-y-3">

              <p>✅ Hong Kong Lotto</p>
              <p>✅ Singapore</p>
              <p>✅ Sydney Lotto</p>

            </div>

            <Link
  href="/checkout?plan=premium_regular"
  className="mt-10 flex w-full items-center justify-center rounded-xl bg-emerald-600 py-3 font-semibold transition hover:bg-emerald-700"
>
  Upgrade
</Link>

          </div>

          {/* Premium Toto */}
          <div className="rounded-3xl border border-amber-500/30 bg-slate-900 p-8">

            <h2 className="text-3xl font-bold">
              Premium Toto Macau
            </h2>

            <p className="mt-2 text-slate-400">
              Akses khusus prediction Toto Macau.
            </p>

            <div className="mt-8 space-y-3">

              <p>✅ Toto Macau</p>

            </div>

            <Link
  href="/checkout?plan=premium_toto"
  className="mt-10 flex w-full items-center justify-center rounded-xl bg-amber-600 py-3 font-semibold transition hover:bg-amber-700"
>
  Upgrade
</Link>

          </div>

          {/* VIP */}
          <div className="rounded-3xl border border-purple-500/30 bg-slate-900 p-8">

  <h2 className="text-3xl font-bold">
    VIP
  </h2>

            <p className="mt-2 text-slate-400">
              Semua prediction tanpa batas.
            </p>

            <div className="mt-8 space-y-3">

              <p>✅ Hong Kong Lotto</p>
              <p>✅ Singapore</p>
              <p>✅ Sydney Lotto</p>
              <p>✅ Toto Macau</p>

            </div>

            <Link
  href="/checkout?plan=vip"
  className="mt-10 flex w-full items-center justify-center rounded-xl bg-purple-600 py-3 font-semibold transition hover:bg-purple-700"
>
  Upgrade
</Link>

          </div>

        </div>

        <div className="mt-14 text-center">

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
          >
            ← Kembali ke Dashboard
          </Link>

        </div>

      </div>
    </main>
  );
}