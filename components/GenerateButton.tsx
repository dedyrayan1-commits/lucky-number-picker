type GenerateButtonProps = {
  onClick: () => void;
};

export default function GenerateButton({
  onClick,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-8 rounded-xl bg-emerald-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-emerald-600"
    >
      ✨ Pick Lucky Numbers
    </button>
  );
}