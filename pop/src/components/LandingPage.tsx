"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Circuit from "@/components/Circuit";

const BLUE = "#2339f5";
const FIRST_PAPER = new Date(2027, 3, 27); // 27 Apr 2027

// Only classes that open a real page. Keep in step with src/app/classes/page.tsx.
const classGroups: { label: string; items: { name: string; code: string; href: string }[] }[] = [
  {
    label: "Cambridge IGCSE",
    items: [
      { name: "Physics", code: "0625", href: "/classes/igcse-physics" },
      { name: "Physics (Triple)", code: "0625", href: "/classes/igcse-physics-triple" },
      { name: "Chemistry", code: "0620", href: "/classes/igcse-chemistry" },
      { name: "Biology", code: "0610", href: "/classes/igcse-biology" },
      { name: "Mathematics", code: "0580", href: "/classes/igcse-math" },
      { name: "Business Studies", code: "0450", href: "/classes/igcse-business" },
    ],
  },
  {
    label: "Cambridge IGCSE Co-ordinated Sciences",
    items: [
      { name: "Biology", code: "0654", href: "/classes/igcse-sci-biology" },
      { name: "Chemistry", code: "0654", href: "/classes/igcse-sci-chemistry" },
      { name: "Physics", code: "0654", href: "/classes/igcse-sci-physics" },
    ],
  },
  {
    label: "Pearson Edexcel IGCSE",
    items: [{ name: "Mathematics A", code: "4MA1", href: "/classes/edexcel-igcse-math" }],
  },
];

// Real labs from /interactives. Keep in step with src/app/interactives/page.tsx.
const labs = [
  {
    id: "physics-motion-graphs",
    name: "Motion Graphs Lab",
    subject: "Physics",
    body: "Animate a vehicle along a track to plot and read displacement-time, velocity-time and acceleration-time graphs.",
  },
  {
    id: "physics-density-archimedes",
    name: "Density & Archimedes' Principle Lab",
    subject: "Physics",
    body: "Submerge blocks in liquids of different densities and compare the buoyant forces.",
  },
  {
    id: "physics-vector-addition-components",
    name: "Vector Addition & Components Lab",
    subject: "Physics",
    body: "Resolve force vectors into horizontal and vertical components and find the resultant.",
  },
];

const tools = [
  { n: "01", title: "Notes", body: "Short notes organised by syllabus topic, with the wording examiners reward.", href: "/classes", cta: "See the classes" },
  { n: "02", title: "Flashcards", body: "Make your own sets and revise them card by card.", href: "/flashcards", cta: "Open flashcards" },
  { n: "03", title: "Interactive labs", body: "Move the sliders and watch the physics, chemistry, biology or maths respond.", href: "/interactives", cta: "Open the labs" },
  { n: "04", title: "Dictionary", body: "Technical terms with a definition, an example and how the term is used.", href: "/dictionary", cta: "Open the dictionary" },
  { n: "05", title: "Mini mock exam", body: "A short timed paper with a countdown. Physics and Chemistry for now.", href: "/classes/mock/igcse-physics", cta: "Try the Physics mock" },
  { n: "06", title: "Discussion", body: "Ask about a paper question. The answer you accept goes to the top.", href: "/discussion", cta: "Open the board" },
];

const statements = [
  { id: "1.6.1", text: "Define momentum as mass × velocity" },
  { id: "1.6.2", text: "Recall and use p = mv" },
  { id: "1.6.3", text: "Define impulse as force × time" },
];

const faqs = [
  { q: "Which exam boards?", a: "Cambridge IGCSE, including Co-ordinated Sciences, and Pearson Edexcel IGCSE Mathematics A (4MA1). A-Level classes are on the way." },
  { q: "Do I need an account?", a: "Not to look around. Classes, labs, the dictionary and the discussion board are open to everyone. You need an account to post or reply." },
  { q: "What is in a class?", a: "The topics of its syllabus, in order, with notes. How much each topic has varies by class while the notes are still being written." },
  { q: "Are the mock exams full papers?", a: "Not yet. They are short timed sets, and only Physics and Chemistry have one today." },
  { q: "Who writes the notes?", a: "Contributors, including senior students who write and proofread them. You can join them." },
];

function daysUntilFirstPaper() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((FIRST_PAPER.getTime() - startOfToday.getTime()) / 86400000));
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroCta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  // Fade each section in as it arrives (not for people who prefer reduced motion)
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("lp-anim");
    const sections = root.querySelectorAll<HTMLElement>(":scope > section:not(.lp-hero), .lp-last > section");
    sections.forEach((el) => el.classList.add("lp-rv"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    sections.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("lp-anim");
    };
  }, []);

  // The phone's sticky button appears only once the hero button has scrolled away
  useEffect(() => {
    const el = heroCta.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Computed from the viewer's date. Server and browser may differ by a day, so the text is allowed to differ.
  const days = daysUntilFirstPaper();
  const weeks = Math.round(days / 7);
  const now = new Date();
  const today = `${now.getDate()} ${now.toLocaleString("en-GB", { month: "short" }).toUpperCase()}`;
  const passed = mounted ? Math.min(1, Math.max(0, 1 - days / 182)) : 0;
  const ringLen = 2 * Math.PI * 112;

  return (
    <div className="lp" ref={rootRef}>
      <style>{css}</style>
      <a className="lp-skip" href="#lp-main">Skip to content</a>

      {/* ───────── HERO ───────── */}
      <section className="lp-hero" aria-labelledby="lp-h1">
        <div className="lp-hero-main">
          <header className="lp-nav">
            <Link href="/" className="lp-logo">
              <b>POP</b>
              <span>Studying</span>
            </Link>
            <nav className="lp-nav-r lp-mobile-only" aria-label="Account">
              <Link href="/sign-in" className="lp-link-sm">Log in</Link>
              <Link href="/sign-up" className="lp-btn lp-btn-white lp-btn-sm">Sign up</Link>
            </nav>
          </header>

          <h1 id="lp-h1" className="lp-h1">
            Revise exactly what the examiner asks.
          </h1>

          <div className="lp-hero-lower">
            <p className="lp-lede">
              Notes, flashcards, interactive labs and a dictionary for IGCSE classes, each built on the syllabus topic
              it&apos;s examined on.
            </p>
            <div className="lp-cta-row" ref={heroCta}>
              <Link href="/classes" className="lp-btn lp-btn-black">Open a class →</Link>
            </div>
          </div>
        </div>

        <div className="lp-hero-panel">
          <Circuit id="hc" />
          <nav className="lp-nav-r lp-desktop-only" aria-label="Account">
            <Link href="/sign-in" className="lp-link-sm lp-white">Log in</Link>
            <Link href="/sign-up" className="lp-btn lp-btn-white lp-btn-sm">Sign up</Link>
          </nav>
          <div className="lp-countdown">
            <svg viewBox="0 0 240 240" className="lp-ring" aria-hidden>
              <circle cx="120" cy="120" r="112" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
              <circle
                cx="120"
                cy="120"
                r="112"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeDasharray={`${ringLen * passed} ${ringLen}`}
                transform="rotate(-90 120 120)"
              />
            </svg>
            <div className="lp-big-days" suppressHydrationWarning>{days}</div>
          </div>
          <p className="lp-days-label">days until 27 April 2027</p>
          <p className="lp-panel-foot">Check your own exam timetable for your papers.</p>
        </div>
      </section>

      {/* ───────── NOTES EXAMPLE ───────── */}
      <section id="lp-main" className="lp-sec lp-notes" aria-labelledby="lp-notes">
        <div>
          <h2 id="lp-notes" className="lp-h2 lp-h2-tight">Notes written against the syllabus, not around it.</h2>
          <p className="lp-body">
            Each note starts from a syllabus statement and stops when you can answer it. No padding, no tangents.
          </p>
          <h3 className="lp-sub-caps">Example: 1.6 Momentum statements</h3>
          <ul className="lp-statements">
            {statements.map((s) => (
              <li key={s.id}>
                <b>{s.id}</b>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
          <Link href="/classes/igcse-physics" className="lp-link lp-mt">Open Physics 0625 →</Link>
        </div>

        <div>
          <p className="lp-example-label">Illustrative example. Not taken from an exam paper.</p>
          <article className="lp-note" aria-label="Example note">
            <div className="lp-note-title">
              <h3>Momentum</h3>
            </div>
            <div className="lp-note-grid">
              <div>
                <p>
                  Momentum is the product of an object&apos;s mass and its velocity. Because velocity has a direction,
                  momentum is a vector: if right is positive, a ball moving left has negative momentum.
                </p>
                <div className="lp-formula">
                  <div>p = m v</div>
                  <small>p &nbsp; momentum, kg m/s</small>
                  <small>m &nbsp; mass, kg</small>
                  <small>v &nbsp; velocity, m/s</small>
                </div>
                <h4 className="lp-caps-blue">Examiner tip</h4>
                <p className="lp-italic">Give the unit as kg m/s or N s. “kg m” is not a unit of momentum.</p>
              </div>
              <div>
                <h4 className="lp-caps-grey">Worked example</h4>
                <div className="lp-working">
                  A 2.0 kg trolley moving at 3.0 m/s hits a 1.0 kg trolley at rest and they stick together.<br />
                  p before = 2.0 × 3.0 = 6.0 kg m/s<br />
                  p after = (2.0 + 1.0) × v<br />
                  6.0 = 3.0 v, &nbsp;so &nbsp;v = 2.0 m/s
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ───────── CLASSES ───────── */}
      <section className="lp-sec lp-index" aria-labelledby="lp-classes">
        <div className="lp-index-l">
          <h2 id="lp-classes" className="lp-h2">The classes you can open today.</h2>
          <p className="lp-body">
            Each class follows its syllabus in order. Pick yours and start at the first topic.
          </p>
          <Link href="/classes" className="lp-link lp-mt">See every class →</Link>
        </div>

        <div className="lp-index-r">
          {classGroups.map((g) => (
            <div key={g.label} className="lp-group">
              <h3 className="lp-list-head">{g.label}</h3>
              <ul>
                {g.items.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="lp-class">
                      <span>{c.name}</span>
                      <em>{c.code}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── TOOLS ───────── */}
      <section className="lp-sec" aria-labelledby="lp-tools">
        <div className="lp-split">
          <h2 id="lp-tools" className="lp-h2 lp-h2-wide">Six ways to revise a topic.</h2>
          <p className="lp-body lp-narrow">Use them in any order. You can look around without an account.</p>
        </div>
        <ol className="lp-steps">
          {tools.map((t) => (
            <li key={t.n} className="lp-step">
              <div className="lp-step-rule"><i /></div>
              <div className="lp-step-body">
                <div className="lp-step-n" aria-hidden>{t.n}</div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <Link href={t.href} className="lp-link lp-link-block">{t.cta} →</Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── LABS ───────── */}
      <section className="lp-sec lp-labs" aria-labelledby="lp-labs">
        <div>
          <h2 id="lp-labs" className="lp-h2 lp-h2-tight">See it move before you memorise it.</h2>
          <p className="lp-body">
            Interactive labs let you change a value and watch what happens, so the equation stops being a thing to learn
            and starts being a thing you&apos;ve seen.
          </p>
          <Link href="/interactives" className="lp-link lp-mt">Open all the labs →</Link>
        </div>
        <ul className="lp-lab-list">
          {labs.map((l) => (
            <li key={l.id}>
              <Link href={`/interactives/${l.id}`} className="lp-lab">
                <span className="lp-lab-sub">{l.subject}</span>
                <h3>{l.name}</h3>
                <p>{l.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="lp-sec lp-faq-sec" aria-labelledby="lp-faq">
        <div>
          <h2 id="lp-faq" className="lp-h2 lp-h2-tight">Questions.</h2>
          <div className="lp-faq">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="lp-body lp-mt0">
            The discussion board is new. Ask the question you lost a mark on, and mark the reply that worked.
          </p>
          <Link href="/discussion" className="lp-link lp-mt">Ask the first question →</Link>
          <p className="lp-body">Want to write or proofread notes for your own class?</p>
          <Link href="/contribute" className="lp-link lp-mt">Become a contributor →</Link>
        </div>
      </section>

      <div className="lp-last">
      {/* ───────── CTA ───────── */}
      <section className="lp-final" aria-labelledby="lp-final-h">
        <Circuit id="fc" />
        <div className="lp-final-in">
          <div className="lp-big-days lp-final-days" aria-hidden suppressHydrationWarning>{days}</div>
          <div>
            <h2 id="lp-final-h" className="lp-h2 lp-white">
              <span className="lp-sr" suppressHydrationWarning>{days} </span>days to 27 April 2027. Plenty of time, if you start tonight.
            </h2>
            <div className="lp-cta-row">
              <Link href="/classes" className="lp-btn lp-btn-white lp-blue">Open a class →</Link>
              <Link href="/sign-up" className="lp-link lp-white">Create an account →</Link>
            </div>
          </div>
        </div>
        <div className="lp-timeline">
          <i />
          <div suppressHydrationWarning><span>TODAY &nbsp;·&nbsp; {today}</span><span>{weeks} WEEKS</span><span>27 APR 2027</span></div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="lp-footer">
        <div className="lp-foot-grid">
          <div>
            <div className="lp-logo lp-logo-lg"><b>POP</b><span>Studying</span></div>
            <p className="lp-fine">Exam prep for IGCSE, written against the syllabus.</p>
          </div>
          <nav aria-label="Classes">
            <p className="lp-foot-h">Classes</p>
            <Link href="/classes">All classes</Link>
            <Link href="/classes/igcse-physics">Physics 0625</Link>
            <Link href="/classes/igcse-math">Mathematics 0580</Link>
            <Link href="/classes/edexcel-igcse-math">Edexcel Maths 4MA1</Link>
          </nav>
          <nav aria-label="Tools">
            <p className="lp-foot-h">Tools</p>
            <Link href="/learn">Revision notes</Link>
            <Link href="/flashcards">Flashcards</Link>
            <Link href="/interactives">Interactive labs</Link>
            <Link href="/dictionary">Dictionary</Link>
            <Link href="/discussion">Discussion</Link>
            <Link href="/arena">POP Arena</Link>
          </nav>
          <nav aria-label="Get involved">
            <p className="lp-foot-h">Get involved</p>
            <Link href="/contribute">Become a contributor</Link>
            <Link href="/sign-up">Create an account</Link>
            <Link href="/sign-in">Log in</Link>
          </nav>
        </div>
        <div className="lp-legal">
          <span>© 2026 POP Studying. Not affiliated with Cambridge University Press &amp; Assessment or Pearson Edexcel.</span>
        </div>
      </footer>
      </div>

      <div className={`lp-sticky${showSticky ? " show" : ""}`}>
        <Link href="/classes" className="lp-btn lp-btn-black" tabIndex={showSticky ? 0 : -1}>Open a class →</Link>
      </div>
    </div>
  );
}

const css = `
.lp{--blue:${BLUE};--ink:#111;--mute:#555;--rule:#e2e2e2;--beige:#e2dfd8;--tint:#e8eafd;
  --u:clamp(1px,min(calc(100vw / 1440),calc(100vh / 900)),1.6px);--pad:calc(56 * var(--u));--gut:var(--pad);--vh:100vh;
  background:#fff;color:var(--ink);min-height:100vh;
  font-family:"Helvetica Neue",Helvetica,Arial,"Liberation Sans",sans-serif;
  -webkit-font-smoothing:antialiased;overflow-x:hidden}
.lp *{box-sizing:border-box}
:where(.lp) a{color:inherit;text-decoration:none}
:where(.lp) :where(h1,h2,h3,h4,h5,p,ul,ol){margin:0;padding:0}
:where(.lp) :where(ul,ol){list-style:none}
.lp button{font:inherit;cursor:pointer;background:none;border:0;color:inherit}
.lp .lp-blue{color:var(--blue)}.lp .lp-white{color:#fff}.lp .lp-white-soft{color:rgba(255,255,255,.88)}
.lp-mt{display:inline-block;margin-top:calc(22 * var(--u))}.lp-mt2{margin-top:calc(28 * var(--u))}.lp-mt3{margin-top:calc(56 * var(--u))}

.lp-sec{padding:calc(88 * var(--u)) var(--gut);display:grid;align-content:center}
.lp-num,.lp-eyebrow,.lp-sub-caps,.lp-caps-blue,.lp-caps-grey,.lp-tiny-caps,.lp-coming,.lp-crumb{
  font-size:calc(13 * var(--u));font-weight:700;letter-spacing:.02em;text-transform:uppercase}
.lp-num,.lp-caps-blue,.lp-eyebrow{color:var(--blue)}
.lp-caps-grey,.lp-sub-caps,.lp-tiny-caps,.lp-crumb{color:#444}
.lp-sub-caps.lp-blue{color:var(--blue)}
.lp-h1{font-size:calc(76 * var(--u));line-height:.98;letter-spacing:-.04em;font-weight:700;max-width:calc(800 * var(--u));margin-top:calc(20 * var(--u))}
.lp-h2{font-size:calc(40 * var(--u));line-height:1.02;letter-spacing:-.035em;font-weight:700;margin-top:calc(14 * var(--u))}
.lp-h2-tight{line-height:1;max-width:calc(420 * var(--u))}
.lp-h2-wide{max-width:calc(640 * var(--u))}
.lp-body{font-size:calc(17 * var(--u));line-height:1.55;color:#222;max-width:calc(430 * var(--u));margin-top:calc(20 * var(--u))}
.lp-narrow{max-width:calc(400 * var(--u));margin-top:0}
.lp-fine{font-size:calc(14 * var(--u));line-height:1.5;color:var(--mute);margin-top:calc(14 * var(--u))}
.lp-link{font-size:calc(15 * var(--u));font-weight:700;color:var(--blue)}
.lp-link-sm{font-size:calc(14 * var(--u));font-weight:700}
.lp-btn{display:inline-flex;align-items:center;justify-content:center;font-size:calc(15 * var(--u));font-weight:700;padding:0 calc(28 * var(--u));height:calc(48 * var(--u));white-space:nowrap}
.lp-btn-black{background:#111;color:#fff!important}
.lp-btn-white{background:#fff;color:#111}
.lp-btn-sm{height:calc(40 * var(--u));padding:0 calc(20 * var(--u));font-size:calc(14 * var(--u))}
.lp-cta-row{display:flex;align-items:center;gap:calc(24 * var(--u));margin-top:calc(24 * var(--u));flex-wrap:wrap}

/* hero */
.lp-hero{display:grid;grid-template-columns:minmax(0,1fr) 28%;min-height:var(--vh);margin:0}
.lp-hero-main{padding:0 calc(56 * var(--u)) calc(40 * var(--u)) var(--pad);display:flex;flex-direction:column}
.lp-nav{display:flex;justify-content:space-between;align-items:center;padding:calc(20 * var(--u)) 0 calc(16 * var(--u));border-bottom:1px solid #eee}
.lp-logo{display:inline-flex;align-items:baseline;gap:calc(5 * var(--u));color:var(--blue)}
.lp-logo b{font-size:calc(24 * var(--u));letter-spacing:-.02em}
.lp-logo span{font-size:calc(14 * var(--u));color:#111}
.lp-logo-lg{flex-direction:column;gap:0}.lp-logo-lg b{font-size:calc(24 * var(--u))}.lp-logo-lg span{font-size:calc(15 * var(--u))}
.lp-nav-r{display:flex;align-items:center;gap:calc(22 * var(--u))}
.lp-mobile-only{display:none}
.lp-h1{margin-top:auto}
.lp-hero-lower{margin-bottom:auto;border-top:3px solid #111;margin-top:calc(32 * var(--u));padding-top:calc(28 * var(--u))}
.lp-lede{font-size:calc(19 * var(--u));line-height:1.55;max-width:calc(520 * var(--u))}
.lp-hero-lower .lp-cta-row{margin-top:calc(20 * var(--u))}
.lp-hero-panel{position:relative;background:var(--blue);color:#fff;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:0 calc(28 * var(--u)) calc(36 * var(--u))}
.lp-hero-panel .lp-nav-r{position:absolute;top:calc(17 * var(--u));right:calc(30 * var(--u));z-index:2}
.lp-hero-panel .lp-link-sm{color:#fff}
.lp-countdown{position:relative;margin:auto 0 0 0;aspect-ratio:1;max-width:calc(280 * var(--u));width:100%;display:flex;align-items:center;justify-content:center;z-index:1}
.lp-ring{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.lp-big-days{font-size:calc(160 * var(--u));line-height:.8;font-weight:700;letter-spacing:-.07em;color:#fff;position:relative}
.lp-countdown .lp-big-days{font-size:calc(84 * var(--u));margin-left:calc(-4 * var(--u));white-space:nowrap}
.lp-days-label{position:relative;font-size:calc(16 * var(--u));margin-top:calc(20 * var(--u));font-weight:600}
.lp-panel-foot{position:relative;font-size:calc(13 * var(--u));font-weight:700;margin-top:calc(30 * var(--u));opacity:.9}

/* index */
.lp-index{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.6fr);gap:calc(40 * var(--u)) calc(64 * var(--u));align-items:start}
.lp-index-l .lp-body{margin-top:calc(28 * var(--u))}
.lp-list-head{display:flex;justify-content:space-between;font-size:calc(13 * var(--u));font-weight:700;border-bottom:3px solid #111;padding-bottom:calc(8 * var(--u));color:#333}
.lp-list-head span{color:#444;font-size:calc(12 * var(--u))}
.lp-class{display:flex;justify-content:space-between;align-items:center;min-height:44px;padding:calc(13 * var(--u)) 0;border-bottom:1px solid var(--rule);font-size:calc(20 * var(--u));font-weight:700;letter-spacing:-.01em}
.lp-index-r{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:calc(32 * var(--u)) calc(40 * var(--u));align-content:start}
.lp-class h3{font-size:calc(20 * var(--u));letter-spacing:-.01em}
.lp-class small{display:block;font-size:calc(14 * var(--u));color:var(--mute);margin-top:calc(4 * var(--u))}
.lp-class em{font-style:normal;color:var(--blue);font-size:calc(19 * var(--u));font-weight:600;letter-spacing:-.01em}
.lp-class:hover span{color:var(--blue)}

/* method */
.lp-split{display:flex;justify-content:space-between;align-items:flex-start;gap:calc(40 * var(--u));flex-wrap:wrap}
.lp-split .lp-narrow{margin-top:calc(20 * var(--u))}
.lp-steps{display:grid;grid-template-columns:repeat(3,1fr);column-gap:calc(32 * var(--u));row-gap:calc(28 * var(--u));margin-top:calc(36 * var(--u))}
.lp-step{position:relative}
.lp-step-rule{height:calc(12 * var(--u));position:relative}
.lp-step-rule::before{content:"";position:absolute;left:0;right:0;top:calc(4 * var(--u));border-top:3px solid #111}
.lp-step-rule i{position:absolute;left:0;top:0;width:calc(12 * var(--u));height:calc(12 * var(--u));background:var(--blue)}
.lp-step-body{padding:calc(16 * var(--u)) calc(16 * var(--u)) 0 0;min-height:0;display:flex;flex-direction:column;border-left:0}
.lp-step-n{font-size:calc(56 * var(--u));line-height:1;font-weight:700;letter-spacing:-.04em;color:var(--blue)}
.lp-step h3{font-size:calc(19 * var(--u));margin:calc(14 * var(--u)) 0 calc(8 * var(--u));letter-spacing:-.01em}
.lp-step p{font-size:calc(15 * var(--u));line-height:1.5;color:#222;flex:1;max-width:calc(210 * var(--u))}
.lp-link-block{display:inline-flex;align-items:center;min-height:44px;margin-top:calc(12 * var(--u))}
.lp-step small{font-size:calc(13 * var(--u));font-weight:700;color:#444;margin-top:calc(20 * var(--u))}

/* notes */
.lp-notes{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);gap:calc(64 * var(--u));align-items:start}
.lp-sub-caps{margin-top:calc(56 * var(--u));margin-bottom:calc(6 * var(--u))}
.lp-notes .lp-sub-caps{margin-top:calc(32 * var(--u));padding-bottom:calc(6 * var(--u));border-bottom:2px solid #111;font-size:calc(13 * var(--u));color:var(--blue)}
.lp-statements li{display:flex;gap:calc(14 * var(--u));font-size:calc(15 * var(--u));padding:calc(10 * var(--u)) 0;border-bottom:1px solid var(--rule);align-items:center}
.lp-statements b{color:var(--blue);font-size:calc(14 * var(--u));min-width:calc(40 * var(--u))}
.lp-statements span{flex:1}
.lp-statements i{color:var(--blue);font-style:normal;font-size:calc(16 * var(--u))}
.lp-note{border:1px solid #d8d8d8;border-top:3px solid var(--blue);padding:calc(26 * var(--u)) calc(34 * var(--u)) calc(26 * var(--u));background:#fff}
.lp-note-title{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #111;padding-bottom:calc(10 * var(--u));margin-top:calc(10 * var(--u))}
.lp-note-title h3{font-size:calc(34 * var(--u));letter-spacing:-.03em}
.lp-note-title span{font-size:calc(12 * var(--u));font-weight:700;color:var(--blue)}
.lp-note-grid{display:grid;grid-template-columns:1.15fr 1fr;gap:calc(32 * var(--u));margin-top:calc(12 * var(--u))}
.lp-note-grid p{font-size:calc(15 * var(--u));line-height:1.5}
.lp-formula{border-left:3px solid var(--blue);padding-left:calc(14 * var(--u));margin:calc(32 * var(--u)) 0 calc(24 * var(--u))}
.lp-formula div{font-size:calc(48 * var(--u));font-weight:700;letter-spacing:-.03em;color:var(--blue);line-height:1.1}
.lp-formula small{display:block;font-size:calc(13 * var(--u));color:#555;margin-top:calc(5 * var(--u))}
.lp-italic{font-style:italic;margin-top:calc(6 * var(--u))}
.lp-working{font-size:calc(14 * var(--u));line-height:1.6}

/* papers */

/* quiz */

/* mock */

/* arena */

/* pricing */
.lp-faq>div{padding:calc(14 * var(--u)) 0 calc(12 * var(--u));border-bottom:1px solid var(--rule)}
.lp-faq h4{font-size:calc(16 * var(--u))}.lp-faq p{font-size:calc(15 * var(--u));line-height:1.4;color:#444;margin-top:calc(6 * var(--u));max-width:calc(420 * var(--u))}

/* final cta */
.lp-last{min-height:var(--vh);display:flex;flex-direction:column}
.lp-final{flex:1;position:relative;background:var(--blue);color:#fff;padding:calc(56 * var(--u)) var(--gut) calc(28 * var(--u));overflow:hidden;display:flex;flex-direction:column;justify-content:center}
.lp-final-in{position:relative;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:calc(20 * var(--u));align-items:center;margin-top:calc(30 * var(--u))}
.lp-final-days{font-size:calc(190 * var(--u))}
.lp-final .lp-h2{font-size:calc(40 * var(--u));line-height:1.02;max-width:calc(520 * var(--u));margin-top:0}
.lp-final .lp-fine{margin-top:calc(18 * var(--u))}
.lp-timeline{position:relative;margin-top:calc(36 * var(--u))}
.lp-timeline i{display:block;height:1px;background:rgba(255,255,255,.7);position:relative}
.lp-timeline i::before{content:"";position:absolute;left:0;top:calc(-4 * var(--u));width:calc(9 * var(--u));height:calc(9 * var(--u));border-radius:50%;background:#fff}
.lp-timeline div{display:flex;justify-content:space-between;font-size:calc(13 * var(--u));font-weight:700;margin-top:calc(8 * var(--u));gap:calc(10 * var(--u));flex-wrap:wrap}

/* footer */
.lp-footer{padding:calc(40 * var(--u)) var(--gut) 0}
.lp-foot-grid{display:grid;grid-template-columns:1.9fr 1fr 1fr 1fr;gap:calc(20 * var(--u))}
.lp-foot-h{font-size:calc(13 * var(--u));color:var(--blue);margin-bottom:calc(10 * var(--u))}
.lp-foot-grid a{display:flex;align-items:center;min-height:44px;font-size:calc(15 * var(--u))}
.lp-foot-grid .lp-fine{max-width:calc(280 * var(--u));margin-top:calc(14 * var(--u))}
.lp-foot-grid>div:last-child .lp-fine{margin:0 0 calc(20 * var(--u))}
.lp-legal{display:flex;justify-content:space-between;gap:calc(12 * var(--u));flex-wrap:wrap;border-top:1px solid var(--rule);margin-top:calc(26 * var(--u));padding:calc(14 * var(--u)) 0 calc(26 * var(--u));font-size:calc(13 * var(--u));color:#444}
.lp-legal b{font-size:calc(13 * var(--u))}

 /* section transitions */
.lp-rv>*{transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}
.lp-rv>*:nth-child(2){transition-delay:.12s}
.lp-rv>*:nth-child(3){transition-delay:.24s}
.lp-anim .lp-rv:not(.in)>*{opacity:0;transform:translateY(36px)}
/* responsive */
@media (max-width:1000px){
  .lp-sec,.lp-quiz,.lp-hero,.lp-last{min-height:0}
  .lp-nav{margin-bottom:calc(40 * var(--u))}.lp-eyebrow{margin-top:0}.lp-hero-lower{margin-bottom:0}
  .lp-final-days{font-size:calc(130 * var(--u))}.lp-big-days{font-size:calc(130 * var(--u))}.lp-countdown .lp-big-days{font-size:calc(130 * var(--u))}
  .lp-hero{grid-template-columns:1fr;margin:0}
  .lp-hero{display:flex;flex-direction:column}
  .lp-hero-main{display:contents}
  .lp-nav{order:0;margin:0 var(--pad) 0!important}
  .lp-hero-panel{order:3;min-height:0;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:calc(12 * var(--u)) calc(20 * var(--u));padding:calc(18 * var(--u)) var(--pad)}
  .lp-h1{order:1;margin:calc(28 * var(--u)) var(--pad) 0}
  .lp-hero-lower{order:2;margin:calc(20 * var(--u)) var(--pad) calc(28 * var(--u))}
  .lp-countdown{margin:0;width:auto;max-width:none;aspect-ratio:auto}
  .lp-ring{display:none}
  .lp-countdown .lp-big-days{font-size:calc(56 * var(--u));margin-left:0}
  .lp-days-label{margin-top:0}
  .lp-panel-foot{display:none}
  .lp-desktop-only{display:none}.lp-mobile-only{display:flex}
  .lp-index,.lp-notes,.lp-labs,.lp-pricing,.lp-quiz-in,.lp-final-in{grid-template-columns:1fr}
  .lp-h2-tight{max-width:none}
  .lp-steps{grid-template-columns:repeat(2,1fr);row-gap:calc(30 * var(--u))}
  .lp-index-r{grid-template-columns:1fr}
  .lp-foot-grid{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:640px){
  .lp{--pad:calc(20 * var(--u))}
  .lp-h1{font-size:calc(42 * var(--u))}.lp-h2,.lp-quiz .lp-h2,.lp-final .lp-h2{font-size:calc(32 * var(--u))}
  .lp-nav{gap:calc(12 * var(--u))}.lp-nav-r{gap:calc(12 * var(--u))}
  .lp-sec,.lp-quiz{padding-top:calc(48 * var(--u));padding-bottom:calc(48 * var(--u))}
  .lp-nav{margin-bottom:calc(40 * var(--u))}
  .lp-hero-lower{grid-template-columns:1fr}
  .lp-note{padding:calc(18 * var(--u))}
  .lp-note-grid{grid-template-columns:1fr}
  .lp-board-head span:nth-child(3),.lp-board-head span:nth-child(4),
  .lp-steps{grid-template-columns:1fr;row-gap:calc(8 * var(--u))}
  .lp-step-n{display:none}
  .lp-step h3{margin-top:calc(10 * var(--u))}
  .lp{padding-bottom:calc(76px + env(safe-area-inset-bottom))}
  .lp-link,.lp-link-sm{display:inline-flex;align-items:center;min-height:44px}
}

/* added: shared bits for the reshaped page */
.lp-mt0{margin-top:0}
.lp-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.lp a:focus-visible,.lp button:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.lp-hero-panel a:focus-visible,.lp-quiz a:focus-visible,.lp-final a:focus-visible{outline-color:#fff}
.lp-index-r .lp-list-head{font-size:calc(13 * var(--u))}
.lp-sticky{display:none;transform:translateY(110%);transition:transform .25s ease;position:fixed;left:0;right:0;bottom:0;z-index:20;padding:calc(10 * var(--u)) var(--pad) calc(10 * var(--u) + env(safe-area-inset-bottom));background:#fff;border-top:1px solid var(--rule)}
.lp-sticky .lp-btn{width:100%;height:48px}
.lp-labs{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.6fr);gap:calc(64 * var(--u));align-items:start}
.lp-lab-list{border-top:3px solid #111}
.lp-lab{display:block;padding:calc(18 * var(--u)) 0;border-bottom:1px solid var(--rule);min-height:44px}
.lp-lab-sub{font-size:calc(13 * var(--u));font-weight:700;color:var(--blue)}
.lp-lab h3{font-size:calc(22 * var(--u));letter-spacing:-.02em;margin-top:calc(4 * var(--u))}
.lp-lab p{font-size:calc(15 * var(--u));line-height:1.5;color:#333;margin-top:calc(6 * var(--u));max-width:calc(520 * var(--u))}
.lp-lab:hover h3{color:var(--blue)}
.lp-faq h3{font-size:calc(16 * var(--u))}

@media (max-width:1000px){.lp-labs{grid-template-columns:1fr}}
@media (max-width:640px){.lp-sticky{display:block}.lp-sticky.show{transform:none}}

/* tablet: scale type up from the 1px floor */
@media (min-width:641px) and (max-width:1000px){.lp{--u:1.25px}}
.lp-skip{position:absolute;left:-9999px;top:0;z-index:50;background:#fff;color:#111;padding:12px 16px;font-weight:700}
.lp-skip:focus{left:8px;top:8px;outline:3px solid var(--blue)}
.lp-example-label{font-size:calc(14 * var(--u));font-weight:700;color:#111;margin-bottom:calc(10 * var(--u))}
.lp-foot-h{font-weight:700}
`;
