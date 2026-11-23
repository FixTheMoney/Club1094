import { formatValue } from "@/lib/format";

// Horizontal bar list — easy to read for ranked categories.
export default function BarList({ data, format = "number", color = "#7c9cff" }) {
  const max = Math.max(...data.map((d) => d.value));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{d.label}</span>
            <span className="tabular-nums text-muted">
              {formatValue(d.value, format)} · {((d.value / total) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-bg">
            <div className="h-2 rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
