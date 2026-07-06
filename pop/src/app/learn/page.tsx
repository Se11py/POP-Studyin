"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight,
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Zap,
  Target,
  Bookmark,
  BookOpen,
  HelpCircle,
  MessageCircle,
  FileText,
  Video,
  List,
  Copy,
  ExternalLink,
  Check,
  Sparkles
} from 'lucide-react';

// Dummy Data for A Level Physics
const PHYSICS_CONTENT = {
  subject: "Physics",
  level: "A Level",
  topic: "Particle Physics",
  title: "The Standard Model",
  estimatedTime: "25 mins",
  difficulty: "Advanced",
  progress: 65,
  sections: [
    {
      id: "introduction",
      title: "Introduction to Particles",
      content: `
        <p>At the most fundamental level, everything in the universe is made of a small number of basic building blocks called <strong>elementary particles</strong>, governed by four fundamental forces.</p>
        <p>Our best understanding of how these particles and three of the forces are related to each other is encapsulated in the <strong>Standard Model of particle physics</strong>.</p>
        <div class="bg-blue-50 border-l-4 border-blue-700 p-6 my-8 rounded-r">
          <p class="text-blue-900 font-bold flex items-center gap-2 mb-2 uppercase text-xs tracking-widest">
            <span class="text-sm">📝</span> Note from Faculty
          </p>
          <p class="text-blue-800 italic text-sm leading-relaxed font-medium">The Standard Model is the theoretical framework that describes the electromagnetic, weak, and strong nuclear interactions.</p>
        </div>
      `
    },
    {
      id: "quarks",
      title: "Quarks and Leptons",
      content: `
        <p>Matter particles are divided into two main groups: <strong>Quarks</strong> and <strong>Leptons</strong>. Each group consists of six particles, which are related in pairs, or "generations".</p>
        <h3 class="text-2xl font-bold mt-10 mb-4 text-gray-900 font-serif">The Six Quarks</h3>
        <ul class="list-disc ml-6 space-y-4 text-gray-700">
          <li><strong>Up (u)</strong> and <strong>Down (d)</strong>: The lightest and most stable.</li>
          <li><strong>Charm (c)</strong> and <strong>Strange (s)</strong>: Heavier and found in high-energy collisions.</li>
          <li><strong>Top (t)</strong> and <strong>Bottom (b)</strong>: The heaviest and most recently discovered.</li>
        </ul>
        <p class="mt-8">Protons are made of <strong>two up quarks and one down quark (uud)</strong>, while neutrons are made of <strong>one up quark and two down quarks (udd)</strong>.</p>
      `
    },
    {
      id: "forces",
      title: "Fundamental Forces",
      content: `
        <p>There are four fundamental forces in the universe, three of which are described by the Standard Model:</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div class="p-6 bg-white border border-gray-200 rounded shadow-sm hover:border-blue-700 transition-all">
            <h4 class="font-bold text-gray-900 mb-2 font-serif">Strong Nuclear</h4>
            <p class="text-sm text-gray-600 leading-relaxed">Holds atomic nuclei together. Carried by the <strong>Gluon</strong>.</p>
          </div>
          <div class="p-6 bg-white border border-gray-200 rounded shadow-sm hover:border-blue-700 transition-all">
            <h4 class="font-bold text-gray-900 mb-2 font-serif">Electromagnetic</h4>
            <p class="text-sm text-gray-600 leading-relaxed">Responsible for electricity and magnetism. Carried by the <strong>Photon</strong>.</p>
          </div>
          <div class="p-6 bg-white border border-gray-200 rounded shadow-sm hover:border-blue-700 transition-all">
            <h4 class="font-bold text-gray-900 mb-2 font-serif">Weak Nuclear</h4>
            <p class="text-sm text-gray-600 leading-relaxed">Responsible for radioactive decay. Carried by <strong>W and Z bosons</strong>.</p>
          </div>
        </div>
        <p class="text-gray-500 italic text-sm border-t border-gray-100 pt-4">Note: Gravity is the fourth force but is currently not part of the Standard Model.</p>
      `
    }
  ]
};

// Simplified local dictionary database
const DICTIONARY_DATABASE: Record<string, { definition: string, category: string }> = {
  "distance": { definition: "The total length of the path travelled by an object, measured in metres (m). Distance is a scalar quantity and does not depend on direction.", category: "Physics" },
  "displacement": { definition: "The straight-line distance from initial position to final position, measured in metres (m), with direction specified. Displacement is a vector quantity.", category: "Physics" },
  "velocity": { definition: "The rate of change of displacement with respect to time, measured in metres per second (m/s), with direction specified.", category: "Physics" },
  "acceleration": { definition: "The rate of change of velocity with respect to time, measured in metres per second squared (m/s²).", category: "Physics" },
  "quarks": { definition: "Elementary particles and a fundamental constituent of matter. Quarks combine to form composite particles called hadrons (protons/neutrons).", category: "Physics" },
  "bosons": { definition: "Force-carrier particles that mediate fundamental interactions. For example, photons carry the electromagnetic force.", category: "Physics" }
};

// Journey Data for Sidebar
const JOURNEY_DATA = {
  topics: [
    { id: "atomic-structure", title: "Atomic Structure", level: "Foundation", status: "completed" },
    { id: "nuclear-radiation", title: "Nuclear Radiation", level: "Foundation", status: "completed" },
    { id: "energetics", title: "Energetics", level: "Intermediate", status: "completed" },
    { id: "particle-physics", title: "Particle Physics", level: "Advanced", status: "current" },
    { id: "quantum-phenomena", title: "Quantum Phenomena", level: "Advanced", status: "next" },
    { id: "medical-physics", title: "Medical Physics", level: "Intermediate", status: "locked" },
    { id: "astrophysics", title: "Astrophysics", level: "Advanced", status: "locked" }
  ]
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Foundation': return 'bg-green-600';
    case 'Intermediate': return 'bg-blue-600';
    case 'Advanced': return 'bg-purple-600';
    default: return 'bg-gray-400';
  }
};

export default function CourseraLearnPage() {
  const [activeSection, setActiveSection] = useState(PHYSICS_CONTENT.sections[0].id);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // AI Highlight Feature State
  const [selection, setSelection] = useState<{ text: string, x: number, y: number } | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isDictionaryMatch, setIsDictionaryMatch] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  async function processHighlightedText(text: string) {
    setIsAiLoading(true);
    setIsDictionaryMatch(false);

    const normalizedText = text.toLowerCase();
    const dictionaryMatch = DICTIONARY_DATABASE[normalizedText];

    if (dictionaryMatch) {
      setTimeout(() => {
        setAiExplanation(dictionaryMatch.definition);
        setIsDictionaryMatch(true);
        setIsAiLoading(false);
      }, 300);
      return;
    }

    // Mocking AI Response for now
    setTimeout(() => {
      const mocks: Record<string, string> = {
        "elementary particles": "Fundamental particles that have no known substructure; they are the basic building blocks of the universe.",
        "standard model": "The theoretical framework describing three of the four known fundamental forces (electromagnetic, weak, and strong nuclear) in the universe.",
        "leptons": "A family of elementary particles that do not undergo strong interactions. The electron is the most famous lepton.",
        "gluon": "The exchange particle (or gauge boson) for the strong force between quarks."
      };

      const result = mocks[normalizedText] || `In the context of ${PHYSICS_CONTENT.subject}, '${text}' refers to a key concept involving ${PHYSICS_CONTENT.topic.toLowerCase()}. It plays a crucial role in understanding how matter and forces interact at a fundamental level.`;
      
      setAiExplanation(result);
      setIsAiLoading(false);
    }, 800);
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    const handleMouseUp = (e: MouseEvent) => {
      const selectedText = window.getSelection()?.toString().trim();
      
      if (selectedText && selectedText.length > 2 && selectedText.length < 100) {
        const isWithinContent = (e.target as HTMLElement).closest('.prose');
        if (isWithinContent) {
          setSelection({
            text: selectedText,
            x: e.clientX,
            y: e.clientY + window.scrollY
          });
          processHighlightedText(selectedText);
        }
      } else {
        if (!(e.target as HTMLElement).closest('.ai-tooltip')) {
          setSelection(null);
          setAiExplanation(null);
          setIsDictionaryMatch(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);


  const handleCopy = () => {
    if (selection?.text) {
      navigator.clipboard.writeText(selection.text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100">
      
      {/* 1. Academic Navbar */}
      <nav className="fixed top-0 z-[60] w-full bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/classes" className="text-gray-500 hover:text-blue-700 transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Module {JOURNEY_DATA.topics.findIndex(t => t.status === 'current') + 1}</span>
            <h1 className="font-bold text-gray-900 text-sm leading-none">{PHYSICS_CONTENT.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Clock size={16} className="text-blue-700" /> {PHYSICS_CONTENT.estimatedTime} remaining
          </div>
          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
          <button className="text-gray-500 hover:text-blue-700 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="bg-blue-700 text-white px-5 py-2 rounded font-bold text-sm hover:bg-blue-800 transition-colors shadow-sm">
            Mark as Done
          </button>
        </div>

        {/* Top Reading Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
          <motion.div 
            className="h-full bg-blue-700" 
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex gap-12">
        
        {/* 2. Course Syllabus Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 h-[calc(100vh-120px)] sticky top-24 overflow-y-auto pr-4 no-scrollbar">
          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Course Syllabus</h3>
              <div className="space-y-1">
                {JOURNEY_DATA.topics.map((topic, idx) => {
                  const isCurrent = topic.status === 'current';
                  const isCompleted = topic.status === 'completed';
                  const isLocked = topic.status === 'locked';

                  return (
                    <button 
                      key={topic.id}
                      className={`w-full text-left p-3 rounded flex items-start gap-3 group transition-all ${
                        isCurrent ? 'bg-blue-50 border-l-4 border-blue-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`mt-1 shrink-0 ${isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-700' : 'text-gray-300'}`}>
                        {isCompleted ? <CheckCircle2 size={16} /> : <div className={`w-4 h-4 rounded-full border-2 ${isCurrent ? 'border-blue-700' : 'border-gray-200'}`} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[9px] font-bold uppercase tracking-tighter block mb-0.5 ${isCurrent ? 'text-blue-700' : 'text-gray-400'}`}>
                          Unit {idx + 1} • {topic.level}
                        </span>
                        <p className={`text-sm font-bold truncate ${isCurrent ? 'text-blue-900' : isLocked ? 'text-gray-400' : 'text-gray-700'}`}>
                          {topic.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded border border-gray-200">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Target size={16} className="text-blue-700" /> Learning Objective
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Analyze the structure of the Standard Model and evaluate the properties of fundamental particles and their interactions.
              </p>
            </div>
          </div>
        </aside>

        {/* 3. Main Content Area */}
        <main className="flex-1 max-w-3xl">
          {/* Internal Jump Menu */}
          <div className="bg-gray-50 border border-gray-200 rounded p-1 mb-10 flex items-center overflow-x-auto no-scrollbar">
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200 shrink-0">In this lesson:</div>
            <div className="flex gap-1 p-1">
              {PHYSICS_CONTENT.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all whitespace-nowrap ${
                    activeSection === section.id 
                      ? 'bg-white text-blue-700 shadow-sm border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-700 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Course Material
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {PHYSICS_CONTENT.subject} • {PHYSICS_CONTENT.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight mb-6">
                {PHYSICS_CONTENT.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                An authoritative study of the fundamental building blocks of matter and the mechanisms of universal interactions.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-20">
              {PHYSICS_CONTENT.sections.map((section, idx) => (
                <section 
                  key={section.id} 
                  id={section.id}
                  className="scroll-mt-32"
                >
                  <div className="flex items-baseline gap-4 mb-8 pb-4 border-b border-gray-100">
                    <span className="text-3xl font-serif font-bold text-blue-700/30 italic">0{idx + 1}</span>
                    <h2 className="text-3xl font-bold text-gray-900 font-serif">
                      {section.title}
                    </h2>
                  </div>
                  <div 
                    className="prose prose-slate prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-bold prose-headings:font-serif"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-24 w-full" />

            {/* Assessment Section */}
            <section className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Award size={160} className="text-blue-900" />
              </div>

              {!quizStarted ? (
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-blue-700 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">Validate Module Completion</h2>
                  <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                    Finalize your study of <span className="font-bold">&quot;{PHYSICS_CONTENT.title}&quot;</span> by completing the comprehensive knowledge check.
                  </p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="px-10 py-4 bg-blue-700 text-white rounded font-bold text-lg hover:bg-blue-800 transition-all flex items-center gap-3 mx-auto shadow-md active:translate-y-0.5"
                  >
                    Launch Assessment <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col min-h-[500px]">
                  <div className="flex justify-between items-center mb-12 border-b border-gray-200 pb-6">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className={`w-8 h-1.5 rounded-full ${i === 1 ? 'bg-blue-700' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Item 1 of 10</span>
                  </div>

                  <div className="flex-1 space-y-10">
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-[0.2em] block">Question Analysis</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif leading-tight">
                        Which exchange boson is responsible for the strong nuclear force?
                      </h3>
                    </div>
                    
                    <div className="grid gap-3 max-w-2xl">
                      {['Photon', 'W Boson', 'Gluon', 'Graviton'].map((option, idx) => (
                        <button 
                          key={idx}
                          className="w-full text-left p-5 bg-white border border-gray-200 rounded hover:border-blue-700 hover:bg-blue-50/30 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-400 group-hover:text-blue-700">{String.fromCharCode(65 + idx)}</span>
                            <span className="text-gray-800 font-medium">{option}</span>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-blue-700 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
                    <button onClick={() => setQuizStarted(false)} className="text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-800 transition-colors">
                      Cancel Assessment
                    </button>
                    <button className="px-10 py-3 bg-gray-100 text-gray-400 rounded font-bold text-sm cursor-not-allowed">
                      Submit Answer
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Navigation Jumpers */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <button className="flex items-center gap-6 p-8 bg-white border border-gray-200 rounded hover:border-blue-700 transition-all group text-left shadow-sm">
                <div className="w-12 h-12 rounded bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-700 transition-colors">
                  <ChevronLeft size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Previous Module</span>
                  <h4 className="font-bold text-gray-800 text-lg">Nuclear Radiation</h4>
                </div>
              </button>

              <button className="flex items-center justify-between p-8 bg-blue-50 border border-blue-100 rounded hover:border-blue-700 transition-all group text-left shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded bg-blue-700 flex items-center justify-center text-white shadow-md">
                    <ArrowRight size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest block mb-1">Next Module</span>
                    <h4 className="font-bold text-gray-900 text-lg">Quantum Phenomena</h4>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <ChevronRight size={24} className="text-blue-200 group-hover:text-blue-700 transition-all" />
                </div>
              </button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* AI Explanation Tooltip - Coursera Style */}
      <AnimatePresence>
        {selection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="fixed z-[200] ai-tooltip"
            style={{ 
              left: Math.min(window.innerWidth - 340, Math.max(20, selection.x - 160)), 
              top: selection.y - window.scrollY - 180 
            }}
          >
            <div className="w-80 bg-white border border-gray-200 shadow-2xl rounded p-6 relative">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isDictionaryMatch ? 'bg-green-600' : 'bg-blue-700'}`}>
                    {isDictionaryMatch ? <BookOpen size={16} /> : <Sparkles size={16} fill="currentColor" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                      {isDictionaryMatch ? 'Academic Definition' : 'AI Learning Helper'}
                    </p>
                    <p className="text-xs font-bold text-gray-900 truncate max-w-[120px] italic">&quot;{selection.text}&quot;</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={handleCopy}
                    className={`p-1.5 rounded transition-all ${copySuccess ? 'text-green-600' : 'text-gray-400 hover:text-blue-700'}`}
                    title="Copy selection"
                  >
                    {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={() => setSelection(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {isAiLoading ? (
                <div className="py-2 space-y-3">
                  <div className="h-2 w-full bg-gray-100 rounded animate-pulse" />
                  <div className="h-2 w-[90%] bg-gray-100 rounded animate-pulse" />
                </div>
              ) : (
                <div className="text-sm text-gray-600 leading-relaxed">
                  {aiExplanation}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {isDictionaryMatch ? (
                  <Link 
                    href="/dictionary"
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-[11px] uppercase tracking-wide transition-all flex items-center justify-center gap-2"
                  >
                    View in Glossary <ExternalLink size={14} />
                  </Link>
                ) : (
                  <button className="flex-1 py-2.5 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded font-bold text-[11px] uppercase tracking-wide transition-all">
                    Add to Study List
                  </button>
                )}
              </div>

              {/* Tooltip Arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Custom typography for Coursera feel */
        .prose strong {
          color: #111827;
          font-weight: 700;
        }
        .prose ul li::marker {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}
