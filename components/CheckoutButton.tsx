"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type CheckoutButtonProps = {
  packageId: string;
};

export default function CheckoutButton({
  packageId,
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
  packageId,
}),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error ?? "Checkout gagal.");
        return;
      }

      if (!window.snap) {
        toast.error("Midtrans Snap belum dimuat.");
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: function () {
          toast.success("Pembayaran berhasil.");
          window.location.href = "/checkout/success";
        },

        onPending: function () {
          toast("Menunggu pembayaran.");
        },

        onError: function () {
          toast.error("Pembayaran gagal.");
        },

        onClose: function () {
          toast("Popup pembayaran ditutup.");
        },
      });
    } catch (error) {
      console.error(error);

      toast.error("Terjadi kesalahan saat checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold transition hover:bg-emerald-700 disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
          Memproses...
        </>
      ) : (
        "Lanjut Pembayaran"
      )}
    </button>
  );
}