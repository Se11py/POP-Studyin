"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, BookOpen, FileText, PlayCircle, Layers, ChevronRight, MessageSquare, MousePointerClick,
} from "lucide-react";

import { classesData, findDefaultLesson } from "./classesData";
import { lessonContent } from "./lessonContent";
import SyllabusSidebar from "./components/SyllabusSidebar";
import StudyRail from "@/components/StudyRail";
import NotesTab from "./components/NotesTab";
import QuestionsTab from "./components/QuestionsTab";
import PastPapersTab from "./components/PastPapersTab";
import VideoTab from "./components/VideoTab";
import FlashcardsTab from "./components/FlashcardsTab";
import DiscussionTab from "./components/DiscussionTab";
import InteractiveTab from "./components/InteractiveTab";
import PaperPreviewModal, { type PaperModalState } from "./components/PaperPreviewModal";

type TabId = "notes" | "questions" | "pastpapers" | "videos" | "flashcards" | "interactive" | "discussion";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "notes", label: "Revision Notes", icon: BookOpen },
  { id: "questions", label: "Topic Questions", icon: FileText },
  { id: "pastpapers", label: "Past Papers & MS", icon: Layers },
  { id: "videos", label: "Video Lessons", icon: PlayCircle },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "interactive", label: "Interactive", icon: MousePointerClick },
  { id: "discussion", label: "Discussion", icon: MessageSquare },
];

export default function ClassStudyPage() {
  const params = useParams();
  const classId = (params.id as string) || "igcse-physics";
  // Keyed so switching subject from the sidebar resets lesson/tab state
  return <ClassStudy key={classId} classId={classId} />;
}

function ClassStudy({ classId }: { classId: string }) {
  const classData = classesData[classId] || classesData["igcse-physics"];

  const defaultLesson = useMemo(() => findDefaultLesson(classData), [classData]);

  const [selection, setSelection] = useState(defaultLesson);
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(defaultLesson?.chapterId ?? null);
  const [activeTab, setActiveTab] = useState<TabId>("notes");
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [resourceModal, setResourceModal] = useState<PaperModalState | null>(null);

  const chapter = classData.topics.find((t) => t.id === selection?.chapterId) ?? null;
  const subTopic = chapter?.subTopics.find((s) => s.id === selection?.subTopicId) ?? null;
  const lesson = subTopic?.lessons.find((l) => l.id === selection?.lessonId) ?? null;

  const contentKey = selection ? `${classId}:${selection.lessonId}` : "";
  const content = lessonContent[contentKey];
  const isComplete = selection ? !!completedLessons[selection.lessonId] : false;

  const handleSelectLesson = (chapterId: number, subTopicId: string, lessonId: string) => {
    setSelection({ chapterId, subTopicId, lessonId });
    setActiveTab("notes");
  };

  const toggleChapter = (chapterId: number) => {
    setExpandedChapterId((current) => (current === chapterId ? null : chapterId));
  };

  const toggleComplete = () => {
    if (!selection) return;
    setCompletedLessons((s) => ({ ...s, [selection.lessonId]: !s[selection.lessonId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24 lg:pl-[84px]">
      <StudyRail classId={classId} />
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Main Study Canvas */}
        <main className="flex flex-col lg:flex-row gap-6">
          <SyllabusSidebar
            classId={classId}
            classData={classData}
            expandedChapterId={expandedChapterId}
            onToggleChapter={toggleChapter}
            selectedLessonId={selection?.lessonId ?? null}
            onSelectLesson={handleSelectLesson}
            onOpenFormulaSheet={() =>
              setResourceModal({ title: `${classData.name} Data & Formula Sheet`, code: "Reference Document" })
            }
            onOpenGlossary={() => setResourceModal({ title: "Official Definitions Glossary", code: "Reference Document" })}
            currentLesson={
              lesson
                ? {
                    id: lesson.id,
                    title: lesson.title,
                    chapterTitle: subTopic?.title ?? null,
                    practiceMarks: content ? content.questions.reduce((sum, q) => sum + q.marks, 0) : 0,
                    isComplete,
                    onToggleComplete: toggleComplete,
                  }
                : null
            }
          />

          <section className="flex-1 min-w-0">
            {!lesson ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-16 text-center space-y-3">
                <BookOpen size={40} className="text-gray-300 mx-auto" />
                <p className="text-lg font-bold text-gray-400">No lessons published for this subject yet.</p>
                <Link href="/classes" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">
                  <ArrowLeft size={12} /> Back to your classes
                </Link>
              </div>
            ) : (
              <>
                {/* Tab Nav */}
                <div className="bg-white border border-gray-200 border-b-0 rounded-t-lg overflow-hidden flex flex-wrap">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-auto min-w-[150px] justify-center px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
                          isActive
                            ? "border-blue-700 text-blue-700 bg-white"
                            : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-white bg-gray-50"
                        }`}
                      >
                        <Icon size={16} />
                        <span>{tab.label}</span>
                        {tab.id === "questions" && content && content.questions.length > 0 && (
                          <span className="bg-blue-700 text-white text-[10px] leading-none rounded px-1.5 py-1 ml-1">{content.questions.length}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm p-6 lg:p-8 min-h-[600px]">
                  {activeTab === "discussion" ? (
                    <DiscussionTab classId={classId} lessonId={lesson.id} lessonTitle={lesson.title} />
                  ) : !content ? (
                    <div className="py-24 text-center space-y-4">
                      <ChevronRight size={40} className="text-gray-300 mx-auto rotate-90" />
                      <p className="text-xl font-bold text-gray-400">Full study content for this lesson is coming soon.</p>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Try <button onClick={() => handleSelectLesson(1, "1.2", "1.2.2")} className="text-blue-700 font-bold underline">
                          1.2.2 Graphical Analysis: Distance-Time
                        </button>{" "}
                        for a fully built example of this study layout.
                      </p>
                    </div>
                  ) : (
                    <>
                      {activeTab === "notes" && <NotesTab notes={content.notes} onPracticeClick={() => setActiveTab("questions")} />}
                      {activeTab === "questions" && <QuestionsTab questions={content.questions} />}
                      {activeTab === "pastpapers" && (
                        <PastPapersTab papers={content.pastPapers} syllabusLabel={classData.syllabusCode} />
                      )}
                      {activeTab === "videos" && <VideoTab video={content.video} />}
                      {activeTab === "flashcards" && (
                        <FlashcardsTab deckTitle={`${subTopic?.title ?? classData.name} Deck`} cards={content.flashcards} />
                      )}
                      {activeTab === "interactive" && <InteractiveTab />}
                    </>
                  )}
                </div>
              </>
            )}
          </section>
        </main>
      </div>

      <PaperPreviewModal state={resourceModal} syllabusLabel={classData.syllabusCode} onClose={() => setResourceModal(null)} />
    </div>
  );
}
