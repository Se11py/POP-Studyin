"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

type Lab = {
  id: string;
  name: string;
  subject: string;
  category: string;
  description: string;
  sims: string;
  status: string;
  path: string;
};

const labs: Lab[] = [
  {
    "id": "physics-vector-addition-components",
    "name": "Vector Addition & Components Lab",
    "subject": "Physics",
    "category": "Science",
    "description": "Resolve force vectors into perpendicular horizontal (Fx = F cos θ) and vertical (Fy = F sin θ) projections and calculate resultants.",
    "sims": "3 Simulators",
    "status": "Active",
    "path": "/interactives/physics-vector-addition-components"
  },
  {
    "id": "physics-motion-graphs",
    "name": "Motion Graphs Lab",
    "subject": "Physics",
    "category": "Science",
    "description": "Animate a vehicle along a track to plot and interpret displacement-time, velocity-time, and acceleration-time graphs.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/physics-motion-graphs"
  },
  {
    "id": "physics-weight-gravity",
    "name": "Weight, Gravity, & Planets Lab",
    "subject": "Physics",
    "category": "Science",
    "description": "Adjust planet masses and center-to-center distances to observe gravitational attraction forces in real-time.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/physics-weight-gravity"
  },
  {
    "id": "physics-density-archimedes",
    "name": "Density & Archimedes' Principle Lab",
    "subject": "Physics",
    "category": "Science",
    "description": "Submerge blocks in liquids of varying densities to calculate density ratios and study buoyant forces.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/physics-density-archimedes"
  },
  {
    "id": "physics-moments-balance",
    "name": "Moments & Balance Beam Lab",
    "subject": "Physics",
    "category": "Science",
    "description": "Place masses at varying distances along a pivot see-saw. Achieve mechanical equilibrium by balancing moments.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/physics-moments-balance"
  },
  {
    "id": "chemistry-titration-neutralization",
    "name": "Acid-Base Titration Simulator",
    "subject": "Chemistry",
    "category": "Science",
    "description": "Drip acid from a virtual burette to neutralize alkali in a conical flask, plotting dynamic pH curves.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/chemistry-titration-neutralization"
  },
  {
    "id": "chemistry-electron-shell",
    "name": "Atomic Structure Electron Shell Builder",
    "subject": "Chemistry",
    "category": "Science",
    "description": "Add subatomic particles to populate Bohr shells (2,8,8) and identify element properties.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/chemistry-electron-shell"
  },
  {
    "id": "chemistry-electrolysis-cell",
    "name": "Electrolysis Virtual Cell",
    "subject": "Chemistry",
    "category": "Science",
    "description": "Apply current to aqueous copper chloride to observe plating and gas evolution redox half-equations.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/chemistry-electrolysis-cell"
  },
  {
    "id": "math-trig-circle",
    "name": "Trigonometric Unit Circle Visualizer",
    "subject": "Mathematics",
    "category": "Math",
    "description": "Rotate a vector ray on a circle of radius r = 1 to map coordinates (x, y) to sine, cosine, and tangent.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/math-trig-circle"
  },
  {
    "id": "math-quadratic-functions",
    "name": "Quadratic Functions Grapher",
    "subject": "Mathematics",
    "category": "Math",
    "description": "Vary quadratic coefficients (a, b, c) and watch parabola root intersections and vertex coordinates shift.",
    "sims": "3 Simulators",
    "status": "Active",
    "path": "/interactives/math-quadratic-functions"
  },
  {
    "id": "math-sets-venn",
    "name": "Venn Diagram Shading Lab",
    "subject": "Mathematics",
    "category": "Math",
    "description": "Perform logical set operations (union, intersection, complement) and shade corresponding overlapping regions.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/math-sets-venn"
  },
  {
    "id": "biology-punnett-square",
    "name": "Punnett Square Genetic Breeder",
    "subject": "Biology",
    "category": "Science",
    "description": "Select parental genotypes to calculate heterozygous/homozygous phenotype offspring distributions.",
    "sims": "2 Simulators",
    "status": "Active",
    "path": "/interactives/biology-punnett-square"
  },
  {
    "id": "biology-enzyme-kinetics",
    "name": "Enzyme Kinetics Lab",
    "subject": "Biology",
    "category": "Science",
    "description": "Tweak substrate, pH, and temperature. Observe denaturing thresholds and lock-and-key fitting mechanics.",
    "sims": "3 Simulators",
    "status": "Active",
    "path": "/interactives/biology-enzyme-kinetics"
  }
];

const stats = [
  { value: "13", label: "Live labs" },
  { value: "150+", label: "Simulations run" },
  { value: "28/36", label: "Formulas mastered" },
];

const tabs = ["All", "Science", "Math"];
const leftSubjects = ["Physics", "Mathematics"];
const rightSubjects = ["Chemistry", "Biology"];

function LabRow({ lab }: { lab: Lab }) {
  const live = lab.status === "Active";
  const inner = (
    <>
      <div className="min-w-0">
        <h3 className="text-[clamp(18px,1.55vw,24px)] font-bold leading-[1.15] tracking-[-0.02em]">{lab.name}</h3>
        <p className="mt-0.5 line-clamp-2 max-w-[60ch] text-[clamp(11px,0.85vw,13px)] leading-snug text-[#4a4a44]">{lab.description}</p>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#8d8978]">{lab.sims}</p>
      </div>
      <span className="shrink-0 pl-4 text-sm font-bold text-[#1c3bff]">{live ? "Open →" : "Soon"}</span>
    </>
  );
  const cls = "flex items-center justify-between border-b border-[#d9d4c4] py-[clamp(8px,1.3vh,14px)]";
  return live ? (
    <Link href={lab.path} className={`${cls} transition-colors hover:bg-[#ece8da]`}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} opacity-60`}>{inner}</div>
  );
}

function Column({ subjects, items }: { subjects: string[]; items: Lab[] }) {
  return (
    <div className="space-y-[clamp(14px,2.4vh,28px)]">
      {subjects.map((subject) => {
        const rows = items.filter((l) => l.subject === subject);
        if (rows.length === 0) return null;
        return (
          <section key={subject}>
            <h2 className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{subject}</h2>
            {rows.map((l) => (
              <LabRow key={l.id} lab={l} />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default function InteractivesPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = labs.filter(
    (l) =>
      (tab === "All" || l.category === tab) &&
      (!q || l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.subject.toLowerCase().includes(q))
  );

  return (
    <PageShell eyebrow="Interactives — visual labs" title="The labs.">
      <div className="grid grid-cols-3 gap-x-8 border-b border-[#d9d4c4] py-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-[clamp(30px,2.8vw,46px)] font-bold leading-none tracking-[-0.03em] text-[#1c3bff]">{s.value}</div>
            <div className="mt-1 text-[12px] font-bold uppercase tracking-wide text-[#4a4a44]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 pt-3">
        <div className="flex gap-7" role="tablist">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`border-b-2 pb-2 text-[clamp(16px,1.25vw,20px)] font-bold transition-colors ${
                tab === t ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a lab or subject"
          aria-label="Search a lab or subject"
          className="w-full border-b border-[#111] bg-transparent py-2 text-[clamp(14px,1.1vw,17px)] outline-none placeholder:text-[#8d8978] sm:w-[min(100%,320px)]"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-2">
        <Column subjects={leftSubjects} items={visible} />
        <Column subjects={rightSubjects} items={visible} />
      </div>

      {visible.length === 0 && <p className="mt-10 text-lg">No lab matches “{query}”.</p>}
    </PageShell>
  );
}
