import HistoryCard from "@/components/HistoryCard";
import SectionTitle from "@/components/SectionTitle";
import { history } from "@/data/history";

export default function HistoryPage() {
  return (
    <main className="py-16">
      <SectionTitle
        badge="HISTORY"
        title="Lucky Number History"
        description="Browse all previously generated lucky numbers."
      />

      <div className="mt-12 space-y-6">
        {history.map((item) => (
          <HistoryCard
            key={item.date}
            date={item.date}
            numbers={item.numbers}
          />
        ))}
      </div>
    </main>
  );
}