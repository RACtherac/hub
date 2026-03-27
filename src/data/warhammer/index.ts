import { spaceMarinesUnits } from "./factions/spaceMarine";
import { chaosSpaceMarinesUnits } from "./factions/chaosSpaceMarine";
import { tyranidsUnits } from "./factions/tyranids";
import { astraMilitarumUnits } from "./factions/astraMilitarum";
import { deathGuardUnits } from "./factions/deathGuard";
import { thousandSonsUnits } from "./factions/thousandSons";
import { necronsUnits } from "./factions/necrons";
import { orksUnits } from "./factions/orks";
import { adeptusMechanicusUnits } from "./factions/adeptusMechanicus";

import { spaceMarinesCharacters } from "./characters/spaceMarinesCharacters";
import { chaosCharacters } from "./characters/chaosSpaceMarineCharacters";
import { tyranidsCharacters } from "./characters/tyranidCharacters";
import { astraMilitarumCharacters } from "./characters/astraMilitarumCharacters";
import { adeptusMechanicusCharacters } from "./characters/adeptusMechanicusCharacters";
import { deathGuardCharacters } from "./characters/deathGuardCharacters";
import { thousandSonsCharacters } from "./characters/thousandSonsCharacters";
import { necronsCharacters } from "./characters/necronsCharacters";
import { orksCharacters } from "./characters/orksCharacters";

export const allUnits = [
  ...spaceMarinesUnits,
  ...chaosSpaceMarinesUnits,
  ...tyranidsUnits,
  ...astraMilitarumUnits,
  ...deathGuardUnits,
  ...thousandSonsUnits,
  ...necronsUnits,
  ...orksUnits,
  ...adeptusMechanicusUnits,
];

export const allCharacters = [
  ...spaceMarinesCharacters,
  ...chaosCharacters,
  ...tyranidsCharacters,
  ...astraMilitarumCharacters,
  ...adeptusMechanicusCharacters,
  ...deathGuardCharacters,
  ...thousandSonsCharacters,
  ...necronsCharacters,
  ...orksCharacters,
];
