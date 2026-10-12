import { Counter, Derived, RowTable, SelectField, TextBlock, TextField, TickTrack, Toggle } from "../RpgKit/RpgKit";
import { toInt } from "../../utils/makeId";
import {
  AGES,
  ATTRIBUTES,
  KIN,
  SKILLS,
  SKILL_GROUPS,
  baseChance,
  blankWeapon,
  derivedStats,
  skillLevel,
  type DbData,
  type DbSkillState,
  type DbWeapon,
} from "./dragonbaneData";

type Props = {
  name: string;
  data: DbData;
  onNameChange: (name: string) => void;
  onChange: (data: DbData) => void;
};

const WEAPON_COLUMNS: { key: Exclude<keyof DbWeapon, "id">; label: string; width: string }[] = [
  { key: "name", label: "Weapon / shield", width: "1.6fr" },
  { key: "grip", label: "Grip", width: "0.5fr" },
  { key: "range", label: "Range", width: "0.6fr" },
  { key: "damage", label: "Damage", width: "0.7fr" },
  { key: "durability", label: "Durab.", width: "0.6fr" },
  { key: "features", label: "Features", width: "1.6fr" },
];

export default function DragonbaneSheet({ name, data, onNameChange, onChange }: Props) {
  const set = (patch: Partial<DbData>) => onChange({ ...data, ...patch });
  const text = (field: { [K in keyof DbData]: DbData[K] extends string ? K : never }[keyof DbData]) => ({
    value: data[field],
    onChange: (value: string) => set({ [field]: value }),
  });
  const setSkill = (skill: string, patch: Partial<DbSkillState>) => {
    const current = data.skills[skill] ?? { trained: false, mark: false };
    set({ skills: { ...data.skills, [skill]: { ...current, ...patch } } });
  };
  const stats = derivedStats(data);

  return (
    <div className="rpg-system rpg-system--db">
      <div className="rpg-meta-grid">
        <TextField label="Name" value={name} onChange={onNameChange} />
        <TextField label="Player" {...text("player")} />
        <SelectField label="Kin" options={KIN.map((kin) => kin.name)} {...text("kin")} />
        <SelectField label="Age" options={AGES} {...text("age")} />
        <TextField label="Profession" {...text("profession")} />
        <TextField label="Weakness" {...text("weakness")} />
      </div>
      <TextField label="Appearance" {...text("appearance")} />

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// attributes &amp; conditions</p>
          <small className="rpg-skill-hint">A condition gives a bane on rolls with that attribute</small>
        </div>
        <div className="rpg-attr-grid" style={{ "--rpg-cols": 6 } as React.CSSProperties}>
          {ATTRIBUTES.map(({ key, label, condition }) => (
            <div key={key} className="rpg-score-box">
              <span>{label}</span>
              <input
                type="number"
                min={3}
                max={18}
                value={data.attributes[key]}
                onChange={(e) => set({ attributes: { ...data.attributes, [key]: toInt(e.target.value) } })}
                aria-label={label}
              />
              <small>Base {baseChance(data.attributes[key])}</small>
              <Toggle
                label={condition}
                checked={data.conditions[key]}
                onChange={(checked) => set({ conditions: { ...data.conditions, [key]: checked } })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rpg-two-col">
        <div className="rpg-core-box">
          <p className="rpg-panel-label">// hit points &amp; willpower</p>
          <div className="rpg-attr-grid" style={{ "--rpg-cols": 3 } as React.CSSProperties}>
            <Counter label="HP" {...text("hpCurrent")} max={stats.maxHp} title="Max HP = CON" />
            <Counter label="WP" {...text("wpCurrent")} max={stats.maxWp} title="Max WP = WIL" />
            <Derived label="Movement" value={stats.movement} title="Kin base movement, adjusted by AGL" />
            <Derived label="Dmg bonus STR" value={stats.strDamage} title="STR 13–16: +D4 · 17–18: +D6" />
            <Derived label="Dmg bonus AGL" value={stats.aglDamage} title="AGL 13–16: +D4 · 17–18: +D6" />
            <Derived label="Carry limit" value={stats.carryLimit} title="STR ÷ 2, rounded up" />
          </div>
          <p className="rpg-panel-label rpg-dw-subhead">// death rolls (at 0 HP)</p>
          <TickTrack label="Successes" count={3} value={data.deathSuccesses} onChange={(deathSuccesses) => set({ deathSuccesses })} />
          <TickTrack label="Failures" count={3} value={data.deathFailures} onChange={(deathFailures) => set({ deathFailures })} />
        </div>

        <div className="rpg-core-box">
          <p className="rpg-panel-label">// armour</p>
          <div className="rpg-meta-grid">
            <TextField label="Armour" {...text("armourName")} />
            <TextField label="Armour rating" {...text("armourRating")} />
            <TextField label="Helmet" {...text("helmetName")} />
            <TextField label="Helmet rating" {...text("helmetRating")} />
          </div>
          <p className="rpg-panel-label rpg-dw-subhead">// money</p>
          <div className="rpg-attr-grid" style={{ "--rpg-cols": 3 } as React.CSSProperties}>
            <Counter label="Gold" {...text("gold")} />
            <Counter label="Silver" {...text("silver")} />
            <Counter label="Copper" {...text("copper")} />
          </div>
        </div>
      </div>

      {SKILL_GROUPS.map((group) => (
        <div key={group.id} className="rpg-core-box">
          <div className="rpg-section-header">
            <p className="rpg-panel-label">// {group.label}</p>
            {group.id === "general" && (
              <small className="rpg-skill-hint">Dot = trained (base × 2, resets the level) · type a level after advancing · box = advancement mark</small>
            )}
          </div>
          <div className="rpg-skill-grid">
            {SKILLS.filter((skill) => skill.group === group.id).map((skill) => {
              const state = data.skills[skill.name];
              const level = skillLevel(data, skill);
              return (
                <div key={skill.name} className="rpg-skill-row">
                  <button
                    type="button"
                    className={`rpg-skill-dot rpg-skill-dot--${state?.trained ? "proficient" : "none"}`}
                    onClick={() => setSkill(skill.name, { trained: !state?.trained, level: undefined })}
                    title={state?.trained ? "Trained" : "Untrained"}
                    aria-label={`${skill.name}: ${state?.trained ? "trained" : "untrained"}`}
                  />
                  <input
                    className="rpg-skill-input"
                    type="number"
                    min={0}
                    max={18}
                    value={level}
                    onChange={(e) => setSkill(skill.name, { level: e.target.value === "" ? undefined : toInt(e.target.value) })}
                    aria-label={`${skill.name} level`}
                  />
                  <span className="rpg-skill-name">{skill.name}</span>
                  <small className="rpg-skill-stat">{skill.attribute}</small>
                  <input
                    type="checkbox"
                    className="rpg-skill-mark"
                    checked={state?.mark ?? false}
                    onChange={(e) => setSkill(skill.name, { mark: e.target.checked })}
                    title="Advancement mark"
                    aria-label={`${skill.name} advancement mark`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <RowTable<DbWeapon> label="weapons & shields" columns={WEAPON_COLUMNS} rows={data.weapons} blankRow={blankWeapon} onChange={(weapons) => set({ weapons })} />

      <div className="rpg-two-col">
        <TextBlock label="abilities & spells" {...text("abilities")} />
        <TextBlock label={`inventory (limit ${stats.carryLimit})`} {...text("inventory")} />
      </div>
      <div className="rpg-two-col">
        <TextBlock label="memento" {...text("memento")} placeholder="Something that reminds you of home" />
        <TextBlock label="tiny items" {...text("tinyItems")} placeholder="Items that don't count towards the limit" />
      </div>
    </div>
  );
}
