type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-emerald-500">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-6 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        {description}
      </p>
    </div>
  );
}