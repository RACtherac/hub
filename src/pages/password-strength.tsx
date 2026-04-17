import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/password-strength.css";

const COMMON_PASSWORDS = [
  "password", "123456", "123456789", "qwerty", "abc123", "password1",
  "111111", "iloveyou", "admin", "letmein", "welcome", "monkey", "dragon",
  "master", "sunshine", "princess", "shadow", "superman", "michael", "football",
  "pass", "password123", "qwerty123", "1q2w3e", "test", "root", "hello",
];

interface Analysis {
  score: number;       // 0–100
  level: "weak" | "fair" | "good" | "strong";
  entropy: number;
  checks: { label: string; pass: boolean }[];
  suggestions: string[];
}

function calcEntropy(password: string): number {
  const charset =
    (/[a-z]/.test(password) ? 26 : 0) +
    (/[A-Z]/.test(password) ? 26 : 0) +
    (/[0-9]/.test(password) ? 10 : 0) +
    (/[^a-zA-Z0-9]/.test(password) ? 32 : 0);
  if (charset === 0) return 0;
  return Math.floor(password.length * Math.log2(charset));
}

function analyse(password: string): Analysis {
  const len = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const isCommon = COMMON_PASSWORDS.includes(password.toLowerCase());
  const noRepeat = !/(.)\1{2,}/.test(password);

  const checks = [
    { label: "At least 8 characters", pass: len >= 8 },
    { label: "At least 12 characters", pass: len >= 12 },
    { label: "Lowercase letter", pass: hasLower },
    { label: "Uppercase letter", pass: hasUpper },
    { label: "Number", pass: hasDigit },
    { label: "Symbol (!@#$...)", pass: hasSymbol },
    { label: "No repeated characters (aaa)", pass: noRepeat },
    { label: "Not a common password", pass: !isCommon },
  ];

  const passed = checks.filter(c => c.pass).length;
  let score = Math.round((passed / checks.length) * 100);
  if (isCommon) score = Math.min(score, 10);
  if (len === 0) score = 0;

  const level: Analysis["level"] =
    score >= 85 ? "strong" :
    score >= 60 ? "good" :
    score >= 35 ? "fair" : "weak";

  const suggestions: string[] = [];
  if (len === 0) return { score: 0, level: "weak", entropy: 0, checks, suggestions: [] };
  if (isCommon) suggestions.push("This is one of the most common passwords — avoid it.");
  if (len < 8) suggestions.push("Use at least 8 characters.");
  if (len < 12) suggestions.push("12+ characters makes a big difference.");
  if (!hasUpper) suggestions.push("Add an uppercase letter.");
  if (!hasLower) suggestions.push("Add a lowercase letter.");
  if (!hasDigit) suggestions.push("Add a number.");
  if (!hasSymbol) suggestions.push("Add a symbol like ! @ # $.");
  if (!noRepeat) suggestions.push("Avoid repeating the same character multiple times in a row.");

  return { score, level, entropy: calcEntropy(password), checks, suggestions };
}

const LEVEL_LABEL: Record<Analysis["level"], string> = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
};

export default function PasswordStrength() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const result = useMemo(() => analyse(password), [password]);

  return (
    <div className="pw-page">
      <div className="pw-topbar">
        <button className="pw-topbar-back" onClick={() => navigate("/")}>
          OH<span>/</span>Hub
        </button>
        <span className="pw-topbar-title">Password Strength Checker</span>
      </div>

      <header className="pw-hero">
        <p className="pw-eyebrow">// security tool</p>
        <h1 className="pw-title">How <em>strong</em> is your password?</h1>
        <p className="pw-subtitle">Analysed locally — nothing is sent anywhere.</p>
      </header>

      <div className="pw-content">

        <div className="pw-input-section">
          <div className="pw-input-wrap">
            <input
              className="pw-input"
              type={visible ? "text" : "password"}
              placeholder="Type a password to analyse..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <button className="pw-toggle" onClick={() => setVisible(v => !v)} title={visible ? "Hide" : "Show"}>
              {visible ? "Hide" : "Show"}
            </button>
          </div>

          {password.length > 0 && (
            <div className="pw-meter-wrap">
              <div className="pw-meter-bar">
                <div
                  className={`pw-meter-fill pw-meter-fill--${result.level}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <div className="pw-meter-labels">
                <span className={`pw-level pw-level--${result.level}`}>
                  {LEVEL_LABEL[result.level]}
                </span>
                <span className="pw-entropy">{result.entropy} bits of entropy</span>
              </div>
            </div>
          )}
        </div>

        {password.length > 0 && (
          <div className="pw-panels">

            <div className="pw-panel">
              <p className="pw-panel-label">// checks</p>
              <ul className="pw-checklist">
                {result.checks.map(c => (
                  <li key={c.label} className={`pw-check-item ${c.pass ? "pw-check-item--pass" : "pw-check-item--fail"}`}>
                    <span className="pw-check-icon">{c.pass ? "✓" : "✗"}</span>
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>

            {result.suggestions.length > 0 && (
              <div className="pw-panel">
                <p className="pw-panel-label">// suggestions</p>
                <ul className="pw-suggestions">
                  {result.suggestions.map(s => (
                    <li key={s} className="pw-suggestion">→ {s}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
