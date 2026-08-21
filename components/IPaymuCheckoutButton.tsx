"use client";

import { useState } from "react";

type IPaymuCheckoutButtonProps = {
  plan: "premium_regular" | "premium_toto" | "vip";
  name: string;
  email: string;
};

type PaymentResult = {
  paymentNo: string | null;
  paymentName: string | null;
  expired: string | null;
};

export default function IPaymuCheckoutButton({
  plan,
  name,
  email,
}: IPaymuCheckoutButtonProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] =
    useState<PaymentResult | null>(null);

  async function handleCheckout() {
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone) {
      alert("Nomor WhatsApp / telepon wajib diisi.");
      return;
    }

    if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      alert("Nomor WhatsApp / telepon tidak valid.");
      return;
    }

    try {
      setLoading(true);
      setPaymentResult(null);

      const response = await fetch("/api/ipaymu/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: plan,
          name,
          email,
          phone: cleanPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("IPAYMU CHECKOUT ERROR:", data);

        alert(
          data?.error ??
            "Gagal membuat transaksi iPaymu Sandbox."
        );

        return;
      }

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }

      if (data?.paymentNo) {
        setPaymentResult({
          paymentNo: data.paymentNo,
          paymentName: data.paymentName ?? null,
          expired: data.expired ?? null,
        });

        return;
      }

      console.error(
        "IPAYMU PAYMENT DATA NOT FOUND:",
        data
      );

      alert(
        "Data pembayaran iPaymu Sandbox tidak ditemukan."
      );
    } catch (error) {
      console.error(
        "IPAYMU CHECKOUT BUTTON ERROR:",
        error
      );

      alert(
        "Terjadi kesalahan saat menghubungkan ke iPaymu Sandbox."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
        Test iPaymu Sandbox
      </p>

      <label className="mt-4 block text-sm text-slate-300">
        Nomor WhatsApp / Telepon
      </label>

      <input
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={(event) =>
          setPhone(
            event.target.value.replace(/[^\d+\-\s]/g, "")
          )
        }
        placeholder="Contoh: 082223798490"
        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
      />

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="mt-3 w-full rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-4 font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Memproses iPaymu Sandbox..."
          : "Test Pembayaran iPaymu Sandbox"}
      </button>

      {paymentResult?.paymentNo ? (
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-sm font-bold text-emerald-300">
            Transaksi Sandbox Berhasil Dibuat
          </p>

          {paymentResult.paymentName ? (
            <p className="mt-2 text-sm text-slate-300">
              Metode: {paymentResult.paymentName}
            </p>
          ) : null}

          <p className="mt-2 break-all text-sm text-slate-300">
            Payment No: {paymentResult.paymentNo}
          </p>

          {paymentResult.expired ? (
            <p className="mt-2 text-sm text-slate-400">
              Berlaku sampai: {paymentResult.expired}
            </p>
          ) : null}

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Ini adalah data pembayaran Sandbox iPaymu untuk
            pengujian integrasi, bukan transaksi pembayaran nyata.
          </p>
        </div>
      ) : null}
    </div>
  );
}