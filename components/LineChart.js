"use client";

import { useEffect, useRef, useState } from "react";
import { formatValue } from "@/lib/format";

// Dependency-free SVG area/line chart. data = [{ label, value }]
// It measures its own width so text stays a readable size on any screen.
export default function LineChart({ data, format = "number", color = "#7c9cff", height = 220 }) {
  const ref = useRef(null);
  const [W, setW] = useState(640);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(240, entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const H = height;
  const pad = { top: 12, right: 12, bottom: 26, left: 52 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const x = (i) => pad.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const y = (v) => pad.top + innerH - (v / max) * innerH;

  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${line} L${x(data.length - 1)},${pad.top + innerH} L${x(0)},${pad.top + innerH} Z`;
  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => t * max);
  // On narrow screens show every other month label
  const labelEvery = innerW / data.length < 34 ? 2 : 1;
  const gradId = `grad-${color.replace("#", "")}`;

  return (
    <div ref={ref} className="w-full min-w-0 overflow-hidden">
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block" role="img">
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.left} x2={W - pad.right} y1={y(t)} y2={y(t)} stroke="#232836" />
          <text x={pad.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize="11" fill="#8b93a7">
            {formatValue(t, format === "currency" ? "compact" : format)}
          </text>
        </g>
      ))}

      {data.map((d, i) => i % labelEvery === 0 && (
        <text key={d.label} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#8b93a7">
          {d.label}
        </text>
      ))}

      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {data.map((d, i) => (
        <circle key={d.label} cx={x(i)} cy={y(d.value)} r="3.5" fill="#12151c" stroke={color} strokeWidth="2">
          <title>{`${d.label}: ${formatValue(d.value, format)}`}</title>
        </circle>
      ))}
    </svg>
    </div>
  );
}

// Round the top of the axis up to a tidy number
function niceMax(v) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * mag;
}
