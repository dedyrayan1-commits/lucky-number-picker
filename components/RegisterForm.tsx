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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

    if (!fullName || !email || !password) {
      setError("Semua field wajib diisi.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      router.push("/login");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">

      <h2 className="text-center text-3xl font-bold">
        Register
      </h2>

      <p className="mt-2 text-center text-slate-400">
        Buat akun baru.
      </p>

      {error && (
        <div className="mt-5 rounded-lg bg-red-500/20 border border-red-500 p-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="mt-8 space-y-5">

        <div>
          <label className="mb-2 block text-sm">
            Nama Lengkap
          </label>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
            placeholder="Nama lengkap"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
            placeholder="Email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
            placeholder="Password"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 font-semibold hover:bg-emerald-600"
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>

      </div>

    </div>
  );
}