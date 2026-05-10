import type { Character } from "../../../src/types/warhammer";

export const orksCharacters: Character[] = [

  {
    id: "beastboss",
    name: "Beastboss",
    faction: "orks",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "shoota", name: "Shoota", image: "", profiles: [{ range: '18"', attacks: "3", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "beast-snagga-klaw", name: "Beast Snagga klaw", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["ANTI-MONSTER 4+", "ANTI-VEHICLE 4+"] }] },
      { id: "beastchoppa", name: "Beastchoppa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "beastboss-on-squigosaur",
    name: "Beastboss On Squigosaur",
    faction: "orks",
    image: "",
    points: 130,
    canAttachTo: [],
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "beastchoppa", name: "Beastchoppa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
      { id: "squigosaur-s-jaws", name: "Squigosaur's jaws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "4+", strength: "8", ap: "-2", damage: "D6" }] },
    ],
    wargear: [
      { id: "thump-gun", name: "Thump gun", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }] },
    ],
  },

  {
    id: "big-mek",
    name: "Big Mek",
    faction: "orks",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "", profiles: [{ range: '24"', attacks: "1", skill: "5+", strength: "8", ap: "-3", damage: "D6", keywords: ["HAZARDOUS"] }] },
      { id: "traktor-blasta", name: "Traktor blasta", image: "", profiles: [{ range: '36"', attacks: "2", skill: "5+", strength: "8", ap: "-2", damage: "3", keywords: ["ANTI-FLY 4+"] }] },
      { id: "drilla", name: "Drilla", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-3", damage: "2" }] },
    ],
  },

  {
    id: "big-mek-in-mega-armour",
    name: "Big Mek In Mega Armour",
    faction: "orks",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "kombi-weapon", name: "Kombi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "kustom-shoota", name: "Kustom shoota", image: "", profiles: [{ range: '18"', attacks: "4", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "tellyport-blasta", name: "Tellyport blasta", image: "", profiles: [{ range: '18"', attacks: "D3+1", skill: "5+", strength: "8", ap: "-2", damage: "3" }] },
      { id: "killsaw", name: "Killsaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-4", damage: "3" }] },
    ],
  },

  {
    id: "big-mek-on-warbike",
    name: "Big Mek On Warbike",
    faction: "orks",
    image: "",
    points: 105,
    canAttachTo: [],
    defaultWargear: [
      { id: "kustom-mega-slugga", name: "Kustom mega-slugga", image: "", profiles: [{ range: '12"', attacks: "1", skill: "5+", strength: "8", ap: "-3", damage: "D6", keywords: ["HAZARDOUS", "PISTOL"] }] },
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "twin-dakkagun", name: "Twin dakkagun", image: "", profiles: [{ range: '18"', attacks: "6", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "big-choppa", name: "Big choppa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
      { id: "choppa", name: "Choppa", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [
      { id: "kombi-weapon", name: "Kombi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "kustom-mega-blasta", name: "Kustom mega-blasta", image: "", profiles: [{ range: '24"', attacks: "1", skill: "5+", strength: "8", ap: "-3", damage: "D6", keywords: ["HAZARDOUS"] }] },
      { id: "rokkit-launcha", name: "Rokkit launcha", image: "", profiles: [{ range: '24"', attacks: "1", skill: "5+", strength: "9", ap: "-2", damage: "D3+3" }] },
      { id: "shokk-attack-gun", name: "Shokk attack gun", image: "", profiles: [{ range: '60"', attacks: "D6", skill: "4+", strength: "2D6", ap: "-5", damage: "D6", keywords: ["HAZARDOUS"] }] },
      { id: "killsaw", name: "Killsaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-4", damage: "3" }] },
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "big-mek-with-kustom-force-field",
    name: "Big Mek With Kustom Force Field",
    faction: "orks",
    image: "",
    points: 55,
    canAttachTo: [],
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "choppa", name: "Choppa", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "big-mek-with-shokk-attack-gun",
    name: "Big Mek With Shokk Attack Gun",
    faction: "orks",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "shokk-attack-gun", name: "Shokk attack gun", image: "", profiles: [{ range: '60"', attacks: "D6", skill: "4+", strength: "2D6", ap: "-5", damage: "D6", keywords: ["HAZARDOUS"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "boss-snikrot",
    name: "Boss Snikrot",
    faction: "orks",
    image: "",
    points: 95,
    canAttachTo: [],
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "mork-s-teeth", name: "Mork's Teeth", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "6", ap: "-1", damage: "2", keywords: ["SUSTAINED HITS 1"] }] },
    ],
    wargear: [],
  },

  {
    id: "boss-zagstruk",
    name: "Boss Zagstruk",
    faction: "orks",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "da-vulcha-s-klaws-and-choppa", name: "Da Vulcha's Klaws and choppa", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "da-red-gobbo-s-surprise",
    name: "Da Red Gobbo S Surprise",
    faction: "orks",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "kustom-grot-blasta", name: "Kustom grot blasta", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "2", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "da-red-gobbo-with-icon-of-da-revolushun",
    name: "Da Red Gobbo With Icon Of Da Revolushun",
    faction: "orks",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "kustom-grot-blasta", name: "Kustom grot blasta", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "icon-of-da-revolushun", name: "Icon of da Revolushun", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "deffkilla-wartrike",
    name: "Deffkilla Wartrike",
    faction: "orks",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "snagga-klaw", name: "Snagga klaw", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [
      { id: "boomstikks", name: "Boomstikks", image: "", profiles: [{ range: '12"', attacks: "4", skill: "5+", strength: "5", ap: "-1", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "killa-jet-burna", name: "Killa jet – burna", image: "", profiles: [{ range: '12"', attacks: "D6", skill: "N/A", strength: "5", ap: "-1", damage: "1", keywords: ["IGNORES COVER", "TORRENT"] }] },
      { id: "killa-jet-cutta", name: "Killa jet – cutta", image: "", profiles: [{ range: '12"', attacks: "3", skill: "5+", strength: "8", ap: "-4", damage: "D6" }] },
    ],
  },

  {
    id: "grotmas-gitz",
    name: "Grotmas Gitz",
    faction: "orks",
    image: "",
    points: 40,
    canAttachTo: [],
    defaultWargear: [
      { id: "bludgeoning-bag-of-gifts", name: "Bludgeoning bag of gifts", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "5+", strength: "3", ap: "0", damage: "1" }] },
      { id: "massive-gift-filled-gob", name: "Massive gift-filled gob", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "kaptin-badrukk",
    name: "Kaptin Badrukk",
    faction: "orks",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "da-rippa-standard", name: "Da Rippa – standard", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "7", ap: "-2", damage: "1", keywords: ["PISTOL"] }] },
      { id: "da-rippa-supercharge", name: "Da Rippa – supercharge", image: "", profiles: [{ range: '12"', attacks: "1", skill: "2+", strength: "8", ap: "-3", damage: "2", keywords: ["HAZARDOUS", "PISTOL"] }] },
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "choppa", name: "Choppa", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "mad-dok-grotsnik",
    name: "Mad Dok Grotsnik",
    faction: "orks",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
      { id: "urty-syringe", name: "'Urty syringe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["POISONED WEAPON 2+"] }] },
    ],
    wargear: [],
  },

  {
    id: "mek",
    name: "Mek",
    faction: "orks",
    image: "",
    points: 45,
    canAttachTo: [],
    defaultWargear: [
      { id: "kustom-mega-slugga", name: "Kustom mega-slugga", image: "", profiles: [{ range: '12"', attacks: "1", skill: "5+", strength: "8", ap: "-3", damage: "D6", keywords: ["HAZARDOUS", "PISTOL"] }] },
      { id: "wrench", name: "Wrench", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "6", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "killsaw", name: "Killsaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-4", damage: "3" }] },
    ],
  },

  {
    id: "mozrog-skragbad",
    name: "Mozrog Skragbad",
    faction: "orks",
    image: "",
    points: 165,
    canAttachTo: [],
    defaultWargear: [
      { id: "thump-gun", name: "Thump gun", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["BLAST"] }] },
      { id: "big-chompa-s-jaws", name: "Big Chompa's jaws", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "4+", strength: "10", ap: "-3", damage: "D6+1" }] },
      { id: "gutrippa", name: "Gutrippa", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "8", ap: "-2", damage: "3" }] },
    ],
    wargear: [],
  },

  {
    id: "nob-with-waaagh-banner",
    name: "Nob With Waaagh Banner",
    faction: "orks",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "kustom-shoota", name: "Kustom shoota", image: "", profiles: [{ range: '18"', attacks: "4", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["ASSAULT"] }] },
      { id: "waaagh-banner", name: "Waaagh! banner", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "6", ap: "-1", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "painboss",
    name: "Painboss",
    faction: "orks",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "beast-snagga-klaw", name: "Beast Snagga klaw", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "9", ap: "-2", damage: "3", keywords: ["ANTI-MONSTER 4+", "ANTI-VEHICLE 4+"] }] },
    ],
    wargear: [],
  },

  {
    id: "painboy",
    name: "Painboy",
    faction: "orks",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
      { id: "urty-syringe", name: "'Urty syringe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["POISONED WEAPON 2+"] }] },
    ],
    wargear: [],
  },

  {
    id: "painboy-on-warbike",
    name: "Painboy On Warbike",
    faction: "orks",
    image: "",
    points: 85,
    canAttachTo: [],
    defaultWargear: [
      { id: "twin-dakkagun", name: "Twin dakkagun", image: "", profiles: [{ range: '18"', attacks: "6", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
      { id: "urty-syringe", name: "'Urty syringe", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "3", ap: "0", damage: "1", keywords: ["POISONED WEAPON 2+"] }] },
    ],
    wargear: [
      { id: "killsaw", name: "Killsaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-4", damage: "3" }] },
    ],
  },

  {
    id: "ufthak-blackhawk",
    name: "Ufthak Blackhawk",
    faction: "orks",
    image: "",
    points: 70,
    canAttachTo: [],
    defaultWargear: [
      { id: "shokk-rifle", name: "Shokk rifle", image: "", profiles: [{ range: '36"', attacks: "1", skill: "3+", strength: "12", ap: "-4", damage: "D6+1" }] },
      { id: "princess-jaws", name: "Princess' jaws", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "4+", strength: "7", ap: "-2", damage: "D3" }] },
      { id: "snazzhammer", name: "Snazzhammer", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

  {
    id: "warboss",
    name: "Warboss",
    faction: "orks",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "kombi-weapon", name: "Kombi-weapon", image: "", profiles: [{ range: '24"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["RAPID FIRE 1"] }] },
      { id: "twin-slugga", name: "Twin slugga", image: "", profiles: [{ range: '12"', attacks: "4", skill: "4+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL", "TWIN-LINKED"] }] },
      { id: "big-choppa", name: "Big choppa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
    ],
    wargear: [
      { id: "attack-squig", name: "Attack squig", image: "", profiles: [{ range: "Melee", attacks: "2", skill: "4+", strength: "5", ap: "-1", damage: "1" }] },
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "warboss-in-mega-armour",
    name: "Warboss In Mega Armour",
    faction: "orks",
    image: "",
    points: 90,
    canAttachTo: [],
    defaultWargear: [
      { id: "big-shoota", name: "Big shoota", image: "", profiles: [{ range: '36"', attacks: "3", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["HEAVY"] }] },
      { id: "uge-choppa", name: "'Uge choppa", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "10", ap: "-2", damage: "D6" }] },
    ],
    wargear: [],
  },

  {
    id: "warboss-on-warbike",
    name: "Warboss On Warbike",
    faction: "orks",
    image: "",
    points: 75,
    canAttachTo: [],
    defaultWargear: [
      { id: "twin-dakkagun", name: "Twin dakkagun", image: "", profiles: [{ range: '18"', attacks: "6", skill: "5+", strength: "5", ap: "0", damage: "1", keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"] }] },
      { id: "killsaw", name: "Killsaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-4", damage: "3" }] },
    ],
    wargear: [
      { id: "big-choppa", name: "Big choppa", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "7", ap: "-1", damage: "2" }] },
      { id: "power-klaw", name: "Power klaw", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "3+", strength: "9", ap: "-2", damage: "3" }] },
    ],
  },

  {
    id: "weirdboy",
    name: "Weirdboy",
    faction: "orks",
    image: "",
    points: 65,
    canAttachTo: [],
    defaultWargear: [
      { id: "eadbanger", name: "'Eadbanger", image: "", profiles: [{ range: '18"', attacks: "D6", skill: "3+", strength: "6", ap: "-1", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "weirdboy-staff", name: "Weirdboy staff", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "5", ap: "-1", damage: "D3" }] },
    ],
    wargear: [],
  },

  {
    id: "wurrboy",
    name: "Wurrboy",
    faction: "orks",
    image: "",
    points: 60,
    canAttachTo: [],
    defaultWargear: [
      { id: "eyez-of-mork", name: "Eyez of Mork", image: "", profiles: [{ range: '18"', attacks: "D3", skill: "3+", strength: "6", ap: "-2", damage: "D3", keywords: ["PSYCHIC"] }] },
      { id: "close-combat-weapon", name: "Close combat weapon", image: "", profiles: [{ range: "Melee", attacks: "3", skill: "3+", strength: "4", ap: "0", damage: "1" }] },
    ],
    wargear: [],
  },

  {
    id: "zodgrod-wortsnagga",
    name: "Zodgrod Wortsnagga",
    faction: "orks",
    image: "",
    points: 80,
    canAttachTo: [],
    defaultWargear: [
      { id: "slugga", name: "Slugga", image: "", profiles: [{ range: '12"', attacks: "2", skill: "5+", strength: "4", ap: "0", damage: "1", keywords: ["PISTOL"] }] },
      { id: "da-grabzappa", name: "Da Grabzappa", image: "", profiles: [{ range: "Melee", attacks: "5", skill: "3+", strength: "7", ap: "-2", damage: "2" }] },
    ],
    wargear: [],
  },

];
