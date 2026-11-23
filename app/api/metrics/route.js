import { getMetrics } from "@/lib/metrics";

// GET /api/metrics — the same data the dashboard shows, as JSON.
export async function GET() {
  return Response.json(await getMetrics());
}
