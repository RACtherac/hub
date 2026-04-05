import type { Unit } from "../../../types/warhammer";

export const chaosKnightsUnits: Unit[] = [

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-knights",
    category: "battleline",
    points: 50,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "" },
    ],
    wargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "cultist-mob-with-firearms",
    name: "Cultist Mob With Firearms",
    faction: "chaos-knights",
    category: "battleline",
    points: 50,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "brutal-assault-weapon", name: "Brutal assault weapon", image: "" },
    ],
    wargear: [
      { id: "autogun", name: "Autogun", image: "" },
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "grenade-launcher-frag", name: "Grenade launcher – frag", image: "" },
      { id: "grenade-launcher-krak", name: "Grenade launcher – krak", image: "" },
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "accursed-cultists",
    name: "Accursed Cultists",
    faction: "chaos-knights",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [
      { id: "blasphemous-appendages", name: "Blasphemous appendages", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dark-commune",
    name: "Dark Commune",
    faction: "chaos-knights",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "autopistol", name: "Autopistol", image: "" },
      { id: "commune-stave", name: "Commune stave", image: "" },
    ],
    wargear: [
      { id: "warp-curse-witchfire", name: "Warp Curse – witchfire", image: "" },
      { id: "warp-curse-focused-witchfire", name: "Warp Curse – focused witchfire", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "commune-blade", name: "Commune blade", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "fellgor-beastmen",
    name: "Fellgor Beastmen",
    faction: "chaos-knights",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
    ],
    wargear: [
      { id: "corrupted-stave", name: "Corrupted stave", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "great-weapon", name: "Great weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "gellerpox-infected",
    name: "Gellerpox Infected",
    faction: "chaos-knights",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "brutal-weapons", name: "Brutal weapons", image: "" },
    ],
    wargear: [
      { id: "belly-flamer", name: "Belly-flamer", image: "" },
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "chaos-knights",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "diseased-claws-and-fangs", name: "Diseased claws and fangs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "negavolt-cultists",
    name: "Negavolt Cultists",
    faction: "chaos-knights",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "electro-goads", name: "Electro-goads", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "renegade-heavy-weapons-squad",
    name: "Renegade Heavy Weapons Squad",
    faction: "chaos-knights",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "heavy-stubber", name: "Heavy stubber", image: "" },
      { id: "renegade-firearm", name: "Renegade firearm", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [
      { id: "autocannon", name: "Autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "mortar", name: "Mortar", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-ogryn-beast-handler",
    name: "Renegade Ogryn Beast Handler",
    faction: "chaos-knights",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "mauler-goad-and-ripper-claw", name: "Mauler goad and ripper claw", image: "" },
    ],
    wargear: [
      { id: "befouled-claws-and-fangs", name: "Befouled claws and fangs", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-ogryn-brutes",
    name: "Renegade Ogryn Brutes",
    faction: "chaos-knights",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-weapon", name: "Ogryn weapon", image: "" },
    ],
    wargear: [
      { id: "ogryn-power-drill", name: "Ogryn power drill", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-plague-ogryns",
    name: "Renegade Plague Ogryns",
    faction: "chaos-knights",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-plague-claws", name: "Ogryn plague claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "traitor-enforcer",
    name: "Traitor Enforcer",
    faction: "chaos-knights",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    wargear: [
      { id: "ogryn-weapons", name: "Ogryn weapons", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "traitor-guardsmen-squad",
    name: "Traitor Guardsmen Squad",
    faction: "chaos-knights",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "corrupted-pistol", name: "Corrupted pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "cultist-grenade-launcher-frag", name: "Cultist grenade launcher – frag", image: "" },
      { id: "cultist-grenade-launcher-krak", name: "Cultist grenade launcher – krak", image: "" },
      { id: "cultist-sniper-rifle", name: "Cultist sniper rifle", image: "" },
      { id: "flamer", name: "Flamer", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "chainsword", name: "Chainsword", image: "" },
      { id: "power-weapon", name: "Power weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chaos-acastus-knight-asterius",
    name: "Chaos Acastus Knight Asterius",
    faction: "chaos-knights",
    category: "vehicle",
    points: 765,
    defaultWargear: [
      { id: "asterius-volkite-culverin", name: "Asterius volkite culverin", image: "" },
      { id: "karacnos-mortar-battery", name: "Karacnos mortar battery", image: "" },
      { id: "twin-conversion-beam-cannon", name: "Twin conversion beam cannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "chaos-acastus-knight-porphyrion",
    name: "Chaos Acastus Knight Porphyrion",
    faction: "chaos-knights",
    category: "vehicle",
    points: 700,
    defaultWargear: [
      { id: "acastus-autocannon", name: "Acastus Autocannon", image: "" },
      { id: "acastus-ironstorm-missile-pod", name: "Acastus ironstorm missile pod", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "twin-magna-lascannon", name: "Twin magna lascannon", image: "" },
      { id: "titanic-feet", name: "Titanic feet", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "war-dog-brigand",
    name: "War Dog Brigand",
    faction: "chaos-knights",
    category: "vehicle",
    points: 165,
    defaultWargear: [
      { id: "avenger-chaincannon", name: "Avenger chaincannon", image: "" },
      { id: "daemonbreath-spear", name: "Daemonbreath spear", image: "" },
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "havoc-multi-launcher", name: "Havoc multi-launcher", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-executioner",
    name: "War Dog Executioner",
    faction: "chaos-knights",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "" },
      { id: "war-dog-autocannon", name: "War Dog autocannon", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "daemonbreath-meltagun", name: "Daemonbreath meltagun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-huntsman",
    name: "War Dog Huntsman",
    faction: "chaos-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "daemonbreath-spear", name: "Daemonbreath spear", image: "" },
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "" },
      { id: "reaper-chaintalon-strike", name: "Reaper chaintalon – strike", image: "" },
      { id: "reaper-chaintalon-sweep", name: "Reaper chaintalon – sweep", image: "" },
    ],
    wargear: [
      { id: "daemonbreath-meltagun", name: "Daemonbreath meltagun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-karnivore",
    name: "War Dog Karnivore",
    faction: "chaos-knights",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "diabolus-heavy-stubber", name: "Diabolus heavy stubber", image: "" },
      { id: "reaper-chaintalon-strike", name: "Reaper chaintalon – strike", image: "" },
      { id: "reaper-chaintalon-sweep", name: "Reaper chaintalon – sweep", image: "" },
      { id: "slaughterclaw", name: "Slaughterclaw", image: "" },
    ],
    wargear: [
      { id: "havoc-multi-launcher", name: "Havoc multi-launcher", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "war-dog-moirax",
    name: "War Dog Moirax",
    faction: "chaos-knights",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "graviton-pulsar", name: "Graviton pulsar", image: "" },
      { id: "volkite-veuglaire", name: "Volkite veuglaire", image: "" },
      { id: "armoured-feet", name: "Armoured feet", image: "" },
    ],
    wargear: [
      { id: "conversion-beam-cannon", name: "Conversion beam cannon", image: "" },
      { id: "lightning-lock", name: "Lightning lock", image: "" },
      { id: "rad-cleanser", name: "Rad cleanser", image: "" },
      { id: "siege-claw", name: "Siege claw", image: "" },
    ],
    ledBy: [],
  },

];
