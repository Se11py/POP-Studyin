"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import posthog from "posthog-js";

const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

// Mock data for the study session
const studySet = {
  id: 1,
  title: "Spanish Vocabulary Specialization",
  category: "Languages",
  cards: [
    { id: 1, front: "El desayuno", back: "Breakfast", difficulty: "Easy" },
    { id: 2, front: "Desarrollar", back: "To develop", difficulty: "Medium" },
    { id: 3, front: "Imprescindible", back: "Essential / Indispensable", difficulty: "Hard" },
    { id: 4, front: "La madrugada", back: "Early morning / Dawn", difficulty: "Medium" },
    { id: 5, front: "Echar de menos", back: "To miss (someone/something)", difficulty: "Hard" },
    { id: 6, front: "La manzana", back: "Apple", difficulty: "Easy" },
  ],
};

export default function StudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const total = studySet.cards.length;
  const card = studySet.cards[currentIndex];
  const isLastCard = currentIndex === total - 1;

  const handleScore = (isCorrect: boolean) => {
    const correctCount = stats.correct + (isCorrect ? 1 : 0);
    const incorrectCount = stats.incorrect + (isCorrect ? 0 : 1);
    setStats({ correct: correctCount, incorrect: incorrectCount });
    if (isLastCard) {
      if (posthogConfigured) {
        posthog.capture("flashcard_study_completed", {
          category: studySet.category,
          card_count: total,
          correct_count: correctCount,
          incorrect_count: incorrectCount,
        });
      }
      setIsComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setStats({ correct: 0, incorrect: 0 });
    setIsComplete(false);
  };

  // Space flips the card
  useEffect(() => {
    if (isComplete) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isComplete]);

  const eyebrow = `Flashcards — ${studySet.title}`;

  if (isComplete) {
    const mastery = Math.round((stats.correct / total) * 100);
    return (
      <PageShell eyebrow={eyebrow} title="Deck done.">
        <div className="grid flex-1 content-center gap-x-12 gap-y-8 py-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wide text-[#1c3bff]">Mastery</p>
            <p className="text-[clamp(96px,14vw,220px)] font-bold leading-[0.85] tracking-[-0.06em] text-[#1c3bff]">{mastery}%</p>
          </div>
          <div>
            <div className="grid grid-cols-3 border-y border-[#111]">
              {[
                ["Reviewed", total],
                ["Mastered", stats.correct],
                ["To review", stats.incorrect],
              ].map(([label, value]) => (
                <div key={label} className="py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{label}</p>
                  <p className="text-[clamp(32px,3vw,48px)] font-bold leading-none tracking-[-0.03em]">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <button onClick={handleReset} className="h-11 bg-[#1c3bff] px-8 text-sm font-bold text-white hover:bg-[#1630d6]">
                Review again →
              </button>
              <Link href="/flashcards" className="flex h-11 items-center border border-[#111] px-8 text-sm font-bold hover:bg-[#ece8da]">
                Back to decks
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow={eyebrow} title="Study.">
      <div className="flex items-center justify-between gap-6 pt-3">
        <Link href="/flashcards" className="text-sm font-bold text-[#1c3bff]">← All decks</Link>
        <p className="text-[12px] font-bold uppercase tracking-wide text-[#4a4a44]">
          Card {currentIndex + 1} of {total} · {card.difficulty}
        </p>
      </div>
      <div className="mt-2 h-[5px] bg-[#dedacb]">
        <motion.div className="h-full bg-[#1c3bff]" animate={{ width: `${((currentIndex + 1) / total) * 100}%` }} />
      </div>

      <div className="relative mt-5 min-h-[260px] flex-1" style={{ perspective: "1400px" }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={currentIndex}
            type="button"
            onClick={() => setIsFlipped((f) => !f)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, rotateY: isFlipped ? 180 : 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
            transition={{ rotateY: { duration: 0.5, ease: "easeInOut" }, default: { duration: 0.3 } }}
            aria-label={isFlipped ? "Show the front" : "Reveal the answer"}
            className="absolute inset-0 block h-full w-full cursor-pointer text-left"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex flex-col justify-between border border-[#111] bg-[#fbf9f3] p-[clamp(20px,3vw,48px)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-[12px] font-bold uppercase tracking-wide text-[#1c3bff]">Term</p>
              <p className="text-[clamp(40px,6vw,104px)] font-bold leading-[1] tracking-[-0.04em]">{card.front}</p>
              <p className="border-t border-[#d9d4c4] pt-3 text-[12px] font-bold uppercase tracking-wide text-[#8d8978]">
                Click or press space to reveal
              </p>
            </div>
            <div
              className="absolute inset-0 flex flex-col justify-between bg-[#1c3bff] p-[clamp(20px,3vw,48px)] text-white"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <p className="text-[12px] font-bold uppercase tracking-wide text-white/70">Meaning</p>
              <p className="text-[clamp(36px,5vw,88px)] font-bold leading-[1.02] tracking-[-0.04em]">{card.back}</p>
              <p className="border-t border-white/25 pt-3 text-[12px] font-bold uppercase tracking-wide text-white/70">
                Now say how well you knew it
              </p>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-5 grid grid-cols-1 items-center gap-4 border-t border-[#111] pt-4 md:grid-cols-[1fr_auto]">
        <div className="flex gap-8">
          {[
            ["Mastered", stats.correct],
            ["To review", stats.incorrect],
            ["Remaining", total - currentIndex],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[clamp(24px,2.2vw,34px)] font-bold leading-none tracking-[-0.03em]">{value}</p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            disabled={!isFlipped}
            onClick={() => handleScore(false)}
            className="h-12 flex-1 border border-[#111] px-7 text-sm font-bold enabled:hover:bg-[#ece8da] disabled:border-[#d9d4c4] disabled:text-[#b8b3a2] md:flex-none"
          >
            Needs review ✕
          </button>
          <button
            disabled={!isFlipped}
            onClick={() => handleScore(true)}
            className="h-12 flex-1 bg-[#111] px-7 text-sm font-bold text-white enabled:hover:bg-[#1c3bff] disabled:bg-[#dedacb] disabled:text-[#b8b3a2] md:flex-none"
          >
            Got it ✓
          </button>
        </div>
      </div>
    </PageShell>
  );
}
