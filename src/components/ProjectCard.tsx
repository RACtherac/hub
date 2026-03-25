import { useNavigate } from "react-router-dom";
import { type Project } from "../types";
import "../components/styles/projectcard.css";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();

  return (
    <article
      className="project-card"
      onClick={() => navigate(`/${project.branch}`)}
    >
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </article>
  );
}