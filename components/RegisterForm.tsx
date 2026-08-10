"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError("");
    setMessage("");

    if (!fullName.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!email || !password || !confirmPassword) {
      setError("Email dan Password wajib diisi.");
      return;
    }

    if (!email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    const {
      data,
      error: signUpError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessage(
      "Pendaftaran berhasil. Silakan periksa email Anda untuk konfirmasi akun."
    );

    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">
      <h2 className="text-center text-3xl font-bold">
        Daftar
      </h2>

      <p className="mt-2 text-center text-slate-400">
        Buat akun Lucky Number Picker.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500 bg-red-500/20 p-3 text-center text-sm text-red-300">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-4 rounded-lg border border-emerald-500 bg-emerald-500/20 p-3 text-center text-sm text-emerald-300">
          {message}
        </p>
      )}

      <div className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Nama Lengkap
          </label>

          <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Konfirmasi Password
          </label>

          <input
            type="password"
            placeholder="Ulangi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-emerald-400"
          />
        </div>

        <button
          type="button"
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </div>
    </div>
  );
}