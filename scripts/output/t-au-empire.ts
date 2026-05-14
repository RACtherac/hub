import type { Unit } from "../../src/types/warhammer";

export const tAuEmpireUnits: Unit[] = [

  {
    id: "knarloc-riders",
    name: "Knarloc Riders",
    faction: "tau-empire",
    category: "mounted",
    points: 110,
    defaultWargear: [
      { id: "kroot-rifle", name: "Kroot rifle", image: "" },
      { id: "knarloc-beak-and-talons", name: "Knarloc beak and talons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "krootox-rampagers",
    name: "Krootox Rampagers",
    faction: "tau-empire",
    category: "mounted",
    points: 85,
    defaultWargear: [
      { id: "kroot-pistol-and-hunting-javelins", name: "Kroot pistol and hunting javelins", image: "" },
    ],
    wargear: [
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
      { id: "krootox-fists", name: "Krootox fists", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "krootox-riders",
    name: "Krootox Riders",
    faction: "tau-empire",
    category: "mounted",
    modelCountOptions: [1, 2, 3],
    pointsByModelCount: { 1: 40, 2: 60, 3: 90 },
    defaultWargear: [
      { id: "repeater-cannon", name: "Repeater cannon", image: "", profiles: [{ range: '36"', attacks: "2", skill: "4+", strength: "7", ap: "-1", damage: "2", keywords: ["RAPID FIRE 2"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
      { id: "krootox-fists", name: "Krootox fists", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
    ],
    abilities: [
      {
        name: "Kroot Packmates",
        description: "Once per turn, in your opponent's Shooting phase, when a friendly KROOT INFANTRY unit within 6\" of this unit is selected as the target of an attack, one unit from your army with this ability can use it. If it does, after that enemy unit has finished making its attacks, that unit with this ability can shoot as if it were your Shooting phase, but when resolving those attacks it can only target that enemy unit (and only if it is an eligible target).",
      },
    ],
    wargear: [
      { id: "tanglecannon", name: "Tanglecannon", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "4+", strength: "6", ap: "0", damage: "1", keywords: ["BLAST", "HEAVY"] }] },
    ],
    ledBy: [],
  },

  {
    id: "breacher-team",
    name: "Breacher Team",
    faction: "tau-empire",
    category: "battleline",
    points: 100,
    defaultWargear: [
      { id: "pulse-blaster", name: "Pulse blaster", image: "" },
      { id: "pulse-pistol", name: "Pulse pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["cadre-fireblade","ethereal"],
  },

  {
    id: "strike-team",
    name: "Strike Team",
    faction: "tau-empire",
    category: "battleline",
    points: 75,
    defaultWargear: [
      { id: "pulse-pistol", name: "Pulse pistol", image: "" },
      { id: "pulse-rifle", name: "Pulse rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: ["cadre-fireblade","ethereal"],
  },

  {
    id: "aun-va",
    name: "Aun Va",
    faction: "tau-empire",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "supreme-honour-blade", name: "Supreme honour blade", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "kroot-carnivores",
    name: "Kroot Carnivores",
    faction: "tau-empire",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "kroot-pistol", name: "Kroot pistol", image: "" },
      { id: "kroot-rifle", name: "Kroot rifle", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "tanglebomb-launcher", name: "Tanglebomb launcher", image: "" },
      { id: "kroot-carbine", name: "Kroot carbine", image: "" },
    ],
    ledBy: ["kroot-flesh-shaper","kroot-trail-shaper","kroot-war-shaper"],
  },

  {
    id: "kroot-farstalkers",
    name: "Kroot Farstalkers",
    faction: "tau-empire",
    category: "infantry",
    points: 85,
    defaultWargear: [
      { id: "farstalker-firearm", name: "Farstalker firearm", image: "" },
      { id: "kroot-pistol", name: "Kroot pistol", image: "" },
      { id: "ritual-blade", name: "Ritual blade", image: "" },
    ],
    wargear: [
      { id: "dvorgite-skinner", name: "Dvorgite skinner", image: "" },
      { id: "londaxi-tribalest", name: "Londaxi tribalest", image: "" },
    ],
    ledBy: ["kroot-flesh-shaper","kroot-trail-shaper","kroot-war-shaper"],
  },

  {
    id: "kroot-hounds",
    name: "Kroot Hounds",
    faction: "tau-empire",
    category: "infantry",
    points: 40,
    defaultWargear: [
      { id: "ripping-fangs", name: "Ripping fangs", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "pathfinder-team",
    name: "Pathfinder Team",
    faction: "tau-empire",
    category: "infantry",
    points: 90,
    defaultWargear: [
      { id: "pulse-carbine", name: "Pulse carbine", image: "" },
      { id: "pulse-pistol", name: "Pulse pistol", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [
      { id: "ion-rifle-standard", name: "Ion rifle – standard", image: "" },
      { id: "ion-rifle-overcharge", name: "Ion rifle – overcharge", image: "" },
      { id: "rail-rifle", name: "Rail rifle", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "remote-sensor-tower",
    name: "Remote Sensor Tower",
    faction: "tau-empire",
    category: "infantry",
    points: 50,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

  {
    id: "stealth-battlesuits",
    name: "Stealth Battlesuits",
    faction: "tau-empire",
    category: "infantry",
    points: 60,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tactical-drones",
    name: "Tactical Drones",
    faction: "tau-empire",
    category: "infantry",
    points: 70,
    defaultWargear: [
      { id: "twin-pulse-carbine", name: "Twin pulse carbine", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "vespid-stingwings",
    name: "Vespid Stingwings",
    faction: "tau-empire",
    category: "infantry",
    points: 65,
    defaultWargear: [
      { id: "neutron-blaster", name: "Neutron blaster", image: "" },
      { id: "stingwing-claws", name: "Stingwing claws", image: "" },
    ],
    wargear: [
      { id: "neutron-grenade-launcher", name: "Neutron grenade launcher", image: "" },
      { id: "neutron-rail-rifle", name: "Neutron rail rifle", image: "" },
      { id: "t-au-flamer", name: "T'au flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ax-1-0-tiger-shark",
    name: "AX 1 0 Tiger Shark",
    faction: "tau-empire",
    category: "vehicle",
    points: 315,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "twin-heavy-rail-cannon", name: "Twin heavy rail cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "cyclic-ion-blaster-standard", name: "Cyclic ion blaster – standard", image: "" },
      { id: "cyclic-ion-blaster-overcharge", name: "Cyclic ion blaster – overcharge", image: "" },
      { id: "seeker-missile", name: "Seeker missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "barracuda",
    name: "Barracuda",
    faction: "tau-empire",
    category: "vehicle",
    points: 220,
    defaultWargear: [
      { id: "long-barrelled-burst-cannon", name: "Long-barrelled burst cannon", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "swiftstrike-burst-cannon", name: "Swiftstrike burst cannon", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "ion-cannon-standard", name: "Ion cannon – standard", image: "" },
      { id: "ion-cannon-overcharge", name: "Ion cannon – overcharge", image: "" },
      { id: "swiftstrike-railgun", name: "Swiftstrike railgun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "broadside-battlesuits",
    name: "Broadside Battlesuits",
    faction: "tau-empire",
    category: "vehicle",
    points: 90,
    defaultWargear: [
      { id: "heavy-rail-rifle", name: "Heavy rail rifle", image: "" },
      { id: "crushing-bulk", name: "Crushing bulk", image: "" },
    ],
    wargear: [
      { id: "seeker-missile", name: "Seeker missile", image: "" },
      { id: "twin-plasma-rifle", name: "Twin plasma rifle", image: "" },
      { id: "twin-smart-missile-system", name: "Twin smart missile system", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "crisis-battlesuits",
    name: "Crisis Battlesuits",
    faction: "tau-empire",
    category: "vehicle",
    points: 200,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [
      { id: "airbursting-fragmentation-projector", name: "Airbursting fragmentation projector", image: "" },
      { id: "cyclic-ion-blaster-standard", name: "Cyclic ion blaster – standard", image: "" },
      { id: "cyclic-ion-blaster-overcharge", name: "Cyclic ion blaster – overcharge", image: "" },
      { id: "fusion-blaster", name: "Fusion blaster", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "plasma-rifle", name: "Plasma rifle", image: "" },
      { id: "t-au-flamer", name: "T'au flamer", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "crisis-fireknife-battlesuits",
    name: "Crisis Fireknife Battlesuits",
    faction: "tau-empire",
    category: "vehicle",
    points: 130,
    defaultWargear: [
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "plasma-rifle", name: "Plasma rifle", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [],
    ledBy: ["commander-farsight","commander-in-coldstar-battlesuit","commander-in-enforcer-battlesuit"],
  },

  {
    id: "crisis-starscythe-battlesuits",
    name: "Crisis Starscythe Battlesuits",
    faction: "tau-empire",
    category: "vehicle",
    points: 110,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "t-au-flamer", name: "T'au flamer", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [],
    ledBy: ["commander-farsight","commander-in-coldstar-battlesuit","commander-in-enforcer-battlesuit"],
  },

  {
    id: "crisis-sunforge-battlesuits",
    name: "Crisis Sunforge Battlesuits",
    faction: "tau-empire",
    category: "vehicle",
    points: 150,
    defaultWargear: [
      { id: "fusion-blaster", name: "Fusion blaster", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [],
    ledBy: ["commander-farsight","commander-in-coldstar-battlesuit","commander-in-enforcer-battlesuit"],
  },

  {
    id: "drone-sentry-turret",
    name: "Drone Sentry Turret",
    faction: "tau-empire",
    category: "vehicle",
    points: 50,
    defaultWargear: [
      { id: "twin-plasma-rifle", name: "Twin plasma rifle", image: "" },
    ],
    wargear: [
      { id: "twin-burst-cannon", name: "Twin burst cannon", image: "" },
      { id: "twin-fusion-blaster", name: "Twin fusion blaster", image: "" },
      { id: "twin-missile-pod", name: "Twin missile pod", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ghostkeel-battlesuit",
    name: "Ghostkeel Battlesuit",
    faction: "tau-empire",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "fusion-collider", name: "Fusion collider", image: "" },
      { id: "twin-t-au-flamer", name: "Twin T'au flamer", image: "" },
      { id: "ghostkeel-fists", name: "Ghostkeel fists", image: "" },
    ],
    wargear: [
      { id: "twin-burst-cannon", name: "Twin burst cannon", image: "" },
      { id: "twin-fusion-blaster", name: "Twin fusion blaster", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "hammerhead-gunship",
    name: "Hammerhead Gunship",
    faction: "tau-empire",
    category: "vehicle",
    points: 145,
    defaultWargear: [
      { id: "railgun", name: "Railgun", image: "" },
      { id: "twin-pulse-carbine", name: "Twin pulse carbine", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "accelerator-burst-cannon", name: "Accelerator burst cannon", image: "" },
      { id: "smart-missile-system", name: "Smart missile system", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "heavy-gun-drones",
    name: "Heavy Gun Drones",
    faction: "tau-empire",
    category: "vehicle",
    points: 45,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "twin-burst-cannon", name: "Twin burst cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "piranhas",
    name: "Piranhas",
    faction: "tau-empire",
    category: "vehicle",
    points: 60,
    defaultWargear: [
      { id: "piranha-burst-cannon", name: "Piranha burst cannon", image: "" },
      { id: "twin-pulse-carbine", name: "Twin pulse carbine", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "piranha-fusion-blaster", name: "Piranha fusion blaster", image: "" },
      { id: "seeker-missile", name: "Seeker missile", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "r-varna-battlesuit",
    name: "R Varna Battlesuit",
    faction: "tau-empire",
    category: "vehicle",
    points: 200,
    defaultWargear: [
      { id: "pulse-submunitions-cannon", name: "Pulse submunitions cannon", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "razorshark-strike-fighter",
    name: "Razorshark Strike Fighter",
    faction: "tau-empire",
    category: "vehicle",
    points: 170,
    defaultWargear: [
      { id: "accelerator-burst-cannon", name: "Accelerator burst cannon", image: "" },
      { id: "quad-ion-turret-standard", name: "Quad ion turret – standard", image: "" },
      { id: "quad-ion-turret-overcharge", name: "Quad ion turret – overcharge", image: "" },
      { id: "seeker-missile", name: "Seeker missile", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "missile-pod", name: "Missile pod", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "remora-stealth-drones",
    name: "Remora Stealth Drones",
    faction: "tau-empire",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "remora-seeker-missile", name: "Remora seeker missile", image: "" },
      { id: "twin-long-barrelled-burst-cannon", name: "Twin long-barrelled burst cannon", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "riptide-battlesuit",
    name: "Riptide Battlesuit",
    faction: "tau-empire",
    category: "vehicle",
    points: 190,
    defaultWargear: [
      { id: "heavy-burst-cannon", name: "Heavy burst cannon", image: "" },
      { id: "twin-plasma-rifle", name: "Twin plasma rifle", image: "" },
      { id: "riptide-fists", name: "Riptide fists", image: "" },
    ],
    wargear: [
      { id: "twin-fusion-blaster", name: "Twin fusion blaster", image: "" },
      { id: "twin-smart-missile-system", name: "Twin smart missile system", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sky-ray-gunship",
    name: "Sky Ray Gunship",
    faction: "tau-empire",
    category: "vehicle",
    points: 140,
    defaultWargear: [
      { id: "seeker-missile-rack", name: "Seeker missile rack", image: "" },
      { id: "twin-pulse-carbine", name: "Twin pulse carbine", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "accelerator-burst-cannon", name: "Accelerator burst cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "stormsurge",
    name: "Stormsurge",
    faction: "tau-empire",
    category: "vehicle",
    points: 400,
    defaultWargear: [
      { id: "cluster-rocket-system", name: "Cluster rocket system", image: "" },
      { id: "destroyer-missiles", name: "Destroyer missiles", image: "" },
      { id: "pulse-driver-cannon", name: "Pulse driver cannon", image: "" },
      { id: "twin-smart-missile-system", name: "Twin smart missile system", image: "" },
      { id: "twin-t-au-flamer", name: "Twin T'au flamer", image: "" },
      { id: "thunderous-footfalls", name: "Thunderous footfalls", image: "" },
    ],
    wargear: [
      { id: "twin-airbursting-fragmentation-projector", name: "Twin airbursting fragmentation projector", image: "" },
      { id: "twin-burst-cannon", name: "Twin burst cannon", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "sun-shark-bomber",
    name: "Sun Shark Bomber",
    faction: "tau-empire",
    category: "vehicle",
    points: 160,
    defaultWargear: [
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "twin-missile-pod", name: "Twin missile pod", image: "" },
      { id: "seeker-missile", name: "Seeker missile", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "twin-ion-rifle-standard", name: "Twin ion rifle – standard", image: "" },
      { id: "twin-ion-rifle-overcharge", name: "Twin ion rifle – overcharge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "ta-unar-supremacy-armour",
    name: "Ta Unar Supremacy Armour",
    faction: "tau-empire",
    category: "vehicle",
    points: 790,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "fusion-eradicator", name: "Fusion eradicator", image: "" },
      { id: "pulse-ordnance-driver", name: "Pulse ordnance driver", image: "" },
      { id: "smart-missile-system", name: "Smart missile system", image: "" },
      { id: "tri-axis-ion-cannon-standard", name: "Tri-axis ion cannon – standard", image: "" },
      { id: "tri-axis-ion-cannon-supercharge", name: "Tri-axis ion cannon – supercharge", image: "" },
      { id: "crushing-feet", name: "Crushing feet", image: "" },
    ],
    wargear: [
      { id: "fragmentation-cluster-shell-launcher", name: "Fragmentation cluster shell launcher", image: "" },
      { id: "heavy-rail-cannon-array", name: "Heavy rail cannon array", image: "" },
      { id: "nexus-missile-launcher", name: "Nexus missile launcher", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tetras",
    name: "Tetras",
    faction: "tau-empire",
    category: "vehicle",
    points: 80,
    defaultWargear: [
      { id: "pulse-rifle", name: "Pulse rifle", image: "" },
      { id: "close-combat-weapons", name: "Close combat weapons", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tiger-shark",
    name: "Tiger Shark",
    faction: "tau-empire",
    category: "vehicle",
    points: 325,
    defaultWargear: [
      { id: "burst-cannon", name: "Burst cannon", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "swiftstrike-burst-cannon", name: "Swiftstrike burst cannon", image: "" },
      { id: "swiftstrike-railgun", name: "Swiftstrike railgun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "tx42-piranha",
    name: "Tx42 Piranha",
    faction: "tau-empire",
    category: "vehicle",
    points: 60,
    defaultWargear: [
      { id: "plasma-rifle", name: "Plasma rifle", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "fusion-blaster", name: "Fusion blaster", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "rail-rifle", name: "Rail rifle", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "xv9-hazard-battlesuits",
    name: "Xv9 Hazard Battlesuits",
    faction: "tau-empire",
    category: "vehicle",
    points: 55,
    defaultWargear: [
      { id: "fusion-cascade", name: "Fusion cascade", image: "" },
      { id: "twin-hazard-burst-cannon", name: "Twin hazard burst cannon", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [
      { id: "phased-ion-gun", name: "Phased ion gun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "y-vahra-battlesuit",
    name: "Y Vahra Battlesuit",
    faction: "tau-empire",
    category: "vehicle",
    points: 210,
    defaultWargear: [
      { id: "flechette-pod", name: "Flechette pod", image: "" },
      { id: "ionic-discharge-cannon-standard", name: "Ionic discharge cannon – standard", image: "" },
      { id: "ionic-discharge-cannon-overcharge", name: "Ionic discharge cannon – overcharge", image: "" },
      { id: "phased-plasma-flamer", name: "Phased plasma-flamer", image: "" },
      { id: "battlesuit-fists", name: "Battlesuit fists", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "great-knarloc",
    name: "Great Knarloc",
    faction: "tau-empire",
    category: "monster",
    points: 100,
    defaultWargear: [
      { id: "great-knarloc-beak-and-talons", name: "Great Knarloc beak and talons", image: "" },
    ],
    wargear: [
      { id: "kroot-bolt-thrower", name: "Kroot bolt thrower", image: "" },
      { id: "kroot-rifle", name: "Kroot rifle", image: "" },
      { id: "twin-kroot-gun", name: "Twin Kroot gun", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "devilfish",
    name: "Devilfish",
    faction: "tau-empire",
    category: "transport",
    points: 85,
    defaultWargear: [
      { id: "accelerator-burst-cannon", name: "Accelerator burst cannon", image: "" },
      { id: "twin-pulse-carbine", name: "Twin pulse carbine", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "seeker-missile", name: "Seeker missile", image: "" },
      { id: "smart-missile-system", name: "Smart missile system", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "manta",
    name: "Manta",
    faction: "tau-empire",
    category: "transport",
    points: 2100,
    defaultWargear: [
      { id: "heavy-rail-cannon", name: "Heavy rail cannon", image: "" },
      { id: "long-barrelled-burst-cannon-array", name: "Long-barrelled burst cannon array", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "seeker-missile", name: "Seeker missile", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "ion-cannon-standard", name: "Ion cannon – standard", image: "" },
      { id: "ion-cannon-overcharge", name: "Ion cannon – overcharge", image: "" },
    ],
    ledBy: [],
  },

  {
    id: "orca-dropship",
    name: "Orca Dropship",
    faction: "tau-empire",
    category: "transport",
    points: 275,
    defaultWargear: [
      { id: "long-barrelled-burst-cannon", name: "Long-barrelled burst cannon", image: "" },
      { id: "missile-pod", name: "Missile pod", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tidewall-droneport",
    name: "Tidewall Droneport",
    faction: "tau-empire",
    category: "transport",
    points: 85,
    defaultWargear: [
      { id: "drone-defenders", name: "Drone defenders", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tidewall-gunrig",
    name: "Tidewall Gunrig",
    faction: "tau-empire",
    category: "transport",
    points: 90,
    defaultWargear: [
      { id: "supremacy-railgun", name: "Supremacy railgun", image: "" },
    ],
    wargear: [],
    ledBy: [],
  },

  {
    id: "tidewall-shieldline",
    name: "Tidewall Shieldline",
    faction: "tau-empire",
    category: "transport",
    points: 85,
    defaultWargear: [],
    wargear: [],
    ledBy: [],
  },

];
