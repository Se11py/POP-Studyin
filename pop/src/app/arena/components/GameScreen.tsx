"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, X } from "lucide-react";
import { ARENA_CHOICES, ArenaPlayer, ArenaQuestion, seededRandom } from "../arena-data";
import { ShapeIcon, StreakBadge } from "./shared";

const QUESTION_TIME = 12; // seconds
const REVEAL_TIME = 4200; // ms

type BotPlan = { id: string; answerAt: number; correct: boolean; wrongPick: number };

export default function GameScreen({
  question,
  questionIndex,
  totalQuestions,
  players,
  userId,
  onRoundDone,
}: {
  question: ArenaQuestion;
  questionIndex: number;
  totalQuestions: number;
  players: ArenaPlayer[];
  userId: string;
  onRoundDone: (updated: ArenaPlayer[]) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finalPlayers, setFinalPlayers] = useState<ArenaPlayer[] | null>(null);
  const revealGuard = useRef(false);
  const timeRef = useRef(QUESTION_TIME);
  const choiceRef = useRef<number | null>(null);
  const answeredAtRef = useRef(QUESTION_TIME);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bots = useMemo(() => players.filter((p) => p.isBot), [players]);
  const user = players.find((p) => p.id === userId)!;

  const botPlans: BotPlan[] = useMemo(
    () =>
      bots.map((b, i) => {
        const rand = seededRandom(questionIndex * 7919 + i * 131 + 17);
        const wrongOptions = [0, 1, 2, 3].filter((x) => x !== question.correct);
        return {
          id: b.id,
          answerAt: 1.2 + rand() * (QUESTION_TIME - 2.4),
          correct: rand() < 0.66,
          wrongPick: wrongOptions[Math.floor(rand() * wrongOptions.length)],
        };
      }),
    [bots, question, questionIndex]
  );

  // countdown + reveal-at-zero, driven from the timer callback
  useEffect(() => {
    if (revealed) return;
    const iv = setInterval(() => {
      timeRef.current = Math.max(0, +(timeRef.current - 0.1).toFixed(2));
      setTimeLeft(timeRef.current);
      if (timeRef.current > 0 || revealGuard.current) return;
      revealGuard.current = true;
      clearInterval(iv);

      const updated = players.map((p) => {
        if (!p.isBot) {
          const correct = choiceRef.current === question.correct;
          const streak = correct ? p.streak + 1 : 0;
          const delta = correct
            ? Math.round(600 + 400 * (answeredAtRef.current / QUESTION_TIME)) + Math.min(p.streak, 5) * 100
            : 0;
          return { ...p, score: p.score + delta, streak, lastDelta: delta, lastCorrect: correct };
        }
        const plan = botPlans.find((bp) => bp.id === p.id)!;
        const streak = plan.correct ? p.streak + 1 : 0;
        const delta = plan.correct
          ? Math.round(600 + 400 * (1 - plan.answerAt / QUESTION_TIME)) + Math.min(p.streak, 5) * 100
          : 0;
        return { ...p, score: p.score + delta, streak, lastDelta: delta, lastCorrect: plan.correct };
      });

      setFinalPlayers(updated);
      setRevealed(true);
      doneTimer.current = setTimeout(() => onRoundDone(updated), REVEAL_TIME);
    }, 100);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  // cleanup the post-round timer on unmount
  useEffect(() => () => {
    if (doneTimer.current) clearTimeout(doneTimer.current);
  }, []);

  const elapsed = QUESTION_TIME - timeLeft;
  const lockedIn = botPlans.filter((p) => p.answerAt <= elapsed).length + (userChoice !== null ? 1 : 0);

  const distribution = useMemo(() => {
    if (!revealed) return [0, 0, 0, 0];
    const dist = [0, 0, 0, 0];
    if (userChoice !== null) dist[userChoice]++;
    botPlans.forEach((p) => dist[p.correct ? question.correct : p.wrongPick]++);
    return dist;
  }, [revealed, userChoice, botPlans, question]);

  // ring math
  const R = 52;
  const C = 2 * Math.PI * R;
  const frac = timeLeft / QUESTION_TIME;
  const ringColor = frac > 0.5 ? "#00E89B" : frac > 0.25 ? "#FFC400" : "#FF2E4D";

  const userDelta = finalPlayers?.find((p) => p.id === userId)?.lastDelta ?? 0;
  const userCorrect = finalPlayers?.find((p) => p.id === userId)?.lastCorrect;

  return (
    <div className="arena-root flex flex-col">
      <div className="arena-aurora" />
      <div className="arena-noise" />

      {/* HUD */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5">
        <div className="arena-display text-xs uppercase tracking-[0.3em] text-violet-300/70">
          Question <span className="text-white">{questionIndex + 1}</span>
          <span className="text-violet-300/40"> / {totalQuestions}</span>
        </div>
        <div className="arena-display flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-violet-300/70">
          <StreakBadge streak={user.streak} />
          <span className="text-white tabular-nums">{user.score.toLocaleString()} pts</span>
        </div>
      </header>

      {/* question card */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-4">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="arena-panel relative w-full max-w-3xl rounded-3xl px-6 py-8 sm:px-12 sm:py-10 text-center overflow-hidden"
        >
          {/* scanline sweep on entry */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "220%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none bg-gradient-to-b from-transparent via-[#00C6FB]/10 to-transparent"
          />

          {/* countdown ring */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-8">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="9" />
                <circle
                  cx="60" cy="60" r={R} fill="none"
                  stroke={ringColor} strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - frac)}
                  style={{ transition: "stroke 0.3s ease", filter: `drop-shadow(0 0 8px ${ringColor})` }}
                />
              </svg>
              <div className="arena-display absolute inset-0 flex items-center justify-center text-xl sm:text-2xl tabular-nums" style={{ color: ringColor }}>
                {Math.ceil(timeLeft)}
              </div>
            </div>
          </div>

          <p className="arena-display mx-auto max-w-xl text-xl sm:text-3xl leading-snug font-semibold">
            {question.prompt}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-violet-300/50">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${revealed ? "bg-violet-300/40" : "bg-[#00E89B] animate-pulse"}`} />
            {revealed ? "Round complete" : `${lockedIn} / ${players.length} locked in`}
          </div>
        </motion.div>

        {/* answer tokens */}
        <div className="mt-6 grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {ARENA_CHOICES.map((choice, i) => {
            const isCorrect = question.correct === i;
            const isUserPick = userChoice === i;
            const dim = revealed && !isCorrect;
            return (
              <motion.button
                key={choice.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: dim ? 0.28 : 1, y: 0, scale: revealed && isCorrect ? 1.03 : 1 }}
                transition={{ delay: revealed ? 0 : 0.15 + i * 0.08, duration: 0.35 }}
                disabled={userChoice !== null || revealed}
                onClick={() => { setUserChoice(i); choiceRef.current = i; answeredAtRef.current = timeRef.current; }}
                className="arena-token relative flex items-center gap-4 rounded-2xl px-5 py-4 sm:py-5 text-left cursor-pointer border"
                style={{
                  background: `linear-gradient(135deg, ${choice.color}22, ${choice.color}0d)`,
                  borderColor: isUserPick && !revealed ? choice.color : revealed && isCorrect ? choice.color : `${choice.color}44`,
                  boxShadow:
                    revealed && isCorrect
                      ? `0 0 40px ${choice.glow}, inset 0 0 24px ${choice.color}22`
                      : isUserPick
                      ? `0 0 28px ${choice.glow}`
                      : "none",
                }}
              >
                <div
                  className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: choice.color, boxShadow: `0 4px 18px ${choice.glow}` }}
                >
                  <ShapeIcon shape={choice.shape} size={22} color="#08040f" />
                </div>
                <span className="arena-display flex-1 text-base sm:text-lg font-semibold leading-tight">
                  {question.answers[i]}
                </span>

                {revealed && isCorrect && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: choice.color }}>
                    <Check size={16} strokeWidth={3.5} color="#08040f" />
                  </motion.span>
                )}
                {revealed && isUserPick && !isCorrect && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <X size={16} strokeWidth={3.5} />
                  </motion.span>
                )}

                {/* distribution bar */}
                {revealed && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 h-1 origin-left rounded-full"
                    style={{
                      width: `${(distribution[i] / Math.max(1, players.length)) * 100}%`,
                      background: choice.color,
                      boxShadow: `0 0 12px ${choice.glow}`,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* reveal feedback banner */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          >
            <div
              className="arena-display flex items-center gap-4 rounded-2xl px-8 py-4 border backdrop-blur-xl"
              style={{
                background: userCorrect ? "rgba(0,232,155,0.12)" : "rgba(255,46,77,0.12)",
                borderColor: userCorrect ? "rgba(0,232,155,0.5)" : "rgba(255,46,77,0.5)",
                boxShadow: userCorrect ? "0 0 48px rgba(0,232,155,0.25)" : "0 0 48px rgba(255,46,77,0.2)",
              }}
            >
              {userCorrect ? (
                <>
                  <span className="text-2xl uppercase tracking-wide text-[#00E89B]">+{userDelta.toLocaleString()}</span>
                  {user.streak + 1 >= 2 && (
                    <span className="flex items-center gap-1 text-orange-300 font-bold">
                      <Flame size={18} className="arena-flame" fill="currentColor" /> {user.streak + 1} streak
                    </span>
                  )}
                </>
              ) : (
                <span className="text-lg uppercase tracking-wide text-[#FF8FA0]">
                  {userChoice === null ? "Too slow!" : "Not this time"}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
