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
          OH<span>/</span>Hub
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
          <p className="mg-label">// Feature</p>
          <h2 className="mg-feature-title">
            On the Pleasure of<br />
            Making Things <em>Slowly</em>
          </h2>
          <p className="mg-byline">by the editor</p>

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
            There is a particular kind of satisfaction that only comes from working
            slowly. Not slowly out of difficulty, but slowly out of choice — the
            deliberate reduction of pace to something that matches the rhythm of thought.
          </p>
          <p className="mg-body">
            We live in a culture that rewards speed. Shipping fast, iterating faster.
            The metric of productivity has quietly become velocity. But there are things
            that only reveal themselves when you sit with them: a painting that needs
            another week of drying, a paragraph that needs another month of distance,
            a miniature that needs seventeen layers of carefully thinned paint.
          </p>
          <p className="mg-body">
            This issue is a small argument for slowness. Not as a brand or an aesthetic,
            but as a practical stance toward making things that matter.
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
                  This fourth issue arrives later than planned. I had written it
                  twice before — each version too earnest, too careful. The third
                  draft appeared in one afternoon while I was supposed to be doing
                  something else entirely.
                </p>
                <p>
                  I think that's the point. The work that matters tends to happen sideways.
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
                  <strong>O.</strong>
                </div>
              </>
            }
          />
        </section>

        <div className="mg-full-rule"><hr className="mg-rule" /></div>

        {/* ── Recommendations column ── */}
        <article className="mg-column">
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
        </article>

        {/* ── Pull quote ── */}
        <blockquote className="mg-pullquote">
          <p>"The work is the residue<br />of the attention."</p>
          <cite>— paraphrased, origin uncertain</cite>
        </blockquote>

        <div className="mg-full-rule"><hr className="mg-rule" /></div>

        {/* ── Hub dispatch + notes ── */}
        <div className="mg-dispatch-row">
        <section className="mg-slot mg-slot--field">
          <p className="mg-label">// Hub Update</p>
          <Envelope
            from="O., OH/Hub"
            subject="On finishing things"
            greeting="To anyone following along,"
            topContent={
              <>
                <p>
                  OH/Hub is nearly done. Most features are built and in place.
                  The Warhammer army builder is the last real gap — everything
                  works, it just needs unit images.
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
                  I've been painting a squad of Death Guard for three weeks.
                  Every evening, one or two layers. The plague marines are
                  starting to look genuinely diseased, which I mean as a compliment.
                </p>
              </>
            }
            bottomContent={
              <>
                <p>
                  I found that mixing a little Nurgle's Rot into the recesses makes
                  them look like something you wouldn't want to touch. Exactly the
                  effect I was after.
                </p>

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

                <p>
                  The work is slow but I don't think I'd want it any other way.
                </p>
                <div className="mg-sig">
                  <span>Until next issue,</span>
                  <strong>A.H.</strong>
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
            <p>Thin your paints. Yes, more than that.</p>
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
