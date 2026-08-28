"use client";

import React from "react";
import { ArenaChoice, ARENA_CHOICES } from "../arena-data";

export function ShapeIcon({ shape, size = 28, color = "#fff" }: { shape: ArenaChoice["shape"]; size?: number; color?: string }) {
  const s = size;
  if (shape === "triangle")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5 21.5 20h-19L12 3.5Z" fill={color} />
      </svg>
    );
  if (shape === "diamond")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 22 12 12 22 2 12 12 2Z" fill={color} />
      </svg>
    );
  if (shape === "circle")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill={color} />
      </svg>
    );
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2.5" fill={color} />
    </svg>
  );
}

const FLOATERS = [
  { shape: 0, left: "6%", top: "14%", size: 54, delay: "0s", dur: "7s", opacity: 0.2 },
  { shape: 1, left: "88%", top: "18%", size: 44, delay: "1.2s", dur: "9s", opacity: 0.18 },
  { shape: 2, left: "12%", top: "72%", size: 62, delay: "0.6s", dur: "8s", opacity: 0.16 },
  { shape: 3, left: "82%", top: "66%", size: 50, delay: "2s", dur: "6.5s", opacity: 0.2 },
  { shape: 2, left: "46%", top: "6%", size: 34, delay: "1.6s", dur: "10s", opacity: 0.14 },
  { shape: 0, left: "68%", top: "84%", size: 40, delay: "0.3s", dur: "7.5s", opacity: 0.15 },
];

export function Atmosphere({ floor = true }: { floor?: boolean }) {
  return (
    <>
      <div className="arena-aurora" />
      {floor && <div className="arena-gridfloor" />}
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: f.left,
            top: f.top,
            opacity: f.opacity,
            animation: `arena-floaty ${f.dur} ease-in-out ${f.delay} infinite`,
          }}
        >
          <ShapeIcon shape={ARENA_CHOICES[f.shape].shape} size={f.size} color={ARENA_CHOICES[f.shape].color} />
        </div>
      ))}
      <div className="arena-noise" />
    </>
  );
}

export function ArenaWordmark({ size = "text-sm" }: { size?: string }) {
  return (
    <div className={`arena-display ${size} uppercase tracking-[0.35em] text-violet-300/80 flex items-center gap-2`}>
      <span className="inline-block h-2 w-2 rounded-full bg-[#00C6FB] shadow-[0_0_12px_#00C6FB]" />
      POP Arena
    </div>
  );
}

export function StreakBadge({ streak }: { streak: number }) {
  if (streak < 2) return null;
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-orange-300">
      <span className="arena-flame">🔥</span>
      {streak}
    </span>
  );
}
