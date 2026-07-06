"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  Search, Atom, FlaskConical, Dna, Calculator, Cpu, Sparkles, 
  ChevronRight, BookOpen, LayoutGrid, Clock, Target, Award, Activity, Play
} from 'lucide-react';

const initialInteractivesData = [
  {
    id: 'physics-vector-addition-components',
    name: 'Vector Addition & Components Lab',
    subject: 'Physics',
    category: 'Science',
    description: 'Resolve force vectors into perpendicular horizontal (Fx = F cos θ) and vertical (Fy = F sin θ) projections and calculate resultants.',
    simulationsCount: '3 Simulators',
    status: 'Active',
    path: '/interactives/physics-vector-addition-components',
    icon: <Activity size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'physics-motion-graphs',
    name: 'Motion Graphs Lab',
    subject: 'Physics',
    category: 'Science',
    description: 'Animate a vehicle along a track to plot and interpret displacement-time, velocity-time, and acceleration-time graphs.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/physics-motion-graphs',
    icon: <Atom size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'physics-weight-gravity',
    name: 'Weight, Gravity, & Planets Lab',
    subject: 'Physics',
    category: 'Science',
    description: 'Adjust planet masses and center-to-center distances to observe gravitational attraction forces in real-time.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/physics-weight-gravity',
    icon: <Atom size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'physics-density-archimedes',
    name: 'Density & Archimedes\' Principle Lab',
    subject: 'Physics',
    category: 'Science',
    description: 'Submerge blocks in liquids of varying densities to calculate density ratios and study buoyant forces.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/physics-density-archimedes',
    icon: <Activity size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'physics-moments-balance',
    name: 'Moments & Balance Beam Lab',
    subject: 'Physics',
    category: 'Science',
    description: 'Place masses at varying distances along a pivot see-saw. Achieve mechanical equilibrium by balancing moments.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/physics-moments-balance',
    icon: <Activity size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'chemistry-titration-neutralization',
    name: 'Acid-Base Titration Simulator',
    subject: 'Chemistry',
    category: 'Science',
    description: 'Drip acid from a virtual burette to neutralize alkali in a conical flask, plotting dynamic pH curves.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/chemistry-titration-neutralization',
    icon: <FlaskConical size={28} className="text-emerald-700" />,
    theme: "border-emerald-100 bg-white",
    textColor: "text-emerald-700"
  },
  {
    id: 'chemistry-electron-shell',
    name: 'Atomic Structure Electron Shell Builder',
    subject: 'Chemistry',
    category: 'Science',
    description: 'Add subatomic particles to populate Bohr shells (2,8,8) and identify element properties.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/chemistry-electron-shell',
    icon: <FlaskConical size={28} className="text-emerald-700" />,
    theme: "border-emerald-100 bg-white",
    textColor: "text-emerald-700"
  },
  {
    id: 'chemistry-electrolysis-cell',
    name: 'Electrolysis Virtual Cell',
    subject: 'Chemistry',
    category: 'Science',
    description: 'Apply current to aqueous copper chloride to observe plating and gas evolution redox half-equations.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/chemistry-electrolysis-cell',
    icon: <FlaskConical size={28} className="text-emerald-700" />,
    theme: "border-emerald-100 bg-white",
    textColor: "text-emerald-700"
  },
  {
    id: 'math-trig-circle',
    name: 'Trigonometric Unit Circle Visualizer',
    subject: 'Mathematics',
    category: 'Math',
    description: 'Rotate a vector ray on a circle of radius r = 1 to map coordinates (x, y) to sine, cosine, and tangent.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/math-trig-circle',
    icon: <Calculator size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'math-quadratic-functions',
    name: 'Quadratic Functions Grapher',
    subject: 'Mathematics',
    category: 'Math',
    description: 'Vary quadratic coefficients (a, b, c) and watch parabola root intersections and vertex coordinates shift.',
    simulationsCount: '3 Simulators',
    status: 'Active',
    path: '/interactives/math-quadratic-functions',
    icon: <Calculator size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'math-sets-venn',
    name: 'Venn Diagram Shading Lab',
    subject: 'Mathematics',
    category: 'Math',
    description: 'Perform logical set operations (union, intersection, complement) and shade corresponding overlapping regions.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/math-sets-venn',
    icon: <Calculator size={28} className="text-blue-700" />,
    theme: "border-blue-100 bg-white",
    textColor: "text-blue-700"
  },
  {
    id: 'biology-punnett-square',
    name: 'Punnett Square Genetic Breeder',
    subject: 'Biology',
    category: 'Science',
    description: 'Select parental genotypes to calculate heterozygous/homozygous phenotype offspring distributions.',
    simulationsCount: '2 Simulators',
    status: 'Active',
    path: '/interactives/biology-punnett-square',
    icon: <Dna size={28} className="text-purple-700" />,
    theme: "border-purple-100 bg-white",
    textColor: "text-purple-700"
  },
  {
    id: 'biology-enzyme-kinetics',
    name: 'Enzyme Kinetics Lab',
    subject: 'Biology',
    category: 'Science',
    description: 'Tweak substrate, pH, and temperature. Observe denaturing thresholds and lock-and-key fitting mechanics.',
    simulationsCount: '3 Simulators',
    status: 'Active',
    path: '/interactives/biology-enzyme-kinetics',
    icon: <Dna size={28} className="text-purple-700" />,
    theme: "border-purple-100 bg-white",
    textColor: "text-purple-700"
  }
];

const categories = [
  { id: 'Science', icon: <FlaskConical size={18} /> },
  { id: 'Math', icon: <Calculator size={18} /> },
];

const metrics = [
  { label: 'Active Labs', value: '13 Live', icon: <Activity size={18} className="text-blue-600" /> },
  { label: 'Simulations Run', value: '150+', icon: <Clock size={18} className="text-blue-600" /> },
  { label: 'Formulas Mastered', value: '28/36', icon: <Award size={18} className="text-blue-600" /> },
];

export default function CourseraInteractivesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const filteredInteractives = initialInteractivesData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Link href="/classes" className="hover:text-blue-700 transition-colors">Classes</Link>
              <Link href="/flashcards" className="hover:text-blue-700 transition-colors">Flashcards</Link>
              <Link href="/interactives" className="text-blue-700 font-bold border-b-2 border-blue-700 transition-colors">Interactives</Link>
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

      <main className="pt-32 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Academic Sidebar */}
        <aside className="w-full md:w-72 shrink-0 space-y-10">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4">Subject Categories</h3>
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
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-6">Lab Performance</h3>
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

        {/* Interactives Content */}
        <div className="flex-1 space-y-10">
          {/* Header */}
          <div className="bg-white p-10 rounded border border-gray-200 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-widest">
                <Activity size={14} />
                Visual Laboratories
              </div>
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Interactive Science & Math Labs</h1>
              <p className="text-gray-600 max-w-xl">AUTHORITATIVE, HANDS-ON CONCEPT EXPLAINERS. Run animations and sliders to visualize relationships between scientific variables.</p>
            </div>
            
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search simulations..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-11 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-700 transition-all"
              />
            </div>
          </div>

          {/* Interactives Grid */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-900 font-serif italic">
                {activeCategory === 'All' ? 'Current Simulators' : `${activeCategory} Lab Tools`}
              </h2>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded uppercase tracking-widest">
                {filteredInteractives.length} modules available
              </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredInteractives.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={item.path}>
                      <div className={`border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden ${item.status === 'Active' ? 'bg-white' : 'bg-white/60'}`}>
                        
                        {/* Status tag */}
                        <div className="absolute top-0 right-0 p-4">
                          {item.status === 'Active' ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                              {item.status}
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                              {item.status}
                            </span>
                          )}
                        </div>

                        {/* Top subject and title block */}
                        <div className="flex items-start gap-6 mb-6">
                          <div className={`w-16 h-16 rounded flex items-center justify-center border shrink-0 group-hover:scale-105 transition-transform shadow-sm bg-gray-50 ${item.status === 'Active' ? item.theme : 'border-gray-100'}`}>
                            {item.icon}
                          </div>
                          <div className="space-y-1">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.subject} Laboratory</div>
                            <h3 className={`text-xl font-bold leading-tight transition-colors ${item.status === 'Active' ? 'text-gray-900 group-hover:text-blue-700' : 'text-gray-400'}`}>
                              {item.name}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className={`text-sm leading-relaxed mb-8 line-clamp-3 ${item.status === 'Active' ? 'text-gray-600' : 'text-gray-400/80'}`}>
                          {item.description}
                        </p>

                        {/* Bottom metrics & link actions */}
                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className={item.status === 'Active' ? 'text-yellow-500' : 'text-gray-300'} />
                            <span className={`text-xs font-bold ${item.status === 'Active' ? 'text-gray-500' : 'text-gray-400'}`}>
                              {item.simulationsCount}
                            </span>
                          </div>
                          
                          {item.status === 'Active' ? (
                            <div className="text-blue-700 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                              Open Simulator <ChevronRight size={16} />
                            </div>
                          ) : (
                            <div className="text-gray-400 font-bold text-sm flex items-center gap-2 cursor-not-allowed">
                              Locked
                            </div>
                          )}
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredInteractives.length === 0 && (
              <div className="py-24 text-center space-y-6 bg-white rounded-lg border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-gray-100">
                  <LayoutGrid size={32} className="text-gray-300" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-gray-900 font-serif">No Simulators Found</p>
                  <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search string.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
