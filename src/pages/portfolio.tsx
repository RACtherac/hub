import { useNavigate } from "react-router-dom";
import PhotoRotator from "../components/PhotoRotator";

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")}>← Back to Hub</button>

      <h1>My Portfolio</h1>

      <PhotoRotator />

      <section>
        <h2>About Me</h2>
        <p>I build projects with React and TypeScript.</p>
      </section>
    </div>
  );
}