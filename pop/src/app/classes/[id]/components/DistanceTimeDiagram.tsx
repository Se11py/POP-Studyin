import React from "react";

/** Illustrative distance-time graph: A (rest) -> B (constant speed) -> C (accelerating, with tangent). */
export default function DistanceTimeDiagram() {
  return (
    <svg viewBox="0 0 760 300" className="w-full max-w-[720px] h-auto select-none font-sans">
      {/* Axes */}
      <line x1="50" y1="260" x2="720" y2="260" stroke="#111827" strokeWidth="2" />
      <line x1="50" y1="260" x2="50" y2="30" stroke="#111827" strokeWidth="2" />
      <text x="55" y="45" fill="#6b7280" fontSize="11" fontFamily="monospace">distance (d)</text>
      <text x="650" y="250" fill="#6b7280" fontSize="11" fontFamily="monospace">time (t)</text>

      {/* Section A: flat / at rest */}
      <path d="M 50 230 L 170 230" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      <text x="85" y="220" fontSize="11" fontWeight="bold" fill="#1e3a8a">A: at rest</text>

      {/* Section B: straight incline / constant speed */}
      <path d="M 170 230 L 400 130" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      <text x="230" y="165" fontSize="11" fontWeight="bold" fill="#1e3a8a">B: constant speed</text>

      {/* Section C: curved, steepening / accelerating */}
      <path d="M 400 130 Q 500 105 560 60 Q 600 32 650 15" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
      <text x="440" y="95" fontSize="11" fontWeight="bold" fill="#1e3a8a">C: accelerating</text>

      {/* Points */}
      <circle cx="170" cy="230" r="4" fill="#1e3a8a" />
      <circle cx="400" cy="130" r="4" fill="#1e3a8a" />
      <circle cx="600" cy="35" r="4" fill="#D32F2F" />

      {/* Tangent at the point on C, showing instantaneous speed */}
      <line x1="520" y1="100" x2="680" y2="5" stroke="#D32F2F" strokeWidth="2" strokeDasharray="5,4" />
      <text x="560" y="130" fontSize="11" fontWeight="bold" fill="#D32F2F">tangent = instantaneous speed</text>

      {/* Dashed helper lines for section B gradient */}
      <line x1="170" y1="230" x2="400" y2="230" stroke="#B0B9C3" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="400" y1="230" x2="400" y2="130" stroke="#B0B9C3" strokeWidth="1" strokeDasharray="3,3" />
      <text x="255" y="245" fontSize="10" fill="#6b7280" fontFamily="monospace">&Delta;t</text>
      <text x="408" y="185" fontSize="10" fill="#6b7280" fontFamily="monospace">&Delta;d</text>
    </svg>
  );
}
