import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { snap } from "@/lib/midtrans";

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
    const notificationUrl =
      process.env.MIDTRANS_NOTIFICATION_URL;

    if (!notificationUrl) {
      console.error(
        "MIDTRANS_NOTIFICATION_URL tidak ditemukan."
      );

      return NextResponse.json(
        {
          error: "Notification URL belum dikonfigurasi.",
        },
        {
          status: 500,
        }
      );
    }

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
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const packageId =
      body?.packageId as PackageId | undefined;

    if (
      !packageId ||
      !(packageId in PACKAGES)
    ) {
      return NextResponse.json(
        {
          error: "Paket membership tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    const selectedPackage =
      PACKAGES[packageId];

    const { data: order, error: orderError } =
      await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          package: packageId,
          amount: selectedPackage.amount,
          status: "pending",
        })
        .select("id")
        .single();

    if (orderError || !order) {
      console.error(
        "CREATE ORDER ERROR:",
        orderError
      );

      return NextResponse.json(
        {
          error: "Gagal membuat order.",
        },
        {
          status: 500,
        }
      );
    }

    const transactionId =
      `LNP-${order.id}`;

    snap.httpClient.http_client.defaults.headers.common[
      "X-Override-Notification"
    ] = notificationUrl;

    const transaction =
      await snap.createTransaction({
        transaction_details: {
          order_id: transactionId,
          gross_amount:
            selectedPackage.amount,
        },

        item_details: [
          {
            id: packageId,
            price: selectedPackage.amount,
            quantity: 1,
            name: selectedPackage.name,
          },
        ],

        customer_details: {
          email: user.email ?? undefined,
        },
      });

    const { error: updateError } =
      await supabase
        .from("orders")
        .update({
          transaction_id: transactionId,
        })
        .eq("id", order.id);

    if (updateError) {
      console.error(
        "UPDATE TRANSACTION ID ERROR:",
        updateError
      );
    }

    return NextResponse.json({
      token: transaction.token,
      redirect_url:
        transaction.redirect_url,
    });
  } catch (error) {
    console.error(
      "MIDTRANS CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat membuat transaksi.",
      },
      {
        status: 500,
      }
    );
  }
}