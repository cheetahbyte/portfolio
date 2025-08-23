// app/components/StatCard.tsx
import { ChartBar } from "lucide-react";

type Stats = {
  data?: {
    total_seconds?: number
  };
};

function formatDuration(totalSeconds = 0) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${h}h:${m}m`;
}

export default async function StatCard() {
  const key = process.env.WAKAPI_WAKATIME_COMPAT_KEY || process.env.WAKAPI_API_KEY;
  if (!key) {
    return <section className="rounded-2xl bg-[#171717] text-white/90 p-6">
      Missing WAKAPI_WAKATIME_COMPAT_KEY
    </section>;
  }

  const auth = Buffer.from(`${key}:`).toString("base64");
  const url =
    "https://wakapi.orbiq.services/api/compat/wakatime/v1/users/cheetahbyte/stats/week";

  const resp = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  let data: Stats | null = null;
  try { data = (await resp.json()) as Stats; } catch { /* ignore */ }

  const secs = data?.data?.total_seconds ?? 0;
  const pretty = formatDuration(secs);

  return (
    <section className="rounded-2xl bg-[#171717] text-white/90 md:col-start-2 md:row-start-2 col-span-1 row-span-1 p-6">
      <ChartBar size={40} className="mb-4" />
      <h2 className="text-3xl mb-1">{pretty}</h2>
      <span className="text-gray-500">coded this week</span>
    </section>
  );
}