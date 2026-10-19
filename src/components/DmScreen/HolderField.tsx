import {
    ITEM_HOLDERS,
    holderOfKind,
    locationNames,
    type DmScreenData,
    type ItemHolder,
    type ItemHolderKind,
} from "../../utils/dmScreen";

interface HolderFieldProps {
    // Unique per page, for the location suggestions list.
    id: string;
    holder: ItemHolder;
    data: DmScreenData;
    onChange: (holder: ItemHolder) => void;
}

// "Who has it": nobody yet, an NPC, a location or the party.
export default function HolderField({ id, holder, data, onChange }: HolderFieldProps) {
    const locations = locationNames(data);

    return (
        <div className="dms-holder">
            <label className="dms-field">
                <span>Who has it</span>
                <select value={holder.kind} onChange={(e) => onChange(holderOfKind(e.target.value as ItemHolderKind, data))}>
                    {ITEM_HOLDERS.map((h) => (
                        <option key={h.value} value={h.value} disabled={h.value === "npc" && data.npcs.length === 0}>
                            {h.value === "npc" && data.npcs.length === 0 ? `${h.label} (add one in the NPCs tab)` : h.label}
                        </option>
                    ))}
                </select>
            </label>

            {holder.kind === "npc" && (
                <label className="dms-field">
                    <span>NPC</span>
                    <select value={holder.npcId} onChange={(e) => onChange({ kind: "npc", npcId: e.target.value })}>
                        {data.npcs.map((n) => <option key={n.id} value={n.id}>{n.name || "Unnamed"}</option>)}
                    </select>
                </label>
            )}
            {holder.kind === "location" && (
                <label className="dms-field">
                    <span>Where</span>
                    <input
                        value={holder.name}
                        placeholder="e.g. The dragon's hoard"
                        list={locations.length ? `dms-holder-locations-${id}` : undefined}
                        onChange={(e) => onChange({ kind: "location", name: e.target.value })}
                    />
                    {locations.length > 0 && (
                        <datalist id={`dms-holder-locations-${id}`}>
                            {locations.map((name) => <option key={name} value={name} />)}
                        </datalist>
                    )}
                </label>
            )}
            {holder.kind === "party" && (
                <label className="dms-field">
                    <span>Carried by (optional)</span>
                    <input
                        value={holder.character}
                        placeholder="e.g. Mira"
                        onChange={(e) => onChange({ kind: "party", character: e.target.value })}
                    />
                </label>
            )}
        </div>
    );
}
