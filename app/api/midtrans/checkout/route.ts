import { NextRequest, NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";
import {
  MEMBERSHIP_PACKAGES,
  MembershipPackageId,
} from "@/lib/membership";

export async function POST(req: NextRequest) {
  console.log("=================================");
  console.log("CHECKOUT ROUTE MASUK");
  console.log("=================================");

  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION :", session);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("USER :", user);
    console.log("AUTH ERROR :", authError);

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Silakan login terlebih dahulu.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    console.log("BODY :", body);

    const packageId = body?.packageId as
      | MembershipPackageId
      | undefined;

    if (
      !packageId ||
      !(packageId in MEMBERSHIP_PACKAGES)
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
      MEMBERSHIP_PACKAGES[packageId];

    console.log("INSERT ORDER...");

    console.log({
      user_id: user.id,
      package: packageId,
      amount: selectedPackage.price,
      status: "pending",
    });

    const { data: order, error: orderError } =
      await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          package: packageId,
          amount: selectedPackage.price,
          status: "pending",
        })
        .select()
        .single();

    console.log("ORDER :", order);
    console.log("ORDER ERROR :", orderError);

    if (orderError || !order) {
      return NextResponse.json(
        {
          error: "Gagal membuat order.",
          details: orderError,
        },
        {
          status: 500,
        }
      );
    }

    console.log("MEMBUAT TRANSAKSI MIDTRANS...");

    const transaction =
      await snap.createTransaction({
        transaction_details: {
          order_id: String(order.id),
          gross_amount: Number(order.amount),
        },

        customer_details: {
          first_name:
            user.user_metadata?.full_name ??
            user.email ??
            "Lucky Number Picker Member",

          email: user.email!,
        },

        item_details: [
          {
            id: packageId,
            name: selectedPackage.name,
            quantity: 1,
            price: selectedPackage.price,
          },
        ],

        expiry: {
          unit: "hour",
          duration: 24,
        },
      });

    console.log("MIDTRANS BERHASIL");
    console.log(transaction);

    return NextResponse.json({
      success: true,
      token: transaction.token,
      redirect_url:
        transaction.redirect_url,
      orderId: order.id,
    });
  } catch (err) {
    console.error("CHECKOUT ERROR");
    console.error(err);

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat memproses checkout.",
      },
      {
        status: 500,
      }
    );
  }
}