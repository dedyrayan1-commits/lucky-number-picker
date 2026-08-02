type MarketHeaderProps = {
  countryCode: string;
  name: string;
  drawNumber: string;
  drawDate: string;
};

export default function MarketHeader({
  countryCode,
  name,
  drawNumber,
  drawDate,
}: MarketHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">
        {countryCode} {name}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Draw No. {drawNumber}
      </p>

      <p className="text-sm text-gray-500">
        {drawDate}
      </p>
    </div>
  );
}