"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Edit3, Eye, CheckCircle2, Bold, Italic, Underline as UnderlineIcon,
  Strikethrough, List, ListOrdered, Lightbulb, ExternalLink, FileCheck, Check, Star, Users, Clock,
  ChevronRight, Paperclip, File, Video, Link2, Database
} from "lucide-react";
import {
  INITIAL_DOCUMENTS,
  SUBJECT_COURSES,
  getSubjectBadge,
  getSubjectIconComponent,
  type SyllabusResource,
} from "../data";

const getResourceIcon = (type: SyllabusResource["type"]) => {
  if (type === "pdf") return File;
  if (type === "video") return Video;
  if (type === "link") return Link2;
  if (type === "database") return Database;
  return FileCheck; // sub_page
};

export default function SubjectWorkbenchPage() {
  const params = useParams();
  const slug = params.slug as string;

  useUser();

  const course = useMemo(() => SUBJECT_COURSES.find((c) => c.slug === slug), [slug]);

  const [documents, setDocuments] = useState(() =>
    INITIAL_DOCUMENTS.filter((d) => d.subject === course?.subject)
  );

  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || "");
  const [activeTab, setActiveTab] = useState<"read" | "compare" | "edit">("read");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedResourceIds, setExpandedResourceIds] = useState<Set<string>>(new Set());

  const toggleResourceExpand = (docId: string) => {
    setExpandedResourceIds((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  const handleSelectDoc = (doc: (typeof documents)[number]) => {
    setSelectedDocId(doc.id);
    if (doc.resources && doc.resources.length > 0) {
      setExpandedResourceIds((prev) => new Set(prev).add(doc.id));
    }
    // "Compare" only exists for docs with a pending draft — fall back to Live view otherwise
    setActiveTab((prev) => (prev === "compare" && !doc.pendingDraft ? "read" : prev));
  };

  const editorRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState<string>("");

  const currentDoc = useMemo(() => {
    return documents.find((doc) => doc.id === selectedDocId) || documents[0];
  }, [documents, selectedDocId]);

  React.useEffect(() => {
    if (currentDoc) {
      setEditorContent(currentDoc.draftHtml || currentDoc.publishedHtml);
    }
  }, [currentDoc, activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveDraft = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId && doc.draftHtml) {
          return {
            ...doc,
            publishedHtml: doc.draftHtml,
            draftHtml: null,
            pendingDraft: null,
            status: "published",
            lastEditedBy: doc.pendingDraft?.author || doc.lastEditedBy,
            lastEditedAt: "Just now"
          };
        }
        return doc;
      })
    );
    showToast("✅ Revision note changes approved & synced live!");
    setActiveTab("read");
  };

  const handleSaveEditor = () => {
    if (!editorRef.current || !currentDoc) return;
    const updatedHtml = editorRef.current.innerHTML;
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === currentDoc.id) {
          return {
            ...doc,
            publishedHtml: updatedHtml,
            lastEditedAt: "Just now"
          };
        }
        return doc;
      })
    );
    showToast("💾 Content updates saved successfully!");
  };

  const execFormat = (cmd: string, val: string | undefined = undefined) => {
    document.execCommand(cmd, false, val);
  };

  const insertExaminerInsight = () => {
    const calloutHtml = `
      <div class="my-6 p-5 bg-blue-50/80 border-l-4 border-[#0056D2] rounded-r-lg shadow-xs my-4">
        <strong class="text-[#0056D2] text-sm font-bold block mb-1">💡 Examiner Mark Scheme Insight:</strong>
        <span class="text-blue-950 text-sm leading-relaxed">Insert specific Cambridge mark scheme tip or common student error warning here...</span>
      </div><p></p>
    `;
    execFormat("insertHTML", calloutHtml);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-6">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-xl font-bold text-gray-900">Subject workspace not found</h1>
          <p className="text-sm text-gray-500">
            We couldn&apos;t find a subject workspace for &ldquo;{slug}&rdquo;.
          </p>
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0056D2] hover:bg-[#00419E] text-white text-sm font-bold rounded shadow-xs"
          >
            <ArrowLeft size={15} />
            <span>Back to Subject Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const pendingCount = documents.filter((d) => d.status === "pending_proofread").length;
  const avgRating = documents.length > 0
    ? (documents.reduce((sum, d) => sum + d.rating, 0) / documents.length).toFixed(1)
    : "—";
  const totalMinutes = documents.reduce((sum, d) => sum + d.estimatedMinutes, 0);
  const totalStudents = documents.reduce((sum, d) => sum + d.enrolledStudents, 0);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-gray-900 font-sans selection:bg-blue-100 selection:text-[#0056D2] flex flex-col">

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#0056D2] text-white px-6 py-3.5 rounded-md shadow-2xl border border-blue-400/30 flex items-center gap-3 text-xs font-semibold tracking-wide"
          >
            <CheckCircle2 size={18} className="text-blue-200 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/editor" className="flex items-center">
              <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-10 w-auto" priority />
            </Link>

            <Link
              href="/editor"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#0056D2] transition-colors pl-6 border-l border-gray-200"
            >
              <ArrowLeft size={14} />
              <span>Subject Directory</span>
            </Link>
          </div>

          <UserButton />
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Subject Banner */}
        <div className="bg-gradient-to-r from-[#003B93] via-[#0056D2] to-[#0070F3] rounded-xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-blue-100 border border-white/20">
                {course.code}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                {course.description}
              </p>
              <a
                href={course.notionUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-100 hover:text-white font-semibold pt-1"
              >
                <ExternalLink size={13} />
                <span>Open subject page in Notion</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-5 gap-3 shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-lg border border-white/20">
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-xl font-black text-white">{documents.length}</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Modules</div>
              </div>
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-xl font-black text-amber-300">{pendingCount}</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Pending</div>
              </div>
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-xl font-black text-white flex items-center justify-center gap-1">
                  <Star size={14} className="text-amber-300 fill-amber-300" />
                  {avgRating}
                </div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Rating</div>
              </div>
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-xl font-black text-white flex items-center justify-center gap-1">
                  <Clock size={14} className="text-blue-200" />
                  {totalMinutes}
                </div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Minutes</div>
              </div>
              <div className="text-center px-2">
                <div className="text-xl font-black text-white flex items-center justify-center gap-1">
                  <Users size={14} className="text-blue-200" />
                  {totalStudents.toLocaleString()}
                </div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Workbench & Side-by-Side Editor */}
        {currentDoc ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left Sidebar: Document List */}
            <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Syllabus Notes ({documents.length})
                </span>
              </div>

              <div className="space-y-0.5 max-h-[700px] overflow-y-auto pr-1">
                {documents.map((doc) => {
                  const isSelected = doc.id === currentDoc.id;
                  const hasResources = !!doc.resources && doc.resources.length > 0;
                  const isExpanded = expandedResourceIds.has(doc.id);

                  return (
                    <div key={doc.id}>
                      {/* Topic row */}
                      <div
                        onClick={() => handleSelectDoc(doc)}
                        className={`group flex items-start gap-1.5 rounded-lg px-2 py-2 cursor-pointer transition-colors ${
                          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Disclosure triangle — only topics with nested resources get one */}
                        {hasResources ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleResourceExpand(doc.id);
                            }}
                            className="mt-0.5 shrink-0 p-0.5 rounded text-gray-400 hover:bg-gray-200/70 hover:text-gray-600 transition-colors"
                          >
                            <ChevronRight
                              size={13}
                              className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            />
                          </button>
                        ) : (
                          <span className="w-[18px] shrink-0" />
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className={`text-xs font-bold leading-snug truncate ${isSelected ? "text-[#0056D2]" : "text-gray-900"}`}>
                              {doc.title}
                            </h4>
                            {doc.status === "pending_proofread" && (
                              <span
                                title="Needs proofreading"
                                className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-0.5">
                            <span>{doc.level}</span>
                            <span>·</span>
                            <span>{doc.lastEditedAt}</span>
                            {hasResources && (
                              <>
                                <span>·</span>
                                <span className="inline-flex items-center gap-0.5">
                                  <Paperclip size={9} />
                                  {doc.resources!.length}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Nested resources — indented like a sub-page tree */}
                      {hasResources && isExpanded && (
                        <div className="ml-[27px] pl-3 border-l border-gray-200 my-0.5 space-y-0.5">
                          {doc.resources!.map((resource) => {
                            const ResourceIcon = getResourceIcon(resource.type);
                            return (
                              <a
                                key={resource.id}
                                href={resource.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group/resource flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] text-gray-600 hover:bg-gray-50 hover:text-[#0056D2] transition-colors"
                              >
                                <ResourceIcon size={12} className="shrink-0 text-gray-400 group-hover/resource:text-[#0056D2]" />
                                <span className="truncate flex-1">{resource.title}</span>
                                <ExternalLink size={10} className="shrink-0 text-gray-300 opacity-0 group-hover/resource:opacity-100 transition-opacity" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Document Viewer / Proofreading Workspace */}
            <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden flex flex-col">

              {/* Document Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50/50 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${getSubjectBadge(currentDoc.subject)} flex items-center gap-1.5`}>
                      {React.createElement(getSubjectIconComponent(currentDoc.subject), { size: 14 })}
                      {currentDoc.subject} ({currentDoc.code})
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {currentDoc.level}
                    </span>
                  </div>

                  <a
                    href={currentDoc.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#0056D2] font-semibold hover:underline"
                  >
                    <ExternalLink size={13} />
                    <span>View Notion Original Page</span>
                  </a>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    {currentDoc.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                    <span>Author School: <strong>{currentDoc.authorSchool}</strong></span>
                    <span>•</span>
                    <span>Last edited by <strong>{currentDoc.lastEditedBy}</strong> ({currentDoc.lastEditedAt})</span>
                  </p>
                </div>
              </div>

              {/* Workflow Tabs: Live | Compare Draft (only when relevant) | Edit */}
              <div className="flex items-center justify-between gap-3 px-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setActiveTab("read")}
                    className={`relative flex items-center gap-1.5 py-3.5 text-xs font-bold transition-colors ${
                      activeTab === "read" ? "text-[#0056D2]" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    <Eye size={14} />
                    <span>Live View</span>
                    {activeTab === "read" && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#0056D2]" />
                    )}
                  </button>

                  {currentDoc.pendingDraft && (
                    <button
                      onClick={() => setActiveTab("compare")}
                      className={`relative flex items-center gap-1.5 py-3.5 text-xs font-bold transition-colors ${
                        activeTab === "compare" ? "text-[#0056D2]" : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <FileCheck size={14} />
                      <span>Compare Draft</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {activeTab === "compare" && (
                        <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#0056D2]" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => setActiveTab("edit")}
                    className={`relative flex items-center gap-1.5 py-3.5 text-xs font-bold transition-colors ${
                      activeTab === "edit" ? "text-[#0056D2]" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                    {activeTab === "edit" && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#0056D2]" />
                    )}
                  </button>
                </div>

                {currentDoc.pendingDraft && (
                  <button
                    onClick={() => handleApproveDraft(currentDoc.id)}
                    className="shrink-0 my-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Check size={14} />
                    <span>Approve & Sync Live</span>
                  </button>
                )}
              </div>

              {/* Tab 1: Read Published Content */}
              {activeTab === "read" && (
                <div className="p-6 sm:p-8 space-y-6 max-h-[600px] overflow-y-auto">
                  <div
                    className="prose prose-blue max-w-none text-gray-800 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: currentDoc.publishedHtml }}
                  />
                </div>
              )}

              {/* Tab 2: Side-by-Side Compare Draft vs Original */}
              {activeTab === "compare" && (
                <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto bg-gray-50">
                  {currentDoc.pendingDraft ? (
                    <div className="space-y-4">
                      {/* Draft Author Alert Banner */}
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                            Pending Proofread Draft by {currentDoc.pendingDraft.author} ({currentDoc.pendingDraft.authorSchool})
                          </span>
                          <p className="text-xs text-amber-900">
                            <strong>Summary of updates:</strong> &ldquo;{currentDoc.pendingDraft.summary}&rdquo;
                          </p>
                        </div>

                        <button
                          onClick={() => handleApproveDraft(currentDoc.id)}
                          className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded shrink-0"
                        >
                          Approve Changes
                        </button>
                      </div>

                      {/* Side by side columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-lg border border-gray-200 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                            <span className="text-xs font-bold text-gray-500 uppercase">Live Published Version</span>
                            <span className="text-[10px] text-gray-400">Current</span>
                          </div>
                          <div
                            className="prose prose-sm text-xs leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{ __html: currentDoc.publishedHtml }}
                          />
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-amber-300 ring-2 ring-amber-500/10 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                            <span className="text-xs font-bold text-amber-800 uppercase">Submitted Student Draft</span>
                            <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                              Proposed
                            </span>
                          </div>
                          <div
                            className="prose prose-sm text-xs leading-relaxed text-gray-800"
                            dangerouslySetInnerHTML={{ __html: currentDoc.draftHtml || currentDoc.publishedHtml }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-2">
                      <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                      <h3 className="text-base font-bold text-gray-800">No Pending Drafts</h3>
                      <p className="text-xs text-gray-500">
                        This Cambridge revision module is fully proofread and up to date with Notion.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: WYSIWYG Editor Mode */}
              {activeTab === "edit" && (
                <div className="flex flex-col flex-1">

                  {/* Toolbar */}
                  <div className="p-3 bg-gray-100 border-b border-gray-200 flex flex-wrap items-center gap-1.5 text-gray-700">
                    <button
                      onClick={() => execFormat("bold")}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
                      title="Bold"
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      onClick={() => execFormat("italic")}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
                      title="Italic"
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      onClick={() => execFormat("underline")}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
                      title="Underline"
                    >
                      <UnderlineIcon size={15} />
                    </button>
                    <button
                      onClick={() => execFormat("strikeThrough")}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
                      title="Strikethrough"
                    >
                      <Strikethrough size={15} />
                    </button>

                    <div className="h-4 w-px bg-gray-300 mx-1" />

                    <button
                      onClick={() => execFormat("insertUnorderedList")}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
                      title="Bullet List"
                    >
                      <List size={15} />
                    </button>
                    <button
                      onClick={() => execFormat("insertOrderedList")}
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-700"
                      title="Numbered List"
                    >
                      <ListOrdered size={15} />
                    </button>

                    <div className="h-4 w-px bg-gray-300 mx-1" />

                    <button
                      onClick={insertExaminerInsight}
                      className="px-2.5 py-1 bg-[#0056D2] hover:bg-[#00419E] text-white text-xs font-bold rounded flex items-center gap-1 ml-auto"
                    >
                      <Lightbulb size={13} />
                      <span>+ Examiner Insight Box</span>
                    </button>
                  </div>

                  {/* Editable Content Area */}
                  <div className="p-6 sm:p-8 flex-1 min-h-[400px] max-h-[550px] overflow-y-auto">
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      className="prose prose-blue max-w-none text-gray-800 text-sm leading-relaxed outline-none min-h-[350px] focus:ring-0"
                      dangerouslySetInnerHTML={{ __html: editorContent }}
                    />
                  </div>

                  {/* Save Footer */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Changes will be saved directly to the revision dataset.
                    </span>
                    <button
                      onClick={handleSaveEditor}
                      className="px-5 py-2 bg-[#0056D2] hover:bg-[#00419E] text-white text-xs font-bold rounded shadow-xs flex items-center gap-2"
                    >
                      <FileCheck size={15} />
                      <span>Save Note Updates</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-sm text-gray-500">
            No syllabus modules found for this subject yet.
          </div>
        )}

      </main>
    </div>
  );
}
