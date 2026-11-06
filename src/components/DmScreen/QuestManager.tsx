import { useState, type Dispatch, type SetStateAction } from "react";

import {
    QUEST_STAGES,
    createQuest,
    createQuestDialog,
    currentQuestStage,
    putQuestOnBoard,
    questCards,
    questMatches,
    questStageInfo,
    removeQuest,
    updateQuest,
    updateQuestStage,
    type DmScreenData,
    type Quest,
    type QuestDialog,
    type QuestStage,
    type QuestStageId,
} from "../../utils/dmScreen";
import ConfirmButton from "./ConfirmButton";

interface QuestManagerProps {
    data: DmScreenData;
    setData: Dispatch<SetStateAction<DmScreenData>>;
    onShowCard: (boardId: string, nodeId: string) => void;
    onOpenNpc: (npcId: string) => void;
    onOpenItem: (itemId: string) => void;
}

const questStatus = (quest: Quest) => {
    const stage = currentQuestStage(quest);
    return stage ? `${questStageInfo(stage).icon} ${questStageInfo(stage).label}` : "✓ Finished";
};

export default function QuestManager({ data, setData, onShowCard, onOpenNpc, onOpenItem }: QuestManagerProps) {
    const [query, setQuery] = useState("");
    const quest = data.quests.find((q) => q.id === data.activeQuestId) ?? data.quests[0];
    const shown = data.quests.filter((q) => questMatches(q, query));

    const addQuest = () => {
        const created = createQuest({ title: `Quest ${data.quests.length + 1}` });
        setData((current) => ({ ...current, quests: [...current.quests, created], activeQuestId: created.id }));
        setQuery("");
    };

    return (
        <div className="dms-tracker dms-quests-tab">
            {/* ---------------- Quest list ---------------- */}
            <aside className="dms-panel dms-encounter-list" aria-label="Quests">
                <h2 className="dms-panel-title">Quests</h2>
                {data.quests.length > 0 && (
                    <label className="dms-field dms-list-search">
                        <span>Search</span>
                        <input type="search" value={query} placeholder="Title, stages, dialogue…" onChange={(e) => setQuery(e.target.value)} />
                    </label>
                )}
                {data.quests.length > 0 && shown.length === 0 && <p className="dms-empty">No quests match "{query.trim()}".</p>}
                {shown.length > 0 && (
                    <ul>
                        {shown.map((q) => (
                            <li key={q.id}>
                                <button
                                    type="button"
                                    className={q.id === quest?.id ? "dms-encounter-item active" : "dms-encounter-item"}
                                    aria-current={q.id === quest?.id}
                                    onClick={() => setData((current) => ({ ...current, activeQuestId: q.id }))}
                                >
                                    <span>{q.title || "Untitled quest"}</span>
                                    <small>{questStatus(q)}</small>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" className="dms-button dms-button--ghost" onClick={addQuest}>
                    + New quest
                </button>
            </aside>

            {/* ---------------- Selected quest ---------------- */}
            <section className="dms-panel dms-encounter">
                {quest ? (
                    <QuestSheet
                        key={quest.id}
                        quest={quest}
                        data={data}
                        setData={setData}
                        onShowCard={onShowCard}
                        onOpenNpc={onOpenNpc}
                        onOpenItem={onOpenItem}
                    />
                ) : (
                    <p className="dms-empty">
                        No quests yet. Each quest has a beginning, a midway point, an end and a reward, with the NPCs
                        involved and the lines they say once the party has done something. Put them on the story board as Quest cards.
                    </p>
                )}
            </section>
        </div>
    );
}

interface QuestSheetProps extends QuestManagerProps {
    quest: Quest;
}

function QuestSheet({ quest, data, setData, onShowCard, onOpenNpc, onOpenItem }: QuestSheetProps) {
    // Open on the stage the party is on.
    const [stageId, setStageId] = useState<QuestStageId>(currentQuestStage(quest) ?? "reward");
    const stage = quest.stages[stageId];
    const info = questStageInfo(stageId);
    const cards = questCards(data, quest.id);
    const current = currentQuestStage(quest);

    const set = (fields: Partial<Omit<Quest, "id" | "stages">>) =>
        setData((d) => updateQuest(d, quest.id, (q) => ({ ...q, ...fields })));
    const setStage = (fields: Partial<QuestStage>) => setData((d) => updateQuestStage(d, quest.id, stageId, fields));
    const setDialog = (id: string, fields: Partial<QuestDialog>) =>
        setStage({ dialogs: stage.dialogs.map((dl) => (dl.id === id ? { ...dl, ...fields } : dl)) });

    const npcName = (id: string) => data.npcs.find((n) => n.id === id)?.name || "Unnamed";
    const addableNpcs = data.npcs.filter((n) => !stage.npcIds.includes(n.id));
    // Speakers: the stage's NPCs first, then everyone else.
    const speakers = [...stage.npcIds.map((id) => data.npcs.find((n) => n.id === id)).filter((n) => n !== undefined),
        ...data.npcs.filter((n) => !stage.npcIds.includes(n.id))];
    const rewardItems = quest.rewardItemIds.map((id) => data.items.find((i) => i.id === id)).filter((i) => i !== undefined);
    const addableItems = data.items.filter((i) => !quest.rewardItemIds.includes(i.id));

    const putOnBoard = () => {
        const result = putQuestOnBoard(data, quest.id);
        setData(result.data);
        onShowCard(result.boardId, result.nodeId);
    };

    return (
        <>
            <div className="dms-encounter-header">
                <label className="dms-field dms-encounter-name">
                    <span>Quest</span>
                    <input value={quest.title} onChange={(e) => set({ title: e.target.value })} />
                </label>
                <ConfirmButton label="Delete quest" onConfirm={() => setData((d) => removeQuest(d, quest.id))} />
            </div>

            <label className="dms-field">
                <span>Summary</span>
                <textarea
                    rows={2}
                    value={quest.summary}
                    placeholder="What it's about in a sentence or two"
                    onChange={(e) => set({ summary: e.target.value })}
                />
            </label>

            {/* ---------------- The four stage cards, in order ---------------- */}
            <ol className="dms-quest-flow" aria-label="Quest stages">
                {QUEST_STAGES.map((s) => {
                    const st = quest.stages[s.value];
                    const npcCount = st.npcIds.length;
                    const lines = st.dialogs.length;
                    return (
                        <li key={s.value}>
                            <button
                                type="button"
                                className={[
                                    "dms-quest-stage",
                                    `dms-quest-stage--${s.value}`,
                                    s.value === stageId ? "active" : "",
                                    st.done ? "done" : "",
                                    s.value === current ? "current" : "",
                                ].filter(Boolean).join(" ")}
                                aria-pressed={s.value === stageId}
                                onClick={() => setStageId(s.value)}
                            >
                                <span className="dms-quest-stage-label">
                                    {st.done ? "✓" : s.icon} {s.label}
                                </span>
                                <span className="dms-quest-stage-text">
                                    {st.description.trim().split("\n")[0]?.slice(0, 70) || "Nothing written yet"}
                                </span>
                                <small>
                                    {npcCount} NPC{npcCount === 1 ? "" : "s"} · {lines} line{lines === 1 ? "" : "s"}
                                    {s.value === current && " · now"}
                                </small>
                            </button>
                        </li>
                    );
                })}
            </ol>

            <div className="dms-npc-sheet">
                {/* ---------------- Selected stage ---------------- */}
                <div className="dms-npc-fields">
                    <div className="dms-quest-stage-header">
                        <h3 className="dms-subtitle">{info.icon} {info.label}</h3>
                        <button
                            type="button"
                            className={stage.done ? "dms-button" : "dms-button dms-button--ghost"}
                            aria-pressed={stage.done}
                            onClick={() => setStage({ done: !stage.done })}
                        >
                            {stage.done ? "✓ Done" : "Mark as done"}
                        </button>
                    </div>
                    <label className="dms-field">
                        <span>What happens</span>
                        <textarea
                            rows={5}
                            value={stage.description}
                            placeholder={info.hint}
                            onChange={(e) => setStage({ description: e.target.value })}
                        />
                    </label>

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">NPCs in this stage</span>
                        {stage.npcIds.length === 0 ? (
                            <p className="dms-inspector-help">
                                {data.npcs.length === 0 ? "Add NPCs in the NPCs tab first." : "No one yet."}
                            </p>
                        ) : (
                            <ul className="dms-quest-npcs">
                                {stage.npcIds.map((id) => (
                                    <li key={id}>
                                        <button type="button" className="dms-link-button" onClick={() => onOpenNpc(id)}>
                                            👤 {npcName(id)}
                                        </button>
                                        <button
                                            type="button"
                                            className="dms-quest-remove"
                                            aria-label={`Remove ${npcName(id)} from this stage`}
                                            title="Remove from this stage"
                                            onClick={() => setStage({ npcIds: stage.npcIds.filter((n) => n !== id) })}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {addableNpcs.length > 0 && (
                            <label className="dms-field">
                                <span>Add an NPC…</span>
                                <select value="" onChange={(e) => e.target.value && setStage({ npcIds: [...stage.npcIds, e.target.value] })}>
                                    <option value="">Pick an NPC</option>
                                    {addableNpcs.map((n) => <option key={n.id} value={n.id}>{n.name || "Unnamed"}</option>)}
                                </select>
                            </label>
                        )}
                    </div>

                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">Dialogue</span>
                        {stage.dialogs.length === 0 && (
                            <p className="dms-inspector-help">
                                Lines to read out once something has happened: "When they show her the ring…"
                            </p>
                        )}
                        <ul className="dms-quest-dialogs">
                            {stage.dialogs.map((dl) => (
                                <li key={dl.id} className={dl.said ? "dms-quest-dialog said" : "dms-quest-dialog"}>
                                    <div className="dms-quest-dialog-row">
                                        <label className="dms-field">
                                            <span>When…</span>
                                            <input
                                                value={dl.trigger}
                                                placeholder="e.g. they bring back the stolen ledger"
                                                onChange={(e) => setDialog(dl.id, { trigger: e.target.value })}
                                            />
                                        </label>
                                        <label className="dms-field">
                                            <span>Who says it</span>
                                            <select value={dl.npcId} onChange={(e) => setDialog(dl.id, { npcId: e.target.value })}>
                                                <option value="">Narrator / anyone</option>
                                                {speakers.map((n) => <option key={n.id} value={n.id}>{n.name || "Unnamed"}</option>)}
                                            </select>
                                        </label>
                                    </div>
                                    <label className="dms-field">
                                        <span>Says</span>
                                        <textarea
                                            rows={3}
                                            value={dl.text}
                                            placeholder="“You found it! I knew I could trust you…”"
                                            onChange={(e) => setDialog(dl.id, { text: e.target.value })}
                                        />
                                    </label>
                                    <div className="dms-quest-dialog-actions">
                                        <label className="dms-quest-said">
                                            <input type="checkbox" checked={dl.said} onChange={(e) => setDialog(dl.id, { said: e.target.checked })} />
                                            Said it
                                        </label>
                                        <button
                                            type="button"
                                            className="dms-link-button dms-quest-delete"
                                            onClick={() => setStage({ dialogs: stage.dialogs.filter((x) => x.id !== dl.id) })}
                                        >
                                            Delete line
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            className="dms-button dms-button--ghost"
                            onClick={() => setStage({ dialogs: [...stage.dialogs, createQuestDialog({ npcId: stage.npcIds[0] ?? "" })] })}
                        >
                            + Add dialogue
                        </button>
                    </div>

                    {stageId === "reward" && (
                        <div className="dms-inspector-section">
                            <span className="dms-subtitle">Reward</span>
                            <label className="dms-field">
                                <span>What they get</span>
                                <textarea
                                    rows={3}
                                    value={quest.reward}
                                    placeholder="200 gp, a favour from the guild, 500 XP…"
                                    onChange={(e) => set({ reward: e.target.value })}
                                />
                            </label>
                            {rewardItems.length > 0 && (
                                <ul className="dms-quest-npcs">
                                    {rewardItems.map((item) => (
                                        <li key={item.id}>
                                            <button type="button" className="dms-link-button" onClick={() => onOpenItem(item.id)}>
                                                🎒 {item.name || "Unnamed"}
                                            </button>
                                            <button
                                                type="button"
                                                className="dms-quest-remove"
                                                aria-label={`Remove ${item.name || "item"} from the reward`}
                                                title="Remove from the reward"
                                                onClick={() => set({ rewardItemIds: quest.rewardItemIds.filter((i) => i !== item.id) })}
                                            >
                                                ×
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {addableItems.length > 0 && (
                                <label className="dms-field">
                                    <span>Add an item…</span>
                                    <select value="" onChange={(e) => e.target.value && set({ rewardItemIds: [...quest.rewardItemIds, e.target.value] })}>
                                        <option value="">Pick an item</option>
                                        {addableItems.map((i) => <option key={i.id} value={i.id}>{i.name || "Unnamed"}</option>)}
                                    </select>
                                </label>
                            )}
                        </div>
                    )}
                </div>

                {/* ---------------- Story board ---------------- */}
                <div className="dms-npc-side">
                    <div className="dms-inspector-section">
                        <span className="dms-subtitle">On the story board</span>
                        {cards.length === 0 ? (
                            <p className="dms-inspector-help">Not on any board yet.</p>
                        ) : (
                            <ul className="dms-connection-list">
                                {cards.map(({ board, node }) => (
                                    <li key={node.id}>
                                        <button type="button" className="dms-link-button" onClick={() => onShowCard(board.id, node.id)}>
                                            {board.name || "Untitled board"}: {questStageInfo(node.questStage ?? "begin").label} →
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="dms-inspector-buttons">
                            <button type="button" className="dms-button dms-button--ghost" onClick={putOnBoard}>
                                + Put on story board
                            </button>
                        </div>
                        <p className="dms-inspector-help">
                            Adds four connected Quest cards, one per stage. They show what you write here.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
