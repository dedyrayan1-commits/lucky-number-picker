type NumberInputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function NumberInput({
  value,
  placeholder,
  onChange,
}: NumberInputProps) {
  return (
    <input
  type="text"
  maxLength={2}
  value={value}
  placeholder={placeholder}
  onChange={onChange}
  className="w-12 rounded border border-gray-300 p-2 text-center outline-none transition focus:border-emerald-500"
/>
  );
}