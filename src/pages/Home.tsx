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
    name: "Warhammer Picture Army Builder",
    description: "See the army you build.",
    branch: "warhammer-army-builder",
  },
];

export default function Home() {
  return (
    <main className="home">

      <header className="home-header">
        <h1>🚀 My Project Hub</h1>
        <p>Select a project to open</p>
      </header>

      <section className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.branch} project={project} />
        ))}
      </section>

    </main>
  );
}