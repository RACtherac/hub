import { useNavigate } from "react-router-dom";
import PhotoRotator from "../components/PhotoRotator";
import "../components/styles/portfolio.css";

const skills = ["React", "TypeScript", "HTML5", "CSS3", "SQL", "C#", "Agile", "JavaScript"];

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <main className="portfolio">

      <div className="portfolio-topbar">
        <button className="portfolio-back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <span className="portfolio-page-label">Portfolio</span>
      </div>

      <header className="portfolio-hero">
        <div className="portfolio-hero-left">
          <p className="portfolio-eyebrow">// about me</p>
          <h1 className="portfolio-name">Oscar<br />Hugosson</h1>
          <p className="portfolio-role">Junior Developer</p>
        </div>

        <div className="portfolio-hero-right">
          <PhotoRotator />
          <div className="portfolio-links">
            <a
              href="https://github.com/RACtherac"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span className="link-arrow">↗</span>
            </a>
          </div>
        </div>
      </header>

      <div className="portfolio-content">
        <section className="portfolio-section">
          <p className="section-label">// background</p>
          <p>
            Studied at Jensen, System Development with a focus on security.
            Completed a 6-month internship at Visma Enterprise AB.
          </p>
        </section>

        <section className="portfolio-section">
          <p className="section-label">// skills</p>
          <div className="skills-grid">
            {skills.map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </section>
      </div>

      <div className="portfolio-projects-grid">
        <article
          className="portfolio-project-card"
          onClick={() => navigate("/pokemon-tcg-tool")}
        >
          <h3>Pokemon TCG Tool</h3>
          <p>Track Pokémon health and energy during battles.</p>
          <button className="open-btn">Open ↗</button>
        </article>

        <article
          className="portfolio-project-card"
          onClick={() => navigate("/warhammer-army-builder")}
        >
          <h3>Warhammer Army Builder</h3>
          <p>Create and visualise your army lists.</p>
          <button className="open-btn">Open ↗</button>
        </article>
      </div>

    </main>
  );
}
