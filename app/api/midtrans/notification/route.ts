import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { serviceClient } from "@/lib/supabase/service";
import { activateMembership } from "@/lib/services/membership";

export async function POST(req: NextRequest) {
  try {
    console.log("=================================");
    console.log("MIDTRANS WEBHOOK");
    console.log("=================================");

    const body = await req.json();

    const {
      order_id,
      transaction_status,
      fraud_status,
      payment_type,
      transaction_id,
      transaction_time,
      status_code,
      gross_amount,
      signature_key,
    } = body;

    // ==============================
    // Verify Signature
    // ==============================

    const signature = crypto
      .createHash("sha512")
      .update(
        order_id +
          status_code +
          gross_amount +
          process.env.MIDTRANS_SERVER_KEY
      )
      .digest("hex");

    if (signature !== signature_key) {
      return NextResponse.json(
        {
          error: "Invalid Signature",
        },
        {
          status: 403,
        }
      );
    }

    // ==============================
    // Cari Order
    // ==============================

    const { data: order, error: orderError } =
      await serviceClient
        .from("orders")
        .select("*")
        .eq("id", order_id)
        .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          error: "Order tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    // ==============================
    // Idempotent Check
    // ==============================

    if (order.membership_activated_at) {
      console.log("Webhook sudah pernah diproses.");

      return NextResponse.json({
        success: true,
      });
    }

    // ==============================
    // Tentukan Status
    // ==============================

    let status = "pending";

    if (
      transaction_status === "capture" &&
      fraud_status === "accept"
    ) {
      status = "paid";
    } else if (
      transaction_status === "settlement"
    ) {
      status = "paid";
    } else if (
      transaction_status === "pending"
    ) {
      status = "pending";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      status = "failed";
    }

        console.log("STATUS :", status);

    // ==============================
    // Update Order
    // ==============================

    const { error: updateOrderError } = await serviceClient
      .from("orders")
      .update({
        status,
        payment_type,
        transaction_id,
        transaction_time,
      })
      .eq("id", order_id);

    if (updateOrderError) {
      console.error(updateOrderError);

      return NextResponse.json(
        {
          error: "Gagal mengupdate order",
        },
        {
          status: 500,
        }
      );
    }

    // ==============================
    // Aktivasi Membership
    // ==============================

    if (status === "paid") {
      console.log("Mengaktifkan membership...");

      const activatedAt = await activateMembership({
        userId: order.user_id,
        packageId: order.package,
      });

      const { error: activatedError } = await serviceClient
        .from("orders")
        .update({
          membership_activated_at:
            activatedAt.toISOString(),
        })
        .eq("id", order.id);

      if (activatedError) {
        console.error(activatedError);

        return NextResponse.json(
          {
            error:
              "Membership berhasil tetapi gagal mengupdate order.",
          },
          {
            status: 500,
          }
        );
      }

      console.log("Membership berhasil diaktifkan.");
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("WEBHOOK ERROR");
    console.error(error);

    return NextResponse.json(
      {
        error: "Webhook Error",
      },
      {
        status: 500,
      }
    );
  }
}