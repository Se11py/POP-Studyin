"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Clock, ChevronRight, ChevronLeft, 
  Calculator, FlaskConical, AlertCircle, FileText, Flag, CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

// --- Mock Exam Data Structure ---
interface Question {
  id: number;
  type: string;
  text: string;
  image: string | null;
  options?: string[];
  correctAnswer: number | string;
  marks: number;
  topic?: string;
}

interface MockExam {
  title: string;
  paper: string;
  duration: number;
  totalMarks: number;
  hasCalculator: boolean;
  hasPeriodicTable: boolean;
  questions: Question[];
}

const mockExams: Record<string, MockExam> = {
  'igcse-physics': {
    title: 'Physics — Co-ordinated Sciences',
    paper: 'Paper 2 (Multiple Choice)',
    duration: 45 * 60, // 45 minutes in seconds
    totalMarks: 40,
    hasCalculator: true,
    hasPeriodicTable: false,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        text: 'A car travels at a constant speed of 15 m/s for 10 seconds. What is the total distance traveled?',
        image: null,
        options: ['1.5 m', '150 m', '1500 m', '0.15 m'],
        correctAnswer: 1,
        marks: 1,
        topic: 'Kinematics'
      },
      {
        id: 2,
        type: 'multiple-choice',
        text: 'Which diagram shows the correct magnetic field lines around a bar magnet?',
        image: 'https://placehold.co/600x300/F3F4F6/9CA3AF?text=Magnetic+Field+Diagrams',
        options: ['Diagram A', 'Diagram B', 'Diagram C', 'Diagram D'],
        correctAnswer: 0,
        marks: 1,
        topic: 'Electromagnetism'
      },
      {
        id: 3,
        type: 'short-answer',
        text: 'Define the term "acceleration" and state its standard SI unit.',
        image: null,
        correctAnswer: 'Acceleration is the rate of change of velocity. Its SI unit is m/s².',
        marks: 2,
        topic: 'Kinematics'
      }
    ]
  },
  'igcse-chemistry': {
    title: 'Chemistry — Co-ordinated Sciences',
    paper: 'Paper 4 (Theory - Extended)',
    duration: 75 * 60,
    totalMarks: 80,
    hasCalculator: true,
    hasPeriodicTable: true,
    questions: [
      {
        id: 1,
        type: 'short-answer',
        text: 'Explain why isotopes of the same element have identical chemical properties.',
        image: null,
        correctAnswer: 'They have the same number of electrons in their outer shell.',
        marks: 2,
        topic: 'Atomic Structure'
      }
    ]
  }
};

export default function CourseraMockExamSimulator() {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;
  const examData = mockExams[classId] || mockExams['igcse-physics'];
  
  const [currentQuestionIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [timeLeft, setTimeLeft] = useState(examData.duration);
  const [isFinished, setIsFinished] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);

  const currentQuestion = examData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examData.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === examData.questions.length - 1;

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      }), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const handleTextAnswer = (text: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: text });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center text-gray-900">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg border border-gray-200 p-12 max-w-lg w-full space-y-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-green-600"></div>
          
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-100 shadow-sm">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-serif tracking-tight">Assessment Submitted</h1>
            <p className="text-sm font-medium text-gray-600">Your responses have been successfully recorded. An algorithmic evaluation of your performance is currently underway.</p>
          </div>

          <div className="bg-gray-50 rounded p-6 border border-gray-200 flex justify-between items-center text-left">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Duration</p>
              <p className="text-xl font-bold text-gray-900">{formatTime(examData.duration - timeLeft)}</p>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Completion</p>
              <p className="text-xl font-bold text-green-600">{Object.keys(answers).length} / {examData.questions.length}</p>
            </div>
          </div>

          <Link 
            href={`/classes/${classId}`}
            className="w-full block py-3 bg-blue-700 text-white rounded font-bold text-sm hover:bg-blue-800 transition-colors uppercase tracking-widest shadow-md"
          >
            Return to Curriculum
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Exam Header - Academic Professional Style */}
      <header className="px-6 py-4 bg-white border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex-shrink-0 bg-white rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">{examData.title}</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{examData.paper}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 w-full md:w-auto">
          <div className="flex-1 md:w-64">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              <span>Question {currentQuestionIndex + 1} of {examData.questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded font-bold text-xs border shadow-sm ${timeLeft < 300 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-white border-gray-200 text-gray-700'}`}>
            <Clock size={14} />
            <span className="tabular-nums tracking-wider">{formatTime(timeLeft)}</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {examData.hasCalculator && (
              <button 
                onClick={() => setShowCalculator(!showCalculator)}
                className={`w-10 h-10 rounded border flex items-center justify-center transition-colors ${showCalculator ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white border-gray-200 text-gray-500 hover:text-blue-700 hover:bg-blue-50'}`} 
                title="Calculator"
              >
                <Calculator size={18} />
              </button>
            )}
            {examData.hasPeriodicTable && (
              <button 
                onClick={() => setShowPeriodicTable(!showPeriodicTable)}
                className={`w-10 h-10 rounded border flex items-center justify-center transition-colors ${showPeriodicTable ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white border-gray-200 text-gray-500 hover:text-green-700 hover:bg-green-50'}`} 
                title="Data Booklet"
              >
                <FlaskConical size={18} />
              </button>
            )}
            <button className="w-10 h-10 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-colors" title="Flag for Review">
              <Flag size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Tools Overlays */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 w-64 bg-white rounded shadow-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Calculator</span>
              <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded h-12 mb-4 flex items-center justify-end px-3 font-mono font-bold text-xl text-gray-900 shadow-inner">0</div>
            <div className="grid grid-cols-4 gap-2">
              {['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','.','+'].map((btn) => (
                <button key={btn} className={`h-10 rounded text-sm font-bold transition-colors border ${['÷','×','-','+'].includes(btn) ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100' : btn === 'C' ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                  {btn}
                </button>
              ))}
              <button className="col-span-4 h-10 bg-blue-700 text-white rounded font-bold hover:bg-blue-800 transition-colors text-sm shadow-md">=</button>
            </div>
          </motion.div>
        )}

        {showPeriodicTable && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 right-6 md:right-24 z-50 w-80 md:w-96 bg-white rounded shadow-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Data Booklet</span>
              <button onClick={() => setShowPeriodicTable(false)} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-2 flex items-center justify-center">
              <img src="https://placehold.co/600x400/f9fafb/9ca3af?text=Periodic+Table+Reference" alt="Periodic Table" className="w-full rounded opacity-90 hover:opacity-100 transition-opacity border border-gray-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exam Content Area */}
      <main className="flex-1 flex flex-col items-center p-6 md:p-12 w-full max-w-4xl mx-auto overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full space-y-10"
          >
            {/* Question Details Academic Style */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                   <BookOpen size={16} className="text-blue-700" />
                 </div>
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Module Topic</span>
                    <h3 className="text-sm font-bold text-gray-900">{currentQuestion.topic}</h3>
                 </div>
              </div>
              <div className="text-right">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Weighting</span>
                 <p className="text-sm font-bold text-blue-700">{currentQuestion.marks} Marks</p>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-serif leading-relaxed">
                <span className="text-gray-400 font-medium mr-2">{currentQuestion.id}.</span> 
                {currentQuestion.text}
              </h2>
              
              {currentQuestion.image && (
                <div className="bg-gray-50 border border-gray-200 rounded p-2 overflow-hidden max-w-lg">
                  <img src={currentQuestion.image} alt={`Diagram for Question ${currentQuestion.id}`} className="w-full rounded object-contain border border-gray-200" />
                </div>
              )}
            </div>

            {/* Answer Input Area */}
            <div className="pt-4">
              {currentQuestion.type === 'multiple-choice' ? (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options?.map((option: string, idx: number) => {
                    const isSelected = answers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full p-4 rounded border text-left transition-all flex items-center gap-4 group shadow-sm ${
                          isSelected 
                          ? 'bg-blue-50 border-blue-500 text-blue-900' 
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm transition-colors border ${
                          isSelected ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-50 text-gray-500 border-gray-200 group-hover:bg-gray-100'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="text-base font-medium flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors relative shadow-sm">
                    <textarea 
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      placeholder="Enter your response here..."
                      rows={8}
                      className="w-full bg-transparent p-6 text-sm font-medium text-gray-900 focus:outline-none resize-none placeholder:text-gray-400"
                    />
                    <div className="absolute bottom-3 right-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {String(answers[currentQuestion.id] || '').length} characters
                    </div>
                  </div>
                  
                  {/* Specialized Keyboards */}
                  {examData.hasCalculator && (
                     <div className="flex gap-2">
                       <button className="px-4 py-2 bg-white rounded border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 shadow-sm transition-colors">x²</button>
                       <button className="px-4 py-2 bg-white rounded border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 shadow-sm transition-colors">√</button>
                       <button className="px-4 py-2 bg-white rounded border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 shadow-sm transition-colors">π</button>
                       <button className="px-4 py-2 bg-white rounded border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 shadow-sm transition-colors">°</button>
                     </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Exam Navigation Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 sticky bottom-0 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2.5 rounded font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 border ${
              currentQuestionIndex === 0 
              ? 'bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
            }`}
          >
            <ChevronLeft size={16} strokeWidth={2.5} /> Previous Question
          </button>
          
          <button 
            onClick={handleNext}
            className={`px-8 py-2.5 rounded font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-md ${
              isLastQuestion 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-blue-700 text-white hover:bg-blue-800'
            }`}
          >
            {isLastQuestion ? 'Submit Assessment' : 'Next Question'} <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    </div>
  );
}