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
    points: 160,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "big-choppa", name: "Big Choppa", image: "" },
    ],
    wargear: [
      { id: "saddlegit-weapons", name: "Saddlegit weapons", image: "" },
      { id: "stikka", name: "Stikka", image: "" },
      { id: "squighog-jaws-and-saddlegits", name: "Squighog jaws and saddlegits", image: "" },
    ],
    ledBy: ["beastboss-on-squigosaur","mozrog-skragbad"],
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
    points: 95,
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "" },
      { id: "power-snappa", name: "Power snappa", image: "" },
    ],
    wargear: [
      { id: "thump-gun", name: "Thump gun", image: "" },
      { id: "choppa", name: "Choppa", image: "" },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "" },
    ],
    ledBy: ["beastboss","painboss","wurrboy"],
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
    points: 235,
    defaultWargear: [
      { id: "mork-s-roar", name: "Mork's Roar", image: "" },
      { id: "gork-s-klaw-strike", name: "Gork's Klaw - strike", image: "" },
      { id: "gork-s-klaw-sweep", name: "Gork's Klaw - sweep", image: "" },
    ],
    wargear: [
      { id: "makari-s-stabba", name: "Makari's stabba", image: "" },
    ],
    ledBy: [],
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
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "twin-supa-shoota", name: "Twin supa-shoota", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [
      { id: "skorcha-missile-rack", name: "Skorcha missile rack", image: "" },
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
      { id: "twin-supa-shoota", name: "Twin supa-shoota", image: "" },
      { id: "armoured-hull", name: "Armoured hull", image: "" },
    ],
    wargear: [],
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
    points: 125,
    defaultWargear: [
      { id: "kan-shoota", name: "Kan shoota", image: "" },
      { id: "kan-klaw", name: "Kan klaw", image: "" },
    ],
    wargear: [
      { id: "grotzooka", name: "Grotzooka", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
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
    points: 100,
    defaultWargear: [
      { id: "s", name: "S", image: "" },
      { id: "grot-crew", name: "Grot crew", image: "" },
    ],
    wargear: [],
    ledBy: ["big-mek","big-mek-with-shokk-attack-gun","mek"],
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
    points: 100,
    defaultWargear: [
      { id: "sawn-off-shotgun", name: "Sawn-off shotgun", image: "" },
      { id: "squig-launchas", name: "Squig launchas", image: "" },
      { id: "saw-blades", name: "Saw blades", image: "" },
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
    defaultWargear: [
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "" },
      { id: "kustom-mega-zappa", name: "Kustom mega-zappa", image: "" },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "klaw-of-mork-strike", name: "Klaw of Mork – strike", image: "" },
      { id: "klaw-of-mork-sweep", name: "Klaw of Mork – sweep", image: "" },
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
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "" },
      { id: "deffkannon", name: "Deffkannon", image: "" },
      { id: "skorcha", name: "Skorcha", image: "" },
      { id: "supa-gatler", name: "Supa-gatler", image: "" },
      { id: "supa-rokkits", name: "Supa-rokkits", image: "" },
      { id: "twin-big-shoota", name: "Twin big shoota", image: "" },
      { id: "mega-choppa-strike", name: "Mega-choppa – strike", image: "" },
      { id: "mega-choppa-sweep", name: "Mega-choppa – sweep", image: "" },
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
