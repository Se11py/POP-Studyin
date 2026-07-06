"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Calendar, MessageCircle, Clock, CheckCircle2, ChevronRight, Play, BookOpen, Video, FileText, ArrowRight, Award, GraduationCap, Library, LayoutGrid, Globe, Brain } from 'lucide-react';

export default function CourseraLandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  
  const focusBlocks = [
    { title: 'Functions', detail: 'IB Math AA', time: '08:30' },
    { title: 'Energetics', detail: 'Chemistry HL', time: '11:00' },
    { title: 'Stoichiometry', detail: 'Chemistry SL', time: '14:30' }
  ];
  
  const clinics = [
    { title: 'IB Physics Clinic', detail: 'Wave superposition drills · 19:00' },
    { title: 'Essay review window', detail: 'Upload drafts by Friday' }
  ];
  
  const heroStats = [
    { label: 'Mock readiness avg.', value: '89%' },
    { label: 'Weekly clinics', value: '12' },
    { label: 'Active cohorts', value: '48' }
  ];
  
  const cadenceSteps = [
    {
      title: 'Sunday brief',
      description: 'Receive a structured 4-line overview: key topics, mock target, and one reflective question to set the academic week.',
      detail: 'Sent 18:00 local time',
      id: '01',
      icon: <Calendar className="w-6 h-6 text-white" />,
    },
    {
      title: 'Mid-week check',
      description: 'Your assigned mentor replies to your submission with annotated, actionable feedback within 48 hours.',
      detail: 'Delivered in-app',
      id: '02',
      icon: <MessageCircle className="w-6 h-6 text-white" />,
    },
    {
      title: 'Studio hour',
      description: 'Join a moderated focus room with 12 peers, swap questions, and log your next set of objectives.',
      detail: 'Thursday 19:00',
      id: '03',
      icon: <Clock className="w-6 h-6 text-white" />,
    }
  ];

  const syllabusBadges = [
    'IGCSE Curriculum', 'IB Diploma', 'A-Level Certified', 'Mock Exam Clinics'
  ];

  const faqs = [
    {
      q: "What is the pricing structure?",
      a: "The platform is completely free. We operate as a student-led non-profit funded entirely by alumni donations to ensure high-quality revision materials remain accessible."
    },
    {
      q: "Which specific exam boards are supported?",
      a: "Our curriculum experts focus heavily on IB, Cambridge (CIE), and Edexcel for both IGCSE and A-Levels. Additional boards are regularly reviewed for inclusion."
    },
    {
      q: "Who authors the study materials?",
      a: "Every academic resource is authored by top-performing alumni (scoring 7s in IB or A*s at A-Level) and is rigorously verified by our subject leads for accuracy."
    }
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'English Literature', 'Economics'];

  const classProgress = [
    {
      title: 'Mathematics',
      icon: <LayoutGrid className="w-8 h-8 text-blue-700" />,
      overall: 75,
      foundation: 100,
      intermediate: 80,
      advanced: 20,
      theme: 'bg-blue-50 border-blue-100',
      textTheme: 'text-blue-900',
      barColor: 'bg-blue-600',
      lightBar: 'bg-blue-100'
    },
    {
      title: 'Sciences',
      icon: <Brain className="w-8 h-8 text-blue-700" />,
      overall: 60,
      foundation: 100,
      intermediate: 50,
      advanced: 10,
      theme: 'bg-gray-50 border-gray-200',
      textTheme: 'text-gray-800',
      barColor: 'bg-gray-600',
      lightBar: 'bg-gray-200'
    },
    {
      title: 'Humanities',
      icon: <Library className="w-8 h-8 text-blue-700" />,
      overall: 90,
      foundation: 100,
      intermediate: 100,
      advanced: 70,
      theme: 'bg-blue-50 border-blue-100',
      textTheme: 'text-blue-900',
      barColor: 'bg-blue-600',
      lightBar: 'bg-blue-100'
    }
  ];

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
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
            <Link href="/sign-in" className="hidden md:block text-blue-700 hover:text-blue-900 transition-colors text-[15px] font-bold px-4 py-2">
              Log In
            </Link>
            <Link href="/sign-up" className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-[15px] shadow-md">
              Join for Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-32">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            
            {/* Left Column - Hero Content */}
            <motion.div 
              className="md:col-span-6 space-y-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="space-y-6">
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-[68px] font-bold leading-[1.1] tracking-tight text-gray-900">
                  Academic excellence,<br />
                  <span className="text-blue-700 font-serif font-semibold italic">structured.</span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-lg">
                  Guided study cadences, authoritative topic packs, and rigorous mock submissions in one trusted academic environment. Prepare for your IB and A-Level exams with confidence.
                </motion.p>
              </div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/sign-up"
                  className="px-8 py-4 bg-blue-700 text-white rounded font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/classes"
                  className="px-8 py-4 bg-white text-blue-700 rounded font-bold text-lg border-2 border-blue-700 hover:bg-blue-50 transition-colors text-center"
                >
                  Explore Curriculum
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="pt-10 flex flex-wrap items-center gap-8 md:gap-12">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1 border-l-4 border-blue-700 pl-4">
                    <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Coursera-Style Flat Vector Illustration */}
            <motion.div 
              className="md:col-span-6 relative hidden md:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Background texture block */}
              <div className="absolute inset-0 bg-blue-50 -translate-x-6 translate-y-6 rounded-lg -z-10 border border-blue-100"></div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden p-6 flex items-center justify-center">
                <svg viewBox="0 0 600 450" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Decorative background grid */}
                  <g opacity="0.3">
                    <line x1="50" y1="0" x2="50" y2="450" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="150" y1="0" x2="150" y2="450" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="250" y1="0" x2="250" y2="450" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="350" y1="0" x2="350" y2="450" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="450" y1="0" x2="450" y2="450" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="550" y1="0" x2="550" y2="450" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="0" y1="255" x2="600" y2="255" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="0" y1="350" x2="600" y2="350" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4,4" />
                  </g>
                  
                  {/* Outer circle orbits for aesthetic depth */}
                  <circle cx="300" cy="225" r="180" fill="none" stroke="#EFF6FF" strokeWidth="2" />
                  <circle cx="300" cy="225" r="120" fill="none" stroke="#EFF6FF" strokeWidth="1" />

                  {/* Biology (Green Leaf Node) */}
                  <motion.g 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M 300,50 C 318,70 318,95 300,105 C 282,95 282,70 300,50 Z" fill="#ECFDF5" stroke="#10B981" strokeWidth="4" />
                    <line x1="300" y1="50" x2="300" y2="105" stroke="#10B981" strokeWidth="3" />
                    <line x1="300" y1="68" x2="310" y2="63" stroke="#10B981" strokeWidth="2" />
                    <line x1="300" y1="80" x2="290" y2="75" stroke="#10B981" strokeWidth="2" />
                    <line x1="300" y1="90" x2="308" y2="85" stroke="#10B981" strokeWidth="2" />
                  </motion.g>

                  {/* Chemistry (Flask Node) */}
                  <motion.g 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    {/* Flask Outline */}
                    <path d="M 115,100 L 135,100 L 135,125 L 160,170 A 5,5 0 0 1 155,178 L 95,178 A 5,5 0 0 1 90,170 L 115,125 Z" fill="#F8FAFC" stroke="#0056D2" strokeWidth="4" strokeLinejoin="round" />
                    {/* Liquid */}
                    <path d="M 96,160 L 154,160 L 156,170 A 4,4 0 0 1 152,174 L 98,174 A 4,4 0 0 1 94,170 Z" fill="#0056D2" opacity="0.85" />
                    {/* Bubbles */}
                    <circle cx="125" cy="85" r="4" fill="#0056D2" />
                    <circle cx="112" cy="70" r="3" fill="#0056D2" opacity="0.6" />
                    <circle cx="132" cy="55" r="5" fill="#F7D046" />
                  </motion.g>

                  {/* Physics (Atom Node) */}
                  <motion.g 
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <ellipse cx="480" cy="130" rx="45" ry="15" fill="none" stroke="#0056D2" strokeWidth="4" transform="rotate(-30, 480, 130)" />
                    <ellipse cx="480" cy="130" rx="45" ry="15" fill="none" stroke="#F7D046" strokeWidth="4" transform="rotate(30, 480, 130)" strokeDasharray="6,4" />
                    <circle cx="480" cy="130" r="10" fill="#0056D2" />
                    <circle cx="442" cy="108" r="4" fill="#F7D046" />
                    <circle cx="510" cy="112" r="4" fill="#0056D2" />
                  </motion.g>

                  {/* Mathematics (Triangle Ruler Node) */}
                  <motion.g 
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  >
                    <path d="M 90,340 L 165,340 L 90,265 Z" fill="#FEF3C7" stroke="#F7D046" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M 102,328 L 138,328 L 102,292 Z" fill="#FFFFFF" stroke="#F7D046" strokeWidth="3" />
                  </motion.g>

                  {/* Computer Science (Terminal Node) */}
                  <motion.g 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  >
                    <rect x="420" y="270" width="100" height="75" rx="6" fill="#1E293B" stroke="#0056D2" strokeWidth="4" />
                    {/* Console Bar */}
                    <line x1="420" y1="285" x2="520" y2="285" stroke="#0056D2" strokeWidth="2" />
                    <circle cx="430" cy="277.5" r="2.5" fill="#EF4444" />
                    <circle cx="440" cy="277.5" r="2.5" fill="#F59E0B" />
                    <circle cx="450" cy="277.5" r="2.5" fill="#10B981" />
                    {/* Code Symbol */}
                    <path d="M 440,302 L 432,310 L 440,318 M 475,302 L 483,310 L 475,318" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="462" y1="300" x2="452" y2="320" stroke="#F7D046" strokeWidth="3" strokeLinecap="round" />
                  </motion.g>

                  {/* Central Element: Coursera-Style Open Notebook */}
                  <g transform="translate(150, 125)">
                    {/* Shadow */}
                    <rect x="0" y="10" width="300" height="210" rx="8" fill="#E2E8F0" opacity="0.8" />
                    
                    {/* Blue Cover */}
                    <rect x="0" y="0" width="300" height="210" rx="8" fill="#0056D2" />
                    
                    {/* Left Page */}
                    <rect x="10" y="8" width="135" height="194" rx="4" fill="#FFFFFF" />
                    
                    {/* Right Page */}
                    <rect x="155" y="8" width="135" height="194" rx="4" fill="#FFFFFF" />
                    
                    {/* Left Page Writing Lines */}
                    <line x1="25" y1="35" x2="130" y2="35" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />
                    <line x1="25" y1="65" x2="110" y2="65" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />
                    
                    <line x1="25" y1="95" x2="120" y2="95" stroke="#EFF6FF" strokeWidth="12" strokeLinecap="round" />
                    <line x1="25" y1="110" x2="80" y2="110" stroke="#EFF6FF" strokeWidth="6" strokeLinecap="round" />

                    <line x1="25" y1="140" x2="115" y2="140" stroke="#EFF6FF" strokeWidth="12" strokeLinecap="round" />
                    <line x1="25" y1="170" x2="125" y2="170" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />

                    {/* Right Page: High-contrast Plot/Math Grid */}
                    <rect x="170" y="25" width="105" height="85" fill="#F8FAFC" rx="4" stroke="#E2E8F0" strokeWidth="1" />
                    {/* Grid inner mesh */}
                    <line x1="170" y1="46" x2="275" y2="46" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="170" y1="67" x2="275" y2="67" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="170" y1="88" x2="275" y2="88" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="191" y1="25" x2="191" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="212" y1="25" x2="212" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="233" y1="25" x2="233" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="254" y1="25" x2="254" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                    
                    {/* Plotted Sine Wave Curve */}
                    <path d="M 170,67 Q 196.25,25 222.5,67 T 275,67" fill="none" stroke="#0056D2" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Right Page Study Text */}
                    <line x1="170" y1="135" x2="275" y2="135" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />
                    <line x1="170" y1="165" x2="240" y2="165" stroke="#EFF6FF" strokeWidth="12" strokeLinecap="round" />

                    {/* Book Spine Rings */}
                    <rect x="145" y="20" width="10" height="8" rx="2" fill="#CBD5E1" />
                    <rect x="145" y="50" width="10" height="8" rx="2" fill="#CBD5E1" />
                    <rect x="145" y="80" width="10" height="8" rx="2" fill="#CBD5E1" />
                    <rect x="145" y="110" width="10" height="8" rx="2" fill="#CBD5E1" />
                    <rect x="145" y="140" width="10" height="8" rx="2" fill="#CBD5E1" />
                    <rect x="145" y="170" width="10" height="8" rx="2" fill="#CBD5E1" />
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="w-full h-px bg-gray-200 my-16"></div>

        {/* Affiliations / Syllabus */}
        <section className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Supported Academic Programs</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale">
            {syllabusBadges.map((badge, idx) => (
              <div key={idx} className="text-xl md:text-2xl font-serif font-bold text-gray-800 tracking-tight">
                {badge}
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gray-200 my-16"></div>

        {/* Methodology Section */}
        <section id="method" className="py-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">A rigorous, proven methodology.</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed">
              Three essential touchpoints that repeat every seven days. A structural approach designed by educators to maintain focus and accountability throughout the academic year.
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {cadenceSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white border border-gray-200 p-8 rounded shadow-sm hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-blue-700 transition-colors"></div>
                <div className="w-14 h-14 bg-blue-700 flex items-center justify-center mb-8 rounded shadow-md">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">{step.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {step.description}
                </p>
                <div className="pt-6 border-t border-gray-100 flex items-center text-sm font-bold text-blue-700 uppercase tracking-wider">
                  <Clock className="w-4 h-4 mr-2" />
                  {step.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-24">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 md:p-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-16 md:w-2/3"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Curriculum Library</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed">
                Everything you need to excel, meticulously organized. Access peer-reviewed study materials, attend expert-led live sessions, and analyze graded practice papers.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main Feature */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-white border border-gray-200 p-10 rounded shadow-md hover:shadow-xl transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded flex items-center justify-center border border-blue-100">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">Most Popular</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Verified Study Notes</h3>
                  <p className="text-gray-600 text-lg max-w-lg leading-relaxed mb-8">
                    Zero-fluff notes shaped by actual top scorers. Features crucial annotations and margin cues highlighting precise examination methodology.
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">126+ Modules Available</span>
                  <Link href="/classes" className="text-blue-700 font-bold flex items-center gap-2 hover:text-blue-900 transition-colors">
                    Browse Notes <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              {/* Stacked Cards */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white border border-gray-200 p-8 rounded shadow-md hover:shadow-xl transition-shadow flex-1 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded flex items-center justify-center border border-blue-100 mb-6">
                      <Video className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Live Seminars</h3>
                    <p className="text-gray-600 text-base leading-relaxed">Expert-led academic sessions featuring live Q&A and comprehensive problem-solving walkthroughs.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white border border-gray-200 p-8 rounded shadow-md hover:shadow-xl transition-shadow flex-1 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded flex items-center justify-center border border-blue-100 mb-6">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Graded Mock Papers</h3>
                    <p className="text-gray-600 text-base leading-relaxed">Fully annotated examination scripts demonstrating precisely where method marks are awarded.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-16 border-t border-gray-200">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Academic Disciplines</h2>
            <p className="text-gray-600">Expert-curated resources across core curriculum subjects.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 border border-gray-200 bg-white hover:border-blue-700 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group rounded"
              >
                <span className="font-bold text-gray-700 group-hover:text-blue-700">{subject}</span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-700 transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Dashboard / Class Progress */}
        <section className="py-24 border-t border-gray-200 bg-gray-50 -mx-6 px-6 md:mx-0 md:px-12 md:rounded-3xl mt-12 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-16 text-center"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-bold text-gray-600 mb-6">
                <GraduationCap className="w-5 h-5 text-blue-700" />
                Learning Dashboard
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] font-serif">
                Track your academic journey <br />
                <span className="text-blue-700 italic">across every difficulty.</span>
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {classProgress.map((cls, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`bg-white p-8 rounded border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 relative group`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded flex items-center justify-center border ${cls.theme}`}>
                      {cls.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold font-serif ${cls.textTheme}`}>{cls.title}</h3>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Overall {cls.overall}%</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-600">Foundation</span>
                        <span className={cls.textTheme}>{cls.foundation}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${cls.lightBar} overflow-hidden`}>
                        <div className={`h-full rounded-full ${cls.barColor}`} style={{ width: `${cls.foundation}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-600">Intermediate</span>
                        <span className={cls.textTheme}>{cls.intermediate}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${cls.lightBar} overflow-hidden`}>
                        <div className={`h-full rounded-full ${cls.barColor}`} style={{ width: `${cls.intermediate}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-600">Advanced</span>
                        <span className={cls.textTheme}>{cls.advanced}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${cls.lightBar} overflow-hidden`}>
                        <div className={`h-full rounded-full ${cls.barColor}`} style={{ width: `${cls.advanced}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link href={`/learn/${cls.title.toLowerCase()}`} className={`inline-flex items-center gap-2 font-bold ${cls.textTheme} hover:text-blue-900 transition-colors`}>
                      Continue Learning <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 border-t border-gray-200">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Transparent information regarding our methodology, pricing, and curriculum coverage.
            </p>
          </motion.div>

          <div className="max-w-4xl border-t border-gray-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200">
                <button 
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left py-6 group"
                >
                  <span className="font-bold text-xl text-gray-800 group-hover:text-blue-700 transition-colors pr-8">{faq.q}</span>
                  <div className={`w-10 h-10 border border-gray-200 rounded flex items-center justify-center transition-all ${openFAQ === idx ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                    <ChevronRight className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${openFAQ === idx ? 'rotate-90 text-blue-700' : 'group-hover:text-blue-700'}`} />
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFAQ === idx ? 'auto' : 0, opacity: openFAQ === idx ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 text-gray-600 text-lg leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-900 text-white rounded-lg p-12 md:p-24 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/4 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/4 opacity-50"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-800 border border-blue-700 flex items-center justify-center mb-8 rounded shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-serif">
                Join a community dedicated to academic excellence.
              </h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
                Step away from generic revision guides. Access specialized notes, meticulous mock assessments, and expert-led clinics tailored to your curriculum.
              </p>
              <Link href="/sign-up" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-900 rounded font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl">
                Enroll Now for Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-700 flex items-center justify-center rounded">
                <span className="text-white text-xl font-bold font-serif tracking-tighter">P</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">POP Studying</span>
            </div>
            <div className="flex flex-wrap gap-8 text-[15px] font-medium text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Our Mission</Link>
              <Link href="#" className="hover:text-white transition-colors">Curriculum Partners</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} POP Studying Initiative. All academic rights reserved.</p>
            <p>Empowering student success globally.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
