"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Atom, Gamepad2, MonitorPlay, Sigma, Zap } from "lucide-react";
import { ARENA_AVATARS, ARENA_CHOICES, ARENA_DECKS } from "../arena-data";
import { ArenaWordmark, Atmosphere, ShapeIcon } from "./shared";

export type ArenaEntry = {
  mode: "join" | "host";
  deckId: string;
  pin: string;
  name: string;
  avatarIdx: number;
};

type Step = "mode" | "pin" | "deck" | "profile";

const DECK_ICONS: Record<string, React.ReactNode> = {
  zap: <Zap size={22} />,
  sigma: <Sigma size={22} />,
  atom: <Atom size={22} />,
};

export default function HomeScreen({ onEnter }: { onEnter: (entry: ArenaEntry) => void }) {
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<"join" | "host">("join");
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [deckId, setDeckId] = useState(ARENA_DECKS[0].id);
  const [name, setName] = useState("");
  const [avatarIdx, setAvatarIdx] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const pin = digits.join("");
  const pinReady = pin.length === 6;
  const nameReady = name.trim().length >= 2;

  function handleDigit(i: number, val: string) {
    const clean = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function handleDigitKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputsRef.current[i - 1]?.focus();
  }

  function finish() {
    onEnter({
      mode,
      deckId,
      pin: mode === "host" ? String(Math.floor(100000 + Math.random() * 900000)) : pin,
      name: name.trim(),
      avatarIdx,
    });
  }

  return (
    <div className="arena-root flex flex-col">
      <Atmosphere />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10">
        <AnimatePresence mode="wait">
          {step === "mode" && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex w-full max-w-3xl flex-col items-center"
            >
              <ArenaWordmark />

              <motion.h1
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="arena-display arena-title-glow mt-5 text-center text-6xl sm:text-7xl md:text-8xl uppercase leading-none"
              >
                Enter the
                <br />
                Arena
              </motion.h1>

              <p className="mt-5 max-w-md text-center text-sm sm:text-base text-violet-200/70">
                Live multiplayer quiz battles for IGCSE &amp; A-Level revision.
                One screen. Four tokens. Zero mercy.
              </p>

              {/* token marquee */}
              <div className="mt-7 w-full max-w-lg overflow-hidden opacity-70 [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
                <div className="arena-marquee-track items-center gap-10">
                  {[...ARENA_CHOICES, ...ARENA_CHOICES, ...ARENA_CHOICES, ...ARENA_CHOICES].map((c, i) => (
                    <div key={i} className="flex items-center gap-2.5 shrink-0">
                      <ShapeIcon shape={c.shape} size={16} color={c.color} />
                      <span className="arena-display text-xs uppercase tracking-[0.25em] text-violet-100/60">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-2">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 }}
                  onClick={() => { setMode("join"); setStep("pin"); }}
                  className="arena-panel group rounded-2xl p-6 text-left cursor-pointer hover:border-[#00C6FB]/50 transition-colors"
                >
                  <Gamepad2 size={26} className="text-[#00C6FB]" />
                  <div className="arena-display mt-4 text-xl uppercase tracking-wide">Join Game</div>
                  <p className="mt-1.5 text-xs text-violet-200/60">Got a 6-digit PIN from your teacher? Jump in.</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#00C6FB] uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                    Enter PIN <ArrowRight size={14} />
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.36 }}
                  onClick={() => { setMode("host"); setStep("deck"); }}
                  className="arena-panel group rounded-2xl p-6 text-left cursor-pointer hover:border-[#A78BFA]/60 transition-colors"
                >
                  <MonitorPlay size={26} className="text-[#A78BFA]" />
                  <div className="arena-display mt-4 text-xl uppercase tracking-wide">Host Game</div>
                  <p className="mt-1.5 text-xs text-violet-200/60">Project this screen and launch a live classroom battle.</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#A78BFA] uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                    Pick a deck <ArrowRight size={14} />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "pin" && (
            <motion.div
              key="pin"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex w-full max-w-lg flex-col items-center"
            >
              <ArenaWordmark />
              <h2 className="arena-display mt-6 text-3xl sm:text-4xl uppercase">Game PIN</h2>
              <p className="mt-2 text-sm text-violet-200/60">It&apos;s on the big screen at the front of the room.</p>

              <div className="mt-8 flex gap-2.5 sm:gap-3">
                {digits.map((d, i) => (
                  <motion.input
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    value={d}
                    onChange={(e) => handleDigit(i, e.target.value)}
                    onKeyDown={(e) => handleDigitKey(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    autoFocus={i === 0}
                    className="arena-display h-14 w-11 sm:h-16 sm:w-13 rounded-xl border border-violet-300/25 bg-[#140b28] text-center text-2xl sm:text-3xl text-white outline-none focus:border-[#00C6FB] focus:shadow-[0_0_24px_rgba(0,198,251,0.35)] transition-all"
                  />
                ))}
              </div>

              <StepNav
                onBack={() => setStep("mode")}
                onNext={() => pinReady && setStep("profile")}
                nextLabel="Lock in"
                nextDisabled={!pinReady}
              />
            </motion.div>
          )}

          {step === "deck" && (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex w-full max-w-2xl flex-col items-center"
            >
              <ArenaWordmark />
              <h2 className="arena-display mt-6 text-3xl sm:text-4xl uppercase">Choose your deck</h2>
              <p className="mt-2 text-sm text-violet-200/60">Any POP Studying question bank becomes a live game.</p>

              <div className="mt-8 grid w-full gap-3">
                {ARENA_DECKS.map((deck, i) => {
                  const active = deck.id === deckId;
                  return (
                    <motion.button
                      key={deck.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => setDeckId(deck.id)}
                      className={`arena-panel flex items-center gap-4 rounded-2xl p-4 sm:p-5 text-left cursor-pointer transition-all ${
                        active ? "border-[#00C6FB]/70 shadow-[0_0_32px_rgba(0,198,251,0.18)]" : "hover:border-violet-300/40"
                      }`}
                    >
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${active ? "bg-[#00C6FB]/15 text-[#00C6FB]" : "bg-violet-400/10 text-violet-300"}`}>
                        {DECK_ICONS[deck.icon]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="arena-display text-base sm:text-lg uppercase tracking-wide truncate">{deck.title}</div>
                        <div className="text-xs text-violet-200/55">{deck.subject} · Syllabus {deck.level}</div>
                      </div>
                      <div className="arena-display shrink-0 rounded-lg bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200/80">
                        {deck.questions.length} Q
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <StepNav
                onBack={() => setStep("mode")}
                onNext={() => setStep("profile")}
                nextLabel="Continue"
              />
            </motion.div>
          )}

          {step === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex w-full max-w-xl flex-col items-center"
            >
              <ArenaWordmark />
              <h2 className="arena-display mt-6 text-3xl sm:text-4xl uppercase">Who&apos;s playing?</h2>

              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 14))}
                placeholder="Your nickname"
                autoFocus
                className="arena-display mt-7 w-full max-w-xs rounded-xl border border-violet-300/25 bg-[#140b28] px-4 py-3.5 text-center text-xl text-white placeholder:text-violet-300/30 outline-none focus:border-[#00C6FB] focus:shadow-[0_0_24px_rgba(0,198,251,0.3)] transition-all"
              />

              <div className="mt-6 grid grid-cols-6 gap-2.5 sm:gap-3">
                {ARENA_AVATARS.map((a, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * i, type: "spring", stiffness: 300, damping: 18 }}
                    onClick={() => setAvatarIdx(i)}
                    className={`flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-xl text-xl sm:text-2xl cursor-pointer transition-all ${
                      avatarIdx === i ? "ring-2 ring-[#00C6FB] ring-offset-2 ring-offset-[#08040f] scale-110" : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{ background: a.bg }}
                  >
                    {a.emoji}
                  </motion.button>
                ))}
              </div>

              <StepNav
                onBack={() => setStep(mode === "join" ? "pin" : "deck")}
                onNext={() => nameReady && finish()}
                nextLabel={mode === "host" ? "Open Lobby" : "Enter Arena"}
                nextDisabled={!nameReady}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function StepNav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center gap-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-violet-300/60 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} /> Back
      </button>
      <motion.button
        whileHover={nextDisabled ? undefined : { scale: 1.04 }}
        whileTap={nextDisabled ? undefined : { scale: 0.96 }}
        onClick={onNext}
        disabled={nextDisabled}
        className={`arena-display flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm uppercase tracking-widest transition-all ${
          nextDisabled
            ? "bg-violet-400/10 text-violet-300/30 cursor-not-allowed"
            : "bg-gradient-to-r from-[#7B2FF2] to-[#00C6FB] text-white shadow-[0_8px_32px_rgba(123,47,242,0.45)] cursor-pointer"
        }`}
      >
        {nextLabel} <ArrowRight size={15} />
      </motion.button>
    </div>
  );
}
