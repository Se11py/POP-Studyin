"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { BookOpen, Layers, Activity, BookA, Compass, Trophy } from "lucide-react";
import { classesData } from "@/app/classes/[id]/classesData";

/** The platform's study tools — shared by the sidebar, the navbar and the class-page rail. */
export const toolLinks = [
  { label: "Classes", href: "/classes", icon: BookOpen },
  { label: "Flashcards", href: "/flashcards", icon: Layers },
  { label: "Interactives", href: "/interactives", icon: Activity },
  { label: "Dictionary", href: "/dictionary", icon: BookA },
  { label: "Blueprints", href: "/pathways", icon: Compass },
  { label: "Hall of Fame", href: "/hall-of-fame", icon: Trophy },
];

/**
 * A small string list kept in localStorage (per browser, best-effort) and shared live
 * between every component that reads it, including other tabs.
 */
function createStoredList(key: string, fallback: string[]) {
  const event = `${key}:changed`;
  const fallbackRaw = JSON.stringify(fallback);

  const read = () => {
    try {
      return localStorage.getItem(key) ?? fallbackRaw;
    } catch {
      return fallbackRaw;
    }
  };

  const subscribe = (onChange: () => void) => {
    window.addEventListener("storage", onChange);
    window.addEventListener(event, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(event, onChange);
    };
  };

  const parse = (raw: string): string[] => {
    try {
      const list = JSON.parse(raw);
      return Array.isArray(list) ? list.filter((x) => typeof x === "string") : fallback;
    } catch {
      return fallback;
    }
  };

  const write = (list: string[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(list));
      window.dispatchEvent(new Event(event));
    } catch {}
  };

  const useList = () => {
    const raw = useSyncExternalStore(subscribe, read, () => fallbackRaw);
    return useMemo(() => parse(raw), [raw]);
  };

  return { useList, get: () => parse(read()), write };
}

// ---- Recent subjects ----

const MAX_RECENT = 4;
const recentStore = createStoredList("pop:recent-subjects", []);

/** Call on a class page to move that subject to the front of the recent list. */
export function useRecordRecentSubject(classId?: string) {
  useEffect(() => {
    if (!classId) return;
    recentStore.write([classId, ...recentStore.get().filter((id) => id !== classId)].slice(0, MAX_RECENT));
  }, [classId]);
}

/** Recently opened subjects, newest first. Pass `exclude` to hide the subject you're already on. */
export function useRecentSubjects({ exclude, limit = 3 }: { exclude?: string; limit?: number } = {}) {
  const list = recentStore.useList();
  return useMemo(
    () =>
      list
        .filter((id) => id !== exclude && id in classesData)
        .slice(0, limit)
        .map((id) => ({ id, ...classesData[id] })),
    [list, exclude, limit],
  );
}

// ---- Pinned tools ----

const pinStore = createStoredList("pop:pinned-tools", ["/flashcards"]);

/** Pinned study tools (in pin order) plus a toggle. */
export function usePinnedTools() {
  const hrefs = pinStore.useList();
  const pinned = useMemo(
    () => hrefs.map((href) => toolLinks.find((t) => t.href === href)).filter((t): t is (typeof toolLinks)[number] => !!t),
    [hrefs],
  );
  const isPinned = (href: string) => hrefs.includes(href);
  const togglePin = (href: string) => {
    const current = pinStore.get();
    pinStore.write(current.includes(href) ? current.filter((h) => h !== href) : [...current, href]);
  };
  return { pinned, isPinned, togglePin };
}
