import type { Unit } from "../../src/types/warhammer";

export const orksUnits: Unit[] = [

  {
    id: "grot-bomm-launcha",
    name: "Grot Bomm Launcha",
    faction: "orks",
    category: "mounted",
    points: 50,
    defaultWargear: [
      { id: "grot-guided-bomms", name: "Grot-guided bomms", image: "" },
      { id: "spiked-wheel", name: "Spiked wheel", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "nobz-on-warbikes",
    name: "Nobz On Warbikes",
    faction: "orks",
    category: "mounted",
    points: 125,
    defaultWargear: [
      { id: "twin-dakkagun", name: "Twin dakkagun", image: "" },
      { id: "big-choppa", name: "Big choppa", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "killsaw", name: "Killsaw", image: "" },
      { id: "power-klaw", name: "Power klaw", image: "" },
      { id: "power-stabba", name: "Power stabba", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "skorchas",
    name: "Skorchas",
    faction: "orks",
    category: "mounted",
    points: 45,
    defaultWargear: [
      { id: "skorcha", name: "Skorcha", image: "" },
      { id: "spiked-wheel", name: "Spiked wheel", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "squighog-boyz",
    name: "Squighog Boyz",
    faction: "orks",
    category: "mounted",
    modelCountOptions: [4, 8],
    pointsByModelCount: { 4: 150, 8: 300 },
    defaultWargear: [
      { id: "saddlegit-weapons", name: "Saddlegit weapons", image: "", profiles: [{ range: '9"', attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "1", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "stikka", name: "Stikka", image: "", profiles: [
        { profileName: "ranged", range: '9"', attacks: "1", skill: "5+", strength: "5", ap: "-1", damage: "2", keywords: ["ASSAULT", "ANTI-MONSTER 4+", "ANTI-VEHICLE 4+"] },
        { profileName: "melee", range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "2", keywords: ["ANTI-MONSTER 4+", "ANTI-VEHICLE 4+", "LANCE"] },
      ]},
      { id: "big-choppa", name: "Big Choppa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["ANTI-MONSTER 4+", "ANTI-VEHICLE 4+"] }] },
      { id: "squig-jaws", name: "Squig jaws", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
    ],
    wargear: [
      { id: "bomb-squig", name: "Bomb squig", image: "", countable: true, maxCountByModelCount: { 4: 1, 8: 2 }, note: "Bomb Squigs: Once per battle, for each bomb squig this unit has, after this unit ends a Normal move, you can use one Bomb Squig. If you do, select one enemy unit within 12\" and visible to this unit and roll one D6: on a 3+, that enemy unit suffers D3 mortal wounds." },
    ],
    abilities: [
      {
        name: "Wild Ride",
        description: "You can ignore any or all modifiers to this unit's Move characteristic and to Advance and Charge rolls made for this unit.",
      },
    ],
    ledBy: ["beastboss-on-squigosaur", "mozrog-skragbad"],
  },

  {
    id: "warbikers",
    name: "Warbikers",
    faction: "orks",
    category: "mounted",
    points: 70,
    defaultWargear: [
      { id: "twin-dakkagun", name: "Twin dakkagun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "big-choppa", name: "Big choppa", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
      { id: "power-klaw", name: "Power klaw", image: "" },
    ],
    ledBy: ["deffkilla-wartrike"],
  },

  {
    id: "warbuggies",
    name: "Warbuggies",
    faction: "orks",
    category: "mounted",
    points: 40,
    defaultWargear: [
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "spiked-wheels", name: "Spiked wheels", image: "" },
    ],
    wargear: [
      { id: "rack-of-rokkits", name: "Rack of rokkits", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "wartrakks",
    name: "Wartrakks",
    faction: "orks",
    category: "mounted",
    points: 50,
    defaultWargear: [
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "spiked-wheel", name: "Spiked wheel", image: "" },
    ],
    wargear: [
      { id: "rack-of-rokkits", name: "Rack of rokkits", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "beast-snagga-boyz",
    name: "Beast Snagga Boyz",
    faction: "orks",
    category: "battleline",
    modelCountOptions: [10, 20],
    pointsByModelCount: { 10: 95, 20: 190 },
    defaultWargear: [
      { id: "bsb-slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "1", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "bsb-power-snappa", name: "Power snappa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "bsb-thump-gun", name: "Thump gun", image: "", countable: true, maxCountByModelCount: { 10: 1, 20: 2 }, profiles: [{ range: '18"', attacks: "D3", skill: "5+", strength: "6", ap: "0", damage: "2", keywords: ["BLAST"] }] },
      { id: "bsb-choppa", name: "Choppa", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "bsb-close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "5", ap: "0", damage: "1" }] },
    ],
    abilities: [
      {
        name: "Monster Hunters",
        description: "Each time a model in this unit makes an attack that targets a MONSTER or VEHICLE unit, you can re-roll the Hit roll.",
      },
    ],
    ledBy: ["beastboss", "painboss", "wurrboy"],
  },

  {
    id: "boyz",
    name: "Boyz",
    faction: "orks",
    category: "battleline",
    points: 80,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "big-choppa", name: "Big choppa", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
    ],
    wargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "shoota", name: "Shoota", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: ["big-mek","big-mek-with-shokk-attack-gun","mek","painboy","warboss","weirdboy"],
  },

  {
    id: "breaka-boyz",
    name: "Breaka Boyz",
    faction: "orks",
    category: "infantry",
    points: 140,
    defaultWargear: [
      { id: "rokkit-pistol", name: "Rokkit pistol", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
      { id: "smash-hammer", name: "Smash hammer", image: "" },
    ],
    wargear: [
      { id: "knucklebustas", name: "Knucklebustas", image: "" },
      { id: "tankhammer", name: "Tankhammer", image: "" },
    ],
    ledBy: ["big-mek","big-mek-with-shokk-attack-gun","mek","painboy","warboss","weirdboy"],
  },

  {
    id: "flash-gitz",
    name: "Flash Gitz",
    faction: "orks",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "snazzgun", name: "Snazzgun", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "ghazghkull-thraka",
    name: "Ghazghkull Thraka",
    faction: "orks",
    category: "infantry",
    modelCountOptions: [2],
    pointsByModelCount: { 2: 235 },
    defaultWargear: [
      { id: "mork-s-roar", name: "Mork's Roar", image: "", profiles: [{ range: '36"', attacks: "12", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 4"] }] },
      { id: "gork-s-klaw-strike", name: "Gork's Klaw – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "14", ap: "-3", damage: "4" }] },
      { id: "gork-s-klaw-sweep", name: "Gork's Klaw – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "2+", strength: "8", ap: "-2", damage: "2" }] },
      { id: "makari-s-stabba", name: "Makari's stabba", image: "", profiles: [{ range: "Melee", attacks: "1", skill: "4+", strength: "3", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS"] }] },
    ],
    abilities: [
      {
        name: "Prophet of Da Great Waaagh!",
        description: "While this unit is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Hit roll and add 1 to the Wound roll and if the Waaagh! is active for your army, a Critical Hit is scored on a successful unmodified Hit roll of 5+.",
      },
      {
        name: "Ghazghkull's Waaagh! Banner (Aura)",
        description: "While a friendly ORKS unit is within 12\" of Makari, if the Waaagh! is active for your army, melee weapons equipped by models in that unit have the [LETHAL HITS] ability.",
      },
    ],
    wargear: [],
    ledBy: ["boyz", "breaka-boyz", "meganobz", "nobz"],
  },

  {
    id: "gretchin",
    name: "Gretchin",
    faction: "orks",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "runtherd-tools", name: "Runtherd tools", image: "" },
    ],
    wargear: [
      { id: "grot-blasta", name: "Grot blasta", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: ["zodgrod-wortsnagga"],
  },

  {
    id: "kommandos",
    name: "Kommandos",
    faction: "orks",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "big-choppa", name: "Big choppa", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
    ],
    wargear: [
      { id: "burna", name: "Burna", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "breacha-ram", name: "Breacha ram", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-klaw", name: "Power klaw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "meganobz",
    name: "Meganobz",
    faction: "orks",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "kustom-shoota", name: "Kustom shoota", image: "" },
      { id: "power-klaw", name: "Power klaw", image: "" },
    ],
    wargear: [
      { id: "kombi-weapon", name: "Kombi-weapon", image: "" },
      { id: "killsaw", name: "Killsaw", image: "" },
      { id: "twin-killsaw", name: "Twin killsaw", image: "" },
    ],
    ledBy: ["big-mek-in-mega-armour","ghazghkull-thraka","warboss-in-mega-armour"],
  },

  {
    id: "nobz",
    name: "Nobz",
    faction: "orks",
    category: "infantry",
    points: 105,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "big-choppa", name: "Big choppa", image: "" },
    ],
    wargear: [
      { id: "kombi-weapon", name: "Kombi-weapon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-klaw", name: "Power klaw", image: "" },
    ],
    ledBy: ["big-mek","big-mek-with-shokk-attack-gun","mek","painboy","warboss"],
  },

  {
    id: "stormboyz",
    name: "Stormboyz",
    faction: "orks",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
    ],
    wargear: [
      { id: "power-klaw", name: "Power klaw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tankbustas",
    name: "Tankbustas",
    faction: "orks",
    category: "infantry",
    points: 135,
    defaultWargear: [
      { id: "rokkit-pistol", name: "Rokkit pistol", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
    ],
    wargear: [
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "smash-hammer", name: "Smash hammer", image: "" },
    ],
    ledBy: ["big-mek","big-mek-with-shokk-attack-gun","mek","painboy"],
  },

  {
    id: "attack-fighta",
    name: "Attack Fighta",
    faction: "orks",
    category: "vehicle",
    points: 100,
    defaultWargear: [
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "wing-missiles", name: "Wing missiles", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "big-gunz",
    name: "Big Gunz",
    faction: "orks",
    category: "vehicle",
    points: 20,
    defaultWargear: [
      { id: "kannon-frag", name: "Kannon – frag", image: "" },
      { id: "kannon-shell", name: "Kannon – shell", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [
      { id: "lobba", name: "Lobba", image: "" },
      { id: "zzap-gun", name: "Zzap gun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "blitza-bommer",
    name: "Blitza Bommer",
    faction: "orks",
    category: "vehicle",
    points: 115,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "twin-supa-shoota", name: "Twin supa-shoota", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "boomdakka-snazzwagon",
    name: "Boomdakka Snazzwagon",
    faction: "orks",
    category: "vehicle",
    points: 80,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "grot-blasta", name: "Grot blasta", image: "" },
      { id: "mek-speshul", name: "Mek speshul", image: "" },
      { id: "spiked-wheels", name: "Spiked wheels", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "burna-bommer",
    name: "Burna Bommer",
    faction: "orks",
    category: "vehicle",
    points: 125,
    defaultWargear: [
      { id: "bb-twin-big-shoota", name: "Twin big shoota", image: "", profiles: [{ range: '36"', attacks: "3", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 2", "TWIN-LINKED"] }] },
      { id: "bb-twin-supa-shoota", name: "Twin supa-shoota", image: "", profiles: [{ range: '36"', attacks: "4", skill: "5+", strength: "6", ap: "-1", damage: "1", keywords: ["RAPID FIRE 2", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "bb-armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "bb-skorcha-missile-rack", name: "Skorcha missile rack", image: "", countable: true, maxCountByModelCount: { 1: 1 }, profiles: [{ range: '36"', attacks: "2D6", skill: "5+", strength: "5", ap: "-1", damage: "1", keywords: ["BLAST", "IGNORES COVER"] }] },
    ],
    abilities: [
      {
        name: "Burna Bomb",
        description: "Each time this model ends a Normal move, you can select one enemy unit it moved over during that move. Until the end of the turn, models in that unit cannot have the Benefit of Cover. In addition, roll one D6 for each model in that unit: for each 6, that unit suffers 1 mortal wound.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "dakkajet",
    name: "Dakkajet",
    faction: "orks",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "dj-twin-supa-shoota", name: "Twin supa-shoota", image: "", profiles: [{ range: '36"', attacks: "4", skill: "5+", strength: "6", ap: "-1", damage: "1", keywords: ["RAPID FIRE 2", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "dj-armoured-hull", name: "Armoured hull", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "dj-extra-twin-supa-shoota", name: "Twin supa-shoota (additional)", image: "", countable: true, maxCountByModelCount: { 1: 1 }, profiles: [{ range: '36"', attacks: "4", skill: "5+", strength: "6", ap: "-1", damage: "1", keywords: ["RAPID FIRE 2", "SUSTAINED HITS 1", "TWIN-LINKED"] }] },
    ],
    abilities: [
      {
        name: "Dakkastorm",
        description: "Each time this model makes a ranged attack, every successful Hit roll scores a Critical Hit.",
      },
      {
        name: "Damaged: 1-4 Wounds Remaining",
        description: "While this model has 1-4 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "deff-dread",
    name: "Deff Dread",
    faction: "orks",
    category: "vehicle",
    points: 120,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "dread-klaw", name: "Dread klaw", image: "" },
      { id: "stompy-feet", name: "Stompy feet", image: "" },
    ],
    wargear: [
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "deffkoptas",
    name: "Deffkoptas",
    faction: "orks",
    category: "vehicle",
    points: 90,
    defaultWargear: [
      { id: "kopta-rokkits", name: "Kopta rokkits", image: "" },
      { id: "slugga", name: "Slugga", image: "" },
      { id: "spinnin-blades", name: "Spinnin' blades", image: "" },
    ],
    wargear: [
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "deffkoptas-with-big-shootas",
    name: "Deffkoptas With Big Shootas",
    faction: "orks",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "spinnin-blades", name: "Spinnin' blades", image: "" },
    ],
    wargear: [
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fighta-bommer",
    name: "Fighta Bommer",
    faction: "orks",
    category: "vehicle",
    points: 100,
    defaultWargear: [
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "grot-guided-bomm", name: "Grot-guided bomm", image: "" },
      { id: "wing-missiles", name: "Wing missiles", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grot-mega-tank",
    name: "Grot Mega Tank",
    faction: "orks",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "mega-tank-weapons", name: "Mega-tank weapons", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "twin-grotzooka", name: "Twin grotzooka", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-kustom-mega-blasta", name: "Twin kustom mega-blasta", image: "" },
      { id: "twin-rokkit-launcha", name: "Twin rokkit launcha", image: "" },
      { id: "twin-skorcha", name: "Twin skorcha", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "grot-tanks",
    name: "Grot Tanks",
    faction: "orks",
    category: "vehicle",
    points: 155,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "ramshackle-hull", name: "Ramshackle hull", image: "" },
    ],
    wargear: [
      { id: "grotzooka", name: "Grotzooka", image: "" },
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "killa-kans",
    name: "Killa Kans",
    faction: "orks",
    category: "vehicle",
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 125, 6: 250 },
    defaultWargear: [
      { id: "kan-shoota", name: "Kan shoota", image: "", profiles: [{ range: '36"', attacks: "3", skill: "4+", strength: "5", ap: "0", damage: "1", keywords: ["DEVASTATING WOUNDS", "RAPID FIRE 2"] }] },
      { id: "kan-klaw", name: "Kan klaw", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "kk-grotzooka", name: "Grotzooka", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, profiles: [{ range: '18"', attacks: "D3+3", skill: "4+", strength: "6", ap: "-1", damage: "1", keywords: ["BLAST", "IGNORES COVER"] }] },
      { id: "kk-rokkit-launcha", name: "Rokkit launcha", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, profiles: [{ range: '24"', attacks: "D3", skill: "4+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] }] },
      { id: "kk-skorcha", name: "Skorcha", image: "", countable: true, maxCountByModelCount: { 3: 3, 6: 6 }, profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
    ],
    abilities: [
      {
        name: "Shooty Power Trip",
        description: "Each time this unit is selected to shoot, you can roll one D6: on a 1-2, this unit suffers D3 mortal wounds; on a 3-4, until the end of the phase, add 1 to the Strength characteristic of ranged weapons equipped by models in this unit; on a 5-6, until the end of the phase, add 1 to the Attacks characteristic of ranged weapons equipped by models in this unit.",
      },
    ],
    ledBy: [],
  },

  {
    id: "kustom-boosta-blasta",
    name: "Kustom Boosta Blasta",
    faction: "orks",
    category: "vehicle",
    points: 75,
    defaultWargear: [
      { id: "burna-exhausts", name: "Burna exhausts", image: "" },
      { id: "grot-blasta", name: "Grot blasta", image: "" },
      { id: "rivet-kannon", name: "Rivet kannon", image: "" },
      { id: "spiked-ram", name: "Spiked ram", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "lifta-wagon",
    name: "Lifta Wagon",
    faction: "orks",
    category: "vehicle",
    points: 135,
    defaultWargear: [
      { id: "lifta-droppa", name: "Lifta-droppa", image: "" },
      { id: "tracks-and-wheels", name: "Tracks and wheels", image: "" },
    ],
    wargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mega-dread",
    name: "Mega Dread",
    faction: "orks",
    category: "vehicle",
    points: 225,
    defaultWargear: [
      { id: "boombits", name: "Boombits", image: "" },
      { id: "killkannon", name: "Killkannon", image: "" },
      { id: "dread-rippa-klaw", name: "Dread rippa klaw", image: "" },
      { id: "stompy-feet", name: "Stompy feet", image: "" },
    ],
    wargear: [
      { id: "dread-killsaw", name: "Dread killsaw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "megatrakk-scrapjet",
    name: "Megatrakk Scrapjet",
    faction: "orks",
    category: "vehicle",
    points: 80,
    defaultWargear: [
      { id: "rokkit-kannon", name: "Rokkit kannon", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "wing-missiles", name: "Wing missiles", image: "" },
      { id: "nose-drill", name: "Nose drill", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "mek-gunz",
    name: "Mek Gunz",
    faction: "orks",
    category: "vehicle",
    modelCountOptions: [1, 2, 3],
    pointsByModelCount: { 1: 50, 2: 100, 3: 150 },
    defaultWargear: [
      { id: "mekgunz-grot-crew", name: "Grot crew", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "mekgunz-smasha-gun", name: "Smasha gun", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2, 3: 3 }, maxCountReducedByWargear: ["mekgunz-bubblechukka", "mekgunz-kustom-mega-kannon", "mekgunz-traktor-kannon"], profiles: [{ range: '48"', attacks: "D3+1", skill: "4+", strength: "9", ap: "-3", damage: "3", keywords: ["BLAST"] }] },
      { id: "mekgunz-bubblechukka", name: "Bubblechukka", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2, 3: 3 }, maxCountReducedByWargear: ["mekgunz-smasha-gun", "mekgunz-kustom-mega-kannon", "mekgunz-traktor-kannon"], note: "Bubblechukka: Before selecting targets for one or more models equipped with this weapon, roll one D6 to determine which profile models equipped with this weapon will make attacks with, comparing the result with the numbers shown on the left.", profiles: [
        { profileName: "► 1-2 Bubblechukka – big bubble bubblechukka", range: '48"', attacks: "2D6", skill: "4+", strength: "6", ap: "-1", damage: "1", keywords: ["BLAST"] },
        { profileName: "► 3-4 Bubblechukka – wobbly bubble bubblechukka", range: '48"', attacks: "D6", skill: "4+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] },
        { profileName: "► 5-6 Bubblechukka – dense bubble bubblechukka", range: '48"', attacks: "D3", skill: "4+", strength: "12", ap: "-3", damage: "D6+3", keywords: ["BLAST"] },
      ]},
      { id: "mekgunz-kustom-mega-kannon", name: "Kustom mega-kannon", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2, 3: 3 }, maxCountReducedByWargear: ["mekgunz-smasha-gun", "mekgunz-bubblechukka", "mekgunz-traktor-kannon"], profiles: [{ range: '36"', attacks: "D6", skill: "4+", strength: "12", ap: "-1", damage: "D6", keywords: ["BLAST", "HAZARDOUS"] }] },
      { id: "mekgunz-traktor-kannon", name: "Traktor kannon", image: "", countable: true, maxCountByModelCount: { 1: 1, 2: 2, 3: 3 }, maxCountReducedByWargear: ["mekgunz-smasha-gun", "mekgunz-bubblechukka", "mekgunz-kustom-mega-kannon"], profiles: [{ range: '48"', attacks: "1", skill: "4+", strength: "10", ap: "-2", damage: "D6+1", keywords: ["ANTI-FLY 2+", "DEVASTATING WOUNDS"] }] },
    ],
    abilities: [
      {
        name: "Splat!",
        description: "Each time a model in this unit makes a ranged attack that targets a unit that is at its Starting Strength (excluding MONSTERS and VEHICLES), re-roll a Hit roll of 1.",
      },
    ],
    ledBy: ["big-mek", "big-mek-with-shokk-attack-gun", "mek"],
  },

  {
    id: "meka-dread",
    name: "Meka Dread",
    faction: "orks",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "killkannon", name: "Killkannon", image: "" },
      { id: "dread-rippa-klaw", name: "Dread rippa klaw", image: "" },
      { id: "stompy-feet", name: "Stompy feet", image: "" },
    ],
    wargear: [
      { id: "dread-killsaw", name: "Dread killsaw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mekboy-workshop",
    name: "Mekboy Workshop",
    faction: "orks",
    category: "vehicle",
    points: 80,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "rukkatrukk-squigbuggy",
    name: "Rukkatrukk Squigbuggy",
    faction: "orks",
    category: "vehicle",
    points: 95,
    defaultWargear: [
      { id: "sawn-off-shotgun", name: "Sawn-off shotgun", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "squig-launchas", name: "Squig launchas", image: "", profiles: [{ range: '36"', attacks: "D6+6", skill: "5+", strength: "5", ap: "-1", damage: "2", keywords: ["BLAST", "IGNORES COVER", "INDIRECT FIRE"] }] },
      { id: "saw-blades", name: "Saw blades", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "4+", strength: "7", ap: "-1", damage: "2" }] },
    ],
    abilities: [
      {
        name: "Buzzer Squigs",
        description: "In your Shooting phase, after this model has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks made with squig-launchas and roll one D6: on a 4+, until the end of your opponent's next turn, that enemy unit is hindered. While a unit is hindered, subtract 2\" from its Move characteristic and subtract 2 from Advance and Charge rolls made for it.",
      },
      {
        name: "Squig Mine",
        description: "Once per battle, at the start of any phase, select one enemy unit within 3\" of this model and roll one D6: on a 4+, that enemy unit suffers D6 mortal wounds.",
      },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "shokkjump-dragsta",
    name: "Shokkjump Dragsta",
    faction: "orks",
    category: "vehicle",
    points: 75,
    defaultWargear: [
      { id: "kustom-shokk-rifle", name: "Kustom shokk rifle", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "saw-blades", name: "Saw blades", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "wazbom-blastajet",
    name: "Wazbom Blastajet",
    faction: "orks",
    category: "vehicle",
    points: 175,
    defaultWargear: [
      { id: "smasha-gun", name: "Smasha gun", image: "" },
      { id: "twin-wazbom-mega-kannon", name: "Twin wazbom mega-kannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-supa-shoota", name: "Twin supa-shoota", image: "" },
      { id: "twin-tellyport-mega-blasta", name: "Twin tellyport mega-blasta", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "battlewagon",
    name: "Battlewagon",
    faction: "orks",
    category: "transport",
    points: 160,
    defaultWargear: [
      { id: "tracks-and-wheels", name: "Tracks and wheels", image: "" },
    ],
    wargear: [
      { id: "kannon-frag", name: "Kannon – frag", image: "" },
      { id: "kannon-shell", name: "Kannon – shell", image: "" },
      { id: "killkannon", name: "Killkannon", image: "" },
      { id: "lobba", name: "Lobba", image: "" },
      { id: "zzap-gun", name: "Zzap gun", image: "" },
      { id: "grabbin-klaw", name: "Grabbin' klaw", image: "" },
      { id: "wreckin-ball", name: "Wreckin' ball", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "big-ed-bossbunka",
    name: "Big Ed Bossbunka",
    faction: "orks",
    category: "transport",
    points: 135,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "gaze-of-gork-glare", name: "Gaze of Gork – glare", image: "" },
      { id: "gaze-of-gork-squint", name: "Gaze of Gork – squint", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "big-trakk",
    name: "Big Trakk",
    faction: "orks",
    category: "transport",
    points: 90,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "kannon-frag", name: "Kannon – frag", image: "" },
      { id: "kannon-shell", name: "Kannon – shell", image: "" },
      { id: "supa-kannon-frag", name: "Supa-kannon – frag", image: "" },
      { id: "supa-kannon-shell", name: "Supa-kannon – shell", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chinork-warkopta",
    name: "Chinork Warkopta",
    faction: "orks",
    category: "transport",
    points: 105,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "deffgun", name: "Deffgun", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "deff-rolla-battle-fortress",
    name: "Deff Rolla Battle Fortress",
    faction: "orks",
    category: "transport",
    points: 250,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "kannon-frag", name: "Kannon – frag", image: "" },
      { id: "kannon-shell", name: "Kannon – shell", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "zzap-gun", name: "Zzap gun", image: "" },
      { id: "deff-rolla", name: "Deff rolla", image: "" },
    ],
    wargear: [
      { id: "lobba", name: "Lobba", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gargantuan-squiggoth",
    name: "Gargantuan Squiggoth",
    faction: "orks",
    category: "transport",
    points: 440,
    defaultWargear: [
      { id: "huge-tusks-strike", name: "Huge tusks – strike", image: "" },
      { id: "huge-tusks-sweep", name: "Huge tusks – sweep", image: "" },
    ],
    wargear: [
      { id: "kannon-frag", name: "Kannon – frag", image: "" },
      { id: "kannon-shell", name: "Kannon – shell", image: "" },
      { id: "supa-kannon", name: "Supa-kannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gorkanaut",
    name: "Gorkanaut",
    faction: "orks",
    category: "transport",
    points: 265,
    defaultWargear: [
      { id: "deffstorm-mega-shoota", name: "Deffstorm mega-shoota", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "klaw-of-gork-strike", name: "Klaw of Gork – strike", image: "" },
      { id: "klaw-of-gork-sweep", name: "Klaw of Gork – sweep", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hunta-rig",
    name: "Hunta Rig",
    faction: "orks",
    category: "transport",
    points: 135,
    defaultWargear: [
      { id: "eavy-lobba", name: "'Eavy lobba", image: "" },
      { id: "stikka-kannon", name: "Stikka kannon", image: "" },
      { id: "butcha-boyz", name: "Butcha boyz", image: "" },
      { id: "savage-horns-and-hooves", name: "Savage horns and hooves", image: "" },
      { id: "saw-blades", name: "Saw blades", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "kannonwagon",
    name: "Kannonwagon",
    faction: "orks",
    category: "transport",
    points: 115,
    defaultWargear: [
      { id: "supa-kannon-frag", name: "Supa-kannon – frag", image: "" },
      { id: "supa-kannon-shell", name: "Supa-kannon – shell", image: "" },
      { id: "spiked-ram", name: "Spiked ram", image: "" },
    ],
    wargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kill-krusha",
    name: "Kill Krusha",
    faction: "orks",
    category: "transport",
    points: 230,
    defaultWargear: [
      { id: "krusha-kannon-blast-burna", name: "Krusha kannon – blast burna", image: "" },
      { id: "krusha-kannon-tankhamma-shell", name: "Krusha kannon – tankhamma shell", image: "" },
      { id: "tracks-and-wheels", name: "Tracks and wheels", image: "" },
    ],
    wargear: [
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kill-rig",
    name: "Kill Rig",
    faction: "orks",
    category: "transport",
    points: 155,
    defaultWargear: [
      { id: "eavy-lobba", name: "'Eavy lobba", image: "" },
      { id: "stikka-kannon", name: "Stikka kannon", image: "" },
      { id: "wurrtower", name: "Wurrtower", image: "" },
      { id: "butcha-boyz", name: "Butcha boyz", image: "" },
      { id: "savage-horns-and-hooves", name: "Savage horns and hooves", image: "" },
      { id: "saw-blades", name: "Saw blades", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "kill-tank",
    name: "Kill Tank",
    faction: "orks",
    category: "transport",
    points: 295,
    defaultWargear: [
      { id: "bursta-kannon", name: "Bursta kannon", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "reinforced-ram", name: "Reinforced ram", image: "" },
    ],
    wargear: [
      { id: "giga-shoota", name: "Giga shoota", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "morkanaut",
    name: "Morkanaut",
    faction: "orks",
    category: "transport",
    points: 280,
    transportCapacity: 12,
    defaultWargear: [
      { id: "mork-kustom-mega-blasta", name: "Kustom mega-blasta", image: "", profiles: [{ range: '24"', attacks: "3", skill: "5+", strength: "9", ap: "-2", damage: "D6", keywords: ["HAZARDOUS"] }] },
      { id: "mork-kustom-mega-zappa", name: "Kustom mega-zappa", image: "", profiles: [{ range: '36"', attacks: "D6+3", skill: "5+", strength: "10", ap: "-2", damage: "D6", keywords: ["BLAST", "HAZARDOUS"] }] },
      { id: "mork-rokkit-launcha", name: "Rokkit launcha", image: "", profiles: [{ range: '24"', attacks: "D3", skill: "5+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] }] },
      { id: "mork-twin-big-shoota", name: "Twin big shoota", image: "", profiles: [{ range: '36"', attacks: "3", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 2", "TWIN-LINKED"] }] },
      { id: "mork-klaw-of-mork-strike", name: "Klaw of Mork – strike", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "18", ap: "-3", damage: "6" }] },
      { id: "mork-klaw-of-mork-sweep", name: "Klaw of Mork – sweep", image: "", profiles: [{ range: "Melee", attacks: "12", skill: "3+", strength: "8", ap: "-1", damage: "2" }] },
    ],
    abilities: [
      {
        name: "Clankin' Forward",
        description: "Each time this model makes a Normal, Advance or Fall Back move, it can move over enemy models (excluding MONSTER and VEHICLE models) and terrain features that are 4\" or less in height as if they were not there.",
      },
      {
        name: "Big an' Shooty",
        description: "Each time this model makes a ranged attack, if the Waaagh! is active for your army, add 1 to the Hit roll.",
      },
      {
        name: "Damaged: 1-7 Wounds Remaining",
        description: "While this model has 1-7 wounds remaining, subtract 4 from this model's Objective Control characteristic, and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "squiggoth",
    name: "Squiggoth",
    faction: "orks",
    category: "transport",
    points: 150,
    defaultWargear: [
      { id: "gorin-horns-strike", name: "Gorin' horns – strike", image: "" },
      { id: "gorin-horns-sweep", name: "Gorin' horns – sweep", image: "" },
    ],
    wargear: [
      { id: "kannon-frag", name: "Kannon – frag", image: "" },
      { id: "kannon-shell", name: "Kannon – shell", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "stompa",
    name: "Stompa",
    faction: "orks",
    category: "transport",
    points: 800,
    transportCapacity: 22,
    defaultWargear: [
      { id: "stompa-big-shoota", name: "Big shoota", image: "", profiles: [{ range: '36"', attacks: "3", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 2"] }] },
      { id: "stompa-deffkannon", name: "Deffkannon", image: "", profiles: [{ range: '72"', attacks: "3D6", skill: "5+", strength: "14", ap: "-3", damage: "D6", keywords: ["BLAST"] }] },
      { id: "stompa-skorcha", name: "Skorcha", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "stompa-supa-gatler", name: "Supa-gatler", image: "", profiles: [{ range: '24"', attacks: "20", skill: "5+", strength: "7", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
      { id: "stompa-supa-rokkits", name: "Supa-rokkits", image: "", profiles: [{ range: '100"', attacks: "D6", skill: "5+", strength: "12", ap: "-3", damage: "D6+2", keywords: ["BLAST"] }] },
      { id: "stompa-twin-big-shoota", name: "Twin big shoota", image: "", profiles: [{ range: '36"', attacks: "3", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["RAPID FIRE 2", "TWIN-LINKED"] }] },
      { id: "stompa-mega-choppa-strike", name: "Mega-choppa – strike", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "24", ap: "-5", damage: "10" }] },
      { id: "stompa-mega-choppa-sweep", name: "Mega-choppa – sweep", image: "", profiles: [{ range: "Melee", attacks: "18", skill: "3+", strength: "10", ap: "-2", damage: "3" }] },
    ],
    abilities: [
      {
        name: "Waaagh! Effigy (Aura)",
        description: "While a friendly ORKS unit is within 12\" of this model, each time you take a Battle-shock test for that unit, add 1 to that test.",
      },
      {
        name: "Stompin' Forward",
        description: "Each time this model makes a Normal, Advance or Fall Back move, it can move over models (excluding TITANIC models) and terrain features that are 4\" or less in height as if they were not there.",
      },
      {
        name: "Damaged: 1-10 Wounds Remaining",
        description: "While this model has 1-10 wounds remaining, subtract 6 from this model's Objective Control characteristic and each time this model makes an attack, subtract 1 from the Hit roll.",
      },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "trukk",
    name: "Trukk",
    faction: "orks",
    category: "transport",
    points: 65,
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "spiked-wheels", name: "Spiked wheels", image: "" },
    ],
    wargear: [
      { id: "wreckin-ball", name: "Wreckin' ball", image: "" },
    ],
    ledBy: [],
  },

];
