"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  plan: "premium_regular" | "premium_toto" | "vip";
};

export default function CheckoutButton({
  plan,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const response = await fetch("/api/midtrans/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error ?? "Gagal membuat transaksi.");
        return;
      }

      if (!data.redirect_url) {
        alert("URL pembayaran Midtrans tidak ditemukan.");
        return;
      }

      window.location.href = data.redirect_url;
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      alert(
        "Terjadi kesalahan saat menghubungkan ke pembayaran."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className="mt-8 w-full rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading
        ? "Memproses Pembayaran..."
        : "Lanjut Pembayaran"}
    </button>
  );
}