"use client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

function tzOffsetLabel(d: Date) {
  const offsetMin = -d.getTimezoneOffset(); // minutes east of UTC
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const hh = Math.floor(abs / 60);
  const mm = abs % 60;
  return `UTC${sign}${hh}${mm ? ":" + String(mm).padStart(2, "0") : ""}`;
}

export default function LocalTimeCard() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Split into time and period (AM/PM)
  let hours = "";
  let period = "";
  if (time) {
    const str = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Europe/Berlin",
    });
    const parts = str.split(" ");
    hours = parts[0]; // "8:50:25"
    period = parts[1]; // "PM"
  }

  return (
    <section className="rounded-2xl bg-[#171717] text-white/90 col-span-1 row-span-1 p-6">
      <Clock size={40} className="mb-4" />
      <h2 className="text-3xl mb-1 flex items-center gap-1">
        <span>{hours || "—:—:—"}</span>
        <span className="text-sm">{period}</span>
      </h2>
      <span className="text-gray-500">{time ? tzOffsetLabel(time) : "UTC"}</span>
    </section>
  );
}
