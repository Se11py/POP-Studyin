"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { setCatMode, useCatMode } from "@/hooks/useCatMode";

const LINES = [
  "Revise exactly what the examiner asks.",
  "Short sessions beat long ones. Try 25 minutes, then rest.",
  "Read the command word first: state, explain and evaluate need different answers.",
  "Stuck? Post the paper question on the discussion board.",
  "Check the mark scheme wording after every answer.",
];

/** Site-wide cat mode: a toggle and the Prof Meow mascot. The palette lives in globals.css under [data-cat]. */
export default function CatMode() {
  const on = useCatMode();
  const pathname = usePathname();
  // The landing page has its own cat face, and a floating mascot would cover its calls to action.
  const landing = pathname === "/" || pathname === "/landing";
  const [line, setLine] = useState(0);

  return (
    <div className="cat-ui">
      {on && !landing && (
        <div className="cat-mascot">
          <p className="cat-bubble" aria-live="polite">{LINES[line]}</p>
          <button type="button" className="cat-prof" onClick={() => setLine((l) => (l + 1) % LINES.length)} aria-label="Prof Meow. Tap for another tip.">
            <Image src="/prof-meow.png" alt="" width={414} height={435} />
          </button>
        </div>
      )}
      <button type="button" role="switch" aria-checked={on} className="cat-toggle" onClick={() => setCatMode(!on)}>
        <span className="cat-track" aria-hidden="true"><span className="cat-knob" /></span>
        Cat mode
      </button>
    </div>
  );
}
