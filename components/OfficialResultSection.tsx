import { createClient } from "@/lib/supabase/server";

export default async function OfficialResultSection() {
  const supabase = await createClient();

  const { data: markets, error } = await supabase
    .from("markets")
    .select("*")
    .order("id");

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20 text-white">
        <p className="text-center text-red-400">
          Gagal memuat Official Result.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-white">

      <div className="text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          OFFICIAL RESULT
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Hasil Resmi Hari Ini
        </h2>

        <p className="mt-6 text-lg text-slate-300">
          Seluruh hasil resmi diperbarui setiap hari.
        </p>

      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">

        {markets?.map((market) => (

          <div
            key={market.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >

            <h3 className="text-2xl font-bold">
              {market.name}
            </h3>

            <div className="mt-6 flex gap-2">

              {(market.official_result ?? "")
                .split("")
                .map((number: string, index: number) => (

                  <div
                    key={index}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500 font-bold text-white"
                  >
                    {number}
                  </div>

                ))}

            </div>

            <div className="mt-6">

              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
                {market.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}