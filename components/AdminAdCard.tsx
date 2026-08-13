"use client";

import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

type AdPosition =
  | "homepage_main"
  | "homepage_bottom"
  | "dashboard_top"
  | "dashboard_bottom";

type AdminAdCardProps = {
  id: number;
  title: string;
  imageUrl: string;
  targetUrl: string | null;
  position: string;
  isActive: boolean;
  startAt: string | null;
  endAt: string | null;
};

export default function AdminAdCard({
  id,
  title,
  imageUrl,
  targetUrl,
  position,
  isActive,
  startAt,
  endAt,
}: AdminAdCardProps) {
  const supabase = createClient();

  const [titleValue, setTitleValue] = useState(title);
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [targetUrlValue, setTargetUrlValue] = useState(
    targetUrl ?? ""
  );

  const [positionValue, setPositionValue] =
    useState<AdPosition>(position as AdPosition);

  const [isActiveValue, setIsActiveValue] =
    useState(isActive);

  const [startAtValue, setStartAtValue] = useState(
    startAt ? startAt.slice(0, 16) : ""
  );

  const [endAtValue, setEndAtValue] = useState(
    endAt ? endAt.slice(0, 16) : ""
  );

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Format gambar harus JPG, PNG, atau WEBP.");
      event.target.value = "";
      return;
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      toast.error("Ukuran gambar maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    const fileExtension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("advertisements")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error(
        "ADVERTISEMENT IMAGE UPDATE UPLOAD ERROR:",
        uploadError
      );

      setUploading(false);
      toast.error("Gagal mengupload gambar reklame.");
      return;
    }

    const { data } = supabase.storage
      .from("advertisements")
      .getPublicUrl(fileName);

    setImageUrlValue(data.publicUrl);
    setUploading(false);

    toast.success(
      "Gambar baru berhasil diupload. Klik Simpan Reklame untuk menerapkan perubahan."
    );
  }

  async function handleSave() {
    if (!titleValue.trim()) {
      toast.error("Judul reklame wajib diisi.");
      return;
    }

    if (!imageUrlValue.trim()) {
      toast.error("Gambar reklame wajib tersedia.");
      return;
    }

    if (
      startAtValue &&
      endAtValue &&
      new Date(endAtValue).getTime() <=
        new Date(startAtValue).getTime()
    ) {
      toast.error(
        "Waktu selesai tayang harus setelah waktu mulai tayang."
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("ads")
      .update({
        title: titleValue.trim(),
        image_url: imageUrlValue.trim(),
        target_url: targetUrlValue.trim() || null,
        position: positionValue,
        is_active: isActiveValue,
        start_at: startAtValue
          ? new Date(startAtValue).toISOString()
          : null,
        end_at: endAtValue
          ? new Date(endAtValue).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      console.error("ADMIN AD UPDATE ERROR:", error);
      toast.error("Gagal memperbarui reklame.");
      return;
    }

    toast.success("Reklame berhasil diperbarui.");
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Hapus reklame ini secara permanen?"
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    const { error } = await supabase
      .from("ads")
      .delete()
      .eq("id", id);

    setDeleting(false);

    if (error) {
      console.error("ADMIN AD DELETE ERROR:", error);
      toast.error("Gagal menghapus reklame.");
      return;
    }

    toast.success("Reklame berhasil dihapus.");

    window.location.reload();
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Advertisement ID #{id}
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            {titleValue || "Untitled Advertisement"}
          </h3>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
            isActiveValue
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          {isActiveValue ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Judul Reklame
          </label>

          <input
            type="text"
            value={titleValue}
            onChange={(event) =>
              setTitleValue(event.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Ganti Gambar Reklame
          </label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            disabled={uploading || loading || deleting}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <p className="mt-2 text-xs text-slate-500">
            Format JPG, PNG, atau WEBP. Maksimal 5 MB.
          </p>

          {uploading ? (
            <p className="mt-2 text-sm font-semibold text-emerald-400">
              Mengupload gambar...
            </p>
          ) : null}

          {imageUrlValue ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
              <img
                src={imageUrlValue}
                alt={`Preview ${titleValue || "reklame"}`}
                className="max-h-64 w-full object-contain"
              />

              <div className="border-t border-slate-800 px-4 py-3">
                <p className="text-xs font-semibold text-emerald-400">
                  Preview gambar reklame
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Target URL
          </label>

          <input
            type="url"
            value={targetUrlValue}
            onChange={(event) =>
              setTargetUrlValue(event.target.value)
            }
            placeholder="https://example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Posisi Reklame
          </label>

          <select
            value={positionValue}
            onChange={(event) =>
              setPositionValue(
                event.target.value as AdPosition
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
          >
            <option value="homepage_main">
              Homepage Main
            </option>

            <option value="homepage_bottom">
              Homepage Bottom
            </option>

            <option value="dashboard_top">
              Dashboard Top
            </option>

            <option value="dashboard_bottom">
              Dashboard Bottom
            </option>
          </select>
        </div>

        <label className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
          <input
            type="checkbox"
            checked={isActiveValue}
            onChange={(event) =>
              setIsActiveValue(event.target.checked)
            }
            className="h-5 w-5"
          />

          <span className="font-semibold">
            Reklame Aktif
          </span>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Mulai Tayang
            </label>

            <input
              type="datetime-local"
              value={startAtValue}
              onChange={(event) =>
                setStartAtValue(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-300">
              Selesai Tayang
            </label>

            <input
              type="datetime-local"
              value={endAtValue}
              onChange={(event) =>
                setEndAtValue(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || deleting || uploading}
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : uploading
              ? "Mengupload Gambar..."
              : "Simpan Reklame"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={loading || deleting || uploading}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Menghapus..." : "Hapus"}
        </button>
      </div>
    </div>
  );
}