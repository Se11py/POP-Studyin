"use client";

import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARENA_DECKS } from "../arena/arena-data";
import EntryScreen, { Arena2Entry } from "./components/EntryScreen";
import LobbyScreen from "./components/LobbyScreen";
import RoundScreen, { ViewMode } from "./components/RoundScreen";
import StandingsScreen from "./components/StandingsScreen";
import PodiumScreen from "./components/PodiumScreen";
import { Contender, makeContender } from "./engine";

type Phase = "entry" | "lobby" | "round" | "standings" | "podium";

const USER_ID = "you";

export default function Arena2Page() {
  const [phase, setPhase] = useState<Phase>("entry");
  const [entry, setEntry] = useState<Arena2Entry | null>(null);
  const [players, setPlayers] = useState<Contender[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [view, setView] = useState<ViewMode>("pod");

  const deck = ARENA_DECKS.find((d) => d.id === entry?.deckId) ?? ARENA_DECKS[0];

  function handleEnter(e: Arena2Entry) {
    setEntry(e);
    setPlayers([makeContender(USER_ID, e.name, e.avatarIdx, false)]);
    setQuestionIndex(0);
    setView(e.mode === "host" ? "broadcast" : "pod");
    setPhase("lobby");
  }

  function handleStart(roster: Contender[]) {
    setPlayers(roster);
    setQuestionIndex(0);
    setPhase("round");
  }

  const handleRoundDone = useCallback((updated: Contender[]) => {
    setPlayers(updated);
    setPhase("standings");
  }, []);

  const handleNext = useCallback(() => {
    if (questionIndex + 1 < deck.questions.length) {
      setQuestionIndex(questionIndex + 1);
      setPhase("round");
    } else {
      setPhase("podium");
    }
  }, [questionIndex, deck.questions.length]);

  const spendCoins = useCallback((amount: number) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === USER_ID ? { ...p, coins: Math.max(0, p.coins - amount) } : p
      )
    );
  }, []);

  function reset() {
    setPhase("entry");
    setEntry(null);
    setPlayers([]);
    setQuestionIndex(0);
  }

  const user = players.find((p) => p.id === USER_ID);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${phase}-${questionIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {phase === "entry" && <EntryScreen onEnter={handleEnter} />}

        {phase === "lobby" && entry && user && (
          <LobbyScreen
            pin={entry.pin}
            deckTitle={deck.title}
            deckSubject={`${deck.subject} · ${deck.level}`}
            hostMode={entry.mode === "host"}
            user={user}
            onStart={handleStart}
          />
        )}

        {phase === "round" && user && (
          <RoundScreen
            question={deck.questions[questionIndex]}
            questionIndex={questionIndex}
            totalQuestions={deck.questions.length}
            deckTitle={deck.title}
            players={players}
            userId={USER_ID}
            view={view}
            onViewChange={setView}
            onRoundDone={handleRoundDone}
            onSpendCoins={spendCoins}
          />
        )}

        {phase === "standings" && (
          <StandingsScreen
            players={players}
            userId={USER_ID}
            questionIndex={questionIndex}
            totalQuestions={deck.questions.length}
            onNext={handleNext}
          />
        )}

        {phase === "podium" && (
          <PodiumScreen
            players={players}
            userId={USER_ID}
            deckTitle={deck.title}
            onPlayAgain={reset}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
