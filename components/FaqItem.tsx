type FaqItemProps = {
  question: string;
  answer: string;
};

export default function FaqItem({
  question,
  answer,
}: FaqItemProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold text-white">
        {question}
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        {answer}
      </p>
    </div>
  );
}