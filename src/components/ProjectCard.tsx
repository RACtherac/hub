import { useNavigate } from "react-router-dom";
import { type Project } from "../types";


type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${project.branch}`);
  };

  return (
    <div style={cardStyle}>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <button onClick={handleClick}>Open Project</button>
    </div>
  );
  
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "1rem",
  margin: "1rem 0",
  borderRadius: "8px",
};