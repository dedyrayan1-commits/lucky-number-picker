"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdatePassword() {
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      console.error("UPDATE PASSWORD ERROR:", error);

      toast.error("Gagal memperbarui password.", {
        description: error.message,
      });

      return;
    }

    toast.success("Password berhasil diperbarui.");

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-center text-3xl font-bold">
          Buat Password Baru
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Masukkan password baru untuk akun Anda.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold">
            Password Baru
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold">
            Konfirmasi Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
            placeholder="Ulangi password baru"
          />
        </div>

        <button
          type="button"
          onClick={handleUpdatePassword}
          disabled={loading}
          className="mt-7 w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Password Baru"}
        </button>
      </div>
    </main>
  );
}