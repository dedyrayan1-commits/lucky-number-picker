type TestimonialCardProps = {
  name: string;
  text: string;
};

export default function TestimonialCard({
  name,
  text,
}: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-amber-400 text-lg">★★★★★</p>

      <p className="mt-4 leading-7 text-slate-300">
        "{text}"
      </p>

      <p className="mt-6 font-semibold text-white">
        {name}
      </p>
    </div>
  );
}