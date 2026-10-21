import { useNavigate, useSearchParams } from "react-router-dom";

import "../components/styles/tools.css";

import JsonConverter from "../components/Tools/JsonConverter";

// One entry per tool. Add a tool by adding it here and to the panel below.
const TABS = [
    { id: "json", label: "JSON Converter" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function Tools() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // The tab lives in the URL so it survives reloads and can be linked to.
    const tab: TabId = TABS.find((t) => t.id === searchParams.get("tab"))?.id ?? "json";

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
                    Little utilities that run entirely in your browser. Nothing you paste here is sent anywhere.
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
                        onClick={() => setSearchParams(id === "json" ? {} : { tab: id }, { replace: true })}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <main className="tl-content" role="tabpanel" id={`tl-panel-${tab}`} aria-labelledby={`tl-tab-${tab}`}>
                {tab === "json" && <JsonConverter />}
            </main>
        </div>
    );
}
