"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, Pause, RotateCcw, Activity, HelpCircle, Sliders, 
  Sparkles, BookOpen, Brain, Info, Award, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';

// Unified Labs Database
type LabConfig = {
  title: string;
  subject: string;
  syllabusRef: string;
  description: string;
  objectives: string[];
  controls: string[];
  feedback: string;
  inquiry: string[];
  sliders: {
    key: string;
    symbol: string;
    name: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    description: string;
  }[];
  formulas: { name: string; tex: string }[];
};

const labsDatabase: Record<string, LabConfig> = {
  // core high-fidelity physics
  "physics-vector-addition-components": {
    title: "Vector Addition & Components Lab",
    subject: "Physics",
    syllabusRef: "1.1 Physical Quantities and Measurement Techniques",
    description: "Drag vector arrows on a Cartesian coordinate grid to set their magnitude and direction. Resolve vectors into horizontal and vertical components, and construct resultant additions.",
    objectives: [
      "Distinguish between scalar and vector quantities",
      "Determine the resultant of two or more vectors",
      "Resolve a vector into perpendicular components (Fx = F cos θ, Fy = F sin θ)."
    ],
    controls: ["Force Magnitude (F)", "Angle (θ)", "Component Projection Toggles", "Resultant Addition Toggle"],
    feedback: "Coordinate projection lines showing component values. Dynamic vector addition chains.",
    inquiry: [
      "Set Force to 50N and Angle to 30°. Record the Fx and Fy values.",
      "Calculate F cos(30°) and F sin(30°) on paper. Compare to the live simulation values.",
      "Vary the angle to 90°, 180°, and 270°. Observe what happens to the sign of components."
    ],
    sliders: [
      { key: "F", symbol: "F", name: "Force Magnitude", unit: "N", min: 0, max: 100, step: 1, defaultValue: 60, description: "Total vector force strength." },
      { key: "theta", symbol: "θ", name: "Vector Angle", unit: "°", min: 0, max: 360, step: 5, defaultValue: 45, description: "Direction of force relative to horizontal axis." }
    ],
    formulas: [
      { name: "Horizontal Component", tex: "F_x = F \\cos(\\theta)" },
      { name: "Vertical Component", tex: "F_y = F \\sin(\\theta)" },
      { name: "Resultant Magnitude", tex: "R = \\sqrt{F_x^2 + F_y^2}" }
    ]
  },
  "physics-motion-graphs": {
    title: "Motion Graphs Lab",
    subject: "Physics",
    syllabusRef: "1.2 Motion",
    description: "Animate a car moving along a track with constant or changing speed. Visualize and plot displacement-time (s-t), velocity-time (v-t), and acceleration-time (a-t) graphs in real time.",
    objectives: [
      "Define displacement, speed, velocity, and acceleration",
      "Plot and interpret motion graphs",
      "Calculate velocity from s-t graph slope and acceleration from v-t graph slope."
    ],
    controls: ["Initial Position (s0)", "Velocity (u)", "Acceleration (a)", "Time duration slider"],
    feedback: "Moving car with displacement velocity arrows. Graphs plotting position and speed over time.",
    inquiry: [
      "Set acceleration to 0. Notice the shape of s-t graph (straight line) and v-t graph (flat line).",
      "Set a positive acceleration. Observe how the displacement graph curves upwards.",
      "Calculate the area under the v-t graph and verify that it equals total displacement."
    ],
    sliders: [
      { key: "s0", symbol: "s₀", name: "Initial Position", unit: "m", min: -30, max: 30, step: 1, defaultValue: 0, description: "Starting point of the vehicle on the track." },
      { key: "u", symbol: "u", name: "Initial Velocity", unit: "m/s", min: -10, max: 10, step: 1, defaultValue: 4, description: "Starting speed and direction." },
      { key: "a", symbol: "a", name: "Acceleration", unit: "m/s²", min: -4, max: 4, step: 0.5, defaultValue: 1.5, description: "Rate at which velocity changes." }
    ],
    formulas: [
      { name: "Displacement Equation", tex: "s(t) = s_0 + u t + \\frac{1}{2} a t^2" },
      { name: "Velocity Equation", tex: "v(t) = u + a t" }
    ]
  },
  "physics-weight-gravity": {
    title: "Weight, Gravity, & Planets Lab",
    subject: "Physics",
    syllabusRef: "1.3 Mass and Weight",
    description: "Simulate gravity between planetary bodies. Tweak planet masses and their distance to observe attractive force and verify the gravitational inverse-square law.",
    objectives: [
      "Define gravitational force and field strength (g)",
      "State the relationship between weight, mass, and gravitational field strength",
      "Verify the inverse-square dependency of distance on gravitational force."
    ],
    controls: ["Mass of Planet 1 (m1)", "Mass of Satellite 2 (m2)", "Distance apart (r)"],
    feedback: "Planets with sizes reflecting mass. Attraction vectors showing gravitational force.",
    inquiry: [
      "Set distance (r) to 4. Note the force. Double the distance to 8. Observe how force shrinks to 1/4.",
      "Triple the distance and confirm that force reduces to 1/9.",
      "Vary mass 1 and mass 2. Observe the direct linear relationship with force."
    ],
    sliders: [
      { key: "m1", symbol: "m₁", name: "Mass of Planet", unit: "×10²⁴ kg", min: 1, max: 10, step: 0.5, defaultValue: 6.0, description: "Mass of primary planet (e.g. Earth = 6.0)." },
      { key: "m2", symbol: "m₂", name: "Mass of Satellite", unit: "×10²² kg", min: 1, max: 10, step: 0.5, defaultValue: 7.3, description: "Mass of secondary body (e.g. Moon = 7.3)." },
      { key: "r", symbol: "r", name: "Distance apart", unit: "×10⁵ km", min: 2.0, max: 10, step: 0.5, defaultValue: 4.0, description: "Center-to-center separation distance." }
    ],
    formulas: [
      { name: "Weight Equation", tex: "W = m g" },
      { name: "Newton's Gravity Law", tex: "F = G \\frac{m_1 m_2}{r^2}" }
    ]
  },
  "physics-density-archimedes": {
    title: "Density & Archimedes' Principle Lab",
    subject: "Physics",
    syllabusRef: "1.4 Density & Flotation",
    description: "Dunk blocks of varying masses and volumes into fluids of differing densities. Calculate block densities and verify Archimedes' buoyant force calculations.",
    objectives: [
      "Define density and apply ρ = m/V",
      "Explain the floating and sinking criteria based on density ratios",
      "Calculate buoyant force as weight of fluid displaced."
    ],
    controls: ["Block Mass (m)", "Block Volume (V)", "Liquid Density (ρ_fluid)"],
    feedback: "Beaker of fluid showing submerged block. Buoyant force vector versus gravity vector.",
    inquiry: [
      "Set Block Mass to 100g and Volume to 200 cm³. Notice if it floats. What is the block density?",
      "Vary the liquid density to Oil (0.8 g/cm³) and Saltwater (1.2 g/cm³). Watch how the submerged fraction changes.",
      "Calculate the buoyant force for a floating block and show it equals the gravitational weight."
    ],
    sliders: [
      { key: "m", symbol: "m", name: "Block Mass", unit: "g", min: 20, max: 250, step: 10, defaultValue: 120, description: "Mass of the solid block." },
      { key: "V", symbol: "V", name: "Block Volume", unit: "cm³", min: 50, max: 300, step: 10, defaultValue: 150, description: "Physical volume of the block." },
      { key: "rho_fluid", symbol: "ρ_L", name: "Liquid Density", unit: "g/cm³", min: 0.7, max: 1.5, step: 0.1, defaultValue: 1.0, description: "Density of fluid (Water = 1.0, Oil = 0.8, Salt = 1.2)." }
    ],
    formulas: [
      { name: "Density Formula", tex: "\\rho = \\frac{m}{V}" },
      { name: "Buoyant Force", tex: "F_b = \\rho_{fluid} V_{submerged} g" }
    ]
  },
  "physics-moments-balance": {
    title: "Moments & Balance Beam Lab",
    subject: "Physics",
    syllabusRef: "1.5 Effects of Forces",
    description: "Place weights of varying masses at different positions on a pivoted see-saw. Calculate anticlockwise and clockwise moments to achieve balance.",
    objectives: [
      "Define moment of a force as force times perpendicular distance (F × d)",
      "State and apply the principle of moments for a system in equilibrium",
      "Calculate unknown force or distance on a balance beam."
    ],
    controls: ["Left Mass (m1)", "Left Distance (d1)", "Right Mass (m2)", "Right Distance (d2)"],
    feedback: "Pivoted see-saw showing weights. Active moment calculation scales.",
    inquiry: [
      "Place a 4kg mass 3m to the left of the pivot. Calculate the anticlockwise moment.",
      "Predict where you must place a 6kg mass on the right to balance the see-saw. Verify with sliders.",
      "Sum the moments on each side and observe how the beam rotates when moments are unequal."
    ],
    sliders: [
      { key: "m1", symbol: "m₁", name: "Left Mass", unit: "kg", min: 1, max: 10, step: 1, defaultValue: 5, description: "Mass placed on left see-saw side." },
      { key: "d1", symbol: "d₁", name: "Left Distance", unit: "m", min: 1, max: 5, step: 0.5, defaultValue: 3, description: "Distance of left mass from center pivot." },
      { key: "m2", symbol: "m₂", name: "Right Mass", unit: "kg", min: 1, max: 10, step: 1, defaultValue: 3, description: "Mass placed on right see-saw side." },
      { key: "d2", symbol: "d₂", name: "Right Distance", unit: "m", min: 1, max: 5, step: 0.5, defaultValue: 4, description: "Distance of right mass from center pivot." }
    ],
    formulas: [
      { name: "Moment of Force", tex: "M = F \\times d" },
      { name: "Equilibrium Condition", tex: "M_{anticlockwise} = M_{clockwise}" }
    ]
  },

  // core chemistry
  "chemistry-titration-neutralization": {
    title: "Acid-Base Titration Simulator",
    subject: "Chemistry",
    syllabusRef: "C8. Acids, Bases, and Salts",
    description: "Control the drip rate of a acid burette into an alkaline flask. Add indicators (phenolphthalein, methyl orange) and record pH curves to find the neutralization equivalence endpoint.",
    objectives: [
      "Conduct a virtual acid-base titration",
      "Describe pH changes during titration of strong/weak substances",
      "Identify the titration end-point using indicators and graphical curves."
    ],
    controls: ["Burette tap drip button", "pH indicator toggle", "Acid Concentration (M)", "Alkali Volume (mL)"],
    feedback: "Burette drip animation. Conical flask color shifts at neutralization endpoint. Dynamic graph plotting pH.",
    inquiry: [
      "Select Phenolphthalein indicator. Note the initial pink color of the sodium hydroxide base.",
      "Add acid drops. Slow down near 25mL added and observe when the pink color vanishes (neutralization).",
      "Plot the pH curve. Note the vertical region of the graph where equivalence occurs."
    ],
    sliders: [
      { key: "C_acid", symbol: "C_A", name: "Acid Concentration", unit: "M", min: 0.1, max: 1.0, step: 0.1, defaultValue: 0.5, description: "Molarity of the hydrochloric acid in burette." },
      { key: "V_base", symbol: "V_B", name: "Alkali Volume", unit: "mL", min: 10, max: 50, step: 5, defaultValue: 25, description: "Volume of base in the receiving conical flask." },
      { key: "drops", symbol: "drops", name: "Acid Added", unit: "mL", min: 0, max: 50, step: 0.5, defaultValue: 0, description: "Volume of acid dripped into flask." }
    ],
    formulas: [
      { name: "Neutralization Equation", tex: "HCl + NaOH \\rightarrow NaCl + H_2O" },
      { name: "Concentration Formula", tex: "C_A V_A = C_B V_B" }
    ]
  },
  "chemistry-electron-shell": {
    title: "Atomic Structure & Electron Shell Builder",
    subject: "Chemistry",
    syllabusRef: "C3. Atoms, Elements, and Compounds",
    description: "Assemble subatomic particles (protons, neutrons, electrons) to construct Bohr atoms. Learn electron arrangement trends (2,8,8) and identify periodic group properties.",
    objectives: [
      "State relative charges and masses of protons, neutrons, and electrons",
      "Determine electron shell configuration for atomic numbers 1 to 18",
      "Relate valence electrons to group number in periodic table."
    ],
    controls: ["Proton slider", "Neutron slider", "Electron slider"],
    feedback: "Bohr shell ring drawing. Nucleus representation. Element tag displaying atomic symbol and mass.",
    inquiry: [
      "Build a Carbon atom (6 protons, 6 neutrons, 6 electrons). Record its configuration (2,4).",
      "Add electrons. Notice how the first ring fills at 2 and the second fills at 8.",
      "Verify that elements with 8 valence electrons belong to Group 0 (Noble Gases)."
    ],
    sliders: [
      { key: "protons", symbol: "p⁺", name: "Protons Count", unit: "qty", min: 1, max: 18, step: 1, defaultValue: 6, description: "Defines the atomic number and element identity." },
      { key: "neutrons", symbol: "n⁰", name: "Neutrons Count", unit: "qty", min: 1, max: 22, step: 1, defaultValue: 6, description: "Contributes to atomic mass and isotopes." },
      { key: "electrons", symbol: "e⁻", name: "Electrons Count", unit: "qty", min: 1, max: 18, step: 1, defaultValue: 6, description: "Populates Bohr orbit shells." }
    ],
    formulas: [
      { name: "Mass Number", tex: "A = protons + neutrons" },
      { name: "Electron Shell Capacity", tex: "Max = 2 n^2" }
    ]
  },
  "chemistry-electrolysis-cell": {
    title: "Electrolysis Virtual Cell",
    subject: "Chemistry",
    syllabusRef: "C5. Electricity and Chemistry",
    description: "Pass current through electrolyte solutions (Copper Chloride, Water). Observe ion movement toward electrodes, copper plating, and gas bubble evolution in real time.",
    objectives: [
      "Define electrolysis, anode, cathode, and electrolyte",
      "Predict products at cathode and anode for aqueous copper chloride",
      "Describe redox half-equations occurring at electrodes."
    ],
    controls: ["Cell Voltage (V)", "Electrolyte Selector", "Solution Concentration"],
    feedback: "Anode/Cathode in beaker. Copper ion plating. Chlorine/Hydrogen gas bubbles. Voltmeter display.",
    inquiry: [
      "Select Copper Chloride electrolyte. Set voltage to 6V. Identify which electrode receives plating.",
      "Observe gas bubbles at the positive electrode. Test for chlorine (bleaches litmus paper).",
      "Write half-equations for reduction at cathode and oxidation at anode."
    ],
    sliders: [
      { key: "voltage", symbol: "V", name: "Cell Voltage", unit: "V", min: 0, max: 10, step: 0.5, defaultValue: 5, description: "Electrical potential driving electrolysis." },
      { key: "conc", symbol: "C", name: "Concentration", unit: "%", min: 5, max: 40, step: 5, defaultValue: 20, description: "Electrolyte concentration in aqueous solution." }
    ],
    formulas: [
      { name: "Cathode Reduction", tex: "Cu^{2+} + 2e^- \\rightarrow Cu" },
      { name: "Anode Oxidation", tex: "2Cl^- \\rightarrow Cl_2 + 2e^-" }
    ]
  },

  // core math
  "math-trig-circle": {
    title: "Trigonometric Unit Circle Visualizer",
    subject: "Mathematics",
    syllabusRef: "6. Trigonometry",
    description: "Rotate a vector ray on a unit circle (r = 1). Observe circular coordinates (cos θ, sin θ) and watch waveforms plot dynamically in real time.",
    objectives: [
      "Explain sine, cosine, and tangent coordinates on a unit circle",
      "Identify signs of trigonometric ratios in different quadrants (CAST system)",
      "Relate unit circle rotation to periodic sine and cosine wave graphs."
    ],
    controls: ["Angle Slider (θ)", "Wave plotting toggles", "Quadrant markers"],
    feedback: "Rotating coordinate pointer. Projection vertical/horizontal lines. Sine and Cosine plots.",
    inquiry: [
      "Set angle to 30°. Observe the y-coordinate value (0.5). What trigonometric ratio is this? (sin 30°)",
      "Rotate to 150°. Observe why sin is still positive but cos becomes negative.",
      "Vary angle to 90° and 270°. Identify what happens to tangent (vertical line goes to infinity)."
    ],
    sliders: [
      { key: "theta", symbol: "θ", name: "Angle of Rotation", unit: "°", min: 0, max: 360, step: 1, defaultValue: 60, description: "Angle in degrees relative to the positive x-axis." }
    ],
    formulas: [
      { name: "Unit Circle Radius", tex: "x^2 + y^2 = 1" },
      { name: "Trigonometric Ratios", tex: "\\sin(\\theta) = y, \\quad \\cos(\\theta) = x, \\quad \\tan(\\theta) = \\frac{y}{x}" }
    ]
  },
  "math-quadratic-functions": {
    title: "Quadratic Functions Grapher",
    subject: "Mathematics",
    syllabusRef: "3. Quadratic Functions",
    description: "Manipulate quadratic coefficients (a, b, c) and watch the parabola shift. Compute discriminant (D) and find root intersections on a real-time grid.",
    objectives: [
      "Explain the impact of quadratic coefficients on parabola shape",
      "Calculate discriminant (b² - 4ac) to determine root quantities",
      "Find parabola vertex and root coordinates."
    ],
    controls: ["Coefficient a", "Coefficient b", "Coefficient c"],
    feedback: "Parabola curve on Cartesian coordinates. Root point dots. Discriminant calculation card.",
    inquiry: [
      "Set a = 1, b = -2, c = -3. Read the roots on graph (-1 and 3). Compute the discriminant.",
      "Vary coefficient 'a' from positive to negative. Observe how the parabola flips upside down.",
      "Find a combination of a, b, c where discriminant is negative. Verify that the curve has no real roots."
    ],
    sliders: [
      { key: "a", symbol: "a", name: "Coefficient a", unit: "scale", min: -3, max: 3, step: 0.1, defaultValue: 1, description: "Controls curvature and reflection (opens up or down)." },
      { key: "b", symbol: "b", name: "Coefficient b", unit: "scale", min: -5, max: 5, step: 0.5, defaultValue: -2, description: "Shifts the parabola horizontally and vertically." },
      { key: "c", symbol: "c", name: "Constant c", unit: "y-int", min: -5, max: 5, step: 0.5, defaultValue: -3, description: "Y-intercept of the function (point where x = 0)." }
    ],
    formulas: [
      { name: "Standard Form", tex: "y = a x^2 + b x + c" },
      { name: "Discriminant Formula", tex: "D = b^2 - 4 a c" },
      { name: "Quadratic Formula", tex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4 a c}}{2 a}" }
    ]
  },
  "math-sets-venn": {
    title: "Venn Diagram Shading Lab",
    subject: "Mathematics",
    syllabusRef: "4. Sets and Venn Diagrams",
    description: "Venn diagram intersection and union explorer. Click logic operations to shade specific sets (A ∩ B, A ∪ B, A', etc.) on overlapping circles.",
    objectives: [
      "Identify set notation: union (∪), intersection (∩), complement (')",
      "Shade Venn diagrams representing complex operations",
      "Determine cardinality of intersection sets."
    ],
    controls: ["Set operation selectors", "Direct circle segment clicking"],
    feedback: "Venn diagram circle rings shading regions in color. Shaded set equation displays.",
    inquiry: [
      "Select 'Intersection (A ∩ B)' and note the shaded middle region.",
      "Select 'A union B Complement ((A ∪ B)′)'. Observe that everything outside both circles is shaded.",
      "Compare A ∩ B' with A \\ B. Verify they shade identical regions."
    ],
    sliders: [
      { key: "sizeA", symbol: "A", name: "Circle A Elements", unit: "qty", min: 5, max: 20, step: 1, defaultValue: 12, description: "Elements belonging to Set A." },
      { key: "sizeB", symbol: "B", name: "Circle B Elements", unit: "qty", min: 5, max: 20, step: 1, defaultValue: 10, description: "Elements belonging to Set B." },
      { key: "intersect", symbol: "A∩B", name: "Intersection", unit: "qty", min: 0, max: 8, step: 1, defaultValue: 4, description: "Elements common to both Set A and Set B." }
    ],
    formulas: [
      { name: "Inclusion-Exclusion", tex: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)" },
      { name: "De Morgan's Law", tex: "(A \\cup B)' = A' \\cap B'" }
    ]
  },

  // core biology
  "biology-punnett-square": {
    title: "Punnett Square Genetic Breeder",
    subject: "Biology",
    syllabusRef: "5.2 Inheritance",
    description: "Perform genetic breeding crosses. Match dominant and recessive parent alleles (BB, Bb, bb) to compute homozygous/heterozygous phenotype offspring percentages.",
    objectives: [
      "Define dominant, recessive, genotype, phenotype, homozygous, and heterozygous",
      "Construct Punnett squares for monohybrid genetic crosses",
      "Calculate probability ratios of offspring phenotypes and genotypes."
    ],
    controls: ["Father Genotype selector", "Mother Genotype selector"],
    feedback: "Dynamic 2x2 Punnett square grid. Color coded allele distributions. Genotype/Phenotype ratio cards.",
    inquiry: [
      "Cross two heterozygous parents (Bb × Bb). Verify the classic 3:1 phenotype ratio (75% dominant, 25% recessive).",
      "Cross a homozygous dominant (BB) with a homozygous recessive (bb). Observe the offspring genotypes.",
      "Explain why recessive traits can remain hidden for generations and then reappear."
    ],
    sliders: [
      { key: "crossType", symbol: "gen", name: "Offspring Sample", unit: "qty", min: 10, max: 100, step: 10, defaultValue: 50, description: "Mock population size generated for ratios." }
    ],
    formulas: [
      { name: "Genotype Ratio (Bb x Bb)", tex: "1 \\, BB : 2 \\, Bb : 1 \\, bb" },
      { name: "Phenotype Ratio (Bb x Bb)", tex: "3 \\, Dominant : 1 \\, Recessive" }
    ]
  },
  "biology-enzyme-kinetics": {
    title: "Enzyme Kinetics Lab",
    subject: "Biology",
    syllabusRef: "2.2 Enzymes",
    description: "Tweak solution temperature and pH to study lock-and-key substrate fits. Plot rate of reaction graphs to find enzyme optimum peaks and denaturing thresholds.",
    objectives: [
      "Explain enzyme action in terms of lock-and-key active site binding",
      "Describe effects of temperature and pH changes on enzyme activity",
      "Explain denaturation as permanent shape change of active sites."
    ],
    controls: ["Temperature (°C)", "pH level", "Substrate concentration slider"],
    feedback: "SVG animation showing substrate molecules fitting into active sites or bouncing off deformed (denatured) enzymes. Rate curves.",
    inquiry: [
      "Set pH to 7. Slowly increase temperature from 10°C to 80°C. Identify optimal temperature (peaks around 37-40°C).",
      "Observe the reaction at 60°C. Notice how the active site changes shape (denatures) and activity stops.",
      "Vary pH. Observe how highly acidic (pH 2) or basic (pH 12) environments denature the enzyme."
    ],
    sliders: [
      { key: "temp", symbol: "T", name: "Temperature", unit: "°C", min: 0, max: 80, step: 2, defaultValue: 37, description: "Kinetic energy of molecules (peaks at body temp, denatures >50°C)." },
      { key: "ph", symbol: "pH", name: "pH Level", unit: "pH", min: 0, max: 14, step: 0.5, defaultValue: 7, description: "Acidity of solution (optimum 7 for general enzymes)." },
      { key: "substrate", symbol: "[S]", name: "Substrate Concentration", unit: "%", min: 10, max: 100, step: 10, defaultValue: 50, description: "Substrate molecules available for binding." }
    ],
    formulas: [
      { name: "Enzyme Substrate Complex", tex: "E + S \\rightleftharpoons ES \\rightarrow E + P" },
      { name: "Optimal Rate", tex: "Rate_{max} \\approx f(T_{opt}, pH_{opt})" }
    ]
  }
};

// Generic list of description fallback labs to support all 52 entries
const subjectsMapping: Record<string, string> = {
  "1.1_vector_addition_components_lab": "physics-vector-addition-components",
  "1.2_motion_graphs_lab": "physics-motion-graphs",
  "1.3_weight_gravity_planets_lab": "physics-weight-gravity",
  "1.4_density_archimedes_principle_lab": "physics-density-archimedes",
  "1.5_moments_balance_beam_lab": "physics-moments-balance",
  "acid_base_titration_neutralization": "chemistry-titration-neutralization",
  "atomic_structure_electron_shell_builder": "chemistry-electron-shell",
  "electrolysis_virtual_cell": "chemistry-electrolysis-cell",
  "trigonometric_unit_circle_visualizer": "math-trig-circle",
  "quadratic_functions_grapher": "math-quadratic-functions",
  "sets_venn_diagram_shading": "math-sets-venn",
  "punnett_square_inheritance_lab": "biology-punnett-square",
  "enzyme_kinetics_lab": "biology-enzyme-kinetics",
};

function getLabConfig(normalizedId: string): LabConfig {
  let config = labsDatabase[normalizedId];
  
  if (!config) {
    // Fallback generator for un-implemented lab configs
    // Generate clean title from URL slug
    const formattedTitle = normalizedId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const isPhysics = normalizedId.includes('physics') || normalizedId.includes('orbital') || normalizedId.includes('resistor') || normalizedId.includes('circuit');
    const isChemistry = normalizedId.includes('chemistry') || normalizedId.includes('periodic') || normalizedId.includes('molecule') || normalizedId.includes('state');
    const isMath = normalizedId.includes('math') || normalizedId.includes('frequency') || normalizedId.includes('probability') || normalizedId.includes('vector');
    
    let subject = "Biology";
    if (isPhysics) subject = "Physics";
    else if (isChemistry) subject = "Chemistry";
    else if (isMath) subject = "Mathematics";

    config = {
      title: formattedTitle || "Active Learning Simulation Lab",
      subject: subject,
      syllabusRef: "Syllabus Core Standards Focus",
      description: "An interactive classroom laboratory designed to demonstrate critical syllabus relationships, helping students visual models and mathematical equations.",
      objectives: [
        "Explore and manipulate active system variables",
        "Plot and interpret coordinate graphs in real time",
        "Formulate scientific conclusions based on systematic inquiry readings."
      ],
      controls: ["Tweak Slider A", "Tweak Slider B", "Toggle Graph Analysis"],
      feedback: "Active SVG dynamic illustrations. Parameter readouts.",
      inquiry: [
        "Observe the system under baseline values. Record output variables.",
        "Hypothesize: predict the impact of doubling variable A.",
        "Vary the sliders to verify your hypothesis. Check equations below."
      ],
      sliders: [
        { key: "varA", symbol: "A", name: "Control Parameter A", unit: "qty", min: 1, max: 10, step: 0.5, defaultValue: 5, description: "Primary control parameter." },
        { key: "varB", symbol: "B", name: "Control Parameter B", unit: "qty", min: 1, max: 10, step: 0.5, defaultValue: 5, description: "Secondary control parameter." }
      ],
      formulas: [
        { name: "Relationship Formula", tex: "y = A \\cdot B" }
      ]
    };
  }
  return config;
}

export default function InteractiveLabPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params) as { id: string };
  const rawId = resolvedParams.id;
  
  // Normalize id: check if it maps to any known normalized key
  let normalizedId = rawId;
  Object.entries(subjectsMapping).forEach(([key, value]) => {
    if (rawId.includes(key)) {
      normalizedId = value;
    }
  });

  const activeLab = getLabConfig(normalizedId);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    activeLab.sliders.forEach(slider => {
      defaults[slider.key] = slider.defaultValue;
    });
    return defaults;
  });
  
  // Simulation ticks
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  // Custom lab states
  const [chemistryColor, setChemistryColor] = useState<string>("rgba(236, 72, 153, 0.8)"); // Pink base
  const [punnettMothers, setPunnettMothers] = useState<string>("Bb");
  const [punnettFathers, setPunnettFathers] = useState<string>("Bb");



  // Simulation timer loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const runLoop = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setSimTime(prev => {
        let next = prev + delta;
        if (next > 10) next = 0;
        return next;
      });

      animFrameRef.current = requestAnimationFrame(runLoop);
    };

    lastTimeRef.current = Date.now();
    animFrameRef.current = requestAnimationFrame(runLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, activeLab]);

  // Render equations in simple HTML/CSS
  const renderMathFormula = (tex: string) => {
    return tex
      .replace(/\\frac{([^}]+)}{([^}]+)}/g, '<span class="inline-flex flex-col align-middle text-center mx-1"><span class="border-b border-gray-400 px-1">$1</span><span class="px-1">$2</span></span>')
      .replace(/\\sqrt{([^}]+)}/g, '<span class="border-t border-l border-gray-500 pl-1 mt-1">√$1</span>')
      .replace(/_1/g, '<sub>1</sub>')
      .replace(/_2/g, '<sub>2</sub>')
      .replace(/\\theta/g, 'θ')
      .replace(/\\cos/g, 'cos')
      .replace(/\\sin/g, 'sin')
      .replace(/\\lambda/g, 'λ')
      .replace(/\\rho/g, 'ρ')
      .replace(/\\mu/g, 'μ')
      .replace(/_0/g, '<sub>0</sub>')
      .replace(/_L/g, '<sub>L</sub>')
      .replace(/_A/g, '<sub>A</sub>')
      .replace(/_B/g, '<sub>B</sub>')
      .replace(/_x/g, '<sub>x</sub>')
      .replace(/_y/g, '<sub>y</sub>')
      .replace(/_\{applied\}/g, '<sub>applied</sub>')
      .replace(/_\{net\}/g, '<sub>net</sub>')
      .replace(/_\{friction\}/g, '<sub>friction</sub>')
      .replace(/\^2/g, '²')
      .replace(/\\quad/g, ' &nbsp; ')
      .replace(/\\times/g, ' × ')
      .replace(/\\cdot/g, ' · ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\rightleftharpoons/g, ' ⇌ ')
      .replace(/\\rightarrow/g, ' → ');
  };

  if (!activeLab) return null;

  const handleSliderChange = (key: string, val: number) => {
    setSliderValues(prev => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    activeLab.sliders.forEach(slider => {
      defaults[slider.key] = slider.defaultValue;
    });
    setSliderValues(defaults);
    setSimTime(0);
  };

  return (
    <div key={normalizedId} className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-24">
      
      {/* High-Contrast Academic Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link href="/interactives" className="flex items-center gap-2 text-gray-500 hover:text-blue-700 font-bold text-sm transition-colors group">
            <ArrowLeft size={18} />
            <span className="uppercase tracking-wider">Back to Interactives</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded shadow-sm">
              <Zap size={14} fill="currentColor" className="text-blue-700" />
              <span>Syllabus Lab: {activeLab.subject}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-28 px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Lab Title Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-100 rounded text-[10px] font-bold uppercase tracking-widest text-purple-700 shadow-sm">
            <BookOpen size={14} /> {activeLab.syllabusRef || "Cambridge Standards Target"}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">{activeLab.title}</h1>
          <p className="text-gray-600 max-w-2xl">{activeLab.description}</p>
        </div>

        {/* Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Simulation drawing & controls (Col-span 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Simulation Canvas */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[450px]">
              
              {/* Canvas toolbar */}
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center shrink-0">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={14} className="text-blue-700" /> Virtual Viewport
                </span>
                
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

              {/* DRAW CANVASES */}
              <div className="flex-1 bg-gray-900 relative overflow-hidden flex items-center justify-center p-6 text-white font-mono">
                
                {/* 1. Vector addition visualizer */}
                {normalizedId === "physics-vector-addition-components" && (
                  <svg width="100%" height="100%" className="overflow-visible">
                    <line x1="0" y1="175" x2="100%" y2="175" stroke="#334155" strokeWidth="1" />
                    <line x1="280" y1="0" x2="280" y2="100%" stroke="#334155" strokeWidth="1" />
                    
                    {(() => {
                      const F = sliderValues.F ?? 60;
                      const theta = (sliderValues.theta ?? 45) * Math.PI / 180;
                      // Display calculations
                      const dx = F * Math.cos(theta) * 2;
                      const dy = -F * Math.sin(theta) * 2; // SVG coordinate system inversion

                      return (
                        <g transform="translate(280, 175)">
                          {/* Dotted horizontal projection lines */}
                          <line x1="0" y1="0" x2={dx} y2="0" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
                          <text x={dx/2} y="15" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                            Fx = {(F * Math.cos(theta)).toFixed(1)} N
                          </text>

                          {/* Dotted vertical projection lines */}
                          <line x1={dx} y1="0" x2={dx} y2={dy} stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 3" />
                          <text x={dx + 12} y={dy/2} fill="#f43f5e" fontSize="10" fontWeight="bold">
                            Fy = {(F * Math.sin(theta)).toFixed(1)} N
                          </text>

                          {/* Main vector arrow */}
                          <line x1="0" y1="0" x2={dx} y2={dy} stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrow-vec)" />
                          <text x={dx/2 - 10} y={dy/2 - 10} fill="#3b82f6" fontSize="12" fontWeight="bold">
                            F = {F} N
                          </text>
                        </g>
                      );
                    })()}
                    
                    <defs>
                      <marker id="arrow-vec" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                      </marker>
                    </defs>
                  </svg>
                )}

                {/* 2. Motion Graphs car simulation */}
                {normalizedId === "physics-motion-graphs" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-500 text-xs">Time: {simTime.toFixed(1)}s</div>
                    <svg width="100%" height="150" className="overflow-visible">
                      <line x1="0" y1="120" x2="100%" y2="120" stroke="#475569" strokeWidth="5" />
                      {(() => {
                        const s0 = sliderValues.s0 ?? 0;
                        const u = sliderValues.u ?? 4;
                        const a = sliderValues.a ?? 1.5;
                        const s = s0 + u * simTime + 0.5 * a * simTime * simTime;
                        
                        // Map displacement to position in pixels (10 pixels = 1 meter)
                        const carX = Math.max(30, Math.min(570, 300 + s * 7));

                        return (
                          <g transform={`translate(${carX}, 80)`}>
                            <rect x="-25" y="10" width="50" height="20" rx="3" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
                            <circle cx="-15" cy="30" r="6" fill="#1e293b" />
                            <circle cx="15" cy="30" r="6" fill="#1e293b" />
                            <text x="0" y="-8" fill="#ea580c" fontSize="10" fontWeight="bold" textAnchor="middle">
                              s = {s.toFixed(1)}m
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                    
                    {/* Readout metrics */}
                    <div className="bg-gray-800 rounded p-4 grid grid-cols-3 gap-4 text-center text-xs">
                      <div>
                        <div>Position (s)</div>
                        <div className="text-sm font-bold text-yellow-400">
                          {((sliderValues.s0 ?? 0) + (sliderValues.u ?? 4) * simTime + 0.5 * (sliderValues.a ?? 1.5) * simTime * simTime).toFixed(2)} m
                        </div>
                      </div>
                      <div>
                        <div>Velocity (v)</div>
                        <div className="text-sm font-bold text-green-400">
                          {((sliderValues.u ?? 4) + (sliderValues.a ?? 1.5) * simTime).toFixed(2)} m/s
                        </div>
                      </div>
                      <div>
                        <div>Acceleration (a)</div>
                        <div className="text-sm font-bold text-blue-400">
                          {(sliderValues.a ?? 1.5).toFixed(2)} m/s²
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Weight/Gravity Planets */}
                {normalizedId === "physics-weight-gravity" && (
                  <svg width="100%" height="100%" className="overflow-visible">
                    {(() => {
                      const m1 = sliderValues.m1 ?? 6.0;
                      const m2 = sliderValues.m2 ?? 7.3;
                      const r = sliderValues.r ?? 4.0;
                      
                      const distPx = 120 + r * 30;
                      const cx1 = 280 - distPx / 2;
                      const cx2 = 280 + distPx / 2;
                      const cy = 150;
                      
                      const rad1 = 15 + m1 * 2.2;
                      const rad2 = 10 + m2 * 1.5;
                      const forceVal = 6.67 * (m1 * m2) / (r * r);
                      const arrowLen = Math.min(80, Math.max(15, forceVal * 4.5));

                      return (
                        <>
                          <line x1={cx1} y1={cy} x2={cx2} y2={cy} stroke="#334155" strokeWidth="2" strokeDasharray="3 3" />
                          <circle cx={cx1} cy={cy} r={rad1} fill="#2563eb" stroke="#3b82f6" strokeWidth="2" />
                          <text x={cx1} y={cy + 4} fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Planet</text>

                          <circle cx={cx2} cy={cy} r={rad2} fill="#4b5563" stroke="#6b7280" strokeWidth="2" />
                          <text x={cx2} y={cy + 4} fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Moon</text>

                          <line x1={cx1 + rad1 + 2} y1={cy} x2={cx1 + rad1 + 2 + arrowLen} y2={cy} stroke="#ef4444" strokeWidth="3" markerEnd="url(#att-arr)" />
                          <line x1={cx2 - rad2 - 2} y1={cy} x2={cx2 - rad2 - 2 - arrowLen} y2={cy} stroke="#ef4444" strokeWidth="3" markerEnd="url(#att-arr)" />
                          
                          <g transform="translate(280, 230)">
                            <text x="0" y="0" fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">
                              F_grav = {forceVal.toFixed(2)} ×10²⁰ N
                            </text>
                          </g>
                        </>
                      );
                    })()}
                    <defs>
                      <marker id="att-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                      </marker>
                    </defs>
                  </svg>
                )}

                {/* 4. Density & flotation simulator */}
                {normalizedId === "physics-density-archimedes" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      {/* Beaker of fluid */}
                      <rect x="180" y="50" width="200" height="150" fill="none" stroke="#64748b" strokeWidth="4" />
                      
                      {(() => {
                        const m = sliderValues.m ?? 120;
                        const V = sliderValues.V ?? 150;
                        const rho_fluid = sliderValues.rho_fluid ?? 1.0;
                        const rho_block = m / V;
                        
                        // Volume fraction submerged
                        const subFraction = Math.min(1.0, rho_block / rho_fluid);
                        const waterHeight = 110;
                        
                        // Set liquid color
                        let fluidColor = "rgba(56, 189, 248, 0.4)"; // Water
                        if (rho_fluid < 0.9) fluidColor = "rgba(234, 179, 8, 0.3)"; // Oil
                        else if (rho_fluid > 1.1) fluidColor = "rgba(14, 165, 233, 0.6)"; // Saltwater

                        // Block dimensions
                        const side = 40 + V * 0.1;
                        const blockY = 50 + waterHeight - side + (side * subFraction);

                        return (
                          <>
                            {/* Fluid inside beaker */}
                            <rect x="182" y={200 - waterHeight} width="196" height={waterHeight} fill={fluidColor} />
                            <line x1="180" y1={200 - waterHeight} x2="380" y2={200 - waterHeight} stroke="#38bdf8" strokeWidth="2" />

                            {/* Solid Block */}
                            <rect x="250" y={blockY} width={side} height={side} fill="#b45309" stroke="#78350f" strokeWidth="2" />
                            <text x={250 + side/2} y={blockY + side/2 + 5} fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">{m}g</text>

                            {/* Floating / sinking tag */}
                            <text x="280" y="35" fill={rho_block > rho_fluid ? "#ef4444" : "#10b981"} fontSize="11" textAnchor="middle" fontWeight="bold">
                              {rho_block > rho_fluid ? "Sinking (ρ_block > ρ_fluid)" : `Floating (${(subFraction*100).toFixed(0)}% submerged)`}
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="bg-gray-800 rounded p-4 grid grid-cols-2 gap-4 text-center text-xs">
                      <div>
                        <div>Block Density (m/V)</div>
                        <div className="text-sm font-bold text-yellow-400">
                          {((sliderValues.m ?? 120) / (sliderValues.V ?? 150)).toFixed(3)} g/cm³
                        </div>
                      </div>
                      <div>
                        <div>Liquid Density (ρ_L)</div>
                        <div className="text-sm font-bold text-blue-400">
                          {(sliderValues.rho_fluid ?? 1.0).toFixed(2)} g/cm³
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Moments & Balance see-saw */}
                {normalizedId === "physics-moments-balance" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      {/* Fulcrum base triangle */}
                      <polygon points="280,150 265,185 295,185" fill="#475569" stroke="#334155" strokeWidth="2" />
                      
                      {(() => {
                        const m1 = sliderValues.m1 ?? 5;
                        const d1 = sliderValues.d1 ?? 3;
                        const m2 = sliderValues.m2 ?? 3;
                        const d2 = sliderValues.d2 ?? 4;
                        
                        const moment1 = m1 * d1 * 10; // F1 * d1
                        const moment2 = m2 * d2 * 10; // F2 * d2
                        
                        // Calculate see-saw tilt angle
                        let tilt = 0;
                        if (moment1 > moment2) tilt = -12; // tilt left
                        else if (moment2 > moment1) tilt = 12; // tilt right
                        
                        // Scaled pixel distance: 1 meter = 40 pixels
                        const p1x = 280 - d1 * 40;
                        const p2x = 280 + d2 * 40;

                        return (
                          <g transform={`rotate(${tilt}, 280, 150)`}>
                            {/* Seesaw beam line */}
                            <line x1="60" y1="150" x2="500" y2="150" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                            
                            {/* Left weight */}
                            <rect x={p1x - 15} y={150 - 15 - m1} width="30" height={15 + m1} fill="#3b82f6" rx="2" />
                            <text x={p1x} y={145} fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">{m1}kg</text>

                            {/* Right weight */}
                            <rect x={p2x - 15} y={150 - 15 - m2} width="30" height={15 + m2} fill="#ef4444" rx="2" />
                            <text x={p2x} y={145} fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">{m2}kg</text>
                          </g>
                        );
                      })()}
                    </svg>

                    <div className="bg-gray-800 rounded p-4 grid grid-cols-2 gap-4 text-center text-xs">
                      <div>
                        <div>Anticlockwise (Left) Moment</div>
                        <div className="text-sm font-bold text-blue-400">
                          {((sliderValues.m1 ?? 5) * (sliderValues.d1 ?? 3) * 9.81).toFixed(1)} N·m
                        </div>
                      </div>
                      <div>
                        <div>Clockwise (Right) Moment</div>
                        <div className="text-sm font-bold text-red-400">
                          {((sliderValues.m2 ?? 3) * (sliderValues.d2 ?? 4) * 9.81).toFixed(1)} N·m
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Chemistry titration endpoint visualizer */}
                {normalizedId === "chemistry-titration-neutralization" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-500 text-xs">Acid Added: {(sliderValues.drops ?? 0).toFixed(1)} mL</div>
                    <div className="flex-1 flex gap-8 items-center justify-center">
                      <svg width="150px" height="240px" className="overflow-visible">
                        {/* Burette layout */}
                        <rect x="65" y="10" width="20" height="150" fill="none" stroke="#64748b" strokeWidth="3" />
                        <line x1="65" y1="140" x2="85" y2="140" stroke="#64748b" strokeWidth="1" />
                        
                        {/* Conical Flask */}
                        <path d="M 50 230 L 100 230 L 80 180 L 70 180 Z" fill="none" stroke="#64748b" strokeWidth="3" />
                        
                        {(() => {
                          const V_base = sliderValues.V_base ?? 25;
                          const C_acid = sliderValues.C_acid ?? 0.5;
                          const V_added = sliderValues.drops ?? 0;
                          
                          // Simple mock base concentration C_B = 0.5 M
                          // Equivalence point happens when C_A V_A = C_B V_B => V_A = (0.5 * 25) / C_A
                          const V_equivalence = (0.5 * V_base) / C_acid;
                          
                          // Color mapping for Phenolphthalein
                          let color = "rgba(255,255,255,0.1)"; // Clear acid
                          if (V_added < V_equivalence - 0.5) {
                            color = "rgba(236, 72, 153, 0.8)"; // Pink base
                          } else if (V_added <= V_equivalence + 0.5) {
                            // transitional soft pink
                            const ratio = 1 - (V_added - (V_equivalence - 0.5));
                            color = `rgba(236, 72, 153, ${Math.max(0, ratio * 0.8)})`;
                          }

                          return (
                            <>
                              {/* Acid fluid column inside buret */}
                              <rect x="67" y={Math.max(10, 10 + V_added * 2.5)} width="16" height={Math.max(0, 140 - V_added * 2.5)} fill="rgba(14, 165, 233, 0.4)" />
                              
                              {/* Fluid inside conical flask */}
                              <path d="M 53 227 L 97 227 L 88 200 L 62 200 Z" fill={color} />
                            </>
                          );
                        })()}
                      </svg>
                      
                      {/* Active graph plotting pH vs volume */}
                      {(() => {
                        const V_base = sliderValues.V_base ?? 25;
                        const C_acid = sliderValues.C_acid ?? 0.5;
                        const V_added = sliderValues.drops ?? 0;
                        const V_equivalence = (0.5 * V_base) / C_acid;
                        
                        // pH curve mapping: starts at pH 13 (base), drops sharply to pH 7 at equivalence, then goes to pH 1 (acid)
                        let ph = 13;
                        if (V_added > V_equivalence + 0.5) {
                          ph = 1.5;
                        } else if (V_added < V_equivalence - 0.5) {
                          ph = 12.5;
                        } else {
                          // steep drop region linear interpolation
                          const ratio = (V_added - (V_equivalence - 0.5));
                          ph = 12.5 - ratio * 11;
                        }

                        return (
                          <div className="bg-gray-800 p-4 rounded border border-gray-700/50 w-56 space-y-4 font-mono text-xs">
                            <div className="text-center font-bold border-b border-gray-700 pb-2">pH Meter Readings</div>
                            <div className="flex justify-between items-center text-lg font-black text-cyan-400">
                              <span>pH level:</span>
                              <span>{ph.toFixed(2)}</span>
                            </div>
                            <div className="text-[10px] text-gray-500">
                              Equivalence target: {V_equivalence.toFixed(1)} mL acid
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* 7. Chemistry electron shell builder */}
                {normalizedId === "chemistry-electron-shell" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      <circle cx="280" cy="110" r="10" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
                      <text x="280" y="113" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">N</text>
                      
                      {(() => {
                        const protons = sliderValues.protons ?? 6;
                        const electrons = sliderValues.electrons ?? 6;
                        
                        // Element names dictionary
                        const elementsList = ["", "Hydrogen (H)", "Helium (He)", "Lithium (Li)", "Beryllium (Be)", "Boron (B)", "Carbon (C)", "Nitrogen (N)", "Oxygen (O)", "Fluorine (F)", "Neon (Ne)", "Sodium (Na)", "Magnesium (Mg)", "Aluminium (Al)", "Silicon (Si)", "Phosphorus (P)", "Sulfur (S)", "Chlorine (Cl)", "Argon (Ar)"];
                        
                        // Distribute electrons into shells (Ring 1 max 2, Ring 2 max 8, Ring 3 max 8)
                        const shells = [0, 0, 0];
                        let remaining = electrons;
                        shells[0] = Math.min(2, remaining);
                        remaining -= shells[0];
                        shells[1] = Math.min(8, remaining);
                        remaining -= shells[1];
                        shells[2] = Math.min(8, remaining);

                        return (
                          <>
                            {/* Ring 1 */}
                            <circle cx="280" cy="110" r="35" fill="none" stroke="#475569" strokeWidth="1.5" />
                            {Array.from({ length: shells[0] }).map((_, i) => {
                              const angle = (i * 360) / shells[0];
                              const ex = 280 + Math.cos(angle * Math.PI / 180) * 35;
                              const ey = 110 + Math.sin(angle * Math.PI / 180) * 35;
                              return <circle key={`r1-${i}`} cx={ex} cy={ey} r="4" fill="#38bdf8" />;
                            })}

                            {/* Ring 2 */}
                            {electrons > 2 && (
                              <>
                                <circle cx="280" cy="110" r="65" fill="none" stroke="#475569" strokeWidth="1.5" />
                                {Array.from({ length: shells[1] }).map((_, i) => {
                                  const angle = (i * 360) / shells[1];
                                  const ex = 280 + Math.cos(angle * Math.PI / 180) * 65;
                                  const ey = 110 + Math.sin(angle * Math.PI / 180) * 65;
                                  return <circle key={`r2-${i}`} cx={ex} cy={ey} r="4" fill="#38bdf8" />;
                                })}
                              </>
                            )}

                            {/* Ring 3 */}
                            {electrons > 10 && (
                              <>
                                <circle cx="280" cy="110" r="95" fill="none" stroke="#475569" strokeWidth="1.5" />
                                {Array.from({ length: shells[2] }).map((_, i) => {
                                  const angle = (i * 360) / shells[2];
                                  const ex = 280 + Math.cos(angle * Math.PI / 180) * 95;
                                  const ey = 110 + Math.sin(angle * Math.PI / 180) * 95;
                                  return <circle key={`r3-${i}`} cx={ex} cy={ey} r="4" fill="#38bdf8" />;
                                })}
                              </>
                            )}

                            <text x="280" y="215" fill="#facc15" fontSize="13" textAnchor="middle" fontWeight="bold">
                              {elementsList[protons] || "Unknown Element"}
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="bg-gray-800 rounded p-3 text-center text-xs">
                      Valence Electrons: {sliderValues.electrons <= 2 ? sliderValues.electrons : (sliderValues.electrons <= 10 ? sliderValues.electrons - 2 : sliderValues.electrons - 10)}
                    </div>
                  </div>
                )}

                {/* 8. Chemistry electrolysis cell */}
                {normalizedId === "chemistry-electrolysis-cell" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      <rect x="180" y="80" width="200" height="120" fill="rgba(14, 165, 233, 0.2)" stroke="#475569" strokeWidth="3" />
                      
                      {/* Cathode (-) */}
                      <rect x="210" y="60" width="15" height="110" fill="#94a3b8" stroke="#475569" />
                      <text x="217" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle">-</text>

                      {/* Anode (+) */}
                      <rect x="330" y="60" width="15" height="110" fill="#b45309" stroke="#78350f" />
                      <text x="337" y="55" fill="#b45309" fontSize="9" textAnchor="middle">+</text>

                      {/* Power lines */}
                      <line x1="217" y1="60" x2="217" y2="30" stroke="#f43f5e" strokeWidth="2" />
                      <line x1="337" y1="60" x2="337" y2="30" stroke="#f43f5e" strokeWidth="2" />
                      <rect x="250" y="15" width="60" height="30" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" rx="3" />
                      <text x="280" y="34" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {(sliderValues.voltage ?? 5).toFixed(1)} V
                      </text>

                      {/* Ions bubbles if voltage > 0 */}
                      {(() => {
                        const V = sliderValues.voltage ?? 5;
                        if (V <= 0) return null;
                        
                        return (
                          <>
                            {/* Cathode plating animation coating cathode */}
                            <rect x="207" y="80" width="3" height="90" fill="#c2410c" />
                            <rect x="225" y="80" width="3" height="90" fill="#c2410c" />

                            {/* Anode bubbles */}
                            {Array.from({ length: 6 }).map((_, i) => {
                              const bubbleY = 160 - (simTime * 30 + i * 20) % 90;
                              return (
                                <circle key={`bub-${i}`} cx={335 + (i%2 === 0 ? 8 : -8)} cy={bubbleY} r="3" fill="rgba(163, 230, 53, 0.6)" />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>

                    <div className="bg-gray-800 rounded p-3 text-center text-xs">
                      Product at Cathode: Copper Plating (Brown) | Product at Anode: Chlorine Gas (Green Bubbles)
                    </div>
                  </div>
                )}

                {/* 9. Math trigonometric unit circle */}
                {normalizedId === "math-trig-circle" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      <circle cx="280" cy="110" r="70" fill="none" stroke="#475569" strokeWidth="2" />
                      <line x1="190" y1="110" x2="370" y2="110" stroke="#334155" strokeWidth="1" />
                      <line x1="280" y1="20" x2="280" y2="200" stroke="#334155" strokeWidth="1" />

                      {(() => {
                        const angleDeg = sliderValues.theta ?? 60;
                        const angleRad = angleDeg * Math.PI / 180;
                        
                        const cx = 280 + Math.cos(angleRad) * 70;
                        const cy = 110 - Math.sin(angleRad) * 70; // invert y

                        return (
                          <>
                            {/* Radial vector */}
                            <line x1="280" y1="110" x2={cx} y2={cy} stroke="#a78bfa" strokeWidth="3.5" />
                            
                            {/* Horizontal Cos projection */}
                            <line x1="280" y1="110" x2={cx} y2="110" stroke="#10b981" strokeWidth="2.5" />
                            
                            {/* Vertical Sin projection */}
                            <line x1={cx} y1="110" x2={cx} y2={cy} stroke="#f43f5e" strokeWidth="2.5" />
                            
                            {/* Intersect point */}
                            <circle cx={cx} cy={cy} r="5" fill="#facc15" />
                          </>
                        );
                      })()}
                    </svg>

                    {(() => {
                      const angle = sliderValues.theta ?? 60;
                      const rad = angle * Math.PI / 180;
                      return (
                        <div className="bg-gray-800 rounded p-4 grid grid-cols-3 gap-2 text-center text-xs">
                          <div>
                            <div>sin(θ) [y]</div>
                            <div className="font-bold text-red-400">{Math.sin(rad).toFixed(3)}</div>
                          </div>
                          <div>
                            <div>cos(θ) [x]</div>
                            <div className="font-bold text-green-400">{Math.cos(rad).toFixed(3)}</div>
                          </div>
                          <div>
                            <div>tan(θ) [y/x]</div>
                            <div className="font-bold text-purple-400">
                              {Math.abs(angle - 90) < 1 || Math.abs(angle - 270) < 1 ? "Undefined (∞)" : Math.tan(rad).toFixed(3)}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 10. Math Quadratic function grapher */}
                {normalizedId === "math-quadratic-functions" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      <line x1="0" y1="110" x2="100%" y2="110" stroke="#334155" strokeWidth="1" />
                      <line x1="280" y1="0" x2="280" y2="100%" stroke="#334155" strokeWidth="1" />
                      
                      {(() => {
                        const a = sliderValues.a ?? 1;
                        const b = sliderValues.b ?? -2;
                        const c = sliderValues.c ?? -3;
                        
                        // Build graph points
                        const points: string[] = [];
                        const scaleX = 20; // 20px = 1 unit
                        const scaleY = 15;
                        
                        for (let px = 0; px <= 560; px += 2) {
                          const x = (px - 280) / scaleX;
                          const y = a * x * x + b * x + c;
                          const py = 110 - y * scaleY;
                          if (py >= 0 && py <= 220) {
                            points.push(`${px},${py}`);
                          }
                        }

                        // Calculate roots
                        const disc = b*b - 4*a*c;
                        const root1 = disc >= 0 ? (-b + Math.sqrt(disc)) / (2*a) : null;
                        const root2 = disc >= 0 ? (-b - Math.sqrt(disc)) / (2*a) : null;

                        return (
                          <>
                            {/* Curve path */}
                            {points.length > 1 && (
                              <path d={`M ${points.join(' L ')}`} fill="none" stroke="#38bdf8" strokeWidth="3" />
                            )}

                            {/* Root dots */}
                            {root1 !== null && (
                              <circle cx={280 + root1 * scaleX} cy="110" r="5" fill="#facc15" />
                            )}
                            {root2 !== null && (
                              <circle cx={280 + root2 * scaleX} cy="110" r="5" fill="#facc15" />
                            )}
                          </>
                        );
                      })()}
                    </svg>

                    {(() => {
                      const a = sliderValues.a ?? 1;
                      const b = sliderValues.b ?? -2;
                      const c = sliderValues.c ?? -3;
                      const D = b*b - 4*a*c;
                      return (
                        <div className="bg-gray-800 rounded p-3 text-center text-xs">
                          Discriminant (D = b² - 4ac) = <span className="font-bold text-yellow-400">{D.toFixed(1)}</span>
                          &nbsp;| Real Roots: <span className="font-bold">{D > 0 ? "2 Distinct" : (D === 0 ? "1 Repeated" : "None (Complex)")}</span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 11. Math sets Venn shading */}
                {normalizedId === "math-sets-venn" && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <svg width="100%" height="220" className="overflow-visible">
                      {/* Set logic drawing */}
                      {/* Left circle: A, Right circle: B */}
                      <circle cx="230" cy="110" r="60" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2.5" />
                      <circle cx="330" cy="110" r="60" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2.5" />
                      
                      <text x="170" y="70" fill="#3b82f6" fontSize="14" fontWeight="bold">Set A</text>
                      <text x="390" y="70" fill="#f43f5e" fontSize="14" fontWeight="bold">Set B</text>

                      {/* Middle intersection text highlight */}
                      <text x="280" y="115" fill="#ffffff" fontSize="11" textAnchor="middle">
                        Intersection
                      </text>
                    </svg>

                    <div className="bg-gray-800 rounded p-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div>Card A [n(A)]</div>
                        <div className="font-bold text-blue-400">{sliderValues.sizeA ?? 12}</div>
                      </div>
                      <div>
                        <div>Card B [n(B)]</div>
                        <div className="font-bold text-red-400">{sliderValues.sizeB ?? 10}</div>
                      </div>
                      <div>
                        <div>Union [n(A∪B)]</div>
                        <div className="font-bold text-yellow-400">
                          {(sliderValues.sizeA ?? 12) + (sliderValues.sizeB ?? 10) - (sliderValues.intersect ?? 4)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. Biology Punnett square breeder */}
                {/* 12. Biology Punnett Square — HIGH FIDELITY */}
                {normalizedId === "biology-punnett-square" && (
                  <div className="w-full h-full flex flex-col justify-between gap-3">
                    {/* Top header with parent icons */}
                    <div className="flex items-center justify-between px-2 pt-1 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">Monohybrid Cross</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Father selector */}
                        <div className="flex items-center gap-1.5">
                          <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="7" r="4" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5"/><path d="M4 18 Q4 12 10 12 Q16 12 16 18" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5"/></svg>
                          <select value={punnettFathers} onChange={(e) => setPunnettFathers(e.target.value)} className="bg-gray-800/80 border border-blue-500/30 text-blue-300 rounded px-2 py-0.5 text-[10px] font-bold focus:outline-none focus:border-blue-400">
                            <option value="BB">BB — Homozygous Dom</option>
                            <option value="Bb">Bb — Heterozygous</option>
                            <option value="bb">bb — Homozygous Rec</option>
                          </select>
                        </div>
                        <span className="text-gray-600 text-xs font-bold">×</span>
                        {/* Mother selector */}
                        <div className="flex items-center gap-1.5">
                          <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="7" r="4" fill="#f472b6" stroke="#ec4899" strokeWidth="1.5"/><path d="M4 18 Q4 12 10 12 Q16 12 16 18" fill="#f472b6" stroke="#ec4899" strokeWidth="1.5"/></svg>
                          <select value={punnettMothers} onChange={(e) => setPunnettMothers(e.target.value)} className="bg-gray-800/80 border border-pink-500/30 text-pink-300 rounded px-2 py-0.5 text-[10px] font-bold focus:outline-none focus:border-pink-400">
                            <option value="BB">BB — Homozygous Dom</option>
                            <option value="Bb">Bb — Heterozygous</option>
                            <option value="bb">bb — Homozygous Rec</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Main Punnett Grid + Offspring Preview */}
                    {(() => {
                      const f1 = punnettFathers[0];
                      const f2 = punnettFathers[1];
                      const m1 = punnettMothers[0];
                      const m2 = punnettMothers[1];
                      const crossGrid = [[m1+f1, m1+f2], [m2+f1, m2+f2]];
                      const allOffspring = crossGrid.flat();

                      // Normalize genotypes: ensure uppercase always comes first
                      const normalize = (g: string) => {
                        if (g === "bB") return "Bb";
                        return g;
                      };

                      // Count genotypes
                      const counts: Record<string, number> = {};
                      allOffspring.forEach(g => {
                        const n = normalize(g);
                        counts[n] = (counts[n] || 0) + 1;
                      });

                      // Calculate phenotype ratios
                      const dominant = allOffspring.filter(g => normalize(g).includes("B")).length;
                      const recessive = 4 - dominant;

                      // Color coding for genotypes
                      const genotypeColor = (g: string) => {
                        const n = normalize(g);
                        if (n === "BB") return { bg: "bg-emerald-900/40", border: "border-emerald-500/50", text: "text-emerald-300", label: "Homozygous Dominant" };
                        if (n === "Bb") return { bg: "bg-sky-900/40", border: "border-sky-500/50", text: "text-sky-300", label: "Heterozygous" };
                        return { bg: "bg-rose-900/40", border: "border-rose-500/50", text: "text-rose-300", label: "Homozygous Recessive" };
                      };

                      // Plant SVG for phenotype preview
                      const PlantIcon = ({ isDominant, size = 28 }: { isDominant: boolean; size?: number }) => (
                        <svg width={size} height={size} viewBox="0 0 32 32">
                          {isDominant ? (
                            <>
                              {/* Tall plant */}
                              <line x1="16" y1="30" x2="16" y2="6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
                              <ellipse cx="10" cy="10" rx="5" ry="7" fill="#16a34a" opacity="0.9" transform="rotate(-20 10 10)"/>
                              <ellipse cx="22" cy="10" rx="5" ry="7" fill="#16a34a" opacity="0.9" transform="rotate(20 22 10)"/>
                              <ellipse cx="16" cy="6" rx="4" ry="5" fill="#22c55e" opacity="0.9"/>
                            </>
                          ) : (
                            <>
                              {/* Dwarf plant */}
                              <line x1="16" y1="30" x2="16" y2="18" stroke="#a3e635" strokeWidth="2" strokeLinecap="round"/>
                              <ellipse cx="12" cy="20" rx="4" ry="5" fill="#84cc16" opacity="0.8" transform="rotate(-15 12 20)"/>
                              <ellipse cx="20" cy="20" rx="4" ry="5" fill="#84cc16" opacity="0.8" transform="rotate(15 20 20)"/>
                              <ellipse cx="16" cy="17" rx="3" ry="4" fill="#a3e635" opacity="0.8"/>
                            </>
                          )}
                        </svg>
                      );

                      return (
                        <div className="flex-1 flex gap-5 items-center justify-center px-2">
                          {/* Punnett Square Grid */}
                          <div className="shrink-0">
                            {/* Column headers (father alleles) */}
                            <div className="grid grid-cols-3 gap-1 mb-1" style={{ width: 210 }}>
                              <div className="h-8"></div>
                              <div className="h-8 flex items-center justify-center rounded bg-blue-900/30 border border-blue-500/30">
                                <span className="text-blue-300 text-sm font-black">{f1}</span>
                              </div>
                              <div className="h-8 flex items-center justify-center rounded bg-blue-900/30 border border-blue-500/30">
                                <span className="text-blue-300 text-sm font-black">{f2}</span>
                              </div>
                            </div>

                            {/* Rows */}
                            {[0, 1].map(row => {
                              const motherAllele = row === 0 ? m1 : m2;
                              return (
                                <div key={row} className="grid grid-cols-3 gap-1 mb-1" style={{ width: 210 }}>
                                  {/* Row header (mother allele) */}
                                  <div className="h-20 flex items-center justify-center rounded bg-pink-900/30 border border-pink-500/30">
                                    <span className="text-pink-300 text-sm font-black">{motherAllele}</span>
                                  </div>
                                  {/* Grid cells */}
                                  {[0, 1].map(col => {
                                    const genotype = normalize(crossGrid[row][col]);
                                    const colors = genotypeColor(genotype);
                                    const isDom = genotype.includes("B");
                                    return (
                                      <div key={col} className={`h-20 rounded border ${colors.bg} ${colors.border} flex flex-col items-center justify-center gap-1 transition-all duration-300`}>
                                        <PlantIcon isDominant={isDom} size={24} />
                                        <span className={`text-base font-black ${colors.text}`}>{genotype}</span>
                                        <span className="text-[8px] text-gray-500 font-medium">{isDom ? "Tall" : "Dwarf"}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>

                          {/* Right-side analysis panel */}
                          <div className="space-y-3 w-44 shrink-0">
                            {/* Genotype ratios */}
                            <div className="bg-gray-800/70 rounded-lg border border-gray-700/50 p-3 space-y-2">
                              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-700/50 pb-1">Genotype Ratio</div>
                              {Object.entries(counts).map(([genotype, count]) => {
                                const colors = genotypeColor(genotype);
                                return (
                                  <div key={genotype} className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <div className={`w-2.5 h-2.5 rounded-sm ${colors.bg} border ${colors.border}`}></div>
                                      <span className={`text-xs font-bold ${colors.text}`}>{genotype}</span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">{count}/4 ({(count/4*100).toFixed(0)}%)</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Phenotype ratio */}
                            <div className="bg-gray-800/70 rounded-lg border border-gray-700/50 p-3 space-y-2">
                              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-700/50 pb-1">Phenotype Ratio</div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <PlantIcon isDominant={true} size={16} />
                                    <span className="text-[10px] font-bold text-emerald-400">Dominant (Tall)</span>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-emerald-300">{dominant}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <PlantIcon isDominant={false} size={16} />
                                    <span className="text-[10px] font-bold text-rose-400">Recessive (Dwarf)</span>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-rose-300">{recessive}</span>
                                </div>
                                {/* Ratio bar */}
                                <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-gray-900 mt-1">
                                  <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500" style={{ width: `${(dominant/4)*100}%` }}></div>
                                  <div className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-500" style={{ width: `${(recessive/4)*100}%` }}></div>
                                </div>
                                <div className="text-center text-[10px] font-bold text-gray-400 mt-1">
                                  {dominant > 0 && recessive > 0 ? `${dominant} : ${recessive}` : dominant > 0 ? "All Dominant" : "All Recessive"}
                                </div>
                              </div>
                            </div>

                            {/* Offspring preview strip */}
                            <div className="bg-gray-800/70 rounded-lg border border-gray-700/50 p-3">
                              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Offspring Sample</div>
                              <div className="flex gap-1 flex-wrap">
                                {allOffspring.map((g, i) => {
                                  const n = normalize(g);
                                  const isDom = n.includes("B");
                                  return (
                                    <div key={i} className={`w-8 h-10 rounded flex flex-col items-center justify-center ${isDom ? "bg-emerald-900/30 border border-emerald-700/40" : "bg-rose-900/30 border border-rose-700/40"}`}>
                                      <PlantIcon isDominant={isDom} size={18} />
                                      <span className={`text-[7px] font-bold ${isDom ? "text-emerald-400" : "text-rose-400"}`}>{n}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 13. Biology Enzyme Kinetics — HIGH FIDELITY */}
                {normalizedId === "biology-enzyme-kinetics" && (
                  <div className="w-full h-full flex flex-col justify-between gap-2">
                    {/* Top environment bar */}
                    <div className="flex items-center justify-between px-3 pt-1 shrink-0">
                      <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">Lock-and-Key Enzyme Model</div>
                      {(() => {
                        const temp = sliderValues.temp ?? 37;
                        const ph = sliderValues.ph ?? 7;
                        const denatured = temp > 50 || ph < 3 || ph > 11;
                        return (
                          <div className={`text-[10px] font-bold px-2 py-0.5 rounded border ${denatured ? "bg-red-900/40 border-red-500/40 text-red-300" : "bg-emerald-900/40 border-emerald-500/40 text-emerald-300"}`}>
                            {denatured ? "⚠ DENATURED" : "✓ ACTIVE"}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Main viewport — enzyme visualization + mini graph side by side */}
                    <div className="flex-1 flex gap-3 px-2">
                      {/* Left: enzyme + substrates SVG */}
                      <div className="flex-1 relative">
                        <svg width="100%" height="100%" viewBox="0 0 320 260" className="overflow-visible">
                          <defs>
                            <radialGradient id="enzyme-glow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.15"/>
                              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
                            </radialGradient>
                            <linearGradient id="enzyme-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6"/>
                              <stop offset="100%" stopColor="#6d28d9"/>
                            </linearGradient>
                            <linearGradient id="enzyme-denatured" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#6b7280"/>
                              <stop offset="100%" stopColor="#374151"/>
                            </linearGradient>
                            <linearGradient id="substrate-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#34d399"/>
                              <stop offset="100%" stopColor="#059669"/>
                            </linearGradient>
                          </defs>

                          {(() => {
                            const temp = sliderValues.temp ?? 37;
                            const ph = sliderValues.ph ?? 7;
                            const substrate = sliderValues.substrate ?? 50;
                            const denatured = temp > 50 || ph < 3 || ph > 11;
                            const partialDenature = temp > 42 || ph < 5 || ph > 9;

                            // Enzyme activity rate (0 to 1)
                            let activity = 1.0;
                            // Temperature bell curve centered at 37°C
                            const tempFactor = Math.exp(-0.5 * Math.pow((temp - 37) / 10, 2));
                            // pH bell curve centered at 7
                            const phFactor = Math.exp(-0.5 * Math.pow((ph - 7) / 3, 2));
                            activity = tempFactor * phFactor;
                            if (denatured) activity = 0;

                            // Enzyme body shape — U-shaped cleft for active site
                            const jitter = denatured ? Math.sin(simTime * 3) * 6 : 0;
                            const cleftWidth = denatured ? 65 + Math.sin(simTime * 2) * 15 : (partialDenature ? 38 : 32);

                            const enzymeX = 160;
                            const enzymeY = 170;

                            // Substrate position — moves toward cleft when active
                            const substrateTargetY = denatured ? 60 + Math.sin(simTime * 1.5) * 20 : (activity > 0.5 ? enzymeY - 52 : 70 + Math.sin(simTime * 1.2) * 15);

                            // Number of free-floating substrates based on concentration
                            const numFree = Math.floor(substrate / 20);

                            return (
                              <>
                                {/* Background glow */}
                                {!denatured && <circle cx={enzymeX} cy={enzymeY} r="90" fill="url(#enzyme-glow)"/>}

                                {/* Enzyme body — large U-shape with active site cleft */}
                                <path
                                  d={`M ${enzymeX - 60 + jitter} ${enzymeY - 40}
                                      Q ${enzymeX - 70 + jitter} ${enzymeY + 10}, ${enzymeX - 55 + jitter} ${enzymeY + 40}
                                      L ${enzymeX - 30} ${enzymeY + 50}
                                      L ${enzymeX - cleftWidth/2} ${enzymeY - 10}
                                      Q ${enzymeX - cleftWidth/2 + 5} ${enzymeY - 30}, ${enzymeX} ${enzymeY - 35 + (denatured ? Math.sin(simTime*4)*8 : 0)}
                                      Q ${enzymeX + cleftWidth/2 - 5} ${enzymeY - 30}, ${enzymeX + cleftWidth/2} ${enzymeY - 10}
                                      L ${enzymeX + 30} ${enzymeY + 50}
                                      Q ${enzymeX + 70 - jitter} ${enzymeY + 10}, ${enzymeX + 60 - jitter} ${enzymeY - 40}
                                      Q ${enzymeX + 40} ${enzymeY - 55}, ${enzymeX} ${enzymeY - 55}
                                      Q ${enzymeX - 40} ${enzymeY - 55}, ${enzymeX - 60 + jitter} ${enzymeY - 40}
                                      Z`}
                                  fill={denatured ? "url(#enzyme-denatured)" : "url(#enzyme-fill)"}
                                  stroke={denatured ? "#4b5563" : "#7c3aed"}
                                  strokeWidth="2"
                                  opacity={denatured ? 0.7 : 1}
                                />

                                {/* Active site label */}
                                <text x={enzymeX} y={enzymeY + 10} fill={denatured ? "#6b7280" : "#c4b5fd"} fontSize="8" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">
                                  {denatured ? "DEFORMED" : "ACTIVE SITE"}
                                </text>

                                {/* Enzyme label */}
                                <text x={enzymeX} y={enzymeY + 65} fill="#9ca3af" fontSize="9" textAnchor="middle" fontWeight="bold" letterSpacing="1">
                                  ENZYME
                                </text>

                                {/* Primary substrate molecule — fits into cleft */}
                                {!denatured && (
                                  <g transform={`translate(${enzymeX}, ${substrateTargetY})`}>
                                    {/* Substrate shape — rounded triangle that fits U-cleft */}
                                    <path
                                      d="M 0 -12 Q 12 -6, 12 4 Q 8 14, 0 16 Q -8 14, -12 4 Q -12 -6, 0 -12 Z"
                                      fill="url(#substrate-fill)"
                                      stroke="#059669"
                                      strokeWidth="1.5"
                                    />
                                    <text x="0" y="4" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">S</text>

                                    {/* Binding indicator lines when docked */}
                                    {activity > 0.5 && (
                                      <>
                                        <line x1="-14" y1="6" x2="-20" y2="10" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 1" opacity={0.5 + Math.sin(simTime * 4) * 0.5}/>
                                        <line x1="14" y1="6" x2="20" y2="10" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 1" opacity={0.5 + Math.sin(simTime * 4 + 1) * 0.5}/>
                                      </>
                                    )}
                                  </g>
                                )}

                                {/* Denatured — substrate bouncing away */}
                                {denatured && (
                                  <g transform={`translate(${enzymeX + 30 + Math.cos(simTime * 2) * 40}, ${50 + Math.sin(simTime * 1.8) * 25})`}>
                                    <path d="M 0 -10 Q 10 -5, 10 3 Q 7 12, 0 14 Q -7 12, -10 3 Q -10 -5, 0 -10 Z" fill="url(#substrate-fill)" stroke="#059669" strokeWidth="1.5"/>
                                    <text x="0" y="3" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">S</text>
                                    {/* Red X for no binding */}
                                    <line x1="-5" y1="-16" x2="5" y2="-8" stroke="#ef4444" strokeWidth="2"/>
                                    <line x1="5" y1="-16" x2="-5" y2="-8" stroke="#ef4444" strokeWidth="2"/>
                                  </g>
                                )}

                                {/* Free-floating substrate molecules */}
                                {Array.from({ length: numFree }).map((_, i) => {
                                  const angle = simTime * 0.4 + i * (Math.PI * 2 / numFree);
                                  const radius = 85 + i * 12;
                                  const sx = enzymeX + Math.cos(angle) * radius;
                                  const sy = 130 + Math.sin(angle * 0.7 + i) * 50;
                                  const size = 0.6 + Math.sin(i * 1.3) * 0.15;
                                  return (
                                    <g key={`fs-${i}`} transform={`translate(${Math.max(15, Math.min(305, sx))}, ${Math.max(15, Math.min(245, sy))}) scale(${size})`} opacity={0.5}>
                                      <path d="M 0 -10 Q 10 -5, 10 3 Q 7 12, 0 14 Q -7 12, -10 3 Q -10 -5, 0 -10 Z" fill="#34d399" stroke="#059669" strokeWidth="1"/>
                                      <text x="0" y="4" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">S</text>
                                    </g>
                                  );
                                })}

                                {/* Product molecules exiting (when active and bound) */}
                                {activity > 0.5 && !denatured && (
                                  <>
                                    {[0, 1].map(pi => {
                                      const px = enzymeX + (pi === 0 ? -1 : 1) * (35 + (simTime * 20) % 60);
                                      const py = enzymeY + 55 + (simTime * 12) % 40;
                                      return (
                                        <g key={`prod-${pi}`} transform={`translate(${px}, ${Math.min(250, py)})`} opacity={Math.max(0, 1 - ((simTime * 12) % 40) / 40)}>
                                          <circle r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
                                          <text x="0" y="3" fill="#78350f" fontSize="6" textAnchor="middle" fontWeight="bold">P</text>
                                        </g>
                                      );
                                    })}
                                  </>
                                )}

                                {/* Legend */}
                                <g transform="translate(10, 240)">
                                  <circle r="4" cx="4" cy="0" fill="#34d399"/>
                                  <text x="12" y="3" fill="#9ca3af" fontSize="7">Substrate</text>
                                  <circle r="4" cx="64" cy="0" fill="#fbbf24"/>
                                  <text x="72" y="3" fill="#9ca3af" fontSize="7">Product</text>
                                  <rect x="120" y="-4" width="8" height="8" rx="1" fill="#8b5cf6"/>
                                  <text x="132" y="3" fill="#9ca3af" fontSize="7">Enzyme</text>
                                </g>
                              </>
                            );
                          })()}
                        </svg>
                      </div>

                      {/* Right: Rate of reaction mini graph */}
                      <div className="w-36 shrink-0 flex flex-col gap-2">
                        {/* Temperature rate curve */}
                        <div className="bg-gray-800/60 rounded-lg border border-gray-700/40 p-2 flex-1">
                          <div className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Rate vs Temperature</div>
                          <svg width="100%" height="90" viewBox="0 0 120 90" className="overflow-visible">
                            {/* Axes */}
                            <line x1="15" y1="5" x2="15" y2="75" stroke="#4b5563" strokeWidth="1"/>
                            <line x1="15" y1="75" x2="115" y2="75" stroke="#4b5563" strokeWidth="1"/>
                            <text x="0" y="42" fill="#6b7280" fontSize="5" transform="rotate(-90 5 42)" textAnchor="middle">Rate</text>
                            <text x="65" y="85" fill="#6b7280" fontSize="5" textAnchor="middle">Temperature (°C)</text>

                            {/* Bell curve */}
                            {(() => {
                              const ph = sliderValues.ph ?? 7;
                              const points: string[] = [];
                              for (let t = 0; t <= 80; t += 2) {
                                const px = 15 + (t / 80) * 100;
                                // Bell curve with denaturation cliff
                                let rate;
                                if (t <= 50) {
                                  rate = Math.exp(-0.5 * Math.pow((t - 37) / 10, 2));
                                } else {
                                  rate = Math.exp(-0.5 * Math.pow((50 - 37) / 10, 2)) * Math.exp(-0.3 * (t - 50));
                                }
                                const phFactor = Math.exp(-0.5 * Math.pow((ph - 7) / 3, 2));
                                rate *= phFactor;
                                const py = 75 - rate * 65;
                                points.push(`${px},${py}`);
                              }
                              return (
                                <>
                                  <polyline points={points.join(' ')} fill="none" stroke="#a78bfa" strokeWidth="1.5"/>
                                  {/* Denaturation zone */}
                                  <rect x={15 + (50/80)*100} y="5" width={15 + (80/80)*100 - (15 + (50/80)*100)} height="70" fill="#ef4444" opacity="0.08"/>
                                  <text x={15 + (55/80)*100} y="14" fill="#ef4444" fontSize="5" opacity="0.7">Denatured</text>

                                  {/* Current temp marker */}
                                  {(() => {
                                    const temp = sliderValues.temp ?? 37;
                                    const cx = 15 + (temp / 80) * 100;
                                    let rate;
                                    if (temp <= 50) {
                                      rate = Math.exp(-0.5 * Math.pow((temp - 37) / 10, 2));
                                    } else {
                                      rate = Math.exp(-0.5 * Math.pow((50 - 37) / 10, 2)) * Math.exp(-0.3 * (temp - 50));
                                    }
                                    const phFactor = Math.exp(-0.5 * Math.pow((ph - 7) / 3, 2));
                                    rate *= phFactor;
                                    const cy = 75 - rate * 65;
                                    return (
                                      <>
                                        <line x1={cx} y1="5" x2={cx} y2="75" stroke="#facc15" strokeWidth="0.5" strokeDasharray="2 2"/>
                                        <circle cx={cx} cy={cy} r="3" fill="#facc15" stroke="#fef08a" strokeWidth="1"/>
                                      </>
                                    );
                                  })()}
                                </>
                              );
                            })()}

                            {/* Axis labels */}
                            <text x="15" y="82" fill="#6b7280" fontSize="5">0</text>
                            <text x={15 + (40/80)*100} y="82" fill="#6b7280" fontSize="5">40</text>
                            <text x={15 + (80/80)*100 - 5} y="82" fill="#6b7280" fontSize="5">80</text>
                          </svg>
                        </div>

                        {/* Live readings */}
                        <div className="bg-gray-800/60 rounded-lg border border-gray-700/40 p-2 space-y-1.5">
                          <div className="text-[8px] font-black uppercase tracking-widest text-gray-500">Live Readings</div>
                          {(() => {
                            const temp = sliderValues.temp ?? 37;
                            const ph = sliderValues.ph ?? 7;
                            const sub = sliderValues.substrate ?? 50;
                            const denatured = temp > 50 || ph < 3 || ph > 11;
                            let rate;
                            if (temp <= 50) {
                              rate = Math.exp(-0.5 * Math.pow((temp - 37) / 10, 2));
                            } else {
                              rate = Math.exp(-0.5 * Math.pow((50 - 37) / 10, 2)) * Math.exp(-0.3 * (temp - 50));
                            }
                            rate *= Math.exp(-0.5 * Math.pow((ph - 7) / 3, 2));
                            if (denatured) rate = 0;
                            rate *= sub / 100;

                            const collisions = Math.round(rate * 48 + (denatured ? 0 : 5));
                            const successful = Math.round(rate * 38);

                            return (
                              <>
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-gray-500">Activity</span>
                                  <span className={`font-bold ${rate > 0.5 ? "text-emerald-400" : rate > 0 ? "text-yellow-400" : "text-red-400"}`}>{(rate * 100).toFixed(0)}%</span>
                                </div>
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-gray-500">Collisions/s</span>
                                  <span className="font-bold text-sky-400">{collisions}</span>
                                </div>
                                <div className="flex justify-between text-[9px]">
                                  <span className="text-gray-500">Reactions/s</span>
                                  <span className="font-bold text-amber-400">{successful}</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-900 mt-0.5 overflow-hidden">
                                  <div className={`h-full rounded-full transition-all duration-300 ${rate > 0.5 ? "bg-emerald-500" : rate > 0.2 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${rate * 100}%` }}></div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 14. Fallback Generic Dynamic Canvas for un-implemented interactives */}
                {(!labsDatabase[normalizedId]) && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="text-right text-gray-500 text-xs">Dynamic Sandbox Engine v2026.6</div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                      <div className="relative">
                        {/* Dynamic rotating circle core */}
                        <motion.div 
                          animate={{ rotate: isPlaying ? 360 : 0 }}
                          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                          className="w-24 h-24 rounded-full border-4 border-dashed border-blue-500/30 flex items-center justify-center"
                        >
                          <Activity size={32} className="text-blue-500" />
                        </motion.div>
                        {/* Particle lines */}
                        <motion.div 
                          animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="absolute inset-0 w-24 h-24 rounded-full border-2 border-cyan-400/20"
                        />
                      </div>
                      
                      <div className="text-center space-y-1">
                        <div className="text-sm font-bold text-gray-200">Simulating {activeLab.title}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">Active Mathematical Modeling</div>
                      </div>
                    </div>

                    {/* Calculated dynamic output readout */}
                    <div className="bg-gray-800 rounded p-4 text-center text-xs font-mono">
                      Calculated Model Output (A × B) = &nbsp;
                      <span className="text-sm font-bold text-yellow-400">
                        {((sliderValues.varA ?? 5) * (sliderValues.varB ?? 5)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Parameter sliders control card */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sliders size={18} className="text-blue-700" /> Active Sliders
              </h3>
              
              <div className="space-y-6">
                {activeLab.sliders.map(slider => (
                  <div key={slider.key} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-700 flex items-center gap-2">
                        <span className="inline-flex w-7 h-7 items-center justify-center bg-gray-100 rounded text-xs font-mono font-black text-gray-600">
                          {slider.symbol}
                        </span>
                        {slider.name}
                      </span>
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded text-xs border border-blue-100">
                        {sliderValues[slider.key]?.toFixed(slider.step < 1 ? 2 : 0)}
                        <span className="text-gray-400 text-[10px] font-normal lowercase pl-1">{slider.unit}</span>
                      </span>
                    </div>

                    <div className="flex gap-4 items-center">
                      <span className="text-xs font-mono text-gray-400 w-8 text-right">{slider.min}</span>
                      <input 
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={sliderValues[slider.key] ?? slider.defaultValue}
                        onChange={(e) => handleSliderChange(slider.key, parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                      />
                      <span className="text-xs font-mono text-gray-400 w-8">{slider.max}</span>
                    </div>
                    <p className="text-xs font-medium text-gray-400 pl-9">{slider.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Objectives, Equations & Inquiry steps (Col-span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Lab Objectives & Mathematical Model card */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">Syllabus Objectives</h3>
              <ul className="space-y-3">
                {activeLab.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-3 items-start text-xs font-medium text-gray-600 leading-relaxed">
                    <CheckCircle2 size={16} className="text-blue-700 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>

              {activeLab.formulas.length > 0 && (
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mathematical Equations</h4>
                  <div className="space-y-4">
                    {activeLab.formulas.map((form, i) => (
                      <div key={i} className="bg-gray-900 text-white rounded p-4 flex flex-col items-center justify-center font-mono">
                        <div className="text-[9px] text-gray-500 uppercase self-start mb-2">{form.name}</div>
                        <div 
                          className="text-lg font-bold"
                          dangerouslySetInnerHTML={{ __html: renderMathFormula(form.tex) }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inquiry Laboratory Activity Checklist */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-900 font-serif border-b border-gray-100 pb-3">Inquiry Guide Sheet</h3>
              
              <div className="space-y-4">
                {activeLab.inquiry.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-gray-50 border border-gray-100 rounded p-4 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-blue-700 shrink-0 border border-blue-100">
                      {idx + 1}
                    </div>
                    <p className="text-xs font-semibold text-gray-600 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
