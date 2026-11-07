/* Level Up 5 · Geräte-Abgleich
   Speichert den Lernstand einer Familie unter ihrem Verbindungs-Wort (z. B. "sonne-tiger-27").
   Jeder Speicher-Eintrag hat einen Zeitstempel; beim Zusammenführen gewinnt der neuere. */
import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

type Entry = { v: string | null; t: number };
type Keys = Record<string, Entry>;

const ID_RE = /^[a-z0-9-]{8,60}$/;
const MAX_BYTES = 4_000_000;

function store() {
  return getStore({ name: "lu5-sync", consistency: "strong" });
}

async function load(id: string): Promise<Keys> {
  const data = (await store().get(id, { type: "json" })) as { keys?: Keys } | null;
  return (data && data.keys) || {};
}

function clean(input: unknown): Keys {
  const out: Keys = {};
  if (!input || typeof input !== "object") return out;
  for (const [k, e] of Object.entries(input as Record<string, any>)) {
    if (typeof k !== "string" || k.length > 100 || !e || typeof e !== "object") continue;
    const t = Number(e.t);
    if (!Number.isFinite(t)) continue;
    if (e.v !== null && typeof e.v !== "string") continue;
    out[k] = { v: e.v, t };
  }
  return out;
}

export default async (req: Request) => {
  const url = new URL(req.url);
  if (req.method === "GET") {
    const id = (url.searchParams.get("id") || "").toLowerCase();
    if (!ID_RE.test(id)) return Response.json({ error: "bad id" }, { status: 400 });
    return Response.json({ keys: await load(id) }, { headers: { "cache-control": "no-store" } });
  }
  if (req.method === "POST") {
    const raw = await req.text();
    if (raw.length > MAX_BYTES) return Response.json({ error: "too large" }, { status: 413 });
    let body: any;
    try { body = JSON.parse(raw); } catch { return Response.json({ error: "bad json" }, { status: 400 }); }
    const id = String(body?.id || "").toLowerCase();
    if (!ID_RE.test(id)) return Response.json({ error: "bad id" }, { status: 400 });
    const merged = await load(id);
    let changed = false;
    for (const [k, e] of Object.entries(clean(body.keys))) {
      if (!merged[k] || e.t > merged[k].t) { merged[k] = e; changed = true; }
    }
    if (changed) await store().setJSON(id, { keys: merged, updated: Date.now() });
    return Response.json({ keys: merged }, { headers: { "cache-control": "no-store" } });
  }
  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = { path: "/api/sync", method: ["GET", "POST"] };
