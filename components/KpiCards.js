import { formatValue } from "@/lib/format";

export default function KpiCards({ kpis }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpis.map((k) => {
        const good = k.lowerIsBetter ? k.change <= 0 : k.change >= 0;
        const arrow = k.change >= 0 ? "▲" : "▼";
        const changeText = k.format === "percent" ? `${Math.abs(k.change).toFixed(1)} pts` : `${Math.abs(k.change).toFixed(1)}%`;
        return (
          <div key={k.label} className="rounded-2xl border border-line bg-panel p-5">
            <p className="text-sm text-muted">{k.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{formatValue(k.value, k.format)}</p>
            <p className={`mt-1 text-xs ${good ? "text-good" : "text-bad"}`}>
              {arrow} {changeText} <span className="text-muted">vs last month</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
