import { useNavigate } from "react-router-dom";
import PhotoRotator from "../components/PhotoRotator";
import cvPdf from "../assets/portfolio/oscar hugosson cv.docx (1).pdf";
import "../components/styles/portfolio.css";

const skills = ["React", "TypeScript", "HTML5", "CSS3", "SQL", "C#", "Agile", "JavaScript"];

const projects = [
  { name: "Warhammer Army Builder", description: "Create and visualise your army lists.", path: "/warhammer-army-builder" },
  { name: "Pokemon TCG Tool", description: "Track Pokémon health and energy during battles.", path: "/pokemon-tcg-tool" },
  { name: "Mini Paint Tracker", description: "Save paint recipes and photos for your miniatures.", path: "/paint-tracker" },
  { name: "Pixel Art Editor", description: "Draw pixel art on an 8×8, 16×16, or 32×32 canvas.", path: "/pixel-art" },
  { name: "Tactics Game", description: "Turn-based strategy — pick a faction and fight the PC or a friend.", path: "/tactics-game" },
  { name: "Todo App", description: "Task management application.", path: "/todo-app" },
  { name: "Password Strength Checker", description: "Analyse a password's strength, entropy, and get improvement suggestions.", path: "/password-strength" },
  { name: "Rate Limiter Demo", description: "Fire requests at a live API and watch the rate limiter block you at 5 per 10s.", path: "/rate-limiter" },
  { name: "The Log", description: "A personal blog — project updates, education notes, and hobby dispatches.", path: "/blog" },
  { name: "Function Reference", description: "A developer index of every project's components and functions.", path: "/function-reference" },
];

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <main className="portfolio">

      <div className="portfolio-topbar">
        <span className="portfolio-page-label">Oscar Hugosson</span>
        <a className="portfolio-download-btn" href={cvPdf} download="Oscar Hugosson CV.pdf">
          Download CV ↓
        </a>
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
          <div className="background-list">
            <div className="background-item">
              <span className="background-date">2021 – 2024</span>
              <p>LBS Creative University — Game Graphics</p>
            </div>
            <div className="background-item">
              <span className="background-date">2024 – 2026</span>
              <p>Jensen — System Development, focus on security</p>
            </div>
            <div className="background-item">
              <span className="background-date">2025 – 2026</span>
              <p>6-month internship at Visma Enterprise AB</p>
            </div>
          </div>
        </section>

        <section className="portfolio-section">
          <p className="section-label">// skills</p>
          <div className="skills-grid">
            {skills.map((s) => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </section>

        <section className="portfolio-section">
          <p className="section-label">// languages & other</p>
          <div className="extras-list">
            <div className="extra-item">
              <span className="extra-label">Swedish</span>
              <span className="extra-value">Native</span>
            </div>
            <div className="extra-item">
              <span className="extra-label">English</span>
              <span className="extra-value">Fluent — spoken & written</span>
            </div>
            <div className="extra-item">
              <span className="extra-label">Driving licence</span>
              <span className="extra-value">Class B</span>
            </div>
          </div>
        </section>
      </div>

      <div className="portfolio-experience">
        <section className="portfolio-section experience-section">
          <p className="section-label">// work experience</p>
          <div className="experience-card">
            <div className="experience-header">
              <div>
                <h3 className="experience-company">Visma Enterprise AB</h3>
                <p className="experience-role">Developer Intern</p>
              </div>
              <span className="experience-date">6 months</span>
            </div>
            <ul className="experience-bullets">
              <li>Rewrote legacy MVC views to React, modernising the frontend across multiple internal sites</li>
              <li>Contributed to backend development, building and maintaining server-side functionality for the sites</li>
              <li>Got to attend multiple courses on AI-tool usage</li>
            </ul>
          </div>

          <div className="experience-card">
            <div className="experience-header">
              <div>
                <h3 className="experience-company">Park & Camping</h3>
                <p className="experience-role">Caretaker</p>
              </div>
              <span className="experience-date">Multiple summers</span>
            </div>
            <ul className="experience-bullets">
              <li>Maintained and cared for a park and camping site across multiple summer seasons</li>
              <li>Developed strong teamwork skills working closely with colleagues in a hands-on environment</li>
              <li>Took ownership and responsibility for assigned tasks and the quality of work delivered</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="portfolio-references">
        <section className="portfolio-section experience-section">
          <p className="section-label">// references</p>
          <div className="references-grid">
            <div className="reference-card">
              <h3 className="reference-name">Andreas Wijk</h3>
              <p className="reference-role">Former Manager — Växjö Arena Service, Evedal Camping & Badplats</p>
              <a className="reference-contact" href="tel:0470734774">0470-734774</a>
            </div>
            <div className="reference-card">
              <h3 className="reference-name">Daniel Andersson</h3>
              <p className="reference-role">Mentor — Visma Enterprise AB</p>
              <a className="reference-contact" href="mailto:daniel.andersson@visma.com">daniel.andersson@visma.com</a>
            </div>
          </div>
        </section>
      </div>

      <div className="portfolio-projects-section">
        <div className="portfolio-projects-header">
          <p className="section-label">// projects</p>
        </div>
        <div className="portfolio-projects-grid">
          {projects.map((project, i) => (
            <article
              key={project.path}
              className="portfolio-project-card"
              style={{ animationDelay: `${0.3 + i * 0.07}s` }}
              onClick={() => navigate(project.path)}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button className="open-btn">Open ↗</button>
            </article>
          ))}
        </div>
      </div>

    </main>
  );
}
