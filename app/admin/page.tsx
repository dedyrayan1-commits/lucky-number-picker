export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import AdminMarketCard from "@/components/AdminMarketCard";
import MemberManagementCard from "@/components/MemberManagementCard";

export default async function AdminPage() {
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
    .maybeSingle();

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-3xl font-bold">
          Profile tidak ditemukan
        </h1>
      </main>
    );
  }

  if (profile.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: markets } = await supabase
    .from("markets")
    .select("*")
    .order("id");

  const { data: members } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">

      <h1 className="text-4xl font-bold">
        Admin Panel
      </h1>

      <p className="mt-2 text-slate-400">
        Selamat datang, {profile.full_name}
      </p>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Market Management
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {markets?.map((market) => (
            <AdminMarketCard
  key={market.id}
  marketId={market.id}
  marketName={market.name}
  prediction={market.prediction}
  officialResult={market.official_result}
  drawNumber={market.draw_number}
  drawDate={market.draw_date}
  countryCode={market.country_code}
  status={market.status}
/>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">
          Member Management
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {members?.map((member) => (
            <MemberManagementCard
              key={member.id}
              id={member.id}
              fullName={member.full_name}
              role={member.role}
              membership={member.membership}
            />
          ))}
        </div>
      </section>

    </main>
  );
}