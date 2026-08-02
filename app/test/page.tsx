import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("markets")
    .select("*");

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Test Supabase Connection
      </h1>

      {error ? (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
}