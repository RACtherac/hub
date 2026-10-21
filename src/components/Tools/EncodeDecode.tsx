import { useMemo, useState } from "react";

import { CODECS, ToolError, decode, encode, type Codec } from "../../utils/devTools";
import CopyButton from "./CopyButton";

type Direction = "encode" | "decode";

export default function EncodeDecode() {
    const [codec, setCodec] = useState<Codec>("base64");
    const [direction, setDirection] = useState<Direction>("encode");
    const [input, setInput] = useState("Hello, världen! 👋");

    const outcome = useMemo(() => {
        try {
            return { ok: true as const, text: direction === "encode" ? encode(codec, input) : decode(codec, input) };
        }
        catch (error) {
            if (error instanceof ToolError) return { ok: false as const, message: error.message };
            throw error;
        }
    }, [codec, direction, input]);

    // Turns the output into the next input, the other way round.
    const swap = () => {
        if (!outcome.ok) return;
        setInput(outcome.text);
        setDirection(direction === "encode" ? "decode" : "encode");
    };

    return (
        <div className="tl-stack">
            <div className="tl-toolbar">
                <div className="tl-segmented" role="group" aria-label="Encoding">
                    {CODECS.map((c) => (
                        <button key={c.value} type="button" className={codec === c.value ? "active" : ""} aria-pressed={codec === c.value} onClick={() => setCodec(c.value)}>
                            {c.label}
                        </button>
                    ))}
                </div>
                <div className="tl-segmented" role="group" aria-label="Direction">
                    <button type="button" className={direction === "encode" ? "active" : ""} aria-pressed={direction === "encode"} onClick={() => setDirection("encode")}>
                        Encode
                    </button>
                    <button type="button" className={direction === "decode" ? "active" : ""} aria-pressed={direction === "decode"} onClick={() => setDirection("decode")}>
                        Decode
                    </button>
                </div>
            </div>

            <div className="tl-two">
                <section className="tl-panel">
                    <div className="tl-panel-header">
                        <h2 className="tl-panel-title">{direction === "encode" ? "Text" : "Encoded"}</h2>
                        <button type="button" className="tl-button tl-button--ghost" onClick={() => setInput("")} disabled={!input}>Clear</button>
                    </div>
                    <textarea
                        className="tl-code tl-code--short"
                        value={input}
                        spellCheck={false}
                        aria-label="Input"
                        aria-invalid={!outcome.ok}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </section>

                <section className="tl-panel">
                    <div className="tl-panel-header">
                        <h2 className="tl-panel-title">{direction === "encode" ? "Encoded" : "Text"}</h2>
                        <div className="tl-panel-actions">
                            <button type="button" className="tl-button tl-button--ghost" onClick={swap} disabled={!outcome.ok || !outcome.text} title="Use the result as the input and flip the direction">
                                ⇄ Swap
                            </button>
                            <CopyButton text={outcome.ok ? outcome.text : ""} />
                        </div>
                    </div>
                    <textarea
                        className="tl-code tl-code--short tl-code--output"
                        value={outcome.ok ? outcome.text : ""}
                        readOnly
                        spellCheck={false}
                        aria-label="Result"
                        placeholder={outcome.ok ? "" : "Fix the input to see the result."}
                    />
                    {!outcome.ok && <p className="tl-status-error" role="alert"><strong>Can't decode:</strong> {outcome.message}</p>}
                </section>
            </div>
        </div>
    );
}
