type NumberCircleProps = {
  value: number;
  variant?: "default" | "matched";
};

export default function NumberCircle({
  value,
  variant = "default",
}: NumberCircleProps) {
  const circleStyle =
    variant === "matched"
      ? "bg-yellow-500 text-white ring-4 ring-yellow-200"
      : "bg-emerald-500 text-white";

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all ${circleStyle}`}
    >
      {value}
    </div>
  );
}