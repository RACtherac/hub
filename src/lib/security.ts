// ── Fetch with timeout ────────────────────────────────────────────────────
// Prevents a slow or unresponsive server from hanging the UI indefinitely.
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 8000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// ── Text sanitization ─────────────────────────────────────────────────────
// Trims whitespace and caps length so user input can't grow without bound.
export function sanitizeText(input: string, maxLength = 500): string {
  return input.trim().slice(0, maxLength);
}
