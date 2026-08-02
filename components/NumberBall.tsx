type NumberBallProps = {
  number: number;
};

export default function NumberBall({ number }: NumberBallProps) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white shadow-lg">
      {number}
    </div>
  );
}