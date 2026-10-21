import { useMemo, useState } from "react";

import { ToolError, decodeJwt, jwtStatus, relativeTime, type DecodedJwt, type JwtStatus } from "../../utils/devTools";
import CopyButton from "./CopyButton";

// An example token: header {"alg":"HS256","typ":"JWT"}, a short payload and a fake signature.
const EXAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJVbGYgdGhlIEJhcmtlZXAiLCJyb2xlIjoiZG0iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDAwMzYwMH0.c2lnbmF0dXJl";

const STATUS: Record<JwtStatus, { label: string; tone: "ok" | "warn" | "error" }> = {
    valid: { label: "Not expired", tone: "ok" },
    expired: { label: "Expired", tone: "error" },
    "not-yet-valid": { label: "Not valid yet", tone: "warn" },
    "no-expiry": { label: "Never expires", tone: "warn" },
};

function ClaimTime({ label, date, now }: { label: string; date?: Date; now: Date }) {
    if (!date) return null;
    return (
        <div className="tl-readout">
            <span>{label}</span>
            <strong>{date.toLocaleString()}</strong>
            <small>{relativeTime(date, now)}</small>
        </div>
    );
}

export default function JwtDecoder() {
    const [token, setToken] = useState(EXAMPLE);
    // Fixed while the tool is open, so "expires in" doesn't need a timer.
    const [now] = useState(() => new Date());

    const outcome = useMemo((): { ok: true; jwt: DecodedJwt } | { ok: false; message: string } | null => {
        if (token.trim() === "") return null;
        try {
            return { ok: true, jwt: decodeJwt(token) };
        }
        catch (error) {
            if (error instanceof ToolError) return { ok: false, message: error.message };
            throw error;
        }
    }, [token]);

    const header = outcome?.ok ? JSON.stringify(outcome.jwt.header, null, 2) : "";
    const payload = outcome?.ok ? JSON.stringify(outcome.jwt.payload, null, 2) : "";
    const status = outcome?.ok ? STATUS[jwtStatus(outcome.jwt, now)] : null;

    return (
        <div className="tl-stack">
            <section className="tl-panel">
                <div className="tl-panel-header">
                    <h2 className="tl-panel-title">Token</h2>
                    <div className="tl-panel-actions">
                        {status && <span className={`tl-badge tl-badge--${status.tone}`}>{status.label}</span>}
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => setToken("")} disabled={!token}>Clear</button>
                    </div>
                </div>
                <textarea
                    className="tl-code tl-code--short tl-code--wrap"
                    value={token}
                    spellCheck={false}
                    aria-label="JWT"
                    aria-invalid={outcome?.ok === false}
                    placeholder="Paste a JWT (eyJ…). A leading “Bearer ” is fine."
                    onChange={(e) => setToken(e.target.value)}
                />
                {outcome && !outcome.ok && <p className="tl-status-error" role="alert"><strong>Can't decode:</strong> {outcome.message}</p>}
                <p className="tl-hint">
                    Decoding only: the signature can't be checked without the secret or public key, so don't trust a token just because it decodes.
                    The token never leaves this page.
                </p>
            </section>

            {outcome?.ok && (
                <>
                    {(outcome.jwt.issuedAt || outcome.jwt.notBefore || outcome.jwt.expiresAt) && (
                        <div className="tl-readouts">
                            <ClaimTime label="Issued (iat)" date={outcome.jwt.issuedAt} now={now} />
                            <ClaimTime label="Valid from (nbf)" date={outcome.jwt.notBefore} now={now} />
                            <ClaimTime label="Expires (exp)" date={outcome.jwt.expiresAt} now={now} />
                        </div>
                    )}
                    <div className="tl-two">
                        <section className="tl-panel">
                            <div className="tl-panel-header">
                                <h2 className="tl-panel-title">Header</h2>
                                <CopyButton text={header} />
                            </div>
                            <pre className="tl-pre">{header}</pre>
                        </section>
                        <section className="tl-panel">
                            <div className="tl-panel-header">
                                <h2 className="tl-panel-title">Payload</h2>
                                <CopyButton text={payload} />
                            </div>
                            <pre className="tl-pre">{payload}</pre>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
}
