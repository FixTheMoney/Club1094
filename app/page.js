import { config } from "@/lib/config";
import { getMetrics } from "@/lib/metrics";
import Card from "@/components/Card";
import Greeting from "@/components/Greeting";
import Weather from "@/components/Weather";
import Todos from "@/components/Todos";
import Links from "@/components/Links";
import GitHubActivity from "@/components/GitHubActivity";
import KpiCards from "@/components/KpiCards";
import LineChart from "@/components/LineChart";
import BarList from "@/components/BarList";
import OrdersTable from "@/components/OrdersTable";
import { formatValue } from "@/lib/format";

// Re-fetch metrics at most once an hour on Vercel
export const revalidate = 3600;

export default async function Home() {
  const m = await getMetrics();
  const yearRevenue = m.revenueByMonth.reduce((s, d) => s + d.value, 0);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Greeting name={config.name} />

      {/* ── Personal hub ───────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Weather location={config.location} />
        <Todos />
        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <Links links={config.links} />
          {config.githubUsername && <GitHubActivity username={config.githubUsername} />}
        </div>
      </div>

      {/* ── Business metrics ───────────────────────── */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Business overview</h2>
        <KpiCards kpis={m.kpis} />

        <div className="grid gap-4 lg:grid-cols-3">
          <Card
            title="Revenue by month"
            className="lg:col-span-2"
            action={<span className="text-xs text-muted">{formatValue(yearRevenue, "currency")} this year</span>}
          >
            <LineChart data={m.revenueByMonth} format="currency" />
          </Card>
          <Card title="Sales by channel">
            <BarList data={m.salesByChannel} format="currency" />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Active users" className="lg:col-span-1">
            <LineChart data={m.usersByMonth} color="#4ade80" height={260} />
          </Card>
          <Card title="Recent orders" className="lg:col-span-2">
            <OrdersTable orders={m.recentOrders} />
          </Card>
        </div>
      </div>

      <footer className="pb-4 text-center text-xs text-muted">
        Weather by Open-Meteo · Edit <code>lib/config.js</code> and <code>lib/metrics.js</code> to customize
      </footer>
    </main>
  );
}
