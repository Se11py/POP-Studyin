"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowLeft, Play, Clock, Trophy, Target, BookOpen, Flame, ArrowRight, Activity, Lock
} from 'lucide-react';

const rushTopics = [
  { id: 'mechanics', title: 'Module 1: Classical Mechanics', progress: 45, icon: <Activity size={24} className="text-blue-700" /> },
  { id: 'energy', title: 'Module 2: Energy & Power', progress: 12, icon: <Zap size={24} className="text-orange-600" /> },
  { id: 'thermo', title: 'Module 3: Thermodynamics', progress: 0, icon: <Flame size={24} className="text-red-600" /> },
  { id: 'electro', title: 'Module 4: Electromagnetism', progress: 0, icon: <Target size={24} className="text-purple-600" /> },
  { id: 'nuclear', title: 'Module 5: Nuclear Physics', progress: 0, icon: <AtomIcon size={24} className="text-green-600" /> },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AtomIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"></path>
      <path d="M15.7 3.8c-2.04-2.03-7.36-.02-11.9 4.5-4.54 4.52-6.54 9.87-4.5 11.9 2.04 2.03 7.36.02 11.9-4.5 4.54-4.52 6.54-9.87 4.5-11.9Z"></path>
    </svg>
  );
}

export default function CourseraPhysicsRushDashboard() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Coursera-style Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/classes" className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-sm transition-colors group">
            <ArrowLeft size={18} />
            <span className="uppercase tracking-wider">Exit Specialization</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded shadow-sm">
              <Zap size={14} fill="currentColor" className="animate-pulse" />
              <span>Accelerated Mode</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="bg-blue-900 rounded-lg border border-blue-800 p-10 md:p-16 relative overflow-hidden text-white shadow-xl">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Zap size={300} className="text-white" />
            </div>
            
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-800 border border-blue-700 rounded text-[10px] font-bold uppercase tracking-widest text-blue-100 shadow-sm">
                <Flame size={14} fill="currentColor" className="text-orange-400" /> High-Velocity Curriculum
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight leading-tight">
                Physics <span className="text-blue-300 italic">Rushed</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl font-medium">
                Master the complete IGCSE Physics curriculum through highly concentrated, rigorous academic sprints. Zero filler, maximum efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-4 bg-white text-blue-900 rounded font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-widest">
                  <Play size={18} fill="currentColor" /> Initiate Sprint
                </button>
                <Link href="/physics-rush/visualizer" className="px-8 py-4 bg-blue-800 text-white rounded font-bold text-sm hover:bg-blue-700 transition-all border border-blue-600 flex items-center justify-center gap-2 shadow-md uppercase tracking-widest">
                  <Activity size={18} /> Equation Visualizer
                </Link>
                <button className="px-8 py-4 bg-blue-800 text-white rounded font-bold text-sm border border-blue-600 flex items-center justify-center gap-2 shadow-md uppercase tracking-widest opacity-50 cursor-not-allowed">
                  <Target size={18} /> Mock Arena
                </button>
              </div>
            </div>
          </motion.div>

          {/* Rush Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Core Modules', value: '5', icon: <BookOpen />, color: 'text-blue-700' },
              { label: 'Est. Completion', value: '20h+', icon: <Clock />, color: 'text-orange-600' },
              { label: 'Assessments', value: '100+', icon: <Trophy />, color: 'text-yellow-600' },
              { label: 'Mastery Accuracy', value: '94%', icon: <Activity />, color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 ${stat.color}`}>
                  {React.cloneElement(stat.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                </div>
                <span className="text-3xl font-bold text-gray-900 font-serif">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Topics Grid */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp} className="flex items-center justify-between border-b border-gray-200 pb-4 px-2">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Curriculum Modules</h2>
              <div className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
                45% Overall Completion
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rushTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  variants={fadeInUp}
                  className="bg-white rounded-lg border border-gray-200 p-8 flex flex-col hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="w-16 h-16 rounded bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                      {topic.icon}
                    </div>
                    {topic.progress === 100 ? (
                      <div className="text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100">
                        Mastered
                      </div>
                    ) : topic.progress === 0 ? (
                      <div className="text-gray-400">
                        <Lock size={20} />
                      </div>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-blue-700 transition-colors font-serif">{topic.title}</h3>

                  <div className="mt-auto space-y-6 relative z-10">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-500">Module Progress</span>
                        <span className={topic.progress > 0 ? "text-blue-700" : "text-gray-400"}>{topic.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <button className={`w-full py-3 rounded text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${topic.progress > 0 ? "bg-white text-blue-700 border-blue-200 hover:bg-blue-50" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                      {topic.progress > 0 ? 'Resume Module' : 'Locked'} <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp} className="bg-white rounded-lg border border-gray-200 p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm border-l-4 border-l-orange-500">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 font-serif">Accelerated Review Session</h3>
              <p className="text-sm font-medium text-gray-600 max-w-lg">Initiate a 5-minute rigorous academic quiz to solidify retention of recently covered methodologies.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white rounded font-bold uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-md text-sm">
                <Zap size={18} fill="currentColor" /> Lightning Quiz
              </button>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}