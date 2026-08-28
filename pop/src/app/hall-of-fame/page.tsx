"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, ChevronDown, Medal, Users } from "lucide-react";

type Contributor = {
  name: string;
  initials: string;
  school: string;
  subjects: string[];
  contribution: string;
  resources: number;
  color: string;
  accent: string;
};

const contributors: Contributor[] = [
  {
    name: "Amelia Chen",
    initials: "AC",
    school: "Y13 Harrow International School",
    subjects: ["Mathematics", "Physics"],
    contribution: "Built clear, exam-ready walkthroughs for mechanics and calculus.",
    resources: 24,
    color: "bg-blue-700",
    accent: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    name: "Daniel Okafor",
    initials: "DO",
    school: "Y12 Bangkok Patana School",
    subjects: ["Biology"],
    contribution: "Turned complex cell biology into memorable visual revision notes.",
    resources: 18,
    color: "bg-emerald-600",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    name: "Sofia Williams",
    initials: "SW",
    school: "Y13 Shrewsbury International School",
    subjects: ["Chemistry", "Biology"],
    contribution: "Curated the reaction and molecular biology decks students return to.",
    resources: 31,
    color: "bg-rose-600",
    accent: "bg-rose-50 text-rose-700 border-rose-100",
  },
  {
    name: "Leo Martins",
    initials: "LM",
    school: "Y12 United World College Thailand",
    subjects: ["Computer Science"],
    contribution: "Made algorithms easier to understand through hands-on interactives.",
    resources: 12,
    color: "bg-violet-600",
    accent: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    name: "Nadia Rahman",
    initials: "NR",
    school: "Y13 British International School Phuket",
    subjects: ["English Literature", "History"],
    contribution: "Shared annotation frameworks that help ideas become stronger arguments.",
    resources: 16,
    color: "bg-amber-500",
    accent: "bg-amber-50 text-amber-800 border-amber-100",
  },
  {
    name: "Ethan Brooks",
    initials: "EB",
    school: "Y12 Bromsgrove International School Thailand",
    subjects: ["Mathematics", "Economics"],
    contribution: "Created challenging practice sets with explanations, not just answers.",
    resources: 21,
    color: "bg-cyan-600",
    accent: "bg-cyan-50 text-cyan-700 border-cyan-100",
  },
];

const subjects = ["All subjects", "Mathematics", "Sciences", "Humanities", "Computer Science"];

const subjectMatches = (contributor: Contributor, subject: string) => {
  if (subject === "All subjects") return true;
  if (subject === "Sciences") return contributor.subjects.some((item) => ["Physics", "Chemistry", "Biology"].includes(item));
  if (subject === "Humanities") return contributor.subjects.some((item) => ["History", "English Literature", "Economics"].includes(item));
  return contributor.subjects.includes(subject);
};

export default function HallOfFamePage() {
  const [activeSubject, setActiveSubject] = useState("All subjects");
  const filteredContributors = useMemo(
    () => contributors.filter((contributor) => subjectMatches(contributor, activeSubject)),
    [activeSubject]
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pt-20 md:pt-10 md:pl-64">
      <Sidebar />

      <main>
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">The contributor community</p><h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">The people behind the resources.</h2><p className="mt-4 max-w-2xl text-lg text-gray-600">Every contribution counts. Explore the students who are helping their peers learn with more confidence.</p></div>
            <div className="flex items-center gap-3 text-sm font-bold text-gray-500"><Users className="h-5 w-5 text-blue-700" /> 248 contributors and counting</div>
          </div>

          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-5">
            {subjects.map((subject) => (
              <button key={subject} onClick={() => setActiveSubject(subject)} className={`rounded px-4 py-2 text-sm font-bold transition-colors ${activeSubject === subject ? "bg-blue-700 text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-700"}`}>
                {subject}
              </button>
            ))}
            <div className="relative ml-auto hidden sm:block"><select aria-label="Filter contributors by subject" value={activeSubject} onChange={(event) => setActiveSubject(event.target.value)} className="appearance-none rounded border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm font-bold text-gray-600 outline-none focus:border-blue-700"><option>All subjects</option>{subjects.slice(1).map((subject) => <option key={subject}>{subject}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" /></div>
          </div>

          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContributors.map((contributor, index) => (
              <motion.article layout key={contributor.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="group flex min-h-[330px] flex-col rounded-lg border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                <div className="mb-7 flex items-start justify-between"><div className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white shadow-sm ${contributor.color}`}>{contributor.initials}</div><span className="flex items-center gap-1 rounded bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700"><Medal className="h-3.5 w-3.5" /> Featured</span></div>
                <div className="flex-1"><h3 className="text-2xl font-bold text-gray-900">{contributor.name}</h3><p className="mt-1 text-sm font-bold uppercase tracking-wider text-gray-400">{contributor.school}</p><p className="mt-5 leading-relaxed text-gray-600">{contributor.contribution}</p></div>
                <div className="mt-7 border-t border-gray-100 pt-5"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Contributed to</span><span className="flex items-center gap-1 text-xs font-bold text-gray-500"><BookOpen className="h-3.5 w-3.5" /> {contributor.resources} resources</span></div><div className="flex flex-wrap gap-2">{contributor.subjects.map((subject) => <span key={subject} className={`rounded border px-2.5 py-1 text-xs font-bold ${contributor.accent}`}>{subject}</span>)}</div></div>
              </motion.article>
            ))}
          </motion.div>

          {filteredContributors.length === 0 && <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center"><p className="font-bold text-gray-700">No contributors found for this subject yet.</p><button onClick={() => setActiveSubject("All subjects")} className="mt-3 text-sm font-bold text-blue-700 hover:text-blue-900">View everyone</button></div>}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8 md:pb-20"><div className="relative overflow-hidden rounded-lg bg-blue-700 px-8 py-12 text-white shadow-lg md:px-14 md:py-14"><div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border-[30px] border-blue-600" /><div className="relative z-10 max-w-2xl"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded bg-white/15"><CheckCircle2 className="h-6 w-6" /></div><h2 className="text-3xl font-bold md:text-4xl">Your notes could be next.</h2><p className="mt-4 text-lg leading-relaxed text-blue-100">Have a useful explanation, a great set of flashcards, or an interactive idea? Share what you know and help another student get unstuck.</p><button className="mt-8 inline-flex items-center gap-2 rounded bg-white px-6 py-3 font-bold text-blue-700 transition-colors hover:bg-blue-50">Become a contributor <ArrowRight className="h-5 w-5" /></button></div></div></section>
      </main>
    </div>
  );
}
