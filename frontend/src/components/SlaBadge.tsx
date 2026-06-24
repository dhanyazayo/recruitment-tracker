const styles: Record<string, string> = {
  "on-track": "bg-green-50 text-green-700 border-green-200",
  approaching: "bg-yellow-50 text-yellow-700 border-yellow-200",
  breached: "bg-red-50 text-red-700 border-red-200",
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red: "bg-red-50 text-red-700 border-red-200",
  gray: "bg-gray-50 text-gray-600 border-gray-200",
};

const labels: Record<string, string> = {
  "on-track": "On Track",
  approaching: "Approaching",
  breached: "Breached",
};

export function SlaBadge({ status }: { status: string | null }) {
  const key = status ?? "n/a";
  const className = styles[key] ?? "bg-gray-50 text-gray-600 border-gray-200";
  const label = labels[key] ?? key;

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}
