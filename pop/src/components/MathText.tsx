"use client";

import React, { Fragment } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

/**
 * Renders a string containing inline $...$ LaTeX segments mixed with plain
 * text, e.g. "speed = $\\frac{\\Delta d}{\\Delta t}$ at every point".
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\$[^$]+\$)/g).filter((part) => part.length > 0);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith("$") && part.endsWith("$") ? (
          <InlineMath key={i} math={part.slice(1, -1)} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </span>
  );
}

/** Renders a standalone LaTeX expression (no surrounding $ delimiters needed) as a centered block equation. */
export function MathBlock({ math, className }: { math: string; className?: string }) {
  return (
    <div className={className}>
      <BlockMath math={math} />
    </div>
  );
}
