import ProjectCard from "../components/ProjectCard";
import { type Project } from "../types";

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
    name: "Warhammer pictuer army builder",
    description: "See the army you build",
    branch: "warhammer-army-builder"
  },
];

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 My Project Hub</h1>
      {projects.map((project) => (
        <ProjectCard key={project.branch} project={project} />
      ))}
    </div>
  );
}