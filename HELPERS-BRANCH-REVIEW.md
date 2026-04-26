# Branch Review Report — `Helpers`

**Repository:** `RACtherac/hub`  
**Branch:** `Helpers`  
**Base:** `main` (merged up to `a772387`)  
**Stack:** React 19 · TypeScript · Vite · Express  
**Date:** 2026-04-26  
**Reviewer:** Claude Code

---

## What This Branch Does

Introduces two security helper modules — one for the Express backend, one for the React frontend — and wires them into the existing code. Also updates the README.

**Files changed:**

| File | Change |
|------|--------|
| `server/helpers.ts` | New — security headers middleware, CORS origin allowlist, faction param guard |
| `src/lib/security.ts` | New — `fetchWithTimeout`, `sanitizeText` |
| `server/index.ts` | Uses `securityHeaders`, restricted CORS, `factionGuard` middleware |
| `src/api/warhammerApi.ts` | Fetches now use `fetchWithTimeout` |
| `src/pages/todo-app.tsx` | `addTodo` now uses `sanitizeText` |
| `README.md` | Rewritten — corrected spelling, added structure, preserved start commands |

---

## Key Functions Introduced

```ts
// server/helpers.ts

export const securityHeaders: express.RequestHandler
// Sets X-Content-Type-Options: nosniff, X-Frame-Options: DENY,
// and Referrer-Policy: strict-origin-when-cross-origin on every response.

export const allowedOrigins: Set<string>
// Built from the ALLOWED_ORIGINS env var (comma-separated).
// Falls back to http://localhost:5173 and http://localhost:4173 for local dev.

export function isAllowedOrigin(origin: string | undefined): boolean
// Returns true only if the origin is in the allowedOrigins set.
// Returns false for undefined (non-browser clients) — CORS headers are
// simply omitted for those requests, which is correct behaviour.

export function buildFactionGuard(
  allUnits: { faction: string }[],
  allChars: { faction: string }[]
): express.RequestHandler
// Builds the valid-faction set from the actual loaded data at startup.
// Rejects any :faction param not in that set with a 404 before the
// route handler runs. This is called once and the result is reused.
```

```ts
// src/lib/security.ts

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 8000
): Promise<Response>
// Wraps native fetch with an AbortController timeout.
// Prevents a slow or unresponsive server from hanging the UI.
// Always clears the timeout in a finally block to avoid timer leaks.

export function sanitizeText(input: string, maxLength = 500): string
// Trims whitespace and caps length.
// Used in the todo app to prevent unbounded text being written to localStorage.
```

---

## Risk Analysis

| Risk | Severity | Notes |
|------|----------|-------|
| `ALLOWED_ORIGINS` not in `.env.example` | Medium | The new env var is read in `server/helpers.ts` but not documented in `.env.example`. A developer setting up the project for the first time will not know to set it in production, leaving CORS unrestricted. Add `ALLOWED_ORIGINS=` to `.env.example` with a comment. |
| No CSP header | Medium | `securityHeaders` adds three useful headers but does not set `Content-Security-Policy`. The previous review flagged the absence of a CSP. Adding even a minimal `default-src 'self'` would prevent injected scripts from loading external resources. |
| No HSTS header | Low | `Strict-Transport-Security` is not set. Safe to omit in local dev, but should be added when deploying over HTTPS. |
| Rate limiting still absent on data endpoints | Medium | This was flagged in the `warhammer-api` review. `/units`, `/characters`, and `/images` remain unprotected. The helpers branch does not address this, so the risk carries forward. |
| In-memory rate-limit stores still unbounded | Medium | The four rate-limiter stores (`fixedStore`, `slidingStore`, etc.) from the `warhammer-api` branch still have no eviction logic. Carries forward from previous review. |
| `fetchWithTimeout` aborts silently | Low | When the abort fires, `fetch` rejects with a `DOMException` named `AbortError`. The callers in `warhammerApi.ts` catch this as a generic `Error` and show "Failed to fetch units: …". The user gets no indication that it was a timeout vs. a network error. Not a security issue but worth a more specific error message for debugging. |
| `sanitizeText` maxLength is 500 chars | Info | 500 characters is a reasonable cap for a todo item. The previous review noted that `localStorage` is capped at ~5–10 MB per origin. A single 500-character string per todo is far below any practical limit. Safe. |

---

## Threat Model

**Assets touched by this branch:** Express API (security headers, CORS) · Frontend fetch calls · Todo localStorage writes.

| Threat | STRIDE Category | Likelihood | Impact | Status after this branch |
|--------|----------------|-----------|--------|--------------------------|
| Browser-based cross-origin request from a malicious site | Spoofing | Medium | Low | **Mitigated** — CORS now validates against `allowedOrigins`. Unknown origins receive no `Access-Control-Allow-Origin` header, so browsers block the response. |
| Clickjacking — app embedded in a third-party iframe | Spoofing | Low | Low | **Mitigated** — `X-Frame-Options: DENY` is now set globally. |
| MIME-type sniffing leading to script execution | Tampering | Low | Medium | **Mitigated** — `X-Content-Type-Options: nosniff` prevents browsers from sniffing response content types. |
| Hung fetch blocking the UI indefinitely | Denial of Service | Low | Low | **Mitigated** — `fetchWithTimeout` aborts after 8 seconds. |
| Arbitrary-length text stored in localStorage | Denial of Service | Low | Low | **Mitigated** — `sanitizeText` caps input at 500 characters. |
| Unknown faction string reaching route handler | Tampering | Low | Low | **Mitigated** — `factionGuard` validates `:faction` against the loaded data before the handler runs. |
| IP spoofing bypassing rate limiter | Spoofing | High | Medium | **Not addressed** — carries forward from `warhammer-api` review. |
| Memory exhaustion via unique IPs (rate-limit stores) | Denial of Service | Medium | High | **Not addressed** — carries forward from `warhammer-api` review. |
| Bulk scraping of `/units` / `/characters` | Information Disclosure | High | Low | **Not addressed** — no rate limiting on data endpoints. |

**Overall threat level: LOW** — the branch reduces the attack surface meaningfully. The remaining medium risks are pre-existing and should be tracked separately.

---

## Recommended Follow-up Actions

1. Add `ALLOWED_ORIGINS=` (with a comment) to `.env.example` so the production config is discoverable.
2. Add a `Content-Security-Policy` header to `securityHeaders` — at minimum `default-src 'self'`.
3. Apply a basic rate limiter (e.g. `express-rate-limit`) to `/units`, `/characters`, and `/images`.
4. Add LRU eviction (or a `setInterval` cleanup) to the four in-memory rate-limit stores.
5. Give `fetchWithTimeout` a distinct error path for `AbortError` so timeouts are identifiable in the UI.
6. Add `ALLOWED_ORIGINS` to server startup logs so it is easy to verify the correct value is loaded in production.
