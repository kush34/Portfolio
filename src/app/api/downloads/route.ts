import { NextRequest, NextResponse } from "next/server";

// Registry names differ per language; npm is the key.
const REGISTRIES: Record<string, { pypi: string; crates: string }> = {
  "open-logistics": { pypi: "open-logistics-sdk", crates: "open-logistics" },
};

const headers = { "User-Agent": "portfolio-downloads" };

async function fetchJson(url: string) {
  const res = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function npmDownloads(name: string) {
  const reg = await fetchJson(`https://registry.npmjs.org/${name}`);
  const first = Object.entries(reg.time)
    .filter(([k]) => k !== "created" && k !== "modified")
    .map(([, v]) => (v as string).slice(0, 10))
    .sort()[0];
  const today = new Date().toISOString().slice(0, 10);
  // shortcut: npm caps a stats range at 18 months, chunk the range if the package outlives it
  const res = await fetchJson(
    `https://api.npmjs.org/downloads/point/${first}:${today}/${name}`
  );
  return res.downloads as number;
}

async function pypiDownloads(name: string) {
  const res = await fetchJson(
    `https://pypistats.org/api/packages/${name}/overall?mirrors=false`
  );
  return res.data.reduce(
    (sum: number, day: { downloads: number }) => sum + day.downloads,
    0
  );
}

async function cratesDownloads(name: string) {
  const res = await fetchJson(`https://crates.io/api/v1/crates/${name}`);
  return res.crate.downloads as number;
}

const MARKETPLACE =
  "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery";

async function vsCodeInstalls(name: string) {
  const res = await fetch(MARKETPLACE, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json;api-version=7.2-preview.1",
    },
    body: JSON.stringify({
      filters: [
        {
          criteria: [{ filterType: 7, value: name }],
          pageNumber: 1,
          pageSize: 1,
        },
      ],
      assetTypes: [],
      flags: 914,
    }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`${res.status} ${MARKETPLACE}`);
  const ext = (await res.json()).results?.[0]?.extensions?.[0];
  if (!ext) throw new Error(`unknown extension ${name}`);
  return (ext.statistics as { statisticName: string; value: number }[]).find(
    (s) => s.statisticName === "downloadCount"
  )?.value as number;
}

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("pkg") ?? "open-logistics";

  if (request.nextUrl.searchParams.get("source") === "vscode") {
    try {
      return NextResponse.json({ total: await vsCodeInstalls(name) });
    } catch {
      return NextResponse.json(
        { error: "marketplace unreachable" },
        { status: 502 }
      );
    }
  }

  const alt = REGISTRIES[name] ?? { pypi: name, crates: name };

  const results = await Promise.allSettled([
    npmDownloads(name),
    pypiDownloads(alt.pypi),
    cratesDownloads(alt.crates),
  ]);
  if (results.every((r) => r.status === "rejected")) {
    return NextResponse.json({ error: "no registry reachable" }, { status: 502 });
  }

  return NextResponse.json({
    total: results.reduce(
      (sum, r) => sum + (r.status === "fulfilled" ? r.value : 0),
      0
    ),
  });
}
