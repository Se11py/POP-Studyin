import {
  ARENA_AVATARS,
  ArenaPlayer,
  BOT_NAMES,
  seededRandom,
} from "../arena/arena-data";

export const ROUND_SECONDS = 15;
export const REVEAL_MS = 4200;
export const BASE_POINTS = 600;
export const SPEED_POINTS = 400;
export const STREAK_BONUS = 100;
export const SHRED_COST = 300;

/** A player in the v2 arena — the base player plus Quest-mode coins. */
export type Contender = ArenaPlayer & { coins: number };

export type BotPlan = {
  id: string;
  /** seconds into the round at which this bot locks in */
  answerAt: number;
  correct: boolean;
  wrongPick: number;
};

export function makeContender(
  id: string,
  name: string,
  avatarIdx: number,
  isBot: boolean
): Contender {
  return {
    id,
    name,
    avatar: ARENA_AVATARS[avatarIdx % ARENA_AVATARS.length],
    isBot,
    score: 0,
    streak: 0,
    lastDelta: 0,
    lastCorrect: null,
    coins: 0,
  };
}

/** Deterministic bot roster so the lobby fills the same way on re-render. */
export function makeBots(count: number, seed: number): Contender[] {
  const rand = seededRandom(seed);
  const names = [...BOT_NAMES].sort(() => rand() - 0.5).slice(0, count);
  return names.map((name, i) =>
    makeContender(`bot-${i}`, name, Math.floor(rand() * ARENA_AVATARS.length), true)
  );
}

export function planBots(
  bots: Contender[],
  questionIndex: number,
  correct: number
): BotPlan[] {
  return bots.map((bot, i) => {
    const rand = seededRandom(questionIndex * 7919 + i * 131 + 17);
    const wrong = [0, 1, 2, 3].filter((x) => x !== correct);
    return {
      id: bot.id,
      answerAt: 1.4 + rand() * (ROUND_SECONDS - 3),
      correct: rand() < 0.64,
      wrongPick: wrong[Math.floor(rand() * wrong.length)],
    };
  });
}

/** Points scale with how much clock was left when the token was hit. */
export function pointsFor(secondsLeft: number, priorStreak: number): number {
  const speed = Math.max(0, Math.min(1, secondsLeft / ROUND_SECONDS));
  return (
    Math.round(BASE_POINTS + SPEED_POINTS * speed) +
    Math.min(priorStreak, 5) * STREAK_BONUS
  );
}

export function applyRound(
  players: Contender[],
  plans: BotPlan[],
  correctIndex: number,
  userId: string,
  userPick: number | null,
  userSecondsLeft: number
): Contender[] {
  return players.map((p) => {
    const hit = p.isBot
      ? (plans.find((plan) => plan.id === p.id)?.correct ?? false)
      : userPick === correctIndex;
    const secondsLeft = p.isBot
      ? ROUND_SECONDS - (plans.find((plan) => plan.id === p.id)?.answerAt ?? ROUND_SECONDS)
      : userSecondsLeft;
    const delta = hit ? pointsFor(secondsLeft, p.streak) : 0;
    return {
      ...p,
      score: p.score + delta,
      streak: hit ? p.streak + 1 : 0,
      lastDelta: delta,
      lastCorrect: hit,
      coins: p.coins + (hit ? 20 + Math.min(p.streak, 5) * 5 : 0),
    };
  });
}

export function answerSpread(
  plans: BotPlan[],
  correctIndex: number,
  userPick: number | null
): number[] {
  const spread = [0, 0, 0, 0];
  if (userPick !== null) spread[userPick] += 1;
  plans.forEach((p) => {
    spread[p.correct ? correctIndex : p.wrongPick] += 1;
  });
  return spread;
}

export function rank(players: Contender[]): Contender[] {
  return [...players].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
