import { createAttack, type Attack, type AttackKind } from "../../utils/dmScreen";

interface AttackListProps {
    attacks: Attack[];
    onChange: (attacks: Attack[]) => void;
}

// Labels and examples differ a little between a weapon and a spell.
const FIELDS: Record<AttackKind, { name: string; hit: string; damage: string; range: string }> = {
    weapon: { name: "e.g. Longsword", hit: "+5", damage: "1d8 + 3 slashing", range: "5 ft" },
    magic: { name: "e.g. Fire Bolt", hit: "+5, or DC 13 Dex", damage: "2d10 fire, or effect", range: "120 ft" },
};

// Weapons and spells, each with a Weapon / Magic toggle.
export default function AttackList({ attacks, onChange }: AttackListProps) {
    const update = (id: string, fields: Partial<Attack>) =>
        onChange(attacks.map((a) => (a.id === id ? { ...a, ...fields } : a)));

    return (
        <div className="dms-attacks">
            {attacks.length > 0 && (
                <ul className="dms-attack-list">
                    {attacks.map((attack) => {
                        const examples = FIELDS[attack.kind];
                        return (
                            <li key={attack.id} className={`dms-attack dms-attack--${attack.kind}`}>
                                <div className="dms-attack-toggle" role="group" aria-label="Weapon or magic">
                                    <button
                                        type="button"
                                        className={attack.kind === "weapon" ? "active" : ""}
                                        aria-pressed={attack.kind === "weapon"}
                                        onClick={() => update(attack.id, { kind: "weapon" })}
                                    >
                                        ⚔ Weapon
                                    </button>
                                    <button
                                        type="button"
                                        className={attack.kind === "magic" ? "active" : ""}
                                        aria-pressed={attack.kind === "magic"}
                                        onClick={() => update(attack.id, { kind: "magic" })}
                                    >
                                        ✦ Magic
                                    </button>
                                </div>
                                <label className="dms-field dms-attack-name">
                                    <span>{attack.kind === "magic" ? "Spell" : "Weapon"}</span>
                                    <input value={attack.name} placeholder={examples.name} onChange={(e) => update(attack.id, { name: e.target.value })} />
                                </label>
                                <label className="dms-field">
                                    <span>{attack.kind === "magic" ? "Attack / DC" : "To hit"}</span>
                                    <input value={attack.hit} placeholder={examples.hit} onChange={(e) => update(attack.id, { hit: e.target.value })} />
                                </label>
                                <label className="dms-field">
                                    <span>{attack.kind === "magic" ? "Damage / effect" : "Damage"}</span>
                                    <input value={attack.damage} placeholder={examples.damage} onChange={(e) => update(attack.id, { damage: e.target.value })} />
                                </label>
                                <label className="dms-field">
                                    <span>Range</span>
                                    <input value={attack.range} placeholder={examples.range} onChange={(e) => update(attack.id, { range: e.target.value })} />
                                </label>
                                <button
                                    type="button"
                                    className="dms-icon-button dms-attack-remove"
                                    aria-label={`Remove ${attack.name || "attack"}`}
                                    title="Remove"
                                    onClick={() => onChange(attacks.filter((a) => a.id !== attack.id))}
                                >
                                    ×
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
            <div className="dms-attack-add">
                <button type="button" className="dms-link-button" onClick={() => onChange([...attacks, createAttack("weapon")])}>
                    + Weapon
                </button>
                <button type="button" className="dms-link-button" onClick={() => onChange([...attacks, createAttack("magic")])}>
                    + Magic
                </button>
            </div>
        </div>
    );
}
