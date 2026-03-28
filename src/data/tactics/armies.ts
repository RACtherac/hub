export interface TacticsUnit {
  id: string;
  name: string;
  description: string;
  portrait: string;
  hp: number;
  move: number;
  attack: number;
  range: number;
}

export interface Army {
  id: string;
  name: string;
  description: string;
  lore: string;
  color: string;
  emoji: string;
  units: TacticsUnit[];
}

export const ARMIES: Army[] = [
  {
    id: "iron-bastion",
    name: "Iron Bastion",
    description: "Armored defenders who hold the line at any cost.",
    lore: "Forged in the mountain foundries of Keldrath, the Iron Bastion are living fortresses — slow to advance, impossible to break.",
    color: "#3a5a8a",
    emoji: "⚙️",
    units: [
      { id: "ironclad",      name: "Ironclad",      portrait: "🤖", description: "A walking fortress. Slow but nearly indestructible.",        hp: 8, move: 1, attack: 4, range: 1 },
      { id: "warden",        name: "Warden",        portrait: "🛡️", description: "Balanced frontline warrior, backbone of the Bastion.",       hp: 5, move: 2, attack: 3, range: 1 },
      { id: "siege-breaker", name: "Siege Breaker", portrait: "🔨", description: "Devastating hammer strikes that shatter anything.",           hp: 6, move: 1, attack: 5, range: 1 },
      { id: "bombadier",     name: "Bombadier",     portrait: "💣", description: "Lobs explosives from a safe distance.",                      hp: 3, move: 2, attack: 3, range: 3 },
      { id: "bastion-scout", name: "Scout",         portrait: "🎯", description: "Lightly armored but swift. Spots weaknesses in enemy lines.", hp: 3, move: 4, attack: 2, range: 1 },
      { id: "rifleman",      name: "Rifleman",      portrait: "🔫", description: "Disciplined marksman with pinpoint accuracy.",               hp: 4, move: 2, attack: 3, range: 2 },
    ],
  },
  {
    id: "ember-wolves",
    name: "Ember Wolves",
    description: "Fast raiders who strike hard and vanish into smoke.",
    lore: "Children of the Ashfields, the Ember Wolves fight with primal fury. Where they run, everything burns.",
    color: "#a83220",
    emoji: "🔥",
    units: [
      { id: "pack-runner",    name: "Pack Runner",    portrait: "🐺", description: "Fastest unit on the field — hunts in packs.",             hp: 3, move: 4, attack: 2, range: 1 },
      { id: "fire-dancer",    name: "Fire Dancer",    portrait: "🔥", description: "Agile warrior who weaves through enemy formations.",       hp: 4, move: 3, attack: 3, range: 1 },
      { id: "ash-stalker",    name: "Ash Stalker",    portrait: "🏹", description: "Patient sniper who picks off targets from the shadows.",   hp: 3, move: 2, attack: 4, range: 3 },
      { id: "blaze-rider",    name: "Blaze Rider",    portrait: "⚡", description: "Mounted raider, fast and brutally hard-hitting.",          hp: 4, move: 4, attack: 3, range: 1 },
      { id: "ember-shaman",   name: "Ember Shaman",   portrait: "🌋", description: "Calls fire spirits to scorch the earth.",                 hp: 4, move: 2, attack: 2, range: 2 },
      { id: "hellhound",      name: "Hellhound",      portrait: "🐉", description: "A massive war-beast feared by even the bravest soldiers.", hp: 6, move: 3, attack: 4, range: 1 },
    ],
  },
  {
    id: "void-syndicate",
    name: "Void Syndicate",
    description: "Enigmatic beings wielding technology beyond understanding.",
    lore: "They arrived through tears in reality itself. The Void Syndicate do not conquer land — they consume it.",
    color: "#5a2080",
    emoji: "🌀",
    units: [
      { id: "drifter",       name: "Drifter",       portrait: "👁️", description: "Phases in and out of reality. Medium range disruptor.",   hp: 3, move: 3, attack: 2, range: 2 },
      { id: "nullwalker",    name: "Nullwalker",    portrait: "🦾", description: "Unstoppable construct that crushes everything it touches.", hp: 7, move: 1, attack: 5, range: 1 },
      { id: "shade-drone",   name: "Shade Drone",   portrait: "🦟", description: "Tiny, almost invisible, and terrifyingly fast.",          hp: 2, move: 5, attack: 2, range: 1 },
      { id: "rift-caller",   name: "Rift Caller",   portrait: "🌀", description: "Tears open rifts to blast foes across the battlefield.",  hp: 4, move: 2, attack: 4, range: 3 },
      { id: "phase-captain", name: "Phase Captain", portrait: "⭐", description: "Versatile commander who leads the Syndicate vanguard.",   hp: 5, move: 3, attack: 3, range: 1 },
      { id: "void-reaper",   name: "Void Reaper",   portrait: "☄️", description: "Silent and lethal. Leaves nothing standing.",            hp: 5, move: 2, attack: 5, range: 1 },
    ],
  },
  {
    id: "bone-court",
    name: "Bone Court",
    description: "Undying warriors who feel no pain and fear no death.",
    lore: "Once a proud kingdom, now risen in skeletal fury. The Bone Court does not retreat — the dead have no reason to.",
    color: "#4a5a6a",
    emoji: "💀",
    units: [
      { id: "skeleton-spear", name: "Skeleton Spear", portrait: "💀", description: "Expendable but fast. Endless waves of ancient soldiers.", hp: 2, move: 4, attack: 2, range: 1 },
      { id: "death-knight",   name: "Death Knight",   portrait: "⚔️", description: "Ancient warrior bound by dark magic. Near-unstoppable.", hp: 7, move: 2, attack: 4, range: 1 },
      { id: "shade",          name: "Shade",          portrait: "👻", description: "A wraith drifting across the battlefield unseen.",        hp: 3, move: 3, attack: 3, range: 1 },
      { id: "revenant",       name: "Revenant",       portrait: "🌑", description: "A risen champion who returns angrier than before.",      hp: 5, move: 2, attack: 3, range: 2 },
      { id: "lich",           name: "Lich",           portrait: "🔮", description: "Master of dark spells. Devastating range, fragile body.", hp: 3, move: 1, attack: 5, range: 3 },
      { id: "bone-giant",     name: "Bone Giant",     portrait: "🦴", description: "Towering monstrosity, assembled from the fallen.",       hp: 9, move: 1, attack: 4, range: 1 },
    ],
  },
  {
    id: "sky-wardens",
    name: "Sky Wardens",
    description: "Masters of the high ground, raining destruction from above.",
    lore: "They took the peaks a thousand years ago and have never come down. The Sky Wardens see all, and strike first.",
    color: "#187a6a",
    emoji: "🦅",
    units: [
      { id: "eagle-scout",   name: "Eagle Scout",   portrait: "🦅", description: "Lightning-fast aerial unit. Scouts far ahead.",            hp: 3, move: 5, attack: 2, range: 1 },
      { id: "storm-archer",  name: "Storm Archer",  portrait: "🌩️", description: "Precision ranged attacker. Deadly from elevated ground.",  hp: 3, move: 2, attack: 4, range: 3 },
      { id: "thunder-guard", name: "Thunder Guard", portrait: "⛈️", description: "Heavily armored sky warrior who holds the line.",          hp: 7, move: 2, attack: 3, range: 1 },
      { id: "wind-dancer",   name: "Wind Dancer",   portrait: "🌪️", description: "Acrobatic fighter who strikes from unexpected angles.",    hp: 4, move: 4, attack: 3, range: 1 },
      { id: "cloud-mage",    name: "Cloud Mage",    portrait: "☁️", description: "Fragile but utterly devastating at long range.",           hp: 3, move: 2, attack: 5, range: 3 },
      { id: "sky-warden",    name: "Sky Warden",    portrait: "🌟", description: "The balanced heart of the Warden forces.",                hp: 5, move: 3, attack: 3, range: 2 },
    ],
  },
];
