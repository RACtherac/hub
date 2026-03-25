import { useNavigate } from "react-router-dom";
import PhotoRotator from "../components/PhotoRotator";
import "../components/styles/portfolio.css";

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <main className="portfolio">

      {/* Header */}
      <header className="portfolio-header">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Hub
        </button>

        <h1>Oscar Hugosson</h1>
        <p>Junior Developer</p>

        {/* CV & Links */}
        <div className="portfolio-links">
          {/* <a
            href="../../assets/portfolio/oscar_hugosson_cv.docx.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-link"
          >
            Download CV
          </a> */}
          <a
            href="https://github.com/RACtherac"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub
          </a>
          {/* <a
            href="www.linkedin.com/in/oscar-hugosson-736267341/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            LinkedIn
          </a> */}
        </div>
      </header>

      {/* Photo Rotator */}
      <PhotoRotator />

      {/* About / Skills */}
      <section className="about">
        <h2>About Me</h2>
        <p>
          I studied at Jensen, System Development with a focus on security.
          I completed a 6-month internship at Visma Enterprise AB.
        </p>

        <h3>Skills</h3>
        <p>
          React • TypeScript • HTML5 • CSS3 • SQL • C# • Git • Agile
        </p>
      </section>

      {/* Projects */}
      <section className="projects">
        <h2>Projects</h2>
        <div className="project-grid">

          <article className="project-card">
            <h3>Pokemon TCG Tool</h3>
            <p>Search and manage Pokémon cards.</p>
            <button onClick={() => navigate("/pokemon-tcg-tool")}>
              Open
            </button>
          </article>

          <article className="project-card">
            <h3>Warhammer Army Builder</h3>
            <p>Create and manage army lists.</p>
            <button onClick={() => navigate("/warhammer-army-builder")}>
              Open
            </button>
          </article>

        </div>
      </section>
    </main>
  );
}