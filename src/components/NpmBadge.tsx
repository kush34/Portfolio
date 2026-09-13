"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const fmt = new Intl.NumberFormat("en-US");

export default function NpmBadge({ name }: { name: string }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const reg = await fetch(
          `https://registry.npmjs.org/${name}`
        ).then((r) => r.json());
        const first = Object.entries(reg.time)
          .filter(([k]) => k !== "created" && k !== "modified")
          .map(([, v]) => (v as string).slice(0, 10))
          .sort()[0];
        const today = new Date().toISOString().slice(0, 10);
        // ponytail: single point call — npm caps ranges at 18 months, chunk if the package outlives that
        const res = await fetch(
          `https://api.npmjs.org/downloads/point/${first}:${today}/${name}`
        ).then((r) => r.json());
        if (!cancelled) setTotal(res.downloads);
      } catch {
        if (!cancelled) setTotal(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [name]);

  return (
    <a
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Lifetime downloads for ${name}`}
      className="badge-shimmer absolute right-3 top-3 z-10 flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 px-3 py-1.5 text-sm font-bold text-zinc-900"
    >
      {total === null ? (
        <span className="block h-4 w-16 animate-pulse rounded bg-amber-600/40" />
      ) : (
        <>
          <Download className="h-3.5 w-3.5" />
          {fmt.format(total)}
        </>
      )}
    </a>
  );
}