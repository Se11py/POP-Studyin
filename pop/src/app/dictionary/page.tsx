"use client";

import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";

type Definition = {
  id: string;
  word: string;
  subject: string;
  meaning: string;
  example: string;
  context: string;
  goesTogether: string[];
  formula?: string;
  elements?: string[];
};

const definitionsData: Definition[] = [
  {
    id: 'acceleration',
    word: 'Acceleration',
    subject: 'Physics',
    meaning: 'The rate of change of velocity per unit of time.',
    example: 'The race car has a constant acceleration of 2 m/s² on the straight track.',
    context: 'Acceleration is a vector quantity, meaning it has both magnitude and direction. A negative acceleration (slowing down) is called deceleration.',
    goesTogether: ['Velocity', 'Speed', 'Deceleration', 'Force', 'Mass'],
    formula: 'a = (v - u) / t'
  },
  {
    id: 'isotope',
    word: 'Isotope',
    subject: 'Chemistry',
    meaning: 'Atoms of the same element that have the same number of protons but different numbers of neutrons.',
    example: 'Carbon-12 and Carbon-14 are both isotopes of Carbon.',
    context: 'Isotopes share the same chemical properties because they have the same electron configuration, but they have different physical properties (like mass).',
    goesTogether: ['Proton', 'Neutron', 'Atomic Mass', 'Radioactive', 'Element'],
    elements: ['Carbon-12 (¹²C)', 'Carbon-14 (¹⁴C)', 'Uranium-235 (²³⁵U)']
  },
  {
    id: 'mitosis',
    word: 'Mitosis',
    subject: 'Biology',
    meaning: 'A type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.',
    example: 'Skin cells reproduce rapidly through mitosis to replace dead skin.',
    context: 'Mitosis is essential for growth and repair in multicellular organisms. It consists of four main phases: prophase, metaphase, anaphase, and telophase.',
    goesTogether: ['Cell Division', 'Chromosomes', 'Meiosis', 'Nucleus', 'Diploid']
  },
  {
    id: 'photosynthesis',
    word: 'Photosynthesis',
    subject: 'Biology',
    meaning: 'The process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
    example: 'During photosynthesis, plants release oxygen as a byproduct.',
    context: 'Photosynthesis occurs in the chloroplasts and requires chlorophyll. The general equation is 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.',
    goesTogether: ['Chlorophyll', 'Chloroplast', 'Glucose', 'Sunlight', 'Carbon Dioxide']
  },
  {
    id: 'exothermic',
    word: 'Exothermic',
    subject: 'Chemistry',
    meaning: 'A reaction or process accompanied by the release of heat.',
    example: 'The combustion of methane is a highly exothermic reaction.',
    context: 'In an exothermic reaction, the products have less enthalpy (heat energy) than the reactants, resulting in a negative ΔH.',
    goesTogether: ['Endothermic', 'Combustion', 'Enthalpy', 'Heat', 'Reaction'],
    elements: ['CH₄ (Methane)', 'O₂ (Oxygen)', 'CO₂ (Carbon Dioxide)']
  },
  {
    id: 'velocity',
    word: 'Velocity',
    subject: 'Physics',
    meaning: 'The speed of something in a given direction.',
    example: 'The wind velocity was 40 km/h from the north.',
    context: 'Velocity is a vector quantity. Speed is the scalar equivalent of velocity (it has magnitude but no direction).',
    goesTogether: ['Speed', 'Acceleration', 'Displacement', 'Vector', 'Direction'],
    formula: 'v = Δs / Δt'
  }
];

const subjectsList = ["All", ...Array.from(new Set(definitionsData.map((d) => d.subject)))];

export default function DictionaryPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [selected, setSelected] = useState<Definition | null>(null);

  // Lock page scroll while a definition is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      definitionsData
        .filter(
          (d) =>
            (subject === "All" || d.subject === subject) &&
            (!q || d.word.toLowerCase().includes(q) || d.meaning.toLowerCase().includes(q))
        )
        .sort((a, b) => a.word.localeCompare(b.word)),
    [q, subject]
  );

  // Group alphabetically, then split the letters across two columns
  const letters = useMemo(() => {
    const map = new Map<string, Definition[]>();
    filtered.forEach((d) => {
      const k = d.word[0].toUpperCase();
      map.set(k, [...(map.get(k) ?? []), d]);
    });
    return Array.from(map.entries());
  }, [filtered]);
  const half = Math.ceil(letters.length / 2);
  const columns = [letters.slice(0, half), letters.slice(half)];

  return (
    <PageShell eyebrow="Dictionary — technical glossary" title="The glossary.">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-3">
        <div className="flex gap-7" role="tablist">
          {subjectsList.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={subject === s}
              onClick={() => setSubject(s)}
              className={`border-b-2 pb-2 text-[clamp(16px,1.25vw,20px)] font-bold transition-colors ${
                subject === s ? "border-[#111] text-[#111]" : "border-transparent text-[#a9a493] hover:text-[#111]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a word or definition"
          aria-label="Search a word or definition"
          className="w-full border-b border-[#111] bg-transparent py-2 text-[clamp(14px,1.1vw,17px)] outline-none placeholder:text-[#8d8978] sm:w-[min(100%,320px)]"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-2">
        {columns.map((col, ci) => (
          <div key={ci} className="space-y-[clamp(14px,2.4vh,28px)]">
            {col.map(([letter, words]) => (
              <section key={letter}>
                <h2 className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{letter}</h2>
                {words.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d)}
                    className="flex w-full items-center justify-between border-b border-[#d9d4c4] py-[clamp(8px,1.3vh,14px)] text-left transition-colors hover:bg-[#ece8da]"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[clamp(20px,1.7vw,26px)] font-bold leading-[1.1] tracking-[-0.02em]">{d.word}</h3>
                      <p className="mt-0.5 line-clamp-2 max-w-[60ch] text-[clamp(11px,0.85vw,13px)] leading-snug text-[#4a4a44]">{d.meaning}</p>
                    </div>
                    <span className="shrink-0 pl-4 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">{d.subject}</span>
                  </button>
                ))}
              </section>
            ))}
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="mt-10 text-lg">No definition matches “{query}”.</p>}

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={selected.word}>
          <div className="absolute inset-0 bg-[#111]/60" onClick={() => setSelected(null)} />
          <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto bg-[#f4f1e8] shadow-2xl">
            <div className="sticky top-0 flex items-start justify-between border-t-[4px] border-[#1c3bff] bg-[#f4f1e8] px-8 pb-4 pt-6">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wide text-[#1c3bff]">{selected.subject}</p>
                <h2 className="text-[clamp(34px,4vw,52px)] font-bold leading-none tracking-[-0.03em]">{selected.word}</h2>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close" className="text-2xl leading-none text-[#4a4a44] hover:text-[#111]">
                ×
              </button>
            </div>

            <div className="space-y-7 px-8 pb-8">
              <p className="border-l-[3px] border-[#1c3bff] pl-4 text-[20px] italic leading-snug">{selected.meaning}</p>

              {selected.formula && (
                <div className="bg-[#1c3bff] px-6 py-5 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">Formula</p>
                  <p className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-[clamp(24px,3vw,34px)] font-bold">{selected.formula}</p>
                </div>
              )}

              {selected.elements && (
                <div>
                  <p className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">Examples</p>
                  {selected.elements.map((el) => (
                    <p key={el} className="border-b border-[#d9d4c4] py-2 text-[16px] font-bold">{el}</p>
                  ))}
                </div>
              )}

              <div>
                <p className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">In a sentence</p>
                <p className="pt-2 text-[17px] italic leading-snug">“{selected.example}”</p>
              </div>

              <div>
                <p className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">Examiner insight</p>
                <p className="pt-2 text-[15px] leading-relaxed text-[#2a2a26]">{selected.context}</p>
              </div>

              <div>
                <p className="border-b-2 border-[#111] pb-1.5 text-[11px] font-bold uppercase tracking-wide text-[#1c3bff]">Goes together with</p>
                <div className="flex flex-wrap gap-2 pt-3">
                  {selected.goesTogether.map((w) => (
                    <span key={w} className="border border-[#111] px-3 py-1 text-[13px] font-bold">{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
