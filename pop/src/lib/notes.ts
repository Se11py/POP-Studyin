import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

export type RichText = { x: string; e?: 1; b?: 1; i?: 1; c?: 1 };
export type NoteBlock = {
  k: string;
  rt?: RichText[];
  x?: string;
  ch?: NoteBlock[];
  lang?: string;
  head?: boolean;
  rows?: RichText[][][];
};
export type TopicNotes = { title: string; hero?: string; blocks: NoteBlock[] };

const cache = new Map<string, Record<string, TopicNotes> | null>();

/** Revision notes imported from Notion, keyed by topic id (e.g. "G1.2"). Null when the class has none. */
export function loadNotes(classId: string): Record<string, TopicNotes> | null {
  if (!/^[a-z0-9-]+$/.test(classId)) return null;
  // In dev the JSON is re-read so a fresh import shows up without a restart
  if (process.env.NODE_ENV === "production" && cache.has(classId)) return cache.get(classId) ?? null;
  let data: Record<string, TopicNotes> | null = null;
  try {
    data = JSON.parse(readFileSync(path.join(process.cwd(), "src/data/notes", `${classId}.json`), "utf8"));
  } catch {
    data = null;
  }
  cache.set(classId, data);
  return data;
}
