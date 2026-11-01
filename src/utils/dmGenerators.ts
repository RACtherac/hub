// =====================================
// DM Screen: random location generator
// =====================================
//
// Fills in a location sheet one field at a time or all at once. Fantasy but
// system-neutral. Every function takes `random` so tests can pin the result.

export type Random = () => number;

export const LOCATION_KINDS = [
    "Village", "Town", "City", "Tavern", "Temple", "Keep", "Ruins", "Dungeon", "Cave", "Forest",
] as const;

export type LocationField = "name" | "kind" | "description" | "feature" | "npc" | "rumour" | "danger";

const pick = <T,>(list: readonly T[], random: Random): T => list[Math.floor(random() * list.length) % list.length];

type Group = "settlement" | "tavern" | "temple" | "keep" | "ruin" | "wild";

function groupOf(kind: string): Group {
    switch (kind.toLowerCase()) {
        case "village": case "town": case "city": return "settlement";
        case "tavern": return "tavern";
        case "temple": return "temple";
        case "keep": return "keep";
        case "ruins": case "dungeon": case "cave": return "ruin";
        case "forest": return "wild";
        default: return "settlement";
    }
}

// ---------- Tables ----------

const PLACE_START = ["Oak", "Ash", "Raven", "Stone", "Mill", "Black", "Elder", "Thorn", "Wolf", "Salt", "Cold", "Green", "Iron", "Fox", "Hollow", "Briar"];
const PLACE_END = ["ford", "wick", "brook", "haven", "moor", "stead", "field", "gate", "barrow", "mere", "crest", "dale", "watch", "hollow", "bridge", "well"];
const TAVERN_ADJ = ["Drunken", "Prancing", "Rusty", "Gilded", "Sleeping", "Laughing", "Crooked", "Wandering", "Golden", "Broken", "Jolly", "Silent"];
const TAVERN_NOUN = ["Griffon", "Pony", "Tankard", "Goose", "Dragon", "Barrel", "Lantern", "Stag", "Mermaid", "Kettle", "Boar", "Crown"];
const DEITY = ["the Dawn", "the Deep", "the Harvest", "the Silent Watcher", "the Storm", "the Lost", "the Forge", "the Moon", "Mercy", "the Hunt"];
const TEMPLE_KIND = ["Temple", "Shrine", "Chapel", "Sanctum", "Abbey", "Cathedral"];
const RUIN_NOUN = ["Tomb", "Halls", "Vault", "Catacombs", "Pit", "Crypt", "Warrens", "Sepulchre", "Spire", "Undercroft"];
const RUIN_OF = ["the Forgotten King", "Whispers", "the Hollow Saint", "Ash", "the Drowned", "Seven Bells", "the Last Light", "Bone", "the Serpent", "Endless Night"];
const WILD_ADJ = ["Whispering", "Weeping", "Tangled", "Misty", "Gloom", "Thornwood", "Silver", "Old", "Shadow", "Hushed"];
const WILD_NOUN = ["Wood", "Weald", "Thicket", "Grove", "Forest", "Wilds"];

const DESCRIPTIONS: Record<Group, string[]> = {
    settlement: [
        "Mud streets and thatched roofs huddle around a squat stone well.",
        "A walled market town that smells of bread, horses and wet wool.",
        "Tall timber houses lean over narrow lanes lit by oil lamps.",
        "A fishing settlement where nets dry on every fence and gulls never stop shrieking.",
        "A prosperous crossroads town, busy with carts and suspicious of strangers.",
        "Half the houses stand empty since the sickness; the rest keep their shutters closed.",
    ],
    tavern: [
        "Low beams, a roaring hearth and a floor sticky with spilled ale.",
        "A quiet, respectable inn where the landlady knows everyone's business.",
        "A rowdy dockside drinking hole with more knife scars on the tables than carvings.",
        "A cosy roadside inn with a crooked sign and a cat that sleeps on the bar.",
        "Smoky and dim, with private booths curtained off at the back.",
    ],
    temple: [
        "Cold marble, flickering candles and the echo of a distant choir.",
        "A small whitewashed shrine kept spotless by a single devoted keeper.",
        "Once grand, now crumbling; pilgrims still leave offerings at the cracked altar.",
        "Incense hangs thick in the air beneath a painted dome of stars.",
    ],
    keep: [
        "A grim square tower on a hill, its banners faded by wind and rain.",
        "A well-kept fortress with fresh mortar and nervous guards on the walls.",
        "An old border keep, half garrison and half farm, with chickens in the bailey.",
        "Its gate is barred at sunset, and the lord has not been seen in weeks.",
    ],
    ruin: [
        "Collapsed arches lead down into darkness that smells of damp earth and old bones.",
        "Water drips through cracked ceilings onto carvings worn smooth by centuries.",
        "Strange symbols are scratched into every doorway, some of them recent.",
        "The air is unnaturally still, and torches burn with a faint green tinge.",
        "Roots have broken through the walls, and something has been nesting here.",
    ],
    wild: [
        "Ancient trees crowd the path, and birdsong stops whenever you stop walking.",
        "Fog pools between the trunks long after the sun is up.",
        "A sunlit forest of birch and fern, deceptively peaceful.",
        "The canopy is so thick it is dusk at noon, and the trails keep changing.",
    ],
};

const FEATURES: Record<Group, string[]> = {
    settlement: [
        "A statue of a forgotten hero with its face chiselled off.",
        "A gallows in the square, recently used.",
        "A huge old oak where villagers pin wishes and grievances.",
        "A bell tower whose bell rings by itself at midnight.",
        "A weekly market that draws traders from three valleys.",
    ],
    tavern: [
        "A notice board crowded with bounties, one of them for a party member.",
        "A stuffed owlbear head above the fireplace.",
        "A locked cellar door nobody will talk about.",
        "A famous stew that has been simmering for twelve years.",
        "A bard who only sings songs about things that haven't happened yet.",
    ],
    temple: [
        "A relic in a glass case that weeps on holy days.",
        "A vault beneath the altar, sealed with the high priest's ring.",
        "A healing spring in the courtyard, guarded day and night.",
        "Murals that seem to change slightly each time you look.",
    ],
    keep: [
        "A dungeon with one occupied cell.",
        "An armoury missing a dozen swords.",
        "A secret passage behind the chapel tapestry.",
        "A rookery of messenger ravens, one of them always missing.",
    ],
    ruin: [
        "A sealed door with a riddle carved above it.",
        "A collapsed shaft leading to a lower level.",
        "A throne room with an empty throne and fresh footprints.",
        "A flooded chamber with something glinting at the bottom.",
        "A mural depicting the party, painted centuries ago.",
    ],
    wild: [
        "A ring of standing stones that hums at dusk.",
        "A hollow tree big enough to camp inside.",
        "A woodcutter's hut, abandoned with a meal still on the table.",
        "A clear pool where reflections don't quite match.",
    ],
};

const NPC_FIRST = ["Mira", "Oswin", "Brenna", "Tobias", "Ysolde", "Garrick", "Petra", "Alder", "Sefa", "Corwin", "Nell", "Rurik", "Ilsa", "Bram"];
const NPC_ROLE: Record<Group, string[]> = {
    settlement: ["the reeve", "a gossiping baker", "the blacksmith", "a retired soldier", "the herbalist", "a nervous merchant"],
    tavern: ["the innkeeper", "a one-eyed regular", "a travelling bard", "the cook", "a card sharp", "a barmaid with a secret"],
    temple: ["the high priest", "a young acolyte", "a weary pilgrim", "the temple archivist", "a penitent knight"],
    keep: ["the castellan", "the captain of the guard", "the lord's steward", "a disgraced squire", "the court wizard"],
    ruin: ["a lost explorer", "a ghost who doesn't know it's dead", "a goblin scavenger", "a treasure hunter", "a hermit scholar"],
    wild: ["a hunter", "a druid", "a lost child", "a poacher", "a talking fox", "a ranger"],
};
const NPC_TRAIT = [
    "who wants the party gone by nightfall",
    "who owes money to the wrong people",
    "who knows more than they let on",
    "who mistakes one of the party for someone else",
    "who is desperate for help and too proud to ask",
    "who is secretly working for the villain",
    "who will trade information for a favour",
    "who is hiding a wounded friend",
];

const RUMOURS = [
    "Lights have been seen moving at night where nobody should be.",
    "Someone important disappeared here a week ago, and nobody is searching.",
    "There's treasure buried here, if you believe the old songs.",
    "A stranger paid in ancient coins and left before dawn.",
    "The well water has started to taste of iron.",
    "Wolves have been taking livestock, but they leave no tracks.",
    "A noble family is quietly buying up every building.",
    "The old map in the archive shows a door that isn't there anymore.",
    "A merchant swears a statue moved when nobody was looking.",
    "The dead from the last battle were never properly buried.",
];

const DANGERS: Record<Group, string[]> = {
    settlement: ["Pickpockets and a corrupt watch.", "A smuggling ring that doesn't like questions.", "Plague in the lower quarter.", "A local lord's enforcers."],
    tavern: ["A bar brawl waiting to happen.", "Drugged drinks for the unwary.", "A bounty hunter watching the door.", "A cursed item in the lost-and-found."],
    temple: ["A zealous inquisitor.", "A possessed worshipper.", "Traps guarding the reliquary.", "A cult hiding among the faithful."],
    keep: ["Archers on the walls.", "A traitor inside the garrison.", "Something in the dungeon is getting out.", "A lord quick to accuse strangers."],
    ruin: ["Collapsing floors.", "Undead that wake at the sound of metal.", "A nest of giant spiders.", "Poison-gas traps.", "A guardian construct that still follows orders."],
    wild: ["Wolves that hunt in silence.", "Fey who take a toll in memories.", "Quicksand along the stream.", "A territorial owlbear.", "Bandits using the old trail."],
};

// ---------- Generating ----------

export function generateName(kind: string, random: Random = Math.random): string {
    switch (groupOf(kind)) {
        case "tavern": return `The ${pick(TAVERN_ADJ, random)} ${pick(TAVERN_NOUN, random)}`;
        case "temple": return `${pick(TEMPLE_KIND, random)} of ${pick(DEITY, random)}`;
        case "keep": return `${pick(PLACE_START, random)}${pick(PLACE_END, random)} Keep`;
        case "ruin": return `The ${pick(RUIN_NOUN, random)} of ${pick(RUIN_OF, random)}`;
        case "wild": return `The ${pick(WILD_ADJ, random)} ${pick(WILD_NOUN, random)}`;
        default: return `${pick(PLACE_START, random)}${pick(PLACE_END, random)}`;
    }
}

// One field for a location of this kind.
export function generateField(field: LocationField, kind: string, random: Random = Math.random): string {
    const group = groupOf(kind);
    switch (field) {
        case "name": return generateName(kind, random);
        case "kind": return pick(LOCATION_KINDS, random);
        case "description": return pick(DESCRIPTIONS[group], random);
        case "feature": return pick(FEATURES[group], random);
        case "npc": return `${pick(NPC_FIRST, random)}, ${pick(NPC_ROLE[group], random)}, ${pick(NPC_TRAIT, random)}.`;
        case "rumour": return pick(RUMOURS, random);
        case "danger": return pick(DANGERS[group], random);
    }
}

// A whole location. Keeps the given kind, or picks one.
export function generateLocation(kind = "", random: Random = Math.random): Record<LocationField, string> {
    const chosen = kind || pick(LOCATION_KINDS, random);
    return {
        kind: chosen,
        name: generateName(chosen, random),
        description: generateField("description", chosen, random),
        feature: generateField("feature", chosen, random),
        npc: generateField("npc", chosen, random),
        rumour: generateField("rumour", chosen, random),
        danger: generateField("danger", chosen, random),
    };
}
