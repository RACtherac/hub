import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/function-reference.css";

interface FnEntry {
  name: string;
  description: string;
  detail: string;
  file: string;
  props?: string[];
  state?: string[];
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface Project {
  id: string;
  label: string;
  tag: string;
  route: string;
  description: string;
  functions: FnEntry[];
  tree?: TreeNode;
  improvements: string[];
}

const PROJECTS: Project[] = [
  {
    id: "pokemon",
    label: "Pokemon TCG Tool",
    tag: "game",
    route: "/pokemon-tcg-tool",
    description: "Two-player Pokémon battle simulator with drag-and-drop energy, damage tracking, and bench management.",
    tree: {
      name: "PokemonTCGTool()",
      children: [
        {
          name: "PlayerBoard()",
          children: [
            { name: "PokemonSlot()" },
          ],
        },
        { name: "EnergyPool()" },
        { name: "EnergyDragPool()" },
      ],
    },
    improvements: [
      "Add a deck builder so players can search and pick their cards before the game starts instead of entering them manually.",
      "Support more card mechanics: abilities, trainer cards, special conditions (paralysis, sleep, poison).",
      "Add a turn timer so competitive play has a time limit per turn.",
      "Persist game state to localStorage so a game can be resumed after a page refresh.",
      "Mobile layout — the current board is hard to use on small screens.",
      "Add win/loss tracking across multiple games in a session.",
    ],
    functions: [
      {
        name: "PokemonTCGTool()",
        description: "Root page component. Manages global game state and transitions between setup and game.",
        detail: "Owns the top-level game state for both players — their decks, benched Pokémon, energy pools, and whose turn it is. Renders either the SetupScreen (where players pick their decks) or the live game board once both players are ready. Passes down callbacks so child components can mutate the shared state (damage, energy attachment, knockouts, turn end).",
        file: "src/pages/pokemonTCGTool.tsx",
        state: ["player1: PlayerState", "player2: PlayerState", "currentTurn: 1 | 2", "phase: 'setup' | 'game'"],
      },
      {
        name: "PlayerBoard()",
        description: "Renders one player's side of the field — active slot and up to five bench slots.",
        detail: "Receives a player's full state as props and lays out the active Pokémon slot and five bench slots in a grid. Registers dragover/drop handlers on the board so that dragged energy chips can be dropped anywhere on a player's side. Passes per-slot callbacks (onDamage, onHeal, onAttach) down to each PokemonSlot.",
        file: "src/components/Pokemon/PlayerBoard.tsx",
        props: ["player: PlayerState", "isActive: boolean", "onSlotUpdate: (slot, update) => void"],
      },
      {
        name: "PokemonSlot()",
        description: "A single Pokémon card slot with drag-drop support (desktop & touch), HP controls, and knockout detection.",
        detail: "Handles everything for one slot: renders the Pokémon's name, HP bar, and attached energy icons. Accepts dragged/touched energy chips via onDropEnergy and updates the energy count. Exposes +/− buttons for damage and healing. Detects when HP reaches 0 and triggers a knockout callback. Supports both HTML5 drag-and-drop events (desktop) and touch events (mobile) for full cross-platform drag-and-drop. Active slot has a glowing border; bench slots are dimmed when it's not the player's turn. In attack mode, slots become clickable targets.",
        file: "src/components/Pokemon/PokemonSlot.tsx",
        props: ["pokemon: Pokemon | null", "selected: boolean", "slotType: 'active' | 'bench'", "slotIndex?: number", "isAttackTarget?: boolean", "onDropEnergy: (energy: EnergyType) => void", "onPokemonDrop: (pokemon, fromType, fromIndex) => void"],
      },
      {
        name: "EnergyPool()",
        description: "Displays the available energy types for the current player as draggable chips.",
        detail: "Receives an array of EnergyType values for the current player's drawn energy. Renders each energy as a draggable chip with an icon and label. Supports both HTML5 drag-and-drop (desktop) and touch events (mobile). When dragged or touched, sets the energy data so PokemonSlot's drop handlers can attach the energy to a Pokémon. Displays a semi-transparent visual feedback when touched/dragged on mobile.",
        file: "src/components/Pokemon/EnergyPool.tsx",
        props: ["energies: EnergyType[]"],
      },
      {
        name: "EnergyDragPool()",
        description: "The draggable energy source panel that feeds energy onto Pokémon slots.",
        detail: "Renders each energy type as a draggable chip. Sets the drag data to the energy type string so PokemonSlot's drop handler knows what was dragged. Visually dims energy chips when that type runs out. Positioned as a fixed panel during gameplay so it's always reachable regardless of scroll position.",
        file: "src/components/Pokemon/EnergyDragPool.tsx",
        props: ["pool: Record<EnergyType, number>", "onDragStart: (type: string) => void"],
      },
    ],
  },
  {
    id: "warhammer",
    label: "Warhammer Army Builder",
    tag: "tool",
    route: "/warhammer-army-builder",
    description: "Army list creator for Warhammer 40K — pick a faction, build a roster, attach characters, select wargear, search units, and track points against a configurable limit.",
    tree: {
      name: "ArmyBuilder()",
      children: [
        {
          name: "UnitCard()",
          children: [
            { name: "UnitImage()" },
            { name: "WargearSelector()" },
            { name: "StatsModal()" },
            { name: "CharacterAttachment()" },
            {
              name: "CharacterCard()",
              children: [{ name: "WargearSelector()" }],
            },
            {
              name: "UnitAttachment()",
              children: [{ name: "WargearSelector()" }],
            },
          ],
        },
      ],
    },
    improvements: [
      "Add detachment support — each faction has named detachments that grant a passive rule and unlockable enhancements for characters.",
      "Export army list to PDF or a printable format for use at the table.",
      "Add a faction comparison view showing all units side-by-side across two factions.",
      "Allow sharing an army via a URL (encode the army as a query string or short ID).",
      "Add images to more units — currently many use a placeholder.",
    ],
    functions: [
      {
        name: "ArmyBuilder()",
        description: "Main page. Orchestrates faction picker, army save manager, unit roster, and points tracking.",
        detail: "The root component for the army builder. Manages a list of ArmyUnit objects (one per unit card) in state. Handles the faction selector which filters the unit/character lists. Reads and writes armies to localStorage as JSON for save/load. Computes the running points total by summing all unit costs, wargear costs, and character costs. Provides the sidebar unit picker (filtered by faction) and the main army list area.",
        file: "src/components/Warhammer/Armybuilder/Armybuilder.tsx",
        state: ["selectedFaction: string", "armyUnits: ArmyUnit[]", "savedArmies: SavedArmy[]", "totalPoints: number"],
      },
      {
        name: "UnitCard()",
        description: "Renders a single unit with model count selector, wargear, attached characters, and stats button.",
        detail: "The most complex component. Receives a unit definition and its current ArmyUnit state. Renders a model count dropdown that updates wargear availability. Splits wargear into main and sergeant sections and passes each to WargearSelector. Renders unit notes as checkboxes — notes can activate weapons, unlock slot-dropdowns, or enforce group limits. Calculates the unit's total points. Opens StatsModal on demand. Handles character attachment via CharacterAttachment component.",
        file: "src/components/Warhammer/Unitcard/Unitcard.tsx",
        props: ["unit: Unit", "armyUnit: ArmyUnit", "onChange: (update: Partial<ArmyUnit>) => void", "onRemove: () => void"],
      },
      {
        name: "CharacterCard()",
        description: "Renders a character attached to a unit with their own wargear selector.",
        detail: "Displays the character's name, faction, and points. Passes the character's wargear array to a WargearSelector instance, keeping character wargear state separate from the parent unit's wargear state. Includes a detach button that removes the character from the unit. If a character has wargear groups, those are forwarded to WargearSelector for exclusive selection logic.",
        file: "src/components/Warhammer/CharacterCard/CharacterCard.tsx",
        props: ["character: Character", "selectedWargear: string[]", "onChange: (wargear: string[]) => void", "onDetach: () => void"],
      },
      {
        name: "WargearSelector()",
        description: "Multi-select UI for weapons and equipment with group exclusivity and counters.",
        detail: "Renders wargear as toggle buttons or +/− counters depending on the wargear's countable flag. Enforces wargear group exclusivity — selecting one item from a group deselects all others in that group and their linkedWargear. Computes each countable item's effective max by subtracting reductions from active notes and other wargear counts. Handles linked counter pairs (swap UI). Shows an image gallery when items have images.",
        file: "src/components/Warhammer/WargearSelector/WargearSelector.tsx",
        props: ["wargear: WargearOption[]", "selected: string[]", "onChange: (ids: string[]) => void", "groups?: string[][]", "counts?: Record<string, number>", "onCountChange?: (updates: Record<string, number>) => void", "modelCount?: number"],
      },
      {
        name: "StatsModal()",
        description: "Full-screen modal showing weapon stat tables and unit abilities.",
        detail: "Assembles weapon profiles from multiple sources: the unit's defaultWargear (always equipped), selected optional wargear, note-activated weapons (from weaponId / weaponIds / slot selections), attached character weapons, and attached unit weapons. Renders each weapon as a table row with Range, Attacks, Skill, Strength, AP, Damage, and Keywords columns. Also lists unit abilities. Respects showForModelCounts and replacesDefaultWargear to hide irrelevant entries.",
        file: "src/components/Warhammer/StatsModal/StatsModal.tsx",
        props: ["unit: Unit", "armyUnit: ArmyUnit", "character?: Character", "onClose: () => void"],
      },
      {
        name: "CharacterAttachment()",
        description: "UI for picking and attaching a character to a unit.",
        detail: "Renders a dropdown of characters filtered to only those whose canAttachTo list includes the unit's ID. On selection, updates the armyUnit's attachedCharacter field and initialises characterWargear to empty. If the unit already has a character attached, shows the character's name with a detach option instead of the picker.",
        file: "src/components/Warhammer/CharacterAttachment/CharacterAttachment.tsx",
        props: ["unit: Unit", "allCharacters: Character[]", "attached?: string", "onAttach: (charId: string) => void", "onDetach: () => void"],
      },
      {
        name: "UnitAttachment()",
        description: "UI for attaching a secondary unit (e.g. a transport) to a unit.",
        detail: "Used for units that can carry or pair with another unit — for example an Invader ATV attaching to Outriders. Shows a picker filtered to the unit's attachableUnits list. Updates armyUnit.attachedUnit and initialises attachedUnitWargear. The attached unit's wargear and points are included in the parent unit's total.",
        file: "src/components/Warhammer/UnitAttachment/UnitAttachment.tsx",
        props: ["unit: Unit", "allUnits: Unit[]", "attached?: string", "onAttach: (unitId: string) => void", "onDetach: () => void"],
      },
      {
        name: "UnitImage()",
        description: "Faction-tinted unit portrait card with image or placeholder.",
        detail: "Selects the correct image field from the unit based on the current model count (image3, image5, image6, image10, image20, or image). Applies a CSS filter tinted to the faction's colour. Falls back to a styled placeholder with the unit's initials if no image is set. Used inside UnitCard as the visual thumbnail. Image box sizes: unit frame 280×260px (img 240px wide), attached character frame 200×200px (img 180px wide), standalone CharacterCard frame 280×260px (img 240px wide). Recommended image resolution: 480×480px minimum (square, PNG).",
        file: "src/components/Warhammer/UnitImage/UnitImage.tsx",
        props: ["unit: Unit", "modelCount: number", "faction: string"],
      },
    ],
  },
  {
    id: "paint",
    label: "Mini Paint Tracker",
    tag: "tool",
    route: "/paint-tracker",
    description: "Gallery and editor for recording miniature paint recipes — colours, layers, and notes for each model. Supports drag-and-drop between paint groups, JSON export, and PDF export.",
    tree: {
      name: "PaintTracker()",
      children: [
        { name: "Gallery view" },
        { name: "Detail view" },
        { name: "Editor view" },
      ],
    },
    improvements: [
      "Tag recipes by colour scheme, army, or difficulty so they're easier to find.",
    ],
    functions: [
      {
        name: "PaintTracker()",
        description: "Single-component page managing Gallery, Detail, and Editor views.",
        detail: "Manages three internal views in one component using a view state variable. Gallery shows a responsive grid of all saved recipes loaded from localStorage. Clicking a recipe transitions to Detail view (read-only display of colours, layers, and notes). From Detail, clicking Edit transitions to the Editor view where the user can update or delete the recipe. Saving in the Editor writes back to localStorage and returns to Gallery. New recipes start from a blank template in the Editor.",
        file: "src/pages/paint-tracker.tsx",
        state: ["view: 'gallery' | 'detail' | 'editor'", "recipes: PaintRecipe[]", "selectedRecipe: PaintRecipe | null"],
      },
      {
        name: "PaintInventory()",
        description: "Inventory manager for commonly used paint brands and colours.",
        detail: "Maintains a persistent list of paint entries saved to localStorage. Supports adding and removing paints, categorising (base, layer, technical, wash, contrast), searching and filtering, and JSON import/export with duplicate merging. Items provide suggestions to the Paint Tracker editor.",
        file: "src/pages/paint-inventory.tsx",
        state: ["items: InventoryEntry[]", "searchQuery: string", "filterCategory: string"],
      },
    ],
  },
  {
    id: "pixel",
    label: "Pixel Art Editor",
    tag: "creative",
    route: "/pixel-art",
    description: "Browser-based pixel canvas editor supporting multiple canvas sizes, a full tool set, and PNG export.",
    tree: { name: "PixelArt()" },
    improvements: [
      "Add animation frame support — multiple frames with a preview loop.",
      "Add layers so elements can be drawn and edited independently.",
      "Support larger canvas sizes (64×64, 128×128).",
      "Add a symmetry mode (horizontal/vertical mirror) for drawing.",
      "Save and load projects from localStorage so work isn't lost on refresh.",
      "Add a colour history row showing recently used colours.",
    ],
    functions: [
      {
        name: "PixelArt()",
        description: "Entire pixel art editor in one component — canvas, tools, palette, undo, and export.",
        detail: "Stores the canvas as a flat array of hex colour strings (one entry per pixel). Renders pixels as a CSS grid of div elements. Supports four tools: pencil (paint one pixel), eraser (set to transparent), flood fill (BFS from clicked pixel replacing colour), and eyedropper (pick a colour from the canvas). Maintains an undo stack (array of canvas snapshots) capped at 50 steps. The colour palette is user-editable. PNG export draws to an off-screen HTMLCanvasElement and triggers a download link.",
        file: "src/pages/pixel-art.tsx",
        state: ["canvas: string[]", "tool: 'pencil' | 'eraser' | 'fill' | 'eyedropper'", "colour: string", "undoStack: string[][]", "size: 8 | 16 | 32"],
      },
    ],
  },
  {
    id: "todo",
    label: "Kanban Board",
    tag: "utility",
    route: "/todo-app",
    description: "Drag-and-drop Kanban board with three columns (To Do, In Progress, Done), per-card menus for moving, setting priority, adding notes, and deadlines, plus edit-in-place and localStorage persistence.",
    tree: {
      name: "KanbanApp()",
      children: [
        { name: "DeadlineInput()" },
      ],
    },
    improvements: [
      "Support drag-to-reorder within a column, not just between columns.",
      "Let users create and rename their own columns.",
      "Add a search/filter bar to find cards by keyword, priority, or deadline.",
      "Sync to a backend so boards persist across devices.",
    ],
    functions: [
      {
        name: "KanbanApp()",
        description: "Root Kanban board — manages columns, drag-and-drop, card menus, priority, notes, deadlines, and edit-in-place.",
        detail: "Stores all cards in a single KanbanCard[] array. Each card has an id, text, column ('todo' | 'inprogress' | 'done'), createdAt, and optional fields: ISO deadline string, priority ('low' | 'medium' | 'high'), and notes string. HTML5 drag-and-drop is handled by tracking dragId and dragOverCol through the drag lifecycle — dropping calls handleDrop() which reassigns the card's column. Per-card menus are toggled via menuCardId; a fixed transparent overlay closes them on outside clicks. moveCard() updates the column and closes the menu. updatePriority() toggles priority (clicking the active level clears it). updateNotes() sanitises and persists the notes field. Double-clicking a card's text enters edit mode (editId + editText), committed on blur or Enter. All state is written to localStorage on every change via a useEffect.",
        file: "src/pages/todo-app.tsx",
        state: ["cards: KanbanCard[]", "input: string", "dragId: string | null", "dragOverCol: Column | null", "editId: string | null", "editText: string", "menuCardId: string | null"],
      },
      {
        name: "DeadlineInput()",
        description: "Text input that auto-formats to DD/MM/YYYY as the user types digits.",
        detail: "Keeps a local draft string so partial input (e.g. '12/0') is preserved mid-type. On each keystroke, non-digit characters are stripped and slashes are re-inserted automatically at positions 2 and 4. When draft reaches 10 characters, dmyToIso() converts it to YYYY-MM-DD and fires onChange if the date is valid. Clearing the field fires onChange with an empty string to remove the deadline. A useEffect syncs the draft back to the canonical ISO value whenever the parent clears the deadline externally (e.g. via the 'Clear deadline' button).",
        file: "src/pages/todo-app.tsx",
        props: ["value: string (ISO YYYY-MM-DD or empty)", "onChange: (iso: string) => void"],
      },
      {
        name: "updatePriority()",
        description: "Sets or clears a card's priority level.",
        detail: "Accepts 'low' | 'medium' | 'high' | undefined. Passing undefined removes the priority field from the card. Called from the dropdown priority buttons — clicking the currently active level passes undefined so it acts as a toggle.",
        file: "src/pages/todo-app.tsx",
      },
      {
        name: "updateNotes()",
        description: "Sanitises and persists a card's notes string.",
        detail: "Runs the input through sanitizeText() with a 1000-character cap. Stores the result as notes on the card, or removes the field entirely when the string is empty. Called on every keystroke from the notes textarea in the card dropdown.",
        file: "src/pages/todo-app.tsx",
      },
      {
        name: "formatDeadline()",
        description: "Parses an ISO date string and returns a DD/MM/YYYY label plus an overdue flag.",
        detail: "Appends T00:00:00 before parsing to avoid timezone shifts. Returns null for invalid dates so callers skip rendering the badge entirely. Otherwise returns label (DD/MM/YYYY) and overdue (true when the deadline is strictly before today at midnight).",
        file: "src/pages/todo-app.tsx",
      },
      {
        name: "dmyToIso()",
        description: "Validates a DD/MM/YYYY string and converts it to ISO YYYY-MM-DD.",
        detail: "Splits on '/', verifies each segment is the correct length (2 / 2 / 4), constructs the ISO string, then round-trips through new Date() to reject impossible dates such as 31/02/2026. Returns null on any failure so DeadlineInput only calls onChange with well-formed values.",
        file: "src/pages/todo-app.tsx",
      },
    ],
  },
  {
    id: "tactics",
    label: "Tactics Game",
    tag: "game",
    route: "/tactics-game",
    description: "Turn-based strategy on a 10×10 grid — pick your faction, deploy units, and outmanoeuvre the enemy.",
    tree: {
      name: "TacticsGame()",
      children: [
        { name: "Mode select screen" },
        { name: "Army select screen" },
        { name: "Game board (10×10 grid)" },
      ],
    },
    improvements: [
      "Improve CPU AI — currently basic, could use simple minimax or threat heuristics.",
      "Add more unit types per faction with distinct abilities.",
      "Add fog of war so players can't see the full enemy army.",
      "Show move range and attack range as highlighted tiles before acting.",
      "Add a replay system to review the finished game turn by turn.",
      "Add sound effects for movement and combat.",
    ],
    functions: [
      {
        name: "TacticsGame()",
        description: "Root game component managing mode select, army picks, and the live game loop.",
        detail: "Three-phase component: (1) Mode select — player chooses vs CPU or hotseat. (2) Army select — each side picks from available faction units with a points budget. (3) Gameplay — a 10×10 grid where players alternate moving units and resolving combat. Grid state is a 2D array of cells, each containing a unit reference or null. On each turn, clicking a unit highlights legal moves; clicking a destination moves it. Combat triggers when a unit moves into an occupied enemy cell.",
        file: "src/pages/tactics-game.tsx",
        state: ["phase: 'mode' | 'army-select' | 'game'", "grid: Cell[][]", "turn: 'p1' | 'p2'", "selectedUnit: Unit | null"],
      },
    ],
  },
  {
    id: "password",
    label: "Password Strength Checker",
    tag: "utility",
    route: "/password-strength",
    description: "Real-time entropy analysis and pattern detection to evaluate password strength.",
    tree: { name: "PasswordStrength()" },
    improvements: [
      "Add a passphrase generator as an alternative to single-word passwords.",
      "Show time-to-crack estimates for different attack scenarios (online / offline / GPU).",
      "Allow saving and comparing multiple passwords side by side.",
    ],
    functions: [
      {
        name: "PasswordStrength()",
        description: "Analyses a typed password in real time for entropy, patterns, strength, and known breaches.",
        detail: "On every keystroke, recalculates Shannon entropy (bits per character × length), runs pattern checks (dictionary substring match, keyboard walk detection, character repetition runs), and assigns a strength level (weak / fair / good / strong). Displays a segmented meter, an entropy value in bits, a checklist of criteria, and actionable suggestions. After a 600ms debounce, calls the Have I Been Pwned k-anonymity API — only the first 5 characters of the SHA-1 hash are sent, never the password itself — and shows a breach count. Password input has a show/hide toggle.",
        file: "src/pages/password-strength.tsx",
        state: ["password: string", "visible: boolean", "pwnedCount: number | null", "pwnedLoading: boolean"],
      },
    ],
  },
  {
    id: "ratelimiter",
    label: "Rate Limiter Demo",
    tag: "demo",
    route: "/rate-limiter",
    description: "Interactive visualiser for four classic API rate-limiting algorithms.",
    tree: {
      name: "RateLimiter()",
      children: [
        { name: "Fixed Window panel" },
        { name: "Sliding Window panel" },
        { name: "Token Bucket panel" },
        { name: "Leaky Bucket panel" },
      ],
    },
    improvements: [
      "Let the user configure each algorithm's parameters (window size, token refill rate, bucket capacity) via sliders.",
      "Add a burst mode button that fires many requests at once to stress-test each algorithm.",
      "Show a real-time graph of request accept/reject rate over time.",
      "Add explanatory tooltips on each algorithm explaining why a request was accepted or rejected.",
      "Support multiple simulated endpoints with independent rate limits.",
    ],
    functions: [
      {
        name: "RateLimiter()",
        description: "Demonstrates four rate-limiting algorithms with live visualisation.",
        detail: "Renders four algorithm panels side by side: Fixed Window (request count resets on a fixed interval), Sliding Window (rolling count over the last N seconds), Token Bucket (tokens refill at a rate, consumed per request), and Leaky Bucket (requests queue and drain at a fixed rate). Firing a request updates all four algorithms simultaneously. Each panel shows its internal state (token count, window fill, queue length) as an animated bar or counter, and highlights accepted vs rejected requests in a log.",
        file: "src/pages/rate-limiter.tsx",
        state: ["algorithms: AlgorithmState[]", "requestLog: RequestEntry[]", "firing: boolean"],
      },
    ],
  },
  {
    id: "blog",
    label: "The Log",
    tag: "content",
    route: "/blog",
    description: "Personal blog rendered as sealed envelopes that open to reveal posts.",
    tree: { name: "Magazine()" },
    improvements: [
      "Add Markdown rendering so posts can use headings, bold, lists, and code blocks.",
      "Add tags/categories so posts can be filtered by topic.",
      "Add a search bar to find posts by keyword.",
      "Load posts from a CMS or markdown files instead of hardcoded strings.",
      "Add an RSS feed.",
    ],
    functions: [
      {
        name: "Magazine()",
        description: "Blog reader with animated envelope open/close per post.",
        detail: "Renders each blog post as a styled envelope. Clicking an envelope triggers a CSS open animation (flap lifts, content slides up). The component tracks which envelope is open via a state map keyed by post ID so multiple envelopes can be open at once. Post content is stored inline as plain text or simple HTML. A second click re-seals the envelope with a close animation.",
        file: "src/pages/magazine.tsx",
        state: ["openPosts: Record<string, boolean>"],
      },
    ],
  },
  {
  id: "dice",
  label: "Dice Balance Tester -curently removed-",
  tag: "tool",
  route: "",

  description:
    "Statistical dice analysis tool with chi-square testing, bootstrap resampling, fairness scoring, and distribution visualisation.",

  tree: {
    name: "DiceBalanceTester()",
    children: [
      { name: "DiceInput()" },
      { name: "StatsPanel()" },
      { name: "BalanceVerdict()" },
      { name: "DistributionChart()" }
    ]
  },

  improvements: [
    "Support d4, d6, d8, d10, d12 and d20.",
    "Export results as PDF.",
    "Import roll logs from CSV.",
    "Compare multiple dice side-by-side.",
    "Show bootstrap confidence intervals for each face."
  ],

  functions: [
    {
      name: "DiceBalanceTester()",
      description:
        "Main page component managing roll counts, analysis, and visualisation.",

      detail:
        "Stores face counts in state, allows manual entry and quick-roll recording, calculates fairness metrics, and renders charts and verdicts.",

      file: "",

      state: [
        "counts: number[]",
        "selectedDie: number"
      ]
    },

    {
      name: "DiceInput()",
      description:
        "Input panel for entering roll counts manually or incrementing results.",

      detail:
        "Provides numeric inputs for each face and quick-add buttons for live recording.",

      file:
        "src/components/dice-balance/DiceInput.tsx",

      props: [
        "counts: number[]",
        "onChange: (index:number,value:number)=>void",
        "onIncrement: (face:number)=>void"
      ]
    },

    {
      name: "analyzeDice()",
      description:
        "Calculates fairness metrics from observed rolls.",

      detail:
        "Computes expected frequencies, chi-square statistic, bootstrap confidence intervals, fairness score and final rating.",

      file:
        "src/utils/diceAnalysis.ts"
    },

    {
      name: "bootstrapChiSquare()",
      description:
        "Performs bootstrap resampling of the observed data.",

      detail:
        "Expands counts into a roll history, repeatedly samples with replacement, recalculates chi-square, and produces confidence intervals.",

      file:
        "src/utils/diceAnalysis.ts"
    },

    {
      name: "DistributionChart()",
      description:
        "Visualises face frequencies as percentage bars.",

      detail:
        "Displays observed frequencies for each face and highlights deviations from expected values.",

      file:
        "src/components/dice-balance/DistributionChart.tsx",

      props: [
        "counts: number[]"
      ]
    }
  ]
},
{
  id: "familytree WIP",
  label: "Family Tree WIP",
  tag: "tool",
  route: "/Familytree",
  description:
    "Interactive family graph editor for mapping relatives, folders, and relationship links across generations.",

  tree: {
    name: "FamilyTree()",
    children: [
      { name: "FamilyMemberCard()" },
      { name: "FolderPanel()" },
      { name: "RelationEditor()" },
      { name: "ConnectionLayer()" },
    ],
  },

  improvements: [
    "Fix the lines that connect family members",
    "Add profile photos and thumbnail avatars for each family member.",
    "Support drag-and-drop reordering between folders and branches.",
    "Add a printable PDF export for the current family view.",
    "Improve relationship validation and conflict warnings when links become inconsistent.",
    "Add import/export for .ged or CSV family data files.",
  ],

  functions: [
    {
      name: "FamilyTree()",
      description:
        "Main page component managing the family graph, selected member, folders, filtering, and relationship editing.",

      detail:
        "Acts as the root state container for the full family tree. It loads or creates a tree when the page mounts, saves changes back to localStorage, tracks the selected member, active branch focus, and zoomed canvas view, and draws connection lines between related family members. It also controls the search bar, folder filtering, and relationship editor for adding or replacing links such as parent/child, spouse, sibling, and cousin ties.",

      file: "src/pages/FamilyTree.tsx",

      state: [
        "tree: FamilyTreeData",
        "selected: FamilyMember | null",
        "search: string",
        "activeBranchId: string | null",
        "zoom: number",
        "viewOffset: { x: number; y: number }",
      ],
    },

    {
      name: "createPerson()",
      description:
        "Creates a new family member record with default fields and empty relationship arrays.",

      detail:
        "Initialises a member object with the required id, names, dates, notes, and relationship arrays. Used when adding a person to the tree or generating the sample family dataset. The helper keeps relationship data consistent so later connection utilities can safely add parent, child, sibling, spouse, and cousin references.",

      file: "src/utils/FamilyTreeUtils.ts",
    },

    {
      name: "connectParentChild()",
      description:
        "Links a parent to a child and updates both sides of the relationship graph.",

      detail:
        "Adds a bidirectional parent/child connection between two members while preserving deduplication and consistent array state. This is the foundation of the generated family model and is used by the relationship editor when creating or replacing connections in the tree.",

      file: "src/utils/FamilyTreeUtils.ts",
    },

    {
      name: "connectSpouses()",
      description:
        "Creates or updates a spouse link between two members of the tree.",

      detail:
        "Ensures spouse relationships are stored symmetrically on both records. It can be used when creating a new couple or when updating a relationship after editing. The utility also keeps the broader tree logic consistent with sibling and parent generation flows.",

      file: "src/utils/FamilyTreeUtils.ts",
    },

    {
      name: "saveTree()",
      description:
        "Persists the current family model into localStorage for reloading later.",

      detail:
        "Serializes the current family tree and writes it to localStorage under a fixed key so the app keeps the user's relationships between sessions. It is called whenever the tree state changes, allowing the page to restore the exact structure after a refresh.",

      file: "src/utils/FamilyTreeUtils.ts",
    },

    {
      name: "searchPeople()",
      description:
        "Filters the visible family members by a search term across names, notes, and metadata.",

      detail:
        "Performs a lightweight text search across the current branch or folder view. It checks the member's display name, custom notes, family role, and general metadata to quickly narrow the view while the user is browsing a large tree.",

      file: "src/utils/FamilyTreeUtils.ts",
    },
  ],
},
{
  id: "projecttree",
  label: "Project Tree",
  tag: "tool",
  route: "/project-tree",
  description:
    "Hierarchical project documentation tool with draggable nodes, rich content blocks, image support, JSON import/export, and a visual knowledge tree.",

  tree: {
    name: "ProjectTree()",
    children: [
      {
        name: "TreeToolbar()",
      },
      {
        name: "Tree()",
        children: [
          {
            name: "TreeNode()",
          },
        ],
      },
      {
        name: "NodeEditor()",
      },
    ],
  },

  improvements: [
    "Support drag-and-drop reordering of content blocks within a node.",
    "Add searchable tags and categories for nodes.",
    "Allow collapsing and expanding all tree branches at once.",
    "Support Markdown formatting inside text and note blocks.",
    "Add automatic backlinks between related nodes.",
    "Add version history so node edits can be restored.",
    "Export documentation as Markdown, PDF, or HTML.",
    "Support collaborative editing and cloud synchronization.",
  ],

  functions: [
    {
      name: "ProjectTree()",
      description:
        "Main page component managing the entire project tree, node editor, and application state.",

      detail:
        "Acts as the root component for the application. Stores the complete tree structure, currently selected node, drag-and-drop state, and editing actions. Handles creating, deleting, renaming, moving, importing, and exporting nodes. Passes callbacks to the Tree and NodeEditor components so they can modify the shared tree while keeping all state centralized.",

      file: "src/pages/project-tree.tsx",

      state: [
        "tree: TreeNodeData",
        "selectedNodeId: string | null",
        "imageTarget: string | null",
      ],
    },

    {
      name: "Tree()",
      description:
        "Displays the hierarchical node structure with drag-and-drop support.",

      detail:
        "Wraps the tree inside a DndContext and renders every root node recursively using TreeNode components. Handles drag events and forwards move operations to the parent component when a node is dropped.",

      file: "src/components/Tree/Tree.tsx",

      props: [
        "tree: TreeNodeData",
        "selectedId: string | null",
        "onMove()",
        "onSelect()",
      ],
    },

    {
      name: "TreeNode()",
      description:
        "Renders a single tree node with editing, deletion, child creation, and drag handles.",

      detail:
        "Represents one item inside the project tree. Supports inline renaming, expanding and collapsing children, adding child nodes, deleting nodes, and dragging to reorder the hierarchy. Recursively renders child TreeNode components to build the full tree.",

      file: "src/components/Tree/TreeNode.tsx",

      props: [
        "node: TreeNodeData",
        "selectedId: string | null",
        "onSelect()",
        "onDelete()",
        "onRename()",
        "onToggle()",
        "onAddChild()",
      ],
    },

    {
      name: "TreeToolbar()",
      description:
        "Toolbar providing project import, export, and root node creation.",

      detail:
        "Displays dropdown menus for file operations and tree management. Allows importing and exporting the project as JSON and creating new root nodes while keeping the interface minimal.",

      file: "src/components/Tree/TreeToolbar.tsx",

      props: [
        "onAddRoot()",
        "onImportJson()",
        "onExportJson()",
      ],
    },

    {
      name: "NodeEditor()",
      description:
        "Editor panel used for modifying the selected node's content blocks.",

      detail:
        "Displays the selected node's page title and all attached content blocks. Supports text, notes, links, and image blocks with individual editing controls. Allows adding new blocks, deleting blocks, reordering them, and uploading images while updating the shared tree state.",

      file: "src/components/Tree/NodeEditor.tsx",

      props: [
        "selectedNode: TreeNodeData",
        "onUpdateBlock()",
        "onAddBlock()",
        "onDeleteBlock()",
        "onMoveBlock()",
      ],
    },
  ],
},
  {
    id: "warhammertoolkit",
    label: "Warhammer Toolkit",
    tag: "tool",
    route: "/warhammer-toolkit",
    description: "Exact-odds toolkit for Warhammer 40K 10th edition — a Mathhammer calculator for one attack sequence, a Battle tab that pits two units against each other over several rounds, and a Game Tracker for rounds, phases, CP and victory points.",
    tree: {
      name: "WarhammerToolkit()",
      children: [
        {
          name: "Mathhammer()",
          children: [
            { name: "WeaponRowsEditor()" },
            { name: "SituationEditor()" },
            { name: "DefenceEditor()" },
            {
              name: "Results()",
              children: [{ name: "KillChart()" }],
            },
          ],
        },
        {
          name: "Battle()",
          children: [
            { name: "DefenceEditor()" },
            { name: "WeaponRowsEditor()" },
            { name: "SituationEditor()" },
            {
              name: "ExchangeResults()",
              children: [
                {
                  name: "Results()",
                  children: [{ name: "KillChart()" }],
                },
              ],
            },
            {
              name: "DuelResults()",
              children: [
                { name: "DuelChart()" },
                { name: "KillChart()" },
              ],
            },
          ],
        },
        {
          name: "GameTracker()",
          children: [
            { name: "GameSetup()" },
            { name: "GameHistory()" },
            { name: "TurnBar()" },
            { name: "PlayerPanel()" },
            { name: "ScoreTable()" },
            { name: "GameLog()" },
          ],
        },
      ],
    },
    improvements: [
      "Persist Mathhammer and Battle inputs (weapon rows, target, situation) to localStorage or the URL — today they reset to the Boltgun / Intercessors defaults whenever the tab is switched or the page reloads.",
      "Support more weapon keywords in parseKeywords() — Hazardous, Precision, Indirect Fire, Extra Attacks and damage re-rolls are currently ignored without any warning to the user.",
      "Persist the Game Tracker undo stack — undoStack lives only in component state, so a page refresh mid-game drops all undo history even though the game itself is restored from localStorage.",
      "Enforce the 10th edition CP rule that a player can gain at most 1 extra CP per battle round beyond the Command phase gain; adjustCp currently allows any number of increments.",
      "Add a detail view for past games in GameHistory showing the per-round score table and full log, which are already stored on each archived GameState.",
      "Let the Battle tab import a unit's defence stats from the army data (toughness, save, wounds) instead of only weapons — DefenceEditor only offers the hard-coded TARGET_PRESETS or manual entry.",
      "Raise or work around MAX_DUEL_STATES (models × wounds ≤ 60) so fights to the death between larger units, like 20 Ork Boyz or an Imperial Knight, can be calculated.",
    ],
    functions: [
      {
        name: "WarhammerToolkit()",
        description: "Root page. Renders the hero, the tab bar and the active tab panel (Mathhammer, Battle or Game Tracker).",
        detail: "Holds no React state of its own — the active tab is read from the ?tab= search parameter via useSearchParams so it survives reloads and can be linked to. Clicking a tab calls setSearchParams with { replace: true }, clearing the parameter for the default Mathhammer tab. The tab bar uses role=tablist / aria-selected / aria-controls. Imports warhammer-toolkit.css, which defines all the whk-* classes used across the toolkit.",
        file: "src/pages/warhammer-toolkit.tsx",
      },
      {
        name: "Mathhammer()",
        description: "Attacker vs target calculator showing expected kills, expected damage, wipe chance and a per-weapon breakdown.",
        detail: "Keeps the weapon rows, target and situation in state and runs calculate() inside a useMemo whenever any of them change. Rows are converted with rowsToProfiles(), which splits the comma-separated keyword string. A MathhammerInputError is caught and shown as a readable error message; any other error is re-thrown. Defaults to the Intercessors preset (TARGET_PRESETS[3]). Results are rendered by the exported Results() helper (three stat tiles, a KillChart, and a per-weapon table of attacks, hits, wounds, unsaved wounds and damage). Battle reuses Results().",
        file: "src/components/WarhammerToolkit/Mathhammer.tsx",
        state: ["rows: ProfileRow[]", "target: Target", "presetName: string", "situation: Situation"],
      },
      {
        name: "WeaponRowsEditor()",
        description: "Editable list of weapon profiles with a faction → unit → weapon picker fed by the army builder data.",
        detail: "Reads units and characters from useWarhammerData() and builds the cascading pickers with listFactions(), listDatasheets() and listWeapons() from armyData.ts. Choosing a weapon fills in the row's name, models, A, BS/WS, S, AP, D and keywords from the datasheet profile. Default wargear counts for every model on the sheet; optional wargear counts for one model. Every field can still be edited by hand afterwards. Rows can be added (newRow(defaultModels)) or removed, but there is always at least one. Shared by Mathhammer and Battle.",
        file: "src/components/WarhammerToolkit/ProfileEditor.tsx",
        props: ["rows: ProfileRow[]", "onChange: (rows: ProfileRow[]) => void", "defaultModels?: number"],
      },
      {
        name: "DefenceEditor()",
        description: "Defensive stat editor for a target unit: preset picker, T / Sv / Invuln / W / Models / FNP, keywords, cover and −1 Damage.",
        detail: "The preset dropdown lists TARGET_PRESETS. Picking one replaces the whole Target and reports its name back. Editing any stat by hand calls onChange with an empty presetName, so the dropdown switches to Custom. Target keywords (INFANTRY, VEHICLE, MONSTER etc. from TARGET_KEYWORDS) are toggle chips and only matter for Anti-X weapons. The checkboxes set target.cover and target.damageReduction.",
        file: "src/components/WarhammerToolkit/ProfileEditor.tsx",
        props: ["target: Target", "presetName: string", "onChange: (target: Target, presetName: string) => void"],
      },
      {
        name: "SituationEditor()",
        description: "Toggles and dropdowns for the attack situation — half range, stationary, charged, hit/wound modifiers, re-rolls and critical hit threshold.",
        detail: "Half range enables Rapid Fire and Melta, stationary enables Heavy, and charged enables Lance. Hit and wound modifiers are limited to −1/0/+1, matching the cap in rollChances(). Re-rolls can be none, 1s or fails. Critical hits can be set to 6 or 5+. Every change emits a full new Situation object.",
        file: "src/components/WarhammerToolkit/ProfileEditor.tsx",
        props: ["situation: Situation", "onChange: (situation: Situation) => void"],
      },
      {
        name: "KillChart()",
        description: "Hand-built SVG column chart of 'chance to kill at least N models', with hover tooltips and a toggleable table.",
        detail: "Draws one rounded-top column per model count (k = 1..models) on a fixed 640×240 viewBox, with gridlines at 0/50/100%. Each column has a full-height invisible hit rect that is focusable and shows a tooltip with the 'at least' and 'exactly' chances. Axis labels thin out to every 5th or 10th column for big units, and value labels only show when there are 10 or fewer columns. 'Show table' lists the exact and at-least chance for every count. The optional title, countLabel and side props let Battle reuse it for 'models left' charts coloured per side.",
        file: "src/components/WarhammerToolkit/KillChart.tsx",
        props: ["killAtLeast: number[]", "killDistribution: number[]", "title?: string", "countLabel?: string", "side?: 'a' | 'b'"],
        state: ["hovered: number | null", "showTable: boolean"],
      },
      {
        name: "Battle()",
        description: "Two-unit matchup — either one exchange at full strength or a fight to the death over up to 10 battle rounds.",
        detail: "Each side is a SideDraft (name, weapon rows, defence, preset name, situation). The defaults are Intercessors with bolt rifles and Ork Boyz with choppas. Drafts are turned into BattleSide objects with toSide(). A JSON key of all inputs drives a debounced useEffect (200 ms, but no delay on the first run) that calls singleExchange() or fightToTheDeath(). While the key differs from the last computed one, the results panel shows 'calculating…'. A MathhammerInputError (for example a unit over MAX_DUEL_STATES) is shown as text. ExchangeResults shows Results() both ways. DuelResults shows a verdict banner ('X is favoured' or 'coin flip' when the win chances are within 2%), win/ongoing tiles, a DuelChart, and two KillCharts of surviving models.",
        file: "src/components/WarhammerToolkit/Battle.tsx",
        state: ["mode: Mode", "rounds: number", "first: Fighter", "drafts: Record<Fighter, SideDraft>", "computed: { key: string; outcome: Outcome } | null"],
      },
      {
        name: "DuelChart()",
        description: "Stacked 100% bar per battle round showing the cumulative chance that A has won, the fight is ongoing, or B has won.",
        detail: "Plain HTML flex bars rather than SVG, so the bar height stays fixed at any width. Each segment's flexGrow is its probability, and segments under 0.05% are hidden. A percentage label is only shown when the segment is at least 12% wide (MIN_LABEL_SHARE). Rows are focusable and show a tooltip on hover or focus, and each has a full aria-label. Includes a legend and a 'Show table' toggle.",
        file: "src/components/WarhammerToolkit/DuelChart.tsx",
        props: ["rounds: RoundOdds[]", "nameA: string", "nameB: string"],
        state: ["hovered: number | null", "showTable: boolean"],
      },
      {
        name: "GameTracker()",
        description: "Live 40K game tracker — turn and phase bar, per-player VP / CP / painted bonus / unit casualties, score table, log, undo and past games.",
        detail: "Loads the TrackerStorage ({ current, history }) from localStorage with loadTracker() and writes it back with saveTracker() on every change. All game changes go through a local dispatch() that runs gameReducer(), ignores no-op results and pushes the previous GameState onto an in-memory undo stack (capped at UNDO_LIMIT = 100). With no current game it shows GameSetup and GameHistory. Otherwise it shows TurnBar, two PlayerPanels, ScoreTable and GameLog (the last 40 entries, newest first). A finished game can be saved to history. 'Abandon game' resets without saving. End game, abandon and delete all ask for window.confirm.",
        file: "src/components/WarhammerToolkit/GameTracker.tsx",
        state: ["storage: TrackerStorage", "undoStack: GameState[]"],
      },
      {
        name: "GameSetup()",
        description: "New-game form: player names, faction, optional saved army list from the Army Builder, mission and who goes first.",
        detail: "Pulls army lists the Army Builder saved under the 'army-builder-saves' localStorage key, using loadArmyLists() from armyData.ts. That function turns each saved army into a flat list of { name, points } entries for its units, attached characters, attached units and standalone characters. Choosing a list also sets the player's faction. On Start, each PlayerDraft becomes a NewPlayer (faction run through factionLabel()) and is passed to onStart, which calls createGame().",
        file: "src/components/WarhammerToolkit/GameTracker.tsx",
        props: ["onStart: (players: [NewPlayer, NewPlayer], firstPlayer: 0 | 1, mission: string) => void"],
        state: ["drafts: [PlayerDraft, PlayerDraft]", "firstPlayer: 0 | 1", "mission: string"],
      },
      {
        name: "calculate()",
        description: "Exact Mathhammer result for a set of attack profiles against one target — expected values per weapon, kill distribution and wipe chance.",
        detail: "Validates the target (T ≥ 1, Sv 2–7, W and models 1–100), then builds full probability distributions with no random simulation. The steps are attacks (including Blast and Rapid Fire), hit roll (Torrent, Heavy, crits, Sustained / Lethal Hits, re-rolls), wound roll (S vs T table, Lance, Anti-X, Twin-linked), save (AP, cover, invuln, Devastating Wounds), damage (Melta, −1 Damage, Feel No Pain), and finally allocation model by model, where excess damage on a model is lost. Returns a MathhammerResult with per-profile ProfileResult rows, expectedDamage, expectedKills, killDistribution, killAtLeast and wipeChance. Bad stat strings throw MathhammerInputError with a readable message.",
        file: "src/utils/mathhammer.ts",
      },
      {
        name: "resolveAttacks()",
        description: "Resolves all profiles against a target that may already be damaged and returns the distribution of damage states afterwards.",
        detail: "A damage state is models destroyed × wounds plus the damage on the model currently being hit. The index models × wounds (wipedState()) means the unit is wiped out. Starts from startState (default 0), recomputes Blast from the models still alive, and applies each profile's unsaved-wound distribution one wound at a time through applyDamage(). Stops early once the remaining probability falls below 1e-12. Used by calculate() and as the per-strike step in fightToTheDeath().",
        file: "src/utils/mathhammer.ts",
      },
      {
        name: "fightToTheDeath()",
        description: "Exact multi-round duel between two BattleSides, returning cumulative win/ongoing odds per round and surviving-model distributions.",
        detail: "Tracks a joint distribution over (state of A, state of B), so damage on a wounded model carries over between rounds. Each round both sides attack in order (options.first goes first), clamped to 1–20 rounds. A wiped unit stops attacking. Casualties shrink the attacker's weapons via scaleProfiles(), which removes models with the most common weapons first so special weapons die last. Strike results are cached by attacker, alive count and defender state. Throws MathhammerInputError when either side's models × wounds exceeds MAX_DUEL_STATES (60). singleExchange() in the same file is the simpler 'both attack once at full strength' variant.",
        file: "src/utils/battle.ts",
      },
      {
        name: "gameReducer()",
        description: "Pure reducer for the game tracker — advances phases and turns, adjusts CP, scores VP, toggles the painted bonus and unit casualties, and ends the game.",
        detail: "Handles the GameAction union: nextPhase, adjustCp, score, togglePainted, toggleUnit and endGame. nextPhase steps through PHASES (command → movement → shooting → charge → fight), hands over to the second player, then moves to the next round. Both players gain 1 CP at every Command phase, and the game ends automatically after round 5 (ROUNDS). CP and per-round scores never go below 0. getScore() caps primary at 50 and secondary at 40, and adds 10 for a painted army. Every change appends a LogEntry. Actions on a finished game, and changes that don't change anything, return the same object so the UI can skip undo entries. createGame() builds the initial GameState.",
        file: "src/utils/gameTracker.ts",
      },
    ],
  },
  {
    id: "roleplaying",
    label: "Roleplaying Sheets",
    tag: "tool",
    route: "/roleplaying-sheets",
    description: "Character sheet manager for tabletop RPGs — pick from nine templates (D&D 5e, Deathwatch, Wrath & Glory, Dragonbane, Call of Cthulhu, Shoot Them and more), edit sheets with auto-calculated stats, and save to localStorage with JSON backup/import and A4 PDF export.",
    tree: {
      name: "RoleplayingSheets()",
      children: [
        { name: "Template menu (saved sheets + new character)" },
        { name: "Generic sheet (D&D 5e / Deathwatch / Cyberpunk RED / Shoot Them / Blank custom)" },
        { name: "DeathwatchRealSheet()" },
        {
          name: "WrathGlorySheet()",
          children: [
            { name: "TextField()" },
            { name: "SelectField()" },
            { name: "Counter()" },
            { name: "Derived()" },
            { name: "RowTable()" },
            { name: "TextBlock()" },
          ],
        },
        {
          name: "DragonbaneSheet()",
          children: [
            { name: "TextField()" },
            { name: "SelectField()" },
            { name: "Toggle()" },
            { name: "Counter()" },
            { name: "Derived()" },
            { name: "TickTrack()" },
            { name: "RowTable()" },
            { name: "TextBlock()" },
          ],
        },
        {
          name: "CallOfCthulhuSheet()",
          children: [
            { name: "TextField()" },
            { name: "Thresholds()" },
            { name: "Counter()" },
            { name: "Toggle()" },
            { name: "Derived()" },
            { name: "RowTable()" },
            { name: "TextBlock()" },
          ],
        },
      ],
    },
    improvements: [
      "Move the inline D&D, Deathwatch and Shoot Them editors out of roleplaying-sheets.tsx (≈950 lines) into their own sheet components, the same way Wrath & Glory, Dragonbane and Call of Cthulhu are built.",
      "Rebuild DeathwatchRealSheet on the shared RpgKit components — it still has its own textField/counter/textBlock helpers and a hand-written weapon table instead of RowTable.",
      "Ask for confirmation (or offer undo) before deleting a sheet — deleteSheet removes it right away and the localStorage write follows straight after.",
      "Export the PDF as real text instead of JPEG snapshots from html2canvas, so the PDF can be searched, text can be copied and files are smaller. Also add tests for exportSheetPdf, which has none.",
      "Add dice rolling from the sheet — click a skill to roll d20 + modifier, a Wrath & Glory dice pool, or a d100 against the Call of Cthulhu half/fifth targets.",
      "Use BACKUP_VERSION when importing (parseImport ignores it today) so future format changes can be migrated, and catch localStorage quota errors in the save effect.",
      "Normalise each Shoot Them weapon and each full-sheet weapon row field by field, not just the array, so hand-edited JSON with missing columns can't show undefined inputs.",
    ],
    functions: [
      {
        name: "RoleplayingSheets()",
        description: "Root page. Switches between the template menu and the sheet editor, and owns all sheets, saving, import and export.",
        detail: "Loads sheets with loadStoredSheets() and writes the whole array back to localStorage (STORAGE_KEY \"rpg-character-sheets\") in a useEffect on every change. With templateScreen on, it shows the saved-sheet list (Open/Delete, Export all, Import JSON) and a grid of TEMPLATE_LIBRARY cards that call createNewSheet(). In editor mode, a sidebar lists the sheets matching sheetMode (\"dnd\" or \"custom\") and the main panel shows the selected sheet. The four FULL_SHEET_TEMPLATES (deathwatch-real, wrath-glory, dragonbane, call-of-cthulhu) get their own component, fed normalised data. Their onChange also copies a summary into className/level for the sidebar. All other templates use inline editors: D&D ability scores, proficiency-dot skills and attacks; Deathwatch characteristics, skills and armour picker; the Shoot Them sheet; and the custom-field builder. Every edit goes through editSelected(). Export JSON downloads createBackup([selectedSheet]), Export all downloads every sheet as rpg-sheets-backup-<date>.json, and Import runs parseImport() + mergeImported() and shows a status message. Export PDF passes sheetPanelRef to exportSheetPdf(). beforeprint/afterprint listeners turn print mode on for the browser's own print.",
        file: "src/pages/roleplaying-sheets.tsx",
        state: ["sheets: CharacterSheet[]", "sheetMode: SheetType", "templateScreen: boolean", "selectedId: string", "importMessage: string", "exportingPdf: boolean"],
      },
      {
        name: "DeathwatchRealSheet()",
        description: "Full FFG Deathwatch Battle-Brother sheet with characteristics, unnatural multipliers, hit-location armour, skills and weapons.",
        detail: "Every edit goes through a local set(patch) that calls onChange({ ...data, ...patch }). Each characteristic shows its bonus via bonusOf() (tens digit × unnatural multiplier, chosen from a Natural / ×2 / ×3 dropdown). Movement (Half/Full/Charge/Run = AgB ×1/×2/×3/×6) and XP to spend are worked out from the data. Armour has a points box for each LOCATIONS hit location, with the total including the Toughness bonus. Clicking a skill dot cycles untrained → trained → +10 → +20, and skillTarget() shows \"—\" for untrained advanced skills. Also has a free-form weapon table and textareas for talents, traits, chapter/speciality abilities, solo/squad modes, psychic powers and gear. Uses its own small helpers instead of RpgKit.",
        file: "src/components/DeathwatchReal/DeathwatchRealSheet.tsx",
        props: ["name: string", "data: DwRealData", "onNameChange: (name: string) => void", "onChange: (data: DwRealData) => void"],
      },
      {
        name: "WrathGlorySheet()",
        description: "Wrath & Glory (Revised) sheet with dice-pool skills and auto-derived traits.",
        detail: "Seven attributes (max ATTRIBUTE_MAX 12) and skill ratings 0–SKILL_MAX (8). Next to each skill, skillPool() shows the dice pool (attribute + rating). derivedTraits() works out Defence, Resilience (Toughness + 1 + armour rating), Resolve, Conviction, Determination, Passive Awareness, Influence and Wealth, plus max Wounds (Tier × 2 + Toughness) and max Shock (Willpower + Tier), which appear as the \"of N\" on the Counters. Tracks Wrath, Glory, Faith, Corruption and XP, and uses RowTable for weapons (Dmg/ED/AP/Range/Salvo/Traits).",
        file: "src/components/WrathGlory/WrathGlorySheet.tsx",
        props: ["name: string", "data: WgData", "onNameChange: (name: string) => void", "onChange: (data: WgData) => void"],
      },
      {
        name: "DragonbaneSheet()",
        description: "Drakar och Demoner / Dragonbane sheet with attribute conditions, trained skills, death rolls and a carry limit.",
        detail: "Each of the six attributes shows its baseChance() and has a condition Toggle next to it. Skills are grouped by SKILL_GROUPS (general / weapon / secondary). The trained dot doubles the base chance, a typed level overrides it, and a checkbox holds the advancement mark. Untrained secondary skills show 0 (skillLevel()). derivedStats() supplies max HP/WP, movement (kin base adjusted by AGL), STR/AGL damage bonus and carry limit, and the carry limit is shown in the inventory heading. Death rolls use two 3-box TickTracks. Also has armour/helmet, money and a weapons & shields RowTable.",
        file: "src/components/Dragonbane/DragonbaneSheet.tsx",
        props: ["name: string", "data: DbData", "onNameChange: (name: string) => void", "onChange: (data: DbData) => void"],
      },
      {
        name: "CallOfCthulhuSheet()",
        description: "Call of Cthulhu 7th edition investigator sheet with half/fifth targets, sanity and a full skill list.",
        detail: "Characteristics and Luck each show their hard (½) and extreme (⅕) values through the local Thresholds() helper. Skills show their base chance (fixed, DEX/2 or EDU). setSkill() deletes the override when the value is cleared or set back to the base, so only changed skills are saved. Each skill has an improvement-check box. derivedStats() works out max HP, MP and sanity (99 − Cthulhu Mythos), Move (with the age penalty) and damage bonus/Build. Status toggles cover temporary/indefinite insanity, major wound, unconscious and dying. RowTables hold custom skills and weapons, and a run of TextBlocks covers the backstory sections.",
        file: "src/components/CallOfCthulhu/CallOfCthulhuSheet.tsx",
        props: ["name: string", "data: CocData", "onNameChange: (name: string) => void", "onChange: (data: CocData) => void"],
      },
      {
        name: "RowTable()",
        description: "Generic editable table for weapons or any other list of id'd string rows.",
        detail: "Builds a CSS grid from the column widths (plus an auto column for the Remove button). Renders a header row and one input per column per row. Editing a cell, adding (with blankRow()) or removing a row all call onChange with a new array. Wrath & Glory, Dragonbane and Call of Cthulhu use it for weapons and custom skills. The same RpgKit file also exports TextField, SelectField (keeps an unknown current value as an option), Counter (number box with \"of max\"), Derived (read-only value with a formula tooltip), TextBlock, Toggle and TickTrack.",
        file: "src/components/RpgKit/RpgKit.tsx",
        props: ["label: string", "columns: { key: Exclude<keyof T, \"id\"> & string; label: string; width: string }[]", "rows: T[]", "onChange: (rows: T[]) => void", "blankRow: () => T"],
      },
      {
        name: "TickTrack()",
        description: "A row of tick boxes where value is how many are ticked (used for Dragonbane death rolls).",
        detail: "Renders count toggle buttons. Clicking a ticked box un-ticks it and everything after it; clicking an empty box ticks it and everything before it. Uses aria-pressed for accessibility.",
        file: "src/components/RpgKit/RpgKit.tsx",
        props: ["label: string", "count: number", "value: number", "onChange: (value: number) => void"],
      },
      {
        name: "createBlankSheet()",
        description: "Builds a new CharacterSheet from a template's defaults.",
        detail: "Looks up TEMPLATE_DEFAULTS[templateId] (defaults to \"dnd-5e\"). Copies the traits/inventory arrays so sheets never share them, calls the attacks() and customFields() factories for fresh ids, and sets sheetType from TEMPLATE_LIBRARY. It then applies the template's extras(): createDefaultDwReal / WrathGlory / Dragonbane / Coc for the full sheets (also setting className/level), createDefaultShootThem() for Shoot Them, and characteristics, armour and health for Deathwatch.",
        file: "src/utils/rpgSheets.ts",
      },
      {
        name: "normalizeSheet()",
        description: "Fills in anything missing from a stored or imported sheet, so old saves and hand-edited JSON still render.",
        detail: "Picks the templateId, falling back to \"dnd-5e\" or \"custom\" from sheetType for sheets saved before templates existed. Merges over createBlankSheet(templateId), keeping the id. Checks stats, skills, traits, inventory, attacks and customFields (unknown field types become \"text\"). Then rebuilds the system data: Deathwatch characteristics, Shoot Them nested records, and normalizeDwReal / normalizeWrathGlory / normalizeDragonbane / normalizeCoc. Used by loadStoredSheets(), which falls back to one blank D&D sheet if storage is empty or broken, and by parseImport().",
        file: "src/utils/rpgSheets.ts",
      },
      {
        name: "parseImport()",
        description: "Reads any JSON the page has ever exported and returns normalised sheets.",
        detail: "Accepts a full backup ({ format: \"oh-hub/rpg-sheets\", version, exportedAt, sheets }, as made by createBackup()), a bare array of sheets, or a single legacy sheet. Keeps only objects that have a templateId or sheetType, runs normalizeSheet() on them, and throws if none are left. mergeImported() then replaces saved sheets that have the same id and puts new ones first.",
        file: "src/utils/rpgSheets.ts",
      },
      {
        name: "exportSheetPdf()",
        description: "Renders the sheet panel with paper styling and downloads it as a paginated A4 PDF.",
        detail: "Lazy-loads html2canvas-pro and jsPDF, then calls enterPrintMode(). That adds the rpg-print-mode class and grows textareas to fit their text, and it returns a function that undoes both. Before capture, it gathers page-break points from the edges of boxes like .rpg-core-box, .rpg-skill-row and .rpg-row-table. It captures at 2× scale, and in the cloned page it swaps score-box inputs and selects for plain text so values stay centred. The canvas is cut into A4 pages (10 mm margins), each cut made at the last break point between 30% and 100% of the page height, and every page is added as a JPEG.",
        file: "src/utils/exportSheetPdf.ts",
      },
      {
        name: "derivedStats() / derivedTraits()",
        description: "Per-system rules maths behind the read-only values on the full sheets.",
        detail: "wrathGloryData.derivedTraits() and skillPool(); dragonbaneData.derivedStats(), baseChance(), skillLevel(), damageBonus() and movement(); cocData.derivedStats(), thresholds(), damageBonusAndBuild(), moveRate() and skillValue(); dwRealData.bonusOf() and skillTarget(). Each data file also exports createDefault*() and normalize*() for its system. Covered by src/utils/rpgSystems.test.ts, which checks the rules tables and a JSON round trip for the new templates.",
        file: "src/components/WrathGlory/wrathGloryData.ts, src/components/Dragonbane/dragonbaneData.ts, src/components/CallOfCthulhu/cocData.ts, src/components/DeathwatchReal/dwRealData.ts",
      },
    ],
  },
  {
    id: "dmscreen",
    label: "DM Screen",
    tag: "tool",
    route: "/dm-screen",
    description: "A game master's screen for any tabletop system — an initiative and HP tracker, sheets for named NPCs and loot, story boards of connected cards, and a map maker with fog of war and a live players' window.",
    tree: {
      name: "DmScreenPage()",
      children: [
        {
          name: "DmScreen()",
          children: [
            {
              name: "EncounterTracker()",
              children: [
                {
                  name: "CombatantRow()",
                  children: [{ name: "AttackList()" }],
                },
              ],
            },
            {
              name: "NpcManager()",
              children: [
                {
                  name: "NpcSheet()",
                  children: [{ name: "AttackList()" }, { name: "ImageField()" }],
                },
              ],
            },
            {
              name: "ItemManager()",
              children: [
                {
                  name: "ItemSheet()",
                  children: [{ name: "HolderField()" }, { name: "ImageField()" }],
                },
              ],
            },
            {
              name: "StoryBoard()",
              children: [
                { name: "NodeCard()", children: [{ name: "CardTag()" }] },
                { name: "NodeInspector()", children: [{ name: "HolderField()" }, { name: "ImageField()" }] },
                { name: "LinkInspector()" },
              ],
            },
            {
              name: "MapMaker()",
              children: [
                { name: "MapContent()" },
                { name: "ItemInspector()" },
                { name: "StrokeInspector()" },
                { name: "RoomInspector()" },
              ],
            },
          ],
        },
        { name: "PlayerMapView()" },
      ],
    },
    improvements: [
      "Warn when localStorage is full — saving fails silently today, and imported images (even downscaled) can fill the ~5 MB quota.",
      "Add dice rolling to attacks in the tracker: click an attack to roll its to-hit and damage, and apply the damage to the target.",
      "Let a PC combatant link to a character in Roleplaying Sheets so their HP and AC stay in sync between the two pages.",
      "Add undo to the story board and tracker (the map maker already has a 100-step history).",
      "Search across everything — encounters, NPCs, items and cards on every board — from one box.",
      "Let several DMs share a campaign by syncing the data to a backend instead of only localStorage and JSON export.",
    ],
    functions: [
      {
        name: "DmScreen()",
        description: "Root page. Owns all DM screen data, saves it to localStorage, and switches between the Tracker, NPCs, Items, Story Board and Map tabs.",
        detail: "Loads a DmScreenData object with parseData() (falling back to createDefaultData()) and writes it back to localStorage under STORAGE_KEY \"dm-screen-v1\" in a useEffect on every change. The active tab is in the ?tab= search parameter. Export/Import JSON back up everything in one file. Jump helpers connect the tabs: runEncounter() opens an encounter in the tracker, openNpc() / openItem() open a sheet, and showCard() switches the story board to a board and sets focusNodeId so that card is selected and centred. DmScreenPage() renders PlayerMapView instead when the URL has ?view=player.",
        file: "src/pages/dm-screen.tsx",
        state: ["data: DmScreenData", "importError: string", "focusNodeId: string | null"],
      },
      {
        name: "EncounterTracker()",
        description: "Initiative tracker: a list of encounters, the turn and round bar, initiative rolls, an add-combatants form and one row per combatant.",
        detail: "Combatants are sorted with sortCombatants() (initiative, then modifier, then name). nextTurn() and previousTurn() move the turn and roll over into new rounds. 'Roll initiative' rolls d20 + modifier for everyone or only non-PCs. The add form can add up to 20 copies at once, numbering duplicate names with duplicateName(). Once every PC or every monster is at 0 HP, encounterOutcome() decides the winner and a 'Combat over' banner shows it, which linked story board cards also show. Deleting an encounter unlinks it from cards on every board.",
        file: "src/components/DmScreen/EncounterTracker.tsx",
        props: ["data: DmScreenData", "setData: Dispatch<SetStateAction<DmScreenData>>"],
        state: ["form: typeof EMPTY_FORM"],
      },
      {
        name: "CombatantRow()",
        description: "One combatant: initiative, name, type, AC, size/type and alignment, HP with damage/heal, conditions, attacks, loot and notes.",
        detail: "Damage eats temporary HP first (applyDamage()) and healing stops at max HP (applyHeal()). A combatant at 0 HP is marked Down. Conditions come from STANDARD_CONDITIONS or a custom text box. Attacks, loot and notes stay hidden behind '+ Attacks', '+ Loot' and '+ Notes' links until they have content, so rows stay compact. Loot and notes have a confirm-to-remove button.",
        file: "src/components/DmScreen/EncounterTracker.tsx",
        props: ["combatant: Combatant", "isTurn: boolean", "update: (change: (current: Combatant) => Combatant) => void", "onDuplicate: () => void", "onRemove: () => void"],
        state: ["amount: string", "custom: string", "notesOpen: boolean", "attacksOpen: boolean", "lootOpen: boolean"],
      },
      {
        name: "AttackList()",
        description: "Editable weapon and spell list with a Weapon / Magic toggle per row, shared by NPC sheets and combatants.",
        detail: "Each Attack has a kind, name, to hit (or DC), damage and range, all free text so it works for any system. Switching to Magic relabels the fields (Spell, Attack / DC, Damage / effect) and changes the placeholders. '+ Weapon' and '+ Magic' add rows with createAttack(), and × removes one.",
        file: "src/components/DmScreen/AttackList.tsx",
        props: ["attacks: Attack[]", "onChange: (attacks: Attack[]) => void"],
      },
      {
        name: "NpcManager()",
        description: "The NPCs tab: a searchable list of named NPCs and the selected NPC's sheet.",
        detail: "npcMatches() filters the list so every typed word has to appear somewhere on the sheet. NpcSheet() edits race, alignment, AC, HP, attacks, loot, location (suggesting Location card titles from locationNames()), notes and an image. Its side column lists the story board cards linked to the NPC (npcCards()), the items they carry (itemsHeldBy(), with '→ Party' and 'Give an item…'), and buttons that put the NPC on the current board or add them to the active encounter through combatantFromNpc().",
        file: "src/components/DmScreen/NpcManager.tsx",
        props: ["data: DmScreenData", "setData: Dispatch<SetStateAction<DmScreenData>>", "onShowCard: (boardId: string, nodeId: string) => void", "onOpenItem: (itemId: string) => void"],
        state: ["query: string"],
      },
      {
        name: "ItemManager()",
        description: "The Items tab: loot with type-specific stats, rarity, value and who has it, filterable by holder and searchable.",
        detail: "The list can be filtered by holder (not found, NPCs, locations, the party) with chips and searched with itemMatches(), which also searches the stats for the item's type. ItemSheet() shows the fields from ITEM_STAT_FIELDS for the item's type (weapon damage and range, armour type and AC, potion effect and so on), a HolderField, a description and an image, plus the item's story board cards and '+ Put on story board'.",
        file: "src/components/DmScreen/ItemManager.tsx",
        props: ["data: DmScreenData", "setData: Dispatch<SetStateAction<DmScreenData>>", "onShowCard: (boardId: string, nodeId: string) => void"],
        state: ["filter: Filter", "query: string"],
      },
      {
        name: "HolderField()",
        description: "'Who has it' control for an item: not found yet, an NPC, a location or the party.",
        detail: "Changing the holder kind goes through holderOfKind() so nothing from the old holder is kept. An NPC holder picks from the NPCs tab (the option is disabled when there are none), a location holder suggests Location card titles, and a party holder has an optional 'Carried by' name. Used on item sheets and in the story board side panel for linked item cards.",
        file: "src/components/DmScreen/HolderField.tsx",
        props: ["id: string", "holder: ItemHolder", "data: DmScreenData", "onChange: (holder: ItemHolder) => void"],
      },
      {
        name: "StoryBoard()",
        description: "Pan-and-zoom board of story cards joined by labelled arrows, with several named boards and a side panel for editing.",
        detail: "Works on activeBoard(data) and writes changes back with updateActiveBoard(). The board captures the pointer for panning, dragging cards by their header and dragging the ● handle onto another card to connect them. Wheel zoom uses a non-passive listener and zoomAt(). Ticking the branch the players took runs branchState(), which greys out the other branches and everything only reachable through them. Cards can link to an encounter, a named NPC or an item; linked NPC and item cards take their title from it (cardTitle()) and only their notes can be edited. Dropping an image file on the board makes an image card. The side panel can be hidden and the board height dragged, both remembered per browser.",
        file: "src/components/DmScreen/StoryBoard.tsx",
        props: ["data: DmScreenData", "setData: Dispatch<SetStateAction<DmScreenData>>", "onRunEncounter: (encounterId: string) => void", "onOpenNpc: (npcId: string) => void", "onOpenItem: (itemId: string) => void", "focusNodeId: string | null", "onFocused: () => void"],
        state: ["connect: { from: string; point: Point } | null", "selection: Selection", "sizes: Record<string, Size>", "newKind: NodeKind", "layout: BoardLayout"],
      },
      {
        name: "MapMaker()",
        description: "Battle map editor with premade pieces, freehand brushes, rooms, fog of war, PNG export and a players' window.",
        detail: "Tools are select, erase, room, fog reveal/hide and the brushes. Pieces from the asset palette snap to the GRID (40 px) when snapping is on and can be rotated, duplicated and restacked. Rooms are drawn by dragging corners (roomFromCorners()), fog is painted with a brush or box (fogBox()) or revealed per room (revealRoom()). Changes are checkpointed into an undo/redo history of up to 100 steps. Export draws the map layers into a canvas and downloads a PNG. 'Open player view' opens /dm-screen?view=player in a popup, and another button moves the players' view to show what the DM is looking at. MapContent() from MapLayers.tsx draws the map for both, with audience \"player\" hiding hidden pieces and making fog solid.",
        file: "src/components/DmScreen/MapMaker.tsx",
        props: ["data: DmScreenData", "setData: Dispatch<SetStateAction<DmScreenData>>"],
        state: ["tool: Tool", "selection: Selection", "draft: Draft | null", "category: AssetCategory", "snap: boolean", "historySize: { past: number; future: number }", "exporting: boolean", "fogShape: 'brush' | 'box'"],
      },
      {
        name: "PlayerMapView()",
        description: "The players' window: the DM's current map without hidden pieces and with solid fog, updating live.",
        detail: "Reads the same localStorage data as the DM screen and listens for the 'storage' event, which other windows receive whenever the DM screen saves, so it follows the DM's changes without a server. Has its own pan and zoom.",
        file: "src/components/DmScreen/PlayerMapView.tsx",
        state: ["data: DmScreenData | null", "view: MapView"],
      },
      {
        name: "normalizeData()",
        description: "Turns any parsed JSON (old saves, imports, hand-edited files) into valid DmScreenData, or null if it isn't a DM screen.",
        detail: "Validates every encounter, combatant, attack, board, card, link, NPC, item and map, filling in defaults for anything missing. Saves from before multiple boards had a single board, which becomes the first of the list. Links to encounters, NPCs or items that no longer exist are dropped, and links are re-added through addLink() so duplicate and dangling arrows disappear. parseData() wraps it with JSON.parse.",
        file: "src/utils/dmScreen.ts",
      },
      {
        name: "branchState()",
        description: "Works out which story cards are choices and which cards and arrows are no longer reachable once branches are ticked.",
        detail: "A card with several outgoing arrows is a choice point. When one of its branches is ticked as taken, the others are ruled out, and so is everything that can only be reached through them. Handles cycles without looping forever, and a card reachable through a taken branch stays live even if a ruled-out branch also leads to it.",
        file: "src/utils/dmScreen.ts",
      },
      {
        name: "combatantFromNpc()",
        description: "Builds a tracker combatant from an NPC sheet.",
        detail: "Copies name, AC, HP, race (as size/type), alignment and notes, gives the attacks new ids so editing the combatant mid-fight leaves the NPC alone, and adds the items the NPC carries to the loot as a 'Carrying: …' line.",
        file: "src/utils/dmScreen.ts",
      },
    ],
  },
  {
    id: "tools",
    label: "Dev Tools",
    tag: "utility",
    route: "/tools",
    description: "A page of small browser-only developer tools. The first is a JSON converter that checks and formats JSON and turns relaxed JS objects, CSV/TSV and key = value files into JSON.",
    tree: {
      name: "Tools()",
      children: [{ name: "JsonConverter()" }],
    },
    improvements: [
      "Add YAML and XML as input formats, and JSON → CSV for the other direction.",
      "Highlight the error position inside the input box itself instead of only below it.",
      "Add a tree view of the output that can be collapsed, with a path for each value.",
      "More tools on the same page: Base64 and URL encode/decode, a JWT decoder, a regex tester, UUID and hash generators, and a colour converter.",
      "Move the conversion into a Web Worker so very large files don't freeze the page while typing.",
    ],
    functions: [
      {
        name: "Tools()",
        description: "Root page with one tab per tool.",
        detail: "Same shell as the other hub tool pages: top bar, hero and a tab bar whose active tab lives in the ?tab= search parameter. Adding a tool means adding it to TABS and rendering it in the panel.",
        file: "src/pages/tools.tsx",
      },
      {
        name: "JsonConverter()",
        description: "Two-pane converter: input with format, CSV and typing options on the left, formatted JSON with copy and download on the right.",
        detail: "Converts on every change with convert() inside a useMemo, so the output follows the typing. Text can be typed, pasted, opened from a file or dropped on the box, and the draft is kept in localStorage. The status line says which format was used and what came out (e.g. '3 rows, 4 columns'), or shows the error with its line and column, an excerpt with a caret, and a 'Show me' button that puts the cursor there. Output can be indented with 2 or 4 spaces or tabs, minified and key-sorted, copied, or downloaded under a cleaned-up file name.",
        file: "src/components/Tools/JsonConverter.tsx",
        state: ["input: string", "options: ConvertOptions", "indent: Indent", "sortKeys: boolean", "fileName: string", "copied: boolean"],
      },
      {
        name: "convert()",
        description: "Turns text in one of four formats into a JSON value, detecting the format when asked to.",
        detail: "detectFormat() looks for a leading { or [ (strict JSON if it parses, otherwise a JS object), a 'const x =' or 'export default' prefix, mostly key = value lines, or else CSV. Errors are ConvertError objects with a line and column. Returns the value, the format used and a short summary for the status line.",
        file: "src/utils/jsonConverter.ts",
      },
      {
        name: "Parser (parseJson() / parseJsObject())",
        description: "A small recursive-descent parser for strict JSON and relaxed JS object literals.",
        detail: "Strict mode accepts exactly JSON, with friendlier messages than JSON.parse (for example 'Expected \",\" or \"}\" in the object' at the exact line and column, or a hint to try the JS object format for comments, unquoted keys and trailing commas). Relaxed mode also allows // and /* */ comments, unquoted and numeric keys, single-quoted strings, trailing commas, hex numbers, a leading + and undefined (as null).",
        file: "src/utils/jsonConverter.ts",
      },
      {
        name: "parseCsv()",
        description: "CSV/TSV to an array of objects (or of arrays without a header row).",
        detail: "parseCsvRows() follows RFC 4180 quoting, so quoted cells can hold the delimiter, line breaks and \"\" quotes. detectDelimiter() picks comma, semicolon, tab or pipe from the first line. Blank and repeated header names get unique names so no column is lost, and ragged rows are padded. typedValue() turns 42, true and null into real values but keeps numbers with leading zeros, like zip codes, as text.",
        file: "src/utils/jsonConverter.ts",
      },
      {
        name: "parseKeyValue()",
        description: ".env, .ini and .properties files to a nested object.",
        detail: "Reads 'key = value' and 'key: value' lines, skipping comments and blank lines. [section] headers and dotted keys like db.host become nested objects, quoted values keep their text, and an 'export ' prefix (from shell .env files) is ignored. A key that is used both as a value and as a parent of nested keys is reported with its line.",
        file: "src/utils/jsonConverter.ts",
      },
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  game:     "#e8c547",
  tool:     "#6eb5ff",
  creative: "#b06ef3",
  utility:  "#5dd6a8",
  demo:     "#f0855a",
  content:  "#e87070",
};

function TreeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const isRoot = depth === 0;
  return (
    <div className="fr-tree-node" style={{ "--depth": depth } as React.CSSProperties}>
      <span className={`fr-tree-name ${isRoot ? "fr-tree-name--root" : ""}`}>
        {node.name}
      </span>
      {node.children && node.children.length > 0 && (
        <div className="fr-tree-children">
          {node.children.map((child, i) => (
            <TreeView key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function matches(query: string, ...fields: (string | undefined)[]): boolean {
  const q = query.toLowerCase();
  return fields.some(f => f?.toLowerCase().includes(q));
}

const ALL_TAGS = [...new Set(PROJECTS.map(p => p.tag))];

export default function FunctionReference() {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("pokemon");
  const [expandedFn, setExpandedFn] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "az">("default");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim();

    let result = PROJECTS.flatMap(project => {
      if (tagFilter && project.tag !== tagFilter) return [];
      if (!q) return [project];
      const projectMatches = matches(q, project.label, project.description);
      const matchingFns = project.functions.filter(fn =>
        matches(q, fn.name, fn.description, fn.detail, fn.file)
      );
      const matchingImprovements = project.improvements.filter(imp =>
        matches(q, imp)
      );
      if (!projectMatches && matchingFns.length === 0 && matchingImprovements.length === 0) return [];
      return [{
        ...project,
        functions: projectMatches ? project.functions : matchingFns,
        improvements: projectMatches ? project.improvements : matchingImprovements,
      }];
    });

    if (sortBy === "az") {
      result = [...result].sort((a, b) => a.label.localeCompare(b.label));
    }

    return result;
  }, [search, sortBy, tagFilter]);

  function scrollTo(id: string) {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleFn(key: string) {
    setExpandedFn(prev => prev === key ? null : key);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      const viewportMid = el!.scrollTop + 120;
      let found = PROJECTS[0].id;
      for (const p of PROJECTS) {
        const ref = sectionRefs.current[p.id];
        if (ref && ref.offsetTop <= viewportMid) found = p.id;
      }
      setActive(found);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fr-root">
      <header className="fr-topbar">
        <button className="fr-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <div className="fr-topbar-center">
          <span className="fr-topbar-eyebrow">// reference</span>
          <span className="fr-topbar-title">Function Index</span>
        </div>
        <span className="fr-topbar-count">{PROJECTS.length} projects</span>
      </header>

      <div className="fr-layout">
        <nav className="fr-nav">
          <div className="fr-search-wrap">
            <input
              className="fr-search"
              type="text"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="fr-search-clear" onClick={() => setSearch("")}>×</button>
            )}
          </div>

          <div className="fr-filter-row">
            <button
              className={`fr-sort-btn ${sortBy === "default" ? "fr-sort-btn--active" : ""}`}
              onClick={() => setSortBy("default")}
            >
              Default
            </button>
            <button
              className={`fr-sort-btn ${sortBy === "az" ? "fr-sort-btn--active" : ""}`}
              onClick={() => setSortBy("az")}
            >
              A → Z
            </button>
          </div>

          <div className="fr-tag-filter">
            <button
              className={`fr-tag-btn ${tagFilter === null ? "fr-tag-btn--active" : ""}`}
              onClick={() => setTagFilter(null)}
            >
              All
            </button>
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`fr-tag-btn ${tagFilter === tag ? "fr-tag-btn--active" : ""}`}
                style={{ "--tag-color": TAG_COLORS[tag] } as React.CSSProperties}
                onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="fr-nav-label">
            {search || tagFilter ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : "Projects"}
          </p>
          {filtered.map((p) => (
            <button
              key={p.id}
              className={`fr-nav-item ${active === p.id ? "fr-nav-item--active" : ""}`}
              onClick={() => scrollTo(p.id)}
              style={{ "--tag-color": TAG_COLORS[p.tag] } as React.CSSProperties}
            >
              <span className="fr-nav-dot" />
              <span className="fr-nav-text">{p.label}</span>
              <span className="fr-nav-tag">{p.tag}</span>
            </button>
          ))}
        </nav>

        <main className="fr-content" ref={scrollRef}>
          {filtered.length === 0 ? (
            <div className="fr-empty">No results for "<strong>{search}</strong>"</div>
          ) : (
            filtered.map((project) => (
              <section
                key={project.id}
                className="fr-section"
                ref={(el) => { sectionRefs.current[project.id] = el; }}
              >
                <div className="fr-section-header">
                  <div className="fr-section-title-row">
                    <h2 className="fr-section-title">{project.label}</h2>
                    <span
                      className="fr-section-tag"
                      style={{ "--tag-color": TAG_COLORS[project.tag] } as React.CSSProperties}
                    >
                      {project.tag}
                    </span>
                    <button
                      className="fr-open-btn"
                      onClick={() => navigate(project.route)}
                    >
                      Open project ↗
                    </button>
                  </div>
                  <p className="fr-section-desc">{project.description}</p>
                </div>

                {project.tree && (
                  <div className="fr-tree-wrap">
                    <p className="fr-tree-label">// component tree</p>
                    <TreeView node={project.tree} />
                  </div>
                )}

                <div className="fr-fn-list">
                  {project.functions.map((fn) => {
                    const key = `${project.id}__${fn.name}`;
                    const isOpen = expandedFn === key;
                    return (
                      <div
                        key={fn.name}
                        className={`fr-fn-card ${isOpen ? "fr-fn-card--open" : ""}`}
                        onClick={() => toggleFn(key)}
                      >
                        <div className="fr-fn-summary">
                          <div className="fr-fn-name">{fn.name}</div>
                          <p className="fr-fn-desc">{fn.description}</p>
                          <span className="fr-fn-chevron">{isOpen ? "▲" : "▼"}</span>
                        </div>

                        {isOpen && (
                          <div className="fr-fn-detail">
                            <p className="fr-fn-detail-text">{fn.detail}</p>
                            <div className="fr-fn-meta">
                              <div className="fr-fn-meta-row">
                                <span className="fr-fn-meta-label">file</span>
                                <span className="fr-fn-meta-value">{fn.file}</span>
                              </div>
                              {fn.props && fn.props.length > 0 && (
                                <div className="fr-fn-meta-row fr-fn-meta-row--list">
                                  <span className="fr-fn-meta-label">props</span>
                                  <ul className="fr-fn-meta-list">
                                    {fn.props.map(p => <li key={p}>{p}</li>)}
                                  </ul>
                                </div>
                              )}
                              {fn.state && fn.state.length > 0 && (
                                <div className="fr-fn-meta-row fr-fn-meta-row--list">
                                  <span className="fr-fn-meta-label">state</span>
                                  <ul className="fr-fn-meta-list">
                                    {fn.state.map(s => <li key={s}>{s}</li>)}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {project.improvements.length > 0 && (
                  <div className="fr-improvements">
                    <p className="fr-improvements-label">// things to improve</p>
                    <ul className="fr-improvements-list">
                      {project.improvements.map((imp, i) => (
                        <li key={i} className="fr-improvements-item">
                          <span className="fr-improvements-bullet">→</span>
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))
          )}

          <div className="fr-footer">
            <span>// end of index</span>
          </div>
        </main>
      </div>
    </div>
  );
}
