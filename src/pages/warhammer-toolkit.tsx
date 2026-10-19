import { useNavigate, useSearchParams } from "react-router-dom";

import "../components/styles/warhammer-toolkit.css";

import Battle from "../components/WarhammerToolkit/Battle";
import GameTracker from "../components/WarhammerToolkit/GameTracker";
import Mathhammer from "../components/WarhammerToolkit/Mathhammer";

const TABS = [
    { id: "mathhammer", label: "Mathhammer" },
    { id: "battle", label: "Battle" },
    { id: "tracker", label: "Game Tracker" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function WarhammerToolkit() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // The tab lives in the URL so it survives reloads and can be linked to.
    const tab: TabId = TABS.find((t) => t.id === searchParams.get("tab"))?.id ?? "mathhammer";

    return (
        <div className="whk-page">
            <header className="whk-topbar">
                <button className="whk-topbar-back" onClick={() => navigate("/")}>
                    ← OH<span>/</span>Hub
                </button>
                <span className="whk-topbar-title">Warhammer Toolkit</span>
            </header>

            <section className="whk-hero">
                <p className="whk-eyebrow">// 40k · 10th edition</p>
                <h1 className="whk-title">Warhammer <em>Toolkit</em></h1>
                <p className="whk-subtitle-text">
                    Work out the odds before you roll, pit two units against each other, then keep score while you play.
                </p>
            </section>

            <div className="whk-tabs" role="tablist" aria-label="Toolkit sections">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`whk-tab-${id}`}
                        aria-selected={tab === id}
                        aria-controls={`whk-panel-${id}`}
                        className={tab === id ? "whk-tab active" : "whk-tab"}
                        onClick={() => setSearchParams(id === "mathhammer" ? {} : { tab: id }, { replace: true })}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <main className="whk-content" role="tabpanel" id={`whk-panel-${tab}`} aria-labelledby={`whk-tab-${tab}`}>
                {tab === "mathhammer" ? <Mathhammer /> : tab === "battle" ? <Battle /> : <GameTracker />}
            </main>
        </div>
    );
}
