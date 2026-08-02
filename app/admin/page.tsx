export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import AdminMarketCard from "@/components/AdminMarketCard";
import LogoutButton from "@/components/LogoutButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .order("id");

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="flex items-center justify-between">

  <div>
    <h1 className="text-4xl font-bold">
      Admin Dashboard
    </h1>

    <p className="mt-2 text-gray-400">
      Manage daily predictions and official results.
    </p>
  </div>

  <LogoutButton />

</div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {data?.map((market) => (
            <AdminMarketCard
              key={market.id}
              marketId={market.id}
              marketName={market.name}
              prediction={market.prediction}
              officialResult={market.official_result}
              status={market.status}
            />
          ))}
        </div>

      </div>
    </main>
  );
}