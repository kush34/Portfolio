"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const fmt = new Intl.NumberFormat("en-US");
const CACHE_KEY = (name: string) => `downloads:${name}`;
const TTL_MS = 6 * 60 * 60 * 1000;
const TIMEOUT_MS = 8000;

export default function DownloadsBadge({ name }: { name: string }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY(name)) ?? "null");
      if (typeof cached?.total === "number" && Date.now() - cached.at < TTL_MS) {
        setTotal(cached.total);
      }
    } catch {}

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    fetch(`/api/downloads?pkg=${encodeURIComponent(name)}`, {
      signal: ctrl.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(({ total }: { total: number }) => {
        if (cancelled) return;
        setTotal(total);
        localStorage.setItem(
          CACHE_KEY(name),
          JSON.stringify({ total, at: Date.now() })
        );
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [name]);

  return (
    <a
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Lifetime downloads for ${name} across npm, PyPI and crates.io`}
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
