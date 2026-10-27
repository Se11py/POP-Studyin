"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { MathText } from "@/components/MathText";
import { BlockMath } from "react-katex";
import DistanceTimeDiagram from "./DistanceTimeDiagram";
import type { NotesContent } from "../lessonContent";

export default function NotesTab({ notes, onPracticeClick }: { notes: NotesContent; onPracticeClick: () => void }) {
  const [showWorkedExample, setShowWorkedExample] = useState(false);

  return (
    <div>
      {/* Article Metadata Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-gray-500 mb-2 uppercase">
          {notes.metaTags.map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 && <span>&bull;</span>}
              <span className={i === 0 ? "bg-blue-900 text-white rounded px-2 py-0.5 font-bold normal-case" : ""}>{tag}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-blue-900 tracking-tight">{notes.heading}</h1>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{notes.intro}</p>
      </div>

      <article className="text-gray-900 text-sm leading-relaxed space-y-4">
        <h2 className="text-lg font-bold text-blue-900 border-b border-gray-200 pb-1 uppercase tracking-wide">
          {notes.sectionTitle}
        </h2>

        <p>{notes.sectionIntro}</p>

        {/* Key Concept Box */}
        <div className="bg-gray-50 border-l-4 border-blue-700 rounded-r-lg p-4 text-gray-900 my-4">
          <span className="block text-[11px] font-bold text-blue-700 tracking-wider uppercase mb-1">{notes.keyConcept.label}</span>
          <p className="font-medium text-sm leading-snug">
            <MathText text={notes.keyConcept.body} />
          </p>
        </div>

        {/* Diagram */}
        <div className="my-6 border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
          <div className="text-xs font-bold text-blue-900 uppercase tracking-wide border-b border-gray-200 pb-2 mb-3">
            {notes.diagramCaption}
          </div>
          <div className="w-full overflow-x-auto flex justify-center py-2">
            <DistanceTimeDiagram />
          </div>
          <div className="text-[11px] text-gray-500 text-center mt-2 border-t border-gray-100 pt-1">{notes.diagramNote}</div>
        </div>

        {/* Comparison Table */}
        <h3 className="text-base font-bold text-blue-900 mt-6 mb-2 uppercase">{notes.tableTitle}</h3>
        <div className="overflow-x-auto my-3 border border-gray-200 rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-2.5 border-r border-blue-950 font-semibold w-1/5">Graph Feature</th>
                <th className="p-2.5 border-r border-blue-950 font-semibold w-1/5">Meaning</th>
                <th className="p-2.5 font-semibold">How to Find the Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {notes.tableRows.map((row) => (
                <tr key={row.feature}>
                  <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-200">{row.feature}</td>
                  <td className="p-2.5 border-r border-gray-200">{row.meaning}</td>
                  <td className="p-2.5 font-mono">
                    <MathText text={row.calculation} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exam Tip */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 text-amber-800 my-5">
          <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertTriangle size={16} className="text-amber-600" />
            <span>Exam Tip &mdash; Common IGCSE Trap</span>
          </div>
          <p className="text-xs leading-relaxed">{notes.examTip}</p>
        </div>

        {/* Worked Example */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-6 shadow-sm">
          <div
            className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
            onClick={() => setShowWorkedExample((v) => !v)}
          >
            <div className="flex items-center space-x-2">
              <span className="bg-blue-900 text-white text-[10px] font-bold rounded px-1.5 py-0.5">WORKED EXAMPLE</span>
              <span className="text-xs font-bold text-gray-900">{notes.workedExample.title}</span>
            </div>
            <span className="text-xs font-bold text-blue-700 underline">
              {showWorkedExample ? "Hide Solution ‹" : "Show Full Solution ›"}
            </span>
          </div>
          {showWorkedExample && (
            <div className="p-4 bg-white text-xs space-y-3">
              <p className="font-medium text-gray-900">
                <strong>Question:</strong> <MathText text={notes.workedExample.question} />
              </p>
              <div className="bg-gray-50 p-3 border border-gray-200 rounded-lg text-[11px] space-y-2 text-gray-800">
                {notes.workedExample.steps.map((step) => (
                  <div key={step.label}>
                    <div className="font-mono">
                      <strong className="text-blue-700">{step.label}</strong>
                    </div>
                    <BlockMath math={step.math} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-6 border-t border-gray-200 mt-8">
          <button
            onClick={onPracticeClick}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <span>Practice Topic Questions</span>
            <span>&rarr;</span>
          </button>
          <div className="text-xs text-gray-500">
            Up Next: <span className="font-bold text-gray-900">{notes.nextLessonTitle}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
