"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Search, Plus, Languages, FlaskConical, History, Calculator, Brain, Code, Play, Flame, Trophy, Clock, Target, X, Trash2, Save, Filter, ChevronRight, BookOpen, LayoutGrid, Info } from 'lucide-react';

const initialFlashcardSets = [
  {
    id: 1,
    title: "Spanish Vocabulary Specialization",
    description: "Build essential conversational skills with this comprehensive vocabulary series.",
    cardCount: 127,
    lastStudied: "Reviewed 2 hours ago",
    progress: 85,
    category: "Languages",
    theme: "border-blue-100 bg-white",
    iconBg: "bg-blue-50",
    textColor: "text-blue-700",
    institution: "Language Faculty"
  },
  {
    id: 2,
    title: "Cell Biology & Molecular Genetics",
    description: "Explore the fundamental building blocks of life through detailed terminology and concepts.",
    cardCount: 89,
    lastStudied: "Reviewed 1 day ago",
    progress: 72,
    category: "Science",
    theme: "border-gray-200 bg-white",
    iconBg: "bg-gray-50",
    textColor: "text-gray-700",
    institution: "Biological Sciences"
  },
  {
    id: 3,
    title: "Modern World History: 1939-1945",
    description: "Analyze key geopolitical events, critical dates, and influential figures of the Second World War.",
    cardCount: 156,
    lastStudied: "Not yet started",
    progress: 0,
    category: "History",
    theme: "border-gray-200 bg-white",
    iconBg: "bg-gray-50",
    textColor: "text-gray-700",
    institution: "History Department"
  },
  {
    id: 4,
    title: "Advanced Calculus: Integration & Limits",
    description: "Master complex derivatives and integration techniques required for university-level mathematics.",
    cardCount: 78,
    lastStudied: "Reviewed 3 hours ago",
    progress: 91,
    category: "Math",
    theme: "border-blue-100 bg-white",
    iconBg: "bg-blue-50",
    textColor: "text-blue-700",
    institution: "Mathematical Institute"
  },
  {
    id: 5,
    title: "Introduction to Cognitive Psychology",
    description: "A deep dive into memory models, perception theories, and human learning mechanisms.",
    cardCount: 94,
    lastStudied: "Reviewed 5 days ago",
    progress: 45,
    category: "Psychology",
    theme: "border-gray-200 bg-white",
    iconBg: "bg-gray-50",
    textColor: "text-gray-700",
    institution: "Social Sciences"
  },
  {
    id: 6,
    title: "JavaScript Programming Fundamentals",
    description: "Learn modern ES6+ syntax, asynchronous patterns, and software engineering best practices.",
    cardCount: 112,
    lastStudied: "Reviewed 1 hour ago",
    progress: 88,
    category: "Programming",
    theme: "border-blue-100 bg-white",
    iconBg: "bg-blue-50",
    textColor: "text-blue-700",
    institution: "Computer Science"
  }
];

const studyProgress = [
  { id: 1, value: '7', label: 'Day Streak', icon: <Flame className="w-5 h-5 text-orange-600" />, detail: 'Consistent learning' },
  { id: 2, value: '342', label: 'Mastered', icon: <Trophy className="w-5 h-5 text-blue-600" />, detail: 'Total terms' },
  { id: 3, value: '24h', label: 'Time', icon: <Clock className="w-5 h-5 text-blue-600" />, detail: 'Study duration' },
  { id: 4, value: '82%', label: 'Score', icon: <Target className="w-5 h-5 text-green-600" />, detail: 'Average accuracy' },
];

const categories = [
  { id: 'Languages', icon: <Languages size={18} />, iconBg: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'Science', icon: <FlaskConical size={18} />, iconBg: 'bg-gray-100', textColor: 'text-gray-700' },
  { id: 'History', icon: <History size={18} />, iconBg: 'bg-gray-100', textColor: 'text-gray-700' },
  { id: 'Math', icon: <Calculator size={18} />, iconBg: 'bg-blue-50', textColor: 'text-blue-700' },
  { id: 'Psychology', icon: <Brain size={18} />, iconBg: 'bg-gray-100', textColor: 'text-gray-700' },
  { id: 'Programming', icon: <Code size={18} />, iconBg: 'bg-blue-50', textColor: 'text-blue-700' },
];

export default function CourseraFlashcardsPage() {
  const [sets, setSets] = useState(initialFlashcardSets);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSet, setNewSet] = useState({
    title: '',
    description: '',
    category: 'Languages',
    cards: [{ front: '', back: '' }]
  });

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const filteredSets = activeCategory === 'All' 
    ? sets 
    : sets.filter(s => s.category === activeCategory);

  const displayCategories = [{ id: 'All', icon: <LayoutGrid size={18} />, iconBg: 'bg-blue-700', textColor: 'text-white' }, ...categories];

  const handleSaveSet = () => {
    const categoryInfo = categories.find(c => c.id === newSet.category);
    const set = {
      id: Date.now(),
      title: newSet.title || "Untitled Specialization",
      description: newSet.description || "No course description provided.",
      cardCount: newSet.cards.length,
      lastStudied: "Just created",
      progress: 0,
      category: newSet.category,
      theme: "border-gray-200 bg-white",
      iconBg: "bg-gray-50",
      textColor: "text-gray-700",
      institution: "User Generated"
    };
    setSets([set, ...sets]);
    setIsModalOpen(false);
    setNewSet({
      title: '',
      description: '',
      category: 'Languages',
      cards: [{ front: '', back: '' }]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24 pt-20 md:pt-10 md:pl-64">
      <Sidebar />

      <main className="px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Academic Sidebar */}
        <aside className="w-full md:w-72 shrink-0 space-y-10">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Academic Categories</h3>
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
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Performance Metrics</h3>
            <div className="space-y-4">
              {studyProgress.map((stat) => (
                <div key={stat.id} className="bg-white border border-gray-200 p-4 rounded shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center border border-gray-100">
                      {stat.icon}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Learning Content Area */}
        <div className="flex-1 space-y-10">
          {/* Header Title Section */}
          <div className="bg-white p-10 rounded-lg border border-gray-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-700 text-sm font-bold uppercase tracking-wider">
                <BookOpen size={16} />
                Learning Resources
              </div>
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Authoritative Flashcards</h1>
              <p className="text-gray-600 max-w-xl">Meticulously curated study sets designed for deep academic retention and mock examination readiness.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search syllabus..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded px-11 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-700 transition-all"
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Plus size={18} /> Create Study Set
              </button>
            </div>
          </div>

          {/* Flashcard Sets Grid */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 font-serif italic">
                {activeCategory === 'All' ? 'Complete Curriculum' : `${activeCategory} Specializations`}
              </h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded">
                Showing {filteredSets.length} Modules
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSets.map((set) => (
                  <motion.div
                    key={set.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/flashcards/${set.id}`}>
                      <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                           <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Verified</span>
                        </div>

                        <div className="flex items-start gap-6 mb-6">
                          <div className={`w-16 h-16 rounded flex items-center justify-center border ${set.theme} shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                            {React.cloneElement((categories.find(c => c.id === set.category)?.icon || <BookOpen />) as React.ReactElement<{ size?: number }>, { size: 32 })}
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{set.institution}</div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">{set.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-2">
                          {set.description}
                        </p>

                        <div className="mt-auto space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                              <span className="text-gray-400">Completion Status</span>
                              <span className="text-blue-700">{set.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${set.progress}%` }}></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-4">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{set.cardCount} Terms</span>
                              <span className="text-xs text-gray-400 italic">{set.lastStudied}</span>
                            </div>
                            <div className="text-blue-700 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                              Access Module <ChevronRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredSets.length === 0 && (
              <div className="py-24 text-center space-y-6 bg-white rounded-lg border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100">
                  <LayoutGrid size={32} className="text-gray-300" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-gray-900 font-serif">No Modules Found</p>
                  <p className="text-gray-500 max-w-sm mx-auto">This category currently has no verified study materials available for your curriculum.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded font-bold text-sm transition-all shadow-md"
                >
                  Create Custom Module
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Coursera-style Modal for Creating Sets */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-900 text-white">
                <div>
                  <h2 className="text-2xl font-bold font-serif tracking-tight">Create Study Specialization</h2>
                  <p className="text-blue-200 text-sm font-medium mt-1">Design a structured academic module</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Specialization Title</label>
                      <input 
                        type="text" 
                        value={newSet.title}
                        onChange={(e) => setNewSet({...newSet, title: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-gray-900 font-bold focus:outline-none focus:border-blue-700 transition-all"
                        placeholder="e.g. Molecular Biochemistry"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Academic Faculty</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setNewSet({...newSet, category: cat.id})}
                            className={`px-3 py-2 rounded text-xs font-bold border transition-all ${
                              newSet.category === cat.id 
                              ? "bg-blue-50 border-blue-700 text-blue-700" 
                              : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                            }`}
                          >
                            {cat.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Specialization Description</label>
                    <textarea 
                      value={newSet.description}
                      onChange={(e) => setNewSet({...newSet, description: e.target.value})}
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-gray-900 font-medium focus:outline-none focus:border-blue-700 transition-all resize-none"
                      placeholder="Detailed overview of learning objectives..."
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Module Terms ({newSet.cards.length})</label>
                  </div>
                  
                  <div className="space-y-4">
                    {newSet.cards.map((card, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded border border-gray-200 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative group">
                        <div className="text-xs font-bold text-gray-400 shrink-0 w-6">{idx + 1}.</div>
                        <div className="flex-1 grid sm:grid-cols-2 gap-6 w-full">
                          <input 
                            type="text" 
                            placeholder="Prompt (Front)"
                            className="bg-white border border-gray-200 rounded px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-blue-700"
                          />
                          <input 
                            type="text" 
                            placeholder="Definition (Back)"
                            className="bg-white border border-gray-200 rounded px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-700"
                          />
                        </div>
                        <button className="text-gray-300 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setNewSet({...newSet, cards: [...newSet.cards, { front: '', back: '' }]})}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded text-gray-400 font-bold hover:border-blue-700 hover:text-blue-700 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={18} /> Add New Term
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Discard Changes
                </button>
                <button 
                  onClick={handleSaveSet}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-3 rounded font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Specialization
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
