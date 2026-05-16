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
        description: "A single Pokémon card slot with drag-drop, HP controls, and knockout detection.",
        detail: "Handles everything for one slot: renders the Pokémon's name, HP bar, and attached energy icons. Accepts dragged energy chips via onDrop and updates the energy count. Exposes + / − buttons for damage and healing. Detects when HP reaches 0 and triggers a knockout callback. Active slot has a glowing border; bench slots are dimmed when it's not the player's turn.",
        file: "src/components/Pokemon/PokemonSlot.tsx",
        props: ["pokemon: PokemonCard | null", "isActive: boolean", "onDamage: (n: number) => void", "onHeal: (n: number) => void", "onEnergyDrop: (type: string) => void"],
      },
      {
        name: "EnergyPool()",
        description: "Displays the available energy types for the current player as coloured icons.",
        detail: "Reads the current player's energy pool from game state and renders one icon per energy type that still has remaining energy. Used as a read-only display — does not handle drag interactions. Updates reactively when energy is spent (attached to a Pokémon) or when the turn switches.",
        file: "src/components/Pokemon/EnergyPool.tsx",
        props: ["pool: Record<EnergyType, number>"],
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
    label: "Todo App",
    tag: "utility",
    route: "/todo-app",
    description: "Minimal task manager with filter views and localStorage persistence.",
    tree: { name: "TodoApp()" },
    improvements: [
      "Add categories or tags to group related tasks.",
      "Add due dates with overdue highlighting.",
      "Allow drag-to-reorder tasks in the list.",
      "Add subtasks — each todo can have a checklist of steps.",
      "Sync to a backend so tasks persist across devices.",
    ],
    functions: [
      {
        name: "TodoApp()",
        description: "Full task list with add/complete/delete and filter views, synced to localStorage.",
        detail: "Initialises todo state by reading from localStorage on mount. Each todo has an id (UUID), text, done flag, and createdAt timestamp. The add function sanitises input text before creating a new todo. The filter state (all / active / done) drives a derived filtered list used for rendering. A clear-completed button removes all done todos. Every state change is written back to localStorage via a useEffect.",
        file: "src/pages/todo-app.tsx",
        state: ["todos: Todo[]", "input: string", "filter: 'all' | 'active' | 'done'"],
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
