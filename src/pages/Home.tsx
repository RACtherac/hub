import ProjectCard from "../components/ProjectCard";
import { type Project } from "../types";
import "../components/styles/home.css";

const projects: Project[] = [
  {
    name: "Portfolio Site",
    description: "My personal portfolio project.",
    branch: "portfolio",
  },
  {
    name: "Todo App",
    description: "Task management application.",
    branch: "todo-app",
  },
  {
    name: "Pokemon TCG Tool",
    description: "Track Pokémon health and energy during battles.",
    branch: "pokemon-tcg-tool",
  },
  {
    name: "Warhammer Army Builder",
    description: "See the army you build.",
    branch: "warhammer-army-builder",
  },
  {
    name: "Mini Paint Tracker",
    description: "Save paint recipes and photos for your miniatures.",
    branch: "paint-tracker",
  },
  {
    name: "Pixel Art Editor",
    description: "Draw pixel art on an 8×8, 16×16, or 32×32 canvas.",
    branch: "pixel-art",
  },
  {
    name: "Tactics Game",
    description: "Pick a faction and fight either against the PC or a friend in a turn-based game.",
    branch: "tactics-game",
  },
  {
    name: "Password Strength Checker",
    description: "Analyse a password's strength, entropy, and get improvement suggestions.",
    branch: "password-strength",
  },
  {
    name: "Rate Limiter Demo",
    description: "Fire requests at a live API and watch the rate limiter block you at 5 per 10s.",
    branch: "rate-limiter",
  },
  {
    name: "The Log",
    description: "A personal blog — project updates, education notes, and hobby dispatches.",
    branch: "magazine",
  },
  {
    name: "Function Reference",
    description: "A developer index of every project's components and functions.",
    branch: "function-reference",
  },
];

export default function Home() {
  return (
    <main className="home">

      <div className="home-topbar">
        <span className="home-logo">OH<span>/</span>Hub</span>
        <span className="home-nav-label">Project Directory</span>
      </div>

      <header className="home-hero">
        <p className="home-eyebrow">// workspace</p>
        <h1 className="home-title">
          Select a <em>project</em> to open
        </h1>
        <p className="home-subtitle">
          {projects.length} projects available &nbsp;·&nbsp; Oscar Hugosson
        </p>
      </header>

      <div className="home-grid-header">
        <span className="home-grid-label">Projects</span>
        <div className="home-grid-line" />
      </div>

      <section className="project-list">
        {projects.map((project, i) => (
          <ProjectCard key={project.branch} project={project} index={i + 1} total={projects.length} />
        ))}
      </section>

    </main>
  );
}
