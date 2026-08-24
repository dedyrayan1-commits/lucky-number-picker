"use client";

import { ChangeEvent, useState } from "react";

type ManualPaymentButtonProps = {
  plan: "premium_regular" | "premium_toto" | "vip";
};

type ManualOrderResult = {
  order: {
    id: number;
    package: string;
    amount: number;
    status: string;
    transaction_id: string;
  };
  packageName: string;
  bank: {
    name: string;
    accountNumber: string;
    accountHolder: string;
  };
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function ManualPaymentButton({
  plan,
}: ManualPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] =
    useState<ManualOrderResult | null>(null);

  const [proofFile, setProofFile] =
    useState<File | null>(null);

  const [uploadingProof, setUploadingProof] =
    useState(false);

  const [proofUploaded, setProofUploaded] =
    useState(false);

  async function handleCreateOrder() {
    try {
      setLoading(true);
      setPayment(null);
      setProofFile(null);
      setProofUploaded(false);

      const response = await fetch(
        "/api/manual-payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageId: plan,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "MANUAL PAYMENT ERROR:",
          data
        );

        alert(
          data?.error ??
            "Gagal membuat order pembayaran manual."
        );

        return;
      }

      setPayment(data);
    } catch (error) {
      console.error(
        "MANUAL PAYMENT BUTTON ERROR:",
        error
      );

      alert(
        "Terjadi kesalahan saat membuat pembayaran manual."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyAccount() {
    if (!payment?.bank.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        payment.bank.accountNumber
      );

      alert("Nomor rekening berhasil disalin.");
    } catch {
      alert(
        "Nomor rekening gagal disalin. Silakan salin secara manual."
      );
    }
  }

  function handleProofChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    setProofUploaded(false);

    if (!file) {
      setProofFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(
        "Bukti pembayaran harus berupa JPG, PNG, atau WEBP."
      );

      event.target.value = "";
      setProofFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(
        "Ukuran bukti pembayaran maksimal 5 MB."
      );

      event.target.value = "";
      setProofFile(null);
      return;
    }

    if (file.size <= 0) {
      alert("File bukti pembayaran kosong.");

      event.target.value = "";
      setProofFile(null);
      return;
    }

    setProofFile(file);
  }

  async function handleUploadProof() {
    if (!payment?.order.id) {
      alert("Order pembayaran tidak ditemukan.");
      return;
    }

    if (!proofFile) {
      alert(
        "Silakan pilih bukti pembayaran terlebih dahulu."
      );
      return;
    }

    try {
      setUploadingProof(true);
      setProofUploaded(false);

      const formData = new FormData();

      formData.append(
        "orderId",
        String(payment.order.id)
      );

      formData.append(
        "proof",
        proofFile
      );

      const response = await fetch(
        "/api/manual-payment/upload-proof",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "UPLOAD PAYMENT PROOF ERROR:",
          data
        );

        alert(
          data?.error ??
            "Gagal mengupload bukti pembayaran."
        );

        return;
      }

      setProofUploaded(true);

      alert(
        data?.message ??
          "Bukti pembayaran berhasil dikirim."
      );
    } catch (error) {
      console.error(
        "UPLOAD PAYMENT PROOF BUTTON ERROR:",
        error
      );

      alert(
        "Terjadi kesalahan saat mengupload bukti pembayaran."
      );
    } finally {
      setUploadingProof(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
        Transfer Bank Manual
      </p>

      {!payment ? (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Buat order terlebih dahulu untuk mendapatkan
            informasi rekening pembayaran.
          </p>

          <button
            type="button"
            onClick={handleCreateOrder}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-amber-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Membuat Order..."
              : "Bayar via Transfer Bank"}
          </button>
        </>
      ) : (
        <div className="mt-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="font-bold text-emerald-300">
              Order berhasil dibuat
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Order ID:{" "}
              <span className="font-semibold text-white">
                {payment.order.transaction_id}
              </span>
            </p>

            <p className="mt-1 text-sm text-slate-300">
              Paket:{" "}
              <span className="font-semibold text-white">
                {payment.packageName}
              </span>
            </p>

            <p className="mt-1 text-sm text-slate-300">
              Total pembayaran:{" "}
              <span className="font-bold text-amber-300">
                Rp
                {payment.order.amount.toLocaleString(
                  "id-ID"
                )}
              </span>
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">
              Transfer pembayaran ke:
            </p>

            <p className="mt-3 text-lg font-bold text-white">
              {payment.bank.name}
            </p>

            <p className="mt-3 text-3xl font-black tracking-wider text-amber-300">
              {payment.bank.accountNumber}
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Atas Nama:{" "}
              <span className="font-semibold text-white">
                {payment.bank.accountHolder}
              </span>
            </p>

            <button
              type="button"
              onClick={handleCopyAccount}
              className="mt-4 w-full rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 font-semibold text-amber-300 transition hover:bg-amber-400/20"
            >
              Salin Nomor Rekening
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="text-sm font-bold text-cyan-200">
              Upload Bukti Pembayaran
            </p>

            <p className="mt-2 text-sm leading-6 text-cyan-100">
              Setelah melakukan transfer, pilih screenshot
              atau foto bukti pembayaran. Format yang
              diterima JPG, PNG, atau WEBP dengan ukuran
              maksimal 5 MB.
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleProofChange}
              disabled={
                uploadingProof || proofUploaded
              }
              className="mt-4 block w-full rounded-xl border border-cyan-500/20 bg-slate-950 px-3 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/10 file:px-4 file:py-2 file:font-semibold file:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            />

            {proofFile && !proofUploaded ? (
              <p className="mt-3 break-all text-xs text-slate-400">
                File dipilih: {proofFile.name}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handleUploadProof}
              disabled={
                !proofFile ||
                uploadingProof ||
                proofUploaded
              }
              className="mt-4 w-full rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploadingProof
                ? "Mengupload Bukti..."
                : proofUploaded
                  ? "Bukti Pembayaran Sudah Dikirim"
                  : "Upload Bukti Pembayaran"}
            </button>

            {proofUploaded ? (
              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="font-bold text-emerald-300">
                  Bukti pembayaran berhasil dikirim
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Pembayaran Anda menunggu pemeriksaan admin.
                  Membership akan diaktifkan setelah pembayaran
                  dikonfirmasi.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}