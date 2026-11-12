"use client";

import { useCallback, useEffect, useState } from "react";

/** Reads and writes the same per-browser store the study page uses (`pop-done:<classId>`). */
export function useDoneTopics(classId: string | undefined) {
  const key = classId ? `pop-done:${classId}` : null;
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      try { setDone(key ? JSON.parse(localStorage.getItem(key) ?? "[]") : []); } catch { setDone([]); }
    };
    const t = setTimeout(read, 0);
    window.addEventListener("storage", read);
    return () => { clearTimeout(t); window.removeEventListener("storage", read); };
  }, [key]);

  const toggle = useCallback((id: string) => {
    if (!key) return;
    setDone((cur) => {
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  }, [key]);

  return { done, toggle };
}
