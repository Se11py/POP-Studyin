"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Compass, ChevronRight, Stethoscope, Landmark, 
  Cpu, Rocket, Briefcase, Award, ArrowRight, ShieldAlert, Sparkles,
  Play, CheckCircle2, FlaskConical, Target
} from 'lucide-react';

interface RecommendedCourse {
  name: string;
  level: string;
  topics: string[];
}

interface Blueprint {
  id: string;
  name: string;
  industry: 'stem' | 'medical' | 'legal' | 'business';
  careerGoal: string;
  description: string;
  icon: React.ReactNode;
  theme: string;
  accentColor: string;
  textAccent: string;
  requiredCourses: RecommendedCourse[];
  recommendedLabs: { name: string; url: string }[];
  universityPrereqs: string[];
}

export default function CareerPathwaysPage() {
  const [selectedId, setSelectedId] = useState<string>('stem-aero');
  const [filter, setFilter] = useState<'all' | 'stem' | 'medical' | 'legal' | 'business'>('all');

  const nameSuggestions = [
    { name: "Syllabus Blueprints", description: "Emphasizes the structured, architectural approach to planning your studies." },
    { name: "Career Pathways", description: "A classic, clean name that clearly connects subject choices to ultimate careers." },
    { name: "Curriculum Compass", description: "Highlights the guidance aspect, helping students steer toward their future." },
    { name: "Vocation Tracks", description: "A high-end academic title representing professional vocations and training." }
  ];

  const blueprints: Blueprint[] = [
    {
      id: 'stem-aero',
      name: 'Physical Engineering & Aerospace',
      industry: 'stem',
      careerGoal: 'Aerospace Engineer, Robotics Specialist, Civil Developer',
      description: 'Built for analytical minds aiming to master Newtonian mechanics, calculus applications, and materials science needed for structural and mechanical design.',
      icon: <Rocket className="w-6 h-6" />,
      theme: 'border-blue-100 bg-blue-50/20 hover:border-blue-300',
      accentColor: 'bg-blue-600',
      textAccent: 'text-blue-700',
      requiredCourses: [
        { name: 'Physics', level: 'IGCSE / A-Level', topics: ['Kinematics & Dynamics', 'Forces & Friction', 'Thermal energy transfer'] },
        { name: 'Mathematics', level: 'Core & Extended', topics: ['Calculus', 'Vector Transformations', 'Algebraic Equations'] },
        { name: 'Chemistry', level: 'IGCSE Core', topics: ['Periodic Table Reactivity', 'Bonding & Structures'] }
      ],
      recommendedLabs: [
        { name: 'Kinematics & Vectors Visualizer', url: '/physics-rush/visualizer' },
        { name: 'Circuit Assembly Lab', url: '/interactives/physics-circuit-assembly' }
      ],
      universityPrereqs: ['Physics A-Level (Grade A)', 'Mathematics A-Level (Grade A)', 'Chemistry IGCSE (Grade B)']
    },
    {
      id: 'medical-clinical',
      name: 'Medical & Clinical Sciences',
      industry: 'medical',
      careerGoal: 'Doctor, Surgeon, Medical Researcher, Pharmacist',
      description: 'Provides the rigorous chemical biology training necessary for clinical thinking, research methodologies, and university medical school examinations.',
      icon: <Stethoscope className="w-6 h-6" />,
      theme: 'border-emerald-100 bg-emerald-50/20 hover:border-emerald-300',
      accentColor: 'bg-emerald-600',
      textAccent: 'text-emerald-700',
      requiredCourses: [
        { name: 'Chemistry', level: 'IGCSE / A-Level', topics: ['Acid-Base Neutralization', 'Organic Nomenclature', 'Redox Reactions'] },
        { name: 'Biology', level: 'IGCSE / A-Level', topics: ['Enzyme Kinetics', 'Homeostasis & Nervous systems', 'Genetics & Punnett Squares'] },
        { name: 'Mathematics', level: 'Core Syllabus', topics: ['Statistics & Distributions', 'Probability Trees'] }
      ],
      recommendedLabs: [
        { name: 'Acid-Base Titration Lab', url: '/interactives/chemistry-titration-neutralization' },
        { name: 'Enzyme Kinetics Simulator', url: '/interactives/biology-enzyme-kinetics' }
      ],
      universityPrereqs: ['Chemistry A-Level (Grade A)', 'Biology A-Level (Grade A)', 'Mathematics IGCSE (Grade A)']
    },
    {
      id: 'legal-corporate',
      name: 'Jurisprudence & Corporate Law',
      industry: 'legal',
      careerGoal: 'Corporate Lawyer, Legal Adviser, Policy Advocate',
      description: 'Focuses heavily on deep document review, critical analysis of historical timelines, and logic frameworks needed to succeed in legal studies.',
      icon: <Landmark className="w-6 h-6" />,
      theme: 'border-purple-100 bg-purple-50/20 hover:border-purple-300',
      accentColor: 'bg-purple-600',
      textAccent: 'text-purple-700',
      requiredCourses: [
        { name: 'History', level: 'IGCSE / A-Level', topics: ['International Relations', 'Twentieth Century Diplomacy'] },
        { name: 'English Literature', level: 'IGCSE / A-Level', topics: ['Socio-Political Themes', 'Comparative Essay Writing'] },
        { name: 'Economics', level: 'IGCSE Core', topics: ['Microeconomics & Allocation', 'Market Failures'] }
      ],
      recommendedLabs: [],
      universityPrereqs: ['English Literature A-Level (Grade A)', 'History A-Level (Grade A)', 'Economics IGCSE (Grade B)']
    },
    {
      id: 'stem-cs',
      name: 'Computational Systems & AI',
      industry: 'stem',
      careerGoal: 'Software Engineer, Systems Architect, Data Scientist',
      description: 'Tailored for computational engineering, focusing on algorithms, numeric mathematics, logical gates, and the electrical foundations of modern computing.',
      icon: <Cpu className="w-6 h-6" />,
      theme: 'border-indigo-100 bg-indigo-50/20 hover:border-indigo-300',
      accentColor: 'bg-indigo-600',
      textAccent: 'text-indigo-700',
      requiredCourses: [
        { name: 'Computer Science', level: 'IGCSE / A-Level', topics: ['Algorithms & Data Types', 'Logic Gates & Binary Systems'] },
        { name: 'Mathematics', level: 'Core & Extended', topics: ['Numerical Calculus', 'Sets & Venn Diagrams', 'Probability Theory'] },
        { name: 'Physics', level: 'IGCSE Core', topics: ['Resistor Networks', 'Electromagnetic Induction'] }
      ],
      recommendedLabs: [
        { name: 'Logic Gates & Sets Venn Lab', url: '/interactives/math-sets-venn' },
        { name: 'Resistor Ohms Law Network', url: '/interactives/physics-resistor-networks' }
      ],
      universityPrereqs: ['Mathematics A-Level (Grade A)', 'Computer Science A-Level (Grade A)', 'Physics IGCSE (Grade B)']
    }
  ];

  const filteredBlueprints = filter === 'all' 
    ? blueprints 
    : blueprints.filter(b => b.industry === filter);

  const activeBlueprint = blueprints.find(b => b.id === selectedId) || blueprints[0];

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
              <Link href="/classes" className="hover:text-blue-700 transition-colors">Classes</Link>
              <Link href="/flashcards" className="hover:text-blue-700 transition-colors">Flashcards</Link>
              <Link href="/interactives" className="hover:text-blue-700 transition-colors">Interactives</Link>
              <Link href="/dictionary" className="hover:text-blue-700 transition-colors">Dictionary</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-[15px] shadow-md">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Back Link */}
        <div>
          <Link href="/classes" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-xs uppercase tracking-wider transition-colors">
            <ArrowLeft size={16} />
            Back to Classes
          </Link>
        </div>

        {/* Page Title Block */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Compass size={180} className="text-blue-900" />
          </div>

          <div className="space-y-3 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-widest text-blue-700 shadow-sm">
              <Sparkles size={12} fill="currentColor" />
              <span>Academic Architecture tool</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-serif">
              Syllabus Blueprints
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Wondering which courses you need to achieve your dream career? Enlist in our curated Syllabus Blueprints to bundle your math, science, and humanities modules directly, aligning your study hours with university requirements.
            </p>
          </div>
        </div>

        {/* Suggestion Section (Helpful for naming brainstorm) */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
            <Compass size={16} />
            <span>Project Naming Brainstorm (Collaborate with the AI):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nameSuggestions.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded border border-blue-100 shadow-sm space-y-1">
                <div className="font-bold text-xs text-blue-900">{item.name}</div>
                <p className="text-[10px] text-gray-500 leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 border-b pb-4">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1.5 rounded transition-all ${filter === 'all' ? 'bg-blue-700 text-white shadow-sm' : 'hover:bg-gray-100'}`}
          >
            All Careers
          </button>
          <button 
            onClick={() => setFilter('stem')} 
            className={`px-3 py-1.5 rounded transition-all ${filter === 'stem' ? 'bg-blue-700 text-white shadow-sm' : 'hover:bg-gray-100'}`}
          >
            STEM & Robotics
          </button>
          <button 
            onClick={() => setFilter('medical')} 
            className={`px-3 py-1.5 rounded transition-all ${filter === 'medical' ? 'bg-blue-700 text-white shadow-sm' : 'hover:bg-gray-100'}`}
          >
            Medical & Clinical
          </button>
          <button 
            onClick={() => setFilter('legal')} 
            className={`px-3 py-1.5 rounded transition-all ${filter === 'legal' ? 'bg-blue-700 text-white shadow-sm' : 'hover:bg-gray-100'}`}
          >
            Jurisprudence & Law
          </button>
        </div>

        {/* Two-Column Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Blueprints Cards List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Curated Blueprints</h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredBlueprints.map((bp) => {
                const isSelected = selectedId === bp.id;
                return (
                  <div 
                    key={bp.id}
                    onClick={() => setSelectedId(bp.id)}
                    className={`p-6 rounded-lg border cursor-pointer transition-all flex items-start gap-5 ${
                      isSelected 
                        ? 'bg-blue-50/50 border-blue-500 shadow-md ring-1 ring-blue-500' 
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0 shadow-md ${bp.accentColor}`}>
                      {bp.icon}
                    </div>
                    
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-bold text-lg text-gray-900 leading-snug truncate">{bp.name}</h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white border uppercase tracking-widest text-gray-500 shrink-0">
                          {bp.requiredCourses.length} Courses
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-semibold">{bp.careerGoal}</p>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{bp.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Bundle View */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBlueprint.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-gray-200 rounded-lg p-8 shadow-md space-y-6"
              >
                {/* Header */}
                <div className="border-b pb-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-100 uppercase tracking-widest text-blue-700">
                      {activeBlueprint.industry} pathway
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-snug">{activeBlueprint.name}</h3>
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    Designed for: {activeBlueprint.careerGoal}
                  </p>
                </div>

                {/* Bundle Course List */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bundle Modules Expected</h4>
                  
                  <div className="space-y-3">
                    {activeBlueprint.requiredCourses.map((course, idx) => (
                      <div key={idx} className="p-4 rounded border border-gray-100 bg-gray-50/50 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-gray-900">{course.name}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500 uppercase tracking-wider">
                            {course.level}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {course.topics.map((t, i) => (
                            <span key={i} className="text-[10px] font-medium bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisite requirements */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Typical University Prereqs</h4>
                  <ul className="space-y-1.5">
                    {activeBlueprint.universityPrereqs.map((prereq, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Labs */}
                {activeBlueprint.recommendedLabs.length > 0 && (
                  <div className="space-y-3 border-t pt-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended Visual Labs</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {activeBlueprint.recommendedLabs.map((lab, idx) => (
                        <Link 
                          key={idx}
                          href={lab.url}
                          className="p-3 bg-blue-50/50 border border-blue-100 rounded text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                        >
                          <span className="truncate">{lab.name}</span>
                          <Play size={12} fill="currentColor" className="text-blue-700 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom CTA Action Button */}
                <div className="pt-4">
                  <Link 
                    href="/classes"
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 group"
                  >
                    <span>Enlist in this Bundle</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </main>
    </div>
  );
}
