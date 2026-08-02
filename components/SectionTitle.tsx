type SectionTitleProps = {
  badge: string;
  title: string;
  description: string;
};

export default function SectionTitle({
  badge,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
        {badge}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-4 text-slate-400">
        {description}
      </p>
    </div>
  );
}