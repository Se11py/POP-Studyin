"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Crown, RotateCcw } from "lucide-react";
import { ArenaPlayer, seededRandom } from "../arena-data";
import { ArenaWordmark, Atmosphere, StreakBadge } from "./shared";

const CONFETTI_COLORS = ["#FFD700", "#FF2E4D", "#2E6BFF", "#FFC400", "#00E89B", "#F357A8", "#00C6FB"];

export default function PodiumScreen({
  players,
  userId,
  onPlayAgain,
}: {
  players: ArenaPlayer[];
  userId: string;
  onPlayAgain: () => void;
}) {
  const ranked = [...players].sort((a, b) => b.score - a.score);
  const [first, second, third] = ranked;
  const userRank = ranked.findIndex((p) => p.id === userId) + 1;

  const confetti = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => {
        const rand = seededRandom(i * 2654435761 + 97);
        return {
          id: i,
          left: rand() * 100,
          delay: rand() * 2.5,
          dur: 2.8 + rand() * 2.4,
          size: 5 + rand() * 8,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          drift: (rand() - 0.5) * 180,
          spin: 360 + rand() * 720,
          round: rand() > 0.6,
        };
      }),
    []
  );

  const podiumSlots: { player: ArenaPlayer; place: 1 | 2 | 3; height: string; color: string; glow: string }[] = [
    { player: second, place: 2, height: "h-32 sm:h-40", color: "#E0E0E0", glow: "rgba(224,224,224,0.35)" },
    { player: first, place: 1, height: "h-44 sm:h-56", color: "#FFD700", glow: "rgba(255,215,0,0.45)" },
    { player: third, place: 3, height: "h-24 sm:h-32", color: "#FF7F50", glow: "rgba(255,127,80,0.35)" },
  ];

  return (
    <div className="arena-root flex flex-col">
      <Atmosphere floor={false} />

      {/* confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="absolute top-0 block"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * (c.round ? 1 : 0.45),
              background: c.color,
              borderRadius: c.round ? "50%" : "1px",
              ["--drift" as string]: `${c.drift}px`,
              ["--spin" as string]: `${c.spin}deg`,
              animation: `arena-confetti ${c.dur}s linear ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-end px-5 pb-0 pt-10">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
          <ArenaWordmark />
          <h2 className="arena-display arena-title-glow mt-3 text-4xl sm:text-6xl uppercase">Champions</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-violet-300/50">
            You finished #{userRank} {userRank === 1 ? "— untouchable." : userRank <= 3 ? "— podium finish!" : "— run it back?"}
          </p>
        </motion.div>

        {/* podium */}
        <div className="mt-8 flex w-full max-w-2xl items-end justify-center gap-3 sm:gap-5">
          {podiumSlots.map(({ player, place, height, color, glow }, i) => (
            <div key={place} className="flex flex-1 max-w-44 flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.35, type: "spring", stiffness: 240, damping: 15 }}
                className="relative flex flex-col items-center"
              >
                {place === 1 && (
                  <Crown size={26} className="absolute -top-9 text-[#FFD700]" fill="#FFD700" style={{ filter: "drop-shadow(0 0 10px rgba(255,215,0,0.8))" }} />
                )}
                <div
                  className={`flex items-center justify-center rounded-2xl text-3xl sm:text-4xl ${place === 1 ? "h-18 w-18 sm:h-22 sm:w-22" : "h-14 w-14 sm:h-18 sm:w-18"}`}
                  style={{ background: player.avatar.bg, boxShadow: `0 0 32px ${glow}`, border: `2px solid ${color}` }}
                >
                  {player.avatar.emoji}
                </div>
                <div className="arena-display mt-2 max-w-full truncate text-sm sm:text-base font-semibold">{player.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-violet-200/60 tabular-nums">
                  {player.score.toLocaleString()} pts
                  <StreakBadge streak={player.streak} />
                </div>
              </motion.div>

              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.35, duration: 0.6, ease: [0.34, 1.3, 0.64, 1] }}
                className={`mt-3 w-full ${height} origin-bottom rounded-t-2xl relative overflow-hidden`}
                style={{
                  background: `linear-gradient(180deg, ${color}33, ${color}0a)`,
                  border: `1px solid ${color}66`,
                  borderBottom: "none",
                  boxShadow: `0 -12px 48px ${glow}, inset 0 1px 0 ${color}88`,
                }}
              >
                <span className="arena-display absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl" style={{ color, opacity: 0.85 }}>
                  {place}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* play again */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="arena-display mb-8 mt-10 flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#7B2FF2] to-[#00C6FB] px-10 py-4 text-sm uppercase tracking-[0.2em] text-white shadow-[0_12px_40px_rgba(123,47,242,0.45)] cursor-pointer"
        >
          <RotateCcw size={16} />
          Play Again
        </motion.button>
      </main>
    </div>
  );
}
