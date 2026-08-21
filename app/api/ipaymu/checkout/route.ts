import { NextResponse } from "next/server";
import crypto from "crypto";

const PACKAGES = {
  premium_regular: {
    name: "Premium Regular",
    amount: 15000,
  },
  premium_toto: {
    name: "Premium Toto Macau 4D",
    amount: 20000,
  },
  vip: {
    name: "VIP",
    amount: 30000,
  },
} as const;

type PackageId = keyof typeof PACKAGES;

function createTimestamp() {
  const now = new Date();

  const pad = (value: number) =>
    String(value).padStart(2, "0");

  return (
    now.getUTCFullYear() +
    pad(now.getUTCMonth() + 1) +
    pad(now.getUTCDate()) +
    pad(now.getUTCHours()) +
    pad(now.getUTCMinutes()) +
    pad(now.getUTCSeconds())
  );
}

function createSignature({
  method,
  va,
  apiKey,
  body,
}: {
  method: string;
  va: string;
  apiKey: string;
  body: string;
}) {
  const bodyHash = crypto
    .createHash("sha256")
    .update(body)
    .digest("hex")
    .toLowerCase();

  const stringToSign =
    `${method}:${va}:${bodyHash}:${apiKey}`;

  return crypto
    .createHmac("sha256", apiKey)
    .update(stringToSign)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const packageId =
      body.packageId as PackageId;

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    if (!packageId || !PACKAGES[packageId]) {
      return NextResponse.json(
        {
          error:
            "Paket membership tidak valid.",
        },
        { status: 400 }
      );
    }

    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          error:
            "Nama, email, dan nomor telepon wajib diisi.",
        },
        { status: 400 }
      );
    }

    const va = process.env.IPAYMU_VA;
    const apiKey =
      process.env.IPAYMU_API_KEY;

    if (!va || !apiKey) {
      return NextResponse.json(
        {
          error:
            "Konfigurasi iPaymu Sandbox belum tersedia.",
        },
        { status: 500 }
      );
    }

    const selectedPackage =
      PACKAGES[packageId];

    const referenceId =
      `LNP-IPAYMU-${Date.now()}`;

    const paymentBody = {
      name,
      phone,
      email,
      amount: selectedPackage.amount,
      notifyUrl:
        "https://luckynumberpick.com/api/ipaymu/notification",
      referenceId,
      paymentMethod: "qris",
      paymentChannel: "mpm",
      comments:
        `Lucky Number Picker - ${selectedPackage.name}`,
    };

    const rawBody =
      JSON.stringify(paymentBody);

    const signature =
      createSignature({
        method: "POST",
        va,
        apiKey,
        body: rawBody,
      });

    const timestamp =
      createTimestamp();

    const response = await fetch(
      "https://sandbox.ipaymu.com/api/v2/payment/direct",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          va,
          signature,
          timestamp,
        },
        body: rawBody,
        cache: "no-store",
      }
    );

    const data =
      await response.json();

    if (
      !response.ok ||
      data?.Success === false
    ) {
      console.error(
        "IPAYMU SANDBOX ERROR:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.Message ??
            "Gagal membuat transaksi iPaymu.",
          details: data,
        },
        {
          status:
            response.status || 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      referenceId,
      packageId,
      amount:
        selectedPackage.amount,
      transactionId:
        data?.Data?.TransactionId ??
        null,
      paymentNo:
        data?.Data?.PaymentNo ??
        null,
      paymentName:
        data?.Data?.PaymentName ??
        null,
      paymentUrl:
        data?.Data?.Url ?? null,
      expired:
        data?.Data?.Expired ??
        null,
    });
  } catch (error) {
    console.error(
      "IPAYMU CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat membuat transaksi iPaymu.",
      },
      { status: 500 }
    );
  }
}