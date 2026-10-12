import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/roleplaying-sheets.css";
import { enterPrintMode, exportSheetPdf } from "../utils/exportSheetPdf";
import DeathwatchRealSheet from "../components/DeathwatchReal/DeathwatchRealSheet";
import { normalizeDwReal } from "../components/DeathwatchReal/dwRealData";
import {
  ARMOURS,
  CHARACTERISTICS,
  CUSTOM_FIELD_OPTIONS,
  DEFAULT_CHARACTERISTICS,
  DW_MOODS,
  DW_SKILLS,
  DW_SKILL_DOT,
  DW_SKILL_LABEL,
  DW_SPECIALISMS,
  NEXT_DW_SKILL_LEVEL,
  NEXT_PROFICIENCY,
  PROFICIENCY_LABEL,
  SHEET_TYPES,
  SHOOT_THEM_ABILITIES,
  SHOOT_THEM_STAT_LABEL,
  SHOOT_THEM_ZONES,
  SKILLS,
  STAT_KEYS,
  STORAGE_KEY,
  TEMPLATE_LIBRARY,
  blankAttack,
  blankCustomField,
  blankShootThemWeapon,
  createBackup,
  createBlankSheet,
  createDefaultShootThem,
  dwSkillTarget,
  fileSlug,
  formatModifier,
  loadStoredSheets,
  mergeImported,
  modifierFor,
  parseImport,
  skillModifier,
  templateFor,
  type Attack,
  type CharacterSheet,
  type CharacteristicKey,
  type CustomFieldType,
  type DwSkillKey,
  type SheetType,
  type ShootThemExtras,
  type SkillKey,
  type StatKey,
  type TemplateId,
  type Weapon,
} from "../utils/rpgSheets";

const DEFAULT_TEMPLATE: Record<SheetType, TemplateId> = { dnd: "dnd-5e", custom: "custom" };

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function RoleplayingSheets() {
  const navigate = useNavigate();
  const [sheets, setSheets] = useState<CharacterSheet[]>(() => loadStoredSheets());
  const [sheetMode, setSheetMode] = useState<SheetType>("dnd");
  const [templateScreen, setTemplateScreen] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(() => sheets[0]?.id ?? "");
  const [importMessage, setImportMessage] = useState("");
  const [exportingPdf, setExportingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sheetPanelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
  }, [sheets]);

  const visibleSheets = useMemo(
    () => sheets.filter((sheet) => sheet.sheetType === sheetMode),
    [sheets, sheetMode],
  );

  useEffect(() => {
    if (templateScreen) return;
    if (visibleSheets.length === 0) {
      const newSheet = createBlankSheet(DEFAULT_TEMPLATE[sheetMode]);
      setSheets((current) => [...current, newSheet]);
      setSelectedId(newSheet.id);
      return;
    }

    if (!visibleSheets.some((sheet) => sheet.id === selectedId)) {
      setSelectedId(visibleSheets[0].id);
    }
  }, [visibleSheets, selectedId, sheetMode, templateScreen]);

  useEffect(() => {
    let exitPrintMode: (() => void) | null = null;
    const handleBeforePrint = () => {
      exitPrintMode = enterPrintMode();
    };
    const handleAfterPrint = () => {
      exitPrintMode?.();
      exitPrintMode = null;
    };
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
      handleAfterPrint();
    };
  }, []);

  const selectedSheet = useMemo(
    () => visibleSheets.find((sheet) => sheet.id === selectedId) ?? visibleSheets[0] ?? null,
    [selectedId, visibleSheets],
  );

  /** Applies `change` to the sheet currently open in the editor. */
  const editSelected = (change: (sheet: CharacterSheet) => CharacterSheet) => {
    if (!selectedSheet) return;
    setSheets((current) => current.map((sheet) => (sheet.id === selectedSheet.id ? change(sheet) : sheet)));
  };

  const updateSelected = (updates: Partial<CharacterSheet>) => editSelected((sheet) => ({ ...sheet, ...updates }));

  const editShootThem = (change: (extras: ShootThemExtras) => Partial<ShootThemExtras>) =>
    editSelected((sheet) => {
      const extras = sheet.shootThem ?? createDefaultShootThem();
      return { ...sheet, shootThem: { ...extras, ...change(extras) } };
    });

  const updateShootThemField = <K extends keyof ShootThemExtras>(field: K, value: ShootThemExtras[K]) =>
    editShootThem(() => ({ [field]: value }));

  const updateShootThemWeapon = (weaponId: string, field: keyof Weapon, value: string) =>
    editShootThem((extras) => ({
      weapons: extras.weapons.map((weapon) => (weapon.id === weaponId ? { ...weapon, [field]: value } : weapon)),
    }));

  const cycleSkill = (skill: SkillKey) =>
    editSelected((sheet) => ({ ...sheet, skills: { ...sheet.skills, [skill]: NEXT_PROFICIENCY[sheet.skills[skill] ?? "none"] } }));

  const cycleDwSkill = (skill: DwSkillKey) =>
    editSelected((sheet) => ({
      ...sheet,
      dwSkills: { ...sheet.dwSkills, [skill]: NEXT_DW_SKILL_LEVEL[sheet.dwSkills?.[skill] ?? "untrained"] },
    }));

  const updateStat = (stat: StatKey, value: number) =>
    editSelected((sheet) => ({ ...sheet, stats: { ...sheet.stats, [stat]: value } }));

  const updateCharacteristic = (key: CharacteristicKey, value: number) =>
    editSelected((sheet) => ({
      ...sheet,
      characteristics: { ...(sheet.characteristics ?? DEFAULT_CHARACTERISTICS), [key]: value },
    }));

  const updateList = (key: "traits" | "inventory", value: string) =>
    updateSelected({ [key]: value.split("\n").map((line) => line.trim()).filter(Boolean) });

  const addAttack = () => editSelected((sheet) => ({ ...sheet, attacks: [...sheet.attacks, blankAttack()] }));

  const updateAttack = (id: string, field: keyof Attack, value: string) =>
    editSelected((sheet) => ({
      ...sheet,
      attacks: sheet.attacks.map((attack) => (attack.id === id ? { ...attack, [field]: value } : attack)),
    }));

  const removeAttack = (id: string) =>
    editSelected((sheet) => ({ ...sheet, attacks: sheet.attacks.filter((attack) => attack.id !== id) }));

  const addCustomField = (type: CustomFieldType) =>
    editSelected((sheet) => ({ ...sheet, customFields: [...sheet.customFields, blankCustomField(type)] }));

  const updateCustomField = (id: string, field: "label" | "value", value: string) =>
    editSelected((sheet) => ({
      ...sheet,
      customFields: sheet.customFields.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));

  const removeCustomField = (id: string) =>
    editSelected((sheet) => ({ ...sheet, customFields: sheet.customFields.filter((item) => item.id !== id) }));

  const createNewSheet = (templateId: TemplateId) => {
    const newSheet = createBlankSheet(templateId);
    setSheets((current) => [newSheet, ...current]);
    setSelectedId(newSheet.id);
    setSheetMode(newSheet.sheetType);
    setTemplateScreen(false);
  };

  const openSheet = (sheet: CharacterSheet) => {
    setSelectedId(sheet.id);
    setSheetMode(sheet.sheetType);
    setTemplateScreen(false);
  };

  const deleteSheet = (sheetId: string) => {
    const remaining = sheets.filter((sheet) => sheet.id !== sheetId);
    if (remaining.length === 0) {
      const fresh = createBlankSheet(DEFAULT_TEMPLATE[sheetMode]);
      setSheets([fresh]);
      setSelectedId(fresh.id);
      return;
    }
    setSheets(remaining);
    if (sheetId === selectedId) {
      setSelectedId((remaining.find((sheet) => sheet.sheetType === sheetMode) ?? remaining[0]).id);
    }
  };

  const handleExportSheet = () => {
    if (!selectedSheet) return;
    downloadJson(createBackup([selectedSheet]), `${fileSlug(selectedSheet.name)}.json`);
  };

  const handleExportAll = () => {
    const date = new Date().toISOString().slice(0, 10);
    downloadJson(createBackup(sheets), `rpg-sheets-backup-${date}.json`);
  };

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const imported = parseImport(await file.text());
      const existingIds = new Set(sheets.map((sheet) => sheet.id));
      const replacedCount = imported.filter((sheet) => existingIds.has(sheet.id)).length;
      setSheets((current) => mergeImported(current, imported));
      const added = imported.length - replacedCount;
      setImportMessage(
        `Imported ${imported.length} sheet${imported.length === 1 ? "" : "s"}` +
          (replacedCount ? ` (${added} new, ${replacedCount} updated)` : "") +
          ".",
      );
      if (imported.length === 1 && !templateScreen) {
        openSheet(imported[0]);
      }
    } catch {
      setImportMessage("That file is not a character sheet export.");
    }
  };

  const handleExportPdf = async () => {
    if (!sheetPanelRef.current || exportingPdf) return;
    setExportingPdf(true);
    try {
      await exportSheetPdf(sheetPanelRef.current, `${selectedSheet?.name || "Character"} - character sheet.pdf`);
    } catch (error) {
      console.error("PDF export failed", error);
      alert("Sorry, the PDF could not be created.");
    } finally {
      setExportingPdf(false);
    }
  };

  const importInput = (
    <input ref={fileInputRef} type="file" accept=".json,application/json" hidden onChange={handleImportJson} />
  );
  const importStatus = importMessage && (
    <p className="rpg-import-status" role="status">
      {importMessage}
      <button type="button" onClick={() => setImportMessage("")} aria-label="Dismiss">×</button>
    </p>
  );

  if (templateScreen) {
    return (
      <div className="rpg-page">
        <div className="rpg-topbar">
          <button className="rpg-topbar-back" onClick={() => navigate("/")}>
            ← OH<span>/</span>Hub
          </button>
          <span className="rpg-topbar-title">Roleplaying Sheets</span>
        </div>

        <header className="rpg-hero">
          <div>
            <p className="rpg-eyebrow">// campaign menu</p>
            <h1 className="rpg-title">Choose a sheet</h1>
          </div>
        </header>

        <main className="rpg-template-wrap">
          <section className="rpg-menu-section">
            <div className="rpg-section-header">
              <p className="rpg-panel-label">// saved sheets</p>
              <div className="rpg-builder-actions">
                <button className="rpg-inline-btn" onClick={handleExportAll}>Export all (JSON)</button>
                <button className="rpg-inline-btn" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
                {importInput}
              </div>
            </div>
            {importStatus}
            <div className="rpg-menu-list">
              {sheets.map((sheet) => (
                <div key={sheet.id} className="rpg-menu-item">
                  <div className="rpg-menu-copy">
                    <strong>{sheet.name || "Unnamed Character"}</strong>
                    <span>
                      {sheet.className || "No role"} · {templateFor(sheet.templateId).label}
                    </span>
                  </div>
                  <div className="rpg-menu-actions">
                    <button className="rpg-inline-btn" onClick={() => openSheet(sheet)}>
                      Open
                    </button>
                    <button className="rpg-remove-btn" onClick={() => deleteSheet(sheet.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rpg-template-section">
            <p className="rpg-panel-label">// new character</p>
            <div className="rpg-template-grid">
              {TEMPLATE_LIBRARY.map((template) => (
                <button
                  key={template.id}
                  className={`rpg-template-card ${template.themeClass}`}
                  onClick={() => createNewSheet(template.id)}
                >
                  <span className="rpg-template-tag">{template.tag}</span>
                  <h2>{template.label}</h2>
                  <p>{template.description}</p>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!selectedSheet) {
    return null;
  }

  const isDndSheet = selectedSheet.sheetType === "dnd";
  const isShootThem = selectedSheet.templateId === "shoot-them";
  const isDwReal = selectedSheet.templateId === "deathwatch-real";
  const shootThem = selectedSheet.shootThem ?? createDefaultShootThem();
  const isDeathwatch = selectedSheet.templateId === "deathwatch";
  const characteristics = selectedSheet.characteristics ?? DEFAULT_CHARACTERISTICS;
  const armour = ARMOURS.find((option) => option.id === selectedSheet.armour) ?? ARMOURS[0];

  const customFieldsPanel = (
    <div className="rpg-core-box">
      <p className="rpg-panel-label">// custom fields</p>
      <div className="rpg-custom-display">
        {selectedSheet.customFields.map((field) => (
          <div key={field.id} className="rpg-custom-item">
            <span className="rpg-custom-label">{field.label || "Field"}</span>
            {field.type === "list" ? (
              <ul>
                {field.value.split("\n").filter(Boolean).map((line, index) => (
                  <li key={`${field.id}-${index}`}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{field.value || "Empty field"}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rpg-page">
      <div className="rpg-topbar">
        <button className="rpg-topbar-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <span className="rpg-topbar-title">Roleplaying Sheets</span>
      </div>

      <header className="rpg-hero">
        <div>
          <p className="rpg-eyebrow">// campaign tracker</p>
          <h1 className="rpg-title">Character Sheets</h1>
        </div>
        <div className="rpg-header-actions">
          <div className="rpg-mode-switch" role="tablist" aria-label="Sheet types">
            {SHEET_TYPES.map((type) => (
              <button
                key={type.id}
                className={`rpg-mode-button ${sheetMode === type.id ? "rpg-mode-button--active" : ""}`}
                onClick={() => setSheetMode(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button className="rpg-export-btn" onClick={() => setTemplateScreen(true)}>Main menu</button>
          <button className="rpg-export-btn" onClick={handleExportSheet}>Export JSON</button>
          <button className="rpg-export-btn" onClick={handleExportPdf} disabled={exportingPdf}>
            {exportingPdf ? "Exporting…" : "Export PDF"}
          </button>
          <button className="rpg-export-btn" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
          {importInput}
          <button className="rpg-new-btn" onClick={() => createNewSheet(DEFAULT_TEMPLATE[sheetMode])}>+ New Sheet</button>
        </div>
      </header>
      {importStatus}

      <main className="rpg-layout">
        <aside className="rpg-sidebar">
          <p className="rpg-panel-label">// {sheetMode === "dnd" ? "party roster" : "custom roster"}</p>
          {visibleSheets.map((sheet) => (
            <div key={sheet.id} className="rpg-sheet-card-wrap">
              <button
                className={`rpg-sheet-card ${sheet.id === selectedSheet.id ? "rpg-sheet-card--active" : ""}`}
                onClick={() => setSelectedId(sheet.id)}
              >
                <span className="rpg-sheet-name">{sheet.name || "Unnamed Character"}</span>
                <span className="rpg-sheet-meta">{sheet.className} • {sheetMode === "dnd" ? `Lvl ${sheet.level}` : `Role: ${sheet.level}`}</span>
              </button>
              <button className="rpg-sheet-delete" onClick={() => deleteSheet(sheet.id)} aria-label={`Delete ${sheet.name || "sheet"}`}>
                Delete
              </button>
            </div>
          ))}
        </aside>

        <section className="rpg-sheet-panel" ref={sheetPanelRef}>
          {isDwReal && (
            <DeathwatchRealSheet
              name={selectedSheet.name}
              data={normalizeDwReal(selectedSheet.dwReal)}
              onNameChange={(name) => updateSelected({ name })}
              onChange={(dwReal) => updateSelected({ dwReal, className: dwReal.speciality, level: dwReal.rank })}
            />
          )}

          {!isShootThem && !isDwReal && (
            <>
              <div className="rpg-meta-grid">
                <label className="rpg-field">
                  <span>{isDndSheet || isDeathwatch ? "Character name" : "Sheet name"}</span>
                  <input value={selectedSheet.name} onChange={(e) => updateSelected({ name: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Class" : isDeathwatch ? "Specialism" : "Role"}</span>
                  {isDeathwatch ? (
                    <select value={selectedSheet.className} onChange={(e) => updateSelected({ className: e.target.value })}>
                      {!DW_SPECIALISMS.includes(selectedSheet.className) && (
                        <option value={selectedSheet.className}>{selectedSheet.className || "—"}</option>
                      )}
                      {DW_SPECIALISMS.map((specialism) => (
                        <option key={specialism} value={specialism}>{specialism}</option>
                      ))}
                    </select>
                  ) : (
                    <input value={selectedSheet.className} onChange={(e) => updateSelected({ className: e.target.value })} />
                  )}
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet || isDeathwatch ? "Level" : "Tier"}</span>
                  <input value={selectedSheet.level} onChange={(e) => updateSelected({ level: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>{isDndSheet ? "Race" : "World"}</span>
                  <input value={selectedSheet.race} onChange={(e) => updateSelected({ race: e.target.value })} />
                </label>
                {!isDeathwatch && (
                  <label className="rpg-field">
                    <span>{isDndSheet ? "Background" : "Motivation"}</span>
                    <input value={selectedSheet.background} onChange={(e) => updateSelected({ background: e.target.value })} />
                  </label>
                )}
                <label className="rpg-field">
                  <span>{isDndSheet ? "Alignment" : "Mood"}</span>
                  {isDeathwatch ? (
                    <select value={selectedSheet.alignment} onChange={(e) => updateSelected({ alignment: e.target.value })}>
                      {!DW_MOODS.includes(selectedSheet.alignment) && (
                        <option value={selectedSheet.alignment}>{selectedSheet.alignment || "—"}</option>
                      )}
                      {DW_MOODS.map((mood) => (
                        <option key={mood} value={mood}>{mood}</option>
                      ))}
                    </select>
                  ) : (
                    <input value={selectedSheet.alignment} onChange={(e) => updateSelected({ alignment: e.target.value })} />
                  )}
                </label>
              </div>

              <div className="rpg-core-grid">
                <div className="rpg-core-box">
                  <p className="rpg-panel-label">// {isDndSheet ? "vitals" : "status"}</p>
                  <div className="rpg-stat-grid rpg-vitals-grid">
                    <label className="rpg-score-box">
                      <span>{isDndSheet ? "HP" : "Energy"}</span>
                      <input value={selectedSheet.hp} onChange={(e) => updateSelected({ hp: e.target.value })} />
                    </label>
                    {isDeathwatch && (
                      <label className="rpg-score-box">
                        <span>Health</span>
                        <input value={selectedSheet.health ?? "20"} onChange={(e) => updateSelected({ health: e.target.value })} />
                      </label>
                    )}
                    {isDeathwatch ? (
                      <>
                        <div className="rpg-score-box rpg-score-box--derived" title={`From ${armour.label} armour`}>
                          <span>Defense</span>
                          <strong>{armour.as}</strong>
                        </div>
                        <div className="rpg-score-box rpg-score-box--derived" title={`From ${armour.label} armour`}>
                          <span>Movement</span>
                          <strong>{armour.m}</strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <label className="rpg-score-box">
                          <span>{isDndSheet ? "AC" : "Defense"}</span>
                          <input value={selectedSheet.ac} onChange={(e) => updateSelected({ ac: e.target.value })} />
                        </label>
                        <label className="rpg-score-box">
                          <span>{isDndSheet ? "Speed" : "Approach"}</span>
                          <input value={selectedSheet.speed} onChange={(e) => updateSelected({ speed: e.target.value })} />
                        </label>
                      </>
                    )}
                    {isDndSheet ? (
                      <div className="rpg-score-box rpg-score-box--derived" title="DEX modifier">
                        <span>Initiative</span>
                        <strong>{formatModifier(modifierFor(selectedSheet.stats.DEX))}</strong>
                      </div>
                    ) : (
                      <label className="rpg-score-box">
                        <span>Focus</span>
                        <input value={selectedSheet.initiative} onChange={(e) => updateSelected({ initiative: e.target.value })} />
                      </label>
                    )}
                    <label className="rpg-score-box">
                      <span>{isDndSheet ? "Proficiency" : "Skill"}</span>
                      <input value={selectedSheet.proficiency} onChange={(e) => updateSelected({ proficiency: e.target.value })} />
                    </label>
                    {isDndSheet && (
                      <div className="rpg-score-box rpg-score-box--derived" title="10 + Perception modifier">
                        <span>Passive Perc.</span>
                        <strong>{10 + skillModifier(selectedSheet, { key: "Perception", stat: "WIS" })}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {isDndSheet && (
                  <div className="rpg-core-box">
                    <p className="rpg-panel-label">// ability scores</p>
                    <div className="rpg-stat-grid">
                      {STAT_KEYS.map((stat) => (
                        <div key={stat} className="rpg-score-box">
                          <span>{stat}</span>
                          <input
                            type="number"
                            value={selectedSheet.stats[stat]}
                            onChange={(e) => updateStat(stat, Number(e.target.value) || 0)}
                          />
                          <small>{modifierFor(selectedSheet.stats[stat]) >= 0 ? "+" : ""}{modifierFor(selectedSheet.stats[stat])}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isDeathwatch && (
                  <div className="rpg-core-box">
                    <p className="rpg-panel-label">// characteristics</p>
                    <div className="rpg-stat-grid rpg-characteristic-grid">
                      {CHARACTERISTICS.map(({ key, label }) => {
                        const value = characteristics[key];
                        return (
                          <div key={key} className="rpg-score-box" title={`${label} (${key})`}>
                            <span>{label}</span>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updateCharacteristic(key, Number(e.target.value) || 0)}
                            />
                            <small>Bonus {Math.floor(value / 10)}</small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {isDndSheet && (
                <div className="rpg-core-box">
                  <div className="rpg-section-header">
                    <p className="rpg-panel-label">// skills</p>
                    <small className="rpg-skill-hint">Click a dot: proficient → expertise → none</small>
                  </div>
                  <div className="rpg-skill-grid">
                    {SKILLS.map((skill) => {
                      const level = selectedSheet.skills?.[skill.key] ?? "none";
                      return (
                        <div key={skill.key} className="rpg-skill-row">
                          <button
                            type="button"
                            className={`rpg-skill-dot rpg-skill-dot--${level}`}
                            onClick={() => cycleSkill(skill.key)}
                            title={PROFICIENCY_LABEL[level]}
                            aria-label={`${skill.key}: ${level}`}
                          />
                          <span className="rpg-skill-mod">{formatModifier(skillModifier(selectedSheet, skill))}</span>
                          <span className="rpg-skill-name">{skill.key}</span>
                          <small className="rpg-skill-stat">{skill.stat}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {isDeathwatch && (
                <div className="rpg-core-box">
                  <div className="rpg-section-header">
                    <p className="rpg-panel-label">// skills</p>
                    <small className="rpg-skill-hint">Click a dot: trained → +10 → +20 → untrained</small>
                  </div>
                  <div className="rpg-skill-grid">
                    {DW_SKILLS.map((skill) => {
                      const level = selectedSheet.dwSkills?.[skill.key] ?? "untrained";
                      return (
                        <div key={skill.key} className="rpg-skill-row">
                          <button
                            type="button"
                            className={`rpg-skill-dot rpg-skill-dot--${DW_SKILL_DOT[level]}`}
                            onClick={() => cycleDwSkill(skill.key)}
                            title={DW_SKILL_LABEL[level]}
                            aria-label={`${skill.key}: ${DW_SKILL_LABEL[level]}`}
                          />
                          <span className="rpg-skill-mod">{dwSkillTarget(characteristics[skill.stat], level)}</span>
                          <span className="rpg-skill-name">{skill.key}</span>
                          <small className="rpg-skill-stat">{skill.stat}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {isDeathwatch && (
            <div className="rpg-core-box">
              <p className="rpg-panel-label">// armour</p>
              <div className="rpg-armour-tags">
                {ARMOURS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`rpg-armour-tag ${armour.id === option.id ? "rpg-armour-tag--active" : ""}`}
                    onClick={() => updateSelected({ armour: option.id })}
                    aria-pressed={armour.id === option.id}
                  >
                    <span className="rpg-armour-name">{option.label}</span>
                    <span className="rpg-armour-stats">Defense {option.as} · Movement {option.m}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isDeathwatch && customFieldsPanel}

          {!isDndSheet && !isShootThem && !isDwReal && (
            <div className="rpg-core-box rpg-builder-box">
              <div className="rpg-section-header">
                <p className="rpg-panel-label">// sheet builder</p>
                <div className="rpg-builder-actions">
                  {CUSTOM_FIELD_OPTIONS.map((option) => (
                    <button key={option.type} className="rpg-inline-btn" onClick={() => addCustomField(option.type)}>
                      + {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rpg-block-list">
                {selectedSheet.customFields.map((field) => (
                  <div key={field.id} className="rpg-block-row">
                    <input
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, "label", e.target.value)}
                      placeholder="Field label"
                    />
                    {field.type === "textarea" || field.type === "list" ? (
                      <textarea
                        value={field.value}
                        onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                        placeholder={field.type === "list" ? "line 1\nline 2" : "Long text..."}
                      />
                    ) : (
                      <input
                        type={field.type === "number" ? "number" : "text"}
                        value={field.value}
                        onChange={(e) => updateCustomField(field.id, "value", e.target.value)}
                        placeholder={field.type === "number" ? "0" : "Value"}
                      />
                    )}
                    <button className="rpg-remove-btn" onClick={() => removeCustomField(field.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isShootThem && (
            <div className="rpg-core-box rpg-shoot-sheet">
              <div className="rpg-section-header">
                <p className="rpg-panel-label">// Shoot Them</p>
              </div>

              <div className="rpg-shoot-grid">
                <label className="rpg-field">
                  <span>Name</span>
                  <input value={selectedSheet.name} onChange={(e) => updateSelected({ name: e.target.value })} />
                </label>
                <label className="rpg-field">
                  <span>Stereotype</span>
                  <input value={shootThem.stereotype} onChange={(e) => updateShootThemField("stereotype", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Experience + bonus</span>
                  <input value={shootThem.experience} onChange={(e) => updateShootThemField("experience", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Moral</span>
                  <input value={shootThem.morale} onChange={(e) => updateShootThemField("morale", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Stamina</span>
                  <input value={shootThem.stamina} onChange={(e) => updateShootThemField("stamina", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Stability</span>
                  <input value={shootThem.stability} onChange={(e) => updateShootThemField("stability", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>XP</span>
                  <input value={shootThem.xp} onChange={(e) => updateShootThemField("xp", e.target.value)} />
                </label>
                <label className="rpg-field rpg-textarea-field">
                  <span>Resources</span>
                  <textarea value={shootThem.resources} onChange={(e) => updateShootThemField("resources", e.target.value)} />
                </label>
                <label className="rpg-field rpg-textarea-field">
                  <span>Permanent damage</span>
                  <textarea value={shootThem.permanentDamage} onChange={(e) => updateShootThemField("permanentDamage", e.target.value)} />
                </label>
                <label className="rpg-field">
                  <span>Armour</span>
                  <input value={shootThem.armor} onChange={(e) => updateShootThemField("armor", e.target.value)} />
                </label>
              </div>

              <div className="rpg-shoot-sections">
                <div>
                  <p className="rpg-panel-label">// Body zones</p>
                  <div className="rpg-zone-grid">
                    {SHOOT_THEM_ZONES.map((zone) => (
                      <label key={zone} className="rpg-field rpg-zone-field">
                        <span>{zone.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                        <input
                          value={shootThem.bodyZones[zone]}
                          onChange={(e) => editShootThem((extras) => ({ bodyZones: { ...extras.bodyZones, [zone]: e.target.value } }))}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="rpg-panel-label">// Abilities</p>
                  <div className="rpg-ability-grid">
                    {SHOOT_THEM_ABILITIES.map((ability) => (
                      <label key={ability} className="rpg-field">
                        <span>{ability}</span>
                        <input
                          type="number"
                          min={-6}
                          max={6}
                          value={shootThem.abilities[ability]}
                          onChange={(e) => editShootThem((extras) => ({ abilities: { ...extras.abilities, [ability]: e.target.value } }))}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="rpg-panel-label">// Main stats</p>
                  <div className="rpg-shoot-stat-grid">
                    {(Object.keys(SHOOT_THEM_STAT_LABEL) as (keyof ShootThemExtras["mainStats"])[]).map((stat) => (
                      <label key={stat} className="rpg-field">
                        <span>{SHOOT_THEM_STAT_LABEL[stat]}</span>
                        <input
                          value={shootThem.mainStats[stat]}
                          onChange={(e) => editShootThem((extras) => ({ mainStats: { ...extras.mainStats, [stat]: e.target.value } }))}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="rpg-section-header">
                    <p className="rpg-panel-label">// Weapons</p>
                    <button className="rpg-inline-btn" onClick={() => editShootThem((extras) => ({ weapons: [...extras.weapons, blankShootThemWeapon()] }))}>+ Add</button>
                  </div>

                  <div className="rpg-weapon-list">
                    {shootThem.weapons.map((weapon) => (
                      <div key={weapon.id} className="rpg-weapon-row">
                        <input value={weapon.name} onChange={(e) => updateShootThemWeapon(weapon.id, "name", e.target.value)} placeholder="Weapon" />
                        <input className="rpg-number-input" type="number" value={weapon.damage} onChange={(e) => updateShootThemWeapon(weapon.id, "damage", e.target.value)} placeholder="Damage" />
                        <input className="rpg-number-input" type="number" value={weapon.ammo} onChange={(e) => updateShootThemWeapon(weapon.id, "ammo", e.target.value)} placeholder="Ammo" />
                        <input className="rpg-number-input" type="number" value={weapon.magazine} onChange={(e) => updateShootThemWeapon(weapon.id, "magazine", e.target.value)} placeholder="Mag" />
                        <input value={weapon.effect} onChange={(e) => updateShootThemWeapon(weapon.id, "effect", e.target.value)} placeholder="Effect" />
                        <input value={weapon.sound} onChange={(e) => updateShootThemWeapon(weapon.id, "sound", e.target.value)} placeholder="Sound" />
                        <input value={weapon.range} onChange={(e) => updateShootThemWeapon(weapon.id, "range", e.target.value)} placeholder="Range" />
                        <button className="rpg-remove-btn" onClick={() => editShootThem((extras) => ({ weapons: extras.weapons.filter((item) => item.id !== weapon.id) }))}>Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isDndSheet && (
            <div className="rpg-two-col">
              <div className="rpg-core-box">
                <p className="rpg-panel-label">// traits</p>
                <textarea
                  value={selectedSheet.traits.join("\n")}
                  onChange={(e) => updateList("traits", e.target.value)}
                />
              </div>

              <div className="rpg-core-box">
                <p className="rpg-panel-label">// inventory</p>
                <textarea
                  value={selectedSheet.inventory.join("\n")}
                  onChange={(e) => updateList("inventory", e.target.value)}
                />
              </div>
            </div>
          )}

          {isDndSheet && (
            <div className="rpg-core-box">
              <div className="rpg-section-header">
                <p className="rpg-panel-label">// attacks</p>
                <button className="rpg-inline-btn" onClick={addAttack}>+ Add</button>
              </div>

              <div className="rpg-attack-list">
                {selectedSheet.attacks.map((attack) => (
                  <div key={attack.id} className="rpg-attack-row">
                    <input
                      value={attack.name}
                      onChange={(e) => updateAttack(attack.id, "name", e.target.value)}
                      placeholder="Attack name"
                    />
                    <input
                      value={attack.bonus}
                      onChange={(e) => updateAttack(attack.id, "bonus", e.target.value)}
                      placeholder="+0"
                    />
                    <input
                      value={attack.damage}
                      onChange={(e) => updateAttack(attack.id, "damage", e.target.value)}
                      placeholder="1d8"
                    />
                    <input
                      value={attack.notes}
                      onChange={(e) => updateAttack(attack.id, "notes", e.target.value)}
                      placeholder="Notes"
                    />
                    <button className="rpg-remove-btn" onClick={() => removeAttack(attack.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isDndSheet && !isDeathwatch && !isDwReal && customFieldsPanel}

          <div className="rpg-core-box">
            <p className="rpg-panel-label">// adventure notes</p>
            <textarea
              className="rpg-notes"
              value={selectedSheet.notes}
              onChange={(e) => updateSelected({ notes: e.target.value })}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
