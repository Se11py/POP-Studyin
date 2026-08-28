"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  BookOpen, ChevronRight, ShieldCheck, CheckCircle2, RefreshCw, Search, X,
  ExternalLink, GraduationCap, Clock, Star, Users
} from "lucide-react";
import { INITIAL_DOCUMENTS, SUBJECT_COURSES, SUBJECT_CONFIG, getSubjectGradient, getSubjectIconComponent } from "./data";

export default function CourseraContentLibraryEditor() {
  useUser();
  const documents = INITIAL_DOCUMENTS;

  // Filter States
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCourses = useMemo(() => {
    return SUBJECT_COURSES.filter((course) => {
      const matchesSubject = selectedSubject === "All" || course.subject === selectedSubject;
      const subjectDocs = documents.filter((d) => d.subject === course.subject);
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Published" && subjectDocs.some((d) => d.status === "published")) ||
        (selectedStatus === "Pending Review" && subjectDocs.some((d) => d.status === "pending_proofread"));

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.subject.toLowerCase().includes(query) ||
        subjectDocs.some((d) => d.title.toLowerCase().includes(query));

      return matchesSubject && matchesStatus && matchesSearch;
    });
  }, [documents, selectedSubject, selectedStatus, searchQuery]);

  // Statistics summaries
  const stats = useMemo(() => {
    const total = documents.length;
    const pending = documents.filter((d) => d.status === "pending_proofread").length;
    const published = documents.filter((d) => d.status === "published").length;
    const totalStudents = documents.reduce((acc, curr) => acc + curr.enrolledStudents, 0);
    return { total, pending, published, totalStudents };
  }, [documents]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-gray-900 font-sans selection:bg-blue-100 selection:text-[#0056D2] flex flex-col">
      
      {/* Coursera Header Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand logo & Subtitle */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/pop-logo.png" alt="POP Studying" width={1869} height={967} className="h-10 w-auto" priority />
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-6 border-l border-gray-200">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0056D2] bg-blue-50 px-2.5 py-1 rounded">
                Cambridge IGCSE Notion Workspace
              </span>
            </div>
          </div>

          {/* Center: Search input */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search Cambridge Notion syllabus notes, equations, code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100/80 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-[#0056D2] rounded-full text-xs transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions & User */}
          <div className="flex items-center gap-3">
            <Link
              href="/notion-sync"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-gray-700 hover:text-[#0056D2] hover:bg-blue-50 border border-gray-300 transition-all"
            >
              <RefreshCw size={14} className="text-indigo-600" />
              <span className="hidden sm:inline">2-Way Notion Sync</span>
            </Link>

            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Banner with Stats */}
        <div className="bg-gradient-to-r from-[#003B93] via-[#0056D2] to-[#0070F3] rounded-xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <GraduationCap size={280} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-blue-100 border border-white/20">
                <ShieldCheck size={14} className="text-blue-300" />
                <span>Cambridge IGCSE Syllabus Notion Integration</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                IGCSE Proofreading & Content Workbench
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                Review, proofread, and approve live Notion revision notes for <strong>IGCSE Physics (0625)</strong>, <strong>IGCSE Biology (0610)</strong>, and <strong>Co-ordinated Sciences (0654)</strong>.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-lg border border-white/20">
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-xl font-black text-white">{stats.total}</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Total Modules</div>
              </div>
              <div className="text-center px-2 border-r border-white/20">
                <div className="text-xl font-black text-amber-300">{stats.pending}</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Pending Review</div>
              </div>
              <div className="text-center px-2">
                <div className="text-xl font-black text-emerald-300">{stats.published}</div>
                <div className="text-[10px] text-blue-200 uppercase font-semibold">Published</div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher & Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {SUBJECT_CONFIG.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedSubject === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSubject(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? cat.activeBg
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={14} className={isSelected ? "text-white" : cat.iconColor} />
                  <span>{cat.label}</span>
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {cat.id === "All"
                      ? documents.length
                      : documents.filter(d => d.subject === cat.id).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-800 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-[#0056D2]"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published Live</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Cambridge IGCSE Subject Workspaces ({filteredCourses.length})
                </h2>
                <p className="text-xs text-gray-500">
                  Linked directly to your Notion workspace pages
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const subjectDocs = documents.filter((d) => d.subject === course.subject);
                const pendingCount = subjectDocs.filter((d) => d.status === "pending_proofread").length;
                const SubjectIcon = getSubjectIconComponent(course.subject);

                return (
                  <motion.div
                    key={course.subject}
                    whileHover={{ y: -3 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Course Card Header */}
                      <div className={`h-24 bg-gradient-to-r ${getSubjectGradient(course.subject)} p-5 flex items-center justify-between relative`}>
                        <div>
                          <span className="text-[10px] uppercase font-black tracking-widest text-white/80 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                            {course.code}
                          </span>
                          <h3 className="text-lg font-bold text-white mt-1">{course.title}</h3>
                        </div>
                        <SubjectIcon size={36} className="text-white/20" />
                      </div>

                      {/* Course Details */}
                      <div className="p-5 space-y-4">
                        <p className="text-xs text-gray-600 leading-relaxed min-h-[40px]">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between text-xs border-t border-b border-gray-100 py-3">
                          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                            <BookOpen size={14} className="text-[#0056D2]" />
                            <span>{subjectDocs.length} Notion Modules</span>
                          </div>
                          {pendingCount > 0 ? (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded">
                              {pendingCount} Needs Review
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded flex items-center gap-1">
                              <CheckCircle2 size={10} /> Fully Synced
                            </span>
                          )}
                        </div>

                        {/* Module Count + Summary Stats */}
                        <div className="pt-1 space-y-2">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                            Syllabus Modules ({subjectDocs.length})
                          </span>
                          <div className="flex items-center gap-4 text-[11px] text-gray-600 font-semibold">
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-amber-400 fill-amber-400" />
                              <span>
                                {subjectDocs.length > 0
                                  ? (subjectDocs.reduce((sum, d) => sum + d.rating, 0) / subjectDocs.length).toFixed(1)
                                  : "—"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-[#0056D2]" />
                              <span>{subjectDocs.reduce((sum, d) => sum + d.estimatedMinutes, 0)} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-emerald-500" />
                              <span>{subjectDocs.reduce((sum, d) => sum + d.enrolledStudents, 0).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                      <a
                        href={course.notionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-500 hover:text-[#0056D2] flex items-center gap-1 font-semibold"
                      >
                        <ExternalLink size={12} />
                        <span>Open in Notion</span>
                      </a>
                      
                      <Link
                        href={`/editor/${course.slug}`}
                        className="px-3.5 py-1.5 bg-[#0056D2] hover:bg-[#00419E] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <span>Open Workbench</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

      </main>
    </div>
  );
}
