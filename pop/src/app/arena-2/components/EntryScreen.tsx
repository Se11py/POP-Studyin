"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Delete,
  Gamepad2,
  MonitorPlay,
  Sigma,
  Zap,
} from "lucide-react";
import { ARENA_AVATARS, ARENA_DECKS, generatePin } from "../../arena/arena-data";
import { AvatarTile, Stage, TokenLegend, Wordmark } from "./chrome";

export type Arena2Entry = {
  mode: "join" | "host";
  deckId: string;
  pin: string;
  name: string;
  avatarIdx: number;
};

type Step = "mode" | "pin" | "deck" | "identity";

const DECK_ICON: Record<string, React.ReactNode> = {
  zap: <Zap size={20} />,
  sigma: <Sigma size={20} />,
  atom: <Atom size={20} />,
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "del"];

const swap = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] as const },
};

export default function EntryScreen({
  onEnter,
}: {
  onEnter: (entry: Arena2Entry) => void;
}) {
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<"join" | "host">("join");
  const [pin, setPin] = useState("");
  const [deckId, setDeckId] = useState(ARENA_DECKS[0].id);
  const [name, setName] = useState("");
  const [avatarIdx, setAvatarIdx] = useState(0);

  const pinReady = pin.length === 6;
  const nameReady = name.trim().length >= 2;

  function press(key: string) {
    if (key === "del") return setPin((p) => p.slice(0, -1));
    if (key === "clear") return setPin("");
    setPin((p) => (p.length < 6 ? p + key : p));
  }

  function finish() {
    onEnter({
      mode,
      deckId,
      pin: mode === "host" ? generatePin() : pin,
      name: name.trim(),
      avatarIdx,
    });
  }

  return (
    <Stage
      ticker={[
        "IGCSE PHYSICS 0625 · FORCES & MOTION",
        "4 TOKENS · 4 SHAPES · ZERO MERCY",
        "IGCSE MATHS 0580 · ALGEBRA SPRINT",
        "HOST FROM ANY POP STUDYING DECK",
        "A-LEVEL CHEMISTRY 9701 · BONDING",
      ]}
    >
      <header className="flex items-center justify-between border-b-2 border-[var(--a2-bone)] px-5 py-3 sm:px-8">
        <Wordmark />
        <span className="a2-label hidden text-[var(--a2-bone-dim)] sm:block">
          Broadcast&nbsp;v2 / Season&nbsp;01
        </span>
      </header>

      <main className="grid flex-1 grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_minmax(0,460px)] lg:gap-14">
        {/* ------------------------------- marquee side ------------------------------- */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="a2-label text-[var(--a2-crimson)]">
              Tonight&apos;s fixture
            </span>
            <h1 className="a2-display mt-4 text-[clamp(3.6rem,13vw,9.5rem)]">
              <span className="block">Enter</span>
              <span className="a2-outline block">The</span>
              <span className="relative inline-block">
                Arena
                <span className="absolute -right-3 -top-2 h-[0.14em] w-[0.5em] bg-[var(--a2-crimson)] sm:-right-6" />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-[var(--a2-bone-dim)]"
          >
            Live multiplayer revision battles, built into POP Studying. One PIN,
            one classroom, four high-contrast tokens — scored on speed and
            streaks.
          </motion.p>

          <div className="mt-8">
            <TokenLegend />
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -7, scale: 1 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 220, damping: 14 }}
            className="a2-sticker a2-label absolute -top-4 right-2 hidden bg-[var(--a2-gold)] px-3 py-2 text-[var(--a2-ink)] lg:block"
          >
            Bangkok&nbsp;·&nbsp;Live
          </motion.div>
        </div>

        {/* --------------------------------- console --------------------------------- */}
        <div className="a2-panel relative w-full overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 a2-hazard opacity-70" />

          <AnimatePresence mode="wait">
            {step === "mode" && (
              <motion.div key="mode" {...swap} className="pt-3">
                <StepHead index="01" title="Pick your seat" />
                <div className="mt-5 grid gap-3">
                  <BigChoice
                    icon={<Gamepad2 size={22} />}
                    label="Join a game"
                    hint="You have a 6-digit PIN from the front of the room."
                    accent="var(--a2-mint)"
                    onClick={() => {
                      setMode("join");
                      setStep("pin");
                    }}
                  />
                  <BigChoice
                    icon={<MonitorPlay size={22} />}
                    label="Host a game"
                    hint="Put a POP deck on the projector and run the room."
                    accent="var(--a2-cobalt)"
                    onClick={() => {
                      setMode("host");
                      setStep("deck");
                    }}
                  />
                </div>
              </motion.div>
            )}

            {step === "pin" && (
              <motion.div key="pin" {...swap} className="pt-3">
                <StepHead index="02" title="Game PIN" />

                <div className="mt-5 flex justify-between gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const char = pin[i];
                    const active = pin.length === i;
                    return (
                      <div
                        key={i}
                        className="a2-mono grid h-14 flex-1 place-items-center border-2 text-xl font-bold"
                        style={{
                          borderColor: char
                            ? "var(--a2-bone)"
                            : active
                              ? "var(--a2-mint)"
                              : "var(--a2-bone-faint)",
                          background: char ? "var(--a2-bone)" : "transparent",
                          color: char ? "var(--a2-ink)" : "var(--a2-bone-dim)",
                        }}
                      >
                        {char ?? (active ? "_" : "")}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => press(key)}
                      className="a2-press a2-mono h-12 cursor-pointer bg-[var(--a2-ink-3)] text-base font-bold text-[var(--a2-bone)] hover:bg-[var(--a2-bone)] hover:text-[var(--a2-ink)]"
                    >
                      {key === "del" ? (
                        <Delete size={16} className="mx-auto" />
                      ) : key === "clear" ? (
                        <span className="text-[10px] tracking-widest">CLR</span>
                      ) : (
                        key
                      )}
                    </button>
                  ))}
                </div>

                <Nav
                  onBack={() => setStep("mode")}
                  onNext={() => setStep("identity")}
                  nextLabel="Lock in"
                  nextDisabled={!pinReady}
                />
              </motion.div>
            )}

            {step === "deck" && (
              <motion.div key="deck" {...swap} className="pt-3">
                <StepHead index="02" title="Choose the deck" />

                <div className="mt-5 grid gap-3">
                  {ARENA_DECKS.map((deck) => {
                    const on = deck.id === deckId;
                    return (
                      <button
                        key={deck.id}
                        onClick={() => setDeckId(deck.id)}
                        className="a2-ticket flex cursor-pointer items-center gap-3 border-2 px-4 py-3 text-left transition-colors"
                        style={{
                          borderColor: on ? "var(--a2-bone)" : "var(--a2-bone-faint)",
                          background: on ? "var(--a2-ink-3)" : "transparent",
                        }}
                      >
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center"
                          style={{
                            background: on ? "var(--a2-gold)" : "var(--a2-ink-3)",
                            color: on ? "var(--a2-ink)" : "var(--a2-bone-dim)",
                          }}
                        >
                          {DECK_ICON[deck.icon]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="a2-display block text-xl leading-none">
                            {deck.title}
                          </span>
                          <span className="a2-label mt-1 block text-[var(--a2-bone-dim)]">
                            {deck.subject} · {deck.level}
                          </span>
                        </span>
                        <span className="a2-mono text-[11px] text-[var(--a2-bone-dim)]">
                          {deck.questions.length}Q
                        </span>
                      </button>
                    );
                  })}
                </div>

                <Nav
                  onBack={() => setStep("mode")}
                  onNext={() => setStep("identity")}
                  nextLabel="Continue"
                />
              </motion.div>
            )}

            {step === "identity" && (
              <motion.div key="identity" {...swap} className="pt-3">
                <StepHead index="03" title="Your player card" />

                <div className="mt-5 flex items-center gap-3 border-2 border-[var(--a2-bone-faint)] p-3">
                  <AvatarTile avatar={ARENA_AVATARS[avatarIdx]} size={56} />
                  <div className="min-w-0 flex-1">
                    <label className="a2-label block text-[var(--a2-bone-dim)]">
                      Nickname
                    </label>
                    <input
                      value={name}
                      autoFocus
                      maxLength={14}
                      placeholder="e.g. NAMTAN"
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && nameReady) finish();
                      }}
                      className="a2-display mt-1 w-full bg-transparent text-3xl uppercase text-[var(--a2-bone)] placeholder:text-[var(--a2-bone-faint)]"
                    />
                  </div>
                </div>

                <span className="a2-label mt-5 block text-[var(--a2-bone-dim)]">
                  Pick an avatar
                </span>
                <div className="mt-2 grid grid-cols-6 gap-2">
                  {ARENA_AVATARS.map((a, i) => (
                    <button
                      key={a.emoji}
                      onClick={() => setAvatarIdx(i)}
                      aria-label={`Avatar ${a.emoji}`}
                      className="cursor-pointer transition-transform"
                      style={{
                        transform: i === avatarIdx ? "translateY(-3px)" : "none",
                        outline:
                          i === avatarIdx ? "2px solid var(--a2-crimson)" : "none",
                        outlineOffset: 2,
                      }}
                    >
                      <AvatarTile avatar={a} size={38} border={false} />
                    </button>
                  ))}
                </div>

                <div className="a2-mono mt-5 flex items-center justify-between border-t border-[var(--a2-bone-faint)] pt-3 text-[11px] text-[var(--a2-bone-dim)]">
                  <span>{mode === "host" ? "HOSTING" : `PIN ${pin}`}</span>
                  <span>
                    {mode === "host"
                      ? ARENA_DECKS.find((d) => d.id === deckId)?.title.toUpperCase()
                      : "JOINING"}
                  </span>
                </div>

                <Nav
                  onBack={() => setStep(mode === "host" ? "deck" : "pin")}
                  onNext={finish}
                  nextLabel={mode === "host" ? "Open the lobby" : "Enter arena"}
                  nextDisabled={!nameReady}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </Stage>
  );
}

function StepHead({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="a2-mono text-[11px] font-bold text-[var(--a2-crimson)]">
        {index}
      </span>
      <h2 className="a2-display text-3xl">{title}</h2>
    </div>
  );
}

function BigChoice({
  icon,
  label,
  hint,
  accent,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="a2-press group flex cursor-pointer items-center gap-4 bg-[var(--a2-ink-3)] px-4 py-4 text-left"
    >
      <span
        className="grid h-11 w-11 shrink-0 place-items-center text-[var(--a2-ink)]"
        style={{ background: accent }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="a2-display block text-2xl leading-none">{label}</span>
        <span className="mt-1 block text-xs text-[var(--a2-bone-dim)]">{hint}</span>
      </span>
      <ArrowRight
        size={18}
        className="shrink-0 text-[var(--a2-bone-dim)] transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}

function Nav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        onClick={onBack}
        className="a2-press a2-label grid h-11 w-11 cursor-pointer place-items-center bg-transparent text-[var(--a2-bone)]"
        aria-label="Back"
      >
        <ArrowLeft size={16} />
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="a2-press a2-display flex-1 cursor-pointer bg-[var(--a2-bone)] px-4 py-3 text-2xl text-[var(--a2-ink)] disabled:cursor-not-allowed"
      >
        {nextLabel}
      </button>
    </div>
  );
}
