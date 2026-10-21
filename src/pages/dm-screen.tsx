import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "../components/styles/dm-screen.css";

import EncounterTracker from "../components/DmScreen/EncounterTracker";
import ItemManager from "../components/DmScreen/ItemManager";
import MapMaker from "../components/DmScreen/MapMaker";
import NoteManager from "../components/DmScreen/NoteManager";
import NpcManager from "../components/DmScreen/NpcManager";
import PlayerMapView from "../components/DmScreen/PlayerMapView";
import StoryBoard from "../components/DmScreen/StoryBoard";
import { STORAGE_KEY, createDefaultData, parseData, type DmScreenData } from "../utils/dmScreen";

const TABS = [
    { id: "tracker", label: "Encounter Tracker" },
    { id: "npcs", label: "NPCs" },
    { id: "items", label: "Items" },
    { id: "notes", label: "Notes" },
    { id: "board", label: "Story Board" },
    { id: "map", label: "Map" },
] as const;

type TabId = typeof TABS[number]["id"];

function loadStored(): DmScreenData {
    try {
        return parseData(localStorage.getItem(STORAGE_KEY)) ?? createDefaultData();
    }
    catch {
        return createDefaultData();
    }
}

// ?view=player is the players' window for the Map tab.
export default function DmScreenPage() {
    const [searchParams] = useSearchParams();
    return searchParams.get("view") === "player" ? <PlayerMapView /> : <DmScreen />;
}

function DmScreen() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<DmScreenData>(loadStored);
    const [importError, setImportError] = useState("");
    // A card to select (and scroll to) the next time the story board opens.
    const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    // The tab lives in the URL so it survives reloads and can be linked to.
    const tab: TabId = TABS.find((t) => t.id === searchParams.get("tab"))?.id ?? "tracker";
    const showTab = (id: TabId) => setSearchParams(id === "tracker" ? {} : { tab: id }, { replace: true });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        catch {
            // Storage can be full or blocked; the page keeps working in memory.
        }
    }, [data]);

    const exportJson = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `dm-screen-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const importJson = async (file: File | undefined) => {
        if (!file) return;
        const imported = parseData(await file.text());
        if (!imported) {
            setImportError("That file isn't a DM Screen export.");
            return;
        }
        setImportError("");
        setData(imported);
    };

    const runEncounter = (encounterId: string) => {
        setData((current) => ({ ...current, activeEncounterId: encounterId }));
        showTab("tracker");
    };

    const openNpc = (npcId: string) => {
        setData((current) => ({ ...current, activeNpcId: npcId }));
        showTab("npcs");
    };

    const openItem = (itemId: string) => {
        setData((current) => ({ ...current, activeItemId: itemId }));
        showTab("items");
    };

    const openNote = (noteId: string) => {
        setData((current) => ({ ...current, activeNoteId: noteId }));
        showTab("notes");
    };

    const showCard = (boardId: string, nodeId: string) => {
        setData((current) => ({ ...current, activeBoardId: boardId }));
        setFocusNodeId(nodeId);
        showTab("board");
    };

    return (
        <div className="dms-page">
            <header className="dms-topbar">
                <button className="dms-topbar-back" onClick={() => navigate("/")}>
                    ← OH<span>/</span>Hub
                </button>
                <span className="dms-topbar-title">DM Screen</span>
            </header>

            <section className="dms-hero">
                <p className="dms-eyebrow">// tabletop · any system</p>
                <h1 className="dms-title">DM <em>Screen</em></h1>
                <p className="dms-subtitle-text">
                    Run encounters turn by turn, keep sheets for your named NPCs and loot, map out your story as cards and strings, and build maps from premade pieces.
                </p>
                <div className="dms-backup">
                    <button type="button" className="dms-button dms-button--ghost" onClick={exportJson}>
                        Export JSON
                    </button>
                    <button type="button" className="dms-button dms-button--ghost" onClick={() => fileInput.current?.click()}>
                        Import JSON
                    </button>
                    <input
                        ref={fileInput}
                        type="file"
                        accept="application/json,.json"
                        hidden
                        onChange={(e) => {
                            void importJson(e.target.files?.[0]);
                            e.target.value = "";
                        }}
                    />
                    {importError && <span className="dms-error-text" role="alert">{importError}</span>}
                </div>
            </section>

            <div className="dms-tabs" role="tablist" aria-label="DM Screen sections">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        id={`dms-tab-${id}`}
                        aria-selected={tab === id}
                        aria-controls={`dms-panel-${id}`}
                        className={tab === id ? "dms-tab active" : "dms-tab"}
                        onClick={() => showTab(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <main className="dms-content" role="tabpanel" id={`dms-panel-${tab}`} aria-labelledby={`dms-tab-${tab}`}>
                {tab === "tracker" && <EncounterTracker data={data} setData={setData} onOpenNpc={openNpc} />}
                {tab === "npcs" && <NpcManager data={data} setData={setData} onShowCard={showCard} onOpenItem={openItem} />}
                {tab === "items" && <ItemManager data={data} setData={setData} onShowCard={showCard} />}
                {tab === "notes" && <NoteManager data={data} setData={setData} onShowCard={showCard} />}
                {tab === "board" && (
                    <StoryBoard
                        data={data}
                        setData={setData}
                        onRunEncounter={runEncounter}
                        onOpenNpc={openNpc}
                        onOpenItem={openItem}
                        onOpenNote={openNote}
                        focusNodeId={focusNodeId}
                        onFocused={() => setFocusNodeId(null)}
                    />
                )}
                {tab === "map" && <MapMaker data={data} setData={setData} />}
            </main>
        </div>
    );
}
