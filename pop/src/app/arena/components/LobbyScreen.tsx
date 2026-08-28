"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Users } from "lucide-react";
import { ARENA_AVATARS, ArenaPlayer, BOT_NAMES } from "../arena-data";
import { ArenaWordmark, Atmosphere } from "./shared";

const BOT_COUNT = 7;

export default function LobbyScreen({
  pin,
  deckTitle,
  hostMode,
  userPlayer,
  onStart,
}: {
  pin: string;
  deckTitle: string;
  hostMode: boolean;
  userPlayer: ArenaPlayer;
  onStart: (players: ArenaPlayer[]) => void;
}) {
  const [players, setPlayers] = useState<ArenaPlayer[]>([userPlayer]);
  const botIdx = useRef(0);

  useEffect(() => {
    const shuffledNames = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    const shuffledAvatars = ARENA_AVATARS.map((_, i) => i).sort(() => Math.random() - 0.5);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < BOT_COUNT; i++) {
      timers.push(
        setTimeout(() => {
          const idx = botIdx.current++;
          setPlayers((prev) => [
            ...prev,
            {
              id: `bot-${idx}`,
              name: shuffledNames[idx % shuffledNames.length],
              avatar: ARENA_AVATARS[shuffledAvatars[idx % shuffledAvatars.length]],
              isBot: true,
              score: 0,
              streak: 0,
              lastDelta: 0,
              lastCorrect: null,
            },
          ]);
        }, 700 + i * 620)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="arena-root flex flex-col">
      <Atmosphere />

      <main className="relative z-10 flex flex-1 flex-col items-center px-5 py-8">
        <ArenaWordmark />
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-violet-300/50">{deckTitle}</p>

        {/* PIN display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-violet-200/60">
            Join at <span className="text-[#00C6FB] font-semibold">pop.study/arena</span> with PIN
          </p>
          <div className="arena-display arena-pin-glow mt-2 text-7xl sm:text-8xl tracking-[0.18em] text-white tabular-nums">
            {pin.split("").map((d, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="inline-block"
              >
                {d}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* player grid */}
        <div className="mt-8 flex w-full max-w-3xl flex-1 flex-col">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-violet-300/60">
            <Users size={14} />
            {players.length} {players.length === 1 ? "player" : "players"} in the lounge
          </div>

          <div className="mt-5 flex flex-wrap items-start justify-center gap-3">
            <AnimatePresence>
              {players.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0, rotate: -14, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 17 }}
                  className="flex flex-col items-center gap-1.5 w-20"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${p.isBot ? "" : "arena-lockpulse ring-2 ring-[#00E89B]"}`}
                    style={{ background: p.avatar.bg, animation: `arena-floaty ${5 + (p.id.length % 3)}s ease-in-out infinite` }}
                  >
                    {p.avatar.emoji}
                  </div>
                  <span className="max-w-full truncate text-[11px] font-medium text-violet-100/80">{p.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* start */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStart(players)}
          className="arena-display mt-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#7B2FF2] via-[#F357A8] to-[#00C6FB] px-12 py-4.5 text-lg uppercase tracking-[0.2em] text-white shadow-[0_12px_48px_rgba(243,87,168,0.4)] cursor-pointer"
        >
          <Play size={20} fill="currentColor" />
          {hostMode ? "Start Match" : "Start Demo Match"}
        </motion.button>
        <p className="mt-3 text-[11px] text-violet-300/40">
          {hostMode ? "Waiting players can keep joining — the roster locks at start." : "MVP demo: 7 simulated classmates will join you."}
        </p>
      </main>
    </div>
  );
}
