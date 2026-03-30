import express from "express";
import cors from "cors";

// ── Unit data ─────────────────────────────────────────────────────────────
import { spaceMarinesUnits } from "../scripts/output/space-marines.js";
import { astraMilitarumUnits } from "../scripts/output/astra-militarum.js";
import { adeptusMechanicusUnits } from "../scripts/output/adeptus-mechanicus.js";
import { chaosSpaceMarinesUnits } from "../scripts/output/chaos-space-marines.js";
import { deathGuardUnits } from "../scripts/output/death-guard.js";
import { thousandSonsUnits } from "../scripts/output/thousand-sons.js";
import { tyranidsUnits } from "../scripts/output/tyranids.js";
import { necronsUnits } from "../scripts/output/necrons.js";
import { orksUnits } from "../scripts/output/orks.js";

// ── Character data ────────────────────────────────────────────────────────
import { spaceMarinesCharacters } from "../scripts/output/characters/space-marines.js";
import { astraMilitarumCharacters } from "../scripts/output/characters/astra-militarum.js";
import { adeptusMechanicusCharacters } from "../scripts/output/characters/adeptus-mechanicus.js";
import { chaosSpaceMarinesCharacters } from "../scripts/output/characters/chaos-space-marines.js";
import { deathGuardCharacters } from "../scripts/output/characters/death-guard.js";
import { thousandSonsCharacters } from "../scripts/output/characters/thousand-sons.js";
import { tyranidsCharacters } from "../scripts/output/characters/tyranids.js";
import { necronsCharacters } from "../scripts/output/characters/necrons.js";
import { orksCharacters } from "../scripts/output/characters/orks.js";

// ── Aggregate ─────────────────────────────────────────────────────────────

const allUnits = [
  ...spaceMarinesUnits,
  ...astraMilitarumUnits,
  ...adeptusMechanicusUnits,
  ...chaosSpaceMarinesUnits,
  ...deathGuardUnits,
  ...thousandSonsUnits,
  ...tyranidsUnits,
  ...necronsUnits,
  ...orksUnits,
];

const allCharacters = [
  ...spaceMarinesCharacters,
  ...astraMilitarumCharacters,
  ...adeptusMechanicusCharacters,
  ...chaosSpaceMarinesCharacters,
  ...deathGuardCharacters,
  ...thousandSonsCharacters,
  ...tyranidsCharacters,
  ...necronsCharacters,
  ...orksCharacters,
];

// ── Server ────────────────────────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());

app.get("/units", (_req, res) => {
  res.json(allUnits);
});

app.get("/characters", (_req, res) => {
  res.json(allCharacters);
});

// Optional: filter by faction
app.get("/units/:faction", (req, res) => {
  const units = allUnits.filter((u) => u.faction === req.params.faction);
  if (units.length === 0) {
    res.status(404).json({ error: "Faction not found" });
    return;
  }
  res.json(units);
});

app.get("/characters/:faction", (req, res) => {
  const chars = allCharacters.filter((c) => c.faction === req.params.faction);
  if (chars.length === 0) {
    res.status(404).json({ error: "Faction not found" });
    return;
  }
  res.json(chars);
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Warhammer API running on http://localhost:${PORT}`);
  console.log(`  ${allUnits.length} units | ${allCharacters.length} characters across 9 factions`);
});
