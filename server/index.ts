import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { securityHeaders, isAllowedOrigin, buildFactionGuard } from "./helpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Unit data ─────────────────────────────────────────────────────────────
import { spaceMarinesUnits } from "../scripts/output/space-marines.js";
import { astraMilitarumUnits } from "../scripts/output/astra-militarum.js";
import { adeptusMechanicusUnits } from "../scripts/output/adeptus-mechanicus.js";
import { adeptusCustodesUnits } from "../scripts/output/adeptus-custodes.js";
import { adeptaSororitasUnits } from "../scripts/output/adepta-sororitas.js";
import { greyKnightsUnits } from "../scripts/output/grey-knights.js";
import { imperialAgentsUnits } from "../scripts/output/imperial-agents.js";
import { imperialKnightsUnits } from "../scripts/output/imperial-knights.js";
import { chaosSpaceMarinesUnits } from "../scripts/output/chaos-space-marines.js";
import { deathGuardUnits } from "../scripts/output/death-guard.js";
import { thousandSonsUnits } from "../scripts/output/thousand-sons.js";
import { worldEatersUnits } from "../scripts/output/world-eaters.js";
import { chaosDaemonsUnits } from "../scripts/output/chaos-daemons.js";
import { chaosKnightsUnits } from "../scripts/output/chaos-knights.js";
import { tyranidsUnits } from "../scripts/output/tyranids.js";
import { necronsUnits } from "../scripts/output/necrons.js";
import { orksUnits } from "../scripts/output/orks.js";
import { tAuEmpireUnits } from "../scripts/output/t-au-empire.js";
import { aeldariUnits } from "../scripts/output/aeldari.js";
import { drukhariUnits } from "../scripts/output/drukhari.js";
import { genestealerCultsUnits } from "../scripts/output/genestealer-cults.js";
import { leaguesOfVotannUnits } from "../scripts/output/leagues-of-votann.js";

// ── Character data ────────────────────────────────────────────────────────
import { spaceMarinesCharacters } from "../scripts/output/characters/space-marines.js";
import { astraMilitarumCharacters } from "../scripts/output/characters/astra-militarum.js";
import { adeptusMechanicusCharacters } from "../scripts/output/characters/adeptus-mechanicus.js";
import { adeptusCustodesCharacters } from "../scripts/output/characters/adeptus-custodes.js";
import { adeptaSororitasCharacters } from "../scripts/output/characters/adepta-sororitas.js";
import { greyKnightsCharacters } from "../scripts/output/characters/grey-knights.js";
import { imperialAgentsCharacters } from "../scripts/output/characters/imperial-agents.js";
import { imperialKnightsCharacters } from "../scripts/output/characters/imperial-knights.js";
import { chaosSpaceMarinesCharacters } from "../scripts/output/characters/chaos-space-marines.js";
import { deathGuardCharacters } from "../scripts/output/characters/death-guard.js";
import { thousandSonsCharacters } from "../scripts/output/characters/thousand-sons.js";
import { worldEatersCharacters } from "../scripts/output/characters/world-eaters.js";
import { chaosDaemonsCharacters } from "../scripts/output/characters/chaos-daemons.js";
import { chaosKnightsCharacters } from "../scripts/output/characters/chaos-knights.js";
import { tyranidsCharacters } from "../scripts/output/characters/tyranids.js";
import { necronsCharacters } from "../scripts/output/characters/necrons.js";
import { orksCharacters } from "../scripts/output/characters/orks.js";
import { tAuEmpireCharacters } from "../scripts/output/characters/t-au-empire.js";
import { aeldariCharacters } from "../scripts/output/characters/aeldari.js";
import { drukhariCharacters } from "../scripts/output/characters/drukhari.js";
import { genestealerCultsCharacters } from "../scripts/output/characters/genestealer-cults.js";
import { leaguesOfVotannCharacters } from "../scripts/output/characters/leagues-of-votann.js";

// ── Aggregate ─────────────────────────────────────────────────────────────

const allUnits = [
  ...spaceMarinesUnits,
  ...astraMilitarumUnits,
  ...adeptusMechanicusUnits,
  ...adeptusCustodesUnits,
  ...adeptaSororitasUnits,
  ...greyKnightsUnits,
  ...imperialAgentsUnits,
  ...imperialKnightsUnits,
  ...chaosSpaceMarinesUnits,
  ...deathGuardUnits,
  ...thousandSonsUnits,
  ...worldEatersUnits,
  ...chaosDaemonsUnits,
  ...chaosKnightsUnits,
  ...tyranidsUnits,
  ...necronsUnits,
  ...orksUnits,
  ...tAuEmpireUnits,
  ...aeldariUnits,
  ...drukhariUnits,
  ...genestealerCultsUnits,
  ...leaguesOfVotannUnits,
];

const allCharacters = [
  ...spaceMarinesCharacters,
  ...astraMilitarumCharacters,
  ...adeptusMechanicusCharacters,
  ...adeptusCustodesCharacters,
  ...adeptaSororitasCharacters,
  ...greyKnightsCharacters,
  ...imperialAgentsCharacters,
  ...imperialKnightsCharacters,
  ...chaosSpaceMarinesCharacters,
  ...deathGuardCharacters,
  ...thousandSonsCharacters,
  ...worldEatersCharacters,
  ...chaosDaemonsCharacters,
  ...chaosKnightsCharacters,
  ...tyranidsCharacters,
  ...necronsCharacters,
  ...orksCharacters,
  ...tAuEmpireCharacters,
  ...aeldariCharacters,
  ...drukhariCharacters,
  ...genestealerCultsCharacters,
  ...leaguesOfVotannCharacters,
];

// ── Rate limiters ─────────────────────────────────────────────────────────

const LIMIT = 5;
const WINDOW_MS = 10_000;
const EXPOSED = ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset", "Retry-After", "X-RateLimit-Algorithm"];

type RL = express.RequestHandler;

function setHeaders(res: express.Response, algo: string, limit: number, remaining: number, resetAt: number) {
  res.setHeader("X-RateLimit-Algorithm", algo);
  res.setHeader("X-RateLimit-Limit", limit);
  res.setHeader("X-RateLimit-Remaining", Math.max(0, remaining));
  res.setHeader("X-RateLimit-Reset", resetAt);
}

function block(res: express.Response, retryAfter: number) {
  res.setHeader("Retry-After", retryAfter);
  res.status(429).json({ error: "Too Many Requests", retryAfter });
}

// ── 1. Fixed Window ──────────────────────────────────────────────────────
interface FixedEntry { count: number; windowStart: number }
const fixedStore = new Map<string, FixedEntry>();

const fixedWindow: RL = (req, res, next) => {
  const ip = req.ip ?? "x";
  const now = Date.now();
  let e = fixedStore.get(ip);
  if (!e || now - e.windowStart >= WINDOW_MS) {
    e = { count: 0, windowStart: now };
    fixedStore.set(ip, e);
  }
  e.count++;
  const resetAt = Math.ceil((e.windowStart + WINDOW_MS) / 1000);
  setHeaders(res, "fixed-window", LIMIT, LIMIT - e.count, resetAt);
  if (e.count > LIMIT) return block(res, Math.ceil((e.windowStart + WINDOW_MS - now) / 1000));
  next();
};

// ── 2. Sliding Window ────────────────────────────────────────────────────
const slidingStore = new Map<string, number[]>();

const slidingWindow: RL = (req, res, next) => {
  const ip = req.ip ?? "x";
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (slidingStore.get(ip) ?? []).filter(t => t > cutoff);
  timestamps.push(now);
  slidingStore.set(ip, timestamps);
  const count = timestamps.length;
  const oldest = timestamps[0];
  const resetAt = Math.ceil((oldest + WINDOW_MS) / 1000);
  setHeaders(res, "sliding-window", LIMIT, LIMIT - count, resetAt);
  if (count > LIMIT) return block(res, Math.ceil((oldest + WINDOW_MS - now) / 1000));
  next();
};

// ── 3. Token Bucket ──────────────────────────────────────────────────────
const REFILL_RATE = LIMIT / (WINDOW_MS / 1000); // tokens per second
interface TokenEntry { tokens: number; lastRefill: number }
const tokenStore = new Map<string, TokenEntry>();

const tokenBucket: RL = (req, res, next) => {
  const ip = req.ip ?? "x";
  const now = Date.now();
  let e = tokenStore.get(ip);
  if (!e) { e = { tokens: LIMIT, lastRefill: now }; tokenStore.set(ip, e); }
  const elapsed = (now - e.lastRefill) / 1000;
  e.tokens = Math.min(LIMIT, e.tokens + elapsed * REFILL_RATE);
  e.lastRefill = now;
  const remaining = Math.floor(e.tokens);
  const secsUntilOne = e.tokens < 1 ? Math.ceil((1 - e.tokens) / REFILL_RATE) : 0;
  const resetAt = Math.ceil((now + secsUntilOne * 1000) / 1000);
  setHeaders(res, "token-bucket", LIMIT, remaining, resetAt);
  if (e.tokens < 1) return block(res, secsUntilOne);
  e.tokens -= 1;
  next();
};

// ── 4. Leaky Bucket ──────────────────────────────────────────────────────
const LEAK_RATE_MS = WINDOW_MS / LIMIT; // ms per request allowed
interface LeakyEntry { queue: number; lastLeak: number }
const leakyStore = new Map<string, LeakyEntry>();

const leakyBucket: RL = (req, res, next) => {
  const ip = req.ip ?? "x";
  const now = Date.now();
  let e = leakyStore.get(ip);
  if (!e) { e = { queue: 0, lastLeak: now }; leakyStore.set(ip, e); }
  const elapsed = now - e.lastLeak;
  const leaked = Math.floor(elapsed / LEAK_RATE_MS);
  e.queue = Math.max(0, e.queue - leaked);
  if (leaked > 0) e.lastLeak = now;
  const remaining = LIMIT - e.queue;
  const resetAt = Math.ceil((now + (e.queue * LEAK_RATE_MS)) / 1000);
  setHeaders(res, "leaky-bucket", LIMIT, remaining - 1, resetAt);
  if (e.queue >= LIMIT) {
    const retryAfter = Math.ceil(LEAK_RATE_MS / 1000);
    return block(res, retryAfter);
  }
  e.queue++;
  next();
};

// ── Server ────────────────────────────────────────────────────────────────

const factionGuard = buildFactionGuard(allUnits, allCharacters);

const app = express();
app.use(cors({
  origin: (origin, cb) => cb(null, isAllowedOrigin(origin)),
  exposedHeaders: EXPOSED,
}));
app.use(securityHeaders);
app.use(express.json());

app.get("/api/ping/fixed",   fixedWindow,   (_req, res) => res.json({ message: "pong", algo: "fixed-window" }));
app.get("/api/ping/sliding", slidingWindow, (_req, res) => res.json({ message: "pong", algo: "sliding-window" }));
app.get("/api/ping/token",   tokenBucket,   (_req, res) => res.json({ message: "pong", algo: "token-bucket" }));
app.get("/api/ping/leaky",   leakyBucket,   (_req, res) => res.json({ message: "pong", algo: "leaky-bucket" }));

app.get("/", (_req, res) => {
  res.json({
    endpoints: [
      "GET /units",
      "GET /units/:faction",
      "GET /characters",
      "GET /characters/:faction",
    ],
    factions: [...new Set(allUnits.map((u) => u.faction))].sort(),
  });
});

app.get("/units", (_req, res) => {
  res.json(allUnits);
});

app.get("/characters", (_req, res) => {
  res.json(allCharacters);
});

app.get("/units/:faction", factionGuard, (req, res) => {
  res.json(allUnits.filter((u) => u.faction === req.params.faction));
});

app.get("/images", (_req, res) => {
  const imagesRoot = path.join(__dirname, "../public/Warhammerimages");
  const results: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (/\.(png|jpg|jpeg|webp|gif)$/i.test(entry)) {
        results.push("/Warhammerimages" + full.slice(imagesRoot.length).replace(/\\/g, "/"));
      }
    }
  }
  walk(imagesRoot);
  res.json(results);
});

app.get("/characters/:faction", factionGuard, (req, res) => {
  res.json(allCharacters.filter((c) => c.faction === req.params.faction));
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Warhammer API running on http://localhost:${PORT}`);
  console.log(`  ${allUnits.length} units | ${allCharacters.length} characters across 22 factions`);
});
