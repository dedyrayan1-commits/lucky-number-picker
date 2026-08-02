import Hero from "@/components/Hero";
import PredictionCard from "@/components/PredictionCard";
import PredictionHeader from "@/components/PredictionHeader";

import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: predictions, error } = await supabase
  .from("markets")
  .select("*")
  .order("id");
  if (error) {
  console.error(error);
}

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Hero />
        <PredictionHeader />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {(predictions ?? []).map((prediction) => (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
            />
          ))}
        </div>
      </div>
    </main>
  );
}