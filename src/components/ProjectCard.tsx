import { useNavigate } from "react-router-dom";
import { type Project } from "../types";
import "../components/styles/projectcard.css";

type Props = {
  project: Project;
  index: number;
  total: number;
};

export default function ProjectCard({ project, index, total }: Props) {
  const navigate = useNavigate();
  const num = String(index).padStart(2, "0");

  return (
    <article
      className="project-card"
      onClick={() => navigate(`/${project.branch}`)}
    >
      <div className="project-card-bg-num">{num}</div>
      <div className="project-card-index">{num} / {String(total).padStart(2, "0")}</div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <span className="project-card-arrow">↗</span>
    </article>
  );
}
