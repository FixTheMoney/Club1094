import { formatValue } from "@/lib/format";

const statusStyle = {
  Paid: "bg-good/15 text-good",
  Pending: "bg-yellow-400/15 text-yellow-300",
  Refunded: "bg-bad/15 text-bad",
};

export default function OrdersTable({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted">
            <th className="pb-3 font-normal">Order</th>
            <th className="pb-3 font-normal">Customer</th>
            <th className="pb-3 text-right font-normal">Amount</th>
            <th className="pb-3 text-right font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-line">
              <td className="py-3 font-mono text-muted">{o.id}</td>
              <td className="py-3">{o.customer}</td>
              <td className="py-3 text-right tabular-nums">{formatValue(o.amount, "currency")}</td>
              <td className="py-3 text-right">
                <span className={`rounded-full px-2 py-0.5 text-xs ${statusStyle[o.status] || "text-muted"}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
