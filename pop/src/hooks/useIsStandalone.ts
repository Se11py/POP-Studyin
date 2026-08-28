"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(display-mode: standalone)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * True once we've confirmed the app is running standalone — added to the
 * home screen on iOS Safari (`navigator.standalone`) or launched as an
 * installed PWA elsewhere (`display-mode: standalone`).
 */
export function useIsStandalone(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
