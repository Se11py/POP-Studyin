"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Search, Plus, Atom, FlaskConical, Dna, Calculator, Briefcase, PenTool, Brain, Play, Clock, Target, CheckCircle2, ChevronRight, BookOpen, LayoutGrid, Sparkles, Filter, Award, Zap } from 'lucide-react';

const initialClassesData = [
  {
    id: 'physics-rushed',
    name: 'Physics Rushed',
    institution: 'ANS Science Faculty',
    subjectIcon: <Zap size={24} />,
    progress: 45,
    topicsDone: '5/11 Units',
    miniMocks: '4 Graded',
    nextUp: 'Sprint Module',
    category: 'Science',
    description: 'High-speed, zero fluff learning path. Master the entire IGCSE Physics curriculum in record time.',
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'igcse-physics',
    name: 'Physics — Co-ordinated Sciences',
    institution: 'ANS Science Faculty',
    subjectIcon: <Atom size={24} />,
    progress: 72,
    topicsDone: '8/11 Units',
    miniMocks: '2 Graded',
    nextUp: 'Work & Energy recap',
    category: 'Science',
    description: 'Advanced forces, electricity, and energetic principles tailored to the ANS Co-ordinated scheme.',
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'igcse-chemistry',
    name: 'Chemistry — Co-ordinated Sciences',
    institution: 'ANS Science Faculty',
    subjectIcon: <FlaskConical size={24} />,
    progress: 41,
    topicsDone: '4/11 Units',
    miniMocks: '1 Graded',
    nextUp: 'Ionic & covalent bonding',
    category: 'Science',
    theme: "border-gray-200 bg-white",
    textColor: "text-gray-700"
  },
  {
    id: 'igcse-biology',
    name: 'Biology — Co-ordinated Sciences',
    institution: 'ANS Science Faculty',
    subjectIcon: <Dna size={24} />,
    progress: 19,
    topicsDone: '0/11 Units',
    miniMocks: '0 Graded',
    nextUp: 'Cell structure intro',
    category: 'Science',
    theme: "border-gray-200 bg-white",
    textColor: "text-gray-700"
  },
  {
    id: 'igcse-math',
    name: 'Mathematics (Core/Extended)',
    institution: 'Mathematics Institute',
    subjectIcon: <Calculator size={24} />,
    progress: 58,
    topicsDone: 'Paper 2 focus',
    miniMocks: '3 Graded',
    nextUp: 'Algebra inequalities',
    category: 'Math',
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'igcse-business',
    name: 'IGCSE Business Studies',
    institution: 'Faculty of Commerce',
    subjectIcon: <Briefcase size={24} />,
    progress: 26,
    topicsDone: 'Unit 1 complete',
    miniMocks: '1 Graded',
    nextUp: 'Marketing mix analysis',
    category: 'Humanities',
    theme: "border-gray-200 bg-white",
    textColor: "text-gray-700"
  },
  {
    id: 'igcse-english',
    name: 'English Language Specialization',
    institution: 'Faculty of Arts',
    subjectIcon: <PenTool size={24} />,
    progress: 64,
    topicsDone: 'Writing drill',
    miniMocks: '2 Graded',
    nextUp: 'Summary question practice',
    category: 'Humanities',
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  }
];

const categories = [
  { id: 'Science', icon: <FlaskConical size={18} /> },
  { id: 'Math', icon: <Calculator size={18} /> },
  { id: 'Humanities', icon: <BookOpen size={18} /> },
  { id: 'Standardized Tests', icon: <Sparkles size={18} /> },
];

const metrics = [
  { label: 'Weekly Hours', value: '14.5h', icon: <Clock size={18} className="text-blue-600" /> },
  { label: 'Units Mastered', value: '28', icon: <Award size={18} className="text-blue-600" /> },
  { label: 'Mock Readiness', value: '82%', icon: <Target size={18} className="text-blue-600" /> },
];

export default function CourseraClassesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const filteredClasses = initialClassesData.filter(cls => {
    const matchesCategory = activeCategory === 'All' || cls.category === activeCategory;
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (cls.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayCategories = [{ id: 'All', icon: <LayoutGrid size={18} /> }, ...categories];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* High-Contrast Academic Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-700 flex items-center justify-center rounded">
                <span className="text-white text-xl font-bold font-serif tracking-tighter">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-blue-900">POP Studying</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-600">
              <Link href="/classes" className="text-blue-700 font-bold border-b-2 border-blue-700 transition-colors">Classes</Link>
              <Link href="/flashcards" className="hover:text-blue-700 transition-colors">Flashcards</Link>
              <Link href="/interactives" className="hover:text-blue-700 transition-colors">Interactives</Link>
              <Link href="/dictionary" className="hover:text-blue-700 transition-colors">Dictionary</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-500 hover:text-blue-700 transition-colors">
              <Search size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shadow-sm">
              JD
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Academic Sidebar */}
        <aside className="w-full md:w-72 shrink-0 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4">Academic Categories</h3>
            <div className="flex flex-col gap-1">
              {displayCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded text-sm font-bold transition-all group ${
                    activeCategory === cat.id 
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`${activeCategory === cat.id ? 'text-blue-700' : 'text-gray-400'}`}>
                      {cat.icon}
                    </span>
                    {cat.id}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat.id ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-6">Performance Metrics</h3>
            <div className="space-y-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 leading-none">{metric.value}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Classes Content */}
        <div className="flex-1 space-y-10">
          {/* Header */}
          <div className="bg-white p-10 rounded border border-gray-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-widest">
                <BookOpen size={14} />
                Enrolled Curriculum
              </div>
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Your Academic Paths</h1>
              <p className="text-gray-600 max-w-xl">Meticulously structured study modules designed for deep retention and authoritative exam readiness.</p>
            </div>
            
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search modules..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-11 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-700 transition-all"
              />
            </div>
          </div>

          {/* Classes Grid */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 font-serif italic">
                {activeCategory === 'All' ? 'Current Modules' : `${activeCategory} Specializations`}
              </h2>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded uppercase tracking-widest">
                {filteredClasses.length} active courses
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredClasses.map((cls) => (
                  <motion.div
                    key={cls.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={cls.id === 'physics-rushed' ? '/physics-rush' : `/classes/${cls.id}`}>
                      <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                           {cls.id === 'physics-rushed' ? (
                             <span className="bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest shadow-md">Specialized</span>
                           ) : (
                             <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Verified</span>
                           )}
                        </div>

                        <div className="flex items-start gap-6 mb-8">
                          <div className={`w-16 h-16 rounded flex items-center justify-center border ${cls.theme} shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                            {React.cloneElement(cls.subjectIcon as React.ReactElement<{ className?: string; size?: number }>, { className: cls.textColor, size: 32 })}
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cls.institution}</div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors pr-12">{cls.name}</h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-2">
                          {cls.description}
                        </p>

                        <div className="mt-auto space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                              <span className="text-gray-400">Curriculum Coverage</span>
                              <span className="text-blue-700">{cls.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${cls.progress}%` }}
                                className="h-full bg-blue-600 rounded-full" 
                              />
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-1">
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                              <Target size={10} /> Priority Next
                            </div>
                            <p className="text-xs font-bold text-gray-700">{cls.nextUp}</p>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</span>
                                <span className="text-xs font-bold text-gray-700">{cls.topicsDone}</span>
                              </div>
                              <div className="w-px h-6 bg-gray-200" />
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Mocks</span>
                                <span className="text-xs font-bold text-gray-700">{cls.miniMocks}</span>
                              </div>
                            </div>
                            <div className="text-blue-700 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                              Access Material <ChevronRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
