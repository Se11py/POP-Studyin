"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Coins, Scissors, X } from "lucide-react";
import { ARENA_CHOICES, ArenaQuestion, seededRandom } from "../../arena/arena-data";
import {
  answerSpread,
  applyRound,
  Contender,
  planBots,
  rank,
  REVEAL_MS,
  ROUND_SECONDS,
  SHRED_COST,
} from "../engine";
import { AvatarTile, Glyph, StreakChip, Stage } from "./chrome";

/** Once a player locks in there is nothing left to decide — run the clock down fast. */
const FAST_FORWARD = 3;
const TICK_MS = 100;

export type ViewMode = "pod" | "broadcast";

export default function RoundScreen({
  question,
  questionIndex,
  totalQuestions,
  deckTitle,
  players,
  userId,
  view,
  onViewChange,
  onRoundDone,
  onSpendCoins,
}: {
  question: ArenaQuestion;
  questionIndex: number;
  totalQuestions: number;
  deckTitle: string;
  players: Contender[];
  userId: string;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  onRoundDone: (updated: Contender[]) => void;
  onSpendCoins: (amount: number) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [pick, setPick] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<Contender[] | null>(null);
  const [shredded, setShredded] = useState<number[]>([]);

  const timeRef = useRef(ROUND_SECONDS);
  const pickRef = useRef<number | null>(null);
  const lockedAtRef = useRef(ROUND_SECONDS);
  const playersRef = useRef(players);
  const guard = useRef(false);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  playersRef.current = players;

  const user = players.find((p) => p.id === userId)!;
  const bots = useMemo(() => players.filter((p) => p.isBot), [players]);
  const plans = useMemo(
    () => planBots(bots, questionIndex, question.correct),
    [bots, questionIndex, question.correct]
  );

  useEffect(() => {
    const iv = setInterval(() => {
      const step = (pickRef.current !== null ? FAST_FORWARD : 1) * (TICK_MS / 1000);
      timeRef.current = Math.max(0, +(timeRef.current - step).toFixed(2));
      setTimeLeft(timeRef.current);
      if (timeRef.current > 0 || guard.current) return;

      guard.current = true;
      clearInterval(iv);
      const updated = applyRound(
        playersRef.current,
        plans,
        question.correct,
        userId,
        pickRef.current,
        lockedAtRef.current
      );
      setResult(updated);
      setRevealed(true);
      doneTimer.current = setTimeout(() => onRoundDone(updated), REVEAL_MS);
    }, TICK_MS);
    return () => clearInterval(iv);
    // The round is a one-shot machine: it must not restart mid-question.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (doneTimer.current) clearTimeout(doneTimer.current);
    },
    []
  );

  function lockIn(index: number) {
    if (pick !== null || revealed) return;
    setPick(index);
    pickRef.current = index;
    lockedAtRef.current = timeRef.current;
  }

  function useShred() {
    if (shredded.length || pick !== null || revealed || user.coins < SHRED_COST) return;
    const rand = seededRandom(questionIndex * 977 + 3);
    const wrong = [0, 1, 2, 3]
      .filter((i) => i !== question.correct)
      .sort(() => rand() - 0.5)
      .slice(0, 2);
    setShredded(wrong);
    onSpendCoins(SHRED_COST);
  }

  const elapsed = ROUND_SECONDS - timeLeft;
  const lockedIn =
    plans.filter((p) => p.answerAt <= elapsed).length + (pick !== null ? 1 : 0);
  const frac = timeLeft / ROUND_SECONDS;
  const clockColor =
    frac > 0.5 ? "var(--a2-mint)" : frac > 0.25 ? "var(--a2-gold)" : "var(--a2-crimson)";
  const spread = revealed ? answerSpread(plans, question.correct, pick) : [0, 0, 0, 0];
  const me = result?.find((p) => p.id === userId);
  const board = rank(result ?? players).slice(0, 5);

  const tokens = ARENA_CHOICES.map((choice, i) => ({
    choice,
    i,
    text: question.answers[i],
    isCorrect: question.correct === i,
    isPick: pick === i,
    isShredded: shredded.includes(i),
  }));

  return (
    <Stage
      rail={`${deckTitle.toUpperCase()} · Q${questionIndex + 1}/${totalQuestions}`}
      ticker={
        revealed
          ? rank(result ?? players)
              .slice(0, 6)
              .map(
                (p, i) =>
                  `#${i + 1} ${p.name.toUpperCase()} ${p.score.toLocaleString()} PTS${
                    p.streak >= 2 ? ` · ${p.streak} STREAK` : ""
                  }`
              )
          : undefined
      }
    >
      {/* ------------------------------- top strip ------------------------------- */}
      <header className="flex items-center justify-between gap-4 border-b-2 border-[var(--a2-bone)] px-4 py-2.5 sm:px-8">
        <div className="flex items-baseline gap-3">
          <span className="a2-display text-2xl leading-none">
            Q{questionIndex + 1}
            <span className="a2-mono ml-1 text-[10px] text-[var(--a2-bone-dim)]">
              /{totalQuestions}
            </span>
          </span>
          <span className="a2-label hidden text-[var(--a2-bone-dim)] sm:block">
            {deckTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ViewToggle view={view} onChange={onViewChange} />
          <span className="a2-mono hidden items-center gap-1 text-[11px] text-[var(--a2-gold)] sm:flex">
            <Coins size={13} /> {user.coins}
          </span>
        </div>
      </header>

      {/* progress strip: segmented in pod view, ring lives in the broadcast card */}
      <div className="flex h-1.5 w-full">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="h-full flex-1 border-r border-[var(--a2-ink)] transition-colors"
            style={{
              background:
                i / 30 < frac ? clockColor : "var(--a2-bone-faint)",
            }}
          />
        ))}
      </div>

      {view === "broadcast" ? (
        <BroadcastBody
          question={question}
          tokens={tokens}
          revealed={revealed}
          spread={spread}
          totalPlayers={players.length}
          lockedIn={lockedIn}
          timeLeft={timeLeft}
          frac={frac}
          clockColor={clockColor}
          board={board}
          userId={userId}
          onPick={lockIn}
        />
      ) : (
        <PodBody
          question={question}
          tokens={tokens}
          revealed={revealed}
          lockedIn={lockedIn}
          totalPlayers={players.length}
          user={user}
          canShred={!shredded.length && pick === null && user.coins >= SHRED_COST}
          onShred={useShred}
          onPick={lockIn}
        />
      )}

      {/* -------------------------------- verdict -------------------------------- */}
      <AnimatePresence>
        {revealed && me && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="absolute inset-x-0 bottom-9 z-30 mx-auto flex w-full max-w-2xl items-center gap-4 border-2 px-5 py-3"
            style={{
              background: me.lastCorrect ? "var(--a2-mint)" : "var(--a2-ink-2)",
              borderColor: me.lastCorrect ? "var(--a2-mint)" : "var(--a2-crimson)",
              color: me.lastCorrect ? "var(--a2-ink)" : "var(--a2-bone)",
              boxShadow: "6px 6px 0 #000",
            }}
          >
            <span
              className="grid h-10 w-10 shrink-0 place-items-center border-2"
              style={{
                borderColor: me.lastCorrect ? "var(--a2-ink)" : "var(--a2-crimson)",
                color: me.lastCorrect ? "var(--a2-ink)" : "var(--a2-crimson)",
              }}
            >
              {me.lastCorrect ? <Check size={20} /> : <X size={20} />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="a2-display text-3xl leading-none">
                {me.lastCorrect ? "Correct" : pick === null ? "No answer" : "Missed it"}
              </div>
              <div className="a2-mono mt-1 text-[11px] opacity-70">
                {me.lastCorrect
                  ? `+${me.lastDelta} pts · +${me.coins - user.coins} coins`
                  : `Answer: ${ARENA_CHOICES[question.correct].label} — ${
                      question.answers[question.correct]
                    }`}
              </div>
            </div>
            <StreakChip streak={me.streak} dark={!!me.lastCorrect} />
            <span className="a2-display shrink-0 text-3xl leading-none">
              {me.score.toLocaleString()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}

/* ============================== broadcast view ============================== */

type Token = {
  choice: (typeof ARENA_CHOICES)[number];
  i: number;
  text: string;
  isCorrect: boolean;
  isPick: boolean;
  isShredded: boolean;
};

function BroadcastBody({
  question,
  tokens,
  revealed,
  spread,
  totalPlayers,
  lockedIn,
  timeLeft,
  frac,
  clockColor,
  board,
  userId,
  onPick,
}: {
  question: ArenaQuestion;
  tokens: Token[];
  revealed: boolean;
  spread: number[];
  totalPlayers: number;
  lockedIn: number;
  timeLeft: number;
  frac: number;
  clockColor: string;
  board: Contender[];
  userId: string;
  onPick: (i: number) => void;
}) {
  const R = 46;
  const C = 2 * Math.PI * R;
  const maxSpread = Math.max(1, ...spread);

  return (
    <main className="grid flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[1fr_260px]">
      <div className="flex min-w-0 flex-col">
        {/* inverted question board — the thing the whole room reads */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="a2-sweep relative overflow-hidden border-2 border-[var(--a2-bone)] bg-[var(--a2-bone)] px-5 py-6 text-[var(--a2-ink)] sm:px-8 sm:py-8"
          style={{ boxShadow: "8px 8px 0 #000" }}
        >
          <div className="flex items-start gap-5">
            <p className="a2-display flex-1 text-[clamp(1.6rem,4vw,3.1rem)]">
              {question.prompt}
            </p>
            <div className="relative hidden h-24 w-24 shrink-0 sm:block">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(10,10,11,0.14)" strokeWidth="12" />
                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  stroke={clockColor}
                  strokeWidth="12"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - frac)}
                  style={{ transition: "stroke 0.3s linear" }}
                />
              </svg>
              <span
                className="a2-mono absolute inset-0 grid place-items-center text-2xl font-bold"
                style={{ color: "var(--a2-ink)" }}
              >
                {Math.ceil(timeLeft)}
              </span>
            </div>
          </div>

          <div className="a2-mono mt-5 flex items-center gap-2 border-t-2 border-[rgba(10,10,11,0.12)] pt-3 text-[11px]">
            <span
              className="inline-block h-2 w-2"
              style={{ background: revealed ? "rgba(10,10,11,0.3)" : "var(--a2-crimson)" }}
            />
            {revealed
              ? "ROUND CLOSED"
              : `${lockedIn} OF ${totalPlayers} LOCKED IN`}
          </div>
        </motion.div>

        <div className="mt-5 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {tokens.map((t) => (
            <button
              key={t.choice.label}
              onClick={() => onPick(t.i)}
              disabled={revealed}
              className="a2-press relative flex cursor-pointer items-center gap-4 overflow-hidden px-4 py-4 text-left"
              style={{
                background: t.choice.color,
                color: "var(--a2-ink)",
                opacity: revealed && !t.isCorrect ? 0.32 : 1,
                borderColor: t.isPick ? "var(--a2-ink)" : "var(--a2-bone)",
              }}
            >
              {revealed && (
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${(spread[t.i] / maxSpread) * 100}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="a2-hatch absolute inset-y-0 left-0"
                />
              )}
              <span className="relative grid h-11 w-11 shrink-0 place-items-center bg-[var(--a2-ink)]">
                <Glyph shape={t.choice.shape} size={20} color={t.choice.color} />
              </span>
              <span className="a2-display relative min-w-0 flex-1 text-2xl leading-tight">
                {t.text}
              </span>
              {revealed && (
                <span className="a2-mono relative shrink-0 text-sm font-bold">
                  {spread[t.i]}
                </span>
              )}
              {revealed && t.isCorrect && (
                <span className="a2-sticker a2-label absolute right-2 top-2 rotate-6 bg-[var(--a2-ink)] px-1.5 py-1 text-[var(--a2-mint)]">
                  Correct
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* live board rail */}
      <aside className="hidden flex-col lg:flex">
        <span className="a2-label text-[var(--a2-bone-dim)]">Live board</span>
        <div className="mt-3 flex flex-col gap-2">
          {board.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="flex items-center gap-2 border-2 px-2 py-1.5"
              style={{
                borderColor: p.id === userId ? "var(--a2-mint)" : "var(--a2-bone-faint)",
              }}
            >
              <span className="a2-mono w-4 shrink-0 text-[11px] text-[var(--a2-bone-dim)]">
                {i + 1}
              </span>
              <AvatarTile avatar={p.avatar} size={26} border={false} />
              <span className="a2-display min-w-0 flex-1 truncate text-base leading-none">
                {p.name}
              </span>
              <span className="a2-mono shrink-0 text-[11px]">
                {p.score.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </aside>
    </main>
  );
}

/* ================================= pod view ================================= */

function PodBody({
  question,
  tokens,
  revealed,
  lockedIn,
  totalPlayers,
  user,
  canShred,
  onShred,
  onPick,
}: {
  question: ArenaQuestion;
  tokens: Token[];
  revealed: boolean;
  lockedIn: number;
  totalPlayers: number;
  user: Contender;
  canShred: boolean;
  onShred: () => void;
  onPick: (i: number) => void;
}) {
  return (
    <main className="flex flex-1 flex-col px-4 py-4 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <p className="a2-display max-w-2xl text-[clamp(1.25rem,3vw,2rem)]">
          {question.prompt}
        </p>
        <button
          onClick={onShred}
          disabled={!canShred}
          className="a2-press a2-label flex shrink-0 cursor-pointer items-center gap-1.5 bg-[var(--a2-ink-3)] px-2.5 py-2 text-[var(--a2-gold)] disabled:cursor-not-allowed"
          title={`Shred two wrong tokens — ${SHRED_COST} coins`}
        >
          <Scissors size={13} /> Shred {SHRED_COST}
        </button>
      </div>

      <div className="a2-mono mt-3 flex items-center gap-3 text-[11px] text-[var(--a2-bone-dim)]">
        <span>{revealed ? "ROUND CLOSED" : `${lockedIn}/${totalPlayers} LOCKED IN`}</span>
        <span className="h-3 w-px bg-[var(--a2-bone-faint)]" />
        <span>{user.score.toLocaleString()} PTS</span>
        <StreakChip streak={user.streak} />
      </div>

      {/* four fat touchpads — the phone is the controller */}
      <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
        {tokens.map((t) => (
          <motion.button
            key={t.choice.label}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: t.isShredded ? 0.15 : revealed && !t.isCorrect ? 0.28 : 1,
              scale: 1,
            }}
            transition={{ delay: 0.05 * t.i, duration: 0.25 }}
            disabled={revealed || t.isShredded}
            onClick={() => onPick(t.i)}
            className="a2-press relative flex min-h-[22vh] cursor-pointer flex-col justify-between overflow-hidden p-4 text-left"
            style={{
              background: t.choice.color,
              color: "var(--a2-ink)",
              borderColor: t.isPick ? "var(--a2-ink)" : "var(--a2-bone)",
            }}
          >
            <span className="flex w-full items-center justify-between">
              <Glyph shape={t.choice.shape} size={34} />
              <span className="a2-mono text-xs font-bold opacity-60">
                {t.choice.label}
              </span>
            </span>
            <span className="a2-display text-[clamp(1.1rem,3.4vw,2rem)] leading-none">
              {t.text}
            </span>
            {t.isPick && (
              <span className="a2-sticker a2-label absolute right-2 top-2 -rotate-6 bg-[var(--a2-ink)] px-1.5 py-1 text-[var(--a2-bone)]">
                Locked
              </span>
            )}
            {t.isShredded && <span className="a2-hatch absolute inset-0" />}
          </motion.button>
        ))}
      </div>
    </main>
  );
}

/* =============================== view toggle =============================== */

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="flex border-2 border-[var(--a2-bone-faint)]">
      {(["pod", "broadcast"] as ViewMode[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className="a2-label cursor-pointer px-2.5 py-1.5 transition-colors"
          style={{
            background: view === v ? "var(--a2-bone)" : "transparent",
            color: view === v ? "var(--a2-ink)" : "var(--a2-bone-dim)",
          }}
        >
          {v === "pod" ? "Phone" : "Projector"}
        </button>
      ))}
    </div>
  );
}
