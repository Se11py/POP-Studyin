"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AvatarTile, Stage, StreakChip, Wordmark } from "./chrome";
import { Contender, rank } from "../engine";

const AUTO_ADVANCE_MS = 6000;

export default function StandingsScreen({
  players,
  userId,
  questionIndex,
  totalQuestions,
  onNext,
}: {
  players: Contender[];
  userId: string;
  questionIndex: number;
  totalQuestions: number;
  onNext: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const board = rank(players);
  const top = board.slice(0, 5);
  const best = Math.max(1, board[0]?.score ?? 1);
  const myIndex = board.findIndex((p) => p.id === userId);
  const me = board[myIndex];
  const last = questionIndex + 1 >= totalQuestions;

  useEffect(() => {
    const started = Date.now();
    const iv = setInterval(() => {
      const pct = Math.min(1, (Date.now() - started) / AUTO_ADVANCE_MS);
      setProgress(pct);
      if (pct >= 1) {
        clearInterval(iv);
        onNext();
      }
    }, 80);
    return () => clearInterval(iv);
  }, [onNext]);

  return (
    <Stage
      rail={`STANDINGS AFTER Q${questionIndex + 1}`}
      ticker={board
        .slice(0, 8)
        .map((p, i) => `#${i + 1} ${p.name.toUpperCase()} ${p.score.toLocaleString()}`)}
    >
      <header className="flex items-center justify-between border-b-2 border-[var(--a2-bone)] px-5 py-3 sm:px-8">
        <Wordmark />
        <span className="a2-label text-[var(--a2-bone-dim)]">
          After Q{questionIndex + 1} / {totalQuestions}
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-8 sm:px-8">
        <div className="flex items-end justify-between">
          <h2 className="a2-display text-[clamp(2.4rem,7vw,4.5rem)]">
            Standings
          </h2>
          <span className="a2-mono text-[11px] text-[var(--a2-bone-dim)]">
            YOU · #{myIndex + 1} OF {board.length}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {top.map((p, i) => {
            const mine = p.id === userId;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                className="relative flex items-center gap-3 overflow-hidden border-2 px-3 py-2.5"
                style={{
                  borderColor: mine ? "var(--a2-mint)" : "var(--a2-bone)",
                  boxShadow: "5px 5px 0 #000",
                  background: "var(--a2-ink-2)",
                }}
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.score / best) * 100}%` }}
                  transition={{ delay: 0.15 + 0.08 * i, duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: mine
                      ? "rgba(0,232,155,0.16)"
                      : "rgba(243,236,224,0.07)",
                  }}
                />
                <span className="a2-display relative w-8 shrink-0 text-3xl leading-none text-[var(--a2-bone-dim)]">
                  {i + 1}
                </span>
                <AvatarTile avatar={p.avatar} size={36} />
                <span className="a2-display relative min-w-0 flex-1 truncate text-2xl leading-none">
                  {p.name}
                  {mine && (
                    <span className="a2-label ml-2 text-[var(--a2-mint)]">You</span>
                  )}
                </span>
                <StreakChip streak={p.streak} />
                {p.lastDelta > 0 && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + 0.08 * i }}
                    className="a2-mono relative shrink-0 text-[11px] text-[var(--a2-mint)]"
                  >
                    +{p.lastDelta}
                  </motion.span>
                )}
                <span className="a2-mono relative w-16 shrink-0 text-right text-sm font-bold">
                  {p.score.toLocaleString()}
                </span>
              </motion.div>
            );
          })}
        </div>

        {myIndex > 4 && me && (
          <div className="mt-3 flex items-center gap-3 border-2 border-dashed border-[var(--a2-mint)] px-3 py-2.5">
            <span className="a2-display w-8 shrink-0 text-2xl leading-none text-[var(--a2-bone-dim)]">
              {myIndex + 1}
            </span>
            <AvatarTile avatar={me.avatar} size={32} />
            <span className="a2-display min-w-0 flex-1 truncate text-xl leading-none">
              {me.name}
              <span className="a2-label ml-2 text-[var(--a2-mint)]">You</span>
            </span>
            <span className="a2-mono shrink-0 text-sm font-bold">
              {me.score.toLocaleString()}
            </span>
          </div>
        )}

        <button
          onClick={onNext}
          className="a2-press a2-display mt-8 flex cursor-pointer items-center justify-center gap-3 bg-[var(--a2-bone)] px-5 py-3.5 text-3xl text-[var(--a2-ink)]"
        >
          {last ? "To the podium" : "Next question"}
          <ArrowRight size={22} />
        </button>

        <div className="mt-3 h-1 w-full bg-[var(--a2-bone-faint)]">
          <div
            className="h-full bg-[var(--a2-crimson)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </main>
    </Stage>
  );
}
