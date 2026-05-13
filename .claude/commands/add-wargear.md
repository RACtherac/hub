# Add Wargear

The user wants to add a wargear item to a unit in the Warhammer army builder.

Ask the user for the following if not already provided:
1. **Wargear name** — e.g. "Plasma gun"
2. **Type** — "counter" (countable, multiple can be taken) or "checkbox" (on/off toggle)
3. **Weapon profiles** — for each profile: range, attacks, skill, strength, AP, damage, and any keywords (PISTOL, RAPID FIRE N, HEAVY, TORRENT, IGNORES COVER, BLAST, LETHAL HITS, DEVASTATING WOUNDS, SUSTAINED HITS N, ANTI-X N+, HAZARDOUS, PSYCHIC, etc.)
4. **If counter**: max count per model count — e.g. `{ 5: 1, 10: 2 }` meaning 1 allowed in a 5-man squad, 2 in a 10-man
5. **If checkbox**: a short description text for the note — e.g. "1 model can replace its boltgun with a plasma gun."
6. **Points cost** (optional)
7. **Sergeant only?** (optional, default false)

Then generate the TypeScript snippet to add to the unit.

## Counter wargear output format

Add to the unit's `wargear: []` array:

```ts
{
  id: "kebab-case-weapon-name",
  name: "Weapon Name",
  image: "",
  countable: true,
  maxCountByModelCount: { 5: 1, 10: 2 },
  profiles: [
    {
      range: '24"',
      attacks: "1",
      skill: "3+",
      strength: "7",
      ap: "-2",
      damage: "1",
      keywords: ["PISTOL"],
    },
  ],
},
```

## Checkbox wargear output format

Add the weapon to the unit's `wargear: []` array:

```ts
{
  id: "kebab-case-weapon-name",
  name: "Weapon Name",
  image: "",
  profiles: [
    {
      range: '24"',
      attacks: "1",
      skill: "3+",
      strength: "7",
      ap: "-2",
      damage: "1",
      keywords: ["PISTOL"],
    },
  ],
},
```

And add a note to the unit's `notes: []` array:

```ts
{
  id: "weapon-name-note",
  text: "1 model can replace its boltgun with a plasma gun.",
  checkbox: true,
  weaponId: "kebab-case-weapon-name",
},
```

If `maxCountByModelCount` is provided for a checkbox, include it in the note too.

## Rules

- Always kebab-case the `id` from the name
- `image` is always `""` unless the user provides one
- If the weapon has multiple profiles (e.g. Plasma gun standard/supercharge), use `profileName` on each profile object
- If `sergeantOnly: true`, add it to the wargear entry
- After generating the snippet, ask which faction file to add it to (e.g. `src/data/warhammer/factions/deathGuard.ts`) and which unit by name, then insert it in the correct place in that file
