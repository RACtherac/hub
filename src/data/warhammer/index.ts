import { spaceMarinesUnits } from "./factions/spaceMarine";
import { chaosUnits } from "./factions/chaosSpaceMarine";

import { spaceMarinesCharacters } from "./characters/spaceMarinesCharacters";

export const allUnits = [

  ...spaceMarinesUnits,
  ...chaosUnits,

];

export const allCharacters = [

  ...spaceMarinesCharacters,

];