// ─────────────────────────────────────────────────────────────
//  Business / KPI data.
//
//  Right now this returns sample data. To use real numbers, replace
//  the body of getMetrics() with a fetch to your API, database or a
//  Google Sheet published as CSV, and return the same shape.
//  It runs on the server, so secrets in process.env stay private
//  (add them in Vercel → Project → Settings → Environment Variables).
// ─────────────────────────────────────────────────────────────

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const revenue = [18200, 19400, 21100, 20300, 23800, 25200, 24600, 27900, 29400, 31200, 33800, 36100];
const users = [820, 910, 1040, 1120, 1260, 1390, 1450, 1610, 1780, 1920, 2110, 2290];

export async function getMetrics() {
  // Example of swapping in a real source:
  // const res = await fetch(process.env.METRICS_URL, { next: { revalidate: 3600 } });
  // return await res.json();

  const last = revenue.length - 1;
  const pct = (a, b) => ((a - b) / b) * 100;

  return {
    kpis: [
      { label: "Revenue (month)", value: revenue[last], format: "currency", change: pct(revenue[last], revenue[last - 1]) },
      { label: "Active users", value: users[last], format: "number", change: pct(users[last], users[last - 1]) },
      { label: "Conversion rate", value: 3.8, format: "percent", change: 0.4 },
      { label: "Churn", value: 1.9, format: "percent", change: -0.3, lowerIsBetter: true },
    ],
    revenueByMonth: months.map((m, i) => ({ label: m, value: revenue[i] })),
    usersByMonth: months.map((m, i) => ({ label: m, value: users[i] })),
    salesByChannel: [
      { label: "Organic", value: 14200 },
      { label: "Paid ads", value: 9800 },
      { label: "Referral", value: 6400 },
      { label: "Email", value: 3900 },
      { label: "Social", value: 1800 },
    ],
    recentOrders: [
      { id: "#1042", customer: "Mika Tanaka", amount: 420, status: "Paid" },
      { id: "#1041", customer: "Jordan Lee", amount: 1280, status: "Paid" },
      { id: "#1040", customer: "Priya Shah", amount: 96, status: "Pending" },
      { id: "#1039", customer: "Lucas Martin", amount: 310, status: "Refunded" },
      { id: "#1038", customer: "Hana Kim", amount: 755, status: "Paid" },
    ],
  };
}
