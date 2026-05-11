# PR: Save, Export, and Import — Army Builder & Paint Tracker

**Branch:** `saving-exporting`  
**Merged into:** `main`  
**Date:** 2026-05-11

---

## Description

Adds persistent save slots, JSON export, and JSON import to both the Warhammer Army Builder and the Mini Paint Tracker. Previously, army builder lists were lost on page reload and the paint tracker had no way to back up or transfer data between devices.

---

### Army Builder

**Multi-slot save system**

Replaces the single-slot-per-faction save with a named, multi-slot system backed by `localStorage`. Each save is stored as an `ArmySave` object keyed in a shared `army-builder-saves` array:

```ts
interface ArmySave {
  id: string;           // crypto.randomUUID()
  faction: Faction;
  name: string;         // editable army name
  armyUnits: ArmyUnit[];
  armyCharacters: ArmyCharacter[];
  savedAt: string;      // ISO timestamp
  totalPoints: number;
}
```

**Key functions added:**

```ts
function readAllSaves(): ArmySave[]
// Reads and parses the full saves array from localStorage.
// Returns [] on parse failure rather than throwing.

function writeSaves(saves: ArmySave[]): void
// Serialises the saves array back to localStorage.

function getSavesForFaction(faction: Faction): ArmySave[]
// Filters the full saves list to the given faction.

function saveArmy(): void  // (inside component)
// Finds an existing save by faction + name and overwrites it,
// or appends a new entry if no match exists.
// Increments saveTick to force factionSaves to recompute.

function deleteSave(id: string): void  // (inside component)
// Removes a save by ID and increments saveTick.

function exportArmy(): void  // (inside component)
// Serialises the current army (including name and faction) to
// a .json file and triggers a browser download.

function importArmy(file: File): void  // (inside component)
// Reads a JSON file, restores armyUnits, armyCharacters, faction,
// and army name from the parsed data, then skips to the builder.
```

**UI changes:**

- Army name input added to the header — editable inline field. Saving with the same name overwrites; changing the name creates a new slot.
- Start screen lists all saves for the selected faction, each with a **Resume →** button and a **✕** delete button.
- **New Army** button always starts with a blank list.
- Header buttons: **Save** (flashes `SAVED ✓` on success) · **Export** · **Import** · Info · ← HUB.

---

### Paint Tracker

The paint tracker already auto-saved all records to `localStorage` on every state change. This PR adds backup and transfer functionality on top of that.

**Key functions added:**

```ts
function exportAllRecords(): void  // (inside PaintTracker)
// Wraps all MiniatureRecord[] in { version, exportedAt, records }
// and downloads as a dated .json file.

function importRecords(file: File): void  // (inside PaintTracker)
// Parses a backup JSON file and merges incoming records into
// the current collection. Skips any record whose ID already exists
// to prevent duplicates.

function exportRecord(): void  // (inside DetailView)
// Same format as exportAllRecords but contains only the single
// open record. Filename is derived from the miniature's name.
```

**UI changes:**

- Gallery toolbar gains **Export ↓** and **Import ↑** buttons alongside `+ New Miniature`.
- Miniature detail view gains an **export ↓** button between `edit` and `delete`.

---

## Risk Analysis

**Army builder saves**

Data lives in `localStorage["army-builder-saves"]` as a JSON array. If the array grows large (many factions × many saves), reads/writes remain synchronous and fast — `localStorage` is not suitable for large binary payloads but is fine for text-based army data. No `QuotaExceededError` handling is present; if `localStorage` is full, `writeSaves` will silently fail. Risk: **Low** given the data size.

The `deleteSave` function removes by ID without a confirmation prompt. Accidental deletion cannot be undone. Risk: **Low** (UX only).

**File import (both tools)**

Imported JSON is `JSON.parse`d and used directly. Basic shape validation exists (`!data.armyUnits || !data.armyCharacters` / `!Array.isArray(incoming)`) but there is no deep schema validation. A malformed or deliberately crafted file could inject unexpected field types into state (e.g. a string where a number is expected). All imported strings are rendered as React text nodes — no `dangerouslySetInnerHTML` is used — so XSS is not possible. The worst outcome of a bad file is a broken army card or a crashed unit render. Risk: **Low**.

**File export**

Downloads use `URL.createObjectURL` + a programmatically created `<a>` element. The object URL is revoked immediately after `.click()` to avoid memory leaks. No server round-trip involved. Risk: **None**.

**Paint tracker image data**

`MiniatureRecord.imageBase64` stores full-resolution images as base64 strings. Exporting a collection with many high-res photos can produce very large `.json` files (several MB per image). No size warning is shown to the user. Risk: **Low** (UX/disk space only).

---

## Threat Modelling

**Stored XSS via imported army/paint data**

Imported strings (unit names, army names, paint colours, notes) are rendered inside React JSX as text content. React escapes all text nodes by default. No `dangerouslySetInnerHTML` is used in any affected component. Risk: **None**.

**localStorage poisoning**

If a script on the same origin writes a malformed value to `army-builder-saves` or `miniature-paint-records`, the parse will either return `[]` (army builder) or `[]` (paint tracker) due to the `try/catch` fallback. The app degrades gracefully to an empty state rather than crashing. Risk: **Low**.

**Dependency surface**

No new `npm` dependencies were introduced. All functionality uses the Web File API (`FileReader`, `Blob`, `URL.createObjectURL`) and browser-native `localStorage`. Risk: **None**.

**Overall threat level: LOW**
