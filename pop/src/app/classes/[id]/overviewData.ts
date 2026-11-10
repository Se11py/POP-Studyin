import { classesData } from "./classesData";
import { mathTiers } from "./mathSyllabus";
import { physicsTripleTiers } from "./physicsTripleSyllabus";
import { sciBiologyTiers, sciChemistryTiers, sciPhysicsTiers } from "./sciSyllabus";
import { edexcelMathUnits } from "./edexcelMathSyllabus";

export type OverviewTopic = { id: string; title: string; done?: boolean; tag?: string };
export type OverviewUnit = { n: number; title: string; topics: OverviewTopic[] };

export type SubjectOverview = {
  name: string;
  code: string;
  /** Exam board and level, shown in the sidebar blurb. */
  board: string;
  level: string;
  blurb: string;
  syllabusLine: string;
  cards?: number;
  papers?: number;
  quiz?: string;
  units: OverviewUnit[];
  /** When a syllabus is split into tiers, `units` holds the first tier and this lists them all. */
  tiers?: { name: string; units: OverviewUnit[] }[];
};

const t = (id: string, title: string, done = false): OverviewTopic => ({ id, title, done });

const physics: SubjectOverview = {
  name: "Physics",
  code: "0625",
  board: "Cambridge",
  level: "IGCSE",
  blurb: "Six units, start to finish. Every topic has revision notes, flashcards, a lightning quiz and real past-paper questions.",
  syllabusLine: "IGCSE · CAMBRIDGE · 2023–2025 SYLLABUS",
  cards: 412,
  papers: 58,
  quiz: "10 questions, 60 seconds, mixed from Units 1–2. Beat 7/10 to unlock the Unit 2 mock.",
  units: [
    {
      n: 1,
      title: "Motion, forces & energy",
      topics: [
        t("1.1", "Measurement & physical quantities", true),
        t("1.2", "Motion", true),
        t("1.3", "Mass and weight", true),
        t("1.4", "Density", true),
        t("1.5", "Forces", true),
        t("1.6", "Momentum"),
        t("1.7", "Energy, work and power"),
        t("1.8", "Pressure"),
      ],
    },
    {
      n: 2,
      title: "Thermal physics",
      topics: [
        t("2.1", "Kinetic particle model", true),
        t("2.2", "Thermal properties & temperature"),
        t("2.3", "Transfer of thermal energy"),
      ],
    },
    {
      n: 3,
      title: "Waves",
      topics: [t("3.1", "General properties of waves"), t("3.2", "Light"), t("3.3", "Electromagnetic spectrum"), t("3.4", "Sound")],
    },
    {
      n: 4,
      title: "Electricity & magnetism",
      topics: [
        t("4.1", "Magnetism"),
        t("4.2", "Electrical quantities"),
        t("4.3", "Electric circuits"),
        t("4.4", "Electrical safety"),
        t("4.5", "Electromagnetic effects"),
      ],
    },
    { n: 5, title: "Nuclear physics", topics: [t("5.1", "The nuclear model of the atom"), t("5.2", "Radioactivity")] },
    { n: 6, title: "Space physics", topics: [t("6.1", "Earth and the Solar System"), t("6.2", "Stars and the Universe")] },
  ],
};

const math: SubjectOverview = {
  name: "Mathematics",
  code: "0580",
  board: "Cambridge",
  level: "IGCSE",
  blurb: "Core and Extended, nine units each. Every topic has full revision notes, worked examples and common mistakes to avoid.",
  syllabusLine: "IGCSE · CAMBRIDGE · CIE SYLLABUS V2026.1",
  papers: 62,
  units: mathTiers[0].units,
  tiers: mathTiers,
};

const physicsTriple: SubjectOverview = {
  name: "Physics (Triple)",
  code: "0625",
  board: "Cambridge",
  level: "IGCSE",
  blurb: "Core and Extended, six units each. All topics contain full revision notes, worked examples, and common mistakes.",
  syllabusLine: "IGCSE · CAMBRIDGE · 0625 PHYSICS",
  units: physicsTripleTiers[0].units,
  tiers: physicsTripleTiers,
};

const coordinated = (name: string, tiers: typeof mathTiers): SubjectOverview => ({
  name: `${name} (Co-ordinated)`,
  code: "0654",
  board: "Cambridge",
  level: "IGCSE",
  blurb: "Core and Extended. All topics contain full revision notes, worked examples, and common mistakes.",
  syllabusLine: "IGCSE · CAMBRIDGE · 0654 CO-ORDINATED SCIENCES",
  units: tiers[0].units,
  tiers,
});

const edexcelMath: SubjectOverview = {
  name: "Mathematics A",
  code: "4MA1",
  board: "Pearson Edexcel",
  level: "IGCSE",
  blurb: "From Grades 1 up to 8 & 9. All topics contain full revision notes, worked examples, and common mistakes.",
  syllabusLine: "IGCSE · PEARSON EDEXCEL · 4MA1",
  units: edexcelMathUnits,
};

const curated: Record<string, SubjectOverview> = {
  "igcse-physics": physics,
  "igcse-math": math,
  "edexcel-igcse-math": edexcelMath,
  "igcse-physics-triple": physicsTriple,
  "igcse-sci-biology": coordinated("Biology", sciBiologyTiers),
  "igcse-sci-chemistry": coordinated("Chemistry", sciChemistryTiers),
  "igcse-sci-physics": coordinated("Physics", sciPhysicsTiers),
};

/** Physics is fully mapped; other subjects are built from whatever syllabus the class data already holds. */
export function getOverview(classId: string): SubjectOverview | null {
  if (curated[classId]) return curated[classId];
  const data = classesData[classId];
  if (!data) return null;

  return {
    name: data.name,
    code: data.syllabusCode.match(/\d{4}/)?.[0] ?? "",
    board: data.board.replace(/ CAIE$/, ""),
    level: data.level,
    blurb: `${data.subtitle}. Every topic has revision notes, flashcards, a lightning quiz and real past-paper questions.`,
    syllabusLine: `${data.level} · ${data.board.replace("Cambridge ", "").toUpperCase()} · ${data.syllabusInfo.toUpperCase()}`,
    units: data.topics
      .filter((topic) => topic.subTopics.length > 0)
      .map((topic, i) => ({
        n: i + 1,
        title: topic.title.replace(/^Module \d+:\s*/, ""),
        topics: topic.subTopics.map((s) => ({
          id: s.id,
          title: s.title,
          done: s.lessons.length > 0 && s.lessons.every((l) => l.status === "completed"),
        })),
      })),
  };
}
