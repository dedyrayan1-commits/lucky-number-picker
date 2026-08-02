import NumberInput from "./NumberInput";

type NumberInputRowProps = {
  numbers: string[];
  onChange?: (
    index: number,
    value: string
  ) => void;
};

export default function NumberInputRow({
  numbers,
  onChange,
}: NumberInputRowProps) {
  return (
    <div className="flex gap-2">
      {numbers.map((number, index) => (
        <NumberInput
          key={index}
          value={number}
          onChange={(event) =>
            onChange?.(index, event.target.value)
          }
        />
      ))}
    </div>
  );
}