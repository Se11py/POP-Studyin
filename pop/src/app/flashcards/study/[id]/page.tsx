"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Check, RotateCcw, ArrowLeft, Trophy, Flame, Target, MessageSquare, Star, Info, Hash, Clock, BookOpen, ChevronRight, Award, HelpCircle, Settings, CheckCircle2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

// Mock data for the study session
const studySet = {
  id: 1,
  title: "Spanish Vocabulary Specialization",
  category: "Languages",
  institution: "Faculty of Applied Linguistics",
  cards: [
    { id: 1, front: "El desayuno", back: "Breakfast", difficulty: "Easy" },
    { id: 2, front: "Desarrollar", back: "To develop", difficulty: "Medium" },
    { id: 3, front: "Imprescindible", back: "Essential / Indispensable", difficulty: "Hard" },
    { id: 4, front: "La madrugada", back: "Early morning / Dawn", difficulty: "Medium" },
    { id: 5, front: "Echar de menos", back: "To miss (someone/something)", difficulty: "Hard" },
    { id: 6, front: "La manzana", back: "Apple", difficulty: "Easy" },
  ]
};

export default function CourseraInteractiveStudyMode() {
  const params = useParams();
  const router = useRouter();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentCard = studySet.cards[currentIndex];
  const progress = ((currentIndex) / studySet.cards.length) * 100;
  const isLastCard = currentIndex === studySet.cards.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleScore = (isCorrect: boolean) => {
    if (isCorrect) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    if (isLastCard) {
      setIsComplete(true);
    } else {
      setDirection(1);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      }, 50);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setStats({ correct: 0, incorrect: 0 });
    setIsComplete(false);
  };

  const cardVariants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      y: 20
    }),
    active: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    })
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center text-gray-800">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10 max-w-2xl w-full bg-white p-12 rounded-lg border border-gray-200 shadow-xl"
        >
          <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="text-blue-700 w-12 h-12" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 font-serif leading-tight">Module Completed Successfully</h1>
            <p className="text-lg font-medium text-gray-500">You have completed all curriculum parameters for this specialization.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 py-6 border-y border-gray-100">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Mastery Level</p>
              <p className="text-4xl font-bold text-blue-700">{Math.round((stats.correct / studySet.cards.length) * 100)}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Terms Reviewed</p>
              <p className="text-4xl font-bold text-gray-900">{studySet.cards.length}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleReset}
              className="flex-1 py-4 bg-white border-2 border-blue-700 text-blue-700 hover:bg-blue-50 rounded font-bold text-lg transition-all flex items-center justify-center gap-3"
            >
              <RotateCcw size={20} /> Review Again
            </button>
            <Link 
              href="/flashcards"
              className="flex-1 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              Continue to Dashboard <ChevronRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 text-gray-800">
      {/* High-Contrast Academic Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{studySet.category}</p>
              <h1 className="text-sm font-bold text-gray-900 line-clamp-1">{studySet.title}</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-md flex flex-col gap-2">
             <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
               <span>Module Progress</span>
               <span>{currentIndex + 1} of {studySet.cards.length}</span>
             </div>
             <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress + (100 / studySet.cards.length)}%` }}
                 className="h-full bg-blue-600 rounded-full"
               />
             </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <HelpCircle size={20} className="cursor-pointer hover:text-blue-700 transition-colors" />
            <Settings size={20} className="cursor-pointer hover:text-blue-700 transition-colors" />
          </div>
        </div>
      </header>

      {/* Main Study Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-12 max-w-5xl mx-auto w-full">
        <div className="w-full relative h-[400px]" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate={{ 
                opacity: 1,
                y: 0,
                rotateY: isFlipped ? 180 : 0,
                transition: { 
                  rotateY: { duration: 0.5, ease: "easeInOut" },
                  default: { duration: 0.4 }
                }
              }}
              exit="exit"
              className="w-full h-full cursor-pointer relative"
              onClick={handleFlip}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side */}
              <div 
                className="absolute inset-0 w-full h-full bg-white rounded-lg border border-gray-200 p-12 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-shadow"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="absolute top-8 left-8">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded">
                     {currentCard.difficulty} Difficulty
                   </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif leading-tight">
                  {currentCard.front}
                </h2>
                
                <div className="absolute bottom-10 text-gray-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 border-t border-gray-50 pt-4 w-2/3 justify-center">
                  Click to reveal definition
                </div>
              </div>

              {/* Back Side */}
              <div 
                className="absolute inset-0 w-full h-full bg-white rounded-lg border-t-4 border-t-blue-700 border-x border-gray-200 border-b border-gray-200 p-12 flex flex-col items-center justify-center text-center shadow-xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                   <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center">
                     <CheckCircle2 size={20} className="text-blue-700" />
                   </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 font-serif leading-tight">
                  {currentCard.back}
                </h2>

                <div className="absolute bottom-10 flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  <Star size={14} />
                  Mark for secondary review
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Evaluation Controls */}
        <div className="w-full max-w-2xl bg-white border border-gray-200 p-8 rounded-lg shadow-sm space-y-6">
          <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest">How well did you recall this term?</p>
          
          <div className="grid grid-cols-2 gap-6">
            <button 
              disabled={!isFlipped}
              onClick={() => handleScore(false)}
              className={`py-4 rounded font-bold text-sm transition-all uppercase tracking-wider flex items-center justify-center gap-2 border-2 ${
                isFlipped 
                ? "border-red-600 text-red-600 hover:bg-red-50" 
                : "border-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <X size={18} strokeWidth={3} /> Requires Review
            </button>
            
            <button 
              disabled={!isFlipped}
              onClick={() => handleScore(true)}
              className={`py-4 rounded font-bold text-sm transition-all uppercase tracking-wider flex items-center justify-center gap-2 ${
                isFlipped 
                ? "bg-blue-700 text-white hover:bg-blue-800 shadow-md" 
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <Check size={18} strokeWidth={3} /> Mastered Concept
            </button>
          </div>
        </div>
      </main>

      {/* Academic Footer Stats */}
      <footer className="px-6 py-6 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto flex justify-around items-center">
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold font-serif">{stats.correct}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Mastered</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-2xl font-bold font-serif">{stats.incorrect}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">To Review</p>
          </div>

          <div className="text-center space-y-1">
            <p className="text-2xl font-bold font-serif">{studySet.cards.length - (currentIndex)}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Remaining</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
