import Link from "next/link";

import CheckoutButton from "@/components/CheckoutButton";

type CheckoutPageProps = {
  searchParams: Promise<{
    plan?: string;
  }>;
};

const PACKAGES = {
  premium_regular: {
    name: "Premium Regular",
    price: 15000,
    duration: "7 hari",
    description:
      "Akses prediksi Hong Kong Lotto, Singapore, dan Sydney Lotto.",
  },
  premium_toto: {
    name: "Premium Toto Macau 4D",
    price: 20000,
    duration: "7 hari",
    description:
      "Akses prediksi khusus Toto Macau 4D.",
  },
  vip: {
    name: "VIP",
    price: 30000,
    duration: "7 hari",
    description:
      "Akses lengkap seluruh market Lucky Number Picker.",
  },
} as const;

type PackageId = keyof typeof PACKAGES;

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const { plan } = await searchParams;

  const selectedPackage =
    plan && plan in PACKAGES
      ? PACKAGES[plan as PackageId]
      : null;

  const selectedPlan =
    plan && plan in PACKAGES
      ? (plan as PackageId)
      : null;

  if (!selectedPackage || !selectedPlan) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h1 className="text-3xl font-bold">
            Paket Tidak Ditemukan
          </h1>

          <p className="mt-4 text-slate-300">
            Silakan pilih paket membership terlebih dahulu.
          </p>

          <Link
            href="/premium"
            className="mt-8 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Kembali ke Pilihan Paket
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            CHECKOUT
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Ringkasan Pesanan
          </h1>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm text-slate-400">
            Paket Membership
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {selectedPackage.name}
          </h2>

          <div className="mt-6 border-t border-slate-800 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Harga
              </span>

              <span className="text-2xl font-bold">
                Rp{selectedPackage.price.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-slate-400">
                Masa Aktif
              </span>

              <span className="font-semibold">
                {selectedPackage.duration}
              </span>
            </div>
          </div>

          <p className="mt-6 rounded-xl bg-slate-800 p-4 text-slate-300">
            {selectedPackage.description}
          </p>

          <CheckoutButton plan={selectedPlan} />

          <Link
            href="/premium"
            className="mt-4 block text-center text-sm text-slate-400 transition hover:text-white"
          >
            Kembali ke pilihan paket
          </Link>
        </div>
      </div>
    </main>
  );
}