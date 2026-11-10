"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

type Course = { name: string; code: string; meta: string; href?: string };
type Group = { label: string; courses: Course[] };

// Only the classes that already have a page link through; the rest stay plain rows
const igcseLeft: Group[] = [
  {
    label: "Sciences",
    courses: [
      { name: "Physics", code: "0625", meta: "42 lessons · 610 questions · 58 papers · most picked", href: "/classes/igcse-physics" },
      { name: "Physics (Triple)", code: "0625", meta: "Core & Extended · 126 topics · 6 units", href: "/classes/igcse-physics-triple" },
      { name: "Chemistry", code: "0620", meta: "38 lessons · 540 questions · 58 papers", href: "/classes/igcse-chemistry" },
      { name: "Biology", code: "0610", meta: "40 lessons · 495 questions · 56 papers", href: "/classes/igcse-biology" },
    ],
  },
  {
    label: "Mathematics",
    courses: [
      { name: "Mathematics", code: "0580", meta: "Core & Extended · 125 topics · 62 papers · most picked", href: "/classes/igcse-math" },
      { name: "Mathematics A (Pearson Edexcel)", code: "4MA1", meta: "8 grade bands · 134 topics · Foundation & Higher", href: "/classes/edexcel-igcse-math" },
      { name: "Additional Maths", code: "0606", meta: "29 lessons · 410 questions · 44 papers" },
    ],
  },
];

const igcseRight: Group[] = [
  {
    label: "Co-ordinated Sciences",
    courses: [
      { name: "Biology", code: "0654", meta: "Core & Extended · 169 topics · 19 units", href: "/classes/igcse-sci-biology" },
      { name: "Chemistry", code: "0654", meta: "Core & Extended · 55 topics · 12 units", href: "/classes/igcse-sci-chemistry" },
      { name: "Physics", code: "0654", meta: "Core & Extended · 239 topics · 6 units", href: "/classes/igcse-sci-physics" },
    ],
  },
  {
    label: "Computing",
    courses: [{ name: "Computer Science", code: "0478", meta: "33 lessons · 380 questions · 40 papers" }],
  },
  {
    label: "Business & Economics",
    courses: [
      { name: "Economics", code: "0455", meta: "27 lessons · 300 questions · 46 papers" },
      { name: "Business Studies", code: "0450", meta: "25 lessons · 280 questions · 46 papers", href: "/classes/igcse-business" },
    ],
  },
];

const alevelLeft: Group[] = [
  {
    label: "Sciences",
    courses: [
      { name: "Physics", code: "9702", meta: "38 lessons · 540 questions · 40 papers" },
      { name: "Chemistry", code: "9701", meta: "41 lessons · 505 questions · 40 papers" },
    ],
  },
  {
    label: "Mathematics",
    courses: [{ name: "Mathematics", code: "9709", meta: "46 lessons · 760 questions · 52 papers" }],
  },
];

const alsoAlevel: Course[] = [
  { name: "Physics", code: "9702", meta: "" },
  { name: "Chemistry", code: "9701", meta: "" },
  { name: "Mathematics", code: "9709", meta: "" },
];

const comingNext: Course[] = [
  { name: "Biology", code: "9700", meta: "" },
  { name: "Economics", code: "9708", meta: "" },
  { name: "Computer Science", code: "9618", meta: "" },
];

function Row({ course }: { course: Course }) {
  const inner = (
    <>
      <div className="min-w-0">
        <h3 className="!mb-0 text-[clamp(20px,1.75vw,28px)] font-bold leading-[1.1] tracking-[-0.02em]">{course.name}</h3>
        <p className="!mb-0 mt-0.5 text-[clamp(11px,0.85vw,13px)] text-[#4a4a44]">{course.meta}</p>
      </div>
      <span className="shrink-0 pl-4 text-[clamp(22px,1.9vw,30px)] font-bold tracking-[-0.02em] text-[#1c3bff]">{course.code}</span>
    </>
  );
  const cls = "flex items-center justify-between border-b border-[#d9d4c4] py-[clamp(6px,1.1vh,12px)]";
  return course.href ? (
    <Link href={course.href} className={`${cls} transition-colors hover:bg-[#ece8da]`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function CompactList({ label, courses, dim }: { label: string; courses: Course[]; dim?: boolean }) {
  return (
    <section>
      <h2 className="!mb-0 border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{label}</h2>
      {courses.map((c) => (
        <div
          key={c.code}
          className={`flex items-center justify-between border-b border-[#d9d4c4] py-[clamp(4px,0.8vh,8px)] ${dim ? "opacity-60" : ""}`}
        >
          <span className="!mb-0 text-[clamp(15px,1.25vw,20px)] font-bold">{c.name}</span>
          <span className="text-[clamp(18px,1.5vw,24px)] font-bold text-[#1c3bff]">{c.code}</span>
        </div>
      ))}
    </section>
  );
}

function Groups({ groups }: { groups: Group[] }) {
  return (
    <>
      {groups.map((g) => (
        <section key={g.label}>
          <h2 className="!mb-0 border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{g.label}</h2>
          {g.courses.map((c) => (
            <Row key={c.href ?? c.code} course={c} />
          ))}
        </section>
      ))}
    </>
  );
}

export default function ClassesPage() {
  const [level, setLevel] = useState<"IGCSE" | "A-Level">("IGCSE");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const match = (c: Course) => !q || c.name.toLowerCase().includes(q) || c.code.includes(q);
  const filter = (groups: Group[]) =>
    groups.map((g) => ({ ...g, courses: g.courses.filter(match) })).filter((g) => g.courses.length > 0);

  const left = filter(level === "IGCSE" ? igcseLeft : alevelLeft);
  const right = level === "IGCSE" ? filter(igcseRight) : [];
  const sideList = (level === "IGCSE" ? alsoAlevel : comingNext).filter(match);
  const nothing = left.length === 0 && right.length === 0 && sideList.length === 0;

  return (
    <PageShell eyebrow="Classes — the 2026/27 index" title="The index.">
      {/* Level tabs + search */}
      <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
        <div className="flex gap-7" role="tablist">
          {(["IGCSE", "A-Level"] as const).map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={level === l}
              onClick={() => setLevel(l)}
              className={`border-b-2 pb-2 text-[clamp(16px,1.25vw,20px)] font-bold transition-colors ${
                level === l ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a subject or code"
          aria-label="Search a subject or code"
          className="w-full border-b border-[#111] bg-transparent py-2 text-[clamp(14px,1.1vw,17px)] outline-none placeholder:text-[#8d8978] sm:w-[min(100%,320px)]"
        />
      </div>

      {/* Index */}
      <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-2">
        <div className="space-y-[clamp(14px,2.4vh,28px)]">
          <Groups groups={left} />
        </div>
        <div className="space-y-[clamp(14px,2.4vh,28px)]">
          <Groups groups={right} />
          {sideList.length > 0 && (
            <CompactList
              label={level === "IGCSE" ? "A-Level · also on POP" : "A-Level · coming next"}
              courses={sideList}
              dim={level === "A-Level"}
            />
          )}
        </div>
      </div>

      {nothing && <p className="mt-10 text-lg">No class matches “{query}”.</p>}

      <div className="mt-auto border-t border-[#111] pt-4 text-[clamp(14px,1.1vw,17px)]">
        <p className="!mb-0">
          Can&apos;t find your subject? New classes are added every term. Tell us which one you need{" "}
          <Link href="/" className="font-bold">→</Link>
        </p>
      </div>
    </PageShell>
  );
}
