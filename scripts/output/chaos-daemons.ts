import type { Unit } from "../../src/types/warhammer";

export const chaosDaemonsUnits: Unit[] = [

  {
    id: "bloodcrushers",
    name: "Bloodcrushers",
    faction: "chaos-daemons",
    category: "mounted",
    points: 110,
    defaultWargear: [
      { id: "hellblade", name: "Hellblade", image: "" },
      { id: "juggernaut-s-bladed-horn", name: "Juggernaut's bladed horn", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "burning-chariot",
    name: "Burning Chariot",
    faction: "chaos-daemons",
    category: "mounted",
    points: 115,
    defaultWargear: [
      { id: "fire-of-tzeentch-blue-fire", name: "Fire of Tzeentch – blue fire", image: "" },
      { id: "fire-of-tzeentch-pink-fire", name: "Fire of Tzeentch – pink fire", image: "" },
      { id: "flamer-mouths", name: "Flamer mouths", image: "" },
      { id: "screamer-bites", name: "Screamer bites", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "exalted-seeker-chariot",
    name: "Exalted Seeker Chariot",
    faction: "chaos-daemons",
    category: "mounted",
    points: 115,
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "" },
      { id: "exalted-seeker-tongues", name: "Exalted Seeker tongues", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "hellflayer",
    name: "Hellflayer",
    faction: "chaos-daemons",
    category: "mounted",
    points: 105,
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "" },
      { id: "bladed-axle", name: "Bladed axle", image: "" },
      { id: "seeker-tongues", name: "Seeker tongues", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "plague-drones",
    name: "Plague Drones",
    faction: "chaos-daemons",
    category: "mounted",
    points: 110,
    defaultWargear: [
      { id: "death-s-heads", name: "Death's heads", image: "" },
      { id: "foul-mouthparts", name: "Foul mouthparts", image: "" },
      { id: "plaguesword", name: "Plaguesword", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "pox-riders",
    name: "Pox Riders",
    faction: "chaos-daemons",
    category: "mounted",
    points: 160,
    defaultWargear: [
      { id: "grasping-tongue", name: "Grasping tongue", image: "" },
      { id: "pox-rider-plaguesword", name: "Pox Rider plaguesword", image: "" },
      { id: "yawning-maw", name: "Yawning maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "seeker-chariot",
    name: "Seeker Chariot",
    faction: "chaos-daemons",
    category: "mounted",
    points: 65,
    defaultWargear: [
      { id: "lashes-of-torment", name: "Lashes of torment", image: "" },
      { id: "seeker-tongues", name: "Seeker tongues", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "seekers",
    name: "Seekers",
    faction: "chaos-daemons",
    category: "mounted",
    points: 80,
    defaultWargear: [
      { id: "lashing-tongue", name: "Lashing tongue", image: "" },
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skull-cannon",
    name: "Skull Cannon",
    faction: "chaos-daemons",
    category: "mounted",
    points: 95,
    defaultWargear: [
      { id: "skull-cannon", name: "Skull cannon", image: "" },
      { id: "attendants-hellblades", name: "Attendants' hellblades", image: "" },
      { id: "biting-maw", name: "Biting maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "bloodletters",
    name: "Bloodletters",
    faction: "chaos-daemons",
    category: "battleline",
    points: 110,
    defaultWargear: [
      { id: "hellblade", name: "Hellblade", image: "" },
    ],
    wargear: [],
    ledBy: ["bloodmaster","skulltaker"],
  },

  {
    id: "cultist-mob",
    name: "Cultist Mob",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    id: "daemonettes",
    name: "Daemonettes",
    faction: "chaos-daemons",
    category: "battleline",
    points: 100,
    defaultWargear: [
      { id: "slashing-claws", name: "Slashing claws", image: "" },
    ],
    wargear: [],
    ledBy: ["contorted-epitome","infernal-enrapturess","syll-esske","tranceweaver"],
  },

  {
    id: "legionaries",
    name: "Legionaries",
    faction: "chaos-daemons",
    category: "battleline",
    points: 90,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "havoc-autocannon", name: "Havoc autocannon", image: "" },
      { id: "heavy-bolter", name: "Heavy bolter", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "lascannon", name: "Lascannon", image: "" },
      { id: "missile-launcher-frag", name: "Missile launcher – frag", image: "" },
      { id: "missile-launcher-krak", name: "Missile launcher – krak", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "reaper-chaincannon", name: "Reaper chaincannon", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
      { id: "heavy-melee-weapon", name: "Heavy melee weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "nurglings",
    name: "Nurglings",
    faction: "chaos-daemons",
    category: "battleline",
    points: 40,
    modelCountOptions: [3, 6],
    pointsByModelCount: { 3: 40, 6: 70 },
    defaultWargear: [
      { id: "diseased-claws-and-teeth", name: "Diseased claws and teeth", image: "" },
    ],
    wargear: [],
    abilities: [
      {
        name: "Mischief Makers",
        description: "Each time an enemy unit (excluding TITANIC units) within Engagement Range of one or more units with this ability is selected to fight, until the end of the phase, each time a model in that enemy unit makes a melee attack, subtract 1 from the Hit roll.",
      },
    ],
    ledBy: [],
  },

  {
    id: "plaguebearers",
    name: "Plaguebearers",
    faction: "chaos-daemons",
    category: "battleline",
    points: 110,
    defaultWargear: [
      { id: "plaguesword", name: "Plaguesword", image: "" },
    ],
    wargear: [],
    ledBy: ["epidemius","poxbringer","sloppity-bilepiper","spoilpox-scrivener"],
  },

  {
    id: "accursed-cultists",
    name: "Accursed Cultists",
    faction: "chaos-daemons",
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
    id: "beasts-of-nurgle",
    name: "Beasts Of Nurgle",
    faction: "chaos-daemons",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "putrid-appendages", name: "Putrid appendages", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "blue-horrors",
    name: "Blue Horrors",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "coruscating-blue-flames", name: "Coruscating Blue Flames", image: "" },
      { id: "blue-claws", name: "Blue claws", image: "" },
    ],
    wargear: [
      { id: "coruscating-yellow-flames", name: "Coruscating Yellow Flames", image: "" },
      { id: "yellow-claws", name: "Yellow claws", image: "" },
    ],
    ledBy: ["changecaster","fluxmaster"],
  },

  {
    id: "chaos-terminator-squad",
    name: "Chaos Terminator Squad",
    faction: "chaos-daemons",
    category: "infantry",
    points: 180,
    defaultWargear: [
      { id: "combi-bolter", name: "Combi-bolter", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
    ],
    wargear: [
      { id: "heavy-flamer", name: "Heavy flamer", image: "" },
      { id: "reaper-autocannon", name: "Reaper autocannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "chosen",
    name: "Chosen",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "paired-accursed-weapons", name: "Paired accursed weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "dark-apostle",
    name: "Dark Apostle",
    faction: "chaos-daemons",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "accursed-crozius", name: "Accursed crozius", image: "" },
    ],
    wargear: [
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "dark-commune",
    name: "Dark Commune",
    faction: "chaos-daemons",
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
    id: "feculent-gnarlmaw",
    name: "Feculent Gnarlmaw",
    faction: "chaos-daemons",
    category: "infantry",
    points: 100,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "fellgor-beastmen",
    name: "Fellgor Beastmen",
    faction: "chaos-daemons",
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
    id: "fiends",
    name: "Fiends",
    faction: "chaos-daemons",
    category: "infantry",
    points: 110,
    defaultWargear: [
      { id: "barbed-tail-and-dissecting-claws", name: "Barbed tail and dissecting claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "flamers",
    name: "Flamers",
    faction: "chaos-daemons",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "flickering-flames", name: "Flickering Flames", image: "" },
      { id: "flamer-mouths", name: "Flamer mouths", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "flesh-hounds",
    name: "Flesh Hounds",
    faction: "chaos-daemons",
    category: "infantry",
    points: 75,
    defaultWargear: [
      { id: "burning-roar", name: "Burning roar", image: "" },
      { id: "gore-drenched-fangs", name: "Gore-drenched fangs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "furies",
    name: "Furies",
    faction: "chaos-daemons",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "daemonic-claws", name: "Daemonic claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "gellerpox-infected",
    name: "Gellerpox Infected",
    faction: "chaos-daemons",
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
    id: "havocs",
    name: "Havocs",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
    ],
    wargear: [
      { id: "boltgun", name: "Boltgun", image: "" },
      { id: "havoc-autocannon", name: "Havoc autocannon", image: "" },
      { id: "havoc-heavy-bolter", name: "Havoc heavy bolter", image: "" },
      { id: "havoc-lascannon", name: "Havoc lascannon", image: "" },
      { id: "havoc-missile-launcher-frag", name: "Havoc missile launcher – frag", image: "" },
      { id: "havoc-missile-launcher-krak", name: "Havoc missile launcher – krak", image: "" },
      { id: "havoc-reaper-chaincannon", name: "Havoc reaper chaincannon", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "plasma-gun-standard", name: "Plasma gun – standard", image: "" },
      { id: "plasma-gun-supercharge", name: "Plasma gun – supercharge", image: "" },
      { id: "plasma-pistol", name: "Plasma pistol", image: "", profiles: [{ profileName: "standard", range: '12"', attacks: "1", skill: "3+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }, { profileName: "supercharge", range: '12"', attacks: "1", skill: "3+", strength: "8", ap: "-3", damage: "2", keywords: ["PISTOL", "HAZARDOUS"] }] },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "mutoid-vermin",
    name: "Mutoid Vermin",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
    category: "infantry",
    points: 55,
    defaultWargear: [
      { id: "electro-goads", name: "Electro-goads", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "pink-horrors",
    name: "Pink Horrors",
    faction: "chaos-daemons",
    category: "infantry",
    points: 140,
    defaultWargear: [
      { id: "coruscating-pink-flames", name: "Coruscating Pink Flames", image: "" },
      { id: "pink-claws", name: "Pink claws", image: "" },
    ],
    wargear: [],
    ledBy: ["changecaster","fluxmaster"],
  },

  {
    id: "plague-toads",
    name: "Plague Toads",
    faction: "chaos-daemons",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "grasping-tongue", name: "Grasping tongue", image: "" },
      { id: "yawning-maw", name: "Yawning maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "possessed",
    name: "Possessed",
    faction: "chaos-daemons",
    category: "infantry",
    points: 120,
    defaultWargear: [
      { id: "hideous-mutations", name: "Hideous mutations", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "raptors",
    name: "Raptors",
    faction: "chaos-daemons",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "bolt-pistol", name: "Bolt pistol", image: "" },
      { id: "astartes-chainsword", name: "Astartes chainsword", image: "" },
    ],
    wargear: [
      { id: "flamer", name: "Flamer", image: "" },
      { id: "meltagun", name: "Meltagun", image: "" },
      { id: "accursed-weapon", name: "Accursed weapon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "power-fist", name: "Power fist", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "renegade-heavy-weapons-squad",
    name: "Renegade Heavy Weapons Squad",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
    category: "infantry",
    points: 95,
    defaultWargear: [
      { id: "ogryn-plague-claws", name: "Ogryn plague claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "screamers",
    name: "Screamers",
    faction: "chaos-daemons",
    category: "infantry",
    points: 80,
    defaultWargear: [
      { id: "lamprey-bite", name: "Lamprey bite", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "skull-altar",
    name: "Skull Altar",
    faction: "chaos-daemons",
    category: "infantry",
    points: 105,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "traitor-enforcer",
    name: "Traitor Enforcer",
    faction: "chaos-daemons",
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
    faction: "chaos-daemons",
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
    id: "warp-talons",
    name: "Warp Talons",
    faction: "chaos-daemons",
    category: "infantry",
    points: 125,
    defaultWargear: [
      { id: "warp-claws", name: "Warp claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "soul-grinder",
    name: "Soul Grinder",
    faction: "chaos-daemons",
    category: "vehicle",
    points: 180,
    defaultWargear: [
      { id: "harvester-cannon", name: "Harvester cannon", image: "" },
      { id: "iron-claw", name: "Iron claw", image: "" },
      { id: "warpsword", name: "Warpsword", image: "" },
    ],
    wargear: [
      { id: "torrent-of-burning-blood", name: "Torrent of burning blood", image: "" },
      { id: "phlegm-bombardment", name: "Phlegm bombardment", image: "" },
      { id: "scream-of-despair", name: "Scream of despair", image: "" },
      { id: "warp-gaze", name: "Warp gaze", image: "" },
      { id: "warpclaw", name: "Warpclaw", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "giant-chaos-spawn",
    name: "Giant Chaos Spawn",
    faction: "chaos-daemons",
    category: "monster",
    points: 130,
    defaultWargear: [
      { id: "churning-fangs-and-claws", name: "Churning fangs and claws", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "spined-chaos-beast",
    name: "Spined Chaos Beast",
    faction: "chaos-daemons",
    category: "monster",
    points: 145,
    defaultWargear: [
      { id: "jagged-claws-and-tusked-maw", name: "Jagged claws and tusked maw", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

];
