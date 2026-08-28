"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Radio, Users } from "lucide-react";
import { AvatarTile, Stage, TokenLegend, Wordmark } from "./chrome";
import { Contender, makeBots } from "../engine";

const BOT_TARGET = 9;
const JOIN_EVERY = 750;

export default function LobbyScreen({
  pin,
  deckTitle,
  deckSubject,
  hostMode,
  user,
  onStart,
}: {
  pin: string;
  deckTitle: string;
  deckSubject: string;
  hostMode: boolean;
  user: Contender;
  onStart: (roster: Contender[]) => void;
}) {
  const bots = useMemo(() => makeBots(BOT_TARGET, Number(pin) || 7), [pin]);
  const [joined, setJoined] = useState<Contender[]>([user]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i >= bots.length) return clearInterval(iv);
      const next = bots[i++];
      setJoined((prev) => [...prev, next]);
    }, JOIN_EVERY);
    return () => clearInterval(iv);
  }, [bots]);

  function begin() {
    if (started.current) return;
    started.current = true;
    setCountdown(3);
  }

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      const t = setTimeout(() => onStart(joined), 550);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 750);
    return () => clearTimeout(t);
  }, [countdown, joined, onStart]);

  const readyToStart = joined.length >= 3;

  return (
    <Stage
      rail={`ROOM ${pin} · ${deckSubject.toUpperCase()}`}
      ticker={joined
        .slice(-8)
        .reverse()
        .map((p) => `${p.name.toUpperCase()} JOINED THE ROOM`)}
    >
      <header className="flex items-center justify-between border-b-2 border-[var(--a2-bone)] px-5 py-3 sm:px-8">
        <Wordmark />
        <span className="a2-label flex items-center gap-2 text-[var(--a2-bone-dim)]">
          <Radio size={13} className="text-[var(--a2-crimson)]" />
          {hostMode ? "Projector view" : "Player view"}
        </span>
      </header>

      <main className="grid flex-1 grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-12">
        {/* ---------------------------------- PIN ---------------------------------- */}
        <div className="flex flex-col">
          <span className="a2-label text-[var(--a2-crimson)]">Game PIN</span>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
            className="a2-panel mt-3 flex items-stretch gap-px overflow-hidden bg-[var(--a2-bone)] p-0"
          >
            {pin.split("").map((d, i) => (
              <motion.span
                key={i}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
                className="a2-mono flex-1 bg-[var(--a2-ink)] py-6 text-center text-[clamp(2rem,7vw,3.4rem)] font-bold leading-none"
              >
                {d}
              </motion.span>
            ))}
          </motion.div>

          <p className="mt-4 text-sm text-[var(--a2-bone-dim)]">
            Open <span className="text-[var(--a2-bone)]">POP Arena</span> on any
            phone, punch in the PIN, pick a token. No app install.
          </p>

          <div className="a2-panel mt-6 p-4">
            <span className="a2-label text-[var(--a2-bone-dim)]">Now playing</span>
            <div className="a2-display mt-2 text-3xl leading-none">{deckTitle}</div>
            <div className="a2-mono mt-2 text-[11px] text-[var(--a2-bone-dim)]">
              {deckSubject}
            </div>
            <div className="mt-4 border-t border-[var(--a2-bone-faint)] pt-4">
              <TokenLegend />
            </div>
          </div>

          <button
            onClick={begin}
            disabled={!readyToStart || countdown !== null}
            className="a2-press a2-display mt-6 w-full cursor-pointer bg-[var(--a2-crimson)] px-4 py-4 text-3xl text-[var(--a2-bone)] disabled:cursor-not-allowed"
          >
            {countdown !== null
              ? "Going live"
              : readyToStart
                ? hostMode
                  ? "Start the match"
                  : "Tell host: ready"
                : "Waiting for players"}
          </button>
        </div>

        {/* -------------------------------- roster -------------------------------- */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-end justify-between">
            <span className="a2-label flex items-center gap-2 text-[var(--a2-bone-dim)]">
              <Users size={13} /> In the room
            </span>
            <span className="a2-display text-5xl leading-none">
              {joined.length}
              <span className="a2-mono ml-2 text-xs text-[var(--a2-bone-dim)]">
                / {BOT_TARGET + 1}
              </span>
            </span>
          </div>

          <div className="mt-3 h-1 w-full bg-[var(--a2-bone-faint)]">
            <motion.div
              className="h-full bg-[var(--a2-mint)]"
              animate={{ width: `${(joined.length / (BOT_TARGET + 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <AnimatePresence>
              {joined.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex items-center gap-2.5 border-2 px-2.5 py-2"
                  style={{
                    borderColor: p.isBot ? "var(--a2-bone-faint)" : "var(--a2-mint)",
                    background: p.isBot ? "transparent" : "rgba(0,232,155,0.08)",
                  }}
                >
                  <AvatarTile avatar={p.avatar} size={34} border={false} />
                  <span className="min-w-0">
                    <span className="a2-display block truncate text-lg leading-none">
                      {p.name}
                    </span>
                    {!p.isBot && (
                      <span className="a2-label text-[var(--a2-mint)]">You</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ------------------------------- countdown ------------------------------- */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 grid place-items-center bg-[rgba(10,10,11,0.92)]"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="a2-display text-[28vw] leading-none text-[var(--a2-bone)] sm:text-[16rem]"
            >
              {countdown === 0 ? "GO" : countdown}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}
