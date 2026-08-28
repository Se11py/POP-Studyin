"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3, ShieldCheck, RefreshCw, BookOpen, Clock, Brain, Flame, Atom, Calculator,
  ChevronRight, Sparkles, Calendar, Play, ArrowRight, Gamepad2, Users, MonitorPlay
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'flashcards'>('overview');

  const activeCourses = [
    {
      id: 'igcse-physics',
      name: 'Physics',
      subtitle: 'Co-ordinated Sciences Specialization',
      currentTopic: 'Module 1.2: Dynamics of Motion',
      theme: 'border-blue-100 bg-white hover:border-blue-300',
      icon: Atom,
      gradient: 'from-blue-600 to-blue-800',
    },
    {
      id: 'igcse-physics',
      name: 'Mathematics',
      subtitle: 'Core & Extended Syllabus',
      currentTopic: 'Module 4.1: Cumulative Frequency & Box Plots',
      theme: 'border-purple-100 bg-white hover:border-purple-300',
      icon: Calculator,
      gradient: 'from-purple-600 to-purple-800',
    }
  ];

  const activeFlashcardDecks = [
    {
      id: 'igcse-physics-kinematics-equations',
      title: 'Physics Kinematics Formulas',
      category: 'Physics',
      theme: 'border-amber-100 bg-amber-50/20 text-amber-800'
    },
    {
      id: 'igcse-chemistry-formulas',
      title: 'Chemical Bonding & Structure',
      category: 'Chemistry',
      theme: 'border-rose-100 bg-rose-50/20 text-rose-800'
    }
  ];

  // The four POP Arena answer tokens — kept in sync with the live game
  const arenaTokens = [
    { color: '#FF2E4D', shape: <path d="M12 3 22 20.5H2L12 3Z" /> },
    { color: '#2E6BFF', shape: <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z" /> },
    { color: '#FFC400', shape: <circle cx="12" cy="12" r="10" /> },
    { color: '#00E89B', shape: <rect x="2.5" y="2.5" width="19" height="19" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24 pt-20 md:pt-10 md:pl-64">
      {/* Universal Sidebar with Clerk Authentication */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="px-6 lg:px-8 max-w-7xl mx-auto space-y-8">

        {/* Welcome Greeting Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Brain size={180} className="text-blue-900" />
          </div>
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-widest text-blue-700 shadow-sm">
              <Sparkles size={12} fill="currentColor" />
              <span>Personalized Learning Desk</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back, {user?.firstName || 'Student'}!
            </h1>
            <p className="text-gray-500 text-sm max-w-xl">
              Pick up where you left off, or explore something new across your subjects today.
            </p>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="border-b border-gray-200 flex items-center gap-6 text-[15px] font-bold uppercase tracking-wider text-gray-400">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-4 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-700 text-blue-900' : 'border-transparent hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`pb-4 border-b-2 transition-colors ${activeTab === 'courses' ? 'border-blue-700 text-blue-900' : 'border-transparent hover:text-gray-700'}`}
          >
            My Courses
          </button>
          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`pb-4 border-b-2 transition-colors ${activeTab === 'flashcards' ? 'border-blue-700 text-blue-900' : 'border-transparent hover:text-gray-700'}`}
          >
            My Flashcards
          </button>
        </div>

        {/* Tab Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Columns */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Continue Learning Grid */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 font-serif">Continue Learning</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {activeCourses.map((course, idx) => {
                        const CourseIcon = course.icon;
                        return (
                          <div key={idx} className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col">
                            {/* Icon Header Strip */}
                            <div className={`h-24 bg-gradient-to-br ${course.gradient} flex items-center gap-4 px-6 relative overflow-hidden`}>
                              <CourseIcon size={72} className="absolute -right-3 -bottom-3 text-white/10" />
                              <div className="w-12 h-12 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0 relative z-10">
                                <CourseIcon size={24} className="text-white" />
                              </div>
                              <div className="relative z-10 min-w-0">
                                <h4 className="text-lg font-bold text-white leading-snug truncate">{course.name}</h4>
                                <p className="text-xs text-white/70 font-medium truncate">{course.subtitle}</p>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                  <BookOpen size={12} /> Currently on
                                </span>
                                <p className="text-sm font-bold text-gray-800 leading-snug">{course.currentTopic}</p>
                              </div>
                              <Link
                                href={`/classes/${course.id}`}
                                className="py-3 bg-blue-700 text-white rounded font-bold text-xs hover:bg-blue-800 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-blue-800"
                              >
                                <span>Resume Study</span>
                                <ChevronRight size={14} />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 font-serif">Registered Study Modules</h3>
                  <div className="space-y-4">
                    {activeCourses.map((course, idx) => (
                      <div key={idx} className={`p-8 rounded-lg border ${course.theme} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 hover:shadow-md transition-shadow`}>
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-100 uppercase tracking-widest text-blue-700">IGCSE / A-Level</span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{course.currentTopic}</span>
                          </div>
                          <h4 className="text-2xl font-bold text-gray-900">{course.name} Courses</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{course.subtitle}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-6 shrink-0 w-full sm:w-auto md:w-full lg:w-auto">
                          <Link
                            href={`/classes/${course.id}`}
                            className="py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
                          >
                            <span>Resume</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'flashcards' && (
                <motion.div
                  key="flashcards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 font-serif">In-Progress Flashcard Decks</h3>
                    <Link href="/flashcards" className="text-xs font-bold text-blue-700 hover:text-blue-900 uppercase tracking-widest flex items-center gap-1">
                      Explore All Decks <ChevronRight size={14} />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeFlashcardDecks.map((deck, idx) => (
                      <div key={idx} className={`p-6 rounded-lg border ${deck.theme} flex flex-col justify-between h-52 hover:shadow-md transition-shadow`}>
                        <div className="space-y-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white border uppercase tracking-widest text-gray-500 shadow-sm">
                            {deck.category}
                          </span>
                          <h4 className="text-lg font-bold text-gray-900">{deck.title}</h4>
                        </div>

                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Link 
                              href={`/flashcards/study/${deck.id}`} 
                              className="flex-1 py-2.5 bg-blue-700 text-white rounded font-bold text-xs hover:bg-blue-800 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2"
                            >
                              <Play size={12} fill="currentColor" />
                              <span>Continue Deck</span>
                            </Link>
                            <Link
                              href="/arena-2"
                              title={`Host ${deck.title} as a live POP Arena game`}
                              className="py-2.5 px-3 bg-gray-900 text-white rounded font-bold text-xs hover:bg-black transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0"
                            >
                              <Gamepad2 size={13} />
                              <span>Host</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Host POP Arena — turn any of these decks into a live game */}
                  <div className="relative overflow-hidden rounded-lg border border-gray-900 bg-[#0B0B0D] p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">POP Arena</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {arenaTokens.map((token) => (
                          <span
                            key={token.color}
                            className="grid h-6 w-6 place-items-center rounded-sm"
                            style={{ backgroundColor: token.color }}
                          >
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#0B0B0D" aria-hidden="true">
                              {token.shape}
                            </svg>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold text-white">Host a live match from any deck</h3>
                        <p className="text-sm leading-relaxed text-white/60 max-w-xl">
                          Turn a flashcard set into a fast-paced multiplayer quiz. Your screen becomes the projector view with a Game PIN, and everyone joins from their phone in seconds.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                          <span className="flex items-center gap-1.5"><Users size={12} /> Up to 40 players</span>
                          <span className="flex items-center gap-1.5"><Clock size={12} /> 15s rounds</span>
                          <span className="flex items-center gap-1.5"><MonitorPlay size={12} /> Projector view</span>
                          <span className="flex items-center gap-1.5"><Flame size={12} /> Streak bonuses</span>
                        </div>
                      </div>

                      <Link
                        href="/arena-2"
                        className="shrink-0 py-3.5 px-6 bg-white text-gray-900 rounded font-bold text-xs hover:bg-gray-100 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Gamepad2 size={14} />
                        <span>Host POP Arena</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar Columns */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Upcoming Events / Timetable Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Calendar size={18} className="text-blue-700" />
                Timetable & Clinics
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Mon</span>
                    <span className="text-sm font-bold text-blue-700">06</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">IGCSE Physics Clinic</h4>
                    <p className="text-xs text-gray-500">Wave superposition drills · 19:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-gray-50 border border-gray-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Wed</span>
                    <span className="text-sm font-bold text-gray-500">08</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Essay Review Submission</h4>
                    <p className="text-xs text-gray-500">Upload drafts by Friday midnight</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
        
      </main>
    </div>
  );
}
