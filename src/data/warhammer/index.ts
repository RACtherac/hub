import { spaceMarinesUnits } from "./factions/spaceMarine";
import { chaosUnits } from "./factions/chaosSpaceMarine";
import { tyranidsUnits } from "./factions/tyranids";

import { spaceMarinesCharacters } from "./characters/spaceMarinesCharacters";
import { tyranidsCharacters } from "./characters/tyranidCharacters";

export const allUnits = [

  ...spaceMarinesUnits,
  ...chaosUnits,
  ...tyranidsUnits,

];

export const allCharacters = [

  ...spaceMarinesCharacters,
  ...tyranidsCharacters,

];