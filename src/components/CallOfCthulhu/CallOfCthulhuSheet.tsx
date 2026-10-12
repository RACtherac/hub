import { Counter, Derived, RowTable, TextBlock, TextField, Toggle } from "../RpgKit/RpgKit";
import { toInt } from "../../utils/makeId";
import {
  CHARACTERISTICS,
  SKILLS,
  STATUSES,
  baseValue,
  blankCustomSkill,
  blankWeapon,
  derivedStats,
  skillValue,
  thresholds,
  type CocCustomSkill,
  type CocData,
  type CocWeapon,
} from "./cocData";

type Props = {
  name: string;
  data: CocData;
  onNameChange: (name: string) => void;
  onChange: (data: CocData) => void;
};

const WEAPON_COLUMNS: { key: Exclude<keyof CocWeapon, "id">; label: string; width: string }[] = [
  { key: "name", label: "Weapon", width: "1.4fr" },
  { key: "skill", label: "Skill", width: "1.2fr" },
  { key: "damage", label: "Damage", width: "0.8fr" },
  { key: "range", label: "Range", width: "0.6fr" },
  { key: "attacks", label: "Attacks", width: "0.6fr" },
  { key: "ammo", label: "Ammo", width: "0.5fr" },
  { key: "malfunction", label: "Malf.", width: "0.5fr" },
];

const CUSTOM_SKILL_COLUMNS: { key: Exclude<keyof CocCustomSkill, "id">; label: string; width: string }[] = [
  { key: "name", label: "Skill (specialisation)", width: "2fr" },
  { key: "value", label: "%", width: "0.6fr" },
];

function Thresholds({ value }: { value: number }) {
  const { half, fifth } = thresholds(value);
  return <small className="rpg-coc-thresholds" title="Hard (½) / Extreme (⅕)">{half} · {fifth}</small>;
}

export default function CallOfCthulhuSheet({ name, data, onNameChange, onChange }: Props) {
  const set = (patch: Partial<CocData>) => onChange({ ...data, ...patch });
  const text = (field: { [K in keyof CocData]: CocData[K] extends string ? K : never }[keyof CocData]) => ({
    value: data[field],
    onChange: (value: string) => set({ [field]: value }),
  });
  const stats = derivedStats(data);

  const setSkill = (skill: (typeof SKILLS)[number], raw: string) => {
    const skills = { ...data.skills };
    if (raw === "" || toInt(raw) === baseValue(data, skill)) {
      delete skills[skill.name];
    } else {
      skills[skill.name] = toInt(raw);
    }
    set({ skills });
  };

  return (
    <div className="rpg-system rpg-system--coc">
      <div className="rpg-meta-grid">
        <TextField label="Investigator" value={name} onChange={onNameChange} />
        <TextField label="Player" {...text("player")} />
        <TextField label="Occupation" {...text("occupation")} />
        <TextField label="Age" {...text("age")} />
        <TextField label="Pronouns" {...text("pronouns")} />
        <TextField label="Residence" {...text("residence")} />
        <TextField label="Birthplace" {...text("birthplace")} />
      </div>

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// characteristics</p>
          <small className="rpg-skill-hint">Small numbers: hard (½) · extreme (⅕)</small>
        </div>
        <div className="rpg-attr-grid" style={{ "--rpg-cols": 9 } as React.CSSProperties}>
          {CHARACTERISTICS.map(({ key, label }) => (
            <div key={key} className="rpg-score-box" title={label}>
              <span>{key}</span>
              <input
                type="number"
                min={0}
                max={99}
                value={data.characteristics[key]}
                onChange={(e) => set({ characteristics: { ...data.characteristics, [key]: toInt(e.target.value) } })}
                aria-label={label}
              />
              <Thresholds value={data.characteristics[key]} />
            </div>
          ))}
          <div className="rpg-score-box" title="Luck">
            <span>Luck</span>
            <input inputMode="numeric" value={data.luck} onChange={(e) => set({ luck: e.target.value })} aria-label="Luck" />
            <Thresholds value={toInt(data.luck)} />
          </div>
        </div>
      </div>

      <div className="rpg-two-col">
        <div className="rpg-core-box">
          <p className="rpg-panel-label">// hit points, magic &amp; sanity</p>
          <div className="rpg-attr-grid" style={{ "--rpg-cols": 3 } as React.CSSProperties}>
            <Counter label="HP" {...text("hpCurrent")} max={stats.maxHp} title="Max HP = (CON + SIZ) ÷ 10" />
            <Counter label="Magic points" {...text("mpCurrent")} max={stats.maxMp} title="Max MP = POW ÷ 5" />
            <Counter label="Sanity" {...text("sanityCurrent")} max={stats.maxSanity} title={`Starting sanity = POW (${stats.startingSanity}) · max = 99 − Cthulhu Mythos`} />
          </div>
          <div className="rpg-toggle-row">
            {STATUSES.map((status) => (
              <Toggle
                key={status.key}
                label={status.label}
                checked={data.status[status.key]}
                onChange={(checked) => set({ status: { ...data.status, [status.key]: checked } })}
              />
            ))}
          </div>
        </div>

        <div className="rpg-core-box">
          <p className="rpg-panel-label">// combat</p>
          <div className="rpg-attr-grid" style={{ "--rpg-cols": 3 } as React.CSSProperties}>
            <Derived label="Move" value={stats.move} title="7 if DEX and STR are both below SIZ, 9 if both above, else 8 · −1 per decade from age 40" />
            <Derived label="Damage bonus" value={stats.damageBonus} title="From STR + SIZ" />
            <Derived label="Build" value={stats.build} title="From STR + SIZ" />
          </div>
          <p className="rpg-panel-label rpg-dw-subhead">// cash &amp; assets</p>
          <div className="rpg-meta-grid">
            <TextField label="Spending level" {...text("spendingLevel")} />
            <TextField label="Cash" {...text("cash")} />
          </div>
        </div>
      </div>

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// investigator skills</p>
          <small className="rpg-skill-hint">Box = improvement check · base chance in brackets · ½ and ⅕ beside each value</small>
        </div>
        <div className="rpg-skill-grid">
          {SKILLS.map((skill) => {
            const value = skillValue(data, skill);
            const changed = data.skills[skill.name] !== undefined;
            return (
              <div key={skill.name} className="rpg-skill-row">
                <input
                  type="checkbox"
                  className="rpg-skill-mark"
                  checked={data.improvements[skill.name] ?? false}
                  onChange={(e) => set({ improvements: { ...data.improvements, [skill.name]: e.target.checked } })}
                  title="Improvement check"
                  aria-label={`${skill.name} improvement check`}
                />
                <span className={`rpg-skill-name ${changed ? "" : "rpg-skill-name--base"}`}>
                  {skill.name} <small className="rpg-skill-stat">({baseValue(data, skill)}%)</small>
                </span>
                <input
                  className="rpg-skill-input"
                  type="number"
                  min={0}
                  max={99}
                  value={value}
                  onChange={(e) => setSkill(skill, e.target.value)}
                  aria-label={`${skill.name} value`}
                />
                <Thresholds value={value} />
              </div>
            );
          })}
        </div>
      </div>

      <RowTable<CocCustomSkill>
        label="more skills & specialisations"
        columns={CUSTOM_SKILL_COLUMNS}
        rows={data.customSkills}
        blankRow={blankCustomSkill}
        onChange={(customSkills) => set({ customSkills })}
      />
      <RowTable<CocWeapon> label="weapons" columns={WEAPON_COLUMNS} rows={data.weapons} blankRow={blankWeapon} onChange={(weapons) => set({ weapons })} />

      <p className="rpg-panel-label">// backstory</p>
      <div className="rpg-two-col">
        <TextBlock label="personal description" {...text("description")} placeholder="" />
        <TextBlock label="ideology / beliefs" {...text("ideology")} placeholder="" />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="significant people" {...text("significantPeople")} />
        <TextBlock label="meaningful locations" {...text("meaningfulLocations")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="treasured possessions" {...text("treasuredPossessions")} />
        <TextBlock label="traits" {...text("traits")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="injuries & scars" {...text("injuries")} />
        <TextBlock label="phobias & manias" {...text("phobias")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="arcane tomes, spells & artifacts" {...text("tomes")} />
        <TextBlock label="encounters with strange entities" {...text("encounters")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="gear & possessions" {...text("gear")} />
        <TextBlock label="assets" {...text("assets")} placeholder="Property, savings, investments" />
      </div>
    </div>
  );
}
