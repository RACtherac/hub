import type { Handler } from "@netlify/functions";

const LIMIT = 5;
const WINDOW_MS = 10_000;

// Module-level stores persist across invocations within the same function instance.
// Good enough for an educational rate-limiter demo.

// ── 1. Fixed Window ──────────────────────────────────────────────────────
interface FixedEntry { count: number; windowStart: number }
const fixedStore = new Map<string, FixedEntry>();

function fixedWindow(ip: string, now: number) {
  let e = fixedStore.get(ip);
  if (!e || now - e.windowStart >= WINDOW_MS) {
    e = { count: 0, windowStart: now };
    fixedStore.set(ip, e);
  }
  e.count++;
  const resetAt = Math.ceil((e.windowStart + WINDOW_MS) / 1000);
  const remaining = Math.max(0, LIMIT - e.count);
  const blocked = e.count > LIMIT;
  const retryAfter = blocked ? Math.ceil((e.windowStart + WINDOW_MS - now) / 1000) : null;
  return { algo: "fixed-window", remaining, resetAt, blocked, retryAfter };
}

// ── 2. Sliding Window ────────────────────────────────────────────────────
const slidingStore = new Map<string, number[]>();

function slidingWindow(ip: string, now: number) {
  const cutoff = now - WINDOW_MS;
  const timestamps = (slidingStore.get(ip) ?? []).filter(t => t > cutoff);
  timestamps.push(now);
  slidingStore.set(ip, timestamps);
  const count = timestamps.length;
  const oldest = timestamps[0];
  const resetAt = Math.ceil((oldest + WINDOW_MS) / 1000);
  const remaining = Math.max(0, LIMIT - count);
  const blocked = count > LIMIT;
  const retryAfter = blocked ? Math.ceil((oldest + WINDOW_MS - now) / 1000) : null;
  return { algo: "sliding-window", remaining, resetAt, blocked, retryAfter };
}

// ── 3. Token Bucket ──────────────────────────────────────────────────────
const REFILL_RATE = LIMIT / (WINDOW_MS / 1000);
interface TokenEntry { tokens: number; lastRefill: number }
const tokenStore = new Map<string, TokenEntry>();

function tokenBucket(ip: string, now: number) {
  let e = tokenStore.get(ip);
  if (!e) { e = { tokens: LIMIT, lastRefill: now }; tokenStore.set(ip, e); }
  const elapsed = (now - e.lastRefill) / 1000;
  e.tokens = Math.min(LIMIT, e.tokens + elapsed * REFILL_RATE);
  e.lastRefill = now;
  const remaining = Math.floor(e.tokens);
  const blocked = e.tokens < 1;
  const secsUntilOne = blocked ? Math.ceil((1 - e.tokens) / REFILL_RATE) : 0;
  const resetAt = Math.ceil((now + secsUntilOne * 1000) / 1000);
  if (!blocked) e.tokens -= 1;
  return { algo: "token-bucket", remaining, resetAt, blocked, retryAfter: blocked ? secsUntilOne : null };
}

// ── 4. Leaky Bucket ──────────────────────────────────────────────────────
const LEAK_RATE_MS = WINDOW_MS / LIMIT;
interface LeakyEntry { queue: number; lastLeak: number }
const leakyStore = new Map<string, LeakyEntry>();

function leakyBucket(ip: string, now: number) {
  let e = leakyStore.get(ip);
  if (!e) { e = { queue: 0, lastLeak: now }; leakyStore.set(ip, e); }
  const elapsed = now - e.lastLeak;
  const leaked = Math.floor(elapsed / LEAK_RATE_MS);
  e.queue = Math.max(0, e.queue - leaked);
  if (leaked > 0) e.lastLeak = now;
  const blocked = e.queue >= LIMIT;
  const remaining = Math.max(0, LIMIT - e.queue - 1);
  const resetAt = Math.ceil((now + e.queue * LEAK_RATE_MS) / 1000);
  if (!blocked) e.queue++;
  const retryAfter = blocked ? Math.ceil(LEAK_RATE_MS / 1000) : null;
  return { algo: "leaky-bucket", remaining, resetAt, blocked, retryAfter };
}

// ── Handler ──────────────────────────────────────────────────────────────

const EXPOSED = "X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, X-RateLimit-Algorithm";

export const handler: Handler = async (event) => {
  const algo = event.path.split("/").pop() ?? "fixed";
  const ip = event.headers["x-forwarded-for"]?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();

  let result: ReturnType<typeof fixedWindow>;
  if (algo === "sliding") result = slidingWindow(ip, now);
  else if (algo === "token") result = tokenBucket(ip, now);
  else if (algo === "leaky") result = leakyBucket(ip, now);
  else result = fixedWindow(ip, now);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": EXPOSED,
    "X-RateLimit-Algorithm": result.algo,
    "X-RateLimit-Limit": String(LIMIT),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAt),
    "Content-Type": "application/json",
  };
  if (result.retryAfter !== null) headers["Retry-After"] = String(result.retryAfter);

  if (result.blocked) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: "Too Many Requests", retryAfter: result.retryAfter }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "pong", algo: result.algo }),
  };
};
