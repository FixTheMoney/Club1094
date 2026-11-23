"use client";

import { useEffect, useState } from "react";

function greetingFor(hour) {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Greeting({ name }) {
  // Rendered only after mount so server and browser times don't clash.
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm text-muted">
          {now ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : " "}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          {now ? greetingFor(now.getHours()) : "Hello"}, {name}
        </h1>
      </div>
      <p className="font-mono text-4xl tabular-nums text-accent">
        {now ? now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
      </p>
    </header>
  );
}
