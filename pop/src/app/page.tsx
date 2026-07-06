"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Calendar, MessageCircle, Clock, CheckCircle2, ChevronRight, Play, BookOpen, Video, FileText, ArrowRight, Award, GraduationCap, Library, LayoutGrid, Globe, Brain } from 'lucide-react';

export default function CourseraLandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const readinessStats = [
    { subject: 'Math Paper 2', score: '92%', status: 'On track', icon: <Library className="w-5 h-5 text-blue-600" /> },
    { subject: 'Physics HL', score: '88%', status: 'Reviewed', icon: <Brain className="w-5 h-5 text-blue-600" /> },
    { subject: 'Chemistry ATP', score: '86%', status: 'Needs recap', icon: <Globe className="w-5 h-5 text-blue-600" /> }
  ];
  
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

            {/* Right Column - Academic Interface */}
            <motion.div 
              className="md:col-span-6 relative hidden md:block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Background texture block */}
              <div className="absolute inset-0 bg-blue-50 -translate-x-6 translate-y-6 rounded-lg -z-10 border border-blue-100"></div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-blue-900 text-white p-6 border-b border-blue-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Student Dashboard</h3>
                    <p className="text-blue-200 text-sm mt-1">Mock Examination Progress</p>
                  </div>
                  <Award className="w-8 h-8 text-blue-300 opacity-50" />
                </div>
                
                <div className="p-8 flex-1 bg-gray-50">
                  <div className="bg-white border border-gray-200 rounded p-6 shadow-sm mb-6">
                    <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-4">
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Current Cohort</span>
                      <span className="text-blue-700 font-bold bg-blue-50 px-3 py-1 rounded text-xs">IB Diploma Program</span>
                    </div>
                    
                    <div className="space-y-6">
                      {readinessStats.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center border border-gray-100">
                            {stat.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-bold text-gray-800">{stat.subject}</span>
                              <span className="font-bold text-gray-800">{stat.score}</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-blue-600 h-full rounded-full" style={{ width: stat.score }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-700" />
                      Recent Academic Feedback
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-blue-200 pl-4 py-1">
                      &quot;The student has shown remarkable improvement in the application of energetic principles. Recommend reviewing stoichiometry limits before the next mock assessment.&quot;
                      <span className="block mt-2 font-bold text-gray-500 not-italic text-xs">— Senior Mentor, Chemistry Faculty</span>
                    </p>
                  </div>
                </div>
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
