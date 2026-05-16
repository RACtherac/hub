import type { Character } from "../../../src/types/warhammer";

export const imperialKnightsCharacters: Character[] = [

  {
    id: "canis-rex",
    name: "Canis Rex",
    faction: "imperial-knights",
    image: "",
    points: 450,
    canAttachTo: [],
    defaultWargear: [
      { id: "chainbreaker-las-impulsor-low-intensity", name: "Chainbreaker las-impulsor – low intensity", image: "", profiles: [{ range: '24"', attacks: "D6+2", skill: "3+", strength: "10", ap: "-3", damage: "3", keywords: ["BLAST"] }] },
      { id: "chainbreaker-las-impulsor-high-intensity", name: "Chainbreaker las-impulsor – high intensity", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "3+", strength: "12", ap: "-4", damage: "D6+1" }] },
      { id: "chainbreaker-multi-laser", name: "Chainbreaker multi-laser", image: "", profiles: [{ range: '36"', attacks: "4", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
      { id: "freedom-s-hand-strike", name: "Freedom's Hand – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "freedom-s-hand-sweep", name: "Freedom's Hand – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "cerastus-knight-acheron",
    name: "Cerastus Knight Acheron",
    faction: "imperial-knights",
    image: "",
    points: 425,
    canAttachTo: [],
    defaultWargear: [
      { id: "acheron-flame-cannon", name: "Acheron flame cannon", image: "", profiles: [{ range: '18"', attacks: "2D6", skill: "N/A", strength: "7", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "reaper-chainfist-strike", name: "Reaper chainfist – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "18", ap: "-3", damage: "D6+3", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "reaper-chainfist-sweep", name: "Reaper chainfist – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "3+", strength: "9", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "cerastus-knight-atrapos",
    name: "Cerastus Knight Atrapos",
    faction: "imperial-knights",
    image: "",
    points: 425,
    canAttachTo: [],
    defaultWargear: [
      { id: "atrapos-lascutter-low-intensity", name: "Atrapos lascutter – low intensity", image: "", profiles: [{ range: '6"', attacks: "3", skill: "3+", strength: "12", ap: "-4", damage: "D6+1", keywords: ["MELTA 4"] }] },
      { id: "atrapos-lascutter-high-intensity", name: "Atrapos lascutter – high intensity", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-4", damage: "D6+4", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "graviton-singularity-cannon-contained", name: "Graviton singularity cannon – contained", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "graviton-singularity-cannon-singularity", name: "Graviton singularity cannon – singularity", image: "", profiles: [{ range: '36"', attacks: "D6", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["BLAST"] }] },
    ],
    wargear: [],
  },

  {
    id: "cerastus-knight-castigator",
    name: "Cerastus Knight Castigator",
    faction: "imperial-knights",
    image: "",
    points: 465,
    canAttachTo: [],
    defaultWargear: [
      { id: "castigator-bolt-cannon", name: "Castigator bolt cannon", image: "", profiles: [{ range: '36"', attacks: "12", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
      { id: "tempest-warblade-strike", name: "Tempest warblade – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-3", damage: "D6+3" }] },
      { id: "tempest-warblade-sweep", name: "Tempest warblade – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "cerastus-knight-lancer",
    name: "Cerastus Knight Lancer",
    faction: "imperial-knights",
    image: "",
    points: 395,
    canAttachTo: [],
    defaultWargear: [
      { id: "cerastus-shock-lance", name: "Cerastus shock lance", image: "", profiles: [{ range: '12"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "2", keywords: ["ASSAULT", "SUSTAINED HITS 2"] }] },
      { id: "cerastus-shock-lance-strike", name: "► Cerastus shock lance – strike lance", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "20", ap: "-3", damage: "8" }] },
      { id: "cerastus-shock-lance-sweep", name: "► Cerastus shock lance – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "10", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Lancer's Duty (Bondsman)",
        description: "While a model is affected by this ability, it is eligible to declare a charge in a turn in which it Advanced.",
      },
      {
        name: "Shock Charge",
        description: "You can target this model with the Tank Shock Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
      },
      {
        name: "Damaged: 1-10 Wounds Remaining",
        description: "While this model has 1-10 wounds remaining, subtract 5 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "knight-castellan",
    name: "Knight Castellan",
    faction: "imperial-knights",
    image: "",
    points: 410,
    canAttachTo: [],
    defaultWargear: [
      { id: "plasma-decimator-standard", name: "Plasma decimator – standard", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST"] }] },
      { id: "plasma-decimator-supercharge", name: "Plasma decimator – supercharge", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "3+", strength: "9", ap: "-4", damage: "3", keywords: ["BLAST", "HAZARDOUS"] }] },
      { id: "shieldbreaker-missile-launcher", name: "Shieldbreaker missile launcher", image: "", profiles: [{ range: '72"', attacks: "1", skill: "3+", strength: "12", ap: "-6", damage: "D6+1", keywords: ["ANTI-TITANIC 4+", "DEVASTATING WOUNDS"] }] },
      { id: "twin-meltagun", name: "Twin meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2", "TWIN-LINKED"] }] },
      { id: "twin-siegebreaker-cannon", name: "Twin siegebreaker cannon", image: "", profiles: [{ range: '36"', attacks: "D6", skill: "3+", strength: "6", ap: "0", damage: "1", keywords: ["BLAST", "TWIN-LINKED"] }] },
      { id: "volcano-lance", name: "Volcano lance", image: "", profiles: [{ range: '72"', attacks: "D3", skill: "3+", strength: "18", ap: "-5", damage: "D6+8", keywords: ["BLAST"] }] },
      { id: "kc-titanic-feet", name: "Titanic feet", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Ion Aegis (Aura)",
        description: "While a friendly ARMIGER model is within 6\" of this model, each time a ranged attack targets that model, it has the Benefit of Cover against that attack.",
      },
      {
        name: "Titan Hunter",
        description: "Each time a ranged attack made by this model is allocated to a MONSTER or VEHICLE model, you can re-roll the Damage roll.",
      },
      {
        name: "Damaged: 1-10 Wounds Remaining",
        description: "While this model has 1-10 wounds remaining, subtract 5 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "knight-crusader",
    name: "Knight Crusader",
    faction: "imperial-knights",
    image: "",
    points: 445,
    canAttachTo: [],
    defaultWargear: [
      { id: "avenger-gatling-cannon", name: "Avenger gatling cannon", image: "", profiles: [{ range: '36"', attacks: "12", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "thermal-cannon", name: "Thermal cannon", image: "", profiles: [{ range: '36"', attacks: "D6+2", skill: "3+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["BLAST", "MELTA 4"] }] },
      { id: "titanic-feet", name: "Titanic feet", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "icarus-autocannons", name: "Icarus autocannons", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "ironstorm-missile-pod", name: "Ironstorm missile pod", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "questoris-heavy-stubber", name: "Questoris heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "rapid-fire-battle-cannon", name: "Rapid-fire battle cannon", image: "", profiles: [{ range: '60"', attacks: "D3+3", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST"] }] },
      { id: "stormspear-rocket-pod", name: "Stormspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
  },

  {
    id: "knight-errant",
    name: "Knight Errant",
    faction: "imperial-knights",
    image: "",
    points: 390,
    canAttachTo: [],
    defaultWargear: [
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "thermal-cannon", name: "Thermal cannon", image: "", profiles: [{ range: '36"', attacks: "D6+2", skill: "3+", strength: "14", ap: "-4", damage: "D6+2", keywords: ["BLAST", "MELTA 4"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "icarus-autocannons", name: "Icarus autocannons", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "ironstorm-missile-pod", name: "Ironstorm missile pod", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "stormspear-rocket-pod", name: "Stormspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
  },

  {
    id: "knight-gallant",
    name: "Knight Gallant",
    faction: "imperial-knights",
    image: "",
    points: 380,
    canAttachTo: [],
    defaultWargear: [
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "thunderstrike-gauntlet-strike", name: "Thunderstrike gauntlet – strike", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "18", ap: "-4", damage: "D6+6" }] },
      { id: "thunderstrike-gauntlet-sweep", name: "Thunderstrike gauntlet – sweep", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "12", ap: "-3", damage: "3" }] },
    ],
    wargear: [
      { id: "icarus-autocannons", name: "Icarus autocannons", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "ironstorm-missile-pod", name: "Ironstorm missile pod", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "stormspear-rocket-pod", name: "Stormspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
  },

  {
    id: "knight-paladin",
    name: "Knight Paladin",
    faction: "imperial-knights",
    image: "",
    points: 405,
    canAttachTo: [],
    defaultWargear: [
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "questoris-heavy-stubber", name: "Questoris heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "rapid-fire-battle-cannon", name: "Rapid-fire battle cannon", image: "", profiles: [{ range: '60"', attacks: "D3+3", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "icarus-autocannons", name: "Icarus autocannons", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "ironstorm-missile-pod", name: "Ironstorm missile pod", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "stormspear-rocket-pod", name: "Stormspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
  },

  {
    id: "knight-preceptor",
    name: "Knight Preceptor",
    faction: "imperial-knights",
    image: "",
    points: 405,
    canAttachTo: [],
    defaultWargear: [
      { id: "las-impulsor-low-intensity", name: "Las-impulsor – low intensity", image: "", profiles: [{ range: '24"', attacks: "D6+2", skill: "3+", strength: "10", ap: "-3", damage: "3", keywords: ["BLAST"] }] },
      { id: "las-impulsor-high-intensity", name: "Las-impulsor – high intensity", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "3+", strength: "12", ap: "-4", damage: "D6+1" }] },
      { id: "preceptor-multi-laser", name: "Preceptor multi-laser", image: "", profiles: [{ range: '36"', attacks: "4", skill: "3+", strength: "6", ap: "0", damage: "1" }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "icarus-autocannons", name: "Icarus autocannons", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "ironstorm-missile-pod", name: "Ironstorm missile pod", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "questoris-heavy-stubber", name: "Questoris heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "stormspear-rocket-pod", name: "Stormspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
  },

  {
    id: "knight-valiant",
    name: "Knight Valiant",
    faction: "imperial-knights",
    image: "",
    points: 480,
    canAttachTo: [],
    defaultWargear: [
      { id: "conflagration-cannon", name: "Conflagration cannon", image: "", profiles: [{ range: '18"', attacks: "3D6", skill: "N/A", strength: "6", ap: "-1", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "twin-meltagun", name: "Twin meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2", "TWIN-LINKED"] }] },
      { id: "shieldbreaker-missile-launcher", name: "Shieldbreaker missile launcher", image: "", profiles: [{ range: '60"', attacks: "1", skill: "3+", strength: "14", ap: "-4", damage: "D6+2" }] },
      { id: "thundercoil-harpoon", name: "Thundercoil harpoon", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "3+", strength: "24", ap: "-6", damage: "12" }] },
      { id: "twin-siegebreaker-cannon", name: "Twin siegebreaker cannon", image: "", profiles: [{ range: '48"', attacks: "2D6", skill: "3+", strength: "8", ap: "-1", damage: "3", keywords: ["BLAST", "TWIN-LINKED"] }] },
      { id: "titanic-feet", name: "Titanic feet", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "knight-warden",
    name: "Knight Warden",
    faction: "imperial-knights",
    image: "",
    points: 450,
    canAttachTo: [],
    defaultWargear: [
      { id: "avenger-gatling-cannon", name: "Avenger gatling cannon", image: "", profiles: [{ range: '36"', attacks: "12", skill: "3+", strength: "6", ap: "-2", damage: "2" }] },
      { id: "heavy-flamer", name: "Heavy flamer", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "meltagun", name: "Meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "icarus-autocannons", name: "Icarus autocannons", image: "", profiles: [{ range: '48"', attacks: "4", skill: "3+", strength: "9", ap: "-1", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "ironstorm-missile-pod", name: "Ironstorm missile pod", image: "", profiles: [{ range: '72"', attacks: "D6+3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
      { id: "stormspear-rocket-pod", name: "Stormspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
  },

  {
    id: "questoris-knight-magaera",
    name: "Questoris Knight Magaera",
    faction: "imperial-knights",
    image: "",
    points: 425,
    canAttachTo: [],
    defaultWargear: [
      { id: "lightning-cannon", name: "Lightning cannon", image: "", profiles: [{ range: '36"', attacks: "2D6", skill: "3+", strength: "7", ap: "-2", damage: "2", keywords: ["BLAST"] }] },
      { id: "phased-plasma-fusil", name: "Phased plasma-fusil", image: "", profiles: [{ range: '18"', attacks: "3", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "twin-rad-cleanser", name: "Twin rad cleanser", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "hekaton-siege-claw-strike", name: "Hekaton siege claw – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "18", ap: "-4", damage: "D6+4", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "hekaton-siege-claw-sweep", name: "Hekaton siege claw – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "questoris-knight-styrix",
    name: "Questoris Knight Styrix",
    faction: "imperial-knights",
    image: "",
    points: 430,
    canAttachTo: [],
    defaultWargear: [
      { id: "graviton-crusher", name: "Graviton crusher", image: "", profiles: [{ range: '36"', attacks: "2D6", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["ANTI-VEHICLE 4+", "BLAST"] }] },
      { id: "volkite-chierovile", name: "Volkite chierovile", image: "", profiles: [{ range: '24"', attacks: "8", skill: "3+", strength: "6", ap: "0", damage: "3" }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-3", damage: "D6+3" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "twin-rad-cleanser", name: "Twin rad cleanser", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "hekaton-siege-claw-strike", name: "Hekaton siege claw – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "18", ap: "-4", damage: "D6+4", keywords: ["ANTI-VEHICLE 4+"] }] },
      { id: "hekaton-siege-claw-sweep", name: "Hekaton siege claw – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "skitarii-marshal",
    name: "Skitarii Marshal",
    faction: "imperial-knights",
    image: "",
    points: 35,
    canAttachTo: [],
    defaultWargear: [
      { id: "mechanicus-pistol", name: "Mechanicus pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "control-stave", name: "Control stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "tech-priest-dominus",
    name: "Tech Priest Dominus",
    faction: "imperial-knights",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "macrostubber", name: "Macrostubber", image: "", profiles: [{ range: '15"', attacks: "5", skill: "2+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "volkite-blaster", name: "Volkite blaster", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "6", ap: "0", damage: "2" }] },
      { id: "omnissian-axe", name: "Omnissian axe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
    ],
    wargear: [
      { id: "eradication-ray-dissipated", name: "Eradication ray – dissipated", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "2+", strength: "8", ap: "-2", damage: "1", keywords: ["BLAST"] }] },
      { id: "eradication-ray-focused", name: "Eradication ray – focused", image: "", profiles: [{ range: '18"', attacks: "3", skill: "2+", strength: "10", ap: "-4", damage: "D6" }] },
      { id: "phosphor-serpenta", name: "Phosphor serpenta", image: "", profiles: [{ range: '18"', attacks: "2", skill: "2+", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "PISTOL"] }] },
    ],
  },

  {
    id: "tech-priest-manipulus",
    name: "Tech Priest Manipulus",
    faction: "imperial-knights",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "magnarail-lance", name: "Magnarail lance", image: "", profiles: [{ range: '36"', attacks: "1", skill: "2+", strength: "10", ap: "-4", damage: "D6+2" }] },
      { id: "omnissian-staff", name: "Omnissian staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "2+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "transonic-cannon", name: "Transonic cannon", image: "", profiles: [{ range: '18"', attacks: "D6+1", skill: "2+", strength: "6", ap: "-1", damage: "1" }] },
    ],
  },

  {
    id: "knight-destrider",
    name: "Knight Destrider",
    faction: "imperial-knights",
    image: "",
    points: 250,
    canAttachTo: [],
    defaultWargear: [
      { id: "kd-questoris-heavy-stubber", name: "Questoris heavy stubber", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "4", ap: "-1", damage: "1", keywords: ["ASSAULT", "RAPID FIRE 3"] }] },
      { id: "kd-titanic-feet", name: "Titanic feet", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "7", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "kd-slot1-chastiser", name: "Chastiser gatling cannon", image: "", profiles: [{ range: '24"', attacks: "12", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["ASSAULT"] }] },
      { id: "kd-slot1-bellatus", name: "Bellatus reaper chainsword", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-3", damage: "D3+3" },
        { profileName: "sweep", range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" },
      ]},
      { id: "kd-slot1-thundershock", name: "Thundershock spear", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D3+3", keywords: ["LANCE"] },
        { profileName: "sweep", range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-3", damage: "2", keywords: ["LANCE"] },
      ]},
      { id: "kd-slot2-frag-bombard", name: "Frag bombard", image: "", profiles: [{ range: '24"', attacks: "D6+3", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["ASSAULT", "BLAST", "RAPID FIRE D6+3"] }] },
      { id: "kd-slot2-bellatus", name: "Bellatus reaper chainsword", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "5", skill: "3+", strength: "12", ap: "-3", damage: "D3+3" },
        { profileName: "sweep", range: "Melee", attacks: "10", skill: "3+", strength: "8", ap: "-2", damage: "2" },
      ]},
      { id: "kd-slot2-thundershock", name: "Thundershock spear", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "4", skill: "3+", strength: "12", ap: "-3", damage: "D3+3", keywords: ["LANCE"] },
        { profileName: "sweep", range: "Melee", attacks: "8", skill: "3+", strength: "6", ap: "-3", damage: "2", keywords: ["LANCE"] },
      ]},
    ],
    wargearGroups: [
      ["kd-slot1-chastiser", "kd-slot1-bellatus", "kd-slot1-thundershock"],
      ["kd-slot2-frag-bombard", "kd-slot2-bellatus", "kd-slot2-thundershock"],
    ],
    defaultSelectedWargear: ["kd-slot1-chastiser", "kd-slot2-frag-bombard"],
    abilities: [
      {
        name: "Ram Jets",
        description: "Each time this unit is selected to make a Normal or Advance move, until the end of the phase, add D3\" to the Move characteristic of this model.",
      },
      {
        name: "Thundercharge",
        description: "If this model is equipped with a thundershock spear and a bellatus reaper chainsword, add 2 to the Attacks characteristic of melee weapons equipped by this model.",
      },
      {
        name: "Saturation Fire",
        description: "Each time this model makes a ranged attack that targets a unit within range of one or more objective markers, that attack has the [IGNORES COVER] ability.",
      },
      {
        name: "Damaged: 1-6 Wounds Remaining",
        description: "While this model has 1-6 wounds remaining, subtract 4 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

];
