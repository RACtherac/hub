import type { Character } from "../../../src/types/warhammer";

export const chaosKnightsCharacters: Character[] = [

  {
    id: "chaos-cerastus-knight-acheron",
    name: "Chaos Cerastus Knight Acheron",
    faction: "chaos-knights",
    image: "",
    points: 420,
    canAttachTo: [],
    defaultWargear: [
      { id: "acheron-flame-cannon", name: "Acheron flame cannon", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "N/A", strength: "6", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "twin-heavy-bolter", name: "Twin heavy bolter", image: "", profiles: [{ range: '36"', attacks: "6", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["HEAVY", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "reaper-chainfist-strike", name: "Reaper chainfist – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "18", ap: "-4", damage: "D6+4" }] },
      { id: "reaper-chainfist-sweep", name: "Reaper chainfist – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "9", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-cerastus-knight-atrapos",
    name: "Chaos Cerastus Knight Atrapos",
    faction: "chaos-knights",
    image: "",
    points: 420,
    canAttachTo: [],
    defaultWargear: [
      { id: "atrapos-lascutter-low-intensity", name: "Atrapos lascutter – low intensity", image: "", profiles: [{ range: '6"', attacks: "2", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["PISTOL"] }] },
      { id: "atrapos-lascutter-high-intensity", name: "Atrapos lascutter – high intensity", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-5", damage: "D6+2" }] },
      { id: "graviton-singularity-cannon-contained", name: "Graviton singularity cannon – contained", image: "", profiles: [{ range: '36"', attacks: "D3+3", skill: "3+", strength: "12", ap: "-3", damage: "D6", keywords: ["BLAST", "HEAVY"] }] },
      { id: "graviton-singularity-cannon-singularity", name: "Graviton singularity cannon – singularity", image: "", profiles: [{ range: '36"', attacks: "D6+6", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["BLAST", "HEAVY", "INDIRECT FIRE"] }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-cerastus-knight-castigator",
    name: "Chaos Cerastus Knight Castigator",
    faction: "chaos-knights",
    image: "",
    points: 445,
    canAttachTo: [],
    defaultWargear: [
      { id: "castigator-bolt-cannon", name: "Castigator bolt cannon", image: "", profiles: [{ range: '36"', attacks: "16", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["HEAVY"] }] },
      { id: "tempest-warblade-strike", name: "Tempest warblade – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "14", ap: "-4", damage: "D6+2" }] },
      { id: "tempest-warblade-sweep", name: "Tempest warblade – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "2+", strength: "7", ap: "-3", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "chaos-cerastus-knight-lancer",
    name: "Chaos Cerastus Knight Lancer",
    faction: "chaos-knights",
    image: "",
    points: 385,
    canAttachTo: [],
    defaultWargear: [
      { id: "cerastus-shock-lance", name: "Cerastus shock lance", image: "", profiles: [{ range: '12"', attacks: "6", skill: "3+", strength: "6", ap: "0", damage: "2", keywords: ["ASSAULT", "SUSTAINED HITS 2"] }] },
      { id: "cerastus-shock-lance-strike", name: "► Cerastus shock lance – strike lance", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "2+", strength: "20", ap: "-3", damage: "8" }] },
      { id: "cerastus-shock-lance-sweep", name: "► Cerastus shock lance – sweep", image: "", profiles: [{ range: "Melee", attacks: "10", skill: "2+", strength: "10", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
    abilities: [
      {
        name: "Shock Charge",
        description: "You can target this model with the Tank Shock Stratagem for 0CP, and can do so even if you have already targeted a different unit with that Stratagem this phase.",
      },
      {
        name: "Dark Fervour (Aura)",
        description: "While a friendly WAR DOG model is within 6\" of this model, ranged weapons equipped by that War Dog model have the [ASSAULT] ability.",
      },
      {
        name: "Damaged: 1-10 Wounds Remaining",
        description: "While this model has 1-10 wounds remaining, subtract 5 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "chaos-questoris-knight-magaera",
    name: "Chaos Questoris Knight Magaera",
    faction: "chaos-knights",
    image: "",
    points: 435,
    canAttachTo: [],
    defaultWargear: [
      { id: "lightning-cannon", name: "Lightning cannon", image: "", profiles: [{ range: '36"', attacks: "D6+6", skill: "3+", strength: "8", ap: "-3", damage: "3", keywords: ["HEAVY"] }] },
      { id: "phased-plasma-fusil", name: "Phased plasma-fusil", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST", "HAZARDOUS", "HEAVY"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [
      { id: "twin-rad-cleanser", name: "Twin rad cleanser", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "N/A", strength: "5", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "hekaton-siege-claw-strike", name: "Hekaton siege claw – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "hekaton-siege-claw-sweep", name: "Hekaton siege claw – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
  },

  {
    id: "chaos-questoris-knight-styrix",
    name: "Chaos Questoris Knight Styrix",
    faction: "chaos-knights",
    image: "",
    points: 430,
    canAttachTo: [],
    defaultWargear: [
      { id: "graviton-crusher", name: "Graviton crusher", image: "", profiles: [{ range: '24"', attacks: "D3+3", skill: "3+", strength: "12", ap: "-3", damage: "D6", keywords: ["BLAST", "HEAVY"] }] },
      { id: "volkite-chierovile", name: "Volkite chierovile", image: "", profiles: [{ range: '18"', attacks: "D6+3", skill: "3+", strength: "6", ap: "0", damage: "2", keywords: ["DEVASTATING WOUNDS", "HEAVY"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [
      { id: "twin-rad-cleanser", name: "Twin rad cleanser", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "N/A", strength: "5", ap: "0", damage: "1", keywords: ["IGNORES COVER", "TORRENT", "TWIN-LINKED"] }] },
      { id: "hekaton-siege-claw-strike", name: "Hekaton siege claw – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "hekaton-siege-claw-sweep", name: "Hekaton siege claw – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
  },

  {
    id: "cultist-firebrand",
    name: "Cultist Firebrand",
    faction: "chaos-knights",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "balefire-pike", name: "Balefire pike", image: "", profiles: [{ range: '18"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "knight-abominant",
    name: "Knight Abominant",
    faction: "chaos-knights",
    image: "",
    points: 365,
    canAttachTo: [],
    defaultWargear: [
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "6", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "volkite-combustor", name: "Volkite combustor", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "N/A", strength: "5", ap: "-1", damage: "2", keywords: ["DEVASTATING WOUNDS", "IGNORES COVER", "TORRENT"] }] },
      { id: "balemace", name: "Balemace", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "12", ap: "-2", damage: "D6" }] },
      { id: "electroscourge", name: "Electroscourge", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "knight-desecrator",
    name: "Knight Desecrator",
    faction: "chaos-knights",
    image: "",
    points: 400,
    canAttachTo: [],
    defaultWargear: [
      { id: "desecrator-laser-destructor", name: "Desecrator laser destructor", image: "", profiles: [{ range: '48"', attacks: "D6", skill: "3+", strength: "16", ap: "-4", damage: "D6+2", keywords: ["HEAVY"] }] },
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "6", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [
      { id: "warpstrike-claw-strike", name: "Warpstrike claw – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "warpstrike-claw-sweep", name: "Warpstrike claw – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
  },

  {
    id: "knight-despoiler",
    name: "Knight Despoiler",
    faction: "chaos-knights",
    image: "",
    points: 390,
    canAttachTo: [],
    defaultWargear: [
      { id: "kd-titanic-feet", name: "Titanic feet", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "kd-meltagun", name: "Daemonbreath meltagun", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 2"] }] },
      { id: "kd-diabolus-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] }] },
      { id: "kd-arm1-chainsword", name: "Reaper chainsword", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "4", skill: "3+", strength: "14", ap: "-4", damage: "6" },
        { profileName: "sweep", range: "Melee", attacks: "12", skill: "3+", strength: "9", ap: "-3", damage: "2" },
      ]},
      { id: "kd-arm1-thermal", name: "Daemonbreath thermal cannon", image: "", profiles: [{ range: '24"', attacks: "2D3", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["BLAST", "MELTA 6"] }] },
      { id: "kd-arm1-gatling-dark", name: "Despoiler gatling cannon and Heavy darkflamer", image: "", profiles: [
        { profileName: "Despoiler gatling cannon", range: '36"', attacks: "18", skill: "3+", strength: "6", ap: "-2", damage: "2" },
        { profileName: "Heavy darkflamer", range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] },
      ]},
      { id: "kd-arm1-battle-stubber", name: "Despoiler battle cannon and Diabolus heavy stubber", image: "", profiles: [
        { profileName: "Despoiler battle cannon", range: '72"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST", "RAPID FIRE D6+3"] },
        { profileName: "Diabolus heavy stubber", range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] },
      ]},
      { id: "kd-arm2-warpstrike", name: "Warpstrike claw", image: "", profiles: [
        { profileName: "strike", range: "Melee", attacks: "4", skill: "3+", strength: "20", ap: "-3", damage: "8" },
        { profileName: "sweep", range: "Melee", attacks: "8", skill: "3+", strength: "10", ap: "-2", damage: "3" },
      ]},
      { id: "kd-arm2-thermal", name: "Daemonbreath thermal cannon", image: "", profiles: [{ range: '24"', attacks: "2D3", skill: "3+", strength: "12", ap: "-4", damage: "D6", keywords: ["BLAST", "MELTA 6"] }] },
      { id: "kd-arm2-gatling-dark", name: "Despoiler gatling cannon and Heavy darkflamer", image: "", profiles: [
        { profileName: "Despoiler gatling cannon", range: '36"', attacks: "18", skill: "3+", strength: "6", ap: "-2", damage: "2" },
        { profileName: "Heavy darkflamer", range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] },
      ]},
      { id: "kd-arm2-battle-stubber", name: "Despoiler battle cannon and Diabolus heavy stubber", image: "", profiles: [
        { profileName: "Despoiler battle cannon", range: '72"', attacks: "D6+3", skill: "3+", strength: "10", ap: "-1", damage: "3", keywords: ["BLAST", "RAPID FIRE D6+3"] },
        { profileName: "Diabolus heavy stubber", range: '36"', attacks: "3", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 3"] },
      ]},
      { id: "kd-havoc-pod", name: "Havoc missile pod", image: "", profiles: [{ range: '48"', attacks: "D6+1", skill: "3+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST", "INDIRECT FIRE"] }] },
      { id: "kd-ruinspear-pod", name: "Ruinspear rocket pod", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "D6" }] },
      { id: "kd-hellstorm-autocannons", name: "Hellstorm autocannons", image: "", profiles: [{ range: '48"', attacks: "3", skill: "3+", strength: "7", ap: "-1", damage: "2", keywords: ["ANTI-FLY 2+", "TWIN-LINKED"] }] },
    ],
    wargearGroups: [
      ["kd-meltagun", "kd-diabolus-stubber"],
      ["kd-arm1-chainsword", "kd-arm1-thermal", "kd-arm1-gatling-dark", "kd-arm1-battle-stubber"],
      ["kd-arm2-warpstrike", "kd-arm2-thermal", "kd-arm2-gatling-dark", "kd-arm2-battle-stubber"],
      ["kd-havoc-pod", "kd-ruinspear-pod", "kd-hellstorm-autocannons"],
    ],
    wargearSections: [
      { label: "Underslung Weapon", ids: ["kd-meltagun", "kd-diabolus-stubber"] },
      { label: "Right Arm", ids: ["kd-arm1-chainsword", "kd-arm1-thermal", "kd-arm1-gatling-dark", "kd-arm1-battle-stubber"] },
      { label: "Left Arm", ids: ["kd-arm2-warpstrike", "kd-arm2-thermal", "kd-arm2-gatling-dark", "kd-arm2-battle-stubber"] },
      { label: "Carapace (Optional)", ids: ["kd-havoc-pod", "kd-ruinspear-pod", "kd-hellstorm-autocannons"] },
    ],
    abilities: [
      {
        name: "Dread Dominion (Aura)",
        description: "While a friendly WAR DOG model is within 9\" of this model, improve that WAR DOG model's Leadership and Objective Control characteristics by 1.",
      },
      {
        name: "Seething Hatred",
        description: "Each time this model is selected to shoot or fight, you can re-roll one Hit roll or you can re-roll one Wound roll when resolving those attacks.",
      },
      {
        name: "Damaged: 1-9 Wounds Remaining",
        description: "While this model has 1-9 wounds remaining, subtract 5 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
  },

  {
    id: "knight-rampager",
    name: "Knight Rampager",
    faction: "chaos-knights",
    image: "",
    points: 380,
    canAttachTo: [],
    defaultWargear: [
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "", profiles: [{ range: '36"', attacks: "6", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "warpstrike-claw-strike", name: "Warpstrike claw – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "warpstrike-claw-sweep", name: "Warpstrike claw – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
      { id: "reaper-chainsword-strike", name: "Reaper chainsword – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "16", ap: "-4", damage: "D6+4" }] },
      { id: "reaper-chainsword-sweep", name: "Reaper chainsword – sweep", image: "", profiles: [{ range: "Melee", attacks: "8", skill: "3+", strength: "8", ap: "-3", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "knight-tyrant",
    name: "Knight Tyrant",
    faction: "chaos-knights",
    image: "",
    points: 480,
    canAttachTo: [],
    defaultWargear: [
      { id: "brimstone-volcano-lance", name: "Brimstone volcano lance", image: "", profiles: [{ range: '60"', attacks: "D6", skill: "3+", strength: "18", ap: "-6", damage: "D6+6", keywords: ["HEAVY"] }] },
      { id: "ectoplasma-decimator-standard", name: "Ectoplasma decimator – standard", image: "", profiles: [{ range: '36"', attacks: "D6+6", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["BLAST", "HEAVY"] }] },
      { id: "ectoplasma-decimator-supercharge", name: "Ectoplasma decimator – supercharge", image: "", profiles: [{ range: '36"', attacks: "D6+6", skill: "3+", strength: "9", ap: "-4", damage: "3", keywords: ["BLAST", "HAZARDOUS", "HEAVY"] }] },
      { id: "gheiststrike-missile-launcher", name: "Gheiststrike missile launcher", image: "", profiles: [{ range: '48"', attacks: "2", skill: "3+", strength: "14", ap: "-4", damage: "D6+4", keywords: ["HEAVY"] }] },
      { id: "twin-daemonbreath-meltagun", name: "Twin daemonbreath meltagun", image: "", profiles: [{ range: '18"', attacks: "2", skill: "3+", strength: "9", ap: "-4", damage: "D6", keywords: ["MELTA 3", "TWIN-LINKED"] }] },
      { id: "twin-desecrator-cannon", name: "Twin desecrator cannon", image: "", profiles: [{ range: '48"', attacks: "D6+3", skill: "3+", strength: "8", ap: "-2", damage: "D3", keywords: ["BLAST", "HEAVY", "TWIN-LINKED"] }] },
      { id: "titanic-feet", name: "Titanic feet", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "4+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "darkflame-cannon", name: "Darkflame cannon", image: "", profiles: [{ range: '18"', attacks: "D6+6", skill: "N/A", strength: "9", ap: "-2", damage: "2", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "warpshock-harpoon", name: "Warpshock harpoon", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "16", ap: "-4", damage: "D6+6", keywords: ["HEAVY"] }] },
    ],
  },

  {
    id: "renegade-enforcer",
    name: "Renegade Enforcer",
    faction: "chaos-knights",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "enforcer-pistol", name: "Enforcer pistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "3+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "enforcer-melee-weapon", name: "Enforcer melee weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "lasgun", name: "Lasgun", image: "", profiles: [{ range: '24"', attacks: "2", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "shotgun", name: "Shotgun", image: "", profiles: [{ range: '12"', attacks: "2", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "power-fist", name: "Power fist", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "power-weapon", name: "Power weapon", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "5", ap: "-2", damage: "1" }] },
    ],
  },

  {
    id: "rogue-psyker",
    name: "Rogue Psyker",
    faction: "chaos-knights",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "laspistol", name: "Laspistol", image: "", profiles: [{ range: '12"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "psychic-strike-focused-witchfire", name: "Psychic Strike – focused witchfire", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "2", keywords: ["PSYCHIC"] }] },
      { id: "psychic-strike-witchfire", name: "Psychic Strike – witchfire", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "PSYCHIC"] }] },
      { id: "chaos-stave", name: "Chaos stave", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },


];
