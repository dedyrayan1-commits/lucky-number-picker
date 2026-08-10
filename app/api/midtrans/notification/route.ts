import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function getActivationDate(transactionTime?: string | null) {
  if (!transactionTime) {
    return new Date();
  }

  const normalized = transactionTime.includes("T")
    ? transactionTime
    : transactionTime.replace(" ", "T");

  const hasTimezone =
    normalized.endsWith("Z") ||
    /[+-]\d{2}:\d{2}$/.test(normalized);

  const date = new Date(
    hasTimezone ? normalized : `${normalized}+07:00`
  );

  if (Number.isNaN(date.getTime())) {
    return new Date();
  }

  return date;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      transaction_id,
      payment_type,
      transaction_time,
    } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecretKey =
      process.env.SUPABASE_SECRET_KEY;

    if (!serverKey) {
      console.error(
        "MIDTRANS_SERVER_KEY tidak ditemukan."
      );

      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error(
        "SUPABASE URL atau SUPABASE_SECRET_KEY tidak ditemukan."
      );

      return NextResponse.json(
        {
          error:
            "Supabase server configuration error.",
        },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHash("sha512")
      .update(
        `${order_id}${status_code}${gross_amount}${serverKey}`
      )
      .digest("hex");

    if (expectedSignature !== signature_key) {
      console.error(
        "MIDTRANS NOTIFICATION: Signature tidak valid."
      );

      return NextResponse.json(
        { error: "Invalid signature." },
        { status: 401 }
      );
    }

    const orderId = Number(
      String(order_id).replace("LNP-", "")
    );

    if (!Number.isInteger(orderId)) {
      console.error(
        "MIDTRANS NOTIFICATION: Order ID tidak valid:",
        order_id
      );

      return NextResponse.json(
        { error: "Invalid order ID." },
        { status: 400 }
      );
    }

    let orderStatus = "pending";

    if (
      transaction_status === "capture" &&
      fraud_status === "accept"
    ) {
      orderStatus = "paid";
    } else if (
      transaction_status === "settlement"
    ) {
      orderStatus = "paid";
    } else if (
      transaction_status === "pending"
    ) {
      orderStatus = "pending";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel"
    ) {
      orderStatus = "cancelled";
    } else if (
      transaction_status === "expire"
    ) {
      orderStatus = "expired";
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const {
      data: updatedOrder,
      error: orderUpdateError,
    } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        transaction_id:
          transaction_id ?? null,
        payment_type:
          payment_type ?? null,
        transaction_time:
          transaction_time ?? null,
      })
      .eq("id", orderId)
      .select(
        "id, user_id, package, status, membership_activated_at"
      )
      .single();

    if (orderUpdateError || !updatedOrder) {
      console.error(
        "MIDTRANS NOTIFICATION DATABASE ERROR:",
        orderUpdateError
      );

      return NextResponse.json(
        { error: "Gagal memperbarui order." },
        { status: 500 }
      );
    }

    if (
      orderStatus === "paid" &&
      !updatedOrder.membership_activated_at
    ) {
      const validMemberships = [
        "premium_regular",
        "premium_toto",
        "vip",
      ];

      if (
        !validMemberships.includes(
          updatedOrder.package
        )
      ) {
        console.error(
          "MIDTRANS NOTIFICATION: Package tidak valid:",
          updatedOrder.package
        );

        return NextResponse.json(
          { error: "Package tidak valid." },
          { status: 400 }
        );
      }

      const activatedAt =
        getActivationDate(transaction_time);

      const expiredAt = new Date(
        activatedAt.getTime() +
          7 * 24 * 60 * 60 * 1000
      );

      const {
        error: profileUpdateError,
      } = await supabase
        .from("profiles")
        .update({
          membership: updatedOrder.package,
          membership_expired_at:
            expiredAt.toISOString(),
        })
        .eq("id", updatedOrder.user_id);

      if (profileUpdateError) {
        console.error(
          "MIDTRANS MEMBERSHIP UPDATE ERROR:",
          profileUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Pembayaran berhasil tetapi membership gagal diaktifkan.",
          },
          { status: 500 }
        );
      }

      const {
        error: activationUpdateError,
      } = await supabase
        .from("orders")
        .update({
          membership_activated_at:
            activatedAt.toISOString(),
        })
        .eq("id", orderId);

      if (activationUpdateError) {
        console.error(
          "MIDTRANS MEMBERSHIP ACTIVATION ERROR:",
          activationUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Membership berhasil diperbarui tetapi waktu aktivasi order gagal disimpan.",
          },
          { status: 500 }
        );
      }

      console.log(
        "MIDTRANS MEMBERSHIP ACTIVATED:",
        order_id,
        updatedOrder.package,
        expiredAt.toISOString()
      );
    }

    console.log(
      "MIDTRANS NOTIFICATION SUCCESS:",
      order_id,
      transaction_status,
      updatedOrder.status
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "MIDTRANS NOTIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan pada notification handler.",
      },
      { status: 500 }
    );
  }
}