import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/magazine.css";

// ── Envelope Component ────────────────────────────────────────────────────────

interface EnvelopeProps {
  from: string;
  subject: string;
  greeting: string;
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
}

function Envelope({ from, subject, greeting, topContent, bottomContent }: EnvelopeProps) {
  const [state, setState] = useState<"closed" | "open" | "closing">("closed");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function close() {
    setState("closing");
    timerRef.current = setTimeout(() => setState("closed"), 1150);
  }

  return (
    <div
      className={
        `mg-envelope` +
        (state === "open" ? " mg-envelope--open" : "") +
        (state === "closing" ? " mg-envelope--closing" : "")
      }
      onClick={() => state === "closed" && setState("open")}
    >
      {/* Envelope body — cream paper with X-crease decoration */}
      <div className="mg-env-body">
        {state === "closed" && (
          <div className="mg-env-meta">
            <span className="mg-env-from">{from}</span>
            <span className="mg-env-subject">{subject}</span>
            <span className="mg-env-hint">click to open →</span>
          </div>
        )}
      </div>

      {/* Letter — slides up out of envelope when opened */}
      <div className="mg-letter">
        <p className="mg-letter-greeting">{greeting}</p>
        <div className="mg-letter-top">{topContent}</div>
        {/* Bottom half: appears folded initially, unfolds after letter rises */}
        <div className="mg-letter-bottom">
          <div className="mg-fold-line" />
          {bottomContent}
          <button
            className="mg-letter-close"
            onClick={(e) => { e.stopPropagation(); close(); }}
          >
            fold &amp; seal ↓
          </button>
        </div>
      </div>

      {/* Flap — folds back on open */}
      <div className="mg-env-flap" />
    </div>
  );
}

// ── Magazine Page ─────────────────────────────────────────────────────────────

export default function Magazine() {
  const navigate = useNavigate();

  return (
    <div className="mg-page">

      {/* Top bar */}
      <div className="mg-topbar">
        <button className="mg-topbar-back" onClick={() => navigate("/")}>
          ← OH<span>/</span>Hub
        </button>
        <span className="mg-topbar-label">The Log · No. 4</span>
      </div>

      {/* Masthead */}
      <header className="mg-masthead">
        <div className="mg-masthead-meta">
          <span>Vol. 1</span>
          <span className="mg-dot">·</span>
          <span>No. 4</span>
          <span className="mg-dot">·</span>
          <span>Spring 2026</span>
        </div>
        <h1 className="mg-masthead-title">THE LOG</h1>
        <p className="mg-masthead-tagline">
          A personal review of things made, read, and considered.
        </p>
        <hr className="mg-rule" />
      </header>

      {/* Editorial grid */}
      <main className="mg-grid">

        {/* ── Feature article ── */}
        <article className="mg-feature">
          {/* <p className="mg-label">// Feature</p> */}
          <h2 className="mg-feature-title">
           
          </h2>
          {/* <p className="mg-byline">by the editor</p> */}

          {/* CSS-only geometric art block */}
          <div className="mg-art">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="mg-art-cell"
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>

          <p className="mg-lead">
            
          </p>
          <p className="mg-body">
           
          </p>
          <p className="mg-body">
            
          </p>
        </article>

        {/* ── Editor's letter (envelope) ── */}
        <section className="mg-slot mg-slot--editor">
          <p className="mg-label">// Letter from the Editor</p>
          <Envelope
            from="The Editor"
            subject="On this issue"
            greeting="Dear Reader,"
            topContent={
              <>
                <p>
                 This page was as i imaged that is should be a blog area. Just notes for anyone who reads here about what I'm working on, what I'm thinking about, and what I'm learning. A place to share the things that are inspiring me, and maybe even some of the things that aren't.
                </p>
              </>
            }
            bottomContent={
              <>
                <p>
                  This issue is about craft in its slowest forms: painting miniatures,
                  building layouts, writing sentences that earn their length. If you
                  find something here that makes you want to make something, I'll
                  consider it a success.
                </p>
                <div className="mg-sig">
                  <span>Sincerely,</span>
                  <strong>O.H</strong>
                </div>
              </>
            }
          />
        </section>

        <div className="mg-full-rule"><hr className="mg-rule" /></div>

        {/* ── Recommendations column ── */}
        {/* <article className="mg-column">
          <p className="mg-label">// Recommended</p>
          <h3 className="mg-column-title">What I've been<br />listening to</h3>
          <ol className="mg-list">
            <li>
              <span className="mg-list-num">01</span>
              <div>
                <strong>Brian Eno — Ambient 1</strong>
                <p>For when the work needs to stop fighting you.</p>
              </div>
            </li>
            <li>
              <span className="mg-list-num">02</span>
              <div>
                <strong>Aphex Twin — Selected Ambient Works Vol. II</strong>
                <p>For when you want the room to breathe.</p>
              </div>
            </li>
            <li>
              <span className="mg-list-num">03</span>
              <div>
                <strong>Harold Budd — The Plateaux of Mirror</strong>
                <p>For late evenings with a brush in hand.</p>
              </div>
            </li>
          </ol>
        </article> */}

        {/* ── Pull quote ── */}
        <blockquote className="mg-pullquote">
          <p>"Who am I?"</p>
          <cite>Hub updates, education, hobbes</cite>
        </blockquote>

        <div className="mg-full-rule"><hr className="mg-rule" /></div>

        {/* ── Hub dispatch + notes ── */}
        <div className="mg-dispatch-row">
        <section className="mg-slot mg-slot--field">
          <p className="mg-label">// Hub Update</p>
          <Envelope
            from="O.H, OH/Hub"
            subject="On finishing things"
            greeting="To anyone following along,"
            topContent={
              <>
                <p>
                  The web is upp and running and hosted.
                </p>
              </>
            }
            bottomContent={
              <>
                <p>
                  Placeholder boxes where model photos should be. Once those are
                  in, it's done. Everything else is already there.
                </p>
                <p>
                  Also been thinking about making a small game. Something in Unity
                  or similar — nothing ambitious. The kind of thing you could build
                  in a weekend and actually finish. Something like <em>No, I'm Not
                  a Human</em>: a simple concept, low scope, maybe put it on
                  itch.io and see if it earns anything. Not about the money so much
                  as having shipped a game.
                </p>
                <div className="mg-sig">
                  <span>Almost there,</span>
                  <strong>O.</strong>
                </div>
              </>
            }
          />
        </section>

        {/* ── Hub notes ── */}
        <aside className="mg-notes">
          <p className="mg-label">// Hub · Notes</p>
          <div className="mg-note">
            <span className="mg-note-num">001</span>
            <p>The army builder is functional. Images are the last piece — model cards look empty without them.</p>
          </div>
          <div className="mg-note">
            <span className="mg-note-num">002</span>
            <p>Most of this was built in evenings. Shipping something finished feels different from shipping something that works.</p>
          </div>
        </aside>
        </div>

        <div className="mg-full-rule"><hr className="mg-rule" /></div>

        {/* ── Education dispatch + notes ── */}
        <div className="mg-dispatch-row">
        <section className="mg-slot mg-slot--field">
          <p className="mg-label">// Education</p>
          <Envelope
            from="O."
            subject="On signing up for things"
            greeting="Note to self,"
            topContent={
              <>
                <p>
                  Enrolled in a few Python courses and some problem-solving ones.
                  Also signed up for a handful focused on using AI tools properly —
                  not just using them, but knowing when and how.
                </p>
              </>
            }
            bottomContent={
              <>
                <p>
                  Hard to know in advance which will actually land. The AI tools
                  ones feel immediately useful. The Python ones are the longer bet.
                  Good to have both on the go.
                </p>
                <div className="mg-sig">
                  <span>Enrolled,</span>
                  <strong>O.</strong>
                </div>
              </>
            }
          />
        </section>

        {/* ── Education notes ── */}
        <aside className="mg-notes">
          <p className="mg-label">// Education · Notes</p>
          <div className="mg-note">
            <span className="mg-note-num">001</span>
            <p>Python fills the gap. Most of the work here has been TypeScript — useful to have both.</p>
          </div>
          <div className="mg-note">
            <span className="mg-note-num">002</span>
            <p>The AI tools courses are less about the tools and more about knowing when to reach for them.</p>
          </div>
        </aside>
        </div>

        <div className="mg-full-rule"><hr className="mg-rule" /></div>

        {/* ── Hobby dispatch + notes ── */}
        <div className="mg-dispatch-row">
        <section className="mg-slot mg-slot--field">
          <p className="mg-label">// Hobby</p>
          <Envelope
            from="A.H., Gothenburg"
            subject="From somewhere with bad lighting"
            greeting="Hello,"
            topContent={
              <>
                <p>
                  The millon models have ended i pledged 25 painted 30 not that i dident have time just dident have enough models.
                </p>
              </>
            }
            bottomContent={
              <>
                {/* CSS-drawn miniature illustration */}
                <div className="mg-letter-art">
                  <div className="mg-mini-fig">
                    <div className="mg-mini-head" />
                    <div className="mg-mini-torso" />
                    <div className="mg-mini-arm mg-mini-arm--l" />
                    <div className="mg-mini-arm mg-mini-arm--r" />
                    <div className="mg-mini-leg mg-mini-leg--l" />
                    <div className="mg-mini-leg mg-mini-leg--r" />
                    <div className="mg-mini-gun" />
                  </div>
                  <span className="mg-art-caption">a plague marine, wip</span>
                </div>

             
                <div className="mg-sig">
                  <span>Until next issue,</span>
                  <strong>O.H.</strong>
                </div>
              </>
            }
          />
        </section>

        {/* ── Hobby notes ── */}
        <aside className="mg-notes">
          <p className="mg-label">// Hobby · Notes</p>
          <div className="mg-note">
            <span className="mg-note-num">001</span>
            <p>Models for a Million: 25 in. Budget is the bottleneck, not ambition. A finished 800-point Astra Militarum army is on the shelf.</p>
          </div>
          <div className="mg-note">
            <span className="mg-note-num">002</span>
            <p>Painting 9 death riders in a row was not the most fun but it was a good exercise in patience, and ultimatly nice to see on the shelf.</p>
          </div>
          <div className="mg-note">
            <span className="mg-note-num">003</span>
            <p>Also tested new water with AoS, blood riders.</p>
          </div>
        </aside>
        </div>

        {/* ── Footer / next issue ── */}
        <footer className="mg-footer">
          <hr className="mg-rule" />
          <div className="mg-footer-inner">
            <p className="mg-label">// Next Issue · No. 5</p>
            <p className="mg-footer-body">
              Themes under consideration: colour theory, digital tools that feel analog,
              and whether grid systems are a crutch or a compass. Arrives when it's ready.
            </p>
          </div>
        </footer>

      </main>
    </div>
  );
}
