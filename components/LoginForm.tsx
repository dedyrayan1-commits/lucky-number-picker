"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");

    if (!email || !password) {
      setError("Email dan Password wajib diisi.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">
      <h2 className="text-center text-3xl font-bold">
        Masuk
      </h2>

      <p className="mt-2 text-center text-slate-400">
        Selamat datang kembali.
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500 bg-red-500/20 p-3 text-center text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            placeholder="Masukkan email"
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
            value={password}
            placeholder="Masukkan password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-emerald-400"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sedang Masuk..." : "Login"}
        </button>

      </div>
    </div>
  );
}