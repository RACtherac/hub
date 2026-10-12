import { Counter, Derived, RowTable, SelectField, TextBlock, TextField } from "../RpgKit/RpgKit";
import { toInt } from "../../utils/makeId";
import {
  ATTRIBUTES,
  ATTRIBUTE_MAX,
  SKILLS,
  SKILL_MAX,
  SPECIES,
  TIERS,
  blankWeapon,
  derivedTraits,
  skillPool,
  type WgData,
  type WgWeapon,
} from "./wrathGloryData";

type Props = {
  name: string;
  data: WgData;
  onNameChange: (name: string) => void;
  onChange: (data: WgData) => void;
};

const WEAPON_COLUMNS: { key: Exclude<keyof WgWeapon, "id">; label: string; width: string }[] = [
  { key: "name", label: "Name", width: "1.6fr" },
  { key: "damage", label: "Dmg", width: "0.5fr" },
  { key: "ed", label: "ED", width: "0.5fr" },
  { key: "ap", label: "AP", width: "0.5fr" },
  { key: "range", label: "Range", width: "0.9fr" },
  { key: "salvo", label: "Salvo", width: "0.5fr" },
  { key: "traits", label: "Traits", width: "1.8fr" },
];

export default function WrathGlorySheet({ name, data, onNameChange, onChange }: Props) {
  const set = (patch: Partial<WgData>) => onChange({ ...data, ...patch });
  const text = (field: { [K in keyof WgData]: WgData[K] extends string ? K : never }[keyof WgData]) => ({
    value: data[field],
    onChange: (value: string) => set({ [field]: value }),
  });
  const traits = derivedTraits(data);

  return (
    <div className="rpg-system rpg-system--wg">
      <div className="rpg-meta-grid">
        <TextField label="Character name" value={name} onChange={onNameChange} />
        <TextField label="Player" {...text("player")} />
        <TextField label="Species" {...text("species")} list={{ id: "rpg-wg-species", options: SPECIES }} />
        <TextField label="Archetype" {...text("archetype")} />
        <TextField label="Faction" {...text("faction")} />
        <TextField label="Background" {...text("background")} />
        <SelectField label="Tier" options={TIERS} {...text("tier")} />
        <SelectField label="Rank" options={TIERS} {...text("rank")} />
      </div>
      <TextField label="Keywords" {...text("keywords")} placeholder="Imperium, Adeptus Ministorum, …" />

      <div className="rpg-core-box">
        <p className="rpg-panel-label">// attributes</p>
        <div className="rpg-attr-grid" style={{ "--rpg-cols": 7 } as React.CSSProperties}>
          {ATTRIBUTES.map(({ key, label }) => (
            <label key={key} className="rpg-score-box">
              <span>{label}</span>
              <input
                type="number"
                min={1}
                max={ATTRIBUTE_MAX}
                value={data.attributes[key]}
                onChange={(e) => set({ attributes: { ...data.attributes, [key]: toInt(e.target.value) } })}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rpg-two-col">
        <div className="rpg-core-box">
          <p className="rpg-panel-label">// traits</p>
          <div className="rpg-attr-grid" style={{ "--rpg-cols": 4 } as React.CSSProperties}>
            <Derived label="Defence" value={traits.defence} title="Initiative − 1" />
            <Derived label="Resilience" value={traits.resilience} title="Toughness + 1 + armour rating" />
            <Derived label="Resolve" value={traits.resolve} title="Willpower − 1" />
            <Derived label="Conviction" value={traits.conviction} title="Willpower" />
            <Derived label="Determination" value={traits.determination} title="Toughness" />
            <Derived label="Passive Aw." value={traits.passiveAwareness} title="Awareness pool ÷ 2, rounded up" />
            <Derived label="Influence" value={traits.influence} title="Fellowship − 1" />
            <Derived label="Wealth" value={traits.wealth} title="Tier" />
          </div>
        </div>

        <div className="rpg-core-box">
          <p className="rpg-panel-label">// damage &amp; resources</p>
          <div className="rpg-attr-grid" style={{ "--rpg-cols": 4 } as React.CSSProperties}>
            <Counter label="Wounds taken" {...text("woundsTaken")} max={traits.maxWounds} title="Max wounds = Tier × 2 + Toughness" />
            <Counter label="Shock taken" {...text("shockTaken")} max={traits.maxShock} title="Max shock = Willpower + Tier" />
            <Counter label="Speed" {...text("speed")} />
            <Counter label="Wrath" {...text("wrath")} />
            <Counter label="Glory" {...text("glory")} />
            <Counter label="Faith" {...text("faith")} />
            <Counter label="Corruption" {...text("corruption")} />
            <Derived label="XP to spend" value={toInt(data.xpTotal) - toInt(data.xpSpent)} title="XP total − XP spent" />
          </div>
          <div className="rpg-attr-grid rpg-system-row" style={{ "--rpg-cols": 2 } as React.CSSProperties}>
            <Counter label="XP total" {...text("xpTotal")} />
            <Counter label="XP spent" {...text("xpSpent")} />
          </div>
        </div>
      </div>

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// skills</p>
          <small className="rpg-skill-hint">Rating 0–{SKILL_MAX} · bold number is your dice pool (attribute + rating)</small>
        </div>
        <div className="rpg-skill-grid">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="rpg-skill-row">
              <input
                className="rpg-skill-input"
                type="number"
                min={0}
                max={SKILL_MAX}
                value={data.skills[skill.name] ?? 0}
                onChange={(e) => set({ skills: { ...data.skills, [skill.name]: toInt(e.target.value) } })}
                aria-label={`${skill.name} rating`}
              />
              <span className="rpg-skill-mod" title="Dice pool">{skillPool(data, skill)}</span>
              <span className="rpg-skill-name">{skill.name}</span>
              <small className="rpg-skill-stat">{skill.attribute}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="rpg-core-box">
        <p className="rpg-panel-label">// armour</p>
        <div className="rpg-meta-grid">
          <TextField label="Armour" {...text("armourName")} />
          <TextField label="Armour rating" {...text("armourRating")} />
        </div>
      </div>

      <RowTable<WgWeapon> label="weapons" columns={WEAPON_COLUMNS} rows={data.weapons} blankRow={blankWeapon} onChange={(weapons) => set({ weapons })} />

      <div className="rpg-two-col">
        <TextBlock label="talents" {...text("talents")} />
        <TextBlock label="archetype & species abilities" {...text("abilities")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="psychic powers" {...text("psychicPowers")} placeholder="Psykers only" />
        <TextBlock label="wargear" {...text("wargear")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="memorable injuries" {...text("injuries")} />
        <TextBlock label="objectives" {...text("objectives")} placeholder="Personal and campaign objectives" />
      </div>
    </div>
  );
}
