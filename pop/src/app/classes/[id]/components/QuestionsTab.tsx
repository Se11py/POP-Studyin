"use client";

import React, { useState } from "react";
import { PenLine } from "lucide-react";
import { MathText } from "@/components/MathText";
import type { QuestionCard } from "../lessonContent";

const difficultyBadge: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-900 border-emerald-300",
  medium: "bg-amber-100 text-amber-900 border-amber-300",
  hard: "bg-red-100 text-red-900 border-red-300",
};

const selfAssessmentStyle: Record<string, string> = {
  correct: "border-emerald-600 text-emerald-700 bg-emerald-50",
  review: "border-amber-600 text-amber-700 bg-amber-50",
  wrong: "border-red-600 text-red-700 bg-red-50",
};

type Difficulty = "all" | "easy" | "medium" | "hard";

export default function QuestionsTab({ questions }: { questions: QuestionCard[] }) {
  const [filter, setFilter] = useState<Difficulty>("all");
  const [openScratchpads, setOpenScratchpads] = useState<Record<string, boolean>>({});
  const [openMarkSchemes, setOpenMarkSchemes] = useState<Record<string, boolean>>({});
  const [mcqChoices, setMcqChoices] = useState<Record<string, string>>({});
  const [selfAssessment, setSelfAssessment] = useState<Record<string, "correct" | "review" | "wrong">>({});

  const visibleQuestions = filter === "all" ? questions : questions.filter((q) => q.difficulty === filter);

  return (
    <div>
      {/* Filter Controls Bar */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold uppercase text-[11px] text-gray-500">Difficulty:</span>
          <div className="flex border border-gray-200 bg-white rounded-lg overflow-hidden">
            {(["all", "easy", "medium", "hard"] as Difficulty[]).map((d, i) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-2.5 py-1 font-bold text-xs capitalize ${i > 0 ? "border-l border-gray-200" : ""} ${
                  filter === d ? "bg-blue-700 text-white" : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[11px] text-gray-500 font-mono">
          Showing <span className="font-bold text-blue-700">{visibleQuestions.length}</span> curated exam problems
        </div>
      </div>

      {visibleQuestions.map((q) => (
        <div key={q.id} className="border border-gray-200 rounded-lg bg-white p-5 mb-6 shadow-sm hover:shadow-md transition-shadow">
          {/* Meta Header */}
          <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3 mb-4 gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-900 text-white rounded px-2 py-0.5 text-xs font-mono font-bold">{q.paperCode}</span>
              <span className="text-xs font-bold text-gray-900">{q.questionNumber}</span>
              <span className={`border rounded text-[10px] px-1.5 font-bold uppercase ${difficultyBadge[q.difficulty]}`}>{q.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-50 border border-blue-200 text-blue-700 rounded font-mono font-bold text-xs px-2 py-0.5">
                {q.marks} MARK{q.marks !== 1 ? "S" : ""}
              </span>
              <button
                onClick={() => setOpenScratchpads((s) => ({ ...s, [q.id]: !s[q.id] }))}
                className="border border-gray-200 rounded px-2 py-0.5 text-xs font-medium hover:bg-gray-50 flex items-center gap-1"
              >
                <PenLine size={12} /> Scratchpad
              </button>
            </div>
          </div>

          {openScratchpads[q.id] && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold text-amber-900">Your Working Scratchpad</span>
              </div>
              <textarea
                placeholder="Type formula derivations, values or scratch math here..."
                className="w-full h-16 p-2 text-xs font-mono bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-700"
              />
            </div>
          )}

          {/* Body */}
          <div className="text-sm text-gray-900 space-y-3 leading-relaxed">
            {q.bodyParagraphs.map((p, i) => (
              <p key={i}>
                <MathText text={p} />
              </p>
            ))}

            {q.type === "structured" && q.parts && (
              <div className="space-y-2 text-xs">
                {q.parts.map((part) => (
                  <p key={part.label}>
                    <strong>{part.label}</strong> <MathText text={part.text} />{" "}
                    <span className="text-gray-500 font-mono">[{part.marks}]</span>
                  </p>
                ))}
              </div>
            )}

            {q.type === "mcq" && q.mcqOptions && (
              <div className="space-y-2 text-xs pt-1 max-w-lg">
                {q.mcqOptions.map((option) => (
                  <label
                    key={option.key}
                    onClick={() => setMcqChoices((s) => ({ ...s, [q.id]: option.key }))}
                    className={`flex items-center p-2.5 border rounded-lg cursor-pointer ${
                      mcqChoices[q.id] === option.key ? "border-blue-700 bg-blue-50/50" : "border-gray-200 hover:bg-blue-50/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      readOnly
                      checked={mcqChoices[q.id] === option.key}
                      className="mr-3"
                    />
                    <span>
                      <strong>{option.key}:</strong> <MathText text={option.text} />
                    </span>
                  </label>
                ))}

                {mcqChoices[q.id] &&
                  (() => {
                    const chosen = q.mcqOptions!.find((o) => o.key === mcqChoices[q.id]);
                    const isCorrect = chosen?.correct;
                    return (
                      <div
                        className={`mt-3 p-3 text-xs border-l-4 rounded-r-lg ${
                          isCorrect ? "bg-emerald-50 text-emerald-800 border-emerald-600" : "bg-red-50 text-red-900 border-red-600"
                        }`}
                      >
                        <strong>
                          {isCorrect ? `CORRECT (Option ${chosen?.key})` : `INCORRECT (${chosen?.key})`}
                        </strong>
                        <br />
                        <MathText text={isCorrect ? q.mcqCorrectExplanation ?? "" : q.mcqIncorrectExplanation ?? ""} />
                      </div>
                    );
                  })()}
              </div>
            )}
          </div>

          {/* Mark Scheme (structured only) */}
          {q.type === "structured" && q.markScheme && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => setOpenMarkSchemes((s) => ({ ...s, [q.id]: !s[q.id] }))}
                className="bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold px-4 py-2 flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <span>{openMarkSchemes[q.id] ? "▲" : "▼"}</span>
                <span>{openMarkSchemes[q.id] ? "HIDE" : "REVEAL"} MODEL ANSWER &amp; MARK SCHEME</span>
              </button>

              {openMarkSchemes[q.id] && (
                <div className="mt-3 p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg text-xs space-y-3">
                  <div className="font-bold text-emerald-800 uppercase tracking-wide border-b border-emerald-200 pb-1 flex justify-between items-center">
                    <span>Official Examiner Mark Scheme &amp; Guidance</span>
                    <span className="text-[10px] font-mono">Total: {q.markScheme.totalMarks} Marks</span>
                  </div>

                  <div className="space-y-2 font-mono text-gray-900">
                    {q.markScheme.parts.map((part) => (
                      <div key={part.partLabel} className="bg-white p-2 border border-emerald-200 rounded-lg">
                        <div className="font-bold text-blue-900">{part.partLabel}</div>
                        {part.lines.map((line, i) => (
                          <div key={i} className="flex justify-between items-center gap-2 mt-1">
                            <span>
                              <MathText text={line.text} />
                            </span>
                            <span className="bg-emerald-800 text-white font-bold rounded px-1.5 py-0.5 text-[10px] shrink-0">{line.tag}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {q.markScheme.examinerNote && (
                    <div className="bg-emerald-100/70 p-2.5 text-[11px] text-emerald-900 border-l-2 border-emerald-800 rounded-r">
                      <strong>EXAMINER REPORT COMMENT:</strong> {q.markScheme.examinerNote}
                    </div>
                  )}
                </div>
              )}

              {/* Self Assessment */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 text-xs">
                <span className="text-gray-500 text-[11px] font-semibold">Self Assessment:</span>
                {(
                  [
                    { key: "correct", label: "✓ Got It Right" },
                    { key: "review", label: "⟳ Review Later" },
                    { key: "wrong", label: "✕ Got Wrong" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSelfAssessment((s) => ({ ...s, [q.id]: opt.key }))}
                    className={`px-2.5 py-1 border rounded font-medium ${
                      selfAssessment[q.id] === opt.key ? selfAssessmentStyle[opt.key] : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
