import { NextRequest, NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Order ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = await createClient();

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json(
        {
          error: "Order tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    if (order.status === "paid") {
      return NextResponse.json(
        {
          error: "Order sudah dibayar.",
        },
        {
          status: 400,
        }
      );
    }

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: String(order.id),
        gross_amount: Number(order.amount),
      },

      customer_details: {
        first_name: "Lucky Number Picker Member",
      },

      item_details: [
        {
          id: String(order.package),
          name: String(order.package),
          quantity: 1,
          price: Number(order.amount),
        },
      ],

      expiry: {
        unit: "hour",
        duration: 24,
      },
    });

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Gagal membuat transaksi Midtrans.",
      },
      {
        status: 500,
      }
    );
  }
}