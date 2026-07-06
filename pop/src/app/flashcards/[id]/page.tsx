"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Play, Settings, Share2, MoreVertical, Flame, Trophy, Clock, Star, BookOpen, CheckCircle2, Award, Globe, Shield, Info, ExternalLink, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';

// Mock data for the specific set
const setDetails = {
  id: 1,
  title: "Spanish Vocabulary Specialization",
  description: "Master essential words and phrases for everyday academic and professional conversation. This module is specifically designed for intermediate learners aiming for curriculum mastery and effective bilingual communication.",
  category: "Languages",
  institution: "Faculty of Applied Linguistics",
  theme: "border-blue-100 bg-white",
  iconBg: "bg-blue-50",
  textColor: "text-blue-700",
  instructor: "Dr. Maria Rodriguez",
  lastUpdated: "April 2026",
  level: "Intermediate",
  rating: 4.8,
  enrollment: "12,405 students",
  cards: [
    { id: 1, front: "El desayuno", back: "Breakfast", difficulty: "Easy" },
    { id: 2, front: "Desarrollar", back: "To develop", difficulty: "Medium" },
    { id: 3, front: "Imprescindible", back: "Essential / Indispensable", difficulty: "Hard" },
    { id: 4, front: "La madrugada", back: "Early morning / Dawn", difficulty: "Medium" },
    { id: 5, front: "Echar de menos", back: "To miss (someone/something)", difficulty: "Hard" },
    { id: 6, front: "La manzana", back: "Apple", difficulty: "Easy" },
  ]
};

export default function CourseraFlashcardSetView() {
  const params = useParams();
  
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const getDifficultyTheme = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-700 bg-green-50 border-green-100';
      case 'Medium': return 'text-orange-700 bg-orange-50 border-orange-100';
      case 'Hard': return 'text-red-700 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      {/* High-Contrast Academic Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/flashcards" className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-sm transition-colors group">
            <ArrowLeft size={18} />
            <span className="uppercase tracking-wider">Back to Specializations</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-700 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-700 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Course Hero Section */}
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                  <span className="text-blue-700 uppercase tracking-widest">{setDetails.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">{setDetails.institution}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight">
                  {setDetails.title}
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                  {setDetails.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 font-bold">{setDetails.rating}</span>
                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-500 font-medium">
                    <span className="text-gray-900 font-bold">{setDetails.enrollment}</span> already enrolled
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    MR
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Instructor</div>
                    <div className="font-bold text-gray-900 underline decoration-blue-200 underline-offset-4 cursor-pointer hover:text-blue-700">{setDetails.instructor}</div>
                  </div>
                </div>
              </motion.div>

              {/* Learning Objectives Box */}
              <motion.div variants={fadeInUp} className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">What you will master</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Core conversational vocabulary", "Sentence structure patterns", "Common academic terminology", "Regional dialect nuances"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-blue-700 shrink-0 mt-1" size={18} />
                      <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sticky Enrollment Sidebar */}
            <div className="lg:col-span-4 relative">
              <motion.div 
                variants={fadeInUp}
                className="bg-white border border-gray-200 rounded shadow-xl p-8 sticky top-32 space-y-8"
              >
                <div className="space-y-4">
                  <div className="text-xs font-bold text-blue-700 uppercase tracking-widest">Enrollment Status</div>
                  <div className="text-3xl font-bold text-gray-900">Academic Access</div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">Full curriculum content included with your student credentials.</p>
                </div>

                <Link 
                  href={`/flashcards/study/${setDetails.id}`}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <Play size={20} fill="white" /> Start Studying
                </Link>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                      <Clock size={18} className="text-blue-700" /> 
                      Duration
                    </div>
                    <span className="font-bold">Approx. 45m</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                      <Globe size={18} className="text-blue-700" /> 
                      Language
                    </div>
                    <span className="font-bold">Spanish/English</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                      <Award size={18} className="text-blue-700" /> 
                      Certificate
                    </div>
                    <span className="font-bold">Verified Score</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Module Curriculum (Cards List) */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Specialization Content</h2>
              <p className="text-gray-500 text-sm mt-1">Detailed list of the {setDetails.cards.length} curriculum parameters included in this module.</p>
            </div>

            <div className="space-y-2">
              {setDetails.cards.map((card, idx) => (
                <div 
                  key={card.id}
                  className="bg-white border border-gray-100 hover:bg-gray-50 p-6 flex flex-col md:flex-row items-center gap-8 group transition-colors first:rounded-t-lg last:rounded-b-lg border-b-gray-200"
                >
                  <div className="text-gray-300 font-bold text-xl shrink-0 group-hover:text-blue-200 transition-colors w-10 text-center">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1 grid md:grid-cols-2 gap-8 w-full">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Academic Prompt</div>
                      <p className="text-lg font-bold text-gray-900">{card.front}</p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-1">Defined Term</div>
                      <p className="text-lg font-medium text-blue-900 italic">{card.back}</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-6">
                    <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getDifficultyTheme(card.difficulty)}`}>
                      {card.difficulty}
                    </span>
                    <button className="text-gray-300 hover:text-orange-400 transition-colors">
                      <Star size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pro Tips Section */}
          <motion.div variants={fadeInUp} className="bg-blue-900 text-white p-10 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <BookOpen size={120} />
            </div>
            <div className="relative z-10 space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <Info size={24} className="text-blue-300" />
                <h3 className="text-xl font-bold font-serif">Academic Strategy Tip</h3>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed">
                Utilize spaced repetition when studying this module. Engaging with these terms in 15-minute bursts over three days has shown to increase active recall by nearly 65% in peer-reviewed studies.
              </p>
              <button className="flex items-center gap-2 font-bold text-sm text-white group underline decoration-blue-400 underline-offset-8 decoration-2 hover:decoration-white transition-all">
                Read full academic methodology <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
