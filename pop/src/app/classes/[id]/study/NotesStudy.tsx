"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { NoteBlock, RichText, TopicNotes } from "@/lib/notes";

export type StudyUnit = { label: string; topics: { id: string; title: string; tag?: string }[] };

const tabs = [
  { id: "notes", label: "Revision notes" },
  { id: "questions", label: "Topic questions" },
  { id: "papers", label: "Past papers & MS" },
  { id: "videos", label: "Video lessons" },
  { id: "cards", label: "Flashcards", href: "/flashcards" },
  { id: "interactive", label: "Interactive" },
  { id: "discussion", label: "Discussion" },
];

const blue = "text-[#1c3bff]";
const eyebrow = `text-[11px] font-bold uppercase tracking-wide ${blue}`;

/** Some notes write maths as $…$ (or bare LaTeX) in plain text rather than as Notion equations. */
function withMath(text: string): ReactNode {
  if (!text.includes("$") && /^[^\s]*\\[a-zA-Z]/.test(text.trim()) && !/\s[a-z]{3,}\s/.test(text)) {
    return <InlineMath math={text.trim()} errorColor="#b3261e" />;
  }
  if (!/\$[^$]+\$/.test(text)) return text;
  return text.split(/(\$[^$]+\$)/g).map((part, i) =>
    /^\$[^$]+\$$/.test(part) ? <InlineMath key={i} math={part.slice(1, -1)} errorColor="#b3261e" /> : part,
  );
}

function RT({ items = [] }: { items?: RichText[] }) {
  return (
    <>
      {items.map((r, i) => {
        if (r.e) return <InlineMath key={i} math={r.x} errorColor="#b3261e" />;
        let node: ReactNode = withMath(r.x);
        if (r.c) node = <code className="bg-[#efece2] px-1 text-[0.9em]">{node}</code>;
        if (r.b) node = <strong>{node}</strong>;
        if (r.i) node = <em>{node}</em>;
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}

/** The topic's image from Notion, in the slot under the title. */
function Hero({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="mt-4 grid aspect-[914/270] place-items-center bg-[#efece2] text-[11px] font-bold uppercase tracking-wide text-[#6b6759]">
        Image &nbsp;·&nbsp; 914 × 270
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="mt-4 block h-auto w-full bg-[#efece2]" />;
}

const plain = (items: RichText[] = []) => items.map((r) => r.x).join("");

const sectionTag = (heading: string) =>
  /^worked/i.test(heading) ? "Worked example" : /^common mistake/i.test(heading) ? "Common mistakes" : "Explanation";

function Callout({ rt }: { rt: RichText[] }) {
  // "Exam Tip: …" splits into a label and the body
  const first = rt[0]?.x ?? "";
  const m = first.match(/^([A-Za-z ]{3,24}):\s*/);
  const body = m ? [{ ...rt[0], x: first.slice(m[0].length) }, ...rt.slice(1)] : rt;
  return (
    <div className="my-6 border-l-4 border-[#1c3bff] pl-4">
      {m && <p className={eyebrow}>{m[1]}</p>}
      <p className="mt-1 text-[clamp(16px,1.3vw,20px)] font-bold leading-snug">
        <RT items={body} />
      </p>
    </div>
  );
}

function Blocks({ blocks }: { blocks: NoteBlock[] }) {
  const out: ReactNode[] = [];
  let section = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const key = i;
    if (b.k === "heading_1" || b.k === "heading_2") {
      section += 1;
      const text = plain(b.rt).replace(/^\d+[.)]\s+/, "");
      out.push(
        <div key={key} className="mt-9 first:mt-0">
          <p className={eyebrow}>
            {String(section).padStart(2, "0")} — {sectionTag(text)}
          </p>
          <h2 className="mt-1 text-[clamp(22px,2vw,30px)] font-bold leading-[1.15] tracking-[-0.02em]">{text}</h2>
        </div>
      );
    } else if (b.k === "heading_3" && /^raw html/i.test(plain(b.rt))) {
      // Notion label above the infographic source; the figure has its own caption
      continue;
    } else if (b.k === "heading_3") {
      out.push(
        <h3 key={key} className="mt-5 text-[clamp(17px,1.4vw,21px)] font-bold">
          <RT items={b.rt} />
        </h3>
      );
    } else if (b.k === "bulleted_list_item" || b.k === "numbered_list_item") {
      const kind = b.k;
      const items: NoteBlock[] = [];
      while (i < blocks.length && blocks[i].k === kind) items.push(blocks[i++]);
      i--;
      const List = kind === "bulleted_list_item" ? "ul" : "ol";
      out.push(
        <List key={key} className={`my-3 space-y-1.5 pl-6 text-[clamp(15px,1.15vw,18px)] leading-relaxed text-[#2c2c28] ${kind === "bulleted_list_item" ? "list-disc" : "list-decimal"} marker:font-bold marker:text-[#1c3bff]`}>
          {items.map((it, j) => (
            <li key={j}>
              <RT items={it.rt} />
              {it.ch && <Blocks blocks={it.ch} />}
            </li>
          ))}
        </List>
      );
    } else if (b.k === "quote" || b.k === "callout") {
      out.push(<Callout key={key} rt={b.rt ?? []} />);
    } else if (b.k === "equation") {
      out.push(
        <div key={key} className="my-4 overflow-x-auto bg-[#f4f1e8] px-4 py-2 text-[1.1em]">
          <BlockMath math={b.x ?? ""} errorColor="#b3261e" />
        </div>
      );
    } else if (b.k === "code") {
      out.push(
        <pre key={key} className="my-4 overflow-x-auto bg-[#f4f1e8] p-4 text-[13px]"><code>{b.x}</code></pre>
      );
    } else if (b.k === "table") {
      const all = b.rows ?? [];
      const head = b.head ? all[0] : undefined;
      const rows = b.head ? all.slice(1) : all;
      out.push(
        <div key={key} className="my-5 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[clamp(14px,1.05vw,16px)]">
            {head && (
              <thead>
                <tr className="border-b-2 border-[#111]">
                  {head.map((c, j) => (
                    <th key={j} className={`py-2 pr-4 text-[11px] font-bold uppercase tracking-wide ${blue}`}><RT items={c} /></th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((r, j) => (
                <tr key={j} className="border-b border-[#d9d4c4]">
                  {r.map((c, k) => (
                    <td key={k} className="py-2 pr-4 align-top"><RT items={c} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (b.k === "divider") {
      // A divider right before the infographic is just Notion layout
      if (blocks[i + 1]?.k !== "heading_3" && blocks[i + 1]?.k !== "code") out.push(<hr key={key} className="my-6 border-[#d9d4c4]" />);
    } else if (b.rt && plain(b.rt).trim()) {
      out.push(
        <p key={key} className="my-3 max-w-[72ch] text-[clamp(15px,1.15vw,18px)] leading-relaxed text-[#2c2c28]">
          <RT items={b.rt} />
        </p>
      );
    }
  }
  return <>{out}</>;
}

function useCompleted(classId: string) {
  const storeKey = `pop-done:${classId}`;
  const [done, setDone] = useState<string[]>([]);

  // localStorage is per-browser and best-effort; read it after mount
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        setDone(JSON.parse(localStorage.getItem(storeKey) ?? "[]"));
      } catch {
        /* storage unavailable */
      }
    }, 0);
    return () => clearTimeout(t);
  }, [storeKey]);

  const toggle = (id: string) =>
    setDone((cur) => {
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      try {
        localStorage.setItem(storeKey, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });

  return { done, toggle };
}

export default function NotesStudy({
  classId,
  name,
  code,
  board,
  level,
  units,
  topicId,
  notes,
  tab,
}: {
  classId: string;
  name: string;
  code: string;
  board: string;
  level: string;
  units: StudyUnit[];
  topicId: string;
  notes: TopicNotes;
  tab: string;
}) {
  const { done, toggle } = useCompleted(classId);
  const flat = units.flatMap((u) => u.topics);
  const idx = flat.findIndex((t) => t.id === topicId);
  const prev = flat[idx - 1];
  const next = flat[idx + 1];
  const current = flat[idx];
  const pct = Math.round((done.filter((d) => flat.some((t) => t.id === d)).length / flat.length) * 100);
  const doneCount = done.filter((d) => flat.some((t) => t.id === d)).length;
  const isDone = done.includes(topicId);
  const href = (id: string) => `/classes/${classId}/study?topic=${encodeURIComponent(id)}`;

  const words = notes.blocks.reduce((n, b) => n + plain(b.rt).split(/\s+/).length + (b.ch?.length ?? 0) * 6, 0);
  const sections = notes.blocks.filter((b) => b.k === "heading_1" || b.k === "heading_2").length;

  return (
    <div className="min-h-screen bg-white text-[#111]" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <header className="flex items-center justify-between gap-4 border-b border-[#d9d4c4] px-6 py-4 md:px-10">
        <Link href="/" className="text-[clamp(26px,2.2vw,34px)] font-bold leading-none tracking-tight">
          <span className={blue}>POP</span>
          <span className="ml-1 text-[15px] font-normal text-[#111]">Studying</span>
        </Link>
        <p className="hidden text-[11px] font-bold uppercase tracking-wide text-[#4a4a44] sm:block">
          {name} {code} &nbsp;·&nbsp; {doneCount} of {flat.length} topics done &nbsp;·&nbsp; {pct}%
        </p>
      </header>

      <div className="md:grid md:grid-cols-[clamp(300px,24vw,380px)_1fr]">
        {/* Sidebar */}
        <aside className="border-b border-[#d9d4c4] px-6 py-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r md:px-10">
          <Link href={`/classes/${classId}`} className="text-sm font-bold text-[#1c3bff]">← Overview</Link>
          <p className={`mt-4 ${eyebrow}`}>
            {level} &nbsp;·&nbsp; {board}
          </p>
          <h1 className="!mb-0 mt-1 text-[clamp(26px,2.2vw,34px)] font-bold leading-tight tracking-[-0.03em]">
            {name} {code}
          </h1>
          <div className="mt-2 h-[5px] bg-[#dedacb]">
            <div className="h-full bg-[#1c3bff]" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 flex justify-between text-[12px] text-[#4a4a44]">
            <span>{doneCount} of {flat.length} topics done</span>
            <span>{pct}%</span>
          </p>

          <div className="mt-5 border-t-2 border-[#111]">
            {units.map((u) => {
              const open = u.topics.some((t) => t.id === topicId);
              return (
                <details key={u.label} open={open} className="group border-b border-[#d9d4c4]">
                  <summary className={`flex cursor-pointer list-none items-center justify-between py-2.5 text-[11px] font-bold uppercase tracking-wide ${open ? blue : "text-[#4a4a44]"}`}>
                    {u.label}
                    <span className="text-[#8d8978] group-open:rotate-90">›</span>
                  </summary>
                  <div className="pb-2">
                    {u.topics.map((t) => {
                      const active = t.id === topicId;
                      return (
                        <Link
                          key={t.id}
                          href={href(t.id)}
                          className={`flex items-start gap-3 py-2 pl-2 pr-1 text-[14px] leading-snug ${
                            active ? "border-l-4 border-[#1c3bff] bg-[#e8ebff] pl-2 font-bold" : "hover:bg-[#f4f1e8]"
                          }`}
                        >
                          <span className={`w-10 shrink-0 text-[12px] font-bold ${blue}`}>{t.id}</span>
                          <span className="min-w-0 flex-1">{t.title}</span>
                          {done.includes(t.id) && <span className={blue}>✓</span>}
                        </Link>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </div>

          <button
            onClick={() => toggle(topicId)}
            className={`mt-5 h-11 w-full text-sm font-bold ${isDone ? "border border-[#111] bg-white text-[#111]" : "bg-[#111] text-white hover:bg-[#1c3bff]"}`}
          >
            {isDone ? "Completed ✓ — undo" : "Mark as complete →"}
          </button>

          <p className={`mt-8 ${eyebrow}`}>Keep these handy</p>
          <div className="mt-1 border-t-2 border-[#111]">
            {[
              { label: "Definitions glossary", href: "/dictionary" },
              { label: "Flashcards", href: "/flashcards" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="flex items-center justify-between border-b border-[#d9d4c4] py-3 text-sm hover:bg-[#f4f1e8]">
                {l.label}
                <span className={blue}>→</span>
              </Link>
            ))}
          </div>
          <Link href={`/classes/mock/${classId}`} className="mt-6 inline-block text-sm font-bold text-[#1c3bff]">Sit a full mock exam →</Link>
        </aside>

        {/* Main */}
        <main className="min-w-0 px-6 pb-16 md:px-10">
          <nav className="flex gap-x-7 overflow-x-auto border-b border-[#d9d4c4]" role="tablist">
            {tabs.map((t) => {
              const active = t.id === tab;
              return (
                <Link
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  href={t.href ?? `${href(topicId)}&tab=${t.id}`}
                  className={`whitespace-nowrap border-b-2 py-4 text-[11px] font-bold uppercase tracking-wide ${
                    active ? "border-[#1c3bff] text-[#1c3bff]" : "border-transparent text-[#4a4a44] hover:text-[#111]"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>

          <p className={`mt-8 ${eyebrow}`}>
            {board} {code} {level} &nbsp;·&nbsp; Topic {topicId}
            {current?.tag && <> &nbsp;·&nbsp; {current.tag} tier</>}
          </p>
          <h2 className="!mb-0 mt-3 max-w-[22ch] text-[clamp(40px,4.6vw,76px)] font-bold leading-[1] tracking-[-0.04em]">
            {topicId} {notes.title}
          </h2>
          <div className="mt-4 border-t-4 border-[#111]" />

          {tab === "notes" ? (
            <>
              <Hero src={notes.hero} alt={`${topicId} ${notes.title}`} />

              <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_clamp(220px,20vw,290px)]">
                <article className="min-w-0">
                  <Blocks blocks={notes.blocks} />
                </article>
                <aside className="lg:sticky lg:top-6 lg:self-start">
                  <p className={eyebrow}>At a glance</p>
                  <dl className="mt-2 border-t-2 border-[#111] text-sm">
                    {[
                      ["Reading time", `${Math.max(1, Math.round(words / 180))} min`],
                      ["Sections", String(sections)],
                      ["Specification", code],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-[#d9d4c4] py-2.5">
                        <dt className="text-[#4a4a44]">{k}</dt>
                        <dd className="font-bold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>

              <div className="mt-12 flex justify-between gap-6 border-t border-[#111] pt-4 text-sm font-bold">
                {prev ? <Link href={href(prev.id)} className={blue}>← {prev.id} {prev.title}</Link> : <span />}
                {next ? <Link href={href(next.id)} className={`text-right ${blue}`}>{next.id} {next.title} →</Link> : <span />}
              </div>
            </>
          ) : (
            <div className="py-16">
              <p className="text-[clamp(24px,2.2vw,34px)] font-bold tracking-[-0.02em]">{tabs.find((t) => t.id === tab)?.label} — coming soon.</p>
              <p className="mt-2 max-w-[56ch] text-[#4a4a44]">This part of {topicId} hasn&apos;t been written yet. The revision notes are ready.</p>
              <Link href={href(topicId)} className={`mt-4 inline-block text-sm font-bold ${blue}`}>Back to the notes →</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
