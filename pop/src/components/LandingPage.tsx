"use client";

import React, { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import Circuit from "@/components/Circuit";
import CatFace, { PawTrail } from "@/components/CatFace";
import { useCatMode } from "@/hooks/useCatMode";

const BLUE = "#2339f5";
const FIRST_PAPER = new Date(2027, 3, 27); // 27 Apr 2027

const igcse = [
  { name: "Physics", code: "0625", meta: "32 lessons · 610 questions · 63 papers" },
  { name: "Chemistry", code: "0620", meta: "36 lessons · 530 questions · 58 papers" },
  { name: "Biology", code: "0610", meta: "40 lessons · 495 questions · 56 papers" },
  { name: "Mathematics", code: "0580", meta: "51 lessons · 820 questions · 62 papers" },
  { name: "Additional Maths", code: "0606", meta: "28 lessons · 410 questions · 44 papers" },
  { name: "Computer Science", code: "0478", meta: "33 lessons · 380 questions · 40 papers" },
  { name: "Economics", code: "0455", meta: "27 lessons · 300 questions · 46 papers" },
  { name: "Business Studies", code: "0450", meta: "25 lessons · 280 questions · 46 papers" },
];

const alevel = [
  { name: "Physics", code: "9702", meta: "38 lessons · 540 questions · 40 papers" },
  { name: "Chemistry", code: "9701", meta: "41 lessons · 505 questions · 40 papers" },
  { name: "Mathematics", code: "9709", meta: "46 lessons · 760 questions · 52 papers" },
];

const comingNext = [
  { name: "Biology", code: "9700" },
  { name: "Economics", code: "9708" },
  { name: "Computer Science", code: "9618" },
];

const thisWeek = [
  { title: "2025 Oct/Nov papers added", sub: "Physics, Chemistry, Maths →" },
  { title: "Lightning quiz: Units 1–2", sub: "60 seconds, 10 questions →" },
  { title: "POP Arena, Thursday 19:00", sub: "Physics 0625 open round →" },
  { title: "New class: A-Level Maths", sub: "9709, Pure 1 is live →" },
];

const steps = [
  {
    n: "01",
    title: "Read the notes",
    body: "Short notes built on each syllabus statement, with worked examples and the exact wording examiners reward.",
    time: "≈ 15 MIN",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 3h13l6 6v20H7z" />
        <path d="M20 3v6h6" />
        <path d="M11 14h8M11 18h8M11 22h8" strokeWidth="3" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Drill the cards",
    body: "Definitions, equations and units. Cards you get wrong come back sooner.",
    time: "≈ 10 MIN",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="12" width="17" height="17" />
        <path d="M7 12V8h17v17h-4M11 8V4h17v17h-4" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Lightning quiz",
    body: "Ten questions in sixty seconds. Score 7/10 and the topic's past-paper questions unlock.",
    time: "60 SEC",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 2L7 18h8l-2 12 11-17h-8z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Past-paper questions",
    body: "Questions on the topic from past papers, with mark schemes.",
    time: "≈ 25 MIN",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 3h18v26H7z" />
        <path d="M12 9h9M12 13h9M12 17h5" strokeWidth="3" />
        <path d="M17 24l3 3 6-7" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "Mock exam",
    body: "A timed paper across the whole unit, marked on the latest grade boundaries.",
    time: "1 H 15 MIN",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="16" cy="16" r="13" />
        <path d="M16 8v8l-6-4" />
      </svg>
    ),
  },
];

const statements = [
  { id: "1.6.1", text: "Define momentum as mass × velocity", done: true },
  { id: "1.6.2", text: "Recall and use p = mv", done: true },
  { id: "1.6.3", text: "Define impulse as force × time", done: true },
  { id: "1.6.4", text: "Use F = Δp / Δt for safety features", done: false },
  { id: "1.6.5", text: "Apply conservation of momentum", done: false },
];

type Cell = { s: "done" | "started" | "new" | "none"; v?: string };
const none: Cell = { s: "none" };
const d = (v: string): Cell => ({ s: "done", v });
const st = (v: string): Cell => ({ s: "started", v });
const nw: Cell = { s: "new", v: "NEW" };

const paperRows: { year: number; cells: Cell[] }[] = [
  { year: 2025, cells: [d("35/40"), d("62/80"), st("12/40"), d("33/40"), d("64/80"), d("31/40"), nw, nw, nw] },
  { year: 2024, cells: [none, none, none, d("36/40"), d("71/80"), d("34/40"), d("30/40"), d("58/80"), st("20/40")] },
  { year: 2023, cells: [none, none, none, d("29/40"), d("55/80"), st("9/40"), st("18/40"), none, none] },
  { year: 2022, cells: [none, none, none, d("27/40"), none, none, none, none, none] },
  { year: 2021, cells: [none, none, none, none, st("26/80"), none, none, none, none] },
  { year: 2020, cells: Array(9).fill(none) },
  { year: 2019, cells: Array(9).fill(none) },
];

const boundaries = [
  { g: "U", from: 0 },
  { g: "G", from: 20 },
  { g: "F", from: 28 },
  { g: "E", from: 36 },
  { g: "D", from: 44 },
  { g: "C", from: 52 },
  { g: "B", from: 61 },
  { g: "A", from: 70 },
  { g: "A*", from: 80 },
];

const marks = [
  { n: 1, name: "Motion, forces & energy", pct: 88 },
  { n: 2, name: "Thermal physics", pct: 72 },
  { n: 3, name: "Waves", pct: 79 },
  { n: 4, name: "Electricity & magnetism", pct: 52, hi: true },
  { n: 5, name: "Nuclear physics", pct: 90 },
  { n: 6, name: "Space physics", pct: 61 },
];

const board = [
  { r: "01", name: "Aisha R.", loc: "Dubai, UAE", acc: "96%", streak: "21 days", pts: "9,840" },
  { r: "02", name: "Leo M.", loc: "London, UK", acc: "94%", streak: "14 days", pts: "9,615" },
  { r: "03", name: "Mei L.", loc: "Singapore", acc: "95%", streak: "33 days", pts: "9,402" },
  { r: "04", name: "Arjun S.", loc: "Pune, India", acc: "91%", streak: "8 days", pts: "9,110" },
  { r: "05", name: "Sofia G.", loc: "Madrid, Spain", acc: "90%", streak: "19 days", pts: "8,975" },
  { r: "06", name: "Kwame O.", loc: "Accra, Ghana", acc: "92%", streak: "11 days", pts: "8,760" },
  { r: "07", name: "You", loc: "▲ 3 places this round", acc: "89%", streak: "6 days", pts: "8,712", you: true },
  { r: "08", name: "Hana K.", loc: "Kuala Lumpur, Malaysia", acc: "88%", streak: "27 days", pts: "8,540" },
  { r: "09", name: "Omar F.", loc: "Cairo, Egypt", acc: "87%", streak: "5 days", pts: "8,333" },
  { r: "10", name: "Lucas P.", loc: "São Paulo, Brazil", acc: "86%", streak: "9 days", pts: "8,120" },
];

const included: [string, string][] = [
  ["Revision notes, every class", "✓"],
  ["Lightning quizzes", "✓"],
  ["Flashcards", "Unlimited"],
  ["Past papers + mark schemes", "All, 2019–2025"],
  ["Mock exams, graded", "Every unit"],
  ["Predicted grade + syllabus map", "✓"],
  ["POP Arena", "Compete"],
  ["Offline mode", "✓"],
];

const faqs = [
  { q: "Which exam boards?", a: "Cambridge International (CAIE) IGCSE and A-Level. Edexcel is in the works." },
  { q: "Can my school use it?", a: "Yes. Whole classes can use it free, with a teacher dashboard." },
  { q: "Who pays for it?", a: "Nothing to pay. The notes are written by volunteer students." },
];

export default function LandingPage() {
  const cat = useCatMode();
  const [days, setDays] = useState(182);
  const [today, setToday] = useState("27 OCT");
  const [weeks, setWeeks] = useState(26);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-snap between sections and fade/slide each section in as it arrives
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    html.classList.add("lp-snap");
    root.classList.add("lp-anim");
    const sections = root.querySelectorAll<HTMLElement>(":scope > section:not(.lp-hero), .lp-last > section");
    sections.forEach((el) => el.classList.add("lp-rv"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.2 }
    );
    sections.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      html.classList.remove("lp-snap");
      root.classList.remove("lp-anim");
    };
  }, []);
  useEffect(() => {
    // Deferred so the server-rendered markup hydrates before the live date swaps in
    const t = setTimeout(() => {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diff = Math.max(0, Math.round((FIRST_PAPER.getTime() - startOfToday.getTime()) / 86400000));
      setDays(diff);
      setWeeks(Math.round(diff / 7));
      setToday(`${now.getDate()} ${now.toLocaleString("en-GB", { month: "short" }).toUpperCase()}`);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const passed = Math.min(1, Math.max(0, 1 - days / 182));
  const ringLen = 2 * Math.PI * 112;

  return (
    <div className="lp" ref={rootRef}>
      <style>{css}</style>

      {/* ───────── 01 HERO ───────── */}
      <section className="lp-hero">
        <div className="lp-hero-main">
          <header className="lp-nav">
            <Link href="/" className="lp-logo">
              <Logo variant="black" priority />
            </Link>
            <div className="lp-nav-r lp-mobile-only">
              <Link href="/sign-in" className="lp-link-sm">Log in</Link>
              <Link href="/sign-up" className="lp-btn lp-btn-white lp-btn-sm">Start free →</Link>
            </div>
          </header>

          <p className="lp-eyebrow">Free revision for Cambridge IGCSE and A-Level</p>
          <h1 className="lp-h1">
            Free revision notes, quizzes and past papers for Cambridge IGCSE and A-Level.
          </h1>

          <div className="lp-hero-lower">
            <div>
              <p className="lp-lede">
                Each note follows the syllabus point by point, so you can see what you&apos;ve covered and what&apos;s left.
              </p>
              <form
                className="lp-find"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/classes${query ? `?q=${encodeURIComponent(query)}` : ""}`;
                }}
              >
                <label>{cat ? "SNIFF OUT YOUR CLASS" : "FIND YOUR CLASS"}</label>
                <div className="lp-find-row">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Physics, 0625, momentum…"
                  />
                  <button type="submit">Search →</button>
                </div>
              </form>
              <div className="lp-cta-row">
                <Link href="/sign-up" className="lp-btn lp-btn-black">Start free →</Link>
                <Link href="/classes" className="lp-link">Browse all 11 classes →</Link>
              </div>
            </div>

            <aside className="lp-week">
              <h4>THIS WEEK</h4>
              {thisWeek.map((w) => (
                <div key={w.title} className="lp-week-item">
                  <strong>{w.title}</strong>
                  <span>{w.sub}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>

        <div className="lp-hero-panel">
          {cat ? (
            <svg className="lp-slashes" viewBox="0 0 90 120" aria-hidden>
              {[0, 16, 32].map((x) => <line key={x} x1={x + 20} y1="2" x2={x} y2="118" stroke="#d9692e" strokeWidth="2" />)}
            </svg>
          ) : (
            <Circuit id="hc" />
          )}
          <div className="lp-nav-r lp-desktop-only">
            <Link href="/sign-in" className="lp-link-sm lp-white">Log in</Link>
            <Link href="/sign-up" className="lp-btn lp-btn-white lp-btn-sm">Start free →</Link>
          </div>
          {cat ? (
            <div className="lp-cat-cd">
              <CatFace className="lp-cat-face" />
              <div className="lp-big-days">{days}</div>
              <PawTrail className="lp-paws" />
            </div>
          ) : (
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
            <span className="lp-today">TODAY</span>
            <div className="lp-big-days">{days}</div>
          </div>
          )}
          <p className="lp-days-label">{cat ? "naps" : "days"} until May/June 2027 exams</p>
          <p className="lp-panel-foot">IGCSE &nbsp;·&nbsp; A-LEVEL &nbsp;·&nbsp; CAMBRIDGE</p>
        </div>
      </section>

      {/* ───────── 02 INDEX ───────── */}
      <section className="lp-sec lp-index">
        <div className="lp-index-l">
          <p className="lp-num">02 — {cat ? "THE CAT-ALOGUE" : "THE INDEX"}</p>
          <h2 className="lp-h2">11 classes</h2>
          <p className="lp-body">
            Each class follows the syllabus order. Pick one and start at 1.1.
          </p>
          <div className="lp-eleven">11</div>
          <p className="lp-tiny-caps">8 IGCSE &nbsp;·&nbsp; 3 A-LEVEL &nbsp;·&nbsp; MORE EVERY TERM</p>
        </div>

        <div className="lp-index-m">
          <div className="lp-list-head"><b>IGCSE</b><span>TAP A CLASS TO OPEN IT</span></div>
          {igcse.map((c) => (
            <Link href="/classes" key={c.code} className="lp-class">
              <div>
                <h3>{c.name}</h3>
                <small>{c.meta}</small>
              </div>
              <em>{c.code}</em>
            </Link>
          ))}
          <Link href="/classes" className="lp-link lp-mt">See every class →</Link>
        </div>

        <div className="lp-index-r">
          <div className="lp-list-head"><b>A-LEVEL</b></div>
          {alevel.map((c) => (
            <Link href="/classes" key={c.code} className="lp-class">
              <div>
                <h3>{c.name}</h3>
                <small>{c.meta}</small>
              </div>
              <em>{c.code}</em>
            </Link>
          ))}
          <p className="lp-coming">COMING NEXT &nbsp;·&nbsp; VOTE FOR ONE</p>
          {comingNext.map((c) => (
            <div key={c.code} className="lp-vote">
              <span>{c.name}&nbsp; {c.code}</span>
              <button>vote →</button>
            </div>
          ))}
          <blockquote className="lp-quote">
            Every class is checked against the latest syllabus before each exam series. Last check: October 2026.
          </blockquote>
        </div>
      </section>

      {/* ───────── 03 METHOD ───────── */}
      <section className="lp-sec">
        <p className="lp-num">03 — THE METHOD</p>
        <div className="lp-split">
          <h2 className="lp-h2 lp-h2-wide">How each topic works</h2>
          <p className="lp-body lp-narrow">
            Every topic goes: notes, flashcards, a quick quiz, past-paper questions, then a mock.
          </p>
        </div>
        <div className="lp-steps">
          {steps.map((s) => (
            <div key={s.n} className="lp-step">
              <div className="lp-step-icon">{s.icon}</div>
              <div className="lp-step-rule"><i /></div>
              <div className="lp-step-body">
                <div className="lp-step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <small>{s.time}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="lp-steps-foot">
          <span>Finish all five and the topic gets ticked off your syllabus map. Physics has 25 of them.</span>
          <Link href="/classes" className="lp-link">See how a topic looks →</Link>
        </div>
      </section>

      {/* ───────── 04 NOTES ───────── */}
      <section className="lp-sec lp-notes">
        <div>
          <p className="lp-num">04 — REVISION NOTES</p>
          <h2 className="lp-h2 lp-h2-tight">Notes that follow the syllabus</h2>
          <p className="lp-body">
            Each note covers one syllabus statement at a time. Supplement-only points are marked S.
          </p>
          <p className="lp-sub-caps">1.6 MOMENTUM &nbsp;·&nbsp; SYLLABUS STATEMENTS</p>
          <ul className="lp-statements">
            {statements.map((s) => (
              <li key={s.id}>
                <b>{s.id}</b>
                <span>{s.text}</span>
                {s.done && <i>✓</i>}
              </li>
            ))}
          </ul>
          <Link href="/classes" className="lp-link lp-mt">Read the 1.6 note →</Link>
          <p className="lp-fine">Supplement statements are marked S, so Core students know what to skip.</p>
        </div>

        <article className="lp-note">
          <p className="lp-crumb">PHYSICS 0625 &nbsp;›&nbsp; UNIT 1 &nbsp;·&nbsp; MOTION, FORCES &amp; ENERGY &nbsp;›&nbsp; 1.6</p>
          <div className="lp-note-title">
            <h3>1.6 Momentum</h3>
            <span>8 MIN READ &nbsp;·&nbsp; 3 OF 5 DONE</span>
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
              <p className="lp-caps-blue">EXAMINER&apos;S NOTE</p>
              <p className="lp-italic">
                Give the unit as kg m/s or N s. Writing just “kg m” loses the mark every series.
              </p>
            </div>
            <div>
              <p className="lp-caps-grey">WORKED EXAMPLE &nbsp;·&nbsp; 2023 P42 Q3(b)</p>
              <div className="lp-trolleys">
                <div className="lp-trolley"><span>2.0 kg</span><i /><i /></div>
                <div className="lp-arrow">▶</div>
                <div className="lp-trolley lp-trolley-s"><span>1.0 kg</span><i /><i /></div>
                <div className="lp-speed lp-speed-a">3.0 m/s</div>
                <div className="lp-speed lp-speed-b">at rest</div>
                <div className="lp-track" />
              </div>
              <div className="lp-working">
                p before = 2.0 × 3.0 = 6.0 kg m/s<br />
                p after = (2.0 + 1.0) × v<br />
                6.0 = 3.0 v, &nbsp;so &nbsp;v = 2.0 m/s
              </div>
              <p className="lp-caps-grey lp-ms">MARK SCHEME</p>
              <table className="lp-mark">
                <tbody>
                  <tr><th>B1</th><td>uses conservation of momentum</td></tr>
                  <tr><th>C1</th><td>6.0 = 3.0 v</td></tr>
                  <tr><th>A1</th><td>v = 2.0 m/s</td></tr>
                </tbody>
              </table>
              <Link href="/classes" className="lp-link lp-mt">Try 3 more like this →</Link>
            </div>
          </div>
          <div className="lp-note-foot">
            <span>← 1.5 Forces</span>
            <span className="lp-blue">notes &nbsp;·&nbsp; cards &nbsp;·&nbsp; quiz</span>
            <b>1.7 Energy, work and power →</b>
          </div>
        </article>
      </section>

      {/* ───────── 05 PAST PAPERS ───────── */}
      <section className="lp-sec lp-papers">
        <div>
          <p className="lp-num">05 — PAST PAPERS</p>
          <h2 className="lp-h2 lp-h2-tight">Past papers, split by question</h2>
          <p className="lp-body">
            Physics 0625 papers from 2019 to 2025, one question at a time, tagged by topic, with mark schemes.
          </p>
          <ul className="lp-legend">
            <li><i className="k-done" />Done, with your score</li>
            <li><i className="k-started" />Started</li>
            <li><i className="k-none" />Not started yet</li>
          </ul>
          <p className="lp-sub-caps lp-blue">FILTER BY TOPIC</p>
          <div className="lp-filter"><span>1.6 Momentum: 41 questions in 23 papers</span><i>→</i></div>
          <div className="lp-filter"><span>4.3 Electric circuits: 66 questions in 31 papers</span><i>→</i></div>
          <Link href="/classes" className="lp-link lp-mt">Open the paper archive →</Link>
        </div>

        <div className="lp-grid-wrap">
          <div className="lp-grid">
            <div />
            <div className="lp-series"><b>FEB / MAR</b><span>P2</span><span>P4</span><span>P6</span></div>
            <div className="lp-series"><b>MAY / JUN</b><span>P2</span><span>P4</span><span>P6</span></div>
            <div className="lp-series"><b>OCT / NOV</b><span>P2</span><span>P4</span><span>P6</span></div>
            {paperRows.map((row) => (
              <React.Fragment key={row.year}>
                <div className="lp-year">{row.year}</div>
                {[0, 1, 2].map((g) => (
                  <div key={g} className="lp-cells">
                    {row.cells.slice(g * 3, g * 3 + 3).map((c, i) => (
                      <div key={i} className={`lp-cell c-${c.s}`}>{c.v}</div>
                    ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="lp-grid-foot">
            <span>13 of 63 papers done &nbsp;·&nbsp; average 79% &nbsp;·&nbsp; best: May/Jun 2024 Paper 4, 71/80</span>
            <Link href="/classes" className="lp-link-sm lp-blue">Continue: Oct/Nov 2024 P6 →</Link>
          </div>
          <p className="lp-fine">Tap any paper to open it question by question, mark scheme and examiner report included.</p>
        </div>
      </section>

      {/* ───────── 06 QUIZ ───────── */}
      <section className="lp-quiz">
        <svg className="lp-arcs" viewBox="0 0 600 600" aria-hidden>
          <circle cx="0" cy="620" r="520" fill="none" stroke="#fff" strokeOpacity=".18" />
          <circle cx="0" cy="620" r="470" fill="none" stroke="#fff" strokeOpacity=".12" />
        </svg>
        <div className="lp-quiz-in">
          <div>
            <p className="lp-num lp-white">06 — LIGHTNING QUIZ &amp; FLASHCARDS</p>
            <h2 className="lp-h2 lp-white">10-question quiz</h2>
            <p className="lp-body lp-white-soft">
              Ten questions, 60 seconds. Score 7/10 to unlock that topic&apos;s past-paper questions. Questions you miss go into your flashcards.
            </p>
            <p className="lp-quiz-cards">
              412 Physics flashcards, scheduled by spaced repetition so they come back just before you&apos;d forget
              them.
            </p>
            <div className="lp-cta-row">
              <Link href="/sign-up" className="lp-btn lp-btn-white lp-blue">Try a quiz →</Link>
              <span className="lp-white-soft lp-fine-w">No sign-up needed</span>
            </div>
          </div>

          <div className="lp-q">
            <div className="lp-q-top">
              <div>
                <p className="lp-q-meta">PHYSICS 0625 &nbsp;·&nbsp; UNIT 1 &nbsp;·&nbsp; QUESTION 4 OF 10</p>
                <div className="lp-q-bars">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <i key={i} className={i < 3 ? "on" : i === 3 ? "cur" : ""} />
                  ))}
                </div>
              </div>
              <div className="lp-timer">
                <svg viewBox="0 0 76 76">
                  <circle cx="38" cy="38" r="35" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="2" />
                  <circle
                    cx="38"
                    cy="38"
                    r="35"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 35 * 0.7} ${2 * Math.PI * 35}`}
                    transform="rotate(-90 38 38)"
                  />
                </svg>
                <div><b>42</b><span>SEC</span></div>
              </div>
            </div>
            <h3 className="lp-q-text">A 1200 kg car travels at 15 m/s. What is its momentum?</h3>
            <ul className="lp-opts">
              <li><b>A</b><span>80 kg m/s</span></li>
              <li><b>B</b><span>1 215 kg m/s</span></li>
              <li className="right"><b>C</b><span>18 000 kg m/s</span><em>✓ correct</em></li>
              <li><b>D</b><span>18 000 N</span></li>
            </ul>
            <p className="lp-q-expl">
              p = mv = 1200 × 15 = 18 000 kg m/s. D has the right number but the wrong unit, and that&apos;s the trap.
            </p>
            <div className="lp-q-foot"><b>Score so far &nbsp;3 / 3</b><b>Next question →</b></div>
          </div>
        </div>
      </section>

      {/* ───────── 07 MOCK ───────── */}
      <section className="lp-sec lp-mock">
        <p className="lp-num">07 — MOCK EXAMS</p>
        <div className="lp-mock-head">
          <div>
            <h2 className="lp-h2 lp-h2-wide">Timed mock exams</h2>
            <p className="lp-body lp-mt2">
              Timed papers for a whole unit, marked against the mark scheme and the latest grade boundaries. Afterwards you see which topics lost you marks.
            </p>
          </div>
          <div className="lp-grade">
            <div>A</div>
            <p className="lp-caps-blue">PREDICTED GRADE</p>
            <p className="lp-fine">from your last mock: 74%</p>
          </div>
        </div>

        <p className="lp-sub-caps lp-mt2">MAY/JUNE 2025 GRADE BOUNDARIES &nbsp;·&nbsp; PHYSICS 0625 EXTENDED</p>
        <div className="lp-bounds">
          <div className="lp-pin lp-pin-last" style={{ left: "61%" }}><span>LAST MOCK &nbsp;61%</span><i>▽</i></div>
          <div className="lp-pin lp-pin-you" style={{ left: "74%" }}><span>YOU &nbsp;74%</span><i>▼</i></div>
          <div className="lp-bar"><i style={{ width: "74%", background: BLUE }} /></div>
          {boundaries.map((b, i) => {
            const next = boundaries[i + 1]?.from ?? 100;
            return (
              <React.Fragment key={b.g}>
                {i > 0 && <div className="lp-tick" style={{ left: `${b.from}%` }}><small>{b.from}%</small></div>}
                <div className="lp-gl" style={{ left: `${(b.from + next) / 2}%` }}>{b.g}</div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="lp-mock-low">
          <div>
            <p className="lp-sub-caps">WHERE THE MARKS WENT</p>
            <div className="lp-marks">
              {marks.map((m) => (
                <div key={m.n} className={`lp-mrow ${m.hi ? "hi" : ""}`}>
                  <span>{m.n} &nbsp;{m.name}</span>
                  <div><i style={{ width: `${m.pct}%` }} /></div>
                  <b>{m.pct}%</b>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-next">
            <p className="lp-caps-blue">NEXT UP</p>
            <h3>Revise 4.3 Electric circuits. You dropped 9 marks there.</h3>
            <div className="lp-cta-row">
              <Link href="/sign-up" className="lp-btn lp-btn-black">Start the revision →</Link>
              <Link href="/sign-up" className="lp-link-sm lp-blue">Download as PDF</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 08 ARENA ───────── */}
      <section className="lp-sec lp-arena">
        <div>
          <p className="lp-num">08 — POP ARENA</p>
          <h2 className="lp-h2 lp-h2-tight">POP Arena</h2>
          <p className="lp-body">
            A weekly live quiz. Everyone gets the same questions at the same time, and faster correct answers score more.
          </p>
          <p className="lp-live"><i />LIVE NOW &nbsp;·&nbsp; PHYSICS 0625 &nbsp;·&nbsp; ROUND 3 OF 5</p>
          <div className="lp-1284">1,284</div>
          <p className="lp-body">students in tonight&apos;s round, from 41 countries.</p>
          <div className="lp-cta-row">
            <Link href="/arena" className="lp-btn lp-btn-black">Join the round →</Link>
            <span className="lp-fine lp-bold">Next round in 04:12</span>
          </div>
        </div>
        <div className="lp-board">
          <div className="lp-board-head">
            <span>RANK</span><span>STUDENT</span><span>ACCURACY</span><span>STREAK</span><span>POINTS</span>
          </div>
          {board.map((r) => (
            <div key={r.r} className={`lp-board-row ${r.you ? "you" : ""}`}>
              <b className={`rank ${["01", "02", "03"].includes(r.r) || r.you ? "blue" : ""}`}>{r.r}</b>
              <div><strong>{r.name}</strong><small>{r.loc}</small></div>
              <span>{r.acc}</span>
              <span>{r.streak}</span>
              <b className="pts">{r.pts}</b>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 09 PRICING ───────── */}
      <section className="lp-sec lp-pricing">
        <div>
          <p className="lp-num">09 — PRICING</p>
          <h2 className="lp-h2 lp-h2-tight">It&apos;s free</h2>
          <p className="lp-body lp-mt3">
            No account fees and no ads. Senior students write the notes (see below).
          </p>
          <p className="lp-sub-caps lp-blue lp-mt3">QUESTIONS</p>
          <div className="lp-faq">
            {faqs.map((f) => (
              <div key={f.q}>
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-table">
          <div className="lp-price-card">
            <p className="lp-caps-blue">POP STUDYING</p>
            <div className="lp-price">£0</div>
            <small>free, forever</small>
          </div>
          <p className="lp-sub-caps lp-incl">EVERYTHING INCLUDED</p>
          <div className="lp-rows">
            {included.map(([k, v]) => (
              <div key={k} className="lp-row"><span>{k}</span><b>{v}</b></div>
            ))}
          </div>
          <div className="lp-table-cta">
            <Link href="/sign-up" className="lp-btn lp-btn-blue">Start free →</Link>
            <span className="lp-fine">No card, no ads, no catch.</span>
          </div>
        </div>
      </section>

      {/* ───────── 10 CONTRIBUTORS ───────── */}
      <section id="contributors" className="lp-sec lp-contrib">
        <div>
          <p className="lp-num">10 — CONTRIBUTORS</p>
          <h2 className="lp-h2 lp-h2-tight">Written by students who sat these exams</h2>
          <p className="lp-body lp-mt3">
            Students who got an A or A* write and check the notes. You can too, and you get a certificate you can put on a university or job application.
          </p>
          <p className="lp-sub-caps lp-blue">WAYS TO HELP</p>
          <div className="lp-faq">
            {[
              ["01", "Donate a note", "Write up a topic you aced, against the syllabus statements."],
              ["02", "Review a note", "Check the maths, the units and the examiner's wording."],
              ["03", "Proofread", "Catch typos and unclear wording before a note publishes."],
            ].map(([n, t, d]) => (
              <div key={n} className="lp-way">
                <span>{n}</span>
                <div><h4>{t}</h4><p>{d}</p></div>
              </div>
            ))}
          </div>
          <div className="lp-cta-row lp-mt2">
            <Link href="/contribute" className="lp-btn lp-btn-black">Apply to contribute →</Link>
            <Link href="/contribute" className="lp-link">Read the guidelines</Link>
          </div>
        </div>

        <div>
          <div className="lp-cert" role="img" aria-label="Example certificate of contribution">
            <p className="lp-caps-blue">POP STUDYING &nbsp;·&nbsp; CERTIFICATE OF CONTRIBUTION</p>
            <p className="lp-cert-small">Awarded to</p>
            <p className="lp-cert-name">Your Name</p>
            <p className="lp-cert-small">for writing and proofreading revision notes for</p>
            <p className="lp-cert-sub">IGCSE Physics 0625</p>
            <div className="lp-cert-foot"><span>Example certificate</span><span className="lp-cert-seal">POP</span></div>
          </div>
          <p className="lp-sub-caps lp-blue">WHO CAN APPLY</p>
          <div className="lp-rows">
            {[
              "In Year 11–13, or finished school within the last year",
              "Scored an A or A* in the subject you review",
              "About two hours a week, whenever suits you",
            ].map((t) => (
              <div key={t} className="lp-row"><span>{t}</span><b>✓</b></div>
            ))}
          </div>
          <p className="lp-fine">Certificates are issued after 10 approved contributions and can be verified online.</p>
        </div>
      </section>

      <div className="lp-last">
      {/* ───────── CTA ───────── */}
      <section className="lp-final">
        {cat ? (
          <>
            <svg className="lp-slashes lp-slashes-final" viewBox="0 0 90 120" aria-hidden>
              {[0, 16, 32].map((x) => <line key={x} x1={x + 20} y1="2" x2={x} y2="118" stroke="#d9692e" strokeWidth="2" />)}
            </svg>
            <CatFace className="lp-cat-final" />
          </>
        ) : (
          <Circuit id="fc" />
        )}
        <p className="lp-num lp-white">THE MAY/JUNE 2027 SERIES STARTS IN</p>
        <div className="lp-final-in">
          <div className="lp-big-days lp-final-days">{days}</div>
          <div>
            <h2 className="lp-h2 lp-white">days until the first paper.</h2>
            <div className="lp-cta-row">
              <Link href="/sign-up" className="lp-btn lp-btn-white lp-blue">Start free →</Link>
              <Link href="/classes" className="lp-link lp-white">Browse classes →</Link>
            </div>
            <p className="lp-fine lp-white-soft">Free to use. No card needed.</p>
          </div>
        </div>
        <div className="lp-timeline">
          <i />
          <div><span>TODAY &nbsp;·&nbsp; {today}</span><span>{weeks} WEEKS</span><span>FIRST PAPER &nbsp;·&nbsp; 27 APR 2027</span></div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="lp-footer">
        <div className="lp-foot-grid">
          <div>
            <div className="lp-logo lp-logo-lg"><Logo variant="black" /></div>
            <p className="lp-fine">Free revision for Cambridge IGCSE and A-Level.</p>
          </div>
          <div>
            <h5>CLASSES</h5>
            <Link href="/classes">IGCSE</Link>
            <Link href="/classes">A-Level</Link>
            <Link href="/classes">All subjects</Link>
            <Link href="/classes">Request a class</Link>
          </div>
          <div>
            <h5>TOOLS</h5>
            <Link href="/learn">Revision notes</Link>
            <Link href="/flashcards">Flashcards</Link>
            <Link href="/classes">Lightning quiz</Link>
            <Link href="/classes">Past papers</Link>
            <Link href="/classes">Mock exams</Link>
            <Link href="/arena">POP Arena</Link>
          </div>
          <div>
            <h5>COMPANY</h5>
            <Link href="/">About</Link>
            <Link href="/">For schools</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Privacy</Link>
            <Link href="/">Terms</Link>
          </div>
          <div>
            <h5>EXAM-SEASON EMAILS</h5>
            <p className="lp-fine">One email a week with what to revise next.</p>
            <form className="lp-email" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" aria-label="Email" />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>
        <div className="lp-legal">
          <span>© 2026 POP Studying. Not affiliated with Cambridge University Press &amp; Assessment.</span>
          <b>IGCSE &nbsp;·&nbsp; A-LEVEL &nbsp;·&nbsp; CAMBRIDGE</b>
        </div>
      </footer>
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
:where(.lp) :where(h1,h2,h3,h4,h5,p,ul){margin:0;padding:0}
:where(.lp) ul{list-style:none}
.lp button{font:inherit;cursor:pointer;background:none;border:0;color:inherit}
.lp .lp-blue{color:var(--blue)}.lp .lp-white{color:#fff}.lp .lp-white-soft{color:rgba(255,255,255,.88)}
.lp-bold{font-weight:700}
.lp-mt{display:inline-block;margin-top:calc(22 * var(--u))}.lp-mt2{margin-top:calc(28 * var(--u))}.lp-mt3{margin-top:calc(56 * var(--u))}

.lp-sec{min-height:var(--vh);padding:calc(64 * var(--u)) var(--gut);display:grid;align-content:center}
.lp-num,.lp-eyebrow,.lp-sub-caps,.lp-caps-blue,.lp-caps-grey,.lp-tiny-caps,.lp-coming,.lp-crumb{
  font-size:calc(13 * var(--u));font-weight:700;letter-spacing:.02em;text-transform:uppercase}
.lp-num,.lp-caps-blue,.lp-eyebrow{color:var(--blue)}
.lp-caps-grey,.lp-sub-caps,.lp-tiny-caps,.lp-crumb{color:#444}
.lp-sub-caps.lp-blue{color:var(--blue)}
.lp-h1{font-size:calc(58 * var(--u));line-height:1;letter-spacing:-.04em;font-weight:700;max-width:calc(680 * var(--u));margin-top:calc(20 * var(--u))}
.lp-h2{font-size:calc(40 * var(--u));line-height:1.02;letter-spacing:-.035em;font-weight:700;margin-top:calc(14 * var(--u))}
.lp-h2-tight{line-height:1;max-width:calc(420 * var(--u))}
.lp-h2-wide{max-width:calc(640 * var(--u))}
.lp-body{font-size:calc(17 * var(--u));line-height:1.55;color:#222;max-width:calc(430 * var(--u));margin-top:calc(20 * var(--u))}
.lp-narrow{max-width:calc(400 * var(--u));margin-top:0}
.lp-fine{font-size:calc(14 * var(--u));line-height:1.5;color:var(--mute);margin-top:calc(14 * var(--u))}
.lp-fine-w{font-size:calc(13 * var(--u))}
.lp-link{font-size:calc(15 * var(--u));font-weight:700;color:var(--blue)}
.lp-link-sm{font-size:calc(14 * var(--u));font-weight:700}
.lp-btn{display:inline-flex;align-items:center;justify-content:center;font-size:calc(15 * var(--u));font-weight:700;padding:0 calc(28 * var(--u));height:calc(48 * var(--u));white-space:nowrap}
.lp-btn-black{background:var(--ink);color:#fff!important}
.lp-btn-white{background:#fff;color:var(--ink)}
.lp-btn-blue{background:var(--blue);color:#fff!important}
.lp-btn-sm{height:calc(40 * var(--u));padding:0 calc(20 * var(--u));font-size:calc(14 * var(--u))}
.lp-cta-row{display:flex;align-items:center;gap:calc(24 * var(--u));margin-top:calc(24 * var(--u));flex-wrap:wrap}

/* hero */
.lp-hero{display:grid;grid-template-columns:minmax(0,1fr) 28%;min-height:var(--vh);margin:0}
.lp-hero-main{padding:0 calc(56 * var(--u)) calc(40 * var(--u)) var(--pad);display:flex;flex-direction:column}
.lp-nav{display:flex;justify-content:space-between;align-items:center;padding:calc(20 * var(--u)) 0 calc(16 * var(--u));border-bottom:1px solid #eee}
.lp-logo{display:inline-flex;align-items:baseline;gap:calc(5 * var(--u));color:var(--blue)}
.lp-logo img{height:calc(68 * var(--u));width:auto}
.lp-logo-lg{flex-direction:column;gap:0}.lp-logo-lg img{height:calc(72 * var(--u))}
.lp-nav-r{display:flex;align-items:center;gap:calc(22 * var(--u))}
.lp-mobile-only{display:none}
.lp-eyebrow{margin-top:auto}
.lp-hero-lower{margin-bottom:auto;display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:calc(48 * var(--u));border-top:3px solid var(--ink);margin-top:calc(32 * var(--u));padding-top:calc(28 * var(--u))}
.lp-lede{font-size:calc(19 * var(--u));line-height:1.55;max-width:calc(520 * var(--u))}
.lp-find{margin-top:calc(24 * var(--u));max-width:calc(520 * var(--u))}
.lp-find label{font-size:calc(13 * var(--u));font-weight:700;color:#444;letter-spacing:.02em}
.lp-find-row{display:flex;border-bottom:1px solid var(--ink);align-items:center}
.lp-find input{flex:1;border:0;outline:0;font:inherit;font-size:calc(18 * var(--u));padding:calc(12 * var(--u)) 0;background:none;min-width:0}
.lp-find input::placeholder{color:#777}
.lp-find button{font-size:calc(15 * var(--u));padding:calc(12 * var(--u)) 0 calc(12 * var(--u)) calc(12 * var(--u));font-weight:700;color:var(--blue)}
.lp-hero-lower .lp-cta-row{margin-top:calc(20 * var(--u))}
.lp-week h4{font-size:calc(13 * var(--u));font-weight:700;color:var(--blue);padding-bottom:calc(8 * var(--u));border-bottom:1px solid var(--ink);margin-bottom:0}
.lp-week-item{padding:calc(13 * var(--u)) 0;border-bottom:1px solid var(--rule)}
.lp-week-item strong{display:block;font-size:calc(17 * var(--u))}
.lp-week-item span{display:block;font-size:calc(15 * var(--u));color:var(--mute);margin-top:calc(4 * var(--u))}
.lp-hero-panel{position:relative;background:var(--blue);color:#fff;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:0 calc(28 * var(--u)) calc(36 * var(--u))}
.lp-hero-panel .lp-nav-r{position:absolute;top:calc(17 * var(--u));right:calc(30 * var(--u));z-index:2}
.lp-hero-panel .lp-link-sm{color:#fff}
.lp-circuit{position:absolute;inset:0;width:100%;height:100%;opacity:.55;pointer-events:none}
.lp-countdown{position:relative;margin:auto 0 0 0;aspect-ratio:1;max-width:calc(280 * var(--u));width:100%;display:flex;align-items:center;justify-content:center;z-index:1}
.lp-ring{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.lp-today{position:absolute;bottom:2px;right:calc(30 * var(--u));font-size:calc(12 * var(--u));font-weight:700}
.lp-big-days{font-size:calc(160 * var(--u));line-height:.8;font-weight:700;letter-spacing:-.07em;color:#fff;position:relative}
.lp-countdown .lp-big-days{font-size:calc(120 * var(--u));margin-left:calc(-6 * var(--u));white-space:nowrap}
.lp-days-label{position:relative;font-size:calc(16 * var(--u));margin-top:calc(20 * var(--u));font-weight:600}
.lp-panel-foot{position:relative;font-size:calc(13 * var(--u));font-weight:700;margin-top:calc(30 * var(--u));opacity:.9}

/* index */
.lp-index{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr) minmax(0,1fr);gap:calc(40 * var(--u)) calc(48 * var(--u))}
.lp-index-l .lp-body{margin-top:calc(28 * var(--u))}
.lp-eleven{font-size:calc(170 * var(--u));line-height:.72;font-weight:700;letter-spacing:-.08em;color:var(--blue);margin:calc(48 * var(--u)) 0 calc(20 * var(--u)) calc(-6 * var(--u))}
.lp-list-head{display:flex;justify-content:space-between;font-size:calc(13 * var(--u));font-weight:700;border-bottom:3px solid var(--ink);padding-bottom:calc(8 * var(--u));color:#333}
.lp-list-head span{color:#444;font-size:calc(12 * var(--u))}
.lp-class{display:flex;justify-content:space-between;align-items:center;padding:calc(13 * var(--u)) 0;border-bottom:1px solid var(--rule)}
.lp-class h3{font-size:calc(20 * var(--u));letter-spacing:-.01em}
.lp-class small{display:block;font-size:calc(14 * var(--u));color:var(--mute);margin-top:calc(4 * var(--u))}
.lp-class em{font-style:normal;color:var(--blue);font-size:calc(26 * var(--u));font-weight:600;letter-spacing:-.02em}
.lp-class:hover h3{color:var(--blue)}
.lp-coming{margin-top:calc(26 * var(--u));font-size:calc(13 * var(--u));color:#444;border-bottom:2px solid var(--ink);padding-bottom:calc(8 * var(--u))}
.lp-vote{display:flex;justify-content:space-between;font-size:calc(15 * var(--u));padding:calc(13 * var(--u)) 0;border-bottom:1px solid var(--rule)}
.lp-vote button{color:var(--blue);font-weight:700;font-size:calc(14 * var(--u))}
.lp-quote{margin:calc(40 * var(--u)) 0 0;border-left:3px solid var(--blue);padding-left:calc(12 * var(--u));font-style:italic;font-size:calc(16 * var(--u));line-height:1.45;max-width:calc(340 * var(--u));color:#222}

/* method */
.lp-split{display:flex;justify-content:space-between;align-items:flex-start;gap:calc(40 * var(--u));flex-wrap:wrap}
.lp-split .lp-narrow{margin-top:calc(20 * var(--u))}
.lp-steps{display:grid;grid-template-columns:repeat(5,1fr);margin-top:calc(28 * var(--u))}
.lp-step{position:relative}
.lp-step-icon{height:calc(40 * var(--u));margin-bottom:calc(14 * var(--u));color:var(--ink)}
.lp-step-icon svg{height:calc(38 * var(--u));width:calc(38 * var(--u))}
.lp-step-rule{height:calc(12 * var(--u));position:relative}
.lp-step-rule::before{content:"";position:absolute;left:0;right:0;top:calc(4 * var(--u));border-top:3px solid var(--ink)}
.lp-step-rule i{position:absolute;left:0;top:0;width:calc(12 * var(--u));height:calc(12 * var(--u));background:var(--blue)}
.lp-step-body{padding:calc(16 * var(--u)) calc(16 * var(--u)) 0 0;min-height:0;display:flex;flex-direction:column;border-left:0}
.lp-step+.lp-step .lp-step-body{border-left:1px solid var(--rule);padding-left:0}
.lp-step-n{font-size:calc(56 * var(--u));line-height:1;font-weight:700;letter-spacing:-.04em;color:var(--blue)}
.lp-step h3{font-size:calc(19 * var(--u));margin:calc(14 * var(--u)) 0 calc(8 * var(--u));letter-spacing:-.01em}
.lp-step p{font-size:calc(15 * var(--u));line-height:1.5;color:#222;flex:1;max-width:calc(210 * var(--u))}
.lp-step small{font-size:calc(13 * var(--u));font-weight:700;color:#444;margin-top:calc(20 * var(--u))}
.lp-steps-foot{display:flex;justify-content:space-between;gap:calc(20 * var(--u));flex-wrap:wrap;border-top:1px solid var(--rule);margin-top:calc(34 * var(--u));padding-top:calc(18 * var(--u));font-size:calc(15 * var(--u))}

/* notes */
.lp-notes{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);gap:calc(64 * var(--u));align-items:start}
.lp-sub-caps{margin-top:calc(56 * var(--u));margin-bottom:calc(6 * var(--u))}
.lp-notes .lp-sub-caps{margin-top:calc(32 * var(--u));padding-bottom:calc(6 * var(--u));border-bottom:2px solid var(--ink);font-size:calc(13 * var(--u));color:var(--blue)}
.lp-statements li{display:flex;gap:calc(14 * var(--u));font-size:calc(15 * var(--u));padding:calc(10 * var(--u)) 0;border-bottom:1px solid var(--rule);align-items:center}
.lp-statements b{color:var(--blue);font-size:calc(14 * var(--u));min-width:calc(40 * var(--u))}
.lp-statements span{flex:1}
.lp-statements i{color:var(--blue);font-style:normal;font-size:calc(16 * var(--u))}
.lp-note{border:1px solid #d8d8d8;border-top:3px solid var(--blue);padding:calc(26 * var(--u)) calc(34 * var(--u)) calc(26 * var(--u));background:#fff}
.lp-crumb{font-size:calc(12 * var(--u));font-weight:600}
.lp-note-title{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid var(--ink);padding-bottom:calc(10 * var(--u));margin-top:calc(10 * var(--u))}
.lp-note-title h3{font-size:calc(34 * var(--u));letter-spacing:-.03em}
.lp-note-title span{font-size:calc(12 * var(--u));font-weight:700;color:var(--blue)}
.lp-note-grid{display:grid;grid-template-columns:1.15fr 1fr;gap:calc(32 * var(--u));margin-top:calc(12 * var(--u))}
.lp-note-grid p{font-size:calc(15 * var(--u));line-height:1.5}
.lp-formula{border-left:3px solid var(--blue);padding-left:calc(14 * var(--u));margin:calc(32 * var(--u)) 0 calc(24 * var(--u))}
.lp-formula div{font-size:calc(48 * var(--u));font-weight:700;letter-spacing:-.03em;color:var(--blue);line-height:1.1}
.lp-formula small{display:block;font-size:calc(13 * var(--u));color:#555;margin-top:calc(5 * var(--u))}
.lp-italic{font-style:italic;margin-top:calc(6 * var(--u))}
.lp-trolleys{position:relative;height:calc(84 * var(--u));margin-top:calc(6 * var(--u))}
.lp-trolley{position:absolute;left:0;bottom:calc(16 * var(--u));width:calc(68 * var(--u));height:calc(26 * var(--u));border:1.5px solid var(--ink);background:#fff;font-size:calc(12 * var(--u));font-weight:700;display:flex;align-items:center;justify-content:center}
.lp-trolley i{position:absolute;bottom:calc(-7 * var(--u));width:calc(10 * var(--u));height:calc(10 * var(--u));border-radius:50%;background:var(--ink)}
.lp-trolley i:nth-of-type(1){left:calc(8 * var(--u))}.lp-trolley i:nth-of-type(2){right:calc(8 * var(--u))}
.lp-trolley-s{left:auto;right:0;width:calc(60 * var(--u))}
.lp-arrow{position:absolute;left:46%;bottom:calc(25 * var(--u));color:var(--blue);font-size:calc(12 * var(--u))}
.lp-speed{position:absolute;font-size:calc(12 * var(--u));top:calc(16 * var(--u))}
.lp-speed-a{left:56%;color:var(--blue);font-weight:700}.lp-speed-b{right:2%}
.lp-track{position:absolute;left:0;right:0;bottom:calc(6 * var(--u));border-top:1px solid var(--ink)}
.lp-working{font-size:calc(14 * var(--u));line-height:1.6}
.lp-ms{margin-top:calc(22 * var(--u));padding-bottom:calc(5 * var(--u));border-bottom:2px solid var(--ink)}
.lp-mark{width:100%;border-collapse:collapse;font-size:calc(14 * var(--u))}
.lp-mark th,.lp-mark td{text-align:left;padding:calc(6 * var(--u)) 0;border-bottom:1px solid var(--rule)}
.lp-mark th{color:var(--blue);width:calc(34 * var(--u))}
.lp-note-foot{display:flex;justify-content:space-between;border-top:1px solid var(--rule);margin-top:calc(28 * var(--u));padding-top:calc(18 * var(--u));font-size:calc(13 * var(--u));font-weight:700;gap:calc(10 * var(--u));flex-wrap:wrap}
.lp-note-foot span:first-child{color:#444}

/* papers */
.lp-papers{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,2fr);gap:calc(56 * var(--u));align-items:start}
.lp-legend{margin-top:calc(32 * var(--u));display:grid;gap:calc(10 * var(--u));font-size:calc(14 * var(--u))}
.lp-legend li{display:flex;align-items:center;gap:calc(10 * var(--u))}
.lp-legend i{width:calc(13 * var(--u));height:calc(13 * var(--u));display:block}
.k-done{background:var(--blue)}.k-started{border:2px solid var(--ink)}.k-none{border:1px solid #ccc}
.lp-papers .lp-sub-caps{margin-top:calc(28 * var(--u));padding-bottom:calc(6 * var(--u));border-bottom:2px solid var(--ink);font-size:calc(13 * var(--u))}
.lp-filter{display:flex;justify-content:space-between;font-size:calc(14 * var(--u));padding:calc(12 * var(--u)) 0;border-bottom:1px solid var(--rule)}
.lp-filter i{font-style:normal;color:var(--blue)}
.lp-grid{display:grid;grid-template-columns:calc(64 * var(--u)) repeat(3,1fr);column-gap:calc(14 * var(--u));row-gap:calc(12 * var(--u));align-items:center}
.lp-series{display:grid;grid-template-columns:repeat(3,1fr);column-gap:calc(6 * var(--u))}
.lp-series b{grid-column:1/-1;font-size:calc(13 * var(--u));color:#222;border-bottom:1px solid var(--ink);padding:calc(8 * var(--u)) 0 calc(6 * var(--u));margin-bottom:calc(4 * var(--u))}
.lp-series span{text-align:center;font-size:calc(12 * var(--u));font-weight:700;color:#555}
.lp-year{font-size:calc(20 * var(--u));font-weight:700;letter-spacing:-.02em}
.lp-cells{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(6 * var(--u))}
.lp-cell{height:calc(46 * var(--u));display:flex;align-items:center;justify-content:center;font-size:calc(14 * var(--u));font-weight:700}
.c-none{border:1px solid #d6d6d6}
.c-done{background:var(--blue);color:#fff}
.c-started{border:2px solid var(--ink);background:#fff}
.c-new{border:1.5px solid var(--blue);color:var(--blue);font-size:calc(12 * var(--u))}
.lp-grid-foot{display:flex;justify-content:space-between;gap:calc(16 * var(--u));flex-wrap:wrap;font-size:calc(14 * var(--u));border-top:1px solid var(--ink);margin-top:calc(18 * var(--u));padding-top:calc(12 * var(--u))}
.lp-grid-wrap .lp-fine{margin-top:calc(22 * var(--u))}

/* quiz */
.lp-quiz{position:relative;background:var(--blue);color:#fff;min-height:var(--vh);padding:calc(64 * var(--u)) var(--gut);overflow:hidden;display:grid;align-content:center}
.lp-arcs{position:absolute;left:0;bottom:0;width:calc(560 * var(--u));height:calc(560 * var(--u));pointer-events:none}
.lp-quiz-in{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:calc(48 * var(--u))}
.lp-quiz .lp-num{color:#fff}
.lp-quiz .lp-h2{font-size:calc(46 * var(--u));line-height:1;max-width:calc(540 * var(--u));margin-top:calc(20 * var(--u))}
.lp-quiz .lp-body{max-width:calc(440 * var(--u));font-size:calc(17 * var(--u));margin-top:calc(20 * var(--u))}
.lp-quiz-cards{border-top:1px solid rgba(255,255,255,.4);margin-top:calc(40 * var(--u));padding-top:calc(14 * var(--u));max-width:calc(440 * var(--u));font-size:calc(15 * var(--u));font-weight:700;line-height:1.45}
.lp-q-top{display:flex;justify-content:space-between;align-items:flex-start;gap:calc(20 * var(--u))}
.lp-q-meta{font-size:calc(13 * var(--u));font-weight:700;margin-top:calc(8 * var(--u))}
.lp-q-bars{display:flex;gap:calc(6 * var(--u));margin-top:calc(8 * var(--u));max-width:calc(340 * var(--u))}
.lp-q-bars i{flex:1;height:3px;background:rgba(255,255,255,.28)}
.lp-q-bars i.on{background:#fff}.lp-q-bars i.cur{background:rgba(255,255,255,.6)}
.lp-timer{position:relative;width:calc(84 * var(--u));height:calc(84 * var(--u));flex:none}
.lp-timer svg{position:absolute;inset:0}
.lp-timer div{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.lp-timer b{font-size:calc(30 * var(--u));line-height:1;letter-spacing:-.03em}.lp-timer span{font-size:calc(12 * var(--u));font-weight:700}
.lp-q-text{font-size:calc(28 * var(--u));line-height:1.2;letter-spacing:-.02em;margin-top:calc(28 * var(--u));max-width:calc(540 * var(--u))}
.lp-opts{margin-top:calc(32 * var(--u));border-top:1px solid rgba(255,255,255,.25)}
.lp-opts li{display:flex;align-items:center;gap:calc(20 * var(--u));height:calc(56 * var(--u));padding:0 calc(15 * var(--u));font-size:calc(19 * var(--u));font-weight:600;border-bottom:1px solid rgba(255,255,255,.25)}
.lp-opts b{width:calc(12 * var(--u));font-size:calc(16 * var(--u));opacity:.85}.lp-opts span{flex:1}
.lp-opts li.right{background:#fff;color:var(--blue)}
.lp-opts em{font-style:normal;font-size:calc(14 * var(--u));font-weight:700}
.lp-q-expl{font-size:calc(15 * var(--u));line-height:1.45;margin-top:calc(18 * var(--u));max-width:calc(520 * var(--u))}
.lp-q-foot{display:flex;justify-content:space-between;font-size:calc(15 * var(--u));margin-top:calc(32 * var(--u))}

/* mock */
.lp-mock-head{display:flex;justify-content:space-between;gap:calc(30 * var(--u));align-items:flex-start;flex-wrap:wrap}
.lp-mock-head .lp-body{max-width:calc(520 * var(--u));margin-top:calc(28 * var(--u))}
.lp-grade{text-align:right}
.lp-grade div{font-size:calc(150 * var(--u));line-height:.78;font-weight:700;color:var(--blue);letter-spacing:-.04em;margin-top:calc(6 * var(--u))}
.lp-grade .lp-fine{margin-top:calc(6 * var(--u))}.lp-grade p.lp-caps-blue{margin-top:calc(10 * var(--u))}
.lp-mock .lp-sub-caps{font-size:calc(13 * var(--u));margin-top:calc(32 * var(--u))}
.lp-bounds{position:relative;height:calc(110 * var(--u));margin-top:calc(6 * var(--u))}
.lp-bar{position:absolute;left:0;right:0;top:calc(34 * var(--u));height:calc(24 * var(--u));background:var(--beige)}
.lp-bar i{display:block;height:100%}
.lp-tick{position:absolute;top:calc(28 * var(--u));height:calc(32 * var(--u));border-left:1px solid var(--ink)}
.lp-tick small{position:absolute;top:calc(36 * var(--u));left:calc(-12 * var(--u));font-size:calc(12 * var(--u));color:#555}
.lp-gl{position:absolute;top:calc(60 * var(--u));transform:translateX(-50%);font-size:calc(14 * var(--u));font-weight:700}
.lp-pin{position:absolute;top:0;transform:translateX(-50%);text-align:center;font-size:calc(13 * var(--u));font-weight:700;line-height:1.3}
.lp-pin i{display:block;font-style:normal;font-size:calc(13 * var(--u));margin-top:2px}
.lp-pin-last{color:#555}.lp-pin-you{color:var(--blue);top:calc(6 * var(--u))}
.lp-mock-low{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:calc(72 * var(--u));margin-top:calc(20 * var(--u));align-items:start}
.lp-mock-low>div:first-child .lp-sub-caps{margin-top:0;padding-bottom:calc(6 * var(--u));border-bottom:2px solid var(--ink);color:var(--blue);font-size:calc(12 * var(--u))}
.lp-marks{display:grid;gap:calc(14 * var(--u));margin-top:calc(14 * var(--u))}
.lp-mrow{display:grid;grid-template-columns:minmax(0,1.3fr) 1fr calc(44 * var(--u));gap:calc(14 * var(--u));align-items:center;font-size:calc(15 * var(--u))}
.lp-mrow div{height:calc(7 * var(--u));background:var(--beige)}
.lp-mrow div i{display:block;height:100%;background:var(--ink)}
.lp-mrow b{text-align:right;font-size:calc(15 * var(--u))}
.lp-mrow.hi{color:var(--blue);font-weight:700}.lp-mrow.hi div i{background:var(--blue)}
.lp-next{border-left:3px solid var(--blue);padding-left:calc(12 * var(--u))}
.lp-next h3{font-size:calc(26 * var(--u));line-height:1.15;letter-spacing:-.02em;margin-top:calc(8 * var(--u));max-width:calc(480 * var(--u))}
.lp-next .lp-fine{max-width:calc(480 * var(--u));margin-top:calc(12 * var(--u));font-size:calc(15 * var(--u))}
.lp-next .lp-cta-row{margin-top:calc(26 * var(--u))}

/* arena */
.lp-arena{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:calc(64 * var(--u));align-items:start}
.lp-arena .lp-body{max-width:calc(440 * var(--u));margin-top:calc(16 * var(--u))}
.lp-live{display:flex;align-items:center;gap:calc(8 * var(--u));font-size:calc(13 * var(--u));font-weight:700;margin-top:calc(48 * var(--u))}
.lp-live i{width:calc(10 * var(--u));height:calc(10 * var(--u));border-radius:50%;background:var(--blue);display:block}
.lp-1284{font-size:calc(120 * var(--u));line-height:.85;font-weight:700;letter-spacing:-.035em;color:var(--blue);margin:calc(20 * var(--u)) 0 calc(14 * var(--u)) calc(-5 * var(--u));white-space:nowrap}
.lp-arena .lp-fine{margin:0}
.lp-board-head,.lp-board-row{display:grid;grid-template-columns:calc(56 * var(--u)) minmax(0,1fr) calc(96 * var(--u)) calc(90 * var(--u)) calc(100 * var(--u));align-items:center;gap:calc(6 * var(--u))}
.lp-board-head{font-size:calc(13 * var(--u));font-weight:700;color:#444;padding-bottom:calc(6 * var(--u));border-bottom:3px solid var(--ink)}
.lp-board-head span:last-child,.lp-board-row .pts{text-align:right}
.lp-board-row{padding:calc(11 * var(--u)) 0;border-bottom:1px solid var(--rule);font-size:calc(15 * var(--u))}
.lp-board-row .rank{font-size:calc(24 * var(--u));letter-spacing:-.03em;font-weight:600;padding-left:2px}
.lp-board-row .blue{color:var(--blue)}
.lp-board-row strong{display:block;font-size:calc(17 * var(--u))}
.lp-board-row small{display:block;font-size:calc(13 * var(--u));color:#555;margin-top:2px}
.lp-board-row .pts{font-size:calc(20 * var(--u));letter-spacing:-.02em}
.lp-board-row.you{background:var(--tint)}
.lp-board-row.you strong,.lp-board-row.you small,.lp-board-row.you .pts,.lp-board-row.you span{color:var(--blue)}
.lp-board-row.you .pts{font-size:calc(18 * var(--u));padding-right:calc(8 * var(--u))}.lp-board-row.you strong{font-weight:700}

/* pricing */
.lp-pricing{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.6fr);gap:calc(64 * var(--u));align-items:start;position:relative}
.lp-pricing .lp-h2{max-width:calc(420 * var(--u));line-height:1.02}
.lp-pricing .lp-body{max-width:calc(420 * var(--u));font-size:calc(17 * var(--u))}
.lp-pricing .lp-sub-caps{font-size:calc(13 * var(--u));padding-bottom:calc(6 * var(--u));border-bottom:2px solid var(--ink);margin-top:calc(44 * var(--u))}
.lp-faq>div{padding:calc(14 * var(--u)) 0 calc(12 * var(--u));border-bottom:1px solid var(--rule)}
.lp-faq h4{font-size:calc(16 * var(--u))}.lp-faq p{font-size:calc(15 * var(--u));line-height:1.4;color:#444;margin-top:calc(6 * var(--u));max-width:calc(420 * var(--u))}
.lp-table{position:relative;padding-right:0;display:grid;grid-template-columns:1fr calc(180 * var(--u));grid-template-rows:auto auto auto}
.lp-price-card{grid-column:2;grid-row:1/4;background:var(--tint);border-top:3px solid var(--blue);padding:calc(16 * var(--u)) calc(14 * var(--u));margin-top:-1px;z-index:0}
.lp-price{font-size:calc(48 * var(--u));font-weight:700;letter-spacing:-.05em;color:var(--blue);line-height:1.05;margin-top:calc(10 * var(--u))}
.lp-price-card small{font-size:calc(12 * var(--u));color:#444}
.lp-incl{grid-column:1;grid-row:1;margin:calc(104 * var(--u)) 0 0!important;border:0!important;font-size:calc(13 * var(--u));align-self:end}
.lp-rows{grid-column:1/-1;grid-row:2;border-top:3px solid var(--ink);margin-top:calc(6 * var(--u));z-index:1}
.lp-row{display:grid;grid-template-columns:1fr calc(180 * var(--u));align-items:center;height:calc(46 * var(--u));border-bottom:1px solid var(--rule);font-size:calc(16 * var(--u))}
.lp-row b{padding-left:calc(14 * var(--u));color:var(--blue);font-size:calc(15 * var(--u))}
.lp-row b:only-child{font-size:calc(15 * var(--u))}
.lp-table-cta{grid-column:1;grid-row:3;display:flex;align-items:center;gap:calc(18 * var(--u));margin-top:calc(18 * var(--u));flex-wrap:wrap}
.lp-table-cta .lp-fine{margin:0;font-size:calc(14 * var(--u))}

/* final cta */
.lp-last{min-height:var(--vh);display:flex;flex-direction:column}
.lp-final{flex:1;position:relative;background:var(--blue);color:#fff;padding:calc(56 * var(--u)) var(--gut) calc(28 * var(--u));overflow:hidden;display:flex;flex-direction:column;justify-content:center}
.lp-final .lp-num{color:#fff;position:relative}
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
.lp-foot-grid{display:grid;grid-template-columns:1.9fr 1fr 1fr 1fr 1.4fr;gap:calc(20 * var(--u))}
.lp-foot-grid h5{font-size:calc(13 * var(--u));color:var(--blue);margin-bottom:calc(10 * var(--u))}
.lp-foot-grid a{display:block;font-size:calc(15 * var(--u));margin-bottom:calc(9 * var(--u))}
.lp-foot-grid .lp-fine{max-width:calc(280 * var(--u));margin-top:calc(14 * var(--u))}
.lp-foot-grid>div:last-child .lp-fine{margin:0 0 calc(20 * var(--u))}
.lp-email{display:flex;border-bottom:1px solid var(--ink);max-width:calc(260 * var(--u))}
.lp-email input{flex:1;border:0;outline:0;font:inherit;font-size:calc(15 * var(--u));padding:calc(10 * var(--u)) 0;min-width:0;background:none}
.lp-email button{color:var(--blue);font-size:calc(17 * var(--u));padding:0 calc(4 * var(--u)) 0 calc(12 * var(--u))}
.lp-legal{display:flex;justify-content:space-between;gap:calc(12 * var(--u));flex-wrap:wrap;border-top:1px solid var(--rule);margin-top:calc(26 * var(--u));padding:calc(14 * var(--u)) 0 calc(26 * var(--u));font-size:calc(13 * var(--u));color:#444}
.lp-legal b{font-size:calc(13 * var(--u))}

 /* section transitions */
.lp-rv>*{transition:opacity .9s ease,transform .9s cubic-bezier(.2,.7,.2,1)}
.lp-rv>*:nth-child(2){transition-delay:.12s}
.lp-rv>*:nth-child(3){transition-delay:.24s}
.lp-anim .lp-rv:not(.in)>*{opacity:0;transform:translateY(36px)}
@media (min-width:1000px){
  html.lp-snap{scroll-snap-type:y proximity;scroll-behavior:smooth}
  .lp>section,.lp-last{scroll-snap-align:start}
}

/* responsive */
/* contributors */
.lp-contrib{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:calc(64 * var(--u));align-items:start}
.lp-contrib .lp-h2{max-width:calc(520 * var(--u))}
.lp-contrib .lp-body{max-width:calc(480 * var(--u))}
.lp-contrib .lp-sub-caps{font-size:calc(13 * var(--u));padding-bottom:calc(6 * var(--u));border-bottom:2px solid var(--ink);margin-top:calc(36 * var(--u))}
.lp-contrib .lp-sub-caps+.lp-rows{border-top:0;margin-top:0}
.lp-way{display:grid;grid-template-columns:calc(44 * var(--u)) 1fr;align-items:start}
.lp-way>span{font-size:calc(15 * var(--u));font-weight:700;color:var(--blue);padding-top:calc(2 * var(--u))}
.lp-cert{border:2px solid var(--ink);background:#fff;padding:calc(32 * var(--u));text-align:center}
.lp-cert-small{font-size:calc(14 * var(--u));color:var(--mute);margin-top:calc(18 * var(--u))}
.lp-cert-name{font-size:calc(44 * var(--u));font-weight:700;letter-spacing:-.03em;line-height:1.1;margin-top:calc(6 * var(--u))}
.lp-cert-sub{font-size:calc(22 * var(--u));font-weight:700;color:var(--blue);margin-top:calc(6 * var(--u))}
.lp-cert-foot{display:flex;justify-content:space-between;align-items:center;margin-top:calc(28 * var(--u));padding-top:calc(14 * var(--u));border-top:1px solid var(--rule);font-size:calc(13 * var(--u));color:var(--mute)}
.lp-cert-seal{width:calc(44 * var(--u));height:calc(44 * var(--u));border-radius:50%;background:var(--blue);color:#fff;font-weight:700;display:grid;place-items:center;font-size:calc(12 * var(--u))}
@media (max-width:1000px){
  .lp-sec,.lp-quiz,.lp-hero,.lp-last{min-height:0}
  .lp-nav{margin-bottom:calc(40 * var(--u))}.lp-eyebrow{margin-top:0}.lp-hero-lower{margin-bottom:0}
  .lp-final-days{font-size:calc(130 * var(--u))}.lp-big-days{font-size:calc(130 * var(--u))}.lp-countdown .lp-big-days{font-size:calc(130 * var(--u))}
  .lp-hero{grid-template-columns:1fr;margin:0}
  .lp-hero-main{padding:0 var(--pad) calc(32 * var(--u))}
  .lp-hero-main{max-width:none}
  .lp-hero-panel{min-height:calc(480 * var(--u))}
  .lp-desktop-only{display:none}.lp-mobile-only{display:flex}
  .lp-index,.lp-notes,.lp-papers,.lp-arena,.lp-pricing,.lp-contrib,.lp-quiz-in,.lp-mock-low,.lp-final-in{grid-template-columns:1fr}
  .lp-h2-tight{max-width:none}
  .lp-steps{grid-template-columns:repeat(2,1fr);row-gap:calc(30 * var(--u))}
  .lp-foot-grid{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:640px){
  .lp{--pad:calc(20 * var(--u))}
  .lp-h1{font-size:calc(42 * var(--u))}.lp-h2,.lp-quiz .lp-h2,.lp-final .lp-h2{font-size:calc(32 * var(--u))}
  .lp-eleven{font-size:calc(120 * var(--u))}.lp-1284{font-size:calc(84 * var(--u))}.lp-final-days{font-size:calc(120 * var(--u))}.lp-grade div{font-size:calc(110 * var(--u))}
  .lp-nav{gap:calc(12 * var(--u))}.lp-nav-r{gap:calc(12 * var(--u))}
  .lp-sec,.lp-quiz{padding-top:calc(48 * var(--u));padding-bottom:calc(48 * var(--u))}
  .lp-nav{margin-bottom:calc(40 * var(--u))}
  .lp-hero-lower{grid-template-columns:1fr}
  .lp-note{padding:calc(18 * var(--u))}
  .lp-note-grid{grid-template-columns:1fr}
  .lp-grid{grid-template-columns:calc(38 * var(--u)) repeat(3,minmax(0,1fr));column-gap:calc(6 * var(--u))}
  .lp-cell{height:calc(34 * var(--u));font-size:calc(12 * var(--u))}
  .lp-year{font-size:calc(15 * var(--u))}
  .lp-board-head,.lp-board-row{grid-template-columns:calc(36 * var(--u)) minmax(0,1fr) calc(64 * var(--u))}
  .lp-board-head span:nth-child(3),.lp-board-head span:nth-child(4),
  .lp-board-row>span{display:none}
  .lp-grade div{font-size:calc(130 * var(--u))}
  .lp-table,.lp-row{grid-template-columns:1fr calc(112 * var(--u))}
  .lp-steps{grid-template-columns:1fr}
}

/* cat mode: cream page, brown panels, orange accents */
html[data-cat="on"] .lp{--blue:#c4501b;--ink:#2a2420;--mute:#6b5e52;--rule:#ecd9bd;--beige:#ecd9bd;--tint:#fbe3c2;background:#fdf3e1}
html[data-cat="on"] .lp .lp-white{color:#fff1dc}
html[data-cat="on"] .lp .lp-white-soft{color:rgba(255,241,220,.88)}
html[data-cat="on"] .lp-hero-panel,html[data-cat="on"] .lp-quiz,html[data-cat="on"] .lp-final{background:#2a2420;color:#fff1dc}
html[data-cat="on"] .lp-hero-panel .lp-link-sm{color:#fff1dc}
html[data-cat="on"] .lp-big-days{color:#e8a05c}
html[data-cat="on"] .lp-btn-white{background:#fff1dc;color:#c4501b}
html[data-cat="on"] .lp-btn-blue,html[data-cat="on"] .k-done,html[data-cat="on"] .c-done,html[data-cat="on"] .lp-cert-seal{background:#d9692e;color:#fff1dc}
html[data-cat="on"] .lp-note,html[data-cat="on"] .lp-cert,html[data-cat="on"] .c-started,html[data-cat="on"] .lp-trolley{background:#fffaf0}
html[data-cat="on"] .lp-note{border-color:#ecd9bd;border-top-color:#d9692e}
html[data-cat="on"] .lp-opts li.right{background:#fff1dc;color:#c4501b}
html[data-cat="on"] .lp-q-bars i.on{background:#fff1dc}
html[data-cat="on"] .lp-bar i{background:#d9692e!important}
html[data-cat="on"] .lp-timeline i::before{background:#fff1dc}
.lp-slashes{position:absolute;top:0;left:calc(28 * var(--u));width:calc(90 * var(--u));height:calc(120 * var(--u));z-index:1;pointer-events:none}
.lp-slashes-final{top:calc(24 * var(--u));left:auto;right:calc(110 * var(--u));height:calc(140 * var(--u))}
.lp-cat-cd{position:relative;margin:auto 0 0;z-index:1;display:flex;flex-direction:column;align-items:flex-start}
.lp-cat-face{width:calc(240 * var(--u));max-width:100%;height:auto;align-self:center}
.lp-cat-cd .lp-big-days{font-size:calc(150 * var(--u));margin-top:calc(14 * var(--u));margin-left:calc(-6 * var(--u));white-space:nowrap}
.lp-paws{width:calc(150 * var(--u));height:auto;margin-top:calc(24 * var(--u));opacity:.9}
.lp-cat-final{position:absolute;right:calc(56 * var(--u));bottom:calc(136 * var(--u));width:calc(240 * var(--u));height:auto;z-index:0;pointer-events:none}
@media (max-width:640px){.lp-cat-final{display:none}.lp-cat-face{width:calc(150 * var(--u))}.lp-slashes-final{display:none}}
`;
