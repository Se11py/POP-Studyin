"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowLeft, Play, Pause, RotateCcw, HelpCircle, ChevronRight, 
  Info, Sparkles, BookOpen, Brain, Activity, Sliders, RefreshCw
} from 'lucide-react';

// Math/Equation types
type Variable = {
  symbol: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description: string;
};

type EquationData = {
  id: string;
  name: string;
  formulaTex: string;
  variables: Record<string, Variable>;
  description: string;
  examinerInsight: string;
  rearrangements: Record<string, {
    steps: string[];
    finalTex: string;
  }>;
};

const equationsConfig: Record<string, EquationData> = {
  kinematics: {
    id: 'kinematics',
    name: 'Kinematics: Displacement Equation',
    formulaTex: 's = u t + \\frac{1}{2} a t^2',
    description: 'Calculates the displacement of an object moving under constant acceleration.',
    examinerInsight: 'A common pitfall is forgetting that acceleration can be negative (deceleration) and that time is squared in the second term. Always verify if the object starts from rest (u = 0).',
    variables: {
      u: { symbol: 'u', name: 'Initial Velocity', unit: 'm/s', min: -10, max: 20, step: 1, defaultValue: 5, description: 'Speed and direction of the object at t = 0.' },
      a: { symbol: 'a', name: 'Acceleration', unit: 'm/s²', min: -5, max: 5, step: 0.5, defaultValue: 2, description: 'The constant rate at which velocity changes.' },
      t: { symbol: 't', name: 'Time Duration', unit: 's', min: 0, max: 8, step: 0.1, defaultValue: 3, description: 'The time elapsed during the motion.' }
    },
    rearrangements: {
      s: {
        steps: [
          'Start with the base formula: s = u*t + (1/2)*a*t²',
          'The equation is already solved for displacement (s).'
        ],
        finalTex: 's = u t + \\frac{1}{2} a t^2'
      },
      u: {
        steps: [
          'Start with: s = u*t + (1/2)*a*t²',
          'Subtract (1/2)*a*t² from both sides: s - (1/2)*a*t² = u*t',
          'Divide both sides by t: (s - (1/2)*a*t²) / t = u',
          'Simplify: u = s/t - (1/2)*a*t'
        ],
        finalTex: 'u = \\frac{s - \\frac{1}{2} a t^2}{t}'
      },
      a: {
        steps: [
          'Start with: s = u*t + (1/2)*a*t²',
          'Subtract u*t from both sides: s - u*t = (1/2)*a*t²',
          'Multiply both sides by 2 to clear the fraction: 2*(s - u*t) = a*t²',
          'Divide both sides by t² to isolate a: a = 2*(s - u*t) / t²'
        ],
        finalTex: 'a = \\frac{2 (s - u t)}{t^2}'
      }
    }
  },
  newton2: {
    id: 'newton2',
    name: 'Newton\'s Second Law & Friction',
    formulaTex: 'F_{net} = F_{applied} - F_{friction} = m a',
    description: 'Relates net force, mass, and acceleration on a flat surface with friction.',
    examinerInsight: 'Remember that friction always opposes motion. If the applied force is less than or equal to the maximum static friction, the object does not move, acceleration is zero, and friction equals the applied force.',
    variables: {
      F_applied: { symbol: 'F_app', name: 'Applied Force', unit: 'N', min: 0, max: 100, step: 5, defaultValue: 50, description: 'The pushing or pulling force applied to the box.' },
      m: { symbol: 'm', name: 'Object Mass', unit: 'kg', min: 1, max: 20, step: 1, defaultValue: 10, description: 'The inertia of the object (higher mass resists acceleration).' },
      mu: { symbol: 'μ', name: 'Friction Coefficient', unit: 'ratio', min: 0, max: 0.8, step: 0.05, defaultValue: 0.3, description: 'Roughness coefficient between surfaces (static/kinetic).' }
    },
    rearrangements: {
      a: {
        steps: [
          'Start with the Net Force: F_net = F_app - F_friction',
          'Friction force F_friction = μ * m * g (taking gravitational field g ≈ 9.8 m/s²)',
          'F_net = F_app - μ*m*g',
          'Use Newton\'s Second Law: F_net = m * a',
          'Divide by mass (m) to isolate acceleration: a = (F_app - μ*m*g) / m',
          'Simplify: a = (F_app / m) - μ*g'
        ],
        finalTex: 'a = \\frac{F_{app} - \\mu m g}{m}'
      },
      F_applied: {
        steps: [
          'Start with: F_net = F_app - F_friction = m * a',
          'Rearrange for applied force: F_app = F_net + F_friction',
          'Substitute friction: F_app = m*a + μ*m*g',
          'Factor out mass (m): F_app = m * (a + μ*g)'
        ],
        finalTex: 'F_{app} = m (a + \\mu g)'
      },
      m: {
        steps: [
          'Start with: F_app - μ*m*g = m * a',
          'Move all term with mass (m) to one side: F_app = m*a + μ*m*g',
          'Factor out mass (m): F_app = m * (a + μ*g)',
          'Divide both sides by (a + μ*g): m = F_app / (a + μ*g)'
        ],
        finalTex: 'm = \\frac{F_{app}}{a + \\mu g}'
      }
    }
  },
  waves: {
    id: 'waves',
    name: 'The Wave Equation',
    formulaTex: 'v = f \\lambda',
    description: 'Relates wave velocity to the frequency and wavelength of a periodic wave.',
    examinerInsight: 'Wave speed is constant for a given medium. When a wave passes from one medium to another (e.g., light refracting into glass), its frequency remains constant while speed and wavelength change proportionally.',
    variables: {
      f: { symbol: 'f', name: 'Wave Frequency', unit: 'Hz', min: 1, max: 10, step: 0.5, defaultValue: 4, description: 'Number of wave cycles passing a fixed point per second.' },
      lambda: { symbol: 'λ', name: 'Wavelength', unit: 'm', min: 0.5, max: 5.0, step: 0.1, defaultValue: 2.5, description: 'Distance between consecutive crests or compressions.' }
    },
    rearrangements: {
      v: {
        steps: [
          'Start with the wave equation: v = f * λ',
          'The equation is already solved for wave speed (v).'
        ],
        finalTex: 'v = f \\lambda'
      },
      f: {
        steps: [
          'Start with: v = f * λ',
          'Divide both sides by wavelength (λ) to isolate frequency: f = v / λ'
        ],
        finalTex: 'f = \\frac{v}{\\lambda}'
      },
      lambda: {
        steps: [
          'Start with: v = f * λ',
          'Divide both sides by frequency (f) to isolate wavelength: λ = v / f'
        ],
        finalTex: '\\lambda = \\frac{v}{f}'
      }
    }
  },
  gravitation: {
    id: 'gravitation',
    name: 'Newton\'s Law of Universal Gravitation',
    formulaTex: 'F = G \\frac{m_1 m_2}{r^2}',
    description: 'Calculates the gravitational force of attraction between two masses at a distance.',
    examinerInsight: 'This is an inverse-square law. Doubling the distance (r) reduces the gravitational force to a quarter (1/4). Tripling r reduces force to 1/9. Masses have a linear relation.',
    variables: {
      m1: { symbol: 'm₁', name: 'Mass 1 (Earth-scale)', unit: '×10²⁴ kg', min: 1, max: 10, step: 0.5, defaultValue: 6, description: 'Mass of the primary larger planetary body.' },
      m2: { symbol: 'm₂', name: 'Mass 2 (Moon-scale)', unit: '×10²² kg', min: 1, max: 10, step: 0.5, defaultValue: 7.3, description: 'Mass of the orbiting satellite or secondary body.' },
      r: { symbol: 'r', name: 'Distance apart', unit: '×10⁵ km', min: 1.5, max: 10, step: 0.5, defaultValue: 3.8, description: 'Center-to-center distance between the two bodies.' }
    },
    rearrangements: {
      F: {
        steps: [
          'Start with standard equation: F = G * (m1 * m2) / r²',
          'The equation is already solved for gravitational force (F).'
        ],
        finalTex: 'F = G \\frac{m_1 m_2}{r^2}'
      },
      r: {
        steps: [
          'Start with: F = G * (m1 * m2) / r²',
          'Multiply both sides by r² to remove denominator: F * r² = G * m1 * m2',
          'Divide both sides by Force (F): r² = G * (m1 * m2) / F',
          'Take the square root of both sides to isolate r: r = √(G * m1 * m2 / F)'
        ],
        finalTex: 'r = \\sqrt{\\frac{G m_1 m_2}{F}}'
      },
      m1: {
        steps: [
          'Start with: F = G * (m1 * m2) / r²',
          'Multiply both sides by r²: F * r² = G * m1 * m2',
          'Divide both sides by G * m2 to isolate m1: m1 = (F * r²) / (G * m2)'
        ],
        finalTex: 'm_1 = \\frac{F r^2}{G m_2}'
      }
    }
  }
};

export default function PhysicsEquationVisualizer() {
  const [activeTab, setActiveTab] = useState<string>('kinematics');
  const [selectedSubjectVar, setSelectedSubjectVar] = useState<string>(() => {
    const keys = Object.keys(equationsConfig['kinematics'].rearrangements);
    return keys[0] || '';
  });
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    Object.entries(equationsConfig['kinematics'].variables).forEach(([key, variable]) => {
      defaults[key] = variable.defaultValue;
    });
    return defaults;
  });
  
  // Animation states
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const lastStateUpdateRef = useRef<number>(0);

  const activeEquation = equationsConfig[activeTab];

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    
    const eq = equationsConfig[tabId];
    const defaults: Record<string, number> = {};
    Object.entries(eq.variables).forEach(([key, variable]) => {
      defaults[key] = variable.defaultValue;
    });
    setSliderValues(defaults);
    
    const keys = Object.keys(eq.rearrangements);
    setSelectedSubjectVar(keys[0] || '');
    
    setSimTime(0);
    lastTimeRef.current = Date.now();
  }, []);

  // Simulation clock handler (throttled to ~30 FPS to prevent 60 FPS React re-render CPU spikes)
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const updateSim = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (now - lastStateUpdateRef.current >= 33) {
        lastStateUpdateRef.current = now;
        setSimTime(prev => {
          let next = prev + delta;
          // Repeat cycle for wave and kinematics
          if (activeTab === 'kinematics') {
            const maxTime = sliderValues.t || 3;
            if (next > maxTime) next = 0;
          } else if (activeTab === 'waves') {
            if (next > 10) next = 0;
          } else if (activeTab === 'newton2') {
            if (next > 4) next = 0;
          }
          return next;
        });
      }

      animFrameRef.current = requestAnimationFrame(runLoop);
    };

    const runLoop = () => updateSim();

    lastTimeRef.current = Date.now();
    lastStateUpdateRef.current = Date.now();
    animFrameRef.current = requestAnimationFrame(runLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, activeTab, sliderValues.t]);

  const handleSliderChange = (key: string, val: number) => {
    setSliderValues(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    Object.entries(activeEquation.variables).forEach(([key, val]) => {
      defaults[key] = val.defaultValue;
    });
    setSliderValues(defaults);
    setSimTime(0);
  };

  // Perform active calculation results
  const calculateResult = () => {
    if (Object.keys(sliderValues).length === 0) return 0;

    switch (activeTab) {
      case 'kinematics': {
        const u = sliderValues.u ?? 5;
        const a = sliderValues.a ?? 2;
        const t = sliderValues.t ?? 3;
        // s = ut + 0.5 a t^2
        return parseFloat((u * t + 0.5 * a * t * t).toFixed(2));
      }
      case 'newton2': {
        const F_app = sliderValues.F_applied ?? 50;
        const m = sliderValues.m ?? 10;
        const mu = sliderValues.mu ?? 0.3;
        const g = 9.81; // standard gravity
        const f_max = mu * m * g;
        
        let friction = f_max;
        if (F_app <= f_max) {
          friction = F_app;
        }
        const f_net = Math.max(0, F_app - friction);
        const acc = f_net / m;
        
        return {
          friction: parseFloat(friction.toFixed(1)),
          f_net: parseFloat(f_net.toFixed(1)),
          acceleration: parseFloat(acc.toFixed(2))
        };
      }
      case 'waves': {
        const f = sliderValues.f ?? 4;
        const lambda = sliderValues.lambda ?? 2.5;
        // v = f * lambda
        return parseFloat((f * lambda).toFixed(2));
      }
      case 'gravitation': {
        const m1 = sliderValues.m1 ?? 6; // x10^24 kg
        const m2 = sliderValues.m2 ?? 7.3; // x10^22 kg
        const r = sliderValues.r ?? 3.8; // x10^5 km
        // F = G * m1 * m2 / r^2
        const G_scaled = 6.674; // scaling factor
        const force = G_scaled * (m1 * m2) / (r * r);
        return parseFloat(force.toFixed(2));
      }
      default:
        return 0;
    }
  };

  const results = calculateResult();

  // Helper to format LaTeX rearrangements using styled tags
  const renderMathLatex = (tex: string) => {
    return tex
      .replace(/\\frac{([^}]+)}{([^}]+)}/g, '<span class="inline-flex flex-col align-middle text-center mx-1"><span class="border-b border-gray-400 px-1">$1</span><span class="px-1">$2</span></span>')
      .replace(/\\sqrt{([^}]+)}/g, '<span class="border-t border-l border-gray-500 pl-1 mt-1 font-serif"><span class="text-sm font-sans">√</span>$1</span>')
      .replace(/_1/g, '<sub>1</sub>')
      .replace(/_2/g, '<sub>2</sub>')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\frac/g, '') // fallbacks
      .replace(/_\{applied\}/g, '<sub>applied</sub>')
      .replace(/_\{net\}/g, '<sub>net</sub>')
      .replace(/_\{app\}/g, '<sub>app</sub>')
      .replace(/_\{friction\}/g, '<sub>friction</sub>')
      .replace(/\^2/g, '²')
      .replace(/\*/g, ' · ');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      {/* Navbar navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/physics-rush" className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-sm transition-colors group">
            <ArrowLeft size={18} />
            <span className="uppercase tracking-wider">Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded shadow-sm">
              <Zap size={14} fill="currentColor" className="text-blue-700" />
              <span>Interactive Toolkit</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Page title header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-100 rounded text-[10px] font-bold uppercase tracking-widest text-purple-700 shadow-sm">
              <Brain size={14} /> Concept Lab
            </div>
            <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Interactive Equation Visualizer</h1>
            <p className="text-gray-600 max-w-xl">Slide variables, observe real-time visual simulations, and master algebraic rearrangements step-by-step.</p>
          </div>
          
          {/* Tab selector for physics formulas */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'kinematics', label: 'Displacement', icon: <Activity size={14} /> },
              { id: 'newton2', label: 'Force & Friction', icon: <Sliders size={14} /> },
              { id: 'waves', label: 'Wave Equation', icon: <Activity size={14} /> },
              { id: 'gravitation', label: 'Gravitation', icon: <HelpCircle size={14} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-all border ${
                  activeTab === tab.id
                  ? 'bg-blue-700 border-blue-700 text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: VISUALIZER CANVAS AND CONTROLS (Col-span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Visualizer Canvas Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[420px]">
              
              {/* Header inside canvas */}
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center shrink-0">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={14} className="text-blue-700" /> Live Simulation
                </span>
                
                {/* Control Actions */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-xs font-bold text-gray-600"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button 
                    onClick={handleReset}
                    className="p-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-xs font-bold text-gray-600"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>

              {/* Dynamic Simulation Drawing Canvas */}
              <div className="flex-1 bg-gray-900 relative overflow-hidden flex items-center justify-center p-6">
                
                {/* 1. KINEMATICS SIMULATION */}
                {activeTab === 'kinematics' && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-400 font-mono text-xs">
                      Simulation clock: {simTime.toFixed(2)}s / {(sliderValues.t ?? 3).toFixed(1)}s
                    </div>
                    
                    {/* SVG track & car */}
                    <div className="relative flex-1 flex items-center">
                      <svg width="100%" height="100px" className="overflow-visible">
                        {/* Track road */}
                        <line x1="0" y1="80" x2="100%" y2="80" stroke="#475569" strokeWidth="6" strokeDasharray="10 5" />
                        <line x1="0" y1="83" x2="100%" y2="83" stroke="#334155" strokeWidth="2" />
                        
                        {/* Marker ticks every 50px */}
                        {Array.from({ length: 15 }).map((_, i) => (
                          <g key={i} transform={`translate(${i * 60 + 20}, 80)`}>
                            <line x1="0" y1="0" x2="0" y2="8" stroke="#64748b" strokeWidth="2" />
                            <text x="0" y="20" fill="#475569" fontSize="9" textAnchor="middle" fontFamily="monospace">{(i * 5).toFixed(0)}m</text>
                          </g>
                        ))}

                        {/* Animated car based on equations: s = ut + 0.5 a t^2 */}
                        {(() => {
                          const u = sliderValues.u ?? 5;
                          const a = sliderValues.a ?? 2;
                          // Calculate active displacement at current simTime
                          const currentDisplacement = u * simTime + 0.5 * a * simTime * simTime;
                          // Scale displacement for display (10px per meter)
                          const startX = 50;
                          const carX = Math.max(startX, Math.min(650, startX + currentDisplacement * 6));

                          return (
                            <g transform={`translate(${carX}, 45)`} className="transition-transform duration-75">
                              {/* Car body */}
                              <rect x="-30" y="5" width="60" height="20" rx="4" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
                              <path d="M-15 5 L-5 -12 L15 -12 L22 5 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
                              
                              {/* Windows */}
                              <polygon points="-4,2 12,2 8,-7 -1,-7" fill="#eff6ff" opacity="0.8" />
                              
                              {/* Wheels */}
                              <circle cx="-16" cy="25" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                              <circle cx="16" cy="25" r="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                              <circle cx="-16" cy="25" r="3" fill="#94a3b8" />
                              <circle cx="16" cy="25" r="3" fill="#94a3b8" />

                              {/* Vector Velocity Arrow (green) */}
                              {u + a * simTime > 0 && (
                                <g transform="translate(35, 15)">
                                  <line x1="0" y1="0" x2={Math.min(100, 15 + (u + a * simTime) * 2)} y2="0" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
                                  <text x="10" y="-8" fill="#10b981" fontSize="10" fontWeight="bold">v = {(u + a * simTime).toFixed(1)} m/s</text>
                                </g>
                              )}
                            </g>
                          );
                        })()}
                        
                        {/* Define SVG Markers */}
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                    </div>

                    {/* Simulation Metrics readout */}
                    <div className="bg-gray-800/80 rounded border border-gray-700/50 p-4 grid grid-cols-3 gap-4 text-center font-mono">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Velocity</div>
                        <div className="text-lg font-bold text-green-400">
                          {((sliderValues.u ?? 5) + (sliderValues.a ?? 2) * simTime).toFixed(2)} <span className="text-xs">m/s</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Acceleration</div>
                        <div className="text-lg font-bold text-blue-400">
                          {(sliderValues.a ?? 2).toFixed(2)} <span className="text-xs">m/s²</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Displacement</div>
                        <div className="text-lg font-bold text-yellow-400">
                          {((sliderValues.u ?? 5) * simTime + 0.5 * (sliderValues.a ?? 2) * simTime * simTime).toFixed(2)} <span className="text-xs">m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. FORCE & FRICTION SIMULATION */}
                {activeTab === 'newton2' && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-400 font-mono text-xs">
                      Simulation loop: {simTime.toFixed(2)}s / 4s
                    </div>

                    {/* Physics Draw Area */}
                    <div className="relative flex-1 flex items-center justify-center">
                      <svg width="100%" height="150px" className="overflow-visible">
                        {/* Flat surface */}
                        <line x1="0" y1="110" x2="100%" y2="110" stroke="#475569" strokeWidth="4" />
                        
                        {/* Slide box */}
                        {(() => {
                          const F_app = sliderValues.F_applied ?? 50;
                          const m = sliderValues.m ?? 10;
                          const mu = sliderValues.mu ?? 0.3;
                          const g = 9.81;
                          const f_max = mu * m * g;
                          const net_force = Math.max(0, F_app - f_max);
                          const acc = net_force / m;

                          // Box dimensions scale with mass
                          const size = 40 + m * 2;
                          // Box placement calculates displacement over time loop
                          const displacement = 0.5 * acc * (simTime * simTime);
                          const startX = 250;
                          const boxX = Math.max(startX - 100, Math.min(450, startX - 100 + displacement * 20));

                          return (
                            <g transform={`translate(${boxX}, ${110 - size})`}>
                              {/* Box body */}
                              <rect x="0" y="0" width={size} height={size} fill="#f97316" stroke="#ea580c" strokeWidth="3" rx="2" />
                              
                              {/* Weight center label */}
                              <text x={size/2} y={size/2 + 5} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{m}kg</text>

                              {/* Normal Force Arrow (up) */}
                              <g transform={`translate(${size/2}, 0)`}>
                                <line x1="0" y1="0" x2="0" y2={-Math.min(60, size + 10)} stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrow)" />
                                <text x="8" y={-Math.min(40, size)} fill="#60a5fa" fontSize="9" fontWeight="bold">F_N = {(m * 9.8).toFixed(0)}N</text>
                              </g>

                              {/* Gravity Arrow (down) */}
                              <g transform={`translate(${size/2}, ${size})`}>
                                <line x1="0" y1="0" x2="0" y2={Math.min(60, size + 10)} stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrow)" />
                                <text x="8" y={Math.min(40, size)} fill="#60a5fa" fontSize="9" fontWeight="bold">W = {(m * 9.8).toFixed(0)}N</text>
                              </g>

                              {/* Applied Force Arrow (right, starts from left edge pushing, or right pulling) */}
                              <g transform={`translate(${size}, ${size/2})`}>
                                <line x1="0" y1="0" x2={Math.min(100, F_app * 1.2)} y2="0" stroke="#10b981" strokeWidth="4" markerEnd="url(#arrow)" />
                                <text x={Math.min(70, F_app * 1.2)} y="-8" fill="#10b981" fontSize="10" fontWeight="bold">F_app = {F_app}N</text>
                              </g>

                              {/* Friction Force Arrow (left) */}
                              <g transform={`translate(0, ${size/2})`}>
                                {F_app > 0 && (
                                  <>
                                    <line x1="0" y1="0" x2={-Math.min(100, (F_app <= f_max ? F_app : f_max) * 1.2)} y2="0" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
                                    <text x={-Math.min(70, (F_app <= f_max ? F_app : f_max) * 1.2) - 15} y="-8" fill="#ef4444" fontSize="10" fontWeight="bold">
                                      F_f = {(F_app <= f_max ? F_app : f_max).toFixed(0)}N
                                    </text>
                                  </>
                                )}
                              </g>
                            </g>
                          );
                        })()}
                        
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                    </div>

                    {/* Calculated physics readout */}
                    {(() => {
                      const res = results as { friction: number; f_net: number; acceleration: number };
                      return (
                        <div className="bg-gray-800/80 rounded border border-gray-700/50 p-4 grid grid-cols-3 gap-4 text-center font-mono">
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase">Max Static Friction</div>
                            <div className="text-sm font-bold text-red-400">
                              {((sliderValues.mu ?? 0.3) * (sliderValues.m ?? 10) * 9.81).toFixed(1)} N
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold text-red-500">Friction Opposed</div>
                            <div className="text-sm font-bold text-red-500">
                              {res.friction} N
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase">Net Acceleration</div>
                            <div className="text-lg font-bold text-green-400">
                              {res.acceleration} <span className="text-xs">m/s²</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 3. WAVE EQUATION SIMULATION */}
                {activeTab === 'waves' && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-400 font-mono text-xs">
                      Wave Cycle Speed: {((sliderValues.f ?? 4) * (sliderValues.lambda ?? 2.5)).toFixed(1)} m/s
                    </div>
                    
                    {/* SVG Animated Wave */}
                    <div className="relative flex-1 flex items-center justify-center">
                      <svg width="100%" height="150" className="overflow-visible">
                        {(() => {
                          const f = sliderValues.f ?? 4;
                          const lambda = sliderValues.lambda ?? 2.5;
                          
                          // Generate coordinates for the sine wave path
                          const width = 600;
                          const points: string[] = [];
                          
                          // Wavelength scale factor (pixels per meter)
                          const pxPerMeter = 100;
                          const scaledLambda = lambda * pxPerMeter;
                          
                          for (let x = 0; x <= width; x += 3) {
                            // Phase shift based on time: v = f * lambda => phase = 2pi * (x/lambda - f * t)
                            const phase = 2 * Math.PI * (x / scaledLambda - f * simTime);
                            const y = 75 + Math.sin(phase) * 35; // 35px amplitude
                            points.push(`${x},${y}`);
                          }
                          
                          const d = `M ${points.join(' L ')}`;
                          
                          return (
                            <>
                              {/* Baseline reference */}
                              <line x1="0" y1="75" x2="100%" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="5 5" />
                              
                              {/* Wave path */}
                              <path d={d} fill="none" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
                              
                              {/* Crest particles to show movement */}
                              {Array.from({ length: 4 }).map((_, i) => {
                                // Position is tracked along the wave speed
                                const v = f * lambda;
                                const speedScale = v * 20; // scale speeds
                                const particleX = ((simTime * speedScale) + (i * 150)) % width;
                                const phase = 2 * Math.PI * (particleX / scaledLambda - f * simTime);
                                const particleY = 75 + Math.sin(phase) * 35;

                                return (
                                  <g key={i} className="transition-transform duration-75">
                                    <circle cx={particleX} cy={particleY} r="6" fill="#f357a8" stroke="#ffffff" strokeWidth="1.5" />
                                    {i === 1 && (
                                      <g transform={`translate(${particleX - 30}, ${particleY - 20})`}>
                                        <rect x="0" y="0" width="60" height="15" fill="#1e293b" rx="3" stroke="#f357a8" strokeWidth="1" />
                                        <text x="30" y="11" fill="#eff6ff" fontSize="8" textAnchor="middle" fontWeight="bold">Crest</text>
                                      </g>
                                    )}
                                  </g>
                                );
                              })}
                            </>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Wavelength measurement tool */}
                    <div className="bg-gray-800/80 rounded border border-gray-700/50 p-4 grid grid-cols-2 gap-4 text-center font-mono">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Frequency (f)</div>
                        <div className="text-base font-bold text-purple-300">
                          {(sliderValues.f ?? 4).toFixed(1)} Hz (cycles/sec)
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold text-yellow-500">Calculated Wave Speed (v)</div>
                        <div className="text-lg font-bold text-yellow-400">
                          {results as number} <span className="text-xs">m/s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. GRAVITATIONAL LAW SIMULATION */}
                {activeTab === 'gravitation' && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-400 font-mono text-xs">
                      Scaling constant G = 6.674
                    </div>

                    {/* Orbit draw space */}
                    <div className="relative flex-1 flex items-center justify-center">
                      <svg width="100%" height="180px" className="overflow-visible">
                        {(() => {
                          const m1 = sliderValues.m1 ?? 6;
                          const m2 = sliderValues.m2 ?? 7.3;
                          const r = sliderValues.r ?? 3.8; // scaled distance 1.5 to 10
                          
                          // Convert variables to visual display scales
                          const rPixels = 100 + r * 30; // mapping r to distance between planet centers
                          
                          const c1x = 300 - rPixels / 2;
                          const c2x = 300 + rPixels / 2;
                          const cy = 90;
                          
                          const r1 = 15 + m1 * 2; // radius scale on Mass 1
                          const r2 = 8 + m2 * 1.5; // radius scale on Mass 2
                          
                          const forceVal = results as number;
                          // Arrow size scales with gravitational pull force
                          const arrowLen = Math.min(100, Math.max(15, forceVal * 4));

                          return (
                            <>
                              {/* Center link line */}
                              <line x1={c1x} y1={cy} x2={c2x} y2={cy} stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                              
                              {/* Distance label */}
                              <g transform={`translate(${300}, ${cy - 12})`}>
                                <text x="0" y="0" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">r = {r.toFixed(2)} ×10⁵ km</text>
                              </g>

                              {/* Planet 1 (Earth-like) */}
                              <circle cx={c1x} cy={cy} r={r1} fill="#1d4ed8" stroke="#3b82f6" strokeWidth="2" />
                              {/* Atmosphere glow */}
                              <circle cx={c1x} cy={cy} r={r1 + 4} fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 3" />
                              <text x={c1x} y={cy + 4} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">m₁</text>
                              <text x={c1x} y={cy + r1 + 14} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">{m1} ×10²⁴kg</text>

                              {/* Planet 2 (Moon-like) */}
                              <circle cx={c2x} cy={cy} r={r2} fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
                              <text x={c2x} y={cy + 3} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">m₂</text>
                              <text x={c2x} y={cy + r2 + 14} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">{m2} ×10²²kg</text>

                              {/* Attractive Force Arrow on Body 1 pointing towards Body 2 */}
                              <g transform={`translate(${c1x + r1 + 2}, ${cy})`}>
                                <line x1="0" y1="0" x2={arrowLen} y2="0" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                                <text x="5" y="-6" fill="#f43f5e" fontSize="9" fontWeight="bold">F_grav</text>
                              </g>

                              {/* Attractive Force Arrow on Body 2 pointing towards Body 1 */}
                              <g transform={`translate(${c2x - r2 - 2}, ${cy})`}>
                                <line x1="0" y1="0" x2={-arrowLen} y2="0" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                                <text x={-arrowLen + 5} y="-6" fill="#f43f5e" fontSize="9" fontWeight="bold">F_grav</text>
                              </g>
                            </>
                          );
                        })()}

                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                          </marker>
                        </defs>
                      </svg>
                    </div>

                    {/* Inverse Square Law verification display */}
                    <div className="bg-gray-800/80 rounded border border-gray-700/50 p-4 grid grid-cols-2 gap-4 text-center font-mono">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase">Proportionality Factor (m₁·m₂ / r²)</div>
                        <div className="text-sm font-bold text-gray-300">
                          {(((sliderValues.m1 ?? 6) * (sliderValues.m2 ?? 7.3)) / ((sliderValues.r ?? 3.8) * (sliderValues.r ?? 3.8))).toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold text-rose-400">Gravitational Pull (F)</div>
                        <div className="text-lg font-bold text-rose-500">
                          {results as number} <span className="text-xs">×10²⁰ N</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Input Variables Slider Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sliders size={18} className="text-blue-700" /> Variable Sliders
              </h3>
              
              <div className="space-y-6">
                {Object.entries(activeEquation.variables).map(([key, variable]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-700 flex items-center gap-1.5">
                        <span className="inline-flex w-7 h-7 items-center justify-center bg-gray-100 rounded text-xs font-mono font-black text-gray-600">{variable.symbol}</span>
                        {variable.name}
                      </span>
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded text-xs border border-blue-100">
                        {sliderValues[key]?.toFixed(variable.step < 1 ? 2 : 0)} <span className="text-gray-400 text-[10px] font-normal lowercase">{variable.unit}</span>
                      </span>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                      <span className="text-xs font-mono text-gray-400 w-8 text-right">{variable.min}</span>
                      <input 
                        type="range"
                        min={variable.min}
                        max={variable.max}
                        step={variable.step}
                        value={sliderValues[key] ?? variable.defaultValue}
                        onChange={(e) => handleSliderChange(key, parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                      />
                      <span className="text-xs font-mono text-gray-400 w-8">{variable.max}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-400 leading-normal pl-9">{variable.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STEP-BY-STEP ALGEBRAIC SOLVER (Col-span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Rearrange Mode algebraic solver card */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <RefreshCw size={120} className="text-blue-700" />
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 border border-yellow-100 rounded text-[10px] font-black uppercase tracking-widest text-yellow-700 shadow-sm">
                  <Sparkles size={12} /> Active Rearrange Mode
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 font-serif">Formula Rearranger</h3>
                <p className="text-sm text-gray-500">Choose which variable you want to isolate. The solver will demonstrate the chronological algebraic steps.</p>
              </div>

              {/* Variable subject selector buttons */}
              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Variable to Isolate (Subject)</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(activeEquation.rearrangements).map((varKey) => {
                    const variableInfo = activeEquation.variables[varKey] || { name: varKey, symbol: varKey };
                    return (
                      <button
                        key={varKey}
                        onClick={() => setSelectedSubjectVar(varKey)}
                        className={`px-4 py-2.5 rounded font-black text-xs transition-all border ${
                          selectedSubjectVar === varKey
                          ? 'bg-purple-700 border-purple-700 text-white shadow-md'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        Isolate {variableInfo.symbol} ({variableInfo.name})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Steps display panel */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 space-y-6 flex-1">
                <div className="flex justify-between items-center border-b border-gray-200/50 pb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resulting Formula</span>
                  <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-1 rounded uppercase tracking-wider">Isolated Symbol: {selectedSubjectVar}</span>
                </div>

                {/* Math rendering box */}
                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-inner flex flex-col items-center justify-center min-h-[100px]">
                  <div 
                    className="text-2xl font-bold font-serif tracking-wide text-center"
                    dangerouslySetInnerHTML={{ 
                      __html: activeEquation.rearrangements[selectedSubjectVar] 
                        ? renderMathLatex(activeEquation.rearrangements[selectedSubjectVar].finalTex)
                        : renderMathLatex(activeEquation.formulaTex)
                    }}
                  />
                </div>

                {/* Algebraic steps list */}
                <div className="space-y-4 pt-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Mathematical Workings</span>
                  
                  <div className="space-y-3">
                    {activeEquation.rearrangements[selectedSubjectVar]?.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-white border border-gray-100 rounded p-4 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center font-bold text-xs text-purple-700 shrink-0 border border-purple-100">
                          {idx + 1}
                        </div>
                        <p className="text-xs font-semibold text-gray-600 leading-relaxed pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Examiner Insight / Common Pitfalls Card */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 shadow-sm space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen size={100} className="text-orange-700" />
              </div>
              
              <h4 className="text-orange-800 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Info size={16} /> Examiner Insight
              </h4>
              
              <p className="text-sm font-semibold text-orange-950 leading-relaxed">
                {activeEquation.examinerInsight}
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
