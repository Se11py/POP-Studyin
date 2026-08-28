"use client";

import React from "react";
import { ARENA_CHOICES, ArenaAvatar, ArenaChoice } from "../../arena/arena-data";

/** The four spec'd answer glyphs, drawn flat and heavy for projector legibility. */
export function Glyph({
  shape,
  size = 24,
  color = "#0a0a0b",
}: {
  shape: ArenaChoice["shape"];
  size?: number;
  color?: string;
}) {
  const paths: Record<ArenaChoice["shape"], React.ReactNode> = {
    triangle: <path d="M12 3 22 20.5H2L12 3Z" fill={color} />,
    diamond: <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z" fill={color} />,
    circle: <circle cx="12" cy="12" r="10" fill={color} />,
    square: <rect x="2.5" y="2.5" width="19" height="19" fill={color} />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[shape]}
    </svg>
  );
}

export function Wordmark({ live = true }: { live?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="a2-display text-2xl leading-none tracking-tight">
        POP<span className="text-[var(--a2-crimson)]">/</span>ARENA
      </span>
      {live && (
        <span className="a2-label flex items-center gap-1.5 border border-[var(--a2-bone-faint)] px-1.5 py-1 text-[var(--a2-bone-dim)]">
          <span className="a2-live-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--a2-crimson)]" />
          Live
        </span>
      )}
    </div>
  );
}

/**
 * Full-bleed stage: floodlights, print texture, broadcast rail and an optional
 * bottom ticker. Every screen mounts inside one of these.
 */
export function Stage({
  children,
  rail = "POP STUDYING · BANGKOK · IGCSE / A-LEVEL",
  ticker,
}: {
  children: React.ReactNode;
  rail?: string;
  ticker?: string[];
}) {
  return (
    <div className="a2">
      <div className="a2-floodlight" />
      <div className="a2-halftone" />
      <div className="a2-scanlines" />
      <div className="a2-grain" />

      <div className="a2-rail">
        <span className="a2-rail-text a2-label text-[var(--a2-bone-dim)]">{rail}</span>
      </div>

      <div
        className={`a2-stage relative z-10 flex min-h-[100dvh] flex-col ${
          ticker ? "pb-9" : ""
        }`}
      >
        {children}
      </div>

      {ticker && <Ticker items={ticker} />}
    </div>
  );
}

export function Ticker({ items }: { items: string[] }) {
  const feed = items.length ? items : ["STANDBY"];
  const run = [...feed, ...feed, ...feed, ...feed].slice(0, 40);
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t-2 border-[var(--a2-bone)] bg-[var(--a2-bone)] py-1.5">
      <div className="a2-ticker-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0">
            {run.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="a2-label flex shrink-0 items-center gap-3 px-4 text-[var(--a2-ink)]"
              >
                <span className="text-[var(--a2-crimson)]">◆</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StreakChip({ streak, dark = false }: { streak: number; dark?: boolean }) {
  if (streak < 2) return null;
  return (
    <span
      className={`a2-mono inline-flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-bold ${
        dark ? "bg-[var(--a2-ink)] text-[var(--a2-flame)]" : "bg-[var(--a2-flame)] text-[var(--a2-ink)]"
      }`}
    >
      <span className="a2-flame">🔥</span>
      {streak}
    </span>
  );
}

export function AvatarTile({
  avatar,
  size = 40,
  border = true,
}: {
  avatar: ArenaAvatar;
  size?: number;
  border?: boolean;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${border ? "border-2 border-[var(--a2-bone)]" : ""}`}
      style={{
        width: size,
        height: size,
        background: avatar.bg,
        fontSize: size * 0.5,
        lineHeight: 1,
      }}
    >
      {avatar.emoji}
    </span>
  );
}

/** Small legend of the four answer tokens — used on entry + lobby screens. */
export function TokenLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {ARENA_CHOICES.map((c) => (
        <div key={c.label} className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 place-items-center"
            style={{ background: c.color }}
          >
            <Glyph shape={c.shape} size={13} />
          </span>
          <span className="a2-label text-[var(--a2-bone-dim)]">{c.name}</span>
        </div>
      ))}
    </div>
  );
}
