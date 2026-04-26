import type express from "express";

// ── Security headers ──────────────────────────────────────────────────────
export const securityHeaders: express.RequestHandler = (_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
};

// ── CORS origin allowlist ─────────────────────────────────────────────────
// Set ALLOWED_ORIGINS=https://yourdomain.com in production env.
// Comma-separated list. Falls back to local dev origins.
const raw = process.env.ALLOWED_ORIGINS ?? "http://localhost:5173,http://localhost:4173";
export const allowedOrigins = new Set(raw.split(",").map((o) => o.trim()).filter(Boolean));

export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  return allowedOrigins.has(origin);
}

// ── Faction param validation ──────────────────────────────────────────────
// Build once from the loaded data so the valid set never drifts from reality.
export function buildFactionGuard(
  allUnits: { faction: string }[],
  allChars: { faction: string }[]
): express.RequestHandler {
  const valid = new Set([
    ...allUnits.map((u) => u.faction),
    ...allChars.map((c) => c.faction),
  ]);

  return (req, res, next) => {
    const { faction } = req.params;
    if (faction !== undefined && !valid.has(faction)) {
      res.status(404).json({ error: "Faction not found" });
      return;
    }
    next();
  };
}
