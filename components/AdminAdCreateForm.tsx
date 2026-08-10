"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

type AdPosition =
  | "homepage_main"
  | "homepage_bottom"
  | "dashboard_top"
  | "dashboard_bottom";

export default function AdminAdCreateForm() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [position, setPosition] =
    useState<AdPosition>("homepage_main");

  const [isActive, setIsActive] = useState(true);

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!title.trim()) {
      toast.error("Judul reklame wajib diisi.");
      return;
    }

    if (!imageUrl.trim()) {
      toast.error("URL gambar reklame wajib diisi.");
      return;
    }

    if (
      startAt &&
      endAt &&
      new Date(endAt).getTime() <= new Date(startAt).getTime()
    ) {
      toast.error(
        "Waktu selesai tayang harus setelah waktu mulai tayang."
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("ads")
      .insert({
        title: title.trim(),
        image_url: imageUrl.trim(),
        target_url: targetUrl.trim() || null,
        position,
        is_active: isActive,
        start_at: startAt
          ? new Date(startAt).toISOString()
          : null,
        end_at: endAt
          ? new Date(endAt).toISOString()
          : null,
      });

    setLoading(false);

    if (error) {
      console.error("ADMIN AD CREATE ERROR:", error);

      toast.error("Gagal membuat reklame.");
      return;
    }

    toast.success("Reklame baru berhasil dibuat.");

    setTitle("");
    setImageUrl("");
    setTargetUrl("");
    setPosition("homepage_main");
    setIsActive(true);
    setStartAt("");
    setEndAt("");

    window.location.reload();
  }

  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-slate-900 p-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
          Advertisement
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          Tambah Reklame Baru
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Buat reklame baru dan tentukan posisi serta masa tayangnya.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Judul Reklame
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Contoh: Promo Brand A"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            URL Gambar
          </label>

          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Target URL
          </label>

          <input
            type="url"
            value={targetUrl}
            onChange={(event) => setTargetUrl(event.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            Posisi Reklame
          </label>

          <select
            value={position}
            onChange={(event) =>
              setPosition(event.target.value as AdPosition)
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
            checked={isActive}
            onChange={(event) =>
              setIsActive(event.target.checked)
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
              value={startAt}
              onChange={(event) =>
                setStartAt(event.target.value)
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
              value={endAt}
              onChange={(event) =>
                setEndAt(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Membuat..." : "Tambah Reklame"}
      </button>
    </div>
  );
}