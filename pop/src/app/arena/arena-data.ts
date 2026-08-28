export type ArenaChoice = {
  label: string;
  color: string;
  glow: string;
  shape: "triangle" | "diamond" | "circle" | "square";
  name: string;
};

export const ARENA_CHOICES: ArenaChoice[] = [
  { label: "A", name: "Electric Crimson", color: "#FF2E4D", glow: "rgba(255,46,77,0.55)", shape: "triangle" },
  { label: "B", name: "Neon Cobalt", color: "#2E6BFF", glow: "rgba(46,107,255,0.55)", shape: "diamond" },
  { label: "C", name: "Solar Gold", color: "#FFC400", glow: "rgba(255,196,0,0.55)", shape: "circle" },
  { label: "D", name: "Emerald Mint", color: "#00E89B", glow: "rgba(0,232,155,0.55)", shape: "square" },
];

export type ArenaQuestion = {
  prompt: string;
  answers: [string, string, string, string];
  correct: number; // 0-3
};

export type ArenaDeck = {
  id: string;
  title: string;
  subject: string;
  level: string;
  icon: string;
  questions: ArenaQuestion[];
};

export const ARENA_DECKS: ArenaDeck[] = [
  {
    id: "igcse-physics-forces",
    title: "Forces & Motion",
    subject: "IGCSE Physics",
    level: "0625",
    icon: "zap",
    questions: [
      {
        prompt: "A car accelerates from rest to 20 m/s in 5 seconds. What is its acceleration?",
        answers: ["2 m/s²", "4 m/s²", "5 m/s²", "100 m/s²"],
        correct: 1,
      },
      {
        prompt: "Which quantity is a vector?",
        answers: ["Speed", "Distance", "Velocity", "Mass"],
        correct: 2,
      },
      {
        prompt: "On a distance–time graph, a horizontal line means the object is…",
        answers: ["Accelerating", "Moving at constant speed", "Stationary", "Decelerating"],
        correct: 2,
      },
      {
        prompt: "What is the weight of a 2 kg mass on Earth? (g = 10 N/kg)",
        answers: ["0.2 N", "2 N", "10 N", "20 N"],
        correct: 3,
      },
      {
        prompt: "Newton's First Law says an object stays at constant velocity unless acted on by…",
        answers: ["A resultant force", "Friction only", "Gravity only", "Its own inertia"],
        correct: 0,
      },
    ],
  },
  {
    id: "igcse-maths-algebra",
    title: "Algebra Sprint",
    subject: "IGCSE Mathematics",
    level: "0580",
    icon: "sigma",
    questions: [
      {
        prompt: "Solve: 3x + 7 = 22",
        answers: ["x = 3", "x = 5", "x = 7", "x = 15"],
        correct: 1,
      },
      {
        prompt: "Factorise fully: x² − 9",
        answers: ["(x − 3)²", "(x + 3)(x − 3)", "x(x − 9)", "(x + 9)(x − 1)"],
        correct: 1,
      },
      {
        prompt: "What is the gradient of the line y = 4x − 2?",
        answers: ["−2", "2", "4", "x"],
        correct: 2,
      },
      {
        prompt: "Simplify: 2³ × 2⁴",
        answers: ["2⁷", "2¹²", "4⁷", "2¹"],
        correct: 0,
      },
      {
        prompt: "If f(x) = x² + 1, what is f(3)?",
        answers: ["7", "9", "10", "12"],
        correct: 2,
      },
    ],
  },
  {
    id: "alevel-chem-bonding",
    title: "Chemical Bonding",
    subject: "A-Level Chemistry",
    level: "9701",
    icon: "atom",
    questions: [
      {
        prompt: "Which bond forms between a metal and a non-metal?",
        answers: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
        correct: 1,
      },
      {
        prompt: "What is the bond angle in a methane molecule (CH₄)?",
        answers: ["90°", "104.5°", "109.5°", "120°"],
        correct: 2,
      },
      {
        prompt: "Which molecule is non-polar despite having polar bonds?",
        answers: ["H₂O", "NH₃", "CO₂", "HCl"],
        correct: 2,
      },
      {
        prompt: "The strong attraction between hydrogen and a lone pair on N, O or F is…",
        answers: ["Van der Waals", "A dipole–dipole force", "Hydrogen bonding", "Metallic bonding"],
        correct: 2,
      },
      {
        prompt: "In metallic bonding, the lattice of positive ions is held together by…",
        answers: ["Shared electron pairs", "A sea of delocalised electrons", "Ionic bridges", "Hydrogen bonds"],
        correct: 1,
      },
    ],
  },
];

export type ArenaAvatar = { emoji: string; bg: string };

export const ARENA_AVATARS: ArenaAvatar[] = [
  { emoji: "🦊", bg: "linear-gradient(135deg,#FF2E4D,#FF7F50)" },
  { emoji: "🐼", bg: "linear-gradient(135deg,#2E6BFF,#00C6FB)" },
  { emoji: "🦉", bg: "linear-gradient(135deg,#7B2FF2,#F357A8)" },
  { emoji: "🐯", bg: "linear-gradient(135deg,#FFC400,#FF7F50)" },
  { emoji: "🐸", bg: "linear-gradient(135deg,#00E89B,#45B7D1)" },
  { emoji: "🦄", bg: "linear-gradient(135deg,#F357A8,#A78BFA)" },
  { emoji: "🐙", bg: "linear-gradient(135deg,#00C6FB,#7B2FF2)" },
  { emoji: "🦁", bg: "linear-gradient(135deg,#FF7F50,#FFD700)" },
  { emoji: "🐧", bg: "linear-gradient(135deg,#45B7D1,#2E6BFF)" },
  { emoji: "🦖", bg: "linear-gradient(135deg,#96CEB4,#00E89B)" },
  { emoji: "🤖", bg: "linear-gradient(135deg,#94A3B8,#E2E8F0)" },
  { emoji: "👽", bg: "linear-gradient(135deg,#00E89B,#FFC400)" },
];

export const BOT_NAMES = [
  "Beam", "Nong Prim", "Tle", "Ploy", "Captain Calc",
  "QuantumQ", "Mild", "Bonus", "Pai", "Sir Streaks",
  "Namtan", "ForceField",
];

export type ArenaPlayer = {
  id: string;
  name: string;
  avatar: ArenaAvatar;
  isBot: boolean;
  score: number;
  streak: number;
  lastDelta: number;
  lastCorrect: boolean | null;
};

export function generatePin(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Deterministic PRNG (mulberry32) — pure, so it's safe to call during render. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
