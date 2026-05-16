import type { Character } from "../../../types/warhammer";

export const tyranidsCharacters: Character[] = [

  {
    id: "hive-tyrant",
    name: "Hive Tyrant",
    image: "",
    points: 195,
    faction: "tyranids",
    canAttachTo: ["tyrant-guard"],
    abilities: [
      {
        name: "Will of the Hive Mind",
        description: "Once per battle round, one model from your army with this ability can use it when a friendly TYRANIDS unit within 12\" of that model is targeted with a Stratagem. If it does, reduce the CP cost of that usage of that Stratagem by 1CP.",
      },
      {
        name: "Onslaught (Aura, Psychic)",
        description: "While a friendly TYRANIDS unit is within 6\" of this model, ranged weapons equipped by models in that unit have the [ASSAULT] and [LETHAL HITS] abilities.",
      },
    ],
    wargearGroups: [
      ["tyrant-bonesword-lashwhip", "tyrant-hvc-1", "tyrant-stranglethorn-1", "tyrant-mst-1"],
      ["tyrant-mst-2", "tyrant-hvc-2", "tyrant-stranglethorn-2"],
    ],
    wargearSections: [
      { label: "Primary weapon (choose one)", ids: ["tyrant-bonesword-lashwhip", "tyrant-hvc-1", "tyrant-stranglethorn-1", "tyrant-mst-1"] },
      { label: "Secondary weapon (choose one)", ids: ["tyrant-mst-2", "tyrant-hvc-2", "tyrant-stranglethorn-2"] },
    ],
    wargear: [
      { id: "tyrant-bonesword-lashwhip", name: "Monstrous bonesword & lash whip", image: "", profiles: [{ range: "Melee", attacks: "6", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["TWIN-LINKED"] }] },
      { id: "tyrant-hvc-1", name: "Heavy venom cannon", image: "", profiles: [{ range: '36"', attacks: "D3", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] }] },
      { id: "tyrant-stranglethorn-1", name: "Stranglethorn cannon", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "2+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST"] }] },
      { id: "tyrant-mst-1", name: "Monstrous scything talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
      { id: "tyrant-mst-2", name: "Monstrous scything talons", image: "", profiles: [{ range: "Melee", attacks: "4", skill: "2+", strength: "7", ap: "-2", damage: "2", keywords: ["EXTRA ATTACKS"] }] },
      { id: "tyrant-hvc-2", name: "Heavy venom cannon", image: "", profiles: [{ range: '36"', attacks: "D3", skill: "2+", strength: "9", ap: "-2", damage: "3", keywords: ["BLAST"] }] },
      { id: "tyrant-stranglethorn-2", name: "Stranglethorn cannon", image: "", profiles: [{ range: '36"', attacks: "D6+1", skill: "2+", strength: "7", ap: "-1", damage: "2", keywords: ["BLAST"] }] },
    ],
  },

  {
    id: "broodlord",
    name: "Broodlord",
    image: "",
    points: 95,
    faction: "tyranids",
    canAttachTo: ["genestealers"],
    wargear: [
      { id: "broodlord-claws", name: "Monstrous Rending Claws", image: "", points: 0 },
    ],
  },

  {
    id: "neurotyrant",
    name: "Neurotyrant",
    image: "",
    points: 105,
    faction: "tyranids",
    canAttachTo: ["neurogaunts", "tyrant-guard", "zoanthropes"],
    wargear: [],
  },

  {
    id: "old-one-eye",
    name: "Old One Eye",
    image: "/Warhammerimages/Tyranids/old-one-eye.png",
    points: 95,
    faction: "tyranids",
    canAttachTo: ["carnifexes"],
    wargear: [
      { id: "one-eye-claws", name: "Crushing Claws", image: "", points: 0 },
    ],
  },

  {
    id: "norn-emissary",
    name: "Norn Emissary",
    image: "",
    points: 210,
    faction: "tyranids",
    canAttachTo: ["tyranid-warriors", "hive-guard"],
    wargear: [],
  },

  {
    id: "the-swarmlord",
    name: "The Swarmlord",
    image: "",
    points: 220,
    faction: "tyranids",
    canAttachTo: ["tyrant-guard"],
    abilities: [
      {
        name: "Hive Commander",
        description: "At the start of your Command phase, if this model is on the battlefield, you gain 1CP.",
      },
      {
        name: "Malign Presence (Aura)",
        description: "If this model is your WARLORD, each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12\" of this model, increase the cost of that use of that Stratagem by 1CP.",
      },
      {
        name: "Domination of the Hive Mind (Aura)",
        description: "While a friendly TYRANIDS unit is within 9\" of this model, that unit is within your army's Synapse Range.",
      },
    ],
    wargear: [],
  },

];
