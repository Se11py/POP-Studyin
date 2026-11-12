import { useSyncExternalStore } from "react";

const EVENT = "pop-cat-change";
const KEY = "pop-cat-mode";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** True while cat mode is on. The flag lives on <html data-cat="on"> so CSS and components agree. */
export function useCatMode() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.cat === "on",
    () => false,
  );
}

export function setCatMode(on: boolean) {
  if (on) document.documentElement.dataset.cat = "on";
  else delete document.documentElement.dataset.cat;
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
