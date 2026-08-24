import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (
      profileError ||
      !profile ||
      profile.role !== "admin"
    ) {
      return NextResponse.json(
        {
          error:
            "Anda tidak memiliki akses untuk menyetujui pembayaran.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const orderId = Number(body.orderId);

    if (
      !Number.isInteger(orderId) ||
      orderId <= 0
    ) {
      return NextResponse.json(
        {
          error: "Order tidak valid.",
        },
        { status: 400 }
      );
    }

    const {
      data: approved,
      error: approveError,
    } = await supabase.rpc(
      "approve_manual_payment",
      {
        p_order_id: orderId,
      }
    );

    if (approveError) {
      console.error(
        "APPROVE MANUAL PAYMENT RPC ERROR:",
        approveError
      );

      return NextResponse.json(
        {
          error:
            "Gagal menyetujui pembayaran manual.",
        },
        { status: 500 }
      );
    }

    if (approved !== true) {
      return NextResponse.json(
        {
          error:
            "Order tidak dapat disetujui. Pastikan order masih pending dan bukti pembayaran sudah tersedia.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Pembayaran berhasil disetujui dan membership telah diaktifkan selama 7 hari.",
    });
  } catch (error) {
    console.error(
      "ADMIN APPROVE MANUAL PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat menyetujui pembayaran manual.",
      },
      { status: 500 }
    );
  }
}