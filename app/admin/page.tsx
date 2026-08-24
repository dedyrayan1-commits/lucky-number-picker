export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import AdminMarketCard from "@/components/AdminMarketCard";
import MemberManagementCard from "@/components/MemberManagementCard";
import AdminAdCard from "@/components/AdminAdCard";
import AdminAdCreateForm from "@/components/AdminAdCreateForm";
import AdminTotoMacauDraws from "@/components/AdminTotoMacauDraws";
import AdminManualPaymentCard from "@/components/AdminManualPaymentCard";
import LogoutButton from "@/components/LogoutButton";

type AdminManualPaymentRow = {
  id: number;
  user_id: string;
  package: string;
  amount: number;
  status: string;
  transaction_id: string | null;
  payment_proof: string;
  created_at: string;
  member_name: string | null;
};

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

  const totoMacauMarket =
    markets?.find((market) => market.name === "Toto Macau") ?? null;

  const { data: members } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  const { data: ads } = await supabase
    .from("ads")
    .select("*")
    .order("created_at");

  const {
    data: manualOrdersData,
    error: manualOrdersError,
  } = await supabase.rpc(
    "get_admin_manual_payments"
  );

  const manualOrders =
    (manualOrdersData ?? []) as AdminManualPaymentRow[];

  if (manualOrdersError) {
    console.error(
      "GET ADMIN MANUAL PAYMENTS ERROR:",
      manualOrdersError
    );
  }

  const manualPayments =
    await Promise.all(
      (manualOrders ?? []).map(async (order) => {
        const { data: signedProof } =
          await supabase.storage
            .from("payment-proofs")
            .createSignedUrl(
              order.payment_proof,
              60 * 60
            );

        return {
          ...order,
          memberName:
            order.member_name ?? "Member",
          proofUrl:
            signedProof?.signedUrl ?? "",
        };
      })
    );

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Panel
          </h1>

          <p className="mt-2 text-slate-400">
            Selamat datang, {profile.full_name}
          </p>
        </div>

        <LogoutButton />
      </div>

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

      {totoMacauMarket && (
        <section className="mt-16">
          <AdminTotoMacauDraws marketId={totoMacauMarket.id} />
        </section>
      )}

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

      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Manual Payment Verification
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Periksa bukti transfer member sebelum menyetujui pembayaran dan mengaktifkan membership.
          </p>
        </div>

        {manualPayments.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {manualPayments.map((order) => (
              <AdminManualPaymentCard
                key={order.id}
                orderId={order.id}
                transactionId={
                  order.transaction_id ?? `ORDER-${order.id}`
                }
                memberName={order.memberName}
                memberEmail="Tidak tersedia di profile"
                packageName={order.package}
                amount={order.amount}
                status={order.status}
                paymentProof={order.payment_proof}
                proofUrl={order.proofUrl}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
            Belum ada pembayaran transfer bank yang menunggu verifikasi.
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">
          Advertisement Management
        </h2>

        <div className="mb-8">
          <AdminAdCreateForm />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {ads?.map((ad) => (
            <AdminAdCard
              key={ad.id}
              id={ad.id}
              title={ad.title}
              imageUrl={ad.image_url}
              targetUrl={ad.target_url}
              position={ad.position}
              isActive={ad.is_active}
              startAt={ad.start_at}
              endAt={ad.end_at}
            />
          ))}
        </div>
      </section>
    </main>
  );
}