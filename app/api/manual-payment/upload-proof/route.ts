import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function getFileExtension(file: File) {
  const extension = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "webp"
  ) {
    return extension;
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  return "jpg";
}

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

    const formData = await request.formData();

    const orderIdRaw = formData.get("orderId");
    const proofFile = formData.get("proof");

    const orderId = Number(orderIdRaw);

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

    if (!(proofFile instanceof File)) {
      return NextResponse.json(
        {
          error:
            "Silakan pilih bukti pembayaran terlebih dahulu.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(proofFile.type)) {
      return NextResponse.json(
        {
          error:
            "Bukti pembayaran harus berupa JPG, PNG, atau WEBP.",
        },
        { status: 400 }
      );
    }

    if (proofFile.size <= 0) {
      return NextResponse.json(
        {
          error: "File bukti pembayaran kosong.",
        },
        { status: 400 }
      );
    }

    if (proofFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            "Ukuran bukti pembayaran maksimal 5 MB.",
        },
        { status: 400 }
      );
    }

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .select(
        "id, user_id, status, payment_type, payment_proof"
      )
      .eq("id", orderId)
      .eq("user_id", user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          error: "Order tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    if (order.payment_type !== "bank_transfer") {
      return NextResponse.json(
        {
          error:
            "Order ini bukan pembayaran transfer bank manual.",
        },
        { status: 400 }
      );
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        {
          error:
            "Bukti pembayaran hanya dapat dikirim untuk order pending.",
        },
        { status: 400 }
      );
    }

    const extension =
      getFileExtension(proofFile);

    const filePath =
      `${user.id}/${order.id}-${Date.now()}.${extension}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("payment-proofs")
      .upload(filePath, proofFile, {
        contentType: proofFile.type,
        upsert: false,
      });

    if (uploadError) {
      console.error(
        "PAYMENT PROOF UPLOAD ERROR:",
        uploadError
      );

      return NextResponse.json(
        {
          error:
            "Gagal mengupload bukti pembayaran.",
        },
        { status: 500 }
      );
    }

    const {
      data: proofUpdated,
      error: updateError,
    } = await supabase.rpc(
      "set_manual_payment_proof",
      {
        p_order_id: order.id,
        p_payment_proof: filePath,
      }
    );

    if (updateError || proofUpdated !== true) {
      console.error(
        "PAYMENT PROOF RPC UPDATE ERROR:",
        updateError ?? "Order tidak berhasil diperbarui."
      );

      await supabase.storage
        .from("payment-proofs")
        .remove([filePath]);

      return NextResponse.json(
        {
          error:
            "Bukti berhasil diupload tetapi gagal dicatat pada order.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Bukti pembayaran berhasil dikirim.",
      paymentProof: filePath,
    });
  } catch (error) {
    console.error(
      "UPLOAD PAYMENT PROOF ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat mengirim bukti pembayaran.",
      },
      { status: 500 }
    );
  }
}