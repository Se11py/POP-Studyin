/** Geometric cat face used in cat mode: ears, green eyes with slit pupils, nose, whiskers. */
export default function CatFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden>
      <polygon points="10,10 54,48 10,48" fill="#d9692e" />
      <polygon points="190,10 146,48 190,48" fill="#d9692e" />
      <polygon points="20,20 44,44 20,44" fill="#8a3f16" />
      <polygon points="180,20 156,44 180,44" fill="#8a3f16" />
      <polygon points="10,48 190,48 190,108 150,140 50,140 10,108" fill="#d9692e" />
      <polygon points="32,76 60,62 88,76 60,90" fill="#a8d86a" />
      <polygon points="112,76 140,62 168,76 140,90" fill="#a8d86a" />
      <rect x="58" y="64" width="4" height="24" fill="#2a2420" />
      <rect x="138" y="64" width="4" height="24" fill="#2a2420" />
      <polygon points="80,108 120,108 112,136 88,136" fill="#fff1dc" />
      <polygon points="90,106 110,106 100,116" fill="#f09a9a" />
      <path d="M100 116 v8 M92 130 l8 -6 l8 6" stroke="#2a2420" strokeWidth="2" fill="none" />
      <g stroke="#fff1dc" strokeWidth="1.5" opacity=".85">
        <line x1="2" y1="104" x2="46" y2="110" /><line x1="2" y1="116" x2="46" y2="116" />
        <line x1="198" y1="104" x2="154" y2="110" /><line x1="198" y1="116" x2="154" y2="116" />
      </g>
    </svg>
  );
}

export function PawTrail({ className }: { className?: string }) {
  const paw = (x: number, y: number, r: number) => (
    <g key={x} transform={`translate(${x} ${y}) rotate(${r})`} fill="#d9692e">
      <ellipse cx="0" cy="5" rx="7" ry="5.5" />
      <circle cx="-8" cy="-3" r="2.8" /><circle cx="-3" cy="-8" r="2.8" /><circle cx="3" cy="-8" r="2.8" /><circle cx="8" cy="-3" r="2.8" />
    </g>
  );
  return (
    <svg viewBox="0 0 200 60" className={className} aria-hidden>
      {paw(20, 40, -14)}{paw(66, 22, 10)}{paw(112, 44, -8)}{paw(158, 24, 12)}
    </svg>
  );
}
