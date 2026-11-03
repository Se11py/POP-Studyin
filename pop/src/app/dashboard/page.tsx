"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import PageShell from "@/components/PageShell";

type Tab = "overview" | "courses" | "flashcards" | "arena";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "My courses" },
  { id: "flashcards", label: "My flashcards" },
  { id: "arena", label: "POP Arena" },
];

const activeCourses = [
  { id: "igcse-physics", name: "Physics", subtitle: "Co-ordinated Sciences", currentTopic: "Module 1.2: Dynamics of Motion" },
  { id: "igcse-math", name: "Mathematics", subtitle: "Core & Extended syllabus", currentTopic: "Module 4.1: Cumulative Frequency & Box Plots" },
];

const activeDecks = [
  { id: "igcse-physics-kinematics-equations", title: "Physics Kinematics Formulas", category: "Physics" },
  { id: "igcse-chemistry-formulas", title: "Chemical Bonding & Structure", category: "Chemistry" },
];

const timetable = [
  { day: "Mon", date: "06", title: "IGCSE Physics Clinic", detail: "Wave superposition drills · 19:00", next: true },
  { day: "Wed", date: "08", title: "Essay Review Submission", detail: "Upload drafts by Friday midnight" },
];

// The four POP Arena answer tokens — kept in sync with the live game
const arenaTokens = [
  { color: "#FF2E4D", shape: <path d="M12 3 22 20.5H2L12 3Z" /> },
  { color: "#2E6BFF", shape: <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z" /> },
  { color: "#FFC400", shape: <circle cx="12" cy="12" r="10" /> },
  { color: "#00E89B", shape: <rect x="2.5" y="2.5" width="19" height="19" /> },
];

const arenaFacts = ["Up to 40 players", "15s rounds", "Projector view", "Streak bonuses"];

function Label({ children }: { children: ReactNode }) {
  return <h2 className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{children}</h2>;
}

function CourseRows() {
  return (
    <section>
      <Label>Continue learning</Label>
      {activeCourses.map((c) => (
        <Link
          key={c.name}
          href={`/classes/${c.id}/study`}
          className="flex items-center justify-between gap-4 border-b border-[#d9d4c4] py-[clamp(10px,1.6vh,18px)] transition-colors hover:bg-[#ece8da]"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{c.subtitle}</p>
            <h3 className="mt-0.5 text-[clamp(24px,2.2vw,36px)] font-bold leading-[1.05] tracking-[-0.025em]">{c.name}</h3>
            <p className="mt-1 text-[clamp(12px,0.95vw,15px)] text-[#4a4a44]">Currently on {c.currentTopic}</p>
          </div>
          <span className="shrink-0 text-sm font-bold text-[#1c3bff]">Resume →</span>
        </Link>
      ))}
    </section>
  );
}

function DeckRows() {
  return (
    <section>
      <div className="flex items-end justify-between border-b-2 border-[#111] pb-1.5">
        <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">Decks in progress</h2>
        <Link href="/flashcards" className="text-[12px] font-bold text-[#1c3bff]">All decks →</Link>
      </div>
      {activeDecks.map((d) => (
        <Link
          key={d.id}
          href={`/flashcards/study/${d.id}`}
          className="flex items-center justify-between gap-4 border-b border-[#d9d4c4] py-[clamp(8px,1.3vh,14px)] transition-colors hover:bg-[#ece8da]"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{d.category}</p>
            <h3 className="text-[clamp(18px,1.55vw,24px)] font-bold leading-[1.15] tracking-[-0.02em]">{d.title}</h3>
          </div>
          <span className="shrink-0 text-sm font-bold text-[#1c3bff]">Continue →</span>
        </Link>
      ))}
    </section>
  );
}

function ArenaPanel() {
  return (
    <>
      <div className="bg-[#1c3bff] p-[clamp(20px,2vw,32px)] text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/25 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">POP Arena</span>
          </div>
          <div className="flex items-center gap-1.5">
            {arenaTokens.map((t) => (
              <span key={t.color} className="grid h-6 w-6 place-items-center" style={{ backgroundColor: t.color }}>
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#0B0B0D" aria-hidden="true">
                  {t.shape}
                </svg>
              </span>
            ))}
          </div>
        </div>
        <h3 className="mt-4 text-[clamp(26px,2.4vw,38px)] font-bold leading-[1.05] tracking-[-0.03em]">Host a live match from any deck.</h3>
        <p className="mt-2 max-w-[56ch] text-[clamp(14px,1.1vw,17px)] leading-snug text-white/85">
          Turn a flashcard set into a fast-paced multiplayer quiz. Your screen becomes the projector view with a game PIN, and everyone joins from their phone.
        </p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-white/70">{arenaFacts.join("  ·  ")}</p>
        <Link href="/arena-2" className="mt-5 inline-flex h-11 items-center bg-white px-7 text-sm font-bold text-[#111]">
          Host POP Arena →
        </Link>
      </div>

      <section className="mt-6">
        <Label>Host from a deck</Label>
        {activeDecks.map((d) => (
          <div key={d.id} className="flex items-center justify-between gap-4 border-b border-[#d9d4c4] py-[clamp(8px,1.3vh,14px)]">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{d.category}</p>
              <h3 className="text-[clamp(18px,1.55vw,24px)] font-bold leading-[1.15] tracking-[-0.02em]">{d.title}</h3>
            </div>
            <Link href="/arena-2" title={`Host ${d.title} as a live POP Arena game`} className="shrink-0 bg-[#111] px-5 py-2 text-sm font-bold text-white">
              Host →
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <PageShell eyebrow="Dashboard — your desk" title={`Welcome back, ${user?.firstName || "student"}.`}>
      <div className="pt-3" role="tablist">
        <div className="flex flex-wrap gap-x-7 gap-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`border-b-2 pb-2 text-[clamp(16px,1.25vw,20px)] font-bold transition-colors ${
                tab === t.id ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-[clamp(14px,2.4vh,28px)]">
          {tab === "overview" && (
            <>
              <CourseRows />
              <DeckRows />
            </>
          )}
          {tab === "courses" && <CourseRows />}
          {tab === "flashcards" && <DeckRows />}
          {tab === "arena" && <ArenaPanel />}
        </div>

        <aside>
          <Label>Timetable &amp; clinics</Label>
          {timetable.map((e) => (
            <div key={e.title} className="flex items-start gap-4 border-b border-[#d9d4c4] py-[clamp(10px,1.6vh,18px)]">
              <div className="w-12 shrink-0 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{e.day}</p>
                <p className={`text-[28px] font-bold leading-none tracking-[-0.03em] ${e.next ? "text-[#1c3bff]" : "text-[#111]"}`}>{e.date}</p>
              </div>
              <div>
                <h3 className="text-[clamp(16px,1.3vw,20px)] font-bold leading-tight tracking-[-0.01em]">{e.title}</h3>
                <p className="mt-0.5 text-[clamp(12px,0.95vw,14px)] text-[#4a4a44]">{e.detail}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </PageShell>
  );
}
