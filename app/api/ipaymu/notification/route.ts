import { NextResponse } from "next/server";
import crypto from "crypto";

type CallbackData = Record<string, unknown>;

function normalizeData(
  rawData: Record<string, unknown>
): CallbackData {
  const result: CallbackData = {};

  for (const key of Object.keys(rawData)) {
    const value = rawData[key];

    if (key === "is_escrow") {
      result[key] =
        value === "true" ||
        value === "1" ||
        value === 1 ||
        value === true;

      continue;
    }

    if (
      [
        "trx_id",
        "status_code",
        "transaction_status_code",
        "paid_off",
      ].includes(key)
    ) {
      result[key] = Number.parseInt(
        String(value),
        10
      );

      continue;
    }

    if (key === "additional_info") {
      if (
        value === "[]" ||
        value === null ||
        value === undefined
      ) {
        result[key] = [];
      } else {
        result[key] = value;
      }

      continue;
    }

    result[key] = String(value ?? "");
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      result,
      "additional_info"
    )
  ) {
    result.additional_info = [];
  }

  delete result.signature;

  return result;
}

function sortKeys(
  data: CallbackData
): CallbackData {
  return Object.keys(data)
    .sort((a, b) =>
      a.localeCompare(b)
    )
    .reduce<CallbackData>(
      (sorted, key) => {
        sorted[key] = data[key];
        return sorted;
      },
      {}
    );
}

async function readCallbackBody(
  request: Request
) {
  const contentType =
    request.headers.get(
      "content-type"
    ) ?? "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    return (await request.json()) as Record<
      string,
      unknown
    >;
  }

  const formData =
    await request.formData();

  const result: Record<
    string,
    unknown
  > = {};

  formData.forEach(
    (value, key) => {
      result[key] = String(value);
    }
  );

  return result;
}

export async function POST(
  request: Request
) {
  try {
    const va =
      process.env.IPAYMU_VA;

    if (!va) {
      console.error(
        "IPAYMU_VA tidak tersedia."
      );

      return NextResponse.json(
        {
          error:
            "Konfigurasi callback iPaymu belum tersedia.",
        },
        { status: 500 }
      );
    }

    const receivedSignature =
      request.headers.get(
        "x-signature"
      );

    if (!receivedSignature) {
      return NextResponse.json(
        {
          error:
            "X-Signature tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    const rawData =
      await readCallbackBody(
        request
      );

    const normalizedData =
      normalizeData(rawData);

    const sortedData =
      sortKeys(
        normalizedData
      );

    let jsonBody =
      JSON.stringify(
        sortedData
      );

    jsonBody =
      jsonBody.replace(
        /\//g,
        "\\/"
      );

    const calculatedSignature =
      crypto
        .createHmac(
          "sha256",
          va
        )
        .update(jsonBody)
        .digest("hex");

    if (
      calculatedSignature !==
      receivedSignature
    ) {
      console.error(
        "IPAYMU CALLBACK: Signature tidak valid."
      );

      return NextResponse.json(
        {
          error:
            "Invalid signature.",
        },
        { status: 400 }
      );
    }

    const status =
      String(
        normalizedData.status ??
          ""
      );

    const statusCode =
      Number(
        normalizedData.status_code ??
          0
      );

    const referenceId =
      String(
        normalizedData.reference_id ??
          normalizedData.referenceId ??
          ""
      );

    console.log(
      "IPAYMU CALLBACK VERIFIED:",
      {
        referenceId,
        status,
        statusCode,
        trxId:
          normalizedData.trx_id,
      }
    );

    /*
      BELUM mengaktifkan membership di tahap ini.

      Setelah callback Sandbox terbukti masuk
      dan signature valid, barulah kita
      hubungkan referenceId ke order/user
      di Supabase secara aman.
    */

    return NextResponse.json(
      {
        status: "OK",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "IPAYMU CALLBACK ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat memproses callback iPaymu.",
      },
      { status: 500 }
    );
  }
}