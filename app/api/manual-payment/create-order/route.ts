import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Silakan login terlebih dahulu.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const packageId = body.packageId as PackageId;

    if (!packageId || !PACKAGES[packageId]) {
      return NextResponse.json(
        {
          error: "Paket membership tidak valid.",
        },
        { status: 400 }
      );
    }

    const selectedPackage = PACKAGES[packageId];

    const transactionId = `MANUAL-${Date.now()}`;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        package: packageId,
        amount: selectedPackage.amount,
        status: "pending",
        transaction_id: transactionId,
        payment_type: "bank_transfer",
        transaction_time: new Date().toISOString(),
      })
      .select(
        "id, package, amount, status, transaction_id"
      )
      .single();

    if (orderError) {
      console.error(
        "MANUAL PAYMENT CREATE ORDER ERROR:",
        orderError
      );

      return NextResponse.json(
        {
          error: "Gagal membuat order pembayaran manual.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
      packageName: selectedPackage.name,

      bank: {
        name: "Bank Central Asia (BCA)",
        accountNumber: "3831725280",
        accountHolder: "Dedy Rayan",
      },
    });
  } catch (error) {
    console.error(
      "MANUAL PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat membuat pembayaran manual.",
      },
      { status: 500 }
    );
  }
}