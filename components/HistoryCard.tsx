import Card from "./Card";
import NumberCircle from "./NumberCircle";

type HistoryCardProps = {
  date: string;
  numbers: number[];
};

export default function HistoryCard({
  date,
  numbers,
}: HistoryCardProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white">
        {date}
      </h3>

      <div className="mt-4 flex flex-wrap gap-3">
        {numbers.map((number) => (
  <NumberCircle
    key={number}
    value={number}
  />
))}
      </div>
    </Card>
  );
}