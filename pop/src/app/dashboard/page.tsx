"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit3, ShieldCheck, RefreshCw, BookOpen, Clock, Brain, Flame, Trophy, Target, 
  ChevronRight, Sparkles, Calendar, Play, ArrowRight, TrendingUp 
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'flashcards'>('overview');

  const activeCourses = [
    {
      id: 'igcse-physics',
      name: 'Physics',
      subtitle: 'Co-ordinated Sciences Specialization',
      progress: 75,
      currentTopic: 'Module 1.2: Dynamics of Motion',
      theme: 'border-blue-100 bg-white hover:border-blue-300',
      textColor: 'text-blue-700',
      barColor: 'bg-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'igcse-physics',
      name: 'Mathematics',
      subtitle: 'Core & Extended Syllabus',
      progress: 40,
      currentTopic: 'Module 4.1: Cumulative Frequency & Box Plots',
      theme: 'border-purple-100 bg-white hover:border-purple-300',
      textColor: 'text-purple-700',
      barColor: 'bg-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const activeFlashcardDecks = [
    {
      id: 'igcse-physics-kinematics-equations',
      title: 'Physics Kinematics Formulas',
      cardsCount: 35,
      reviewedCount: 22,
      lastStudied: 'Yesterday',
      category: 'Physics',
      theme: 'border-amber-100 bg-amber-50/20 text-amber-800'
    },
    {
      id: 'igcse-chemistry-formulas',
      title: 'Chemical Bonding & Structure',
      cardsCount: 28,
      reviewedCount: 10,
      lastStudied: '3 days ago',
      category: 'Chemistry',
      theme: 'border-rose-100 bg-rose-50/20 text-rose-800'
    }
  ];

  const recentActivity = [
    { type: 'quiz', label: 'Math Algebra Quiz', detail: 'Scored 92% readiness', time: '2 hours ago', color: 'bg-green-500' },
    { type: 'study', label: 'Completed 15 flashcards', detail: 'Kinematics formulas', time: 'Yesterday', color: 'bg-blue-500' },
    { type: 'mock', label: 'Mock Exam Submission', detail: 'Physics Paper 2 graded A*', time: '3 days ago', color: 'bg-purple-500' }
  ];

  const weeklyStudyHours = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 0.5 },
    { day: 'Thu', hours: 3.2 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 1.8 },
    { day: 'Sun', hours: 0.7 }
  ];

  const totalHours = weeklyStudyHours.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Universal Header with Clerk Authentication */}
      <Header />

      {/* Main Content Area */}
      <main className="pt-28 px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
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
              You are completing topic requirements on track. Review your flashcards and take a quick mock clinic to boost your metrics.
            </p>
          </div>

          {/* Quick Streak Indicator */}
          <div className="flex items-center gap-4 bg-orange-50 border border-orange-100 rounded-lg px-6 py-4 shrink-0 relative z-10 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md animate-pulse">
              <Flame size={20} fill="currentColor" />
            </div>
            <div>
              <div className="text-xl font-bold text-orange-950">5-Day Streak</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Keep it burning!</div>
            </div>
          </div>
        </div>

        {/* Overview Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Study Time Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Weekly Study Time</span>
              <div className="w-8 h-8 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center"><Clock size={16} /></div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">{totalHours} hrs</div>
              <div className="text-xs text-green-600 font-bold flex items-center gap-1">
                <TrendingUp size={14} /> +12% from last week
              </div>
            </div>
          </div>

          {/* Flashcard Mastered Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Decks Mastered</span>
              <div className="w-8 h-8 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center"><Brain size={16} /></div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">32 / 63</div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>

          {/* Active Syllabus Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Syllabus Completion</span>
              <div className="w-8 h-8 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center"><Target size={16} /></div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">58%</div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>

          {/* Exam Readiness Indicator */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Mock Readiness Avg.</span>
              <div className="w-8 h-8 bg-green-50 text-green-700 rounded-full flex items-center justify-center"><Trophy size={16} /></div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">89%</div>
              <div className="text-xs text-gray-500 font-bold">Strong exam candidacy</div>
            </div>
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
                      {activeCourses.map((course, idx) => (
                        <div key={idx} className={`p-8 rounded-lg border flex flex-col justify-between ${course.theme} shadow-sm group hover:shadow-md transition-shadow min-h-[260px]`}>
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-gray-900 leading-snug">{course.name}</h4>
                            <p className="text-xs text-gray-400 font-medium tracking-wide truncate">{course.subtitle}</p>
                            <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded inline-block uppercase tracking-wider">{course.currentTopic}</span>
                          </div>
                          <div className="space-y-5 pt-4">
                            <div>
                              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                <span>Progress</span>
                                <span className="text-gray-700">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full ${course.barColor}`} style={{ width: `${course.progress}%` }}></div>
                              </div>
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
                      ))}
                    </div>
                  </div>

                  {/* Weekly Activity Chart Block */}
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">Study Sessions Allocation</h3>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">July 2026</span>
                    </div>
                    
                    <div className="flex items-end justify-between gap-2 h-48 pt-4">
                      {weeklyStudyHours.map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                          {/* Hours tooltip */}
                          <div className="bg-blue-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute translate-y-[-180%] pointer-events-none shadow">
                            {bar.hours} hrs
                          </div>
                          {/* The Bar */}
                          <div className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-100/50 rounded-t transition-all flex items-end overflow-hidden h-full">
                            <div 
                              className="w-full bg-blue-600 group-hover:bg-blue-700 transition-colors rounded-t"
                              style={{ height: `${(bar.hours / 3.5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{bar.day}</span>
                        </div>
                      ))}
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
                          <div className="space-y-2 w-48">
                            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                              <span>Module Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${course.barColor}`} style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                          
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
                          <p className="text-xs text-gray-400 font-medium">Last studied: {deck.lastStudied}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                            <span>Reviewed</span>
                            <span>{deck.reviewedCount} / {deck.cardsCount} cards</span>
                          </div>
                          <Link 
                            href={`/flashcards/study/${deck.id}`} 
                            className="py-2.5 bg-blue-700 text-white rounded font-bold text-xs hover:bg-blue-800 transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-2"
                          >
                            <Play size={12} fill="currentColor" />
                            <span>Continue Deck</span>
                          </Link>
                        </div>
                      </div>
                    ))}
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

            {/* Recent Activity Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Recent Activity</h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="relative space-y-1">
                    <div className={`absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full ${activity.color} border-2 border-white shadow-sm`} />
                    <h4 className="font-bold text-xs text-gray-900">{activity.label}</h4>
                    <p className="text-[11px] text-gray-500">{activity.detail}</p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
        
      </main>
    </div>
  );
}
