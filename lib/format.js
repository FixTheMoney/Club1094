import { config } from "./config";

export function formatValue(value, format) {
  if (format === "currency") return config.currency + Math.round(value).toLocaleString("en-US");
  if (format === "percent") return value.toFixed(1) + "%";
  if (format === "compact") return Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
  return Math.round(value).toLocaleString("en-US");
}
