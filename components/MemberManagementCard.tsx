"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type MemberManagementCardProps = {
  id: string;
  fullName: string;
  role: string;
  membership: string;
};

export default function MemberManagementCard({
  id,
  fullName,
  role,
  membership,
}: MemberManagementCardProps) {
  const supabase = createClient();

  const [currentMembership, setCurrentMembership] =
    useState(membership);

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        membership: currentMembership,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      console.error(error);

      toast.error("Gagal memperbarui membership.", {
        description: "Silakan coba beberapa saat lagi.",
      });

      return;
    }

    toast.success("Membership berhasil diperbarui.", {
      description: `${fullName} sekarang menggunakan paket ${currentMembership}.`,
    });
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-white">

      <h2 className="text-2xl font-bold">
        {fullName}
      </h2>

      <p className="mt-2 text-slate-400">
        Role :{" "}
        <span className="font-semibold text-emerald-400">
          {role}
        </span>
      </p>

      <div className="mt-6">

        <label className="mb-2 block text-sm text-slate-400">
          Membership
        </label>

        <select
          value={currentMembership}
          onChange={(e) =>
            setCurrentMembership(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none transition focus:border-emerald-500"
        >
          <option value="free">
            Free
          </option>

          <option value="premium_regular">
            Premium Regular
          </option>

          <option value="premium_toto">
            Premium Toto Macau
          </option>

          <option value="vip">
            VIP
          </option>

        </select>

      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-3 font-semibold transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Simpan Membership"
        )}

      </button>

    </div>
  );
}