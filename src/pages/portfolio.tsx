import { useNavigate } from "react-router-dom";

export default function Portfolio() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={handleBack} style={backButtonStyle}>
        ← Back to Hub
      </button>

      <h1>My Portfolio</h1>

      <p>Welcome to my portfolio page.</p>

      <section>
        <h2>About Me</h2>
        <p>
          I am a junior developer building web applications with React and TypeScript.
        </p>
      </section>

      <section>
        <h2>Projects</h2>
        <ul>
          <li>Project 1</li>
          <li>Project 2</li>
          <li>Project 3</li>
        </ul>
      </section>
    </div>
  );
}

const backButtonStyle: React.CSSProperties = {
  marginBottom: "1rem",
  padding: "0.5rem 1rem",
  cursor: "pointer",
};