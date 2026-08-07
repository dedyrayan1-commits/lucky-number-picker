import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import {
  MEMBERSHIP_PACKAGES,
  MembershipPackageId,
} from "@/lib/membership";

type CheckoutPageProps = {
  searchParams: Promise<{
    plan?: string;
  }>;
};

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const { plan } = await searchParams;

  const selectedPackage =
    plan &&
    plan in MEMBERSHIP_PACKAGES
      ? MEMBERSHIP_PACKAGES[plan as MembershipPackageId]
      : null;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold">
          Checkout
        </h1>

        <p className="mt-4 text-slate-400">
          Pastikan paket yang Anda pilih sudah benar sebelum melanjutkan pembayaran.
        </p>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm text-slate-400">
            Paket Dipilih
          </p>

          <h2 className="mt-3 text-4xl font-bold text-emerald-400">
            {selectedPackage?.name ?? "Unknown Package"}
          </h2>

          <p className="mt-4 text-2xl font-bold text-yellow-400">
            Rp {selectedPackage?.price.toLocaleString("id-ID") ?? "-"}
          </p>

          <p className="mt-2 text-slate-400">
            Masa Aktif : {selectedPackage?.durationDays ?? "-"} Hari
          </p>

          <p className="mt-6 text-slate-300">
            Setelah tombol di bawah ditekan, sistem akan membuat order dan
            menghubungkan Anda ke halaman pembayaran Midtrans.
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <Link
            href="/membership"
            className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
          >
            ← Kembali
          </Link>

          <CheckoutButton
            packageId={selectedPackage?.id ?? ""}
          />
        </div>
      </div>
    </main>
  );
}