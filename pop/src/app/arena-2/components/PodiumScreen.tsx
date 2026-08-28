"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Coins, RotateCcw, Trophy } from "lucide-react";
import { seededRandom } from "../../arena/arena-data";
import { AvatarTile, Stage, StreakChip, Wordmark } from "./chrome";
import { Contender, rank } from "../engine";

const MEDALS = [
  { place: 1, color: "#FFD700", label: "Champion", height: 210 },
  { place: 2, color: "#E0E0E0", label: "Runner-up", height: 155 },
  { place: 3, color: "#FF7F50", label: "Third", height: 120 },
];

export default function PodiumScreen({
  players,
  userId,
  deckTitle,
  onPlayAgain,
}: {
  players: Contender[];
  userId: string;
  deckTitle: string;
  onPlayAgain: () => void;
}) {
  const board = rank(players);
  const [first, second, third] = board;
  const myIndex = board.findIndex((p) => p.id === userId);
  const me = board[myIndex];

  const confetti = useMemo(() => {
    const rand = seededRandom(4242);
    const colors = ["#FFD700", "#FF2E4D", "#00E89B", "#2E6BFF", "#F3ECE0"];
    return Array.from({ length: 70 }, () => ({
      left: `${rand() * 100}%`,
      delay: `${rand() * 3.2}s`,
      dur: `${2.6 + rand() * 2.4}s`,
      drift: `${(rand() - 0.5) * 260}px`,
      spin: `${600 + rand() * 900}deg`,
      color: colors[Math.floor(rand() * colors.length)],
      w: 5 + Math.round(rand() * 6),
      h: 9 + Math.round(rand() * 10),
    }));
  }, []);

  // stage order: silver, gold, bronze
  const order = [second, first, third].filter(Boolean);

  return (
    <Stage
      rail={`FULL TIME · ${deckTitle.toUpperCase()}`}
      ticker={board.map(
        (p, i) => `#${i + 1} ${p.name.toUpperCase()} ${p.score.toLocaleString()} PTS`
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute top-0"
            style={{
              left: c.left,
              width: c.w,
              height: c.h,
              background: c.color,
              animation: `a2-confetti ${c.dur} linear ${c.delay} infinite`,
              ["--drift" as string]: c.drift,
              ["--spin" as string]: c.spin,
            }}
          />
        ))}
      </div>

      <header className="relative z-30 flex items-center justify-between border-b-2 border-[var(--a2-bone)] px-5 py-3 sm:px-8">
        <Wordmark live={false} />
        <span className="a2-label text-[var(--a2-bone-dim)]">Full time</span>
      </header>

      <main className="relative z-30 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
          className="a2-display flex items-center gap-4 text-[clamp(2.6rem,9vw,6rem)]"
        >
          <Trophy size={44} className="text-[var(--a2-gold)]" />
          {first?.name}
        </motion.h2>
        <span className="a2-label mt-2 text-[var(--a2-bone-dim)]">
          takes the {deckTitle} crown
        </span>

        {/* podium blocks */}
        <div className="mt-10 flex w-full items-end justify-center gap-3 sm:gap-6">
          {order.map((p) => {
            const idx = board.findIndex((b) => b.id === p.id);
            const medal = MEDALS[idx] ?? MEDALS[2];
            const mine = p.id === userId;
            return (
              <div key={p.id} className="flex w-full max-w-[190px] flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.12 }}
                  className="flex flex-col items-center"
                >
                  <AvatarTile avatar={p.avatar} size={idx === 0 ? 66 : 52} />
                  <span className="a2-display mt-2 max-w-full truncate text-2xl leading-none">
                    {p.name}
                  </span>
                  <span className="a2-mono mt-1 text-[11px] text-[var(--a2-bone-dim)]">
                    {p.score.toLocaleString()} PTS
                  </span>
                  {mine && (
                    <span className="a2-label mt-1 text-[var(--a2-mint)]">You</span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    delay: 0.15 + idx * 0.14,
                    duration: 0.5,
                    ease: [0.2, 0.9, 0.2, 1],
                  }}
                  style={{
                    height: medal.height,
                    background: medal.color,
                    transformOrigin: "bottom",
                    boxShadow: "6px 6px 0 #000",
                  }}
                  className="mt-3 grid w-full place-items-center border-2 border-[var(--a2-bone)]"
                >
                  <span
                    className="a2-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none"
                    style={{ color: "var(--a2-ink)" }}
                  >
                    {medal.place}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* your card */}
        {me && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="a2-panel mt-10 flex w-full max-w-xl flex-wrap items-center gap-4 p-4"
          >
            <AvatarTile avatar={me.avatar} size={44} />
            <div className="min-w-0 flex-1">
              <div className="a2-display text-2xl leading-none">
                {me.name}
                <span className="a2-mono ml-2 text-[11px] text-[var(--a2-bone-dim)]">
                  FINISHED #{myIndex + 1}
                </span>
              </div>
              <div className="a2-mono mt-1.5 flex items-center gap-3 text-[11px] text-[var(--a2-bone-dim)]">
                <span>{me.score.toLocaleString()} PTS</span>
                <span className="flex items-center gap-1 text-[var(--a2-gold)]">
                  <Coins size={12} /> {me.coins}
                </span>
                <StreakChip streak={me.streak} />
              </div>
            </div>
            <button
              onClick={onPlayAgain}
              className="a2-press a2-display flex cursor-pointer items-center gap-2 bg-[var(--a2-bone)] px-4 py-2.5 text-2xl text-[var(--a2-ink)]"
            >
              <RotateCcw size={18} /> Rematch
            </button>
          </motion.div>
        )}
      </main>
    </Stage>
  );
}
