"use client";

import React, { useEffect, useState } from "react";
import type { Flashcard } from "../lessonContent";

export default function FlashcardsTab({ deckTitle, cards }: { deckTitle: string; cards: Flashcard[] }) {
  const [deck, setDeck] = useState(cards);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = deck[index];

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    setIsFlipped(false);
  };

  const next = () => goTo(index < deck.length - 1 ? index + 1 : 0);
  const prev = () => goTo(index > 0 ? index - 1 : deck.length - 1);
  const shuffle = () => {
    setDeck([...deck].sort(() => Math.random() - 0.5));
    goTo(0);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!current) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Deck Progress Header */}
      <div className="flex justify-between items-center mb-4 text-xs">
        <div>
          <span className="font-bold text-blue-900 uppercase tracking-wider">{deckTitle}</span>
        </div>
        <div className="font-mono font-bold text-blue-700">
          Card {index + 1} of {deck.length}
        </div>
      </div>

      <div className="w-full bg-gray-200 h-1.5 mb-6 rounded-full overflow-hidden">
        <div className="bg-blue-700 h-1.5 transition-all duration-300" style={{ width: `${((index + 1) / deck.length) * 100}%` }} />
      </div>

      {/* Flip Card */}
      <div className="perspective-1000 w-full min-h-[260px] cursor-pointer" onClick={() => setIsFlipped((f) => !f)}>
        <div
          className={`relative w-full h-64 border-2 border-blue-900 rounded-xl bg-white shadow-sm transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 rounded-[10px] backface-hidden p-8 flex flex-col justify-between bg-white">
            <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-200 pb-2 font-mono">
              <span className="bg-blue-900 text-white px-2 py-0.5 text-[10px] font-bold">FRONT: CONCEPT / TERM</span>
              <span>Click to flip &#8631;</span>
            </div>
            <div className="text-center py-4">
              <h3 className="text-xl sm:text-2xl font-black text-blue-900 tracking-tight">{current.front}</h3>
              <p className="text-xs text-gray-500 mt-2">{current.prompt}</p>
            </div>
            <div className="text-[11px] text-center text-gray-500 font-mono">[Press SPACE or click card to flip]</div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 rounded-[10px] backface-hidden rotate-y-180 p-8 flex flex-col justify-between bg-emerald-50 border-2 border-emerald-600">
            <div className="flex justify-between items-center text-xs text-emerald-800 border-b border-emerald-300 pb-2 font-mono">
              <span className="bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold">BACK: ANSWER</span>
              <span>Click to flip back &#8630;</span>
            </div>
            <div className="text-center py-2 text-emerald-800">
              <div className="text-sm sm:text-base font-bold leading-relaxed">{current.back}</div>
            </div>
            <div className="text-[11px] text-center text-emerald-800 font-mono">Official CAIE Syllabus Wording</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6 gap-3">
        <button onClick={prev} className="border border-gray-200 bg-white hover:bg-gray-100 text-gray-900 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider">
          &larr; Previous
        </button>
        <button onClick={next} className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-shadow">
          Next &rarr;
        </button>
      </div>

      <div className="text-center mt-4">
        <button onClick={shuffle} className="text-xs text-gray-500 underline hover:text-blue-700">
          Shuffle Deck &amp; Reset
        </button>
      </div>
    </div>
  );
}
