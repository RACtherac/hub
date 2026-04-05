import express from "express";
import cors from "cors";

// ── Unit data ─────────────────────────────────────────────────────────────
import { spaceMarinesUnits } from "../scripts/output/space-marines.js";
import { astraMilitarumUnits } from "../scripts/output/astra-militarum.js";
import { adeptusMechanicusUnits } from "../scripts/output/adeptus-mechanicus.js";
import { adeptusCustodesUnits } from "../scripts/output/adeptus-custodes.js";
import { adeptaSororitasUnits } from "../scripts/output/adepta-sororitas.js";
import { greyKnightsUnits } from "../scripts/output/grey-knights.js";
import { imperialAgentsUnits } from "../scripts/output/imperial-agents.js";
import { imperialKnightsUnits } from "../scripts/output/imperial-knights.js";
import { chaosSpaceMarinesUnits } from "../scripts/output/chaos-space-marines.js";
import { deathGuardUnits } from "../scripts/output/death-guard.js";
import { thousandSonsUnits } from "../scripts/output/thousand-sons.js";
import { worldEatersUnits } from "../scripts/output/world-eaters.js";
import { chaosDaemonsUnits } from "../scripts/output/chaos-daemons.js";
import { chaosKnightsUnits } from "../scripts/output/chaos-knights.js";
import { tyranidsUnits } from "../scripts/output/tyranids.js";
import { necronsUnits } from "../scripts/output/necrons.js";
import { orksUnits } from "../scripts/output/orks.js";
import { tAuEmpireUnits } from "../scripts/output/t-au-empire.js";
import { aeldariUnits } from "../scripts/output/aeldari.js";
import { drukhariUnits } from "../scripts/output/drukhari.js";
import { genestealerCultsUnits } from "../scripts/output/genestealer-cults.js";
import { leaguesOfVotannUnits } from "../scripts/output/leagues-of-votann.js";

// ── Character data ────────────────────────────────────────────────────────
import { spaceMarinesCharacters } from "../scripts/output/characters/space-marines.js";
import { astraMilitarumCharacters } from "../scripts/output/characters/astra-militarum.js";
import { adeptusMechanicusCharacters } from "../scripts/output/characters/adeptus-mechanicus.js";
import { adeptusCustodesCharacters } from "../scripts/output/characters/adeptus-custodes.js";
import { adeptaSororitasCharacters } from "../scripts/output/characters/adepta-sororitas.js";
import { greyKnightsCharacters } from "../scripts/output/characters/grey-knights.js";
import { imperialAgentsCharacters } from "../scripts/output/characters/imperial-agents.js";
import { imperialKnightsCharacters } from "../scripts/output/characters/imperial-knights.js";
import { chaosSpaceMarinesCharacters } from "../scripts/output/characters/chaos-space-marines.js";
import { deathGuardCharacters } from "../scripts/output/characters/death-guard.js";
import { thousandSonsCharacters } from "../scripts/output/characters/thousand-sons.js";
import { worldEatersCharacters } from "../scripts/output/characters/world-eaters.js";
import { chaosDaemonsCharacters } from "../scripts/output/characters/chaos-daemons.js";
import { chaosKnightsCharacters } from "../scripts/output/characters/chaos-knights.js";
import { tyranidsCharacters } from "../scripts/output/characters/tyranids.js";
import { necronsCharacters } from "../scripts/output/characters/necrons.js";
import { orksCharacters } from "../scripts/output/characters/orks.js";
import { tAuEmpireCharacters } from "../scripts/output/characters/t-au-empire.js";
import { aeldariCharacters } from "../scripts/output/characters/aeldari.js";
import { drukhariCharacters } from "../scripts/output/characters/drukhari.js";
import { genestealerCultsCharacters } from "../scripts/output/characters/genestealer-cults.js";
import { leaguesOfVotannCharacters } from "../scripts/output/characters/leagues-of-votann.js";

// ── Aggregate ─────────────────────────────────────────────────────────────

const allUnits = [
  ...spaceMarinesUnits,
  ...astraMilitarumUnits,
  ...adeptusMechanicusUnits,
  ...adeptusCustodesUnits,
  ...adeptaSororitasUnits,
  ...greyKnightsUnits,
  ...imperialAgentsUnits,
  ...imperialKnightsUnits,
  ...chaosSpaceMarinesUnits,
  ...deathGuardUnits,
  ...thousandSonsUnits,
  ...worldEatersUnits,
  ...chaosDaemonsUnits,
  ...chaosKnightsUnits,
  ...tyranidsUnits,
  ...necronsUnits,
  ...orksUnits,
  ...tAuEmpireUnits,
  ...aeldariUnits,
  ...drukhariUnits,
  ...genestealerCultsUnits,
  ...leaguesOfVotannUnits,
];

const allCharacters = [
  ...spaceMarinesCharacters,
  ...astraMilitarumCharacters,
  ...adeptusMechanicusCharacters,
  ...adeptusCustodesCharacters,
  ...adeptaSororitasCharacters,
  ...greyKnightsCharacters,
  ...imperialAgentsCharacters,
  ...imperialKnightsCharacters,
  ...chaosSpaceMarinesCharacters,
  ...deathGuardCharacters,
  ...thousandSonsCharacters,
  ...worldEatersCharacters,
  ...chaosDaemonsCharacters,
  ...chaosKnightsCharacters,
  ...tyranidsCharacters,
  ...necronsCharacters,
  ...orksCharacters,
  ...tAuEmpireCharacters,
  ...aeldariCharacters,
  ...drukhariCharacters,
  ...genestealerCultsCharacters,
  ...leaguesOfVotannCharacters,
];

// ── Server ────────────────────────────────────────────────────────────────

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    endpoints: [
      "GET /units",
      "GET /units/:faction",
      "GET /characters",
      "GET /characters/:faction",
    ],
    factions: [...new Set(allUnits.map((u) => u.faction))].sort(),
  });
});

app.get("/units", (_req, res) => {
  res.json(allUnits);
});

app.get("/characters", (_req, res) => {
  res.json(allCharacters);
});

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
  console.log(`  ${allUnits.length} units | ${allCharacters.length} characters across 22 factions`);
});
