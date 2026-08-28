"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ArenaPlayer } from "../arena-data";
import { ArenaWordmark, Atmosphere, StreakBadge } from "./shared";

const HOLD_TIME = 4600;

export default function LeaderboardScreen({
  players,
  userId,
  questionIndex,
  totalQuestions,
  onNext,
}: {
  players: ArenaPlayer[];
  userId: string;
  questionIndex: number;
  totalQuestions: number;
  onNext: () => void;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const t = setTimeout(onNext, HOLD_TIME);
    return () => clearTimeout(t);
  }, [onNext]);

  const ranked = [...players].sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 5);
  const userRank = ranked.findIndex((p) => p.id === userId) + 1;

  return (
    <div className="arena-root flex flex-col">
      <Atmosphere floor={false} />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full max-w-xl flex-col items-center"
        >
          <ArenaWordmark />
          <div className="mt-4 flex items-center gap-2.5">
            <Trophy size={22} className="text-[#FFD700]" />
            <h2 className="arena-display text-3xl sm:text-4xl uppercase">Leaderboard</h2>
          </div>

          {/* progress dots */}
          <div className="mt-4 flex gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= questionIndex ? "w-6 bg-[#00C6FB] shadow-[0_0_8px_#00C6FB]" : "w-3 bg-violet-300/20"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 w-full space-y-2.5">
            {top.map((p, i) => {
              const isUser = p.id === userId;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 * i, type: "spring", stiffness: 220, damping: 22 }}
                  className={`arena-panel flex items-center gap-4 rounded-2xl px-4 py-3.5 ${
                    isUser ? "border-[#00E89B]/60 shadow-[0_0_28px_rgba(0,232,155,0.15)]" : ""
                  }`}
                >
                  <span className={`arena-display w-8 text-center text-xl tabular-nums ${i === 0 ? "text-[#FFD700]" : i === 1 ? "text-[#E0E0E0]" : i === 2 ? "text-[#FF7F50]" : "text-violet-300/50"}`}>
                    {i + 1}
                  </span>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: p.avatar.bg }}>
                    {p.avatar.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="arena-display truncate text-base font-semibold">{p.name}</span>
                      {isUser && <span className="rounded bg-[#00E89B]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#00E89B]">You</span>}
                      <StreakBadge streak={p.streak} />
                    </div>
                  </div>
                  {p.lastDelta > 0 && (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + 0.12 * i }}
                      className="text-xs font-bold text-[#00E89B] tabular-nums"
                    >
                      +{p.lastDelta.toLocaleString()}
                    </motion.span>
                  )}
                  <span className="arena-display w-20 text-right text-lg tabular-nums text-white">
                    {p.score.toLocaleString()}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {userRank > 5 && (
            <p className="mt-4 text-xs text-violet-300/50">
              You&apos;re #{userRank} — one hot streak away from the board.
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
