"use client";

import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./arena.css";
import { ARENA_AVATARS, ARENA_DECKS, ArenaPlayer } from "./arena-data";
import HomeScreen, { ArenaEntry } from "./components/HomeScreen";
import LobbyScreen from "./components/LobbyScreen";
import GameScreen from "./components/GameScreen";
import LeaderboardScreen from "./components/LeaderboardScreen";
import PodiumScreen from "./components/PodiumScreen";
import posthog from "posthog-js";

const posthogConfigured = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST,
);

type Phase = "home" | "lobby" | "question" | "leaderboard" | "podium";

export default function ArenaPage() {
  const [phase, setPhase] = useState<Phase>("home");
  const [entry, setEntry] = useState<ArenaEntry | null>(null);
  const [players, setPlayers] = useState<ArenaPlayer[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const deck = ARENA_DECKS.find((d) => d.id === entry?.deckId) ?? ARENA_DECKS[0];
  const userPlayer: ArenaPlayer | null = entry
    ? players.find((p) => p.id === "user") ?? {
        id: "user",
        name: entry.name,
        avatar: ARENA_AVATARS[entry.avatarIdx],
        isBot: false,
        score: 0,
        streak: 0,
        lastDelta: 0,
        lastCorrect: null,
      }
    : null;

  function handleEnter(e: ArenaEntry) {
    setEntry(e);
    setPlayers([]);
    setQuestionIndex(0);
    setPhase("lobby");
  }

  function handleStart(roster: ArenaPlayer[]) {
    if (posthogConfigured) {
      posthog.capture("arena_game_started", {
        deck_id: deck.id,
        player_count: roster.length,
      });
    }
    setPlayers(roster);
    setQuestionIndex(0);
    setPhase("question");
  }

  const handleRoundDone = useCallback((updated: ArenaPlayer[]) => {
    setPlayers(updated);
    setPhase("leaderboard");
  }, []);

  function handleLeaderboardNext() {
    if (questionIndex + 1 < deck.questions.length) {
      setQuestionIndex((i) => i + 1);
      setPhase("question");
    } else {
      if (posthogConfigured) {
        posthog.capture("arena_game_completed", {
          deck_id: deck.id,
          question_count: deck.questions.length,
          final_score: players.find((player) => player.id === "user")?.score ?? 0,
        });
      }
      setPhase("podium");
    }
  }

  function handlePlayAgain() {
    setPhase("home");
    setEntry(null);
    setPlayers([]);
    setQuestionIndex(0);
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={phase + questionIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {phase === "home" && <HomeScreen onEnter={handleEnter} />}

          {phase === "lobby" && entry && userPlayer && (
            <LobbyScreen
              pin={entry.pin}
              deckTitle={deck.title}
              hostMode={entry.mode === "host"}
              userPlayer={userPlayer}
              onStart={handleStart}
            />
          )}

          {phase === "question" && userPlayer && (
            <GameScreen
              question={deck.questions[questionIndex]}
              questionIndex={questionIndex}
              totalQuestions={deck.questions.length}
              players={players}
              userId="user"
              onRoundDone={handleRoundDone}
            />
          )}

          {phase === "leaderboard" && (
            <LeaderboardScreen
              players={players}
              userId="user"
              questionIndex={questionIndex}
              totalQuestions={deck.questions.length}
              onNext={handleLeaderboardNext}
            />
          )}

          {phase === "podium" && (
            <PodiumScreen players={players} userId="user" onPlayAgain={handlePlayAgain} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
