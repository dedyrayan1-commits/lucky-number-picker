import NumberBall from "./NumberBall";

type NumberGridProps = {
  numbers: number[];
};

export default function NumberGrid({ numbers }: NumberGridProps) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      {numbers.map((number) => (
        <NumberBall key={number} number={number} />
      ))}
    </div>
  );
}