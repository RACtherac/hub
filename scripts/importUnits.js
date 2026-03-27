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
  "chaos-space-marines":    "chaos-space-marine",
  "death-guard":            "death-guard",
  "thousand-sons":          "thousand-sons",
  "tyranids":               "tyranids",
  "necrons":                "necrons",
  "orks":                   "orks",
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

function extractPoints(unitComposition) {
  if (!Array.isArray(unitComposition)) return 0;
  for (const entry of unitComposition) {
    const trimmed = String(entry).trim();
    if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  }
  return 0;
}

function extractCategory(keywords = []) {
  const kw = keywords.map((k) => k.toUpperCase());
  if (kw.includes("TRANSPORT"))  return "transport";
  if (kw.includes("VEHICLE"))    return "vehicle";
  if (kw.includes("MONSTER"))    return "monster";
  if (kw.includes("BATTLELINE")) return "battleline";
  return "infantry";
}

function unitToTs(unit) {
  const lines = [
    `  {`,
    `    id: ${JSON.stringify(unit.id)},`,
    `    name: ${JSON.stringify(unit.name)},`,
    `    faction: ${JSON.stringify(unit.faction)},`,
    `    category: ${JSON.stringify(unit.category)},`,
    `    points: ${unit.points},`,
    `    wargear: [],`,
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
    `    wargear: [],`,
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
    const points = extractPoints(unitData["Unit Composition"]);
    if (points === 0) continue;

    const keywords = unitData["Keywords"] ?? [];
    const isCharacter = keywords.map(k => k.toUpperCase()).includes("CHARACTER");
    const name = cleanName(unitName);

    if (isCharacter) {
      chars.push({ id: toId(name), name, faction: ourFaction, points });
    } else {
      const category = extractCategory(keywords);
      units.push({ id: toId(name), name, faction: ourFaction, category, points });
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
