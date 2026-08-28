"use client";

import { useSyncExternalStore } from "react";

export type Platform = "ios" | "android" | "desktop";

// User-agent never changes mid-session, so there's nothing to subscribe to —
// this just gives useSyncExternalStore a stable, hydration-safe read.
function subscribe() {
  return () => {};
}

function getSnapshot(): Platform {
  const ua = window.navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/android/i.test(ua)) return "android";
  return "desktop";
}

function getServerSnapshot(): Platform {
  return "desktop";
}

/** Coarse OS/device hint from the user agent — good enough for tailoring install instructions, not for anything security-sensitive. */
export function usePlatform(): Platform {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
