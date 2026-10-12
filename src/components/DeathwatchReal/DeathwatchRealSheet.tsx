import {
  CHAPTERS,
  CHARACTERISTICS,
  LEVEL_DOT,
  LEVEL_LABEL,
  LOCATIONS,
  NEXT_LEVEL,
  SKILLS,
  SPECIALITIES,
  blankWeapon,
  bonusOf,
  skillTarget,
  type DwRealData,
  type DwRealWeapon,
} from "./dwRealData";

type Props = {
  name: string;
  data: DwRealData;
  onNameChange: (name: string) => void;
  onChange: (data: DwRealData) => void;
};

export default function DeathwatchRealSheet({ name, data, onNameChange, onChange }: Props) {
  const set = (patch: Partial<DwRealData>) => onChange({ ...data, ...patch });

  const agilityBonus = bonusOf(data, "Ag");
  const toughnessBonus = bonusOf(data, "T");

  const updateWeapon = (id: string, field: keyof DwRealWeapon, value: string) =>
    set({ weapons: data.weapons.map((weapon) => (weapon.id === id ? { ...weapon, [field]: value } : weapon)) });

  const textField = (label: string, field: keyof DwRealData) => (
    <label className="rpg-field">
      <span>{label}</span>
      <input value={data[field] as string} onChange={(e) => set({ [field]: e.target.value })} />
    </label>
  );

  const counter = (label: string, field: keyof DwRealData) => (
    <label className="rpg-score-box">
      <span>{label}</span>
      <input value={data[field] as string} onChange={(e) => set({ [field]: e.target.value })} />
    </label>
  );

  const textBlock = (label: string, field: keyof DwRealData, placeholder = "One per line") => (
    <div className="rpg-core-box">
      <p className="rpg-panel-label">// {label}</p>
      <textarea
        className="rpg-dw-textarea"
        value={data[field] as string}
        placeholder={placeholder}
        onChange={(e) => set({ [field]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="rpg-dw-real">
      <div className="rpg-meta-grid">
        <label className="rpg-field">
          <span>Character name</span>
          <input value={name} onChange={(e) => onNameChange(e.target.value)} />
        </label>
        {textField("Player name", "player")}
        <label className="rpg-field">
          <span>Chapter</span>
          <input list="rpg-dw-chapters" value={data.chapter} onChange={(e) => set({ chapter: e.target.value })} />
          <datalist id="rpg-dw-chapters">
            {CHAPTERS.map((chapter) => <option key={chapter} value={chapter} />)}
          </datalist>
        </label>
        <label className="rpg-field">
          <span>Speciality</span>
          <select value={data.speciality} onChange={(e) => set({ speciality: e.target.value })}>
            {!SPECIALITIES.includes(data.speciality) && <option value={data.speciality}>{data.speciality || "—"}</option>}
            {SPECIALITIES.map((speciality) => <option key={speciality} value={speciality}>{speciality}</option>)}
          </select>
        </label>
        <label className="rpg-field">
          <span>Rank</span>
          <select value={data.rank} onChange={(e) => set({ rank: e.target.value })}>
            {Array.from({ length: 8 }, (_, i) => String(i + 1)).map((rank) => <option key={rank} value={rank}>{rank}</option>)}
          </select>
        </label>
        {textField("Power armour history", "powerArmourHistory")}
        {textField("Chapter demeanour", "demeanourChapter")}
        {textField("Personal demeanour", "demeanourPersonal")}
        {textField("Description", "description")}
      </div>

      <div className="rpg-core-box">
        <p className="rpg-panel-label">// characteristics</p>
        <div className="rpg-dw-char-grid">
          {CHARACTERISTICS.map(({ key, label }) => (
            <div key={key} className="rpg-score-box" title={`${label} (${key})`}>
              <span>{label}</span>
              <input
                type="number"
                value={data.characteristics[key]}
                onChange={(e) => set({ characteristics: { ...data.characteristics, [key]: Number(e.target.value) || 0 } })}
              />
              <small>Bonus {bonusOf(data, key)}</small>
              <select
                className="rpg-dw-unnatural"
                value={data.unnatural[key]}
                onChange={(e) => set({ unnatural: { ...data.unnatural, [key]: Number(e.target.value) } })}
                aria-label={`${label} unnatural multiplier`}
              >
                <option value={1}>Natural</option>
                <option value={2}>Unnat. ×2</option>
                <option value={3}>Unnat. ×3</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="rpg-two-col">
        <div className="rpg-core-box">
          <p className="rpg-panel-label">// wounds, fate &amp; sanity</p>
          <div className="rpg-stat-grid rpg-vitals-grid">
            {counter("Wounds total", "woundsTotal")}
            {counter("Wounds current", "woundsCurrent")}
            {counter("Fatigue", "fatigue")}
            {counter("Fate total", "fateTotal")}
            {counter("Fate current", "fateCurrent")}
            {counter("Critical dmg", "criticalDamage")}
            {counter("Insanity", "insanity")}
            {counter("Corruption", "corruption")}
          </div>
        </div>

        <div className="rpg-core-box">
          <p className="rpg-panel-label">// movement (AgB {agilityBonus})</p>
          <div className="rpg-stat-grid rpg-vitals-grid">
            {[
              { label: "Half", value: agilityBonus },
              { label: "Full", value: agilityBonus * 2 },
              { label: "Charge", value: agilityBonus * 3 },
              { label: "Run", value: agilityBonus * 6 },
            ].map((move) => (
              <div key={move.label} className="rpg-score-box rpg-score-box--derived">
                <span>{move.label}</span>
                <strong>{move.value}m</strong>
              </div>
            ))}
          </div>
          <p className="rpg-panel-label rpg-dw-subhead">// advancement</p>
          <div className="rpg-stat-grid rpg-vitals-grid">
            {counter("Renown", "renown")}
            {counter("XP total", "xpTotal")}
            {counter("XP spent", "xpSpent")}
            <div className="rpg-score-box rpg-score-box--derived">
              <span>XP to spend</span>
              <strong>{(Number(data.xpTotal) || 0) - (Number(data.xpSpent) || 0)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// armour</p>
          <small className="rpg-skill-hint">Total = armour points + Toughness bonus ({toughnessBonus})</small>
        </div>
        <label className="rpg-field rpg-dw-armour-name">
          <span>Armour</span>
          <input value={data.armourName} onChange={(e) => set({ armourName: e.target.value })} />
        </label>
        <div className="rpg-dw-armour-grid">
          {LOCATIONS.map((location) => (
            <div key={location.key} className="rpg-score-box">
              <span>{location.label}</span>
              <small>{location.roll}</small>
              <input
                type="number"
                value={data.armour[location.key]}
                onChange={(e) => set({ armour: { ...data.armour, [location.key]: Number(e.target.value) || 0 } })}
                aria-label={`${location.label} armour points`}
              />
              <small className="rpg-dw-armour-total">Total {data.armour[location.key] + toughnessBonus}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// skills</p>
          <small className="rpg-skill-hint">Click a dot: trained → +10 → +20 → untrained · advanced skills can't be used untrained</small>
        </div>
        <div className="rpg-skill-grid">
          {SKILLS.map((skill) => {
            const level = data.skills[skill.name] ?? "untrained";
            return (
              <div key={skill.name} className="rpg-skill-row">
                <button
                  type="button"
                  className={`rpg-skill-dot rpg-skill-dot--${LEVEL_DOT[level]}`}
                  onClick={() => set({ skills: { ...data.skills, [skill.name]: NEXT_LEVEL[level] } })}
                  title={LEVEL_LABEL[level]}
                  aria-label={`${skill.name}: ${LEVEL_LABEL[level]}`}
                />
                <span className="rpg-skill-mod">{skillTarget(data, skill)}</span>
                <span className="rpg-skill-name">
                  {skill.name}
                  {skill.advanced && <em className="rpg-dw-advanced"> adv</em>}
                </span>
                <small className="rpg-skill-stat">{skill.stat}</small>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rpg-core-box">
        <div className="rpg-section-header">
          <p className="rpg-panel-label">// weapons</p>
          <button className="rpg-inline-btn" onClick={() => set({ weapons: [...data.weapons, blankWeapon()] })}>+ Add</button>
        </div>
        <div className="rpg-dw-weapons">
          <div className="rpg-dw-weapon-row rpg-dw-weapon-head">
            <span>Name</span><span>Class</span><span>Range</span><span>RoF</span><span>Damage</span>
            <span>Pen</span><span>Clip</span><span>Rld</span><span>Special</span><span />
          </div>
          {data.weapons.map((weapon) => (
            <div key={weapon.id} className="rpg-dw-weapon-row">
              {(["name", "weaponClass", "range", "rof", "damage", "pen", "clip", "reload", "special"] as const).map((field) => (
                <input
                  key={field}
                  value={weapon[field]}
                  onChange={(e) => updateWeapon(weapon.id, field, e.target.value)}
                  aria-label={`${weapon.name} ${field}`}
                />
              ))}
              <button
                className="rpg-remove-btn"
                onClick={() => set({ weapons: data.weapons.filter((item) => item.id !== weapon.id) })}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rpg-two-col">
        {textBlock("talents", "talents")}
        {textBlock("traits", "traits")}
      </div>
      <div className="rpg-two-col">
        {textBlock("chapter abilities", "chapterAbilities", "Chapter special ability and solo/squad mode modifiers")}
        {textBlock("speciality abilities", "specialityAbilities", "Abilities granted by your speciality")}
      </div>
      <div className="rpg-two-col">
        {textBlock("solo mode abilities", "soloModes")}
        {textBlock("squad mode abilities", "squadModes", "Attack and defensive patterns")}
      </div>
      <div className="rpg-two-col">
        <div className="rpg-core-box">
          <p className="rpg-panel-label">// psychic powers</p>
          <label className="rpg-field rpg-dw-armour-name">
            <span>Psy rating</span>
            <input value={data.psyRating} onChange={(e) => set({ psyRating: e.target.value })} placeholder="Librarians only" />
          </label>
          <textarea
            className="rpg-dw-textarea"
            value={data.psychicPowers}
            placeholder="One per line"
            onChange={(e) => set({ psychicPowers: e.target.value })}
          />
        </div>
        {textBlock("gear", "gear")}
      </div>
    </div>
  );
}
