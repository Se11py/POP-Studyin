"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookA, Lightbulb, Link2, 
  MessageCircle, Beaker, Atom, Dna, X, FunctionSquare, Layers, Award, ExternalLink
} from 'lucide-react';

type Definition = {
  id: string;
  word: string;
  subject: string;
  meaning: string;
  example: string;
  context: string;
  goesTogether: string[];
  formula?: string;
  elements?: string[];
};

const definitionsData: Definition[] = [
  {
    id: 'acceleration',
    word: 'Acceleration',
    subject: 'Physics',
    meaning: 'The rate of change of velocity per unit of time.',
    example: 'The race car has a constant acceleration of 2 m/s² on the straight track.',
    context: 'Acceleration is a vector quantity, meaning it has both magnitude and direction. A negative acceleration (slowing down) is called deceleration.',
    goesTogether: ['Velocity', 'Speed', 'Deceleration', 'Force', 'Mass'],
    formula: 'a = (v - u) / t'
  },
  {
    id: 'isotope',
    word: 'Isotope',
    subject: 'Chemistry',
    meaning: 'Atoms of the same element that have the same number of protons but different numbers of neutrons.',
    example: 'Carbon-12 and Carbon-14 are both isotopes of Carbon.',
    context: 'Isotopes share the same chemical properties because they have the same electron configuration, but they have different physical properties (like mass).',
    goesTogether: ['Proton', 'Neutron', 'Atomic Mass', 'Radioactive', 'Element'],
    elements: ['Carbon-12 (¹²C)', 'Carbon-14 (¹⁴C)', 'Uranium-235 (²³⁵U)']
  },
  {
    id: 'mitosis',
    word: 'Mitosis',
    subject: 'Biology',
    meaning: 'A type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.',
    example: 'Skin cells reproduce rapidly through mitosis to replace dead skin.',
    context: 'Mitosis is essential for growth and repair in multicellular organisms. It consists of four main phases: prophase, metaphase, anaphase, and telophase.',
    goesTogether: ['Cell Division', 'Chromosomes', 'Meiosis', 'Nucleus', 'Diploid']
  },
  {
    id: 'photosynthesis',
    word: 'Photosynthesis',
    subject: 'Biology',
    meaning: 'The process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
    example: 'During photosynthesis, plants release oxygen as a byproduct.',
    context: 'Photosynthesis occurs in the chloroplasts and requires chlorophyll. The general equation is 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.',
    goesTogether: ['Chlorophyll', 'Chloroplast', 'Glucose', 'Sunlight', 'Carbon Dioxide']
  },
  {
    id: 'exothermic',
    word: 'Exothermic',
    subject: 'Chemistry',
    meaning: 'A reaction or process accompanied by the release of heat.',
    example: 'The combustion of methane is a highly exothermic reaction.',
    context: 'In an exothermic reaction, the products have less enthalpy (heat energy) than the reactants, resulting in a negative ΔH.',
    goesTogether: ['Endothermic', 'Combustion', 'Enthalpy', 'Heat', 'Reaction'],
    elements: ['CH₄ (Methane)', 'O₂ (Oxygen)', 'CO₂ (Carbon Dioxide)']
  },
  {
    id: 'velocity',
    word: 'Velocity',
    subject: 'Physics',
    meaning: 'The speed of something in a given direction.',
    example: 'The wind velocity was 40 km/h from the north.',
    context: 'Velocity is a vector quantity. Speed is the scalar equivalent of velocity (it has magnitude but no direction).',
    goesTogether: ['Speed', 'Acceleration', 'Displacement', 'Vector', 'Direction'],
    formula: 'v = Δs / Δt'
  }
];

const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case 'Physics': return <Atom size={16} className="text-blue-700" />;
    case 'Chemistry': return <Beaker size={16} className="text-emerald-700" />;
    case 'Biology': return <Dna size={16} className="text-purple-700" />;
    default: return <BookA size={16} className="text-gray-700" />;
  }
};

// Colorless icon for the filter pills — inherits the pill's own text color
const getSubjectPillIcon = (subject: string) => {
  switch (subject) {
    case 'Physics': return <Atom size={15} />;
    case 'Chemistry': return <Beaker size={15} />;
    case 'Biology': return <Dna size={15} />;
    default: return <Layers size={15} />;
  }
};

const getSubjectStyles = (subject: string) => {
  switch (subject) {
    case 'Physics': return 'text-blue-700 bg-blue-50 border-blue-100';
    case 'Chemistry': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    case 'Biology': return 'text-purple-700 bg-purple-50 border-purple-100';
    default: return 'text-gray-700 bg-gray-50 border-gray-100';
  }
};

// Solid variant of the same per-subject color, used for the active filter pill
const getSubjectActiveStyles = (subject: string) => {
  switch (subject) {
    case 'Physics': return 'text-white bg-blue-700 border-blue-700';
    case 'Chemistry': return 'text-white bg-emerald-700 border-emerald-700';
    case 'Biology': return 'text-white bg-purple-700 border-purple-700';
    default: return 'text-white bg-gray-900 border-gray-900';
  }
};

export default function CourseraDefinitionLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<Definition | null>(null);

  useEffect(() => {
    if (selectedWord) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedWord]);

  const subjects = useMemo(() => ['All', ...Array.from(new Set(definitionsData.map(d => d.subject)))], []);

  const filteredDefinitions = useMemo(() => {
    return definitionsData.filter(def => {
      const matchesSearch = def.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            def.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject && selectedSubject !== 'All' ? def.subject === selectedSubject : true;
      return matchesSearch && matchesSubject;
    });
  }, [searchQuery, selectedSubject]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 relative pt-20 md:pt-10 md:pl-64">

      <Sidebar />

      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
        {/* Title, Subtitle and Search (Coursera Academic Style) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-gray-200 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-widest text-blue-700">
               <Award size={14} /> Academic Documentation
            </div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight font-serif">
              Technical Glossary
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">A comprehensive library of formal definitions and methodologies required for international curriculum standards.</p>
          </div>

          <div className="relative w-full lg:w-[450px]">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
               <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search by keyword or definition..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md py-4 pl-14 pr-6 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm text-lg"
            />
          </div>
        </div>

        {/* Subject Filters — color-coded to match each subject's badge elsewhere on this page */}
        <div className="flex flex-wrap gap-2.5">
          {subjects.map(subject => {
            const isActive = (selectedSubject === subject) || (!selectedSubject && subject === 'All');
            return (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-sm border transition-all ${
                  isActive
                    ? `${getSubjectActiveStyles(subject)} shadow-sm`
                    : `${getSubjectStyles(subject)} hover:brightness-95`
                }`}
              >
                {getSubjectPillIcon(subject)}
                {subject}
              </button>
            );
          })}
        </div>

        {/* Compact Word Grid (Academic Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredDefinitions.length > 0 ? (
              filteredDefinitions.map((def) => (
                <motion.div
                  key={def.id}
                  layoutId={`card-${def.id}`}
                  onClick={() => setSelectedWord(def)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded border border-gray-200 p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                       <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${getSubjectStyles(def.subject)} items-center gap-1.5`}>
                         {getSubjectIcon(def.subject)} {def.subject}
                       </span>
                       <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors font-serif">{def.word}</h2>
                    <p className="text-sm font-medium text-gray-500 line-clamp-3 leading-relaxed">{def.meaning}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-32 text-center space-y-4 bg-white rounded border border-dashed border-gray-300"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No definitions found</h3>
                <p className="text-gray-500 font-medium">Try adjusting your search criteria or subject filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Expanded Modal Overlay (Coursera Professional Modal) */}
      <AnimatePresence>
        {selectedWord && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWord(null)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center z-[110] p-4 md:p-10 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedWord.id}`}
                className="bg-white rounded-lg border border-gray-200 w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto shadow-2xl relative"
              >
                {/* Academic Header - Sticky */}
                <div className="sticky top-0 z-20 px-8 py-6 md:px-12 bg-gray-50/95 backdrop-blur-md border-b border-gray-100 flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <span className={`inline-flex px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getSubjectStyles(selectedWord.subject)} items-center gap-2`}>
                         {getSubjectIcon(selectedWord.subject)} {selectedWord.subject} Specialist
                       </span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">v2026.4 Standard</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-serif">{selectedWord.word}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedWord(null)}
                    className="w-10 h-10 bg-white border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-500 transition-colors shadow-sm shrink-0"
                  >
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="px-8 md:px-12 py-10 space-y-10">
                  {/* Formal Meaning */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-700 font-bold uppercase tracking-[0.15em] text-[10px]">
                      <BookA size={14} /> Primary Methodology
                    </div>
                    <div className="bg-white border-l-4 border-blue-700 p-6 shadow-sm">
                       <p className="text-xl font-medium text-gray-800 leading-relaxed italic">{selectedWord.meaning}</p>
                    </div>
                  </div>

                  {/* Physics Formula OR Chemistry Elements */}
                  {(selectedWord.formula || selectedWord.elements) && (
                    <div className={`grid grid-cols-1 ${selectedWord.formula && selectedWord.elements ? 'md:grid-cols-2' : ''} gap-6`}>
                      {selectedWord.formula && (
                        <div className="bg-gray-900 rounded-lg p-6 text-white shadow-lg">
                          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-4">
                            <FunctionSquare size={14} /> Mathematical Model
                          </div>
                          <div className="text-2xl md:text-3xl font-bold font-mono tracking-wider flex justify-center py-6 border-y border-gray-800 my-2 overflow-x-auto whitespace-nowrap">
                            {selectedWord.formula}
                          </div>
                          <p className="text-[10px] text-gray-500 text-center uppercase mt-2">Standard SI Derived Units</p>
                        </div>
                      )}
                      
                      {selectedWord.elements && (
                        <div className="bg-emerald-900 rounded-lg p-6 text-white shadow-lg">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4">
                            <Layers size={14} /> Chemical Reference
                          </div>
                          <div className="flex flex-wrap gap-2 py-2">
                            {selectedWord.elements.map(el => (
                              <span key={el} className="px-3 py-1.5 bg-emerald-800/50 rounded border border-emerald-700 text-sm font-bold text-emerald-100">{el}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Example Usage */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-[0.15em] text-[10px]">
                      <MessageCircle size={14} /> Contextual Application
                    </div>
                    <p className="text-lg font-medium text-gray-600 leading-relaxed bg-gray-50 p-6 rounded italic border border-gray-100">
                      &quot;{selectedWord.example}&quot;
                    </p>
                  </div>

                  {/* Academic Context */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-700 font-bold uppercase tracking-[0.15em] text-[10px]">
                      <Lightbulb size={14} /> Examiner Insight
                    </div>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed bg-orange-50 p-6 rounded-lg border border-orange-100">
                      {selectedWord.context}
                    </p>
                  </div>

                  {/* Goes Together */}
                  <div className="pt-8 border-t border-gray-100 space-y-4">
                    <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-[0.15em] text-[10px]">
                      <Link2 size={14} /> Relational Schema
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedWord.goesTogether.map(word => (
                        <span key={word} className="px-4 py-2 bg-white text-blue-700 rounded border border-blue-100 font-bold text-xs hover:bg-blue-50 cursor-pointer transition-colors shadow-sm">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Award size={12} /> Certified by ANS Science Faculty Subject Leads
                   </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}