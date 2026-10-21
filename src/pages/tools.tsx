import type { ComponentType } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "../components/styles/tools.css";

import ColorConverter from "../components/Tools/ColorConverter";
import EncodeDecode from "../components/Tools/EncodeDecode";
import Generators from "../components/Tools/Generators";
import JsonConverter from "../components/Tools/JsonConverter";
import JwtDecoder from "../components/Tools/JwtDecoder";
import RegexTester from "../components/Tools/RegexTester";
import TextTools from "../components/Tools/TextTools";
import TimestampConverter from "../components/Tools/TimestampConverter";

// One entry per tool. Add a tool by adding it here.
const TABS = [
    { id: "json", label: "JSON Converter", tool: JsonConverter },
    { id: "encode", label: "Encode / Decode", tool: EncodeDecode },
    { id: "jwt", label: "JWT Decoder", tool: JwtDecoder },
    { id: "regex", label: "Regex Tester", tool: RegexTester },
    { id: "time", label: "Timestamps", tool: TimestampConverter },
    { id: "color", label: "Colours", tool: ColorConverter },
    { id: "text", label: "Text", tool: TextTools },
    { id: "generate", label: "Generators", tool: Generators },
] as const satisfies readonly { id: string; label: string; tool: ComponentType }[];

type TabId = typeof TABS[number]["id"];

export default function Tools() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // The tab lives in the URL so it survives reloads and can be linked to.
    const active = TABS.find((t) => t.id === searchParams.get("tab")) ?? TABS[0];
    const tab: TabId = active.id;
    const Tool = active.tool;

    return (
        <div className="tl-page">
            <header className="tl-topbar">
                <button className="tl-topbar-back" onClick={() => navigate("/")}>
                    ← OH<span>/</span>Hub
                </button>
                <span className="tl-topbar-title">Tools</span>
            </header>

            <section className="tl-hero">
                <p className="tl-eyebrow">// small useful things</p>
                <h1 className="tl-title">Dev <em>Tools</em></h1>
                <p className="tl-subtitle-text">
                    Converters, decoders, a regex tester and generators that run entirely in your browser. Nothing you paste here is sent anywhere.
                </p>
            </section>

            <div className="tl-tabs" role="tablist" aria-label="Tools">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`tl-tab-${id}`}
                        aria-selected={tab === id}
                        aria-controls={`tl-panel-${id}`}
                        className={tab === id ? "tl-tab active" : "tl-tab"}
                        onClick={() => setSearchParams(id === TABS[0].id ? {} : { tab: id }, { replace: true })}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <main className="tl-content" role="tabpanel" id={`tl-panel-${tab}`} aria-labelledby={`tl-tab-${tab}`}>
                <Tool />
            </main>
        </div>
    );
}
