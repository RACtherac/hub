/**
 * One-time import script — pulls unit data from Simanos89/warhammer-unit-data
 * and writes generated TypeScript faction files to scripts/output/.
 *
 * Usage: node scripts/importUnits.js
 * Requires Node 18+.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "output");
const CHAR_DIR = join(OUT_DIR, "characters");
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(CHAR_DIR, { recursive: true });

// ── Faction mapping: Simanos89 key → our Faction id ───────────────────────
const FACTION_MAP = {
  "space-marines":          "space-marines",
  "astra-militarum":        "astra-militarum",
  "adeptus-mechanicus":     "adeptus-mechanicus",
  "adeptus-custodes":       "adeptus-custodes",
  "adepta-sororitas":       "adepta-sororitas",
  "grey-knights":           "grey-knights",
  "imperial-agents":        "imperial-agents",
  "imperial-knights":       "imperial-knights",
  "chaos-space-marines":    "chaos-space-marine",
  "death-guard":            "death-guard",
  "thousand-sons":          "thousand-sons",
  "world-eaters":           "world-eaters",
  "chaos-daemons":          "chaos-daemons",
  "chaos-knights":          "chaos-knights",
  "tyranids":               "tyranids",
  "necrons":                "necrons",
  "orks":                   "orks",
  "t-au-empire":            "tau-empire",
  "aeldari":                "aeldari",
  "drukhari":               "drukhari",
  "genestealer-cults":      "genestealer-cults",
  "leagues-of-votann":      "leagues-of-votann",
};

// ── Helpers ───────────────────────────────────────────────────────────────

function toId(name) {
  return name
    .toLowerCase()
    .replace(/[''']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanName(name) {
  // Source data uses hyphens as word separators in names
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractPoints(unitComposition, pointsArray) {
  // Format 1: points as a standalone number in Unit Composition
  if (Array.isArray(unitComposition)) {
    for (const entry of unitComposition) {
      const trimmed = String(entry).trim();
      if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
    }
  }
  // Format 2: separate Points array [{ Models: "3", Cost: "80" }, ...]
  if (Array.isArray(pointsArray) && pointsArray.length > 0) {
    const cost = parseInt(pointsArray[0].Cost ?? "0", 10);
    if (cost > 0) return cost;
  }
  return 0;
}

function extractCategory(keywords = []) {
  const kw = keywords.map((k) => k.toUpperCase());
  if (kw.includes("TRANSPORT"))  return "transport";
  if (kw.includes("VEHICLE"))    return "vehicle";
  if (kw.includes("MONSTER"))    return "monster";
  if (kw.includes("MOUNTED"))    return "mounted";
  if (kw.includes("BATTLELINE")) return "battleline";
  return "infantry";
}

function normalizeWeaponName(name) {
  return name.toLowerCase().replace(/\s*\[.*?\]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function parseDefaultNames(unitComposition = []) {
  for (const line of unitComposition) {
    const match = String(line).match(/equipped with:\s*(.+)/i);
    if (match) {
      return match[1].replace(/\.$/, "").split(";").map(s => normalizeWeaponName(s.trim())).filter(Boolean);
    }
  }
  return [];
}

function parseOptionNames(wargearOptions = []) {
  return wargearOptions
    .map(s => String(s).match(/^\d+\s+(.+)/))
    .filter(Boolean)
    .map(m => normalizeWeaponName(m[1]));
}

function extractWargear(rangedWeapons = [], meleeWeapons = [], unitComposition = [], wargearOptions = []) {
  const defaultNames = parseDefaultNames(unitComposition);
  const optionNames = parseOptionNames(wargearOptions);
  const hasStructuredOptions = optionNames.length > 0;

  const seen = new Set();
  const defaultWargear = [];
  const optionalWargear = [];

  for (const w of [...rangedWeapons, ...meleeWeapons]) {
    const cleanName = w.Name.replace(/\s*\[.*?\]/g, "").trim();
    const norm = normalizeWeaponName(cleanName);
    const id = toId(cleanName);
    if (seen.has(id)) continue;
    seen.add(id);

    const isDefault = defaultNames.some(d => norm.includes(d) || d.includes(norm));
    const isOption = optionNames.some(o => norm.includes(o) || o.includes(norm));

    if (isDefault) {
      defaultWargear.push({ id, name: cleanName });
    } else if (isOption || !hasStructuredOptions) {
      optionalWargear.push({ id, name: cleanName });
    }
  }

  return { defaultWargear, optionalWargear };
}

function wargearArrayStr(items) {
  if (items.length === 0) return "[]";
  return `[\n${items.map(w => `      { id: ${JSON.stringify(w.id)}, name: ${JSON.stringify(w.name)}, image: "" }`).join(",\n")},\n    ]`;
}

function unitToTs(unit) {
  const ledByStr = JSON.stringify(unit.ledBy);
  const lines = [
    `  {`,
    `    id: ${JSON.stringify(unit.id)},`,
    `    name: ${JSON.stringify(unit.name)},`,
    `    faction: ${JSON.stringify(unit.faction)},`,
    `    category: ${JSON.stringify(unit.category)},`,
    `    points: ${unit.points},`,
    `    defaultWargear: ${wargearArrayStr(unit.defaultWargear)},`,
    `    wargear: ${wargearArrayStr(unit.wargear)},`,
    `    ledBy: ${ledByStr},`,
    `  },`,
  ];
  return lines.join("\n");
}

function characterToTs(char) {
  const lines = [
    `  {`,
    `    id: ${JSON.stringify(char.id)},`,
    `    name: ${JSON.stringify(char.name)},`,
    `    faction: ${JSON.stringify(char.faction)},`,
    `    image: "",`,
    `    points: ${char.points},`,
    `    canAttachTo: [],`,
    `    defaultWargear: ${wargearArrayStr(char.defaultWargear)},`,
    `    wargear: ${wargearArrayStr(char.wargear)},`,
    `  },`,
  ];
  return lines.join("\n");
}

// ── Main ──────────────────────────────────────────────────────────────────

const URL =
  "https://raw.githubusercontent.com/Simanos89/warhammer-unit-data/main/data/full_unit_data.json";

console.log("Fetching unit data...");
const res = await fetch(URL);
if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
const raw = await res.json();

let totalUnits = 0;
const skippedFactions = [];

for (const [srcKey, ourFaction] of Object.entries(FACTION_MAP)) {
  // Try the source key as-is; Simanos89 may also use slightly different casing
  const factionData =
    raw[srcKey] ??
    raw[srcKey.replace(/-/g, " ")] ??
    null;

  if (!factionData) {
    skippedFactions.push(srcKey);
    continue;
  }

  const units = [];
  const chars = [];

  for (const [unitName, unitData] of Object.entries(factionData)) {
    const points = extractPoints(unitData["Unit Composition"], unitData["Points"]);
    if (points === 0) continue;

    const keywords = unitData["Keywords"] ?? [];
    const isCharacter = keywords.map(k => k.toUpperCase()).includes("CHARACTER");
    const name = cleanName(unitName);

    if (isCharacter) {
      const { defaultWargear, optionalWargear } = extractWargear(
        unitData["Ranged Weapons"], unitData["Melee Weapons"],
        unitData["Unit Composition"], unitData["Wargear Options"]
      );
      chars.push({ id: toId(name), name, faction: ourFaction, points, defaultWargear, wargear: optionalWargear });
    } else {
      const category = extractCategory(keywords);
      const { defaultWargear, optionalWargear } = extractWargear(
        unitData["Ranged Weapons"], unitData["Melee Weapons"],
        unitData["Unit Composition"], unitData["Wargear Options"]
      );
      const ledBy = (unitData["Led By"] ?? []).map(n => toId(n));
      units.push({ id: toId(name), name, faction: ourFaction, category, points, defaultWargear, wargear: optionalWargear, ledBy });
    }
  }

  units.sort((a, b) => {
    const order = ["battleline", "infantry", "vehicle", "monster", "transport"];
    return order.indexOf(a.category) - order.indexOf(b.category) || a.name.localeCompare(b.name);
  });
  chars.sort((a, b) => a.name.localeCompare(b.name));

  // Write units file
  const exportName = srcKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "Units";
  const unitsContent = [
    `import type { Unit } from "../../../types/warhammer";`,
    ``,
    `export const ${exportName}: Unit[] = [`,
    ``,
    units.map(unitToTs).join("\n\n"),
    ``,
    `];`,
    ``,
  ].join("\n");
  writeFileSync(join(OUT_DIR, `${srcKey}.ts`), unitsContent, "utf8");
  console.log(`  ✓ ${ourFaction}: ${units.length} units → scripts/output/${srcKey}.ts`);
  totalUnits += units.length;

  // Write characters file
  const charExportName = srcKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "Characters";
  const charsContent = [
    `import type { Character } from "../../../types/warhammer";`,
    ``,
    `export const ${charExportName}: Character[] = [`,
    ``,
    chars.map(characterToTs).join("\n\n"),
    ``,
    `];`,
    ``,
  ].join("\n");
  writeFileSync(join(CHAR_DIR, `${srcKey}.ts`), charsContent, "utf8");
  console.log(`  ✓ ${ourFaction}: ${chars.length} characters → scripts/output/characters/${srcKey}.ts`);
}

if (skippedFactions.length > 0) {
  console.log(`\n  ⚠ Factions not found in source data: ${skippedFactions.join(", ")}`);
}

console.log(`\nDone — ${totalUnits} units across ${Object.keys(FACTION_MAP).length - skippedFactions.length} factions.`);
console.log("Units  → scripts/output/");
console.log("Characters → scripts/output/characters/");
