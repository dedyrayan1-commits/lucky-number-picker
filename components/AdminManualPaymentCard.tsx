"use client";

import { useState } from "react";

type AdminManualPaymentCardProps = {
  orderId: number;
  transactionId: string;
  memberName: string;
  memberEmail: string;
  packageName: string;
  amount: number;
  status: string;
  paymentProof: string;
  proofUrl: string;
};

export default function AdminManualPaymentCard({
  orderId,
  transactionId,
  memberName,
  memberEmail,
  packageName,
  amount,
  status,
  paymentProof,
  proofUrl,
}: AdminManualPaymentCardProps) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] =
    useState(status);

  async function handleApprove() {
    const confirmed = window.confirm(
      "Setujui pembayaran ini dan aktifkan membership member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/manual-payment/admin/approve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "ADMIN MANUAL PAYMENT APPROVE ERROR:",
          data
        );

        alert(
          data?.error ??
            "Gagal menyetujui pembayaran."
        );

        return;
      }

      setCurrentStatus("paid");

      alert(
        data?.message ??
          "Pembayaran berhasil disetujui dan membership telah diaktifkan."
      );
    } catch (error) {
      console.error(
        "ADMIN MANUAL PAYMENT CARD ERROR:",
        error
      );

      alert(
        "Terjadi kesalahan saat menyetujui pembayaran."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
            Transfer Bank Manual
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {transactionId}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            currentStatus === "paid"
              ? "bg-emerald-500/15 text-emerald-300"
              : "bg-amber-500/15 text-amber-300"
          }`}
        >
          {currentStatus}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300">
        <p>
          Member:{" "}
          <span className="font-semibold text-white">
            {memberName}
          </span>
        </p>

        <p>
          Email:{" "}
          <span className="font-semibold text-white">
            {memberEmail}
          </span>
        </p>

        <p>
          Paket:{" "}
          <span className="font-semibold text-white">
            {packageName}
          </span>
        </p>

        <p>
          Nominal:{" "}
          <span className="font-bold text-amber-300">
            Rp{amount.toLocaleString("id-ID")}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-slate-200">
          Bukti Pembayaran
        </p>

        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
          <img
            src={proofUrl}
            alt={`Bukti pembayaran ${transactionId}`}
            className="max-h-[520px] w-full object-contain"
          />
        </div>

        <p className="mt-2 break-all text-xs text-slate-500">
          {paymentProof}
        </p>
      </div>

      {currentStatus === "pending" ? (
        <button
          type="button"
          onClick={handleApprove}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-4 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Memproses..."
            : "Setujui Pembayaran & Aktifkan Membership"}
        </button>
      ) : (
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="font-bold text-emerald-300">
            Pembayaran sudah disetujui
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Order ini sudah berstatus paid dan tidak perlu diproses lagi.
          </p>
        </div>
      )}
    </div>
  );
}