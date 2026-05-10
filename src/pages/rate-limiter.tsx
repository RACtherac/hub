import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/rate-limiter.css";

const LIMIT = 5;
const WINDOW_MS = 10_000;

type Algo = "fixed" | "sliding" | "token" | "leaky";

const ALGOS: { id: Algo; label: string; description: string }[] = [
  {
    id: "fixed",
    label: "Fixed Window",
    description: "Allows 5 requests per 10s slot. The counter resets hard at the end of each window — you can burst all 5 at once.",
  },
  {
    id: "sliding",
    label: "Sliding Window",
    description: "Tracks each request timestamp. At any moment, only 5 requests in the last 10s are allowed. Smoother than fixed.",
  },
  {
    id: "token",
    label: "Token Bucket",
    description: "You start with 5 tokens. Each request costs 1. Tokens refill gradually over time — allows bursts but throttles sustained traffic.",
  },
  {
    id: "leaky",
    label: "Leaky Bucket",
    description: "Requests drip out at a fixed rate (1 per 2s). The bucket holds 5. Overflow is rejected — enforces a strict steady rate.",
  },
];

interface LogEntry {
  id: number;
  status: 200 | 429;
  timestamp: number;
  remaining: number | null;
  retryAfter: number | null;
  algo: Algo;
}

export default function RateLimiter() {
  const navigate = useNavigate();
  const [algo, setAlgo] = useState<Algo>("fixed");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [remaining, setRemaining] = useState<number>(LIMIT);
  const [cooldown, setCooldown] = useState(0);
  const [firing, setFiring] = useState(false);
  const idRef = useRef(0);
  const resetAtRef = useRef<number | null>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      if (resetAtRef.current) {
        const secs = Math.ceil((resetAtRef.current * 1000 - Date.now()) / 1000);
        if (secs <= 0) {
          setCooldown(0);
          setRemaining(LIMIT);
          resetAtRef.current = null;
        } else {
          setCooldown(secs);
        }
      }
    }, 200);
    return () => clearInterval(iv);
  }, []);

  // Reset display state when switching algo
  function switchAlgo(next: Algo) {
    setAlgo(next);
    setLog([]);
    setRemaining(LIMIT);
    setCooldown(0);
    resetAtRef.current = null;
  }

  async function sendRequest() {
    if (firing) return;
    setFiring(true);
    try {
      const res = await fetch(`http://localhost:3001/api/ping/${algo}`);
      const data = await res.json();
      const rem = Number(res.headers.get("X-RateLimit-Remaining") ?? LIMIT);
      const resetAt = Number(res.headers.get("X-RateLimit-Reset") ?? 0);
      const retryAfter = res.status === 429 ? (data.retryAfter ?? null) : null;

      resetAtRef.current = resetAt || null;
      setRemaining(rem);

      setLog(l => [{
        id: ++idRef.current,
        status: (res.status === 429 ? 429 : 200) as 200 | 429,
        timestamp: Date.now(),
        remaining: rem,
        retryAfter,
        algo,
      }, ...l].slice(0, 30));
    } catch {
      setLog(l => [{
        id: ++idRef.current,
        status: 429 as const,
        timestamp: Date.now(),
        remaining: null,
        retryAfter: null,
        algo,
      }, ...l].slice(0, 30));
    } finally {
      setFiring(false);
    }
  }

  const usedSlots = Math.max(0, LIMIT - remaining);
  const blocked = remaining === 0 && cooldown > 0;
  const currentAlgo = ALGOS.find(a => a.id === algo)!;

  return (
    <div className="rl-page">
      <div className="rl-topbar">
        <button className="rl-topbar-back" onClick={() => navigate("/")}>
          OH<span>/</span>Hub
        </button>
        <span className="rl-topbar-title">Rate Limiter Demo</span>
      </div>

      <header className="rl-hero">
        <p className="rl-eyebrow">// security tool</p>
        <h1 className="rl-title">Watch the <em>rate limiter</em> in action</h1>
        <p className="rl-subtitle">
          {LIMIT} requests per {WINDOW_MS / 1000}s &nbsp;·&nbsp; 4 algorithms &nbsp;·&nbsp; returns 429 when exceeded
        </p>
      </header>

      <div className="rl-content">

        {/* Algorithm picker */}
        <div className="rl-algo-section">
          <p className="rl-section-label">// algorithm</p>
          <div className="rl-algo-tabs">
            {ALGOS.map(a => (
              <button
                key={a.id}
                className={`rl-algo-tab ${algo === a.id ? "rl-algo-tab--active" : ""}`}
                onClick={() => switchAlgo(a.id)}
              >
                {a.label}
              </button>
            ))}
          </div>
          <p className="rl-algo-desc">{currentAlgo.description}</p>
        </div>

        {/* Controls */}
        <div className="rl-controls">
          <div className="rl-meter-section">
            <div className="rl-meter-label">
              <span className="rl-section-label">// requests used</span>
              <span className="rl-meter-count">{usedSlots} / {LIMIT}</span>
            </div>
            <div className="rl-meter-track">
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div
                  key={i}
                  className={`rl-meter-slot ${
                    i < usedSlots
                      ? usedSlots >= LIMIT ? "rl-meter-slot--blocked" : "rl-meter-slot--used"
                      : "rl-meter-slot--free"
                  }`}
                />
              ))}
            </div>
            {cooldown > 0 && (
              <p className="rl-cooldown">Window resets in <strong>{cooldown}s</strong></p>
            )}
          </div>

          <button
            className={`rl-fire-btn ${blocked ? "rl-fire-btn--blocked" : ""}`}
            onClick={sendRequest}
            disabled={firing}
          >
            {blocked ? `Blocked — wait ${cooldown}s` : firing ? "Sending…" : "Send Request →"}
          </button>
        </div>

        {/* Log */}
        <div className="rl-log-section">
          <p className="rl-section-label">// response log</p>
          {log.length === 0 ? (
            <p className="rl-log-empty">No requests yet. Hit the button.</p>
          ) : (
            <div className="rl-log">
              {log.map(entry => (
                <div key={entry.id} className={`rl-log-row rl-log-row--${entry.status === 200 ? "ok" : "blocked"}`}>
                  <span className={`rl-log-status rl-log-status--${entry.status === 200 ? "ok" : "blocked"}`}>
                    {entry.status}
                  </span>
                  <span className="rl-log-time">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="rl-log-detail">
                    {entry.status === 200
                      ? `${entry.remaining ?? "?"} remaining`
                      : `blocked — retry in ${entry.retryAfter ?? "?"}s`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
