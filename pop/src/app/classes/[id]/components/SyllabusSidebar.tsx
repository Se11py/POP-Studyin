"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, Check, FileText, BookMarked, ArrowRight } from "lucide-react";
import type { ClassData, LessonStatus } from "../classesData";

interface SyllabusSidebarProps {
  classId: string;
  classData: ClassData;
  expandedChapterId: number | null;
  onToggleChapter: (chapterId: number) => void;
  selectedLessonId: string | null;
  onSelectLesson: (chapterId: number, subTopicId: string, lessonId: string) => void;
  onOpenFormulaSheet: () => void;
  onOpenGlossary: () => void;
  currentLesson: {
    id: string;
    title: string;
    chapterTitle: string | null;
    practiceMarks: number;
    isComplete: boolean;
    onToggleComplete: () => void;
  } | null;
}

/** Coursera-style status marker shown to the left of each lesson. */
function StatusIcon({ status, isActive }: { status: LessonStatus; isActive: boolean }) {
  if (status === "completed") {
    return (
      <span className="w-[18px] h-[18px] rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
        <Check size={11} strokeWidth={3} />
      </span>
    );
  }
  // In-progress / active lessons get a half-filled ring; untouched ones stay hollow
  const inProgress = status === "in-progress" || isActive;
  return (
    <span
      className={`block w-[18px] h-[18px] rounded-full border-2 shrink-0 ${inProgress ? "border-[#0056D2]" : "border-gray-300"}`}
      style={inProgress ? { background: "linear-gradient(90deg, #0056D2 50%, transparent 50%)" } : undefined}
    />
  );
}

/** "Module 1: Motion, Forces and Energy" -> ["Module 1", "Motion, Forces and Energy"] */
function splitModuleTitle(title: string): [string | null, string] {
  const idx = title.indexOf(":");
  return idx === -1 ? [null, title] : [title.slice(0, idx), title.slice(idx + 1).trim()];
}

export default function SyllabusSidebar({
  classId,
  classData,
  expandedChapterId,
  onToggleChapter,
  selectedLessonId,
  onSelectLesson,
  onOpenFormulaSheet,
  onOpenGlossary,
  currentLesson,
}: SyllabusSidebarProps) {
  const allLessons = classData.topics.flatMap((t) => t.subTopics.flatMap((s) => s.lessons));
  const doneCount = allLessons.filter((l) => l.status === "completed").length;
  const progress = allLessons.length ? Math.round((doneCount / allLessons.length) * 100) : 0;

  return (
    <aside className="w-full lg:w-[19rem] bg-white border border-gray-200 rounded-2xl flex-shrink-0 self-start lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] flex flex-col">
      {/* Header */}
      <div className="relative bg-[#DFF2FC] px-5 pt-5 pb-4 rounded-t-2xl shrink-0">
        {/* off-centre accent shape */}
        <span className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <span className="absolute -right-6 -top-8 w-24 h-24 rounded-full bg-white/50" />
        </span>
        <p className="relative text-[11px] font-semibold text-[#0056D2] tracking-wide">
          {classData.level} &middot; {classData.board}
        </p>
        <h2 className="relative text-lg font-bold text-gray-900 leading-tight mt-0.5">{classData.syllabusCode}</h2>
        <p className="relative text-[11px] text-gray-600 mt-0.5">{classData.syllabusInfo}</p>

        {allLessons.length > 0 && (
          <div className="relative mt-4">
            <div className="flex items-baseline justify-between text-[11px] mb-1.5">
              <span className="text-gray-700">
                <span className="font-bold text-gray-900">{doneCount}</span> of {allLessons.length} lessons done
              </span>
              <span className="font-mono text-gray-500">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white overflow-hidden">
              <div className="h-full rounded-full bg-[#0056D2] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Current lesson */}
      {currentLesson && (
        <div className="px-5 py-3.5 border-b border-gray-100 shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 truncate">
            Now studying{currentLesson.chapterTitle ? ` · ${currentLesson.chapterTitle}` : ""}
          </p>
          <p className="text-[14px] font-bold text-gray-900 leading-snug mt-1">
            <span className="font-mono text-[12px] text-[#0056D2] mr-1.5">{currentLesson.id}</span>
            {currentLesson.title}
          </p>
          {currentLesson.practiceMarks > 0 && (
            <p className="text-[11px] text-gray-500 mt-1">{currentLesson.practiceMarks} practice marks available</p>
          )}
          <button
            onClick={currentLesson.onToggleComplete}
            className={`mt-3 w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
              currentLesson.isComplete
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                : "bg-[#0056D2] text-white hover:bg-[#0047ad]"
            }`}
          >
            <Check size={15} strokeWidth={2.5} />
            {currentLesson.isComplete ? "Completed" : "Mark as complete"}
          </button>
        </div>
      )}

      {/* Modules */}
      <nav className="flex-1 min-h-[12rem] overflow-y-auto py-2">
        {classData.topics.length === 0 && (
          <p className="px-5 py-6 text-sm text-gray-500">Modules for this subject are still being written — check back soon.</p>
        )}

        {classData.topics.map((chapter) => {
          const isExpanded = expandedChapterId === chapter.id;
          const [eyebrow, title] = splitModuleTitle(chapter.title);
          const lessons = chapter.subTopics.flatMap((s) => s.lessons);
          const done = lessons.filter((l) => l.status === "completed").length;
          const containsActive = lessons.some((l) => l.id === selectedLessonId);

          return (
            <div key={chapter.id} className={isExpanded ? "pb-2" : ""}>
              <button
                onClick={() => onToggleChapter(chapter.id)}
                aria-expanded={isExpanded}
                className="group w-full text-left px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  {eyebrow && (
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-[0.08em] ${
                        containsActive ? "text-[#0056D2]" : "text-gray-400"
                      }`}
                    >
                      {eyebrow}
                    </span>
                  )}
                  <span className={`block text-[13px] leading-snug ${isExpanded ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                    {title}
                  </span>
                  {lessons.length > 0 && (
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      {done}/{lessons.length} complete
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`mt-1 shrink-0 text-gray-400 group-hover:text-gray-700 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="mt-0.5">
                  {chapter.subTopics.length === 0 && (
                    <p className="px-5 py-2 text-xs text-gray-500">No lessons published yet.</p>
                  )}
                  {chapter.subTopics.map((sub) => (
                    <div key={sub.id} className="mb-1.5">
                      <p className="px-5 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        {sub.id} &nbsp;{sub.title}
                      </p>
                      {sub.lessons.map((lesson) => {
                        const isActive = lesson.id === selectedLessonId;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onSelectLesson(chapter.id, sub.id, lesson.id)}
                            className={`relative w-full text-left pl-5 pr-4 py-2 flex items-start gap-3 text-[13px] leading-snug transition-colors ${
                              isActive
                                ? "bg-[#DFF2FC]/70 text-gray-900 font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#0056D2]" />}
                            <span className="mt-px block">
                              <StatusIcon status={lesson.status} isActive={isActive} />
                            </span>
                            <span className="flex-1">
                              <span className={`font-mono text-[11px] mr-1.5 ${isActive ? "text-[#0056D2]" : "text-gray-400"}`}>
                                {lesson.id}
                              </span>
                              {lesson.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Study resources */}
      <div className="border-t border-gray-100 px-5 pt-4 pb-5 shrink-0">
        <h3 className="text-xs font-bold text-gray-900 mb-2">Keep these handy</h3>
        <div className="space-y-0.5 -mx-2">
          <button
            onClick={onOpenFormulaSheet}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-gray-600 hover:bg-gray-50 hover:text-[#0056D2] text-left"
          >
            <FileText size={15} className="text-gray-400 shrink-0" />
            Data &amp; formula sheet
          </button>
          <button
            onClick={onOpenGlossary}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-gray-600 hover:bg-gray-50 hover:text-[#0056D2] text-left"
          >
            <BookMarked size={15} className="text-gray-400 shrink-0" />
            Definitions glossary
          </button>
        </div>
        <Link
          href={`/classes/mock/${classId}`}
          className="group mt-4 flex items-center justify-between rounded-lg border border-[#0056D2] px-3.5 py-2.5 text-[13px] font-semibold text-[#0056D2] hover:bg-[#0056D2] hover:text-white transition-colors"
        >
          Sit a full mock exam
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </aside>
  );
}
