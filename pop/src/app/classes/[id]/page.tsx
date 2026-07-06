"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, BookOpen, Atom, FlaskConical, Dna, Calculator, 
  Briefcase, PenTool, Brain, CheckCircle2, Clock, ChevronRight, 
  Star, Zap, Lock, Info, ChevronDown, Award, Globe, GraduationCap,
  LayoutGrid, Activity, FileText, Target, Trophy, Flame, TrendingUp, Calendar
} from 'lucide-react';
import { useParams } from 'next/navigation';

interface SubTopicLesson {
  id: string;
  title: string;
  status: string;
}

interface SubTopic {
  id: string;
  title: string;
  lessons: SubTopicLesson[];
}

interface Topic {
  id: number;
  title: string;
  status: string;
  duration: string;
  type: string;
  subTopics: SubTopic[];
}

interface Tier {
  name: string;
  level: string;
  progress: number;
  color: string;
  textColor: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface ClassData {
  name: string;
  subtitle: string;
  institution: string;
  icon: React.ReactNode;
  theme: string;
  textColor: string;
  barColor: string;
  description: string;
  syllabusInfo: string;
  stats: Stat[];
  performanceData: number[];
  tiers: Tier[];
  topics: Topic[];
  faqs?: { q: string; a: string }[];
}

const classesData: Record<string, ClassData> = {
  'igcse-physics': {
    name: 'Physics',
    subtitle: 'Co-ordinated Sciences Specialization',
    institution: 'Faculty of Natural Sciences',
    icon: <Atom size={48} />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700",
    barColor: "bg-blue-600",
    description: 'A rigorous exploration of forces, electricity, and energy. Tailored specifically for advanced examination readiness within the ANS Co-ordinated scheme.',
    syllabusInfo: 'ANS Syllabus v2026.4',
    stats: [
      { label: 'Rush Progress', value: '45%', icon: <Zap className="text-orange-500" /> },
      { label: 'Sprint Time', value: '14h', icon: <Clock className="text-blue-700" /> },
      { label: 'Accuracy', value: '92%', icon: <Target className="text-green-600" /> },
      { label: 'Rank', value: '#4', icon: <Trophy className="text-yellow-600" /> },
    ],
    performanceData: [40, 65, 55, 90, 70, 85, 94],
    tiers: [
      { name: 'Beginner', level: 'Grades 1-3', progress: 100, color: 'bg-green-600', textColor: 'text-green-700' },
      { name: 'Intermediate', level: 'Grades 4-6', progress: 85, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
      { name: 'Advance', level: 'Grades 7-9', progress: 40, color: 'bg-blue-600', textColor: 'text-blue-700' }
    ],
    topics: [
      { 
        id: 1, 
        title: 'Module 1: Motion, Forces and Energy', 
        status: 'in-progress', 
        duration: '4h 30m', 
        type: 'Core Module',
        subTopics: [
          {
            id: '1.1',
            title: 'Physical Quantities & Measurement',
            lessons: [
              { id: '1.1.1', title: 'Scalars and Vectors: Theoretical Framework', status: 'completed' },
              { id: '1.1.2', title: 'Precision Measurement of Length and Time', status: 'completed' }
            ]
          },
          {
            id: '1.2',
            title: 'Dynamics of Motion',
            lessons: [
              { id: '1.2.1', title: 'Speed, Velocity and Acceleration Kinematics', status: 'completed' },
              { id: '1.2.2', title: 'Graphical Analysis: Distance-Time', status: 'in-progress' },
              { id: '1.2.3', title: 'Graphical Analysis: Velocity-Time', status: 'locked' }
            ]
          },
          {
            id: '1.3',
            title: 'Mass, Weight and Density Principles',
            lessons: [
              { id: '1.3.1', title: 'Calculating Density in Variable Geometry', status: 'locked' },
              { id: '1.3.2', title: 'Determination of Center of Mass', status: 'locked' }
            ]
          }
        ]
      },
      { 
        id: 2, 
        title: 'Module 2: Thermal Physics & Thermodynamics', 
        status: 'locked', 
        duration: '3h 15m', 
        type: 'Theoretical Study',
        subTopics: [
          {
            id: '2.1',
            title: 'Kinetic Particle Model',
            lessons: [
              { id: '2.1.1', title: 'States of Matter: Molecular Perspective', status: 'locked' },
              { id: '2.1.2', title: 'Gas Pressure & Boyle\'s Law', status: 'locked' }
            ]
          }
        ]
      },
      { id: 3, title: 'Module 3: Wave Properties & Optics', status: 'locked', duration: '2h 30m', type: 'Laboratory Focus', subTopics: [] },
      { id: 4, title: 'Module 4: Electricity and Magnetism', status: 'locked', duration: '3h 00m', type: 'Core Module', subTopics: [] },
    ]
  },
  'igcse-chemistry': {
    name: 'Chemistry',
    subtitle: 'Co-ordinated Sciences Specialization',
    institution: 'Faculty of Chemical Engineering',
    icon: <FlaskConical size={48} />,
    theme: "border-emerald-100 bg-white",
    textColor: "text-emerald-700",
    barColor: "bg-emerald-600",
    description: 'Advanced dive into atomic structure, bonding, and reactions. Synced meticulously with ANS examination methodology.',
    syllabusInfo: 'ANS Syllabus v2026.2',
    stats: [
      { label: 'Topics Done', value: '4/11', icon: <BookOpen className="text-emerald-600" /> },
      { label: 'Mock Score', value: '78%', icon: <Target className="text-blue-600" /> },
      { label: 'Study Streak', value: '3 Days', icon: <Flame className="text-orange-500" /> },
      { label: 'Rank', value: '#12', icon: <Trophy className="text-yellow-600" /> },
    ],
    performanceData: [30, 45, 40, 60, 55, 78, 78],
    tiers: [
      { name: 'Beginner', level: 'Grades 1-3', progress: 80, color: 'bg-green-600', textColor: 'text-green-700' },
      { name: 'Intermediate', level: 'Grades 4-6', progress: 40, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
      { name: 'Advance', level: 'Grades 7-9', progress: 10, color: 'bg-blue-600', textColor: 'text-blue-700' }
    ],
    topics: [
      { 
        id: 1, 
        title: 'Module 1: The Particulate Nature of Matter', 
        status: 'completed', 
        duration: '1h 00m', 
        type: 'Theory Specialist',
        subTopics: [
          {
            id: '1.1',
            title: 'Phase States: Solids, Liquids and Gases',
            lessons: [
              { id: '1.1.1', title: 'Kinetic Molecular Theory', status: 'completed' },
              { id: '1.1.2', title: 'Enthalpy of Phase Transitions', status: 'completed' }
            ]
          }
        ]
      },
      { id: 2, title: 'Module 2: Experimental Techniques & Separation', status: 'in-progress', duration: '1h 30m', type: 'Laboratory Focus', subTopics: [] },
    ]
  },
  'igcse-math': {
    name: 'Mathematics',
    subtitle: 'Core/Extended Curriculum',
    institution: 'Mathematics Institute',
    icon: <Calculator size={48} />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700",
    barColor: "bg-blue-600",
    description: 'Advanced algebra and geometry. Comprehensive preparation for examination success.',
    syllabusInfo: 'ANS Syllabus v2026.1',
    stats: [
      { label: 'Formulas', value: '156', icon: <Star className="text-yellow-500" /> },
      { label: 'Mock Streak', value: '12 Days', icon: <Flame className="text-orange-500" /> },
      { label: 'Solved', value: '42', icon: <BookOpen className="text-blue-600" /> },
      { label: 'Rank', value: '#8', icon: <Trophy className="text-yellow-600" /> },
    ],
    performanceData: [50, 70, 60, 80, 75, 90, 88],
    tiers: [
      { name: 'Beginner', level: 'Grades 1-3', progress: 100, color: 'bg-green-600', textColor: 'text-green-700' },
      { name: 'Intermediate', level: 'Grades 4-6', progress: 65, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
      { name: 'Advance', level: 'Grades 7-9', progress: 28, color: 'bg-blue-600', textColor: 'text-blue-700' }
    ],
    topics: []
  },
  'igcse-biology': {
    name: 'Biology',
    subtitle: 'Co-ordinated Sciences Specialization',
    institution: 'Faculty of Biological Sciences',
    icon: <Dna size={48} />,
    theme: "border-purple-100 bg-white",
    textColor: "text-purple-700",
    barColor: "bg-purple-600",
    description: 'Exploring cells, taxonomy, and ecology. Complete alignment with assessment criteria.',
    syllabusInfo: 'ANS Syllabus v2026.3',
    stats: [
      { label: 'Topics Done', value: '0/11', icon: <BookOpen className="text-purple-600" /> },
      { label: 'Mock Score', value: '-', icon: <Target className="text-gray-400" /> },
      { label: 'Study Streak', value: '0 Days', icon: <Flame className="text-gray-400" /> },
      { label: 'Rank', value: '-', icon: <Trophy className="text-gray-400" /> },
    ],
    performanceData: [0, 0, 0, 10, 15, 20, 25],
    tiers: [
      { name: 'Beginner', level: 'Grades 1-3', progress: 20, color: 'bg-green-600', textColor: 'text-green-700' },
      { name: 'Intermediate', level: 'Grades 4-6', progress: 0, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
      { name: 'Advance', level: 'Grades 7-9', progress: 0, color: 'bg-blue-600', textColor: 'text-blue-700' }
    ],
    topics: []
  },
  'igcse-business': {
    name: 'Business Studies',
    subtitle: 'Enterprise Modules',
    institution: 'Faculty of Commerce',
    icon: <Briefcase size={48} />,
    theme: "border-gray-200 bg-white",
    textColor: "text-gray-700",
    barColor: "bg-gray-600",
    description: 'Case study-led analysis. Real-world application of business principles.',
    syllabusInfo: 'ANS Syllabus v2025.2',
    stats: [
      { label: 'Topics Done', value: '1/6', icon: <BookOpen className="text-gray-600" /> },
      { label: 'Mock Score', value: '55%', icon: <Target className="text-red-600" /> },
      { label: 'Study Streak', value: '2 Days', icon: <Flame className="text-orange-500" /> },
      { label: 'Rank', value: '#34', icon: <Trophy className="text-yellow-600" /> },
    ],
    performanceData: [10, 20, 15, 30, 25, 40, 50],
    tiers: [
      { name: 'Beginner', level: 'Grades 1-3', progress: 40, color: 'bg-green-600', textColor: 'text-green-700' },
      { name: 'Intermediate', level: 'Grades 4-6', progress: 15, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
      { name: 'Advance', level: 'Grades 7-9', progress: 0, color: 'bg-blue-600', textColor: 'text-blue-700' }
    ],
    topics: []
  },
  'igcse-english': {
    name: 'English Language',
    subtitle: 'Language Arts Specialization',
    institution: 'Faculty of Arts',
    icon: <PenTool size={48} />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700",
    barColor: "bg-blue-600",
    description: 'Comprehensive reading and writing practice. Preparation for textual analysis.',
    syllabusInfo: 'ANS Syllabus v2026.1',
    stats: [
      { label: 'Topics Done', value: '2/5', icon: <BookOpen className="text-blue-600" /> },
      { label: 'Mock Score', value: '82%', icon: <Target className="text-blue-600" /> },
      { label: 'Study Streak', value: '6 Days', icon: <Flame className="text-orange-500" /> },
      { label: 'Rank', value: '#18', icon: <Trophy className="text-yellow-600" /> },
    ],
    performanceData: [50, 60, 55, 70, 75, 80, 85],
    tiers: [
      { name: 'Beginner', level: 'Grades 1-3', progress: 90, color: 'bg-green-600', textColor: 'text-green-700' },
      { name: 'Intermediate', level: 'Grades 4-6', progress: 50, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
      { name: 'Advance', level: 'Grades 7-9', progress: 20, color: 'bg-blue-600', textColor: 'text-blue-700' }
    ],
    topics: []
  }
};

export default function CourseraClassDetailPage() {
  const params = useParams();
  const classId = params.id as string;
  const classDetail = classesData[classId] || classesData['igcse-physics'];
  
  const [activeTab, setActiveTab] = useState<'journey' | 'dashboard' | 'mock'>('journey');
  const [expandedTopic, setExpandedTopic] = useState<number | null>(1);
  const [selectedPaper, setSelectedPaper] = useState('paper2');

  const paperOptions = [
    { id: 'paper1', name: 'Paper 1 (Short Answer)' },
    { id: 'paper2', name: 'Paper 2 (Multiple Choice)' },
    { id: 'paper4', name: 'Paper 4 (Extended Theory)' }
  ];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-100';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'locked': return 'bg-gray-50 text-gray-400 border-gray-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const getLessonIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'in-progress': return <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />;
      case 'locked': return <Lock size={14} className="text-gray-300" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      {/* High-Contrast Academic Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/classes" className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-sm transition-colors group">
            <ArrowLeft size={18} />
            <span className="uppercase tracking-wider">Back to Curriculum</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-600 uppercase tracking-widest">
              <Zap size={14} className="text-orange-500" fill="currentColor" />
              Academic Streak: 12 Days
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              JD
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Professional Module Header */}
          <motion.div variants={fadeInUp} className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               {React.cloneElement(classDetail.icon as React.ReactElement<{ size?: number }>, { size: 180 })}
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-widest text-blue-700">
                  <Globe size={12} />
                  {classDetail.institution}
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif tracking-tight leading-tight">
                    {classDetail.name}
                  </h1>
                  <p className="text-xl font-bold text-blue-700 font-serif italic">
                    {classDetail.subtitle}
                  </p>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  {classDetail.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-10 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Est. 12.5 Study Hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap size={20} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{classDetail.topics?.length || 0} Academic Modules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Verified Completion</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions - Lightning Quiz */}
          <motion.div variants={fadeInUp} className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm border-l-4 border-l-orange-500">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 font-serif">Accelerated Review Session</h3>
              <p className="text-sm text-gray-600 max-w-lg">Initiate a 5-minute rigorous academic quiz to solidify retention of recently covered methodologies.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white rounded font-bold text-sm hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-widest">
                <Zap size={18} fill="currentColor" /> Lightning Quiz
              </button>
            </div>
          </motion.div>

          {/* 3-Tab Selector (Academic Coursera Style) */}
          <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded p-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('journey')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'journey' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              <LayoutGrid size={16} /> Curriculum
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              <Activity size={16} /> Performance
            </button>
            <button 
              onClick={() => setActiveTab('mock')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'mock' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              <FileText size={16} /> Mock Exams
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'journey' && (
              <motion.div 
                key="journey" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {classDetail.topics?.length > 0 ? (
                  classDetail.topics.map((topic: Topic) => (
                    <div key={topic.id} className="space-y-4">
                      {/* Topic Row */}
                      <motion.div 
                        onClick={() => topic.status !== 'locked' && setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                        className={`bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-between transition-all group ${topic.status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-10 flex-1">
                          <div className="text-gray-300 font-bold text-2xl shrink-0 w-8">
                            {topic.id < 10 ? `0${topic.id}` : topic.id}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getStatusBadge(topic.status)}`}>
                                {topic.type}
                              </span>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                <Clock size={12} /> {topic.duration}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors font-serif">{topic.title}</h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                           {topic.status === 'completed' && <CheckCircle2 size={24} className="text-green-500" />}
                           {topic.status === 'locked' && <Lock size={20} className="text-gray-300" />}
                           {topic.subTopics.length > 0 && (
                             <div className={`text-gray-400 transition-transform ${expandedTopic === topic.id ? 'rotate-180 text-blue-700' : ''}`}>
                               <ChevronDown size={24} />
                             </div>
                           )}
                        </div>
                      </motion.div>

                      {/* Nested Sub-topics and Lessons */}
                      <AnimatePresence>
                        {expandedTopic === topic.id && topic.subTopics.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="pl-16 pr-4 space-y-10 py-4"
                          >
                            {topic.subTopics.map((sub: SubTopic) => (
                              <div key={sub.id} className="space-y-6 relative border-l-2 border-gray-100 pl-10">
                                {/* Connector dot */}
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-200" />
                                
                                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded">
                                  Sub-Module {sub.id}: {sub.title}
                               </h4>

                                <div className="grid gap-2">
                                  {sub.lessons.map((lesson: SubTopicLesson) => (
                                    <motion.div
                                      key={lesson.id}
                                      whileHover={{ x: 4 }}
                                      className={`bg-white border border-gray-100 p-5 flex items-center justify-between group rounded hover:border-blue-200 transition-all ${lesson.status === 'locked' ? 'opacity-60' : 'cursor-pointer shadow-sm hover:shadow'}`}
                                    >
                                      <div className="flex items-center gap-6">
                                        <div className="shrink-0">
                                          {getLessonIcon(lesson.status)}
                                        </div>
                                        <span className={`text-[15px] font-bold ${lesson.status === 'locked' ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-900'}`}>
                                          {lesson.title}
                                        </span>
                                      </div>
                                      
                                      {lesson.status !== 'locked' && (
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 group-hover:text-blue-700 transition-colors uppercase tracking-widest">
                                          <span>Begin Study</span>
                                          <ChevronRight size={14} />
                                        </div>
                                      )}
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center bg-white rounded-lg border border-dashed border-gray-200 space-y-4">
                    <BookOpen size={48} className="text-gray-300 mx-auto" />
                    <p className="text-xl font-bold text-gray-400 font-serif">Curriculum modules coming soon.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard" 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                {classDetail.stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {classDetail.stats.map((stat: Stat, i: number) => (
                      <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col items-center gap-4 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">{stat.icon}</div>
                        <div className="text-center">
                           <span className="text-3xl font-bold text-gray-900 font-serif leading-none">{stat.value}</span>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Performance Chart */}
                {classDetail.performanceData && (
                  <div className="bg-white rounded-lg border border-gray-200 p-10 space-y-8 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900 font-serif">Learning Momentum</h3>
                      <TrendingUp className="text-blue-600" size={24} />
                    </div>
                    <div className="h-40 flex items-end gap-3 px-2">
                      {classDetail.performanceData.map((h: number, i: number) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-blue-100 rounded-t relative group hover:bg-blue-200 transition-colors">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">{h}%</div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <span>Week Start</span>
                      <span>Today</span>
                    </div>
                  </div>
                )}

                {/* Tiers Section */}
                {classDetail.tiers && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 font-serif px-2">Mastery Tiers</h3>
                    <div className="grid gap-4">
                      {classDetail.tiers.map((tier: Tier, i: number) => (
                        <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-md transition-all">
                          <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-full ${tier.color} text-white flex items-center justify-center font-bold text-2xl shadow-sm`}>{tier.name[0]}</div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{tier.level}</p>
                            </div>
                          </div>
                          <div className="flex-1 max-w-sm w-full space-y-3">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span className="text-gray-500">Mastery</span>
                              <span className={tier.textColor}>{tier.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full ${tier.color} transition-all duration-1000`} style={{ width: `${tier.progress}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Mission */}
                <motion.div variants={fadeInUp} className="bg-blue-50 p-8 rounded-lg border border-blue-100 flex items-start gap-6">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-blue-200 shadow-sm">
                      <Zap size={24} className="text-orange-500" fill="currentColor" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="font-bold text-lg text-blue-900 font-serif">Active Objective</h3>
                      <p className="text-sm text-blue-800 leading-relaxed font-medium">
                        Complete the next 2 modules to achieve <span className="text-blue-700 font-bold uppercase tracking-wider text-xs">Silver Mastery</span> in this curriculum parameter.
                      </p>
                   </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'mock' && (
              <motion.div 
                key="mock" 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Hero CTA for Mock */}
                <div className="bg-white rounded-lg border border-gray-200 p-10 md:p-14 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="absolute -left-10 -bottom-10 opacity-[0.03]">
                    <Target size={300} />
                  </div>
                  
                  <div className="relative z-10 space-y-4 text-center md:text-left max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 rounded text-[10px] font-bold text-orange-700 uppercase tracking-widest border border-orange-100">
                      <Flame size={14} fill="currentColor" /> Exam Simulation
                    </div>
                    <h3 className="text-4xl font-bold tracking-tight text-gray-900 font-serif">Initiate Mock Examination</h3>
                    <p className="text-base font-medium text-gray-600 leading-relaxed">
                      Engage in a simulated exam environment. Questions are algorithmically generated based on past examination papers and targeted towards your identified improvement areas.
                    </p>
                    
                    <div className="pt-4 flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Select Exam Component</span>
                      <div className="flex flex-wrap gap-2">
                        {paperOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedPaper(option.id)}
                            className={`px-4 py-2 rounded text-xs font-bold transition-all border ${
                              selectedPaper === option.id 
                                ? 'bg-blue-50 text-blue-700 border-blue-700 shadow-sm' 
                                : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/classes/mock/${classId}?paper=${selectedPaper}`} className="relative z-10 w-full md:w-auto mt-6 md:mt-0">
                    <button className="w-full px-10 py-4 bg-blue-700 text-white rounded font-bold text-sm hover:bg-blue-800 transition-all shadow-md uppercase tracking-widest flex items-center justify-center gap-3">
                      <Play size={18} fill="currentColor" /> Begin Assessment
                    </button>
                  </Link>
                </div>

                {/* Previous Mocks History */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 font-serif px-2">Assessment History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { date: 'Yesterday', score: '82%', grade: 'A', focus: 'Motion & Energy', time: '45m' },
                      { date: 'Last Week', score: '65%', grade: 'C', focus: 'Thermal Physics', time: '1h 15m' },
                    ].map((mock, i) => (
                      <div key={i} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-md transition-shadow group cursor-pointer relative flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-1 rounded">Past Assessment</span>
                            <h4 className="text-xl font-bold text-gray-900">{mock.focus}</h4>
                          </div>
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-sm ${mock.score.startsWith('8') ? 'bg-green-600' : 'bg-yellow-500'}`}>
                            {mock.grade}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-gray-50 rounded p-4 border border-gray-100">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Score</p>
                            <p className="text-2xl font-bold text-gray-900">{mock.score}</p>
                          </div>
                          <div className="bg-gray-50 rounded p-4 border border-gray-100">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Duration</p>
                            <p className="text-2xl font-bold text-gray-900">{mock.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                          <span className="text-sm font-medium text-gray-500 flex items-center gap-2"><Calendar size={16} /> {mock.date}</span>
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest group-hover:underline flex items-center gap-1 transition-all">Detailed Analysis <ChevronRight size={16} /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Academic Footer Info */}
          <div className="bg-blue-900 text-white p-12 rounded-lg shadow-xl flex flex-col md:flex-row gap-10 items-center">
             <div className="shrink-0 w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center border border-blue-700 shadow-inner">
                <Award size={32} />
             </div>
             <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold font-serif">Academic Integrity & Standards</h3>
                <p className="text-blue-100 leading-relaxed max-w-3xl font-medium">
                  This curriculum specialization is maintained by ANS alumni subject leads. All theoretical models and laboratory walkthroughs strictly adhere to the IGCSE assessment objectives for 2026.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 pt-2">
                   <button className="text-xs font-bold text-blue-300 hover:text-white uppercase tracking-widest transition-colors">View Peer-Review Log</button>
                   <button className="text-xs font-bold text-blue-300 hover:text-white uppercase tracking-widest transition-colors">Download Syllabus PDF</button>
                </div>
             </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
