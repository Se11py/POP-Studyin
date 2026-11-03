"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import posthog from "posthog-js";

const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

type CardDraft = { front: string; back: string };

const initialSets = [
  { id: 1, title: "Spanish Vocabulary Specialization", description: "Build essential conversational skills with this comprehensive vocabulary series.", cardCount: 127, lastStudied: "Reviewed 2 hours ago", progress: 85, category: "Languages", source: "Language Faculty" },
  { id: 2, title: "Cell Biology & Molecular Genetics", description: "Explore the fundamental building blocks of life through detailed terminology and concepts.", cardCount: 89, lastStudied: "Reviewed 1 day ago", progress: 72, category: "Science", source: "Biological Sciences" },
  { id: 3, title: "Modern World History: 1939–1945", description: "Analyze key geopolitical events, critical dates, and influential figures of the Second World War.", cardCount: 156, lastStudied: "Not yet started", progress: 0, category: "History", source: "History Department" },
  { id: 4, title: "Advanced Calculus: Integration & Limits", description: "Master complex derivatives and integration techniques required for university-level mathematics.", cardCount: 78, lastStudied: "Reviewed 3 hours ago", progress: 91, category: "Math", source: "Mathematical Institute" },
  { id: 5, title: "Introduction to Cognitive Psychology", description: "A deep dive into memory models, perception theories, and human learning mechanisms.", cardCount: 94, lastStudied: "Reviewed 5 days ago", progress: 45, category: "Psychology", source: "Social Sciences" },
  { id: 6, title: "JavaScript Programming Fundamentals", description: "Learn modern ES6+ syntax, asynchronous patterns, and software engineering best practices.", cardCount: 112, lastStudied: "Reviewed 1 hour ago", progress: 88, category: "Programming", source: "Computer Science" },
];

const categories = ["Languages", "Science", "History", "Math", "Psychology", "Programming"];

const emptyDraft = { title: "", description: "", category: "Languages", cards: [{ front: "", back: "" }] as CardDraft[] };

export default function FlashcardsPage() {
  const [sets, setSets] = useState(initialSets);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);

  const q = query.trim().toLowerCase();
  const visible = sets.filter(
    (s) =>
      (activeCategory === "All" || s.category === activeCategory) &&
      (!q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
  );

  const updateCard = (idx: number, patch: Partial<CardDraft>) =>
    setDraft((d) => ({ ...d, cards: d.cards.map((c, i) => (i === idx ? { ...c, ...patch } : c)) }));

  const saveSet = () => {
    const filled = draft.cards.filter((c) => c.front.trim() || c.back.trim());
    const cardCount = filled.length || draft.cards.length;
    setSets([
      {
        id: Date.now(),
        title: draft.title.trim() || "Untitled set",
        description: draft.description.trim() || "No description provided.",
        cardCount,
        lastStudied: "Just created",
        progress: 0,
        category: draft.category,
        source: "Created by you",
      },
      ...sets,
    ]);
    if (posthogConfigured) {
      posthog.capture("flashcard_set_created", {
        category: draft.category,
        card_count: cardCount,
      });
    }
    setModalOpen(false);
    setDraft(emptyDraft);
  };

  const inputCls = "w-full border-b border-[#111] bg-transparent py-2 text-[16px] outline-none placeholder:text-[#8d8978]";

  return (
    <PageShell eyebrow="Flashcards — spaced repetition" title="Your decks.">
      {/* Category tabs + search + create */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-3">
        <div className="flex flex-wrap gap-x-6 gap-y-1" role="tablist">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={activeCategory === c}
              onClick={() => setActiveCategory(c)}
              className={`border-b-2 pb-2 text-[clamp(15px,1.15vw,19px)] font-bold transition-colors ${
                activeCategory === c ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex w-full items-center gap-5 sm:ml-auto sm:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your decks"
            aria-label="Search your decks"
            className="w-full border-b border-[#111] bg-transparent py-2 text-[clamp(14px,1.1vw,17px)] outline-none placeholder:text-[#8d8978] sm:w-[240px]"
          />
          <button onClick={() => setModalOpen(true)} className="h-10 shrink-0 bg-[#1c3bff] px-6 text-sm font-bold text-white hover:bg-[#1630d6]">
            Create a set +
          </button>
        </div>
      </div>

      {/* Decks */}
      <div className="mt-3 grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        {visible.map((s) => (
          <Link
            key={s.id}
            href={`/flashcards/study/${s.id}`}
            className="group grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-[#d9d4c4] py-[clamp(10px,1.6vh,18px)] transition-colors hover:bg-[#ece8da]"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{s.category}</p>
              <h3 className="mt-0.5 text-[clamp(19px,1.6vw,25px)] font-bold leading-[1.15] tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-0.5 text-[clamp(11px,0.85vw,13px)] text-[#4a4a44]">
                {s.cardCount} cards · {s.lastStudied} · {s.source}
              </p>
            </div>
            <span className="text-[clamp(24px,2vw,32px)] font-bold tracking-[-0.02em] text-[#1c3bff]">{s.progress}%</span>
            <div className="col-span-2 mt-2 h-[5px] bg-[#dedacb]">
              <div className="h-full bg-[#1c3bff]" style={{ width: `${s.progress}%` }} />
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="py-16">
          <p className="text-[clamp(22px,2vw,30px)] font-bold tracking-[-0.02em]">No decks here yet.</p>
          <p className="mt-1 text-[#4a4a44]">Nothing matches this filter. Make your own set and it will appear in this list.</p>
          <button onClick={() => setModalOpen(true)} className="mt-5 h-11 bg-[#111] px-7 text-sm font-bold text-white">
            Create a set +
          </button>
        </div>
      )}

      {/* Create modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111]/60" onClick={() => setModalOpen(false)} />
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col bg-[#f4f1e8] shadow-2xl">
            <div className="flex items-start justify-between border-t-[4px] border-[#1c3bff] px-8 pb-4 pt-6">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide text-[#1c3bff]">New set</p>
                <h2 className="text-[34px] font-bold leading-none tracking-[-0.03em]">Create a deck.</h2>
              </div>
              <button onClick={() => setModalOpen(false)} aria-label="Close" className="text-2xl leading-none text-[#4a4a44] hover:text-[#111]">
                ×
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-8 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-[#4a4a44]">Title</span>
                  <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Molecular Biochemistry" className={inputCls} />
                </label>
                <div>
                  <span className="text-[12px] font-bold uppercase tracking-wide text-[#4a4a44]">Category</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setDraft({ ...draft, category: c })}
                        className={`border px-3 py-1.5 text-[13px] font-bold ${
                          draft.category === c ? "border-[#1c3bff] bg-[#1c3bff] text-white" : "border-[#111] hover:bg-[#ece8da]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="text-[12px] font-bold uppercase tracking-wide text-[#4a4a44]">Description</span>
                <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} placeholder="What does this set cover?" className={`${inputCls} resize-none`} />
              </label>

              <div>
                <p className="border-b-2 border-[#111] pb-1.5 text-[12px] font-bold uppercase tracking-wide text-[#1c3bff]">Cards ({draft.cards.length})</p>
                {draft.cards.map((card, idx) => (
                  <div key={idx} className="grid grid-cols-[28px_1fr_1fr_28px] items-center gap-4 border-b border-[#d9d4c4] py-2">
                    <span className="text-[13px] font-bold text-[#4a4a44]">{idx + 1}</span>
                    <input value={card.front} onChange={(e) => updateCard(idx, { front: e.target.value })} placeholder="Front" className="bg-transparent py-1.5 text-[15px] font-bold outline-none placeholder:font-normal placeholder:text-[#8d8978]" />
                    <input value={card.back} onChange={(e) => updateCard(idx, { back: e.target.value })} placeholder="Back" className="bg-transparent py-1.5 text-[15px] outline-none placeholder:text-[#8d8978]" />
                    <button
                      onClick={() => setDraft((d) => ({ ...d, cards: d.cards.length > 1 ? d.cards.filter((_, i) => i !== idx) : d.cards }))}
                      aria-label="Remove card"
                      className="text-lg text-[#8d8978] hover:text-[#111]"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button onClick={() => setDraft((d) => ({ ...d, cards: [...d.cards, { front: "", back: "" }] }))} className="mt-3 text-sm font-bold text-[#1c3bff]">
                  + Add a card
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t border-[#111] px-8 py-4">
              <button onClick={() => setModalOpen(false)} className="px-4 text-sm font-bold text-[#4a4a44] hover:text-[#111]">
                Discard
              </button>
              <button onClick={saveSet} className="h-11 bg-[#111] px-8 text-sm font-bold text-white">
                Save deck →
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
