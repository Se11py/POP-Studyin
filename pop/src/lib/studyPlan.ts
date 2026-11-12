import { getOverview, type OverviewTopic } from "@/app/classes/[id]/overviewData";

export type PlanTopic = OverviewTopic & { unit: string };
export type PlanWeek = { start: string; kind: "topics" | "papers"; topics: PlanTopic[] };

export const DAY = 86_400_000;
const ymd = (d: Date) => d.toISOString().slice(0, 10);
/** Today in Bangkok, as YYYY-MM-DD. */
export const todayBangkok = () => ymd(new Date(Date.now() + 7 * 3600_000));
export const daysUntil = (date: string) => Math.round((Date.parse(date) - Date.parse(todayBangkok())) / DAY);

export function gradeScale(classId: string) {
  const board = getOverview(classId)?.board ?? "";
  return board.includes("Edexcel") ? ["9", "8", "7", "6", "5", "4"] : ["A*", "A", "B", "C", "D"];
}

export function topicsFor(classId: string, tier?: string): PlanTopic[] {
  const o = getOverview(classId);
  if (!o) return [];
  const units = (o.tiers?.find((t) => t.name === tier) ?? o.tiers?.[0])?.units ?? o.units;
  return units.flatMap((u) => u.topics.map((t) => ({ ...t, unit: u.title })));
}

/**
 * Spreads the topics still to do over the weeks before the exam, in syllabus order, and keeps the last
 * weeks for past papers. A higher target keeps more of them. This is a pace, not a prediction of your grade.
 */
export function buildPlan(topics: PlanTopic[], done: string[], examDate: string, topGrade: boolean): PlanWeek[] {
  const days = daysUntil(examDate);
  if (days < 0) return [];
  const weeks = Math.max(1, Math.ceil(days / 7));
  const papers = weeks >= 8 ? (topGrade ? 3 : 2) : weeks >= 4 ? 1 : 0;
  const study = Math.max(1, weeks - papers);
  const todo = topics.filter((t) => !done.includes(t.id));
  const perWeek = Math.max(1, Math.ceil(todo.length / study));
  const start = Date.parse(todayBangkok());
  const out: PlanWeek[] = [];
  for (let w = 0; w < weeks; w++) {
    const date = ymd(new Date(start + w * 7 * DAY));
    if (w >= study) out.push({ start: date, kind: "papers", topics: [] });
    else out.push({ start: date, kind: "topics", topics: todo.slice(w * perWeek, (w + 1) * perWeek) });
  }
  return out;
}
