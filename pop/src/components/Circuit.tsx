export default function Circuit({ id }: { id: string }) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55, pointerEvents: "none" }} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1">
        <polyline points="400,20 340,20 320,40 320,120 290,150" />
        <polyline points="400,60 360,60 345,75 345,160 310,195 250,195" />
        <polyline points="400,110 380,130 380,210 340,250 260,250" />
        <polyline points="400,170 395,175 395,300" />
        <polyline points="300,300 300,270 330,240 330,215" />
        <polyline points="220,300 220,280 250,260" />
        <polyline points="140,300 160,280 160,240 200,200 200,170" />
        <polyline points="60,300 90,270 90,225 130,185" />
        <polyline points="0,250 30,250 60,220 60,190" />
        <polyline points="0,200 20,180 20,150" />
        <rect x="280" y="90" width="50" height="35" />
        <rect x="150" y="215" width="40" height="28" />
      </g>
      <g fill="#fff" fillOpacity="0.5">
        <circle cx="320" cy="120" r="1.6" />
        <circle cx="345" cy="160" r="1.6" />
        <circle cx="250" cy="195" r="1.6" />
        <circle cx="260" cy="250" r="1.6" />
        <circle cx="330" cy="215" r="1.6" />
        <circle cx="200" cy="170" r="1.6" />
        <circle cx="130" cy="185" r="1.6" />
        <circle cx="60" cy="190" r="1.6" />
        <circle cx="20" cy="150" r="1.6" />
      </g>
    </svg>
  );
}
