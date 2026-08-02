import NumberCircle from "./NumberCircle";

type DailyNumbersProps = {
  numbers: number[];
};

export default function DailyNumbers({
  numbers,
}: DailyNumbersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {numbers.map((number) => (
        <NumberCircle
          key={number}
          value={number}
        />
      ))}
    </div>
  );
}