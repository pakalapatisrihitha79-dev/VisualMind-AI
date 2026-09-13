import {
  StudentProfile,
  ConceptNode,
  ConceptEdge,
  UploadedMaterial,
  RoadmapWeek,
  SpacedRevisionItem,
  AssessmentQuestion,
  WhatIfSimulationConfig,
  PeerMentor
} from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'usr_sarah_chen',
  name: 'Sarah Chen',
  email: 'sarah.chen@university.edu',
  password: 'Student123!',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  gradeLevel: 'College Sophomore / Engineering Pre-Med',
  institution: 'State Engineering & Medical University',
  bio: 'Passionate about bio-computational architectures and multivariable calculus modeling. Target: Ace STEM finals!',
  targetExam: 'Advanced STEM Entrance / Finals',
  examDate: '2026-10-15',
  studyGoalHoursPerDay: 3.5,
  streakDays: 14,
  xpPoints: 3420,
  overallMastery: 74,
  readinessScore: 78,
  cognitiveState: 'focused',
  preferredStyle: 'visual',
  primarySubjects: ['Calculus III', 'Computer Architecture', 'Biochemistry', 'Electric Circuits'],
  learningGoals: [
    'Master multivariable chain rule dependency trees',
    'Understand 5-stage RISC pipelining and bus arbitration',
    'Conquer chemiosmotic ATP synthesis thermodynamics'
  ],
  strongConcepts: [
    'Vector Calculus Basics',
    'Kirchhoff Voltage Laws',
    'Enzyme Catalysis Kinetics',
    'Von Neumann Architecture'
  ],
  weakConcepts: [
    'Epsilon-Delta Limit Definitions',
    'Chain Rule in Partial Derivatives',
    'Semiconductor Bandgap Dopants',
    'Le Chatelier Thermal Shift'
  ],
  mistakeMemory: [
    {
      id: 'm1',
      topic: 'Calculus III',
      concept: 'Chain Rule in Multivariable Derivatives',
      mistakePattern: 'Omits intermediate path branches in multivariable tree diagram (dz/dt = ∂z/∂x · dx/dt + ∂z/∂y · dy/dt)',
      frequency: 4,
      remedyAction: 'Always draw the dependency tree before taking partials',
      lastOccurred: 'Yesterday, 18:30'
    },
    {
      id: 'm2',
      topic: 'Electric Circuits',
      concept: 'Inductive Reactance Phase Angle',
      mistakePattern: 'Confuses lag vs lead for AC inductor current relative to voltage (ELI the ICE man mnemonic)',
      frequency: 3,
      remedyAction: 'Remember: Voltage Leads Current by 90° in pure inductors',
      lastOccurred: '3 days ago'
    },
    {
      id: 'm3',
      topic: 'Cell Biology',
      concept: 'Chemiosmotic Proton Flux',
      mistakePattern: 'Assumes protons are pumped INTO the stroma instead of into the thylakoid lumen',
      frequency: 2,
      remedyAction: 'Visualized in 3D: Lumen acts as the compressed reservoir; stroma is the low-concentration basin',
      lastOccurred: '5 days ago'
    }
  ],
  completedTopicsCount: 28,
  totalHoursStudied: 46.5,
  offlinePacksReady: true
};

export const sampleKnowledgeNodes: ConceptNode[] = [
  {
    id: 'limits',
    label: 'Limits & Infinitesimals',
    category: 'Mathematics',
    status: 'needs_practice',
    masteryScore: 62,
    description: 'Behavior of functions as input approaches a finite value or infinity.',
    formula: 'lim(x→a) f(x) = L',
    examWeight: '12% Core Foundation'
  },
  {
    id: 'continuity',
    label: 'Continuity & Intermediate Value',
    category: 'Mathematics',
    status: 'mastered',
    masteryScore: 92,
    prerequisites: ['limits'],
    description: 'A function with no sudden leaps or asymptotes across its domain interval.',
    formula: 'lim(x→c) f(x) = f(c)',
    examWeight: '8% Foundation'
  },
  {
    id: 'differentiation',
    label: 'Differentiation & Rates',
    category: 'Mathematics',
    status: 'weak',
    masteryScore: 48,
    prerequisites: ['limits', 'continuity'],
    description: 'Instantaneous slope of the tangent line to a curve at any coordinate.',
    formula: "f'(x) = lim(h→0) [f(x+h) - f(x)] / h",
    examWeight: '22% High Weight'
  },
  {
    id: 'differentiation_apps',
    label: 'Applications of Derivatives',
    category: 'Mathematics',
    status: 'not_started',
    masteryScore: 15,
    prerequisites: ['differentiation'],
    description: 'Optimization, curve sketching, related rates, and Taylor polynomial approximations.',
    formula: "f''(x) = 0 (Inflection Point)",
    examWeight: '18% High Weight'
  },
  {
    id: 'integration',
    label: 'Definite & Indefinite Integrals',
    category: 'Mathematics',
    status: 'not_started',
    masteryScore: 0,
    prerequisites: ['differentiation_apps'],
    description: 'Accumulation of quantities and area under continuous curves.',
    formula: '∫ f(x)dx = F(b) - F(a)',
    examWeight: '25% Essential'
  },
  {
    id: 'cpu_fetch',
    label: 'Instruction Fetch & Decode',
    category: 'Computer Science',
    status: 'mastered',
    masteryScore: 95,
    description: 'Program counter retrieval of opcodes across memory bus into instruction register.',
    examWeight: '10%'
  },
  {
    id: 'cpu_alu',
    label: 'ALU Execution & Flags',
    category: 'Computer Science',
    status: 'mastered',
    masteryScore: 88,
    prerequisites: ['cpu_fetch'],
    description: 'Arithmetic and bitwise Boolean logic execution on silicon full adders.',
    examWeight: '12%'
  },
  {
    id: 'photosystem_ii',
    label: 'Photosystem II & Photolysis',
    category: 'Biology',
    status: 'mastered',
    masteryScore: 85,
    description: 'Light-harvesting complex splits water molecules releasing O2 and generating proton gradient.',
    formula: '2H2O + 4hv → 4H+ + 4e- + O2',
    examWeight: '15%'
  },
  {
    id: 'calvin_cycle',
    label: 'Calvin Cycle (Dark Reactions)',
    category: 'Biology',
    status: 'needs_practice',
    masteryScore: 58,
    prerequisites: ['photosystem_ii'],
    description: 'Enzymatic reduction of CO2 into 3-carbon sugars using ATP and NADPH.',
    formula: '3 CO2 + 9 ATP + 6 NADPH → 1 G3P',
    examWeight: '14%'
  }
];

export const sampleKnowledgeEdges: ConceptEdge[] = [
  { id: 'e1', source: 'limits', target: 'continuity', relation: 'prerequisite_of' },
  { id: 'e2', source: 'limits', target: 'differentiation', relation: 'prerequisite_of' },
  { id: 'e3', source: 'continuity', target: 'differentiation', relation: 'prerequisite_of' },
  { id: 'e4', source: 'differentiation', target: 'differentiation_apps', relation: 'prerequisite_of' },
  { id: 'e5', source: 'differentiation_apps', target: 'integration', relation: 'prerequisite_of' },
  { id: 'e6', source: 'cpu_fetch', target: 'cpu_alu', relation: 'prerequisite_of' },
  { id: 'e7', source: 'photosystem_ii', target: 'calvin_cycle', relation: 'prerequisite_of' }
];

export const sampleMaterials: UploadedMaterial[] = [
  {
    id: 'mat_calc',
    title: 'Chapter 3: Calculus Foundations & Derivatives',
    type: 'pdf',
    uploadedAt: '2 hours ago',
    summary: 'Detailed treatment of instantaneous rates of change, tangent slopes, epsilon-delta limits, and fundamental power, product, and chain rules.',
    sourceVerifiedInfo: [
      'The derivative f\'(x) is defined rigorously as the limit of the difference quotient as h approaches zero.',
      'Power rule: d/dx [x^n] = n · x^(n-1) for all real values of n.',
      'Differentiability at a point strictly requires both continuity and matching left/right derivatives.'
    ],
    aiInterpretation: [
      'Visual intuition: A curve viewed through an infinite zoom microscope flattens into a straight line with slope equal to the local derivative.',
      'Physical intuition: Derivative represents speedometer reading at an exact split-second, while difference quotient is average highway speed between two toll booths.'
    ],
    ocrText: 'f\'(x) = lim(h->0) [f(x+h) - f(x)] / h. Tangent line equation: y - y0 = m(x - x0).',
    keyConcepts: [
      { name: 'Difference Quotient', description: 'Slope of secant line crossing two finite coordinates.', importance: 'Core' },
      { name: 'Instantaneous Rate of Change', description: 'Secant line limit as the interval contracts to zero.', importance: 'Core' },
      { name: 'Smooth Continuity', description: 'Absence of cusps, vertical tangents, or jump discontinuities.', importance: 'High' }
    ],
    definitions: [
      { term: 'Secant Line', definition: 'A straight line cutting across two points on a curve.' },
      { term: 'Tangent Line', definition: 'The unique linear approximation touching a curve locally without crossing at that infinitesimal delta.' }
    ],
    formulas: [
      { name: 'Definition of Derivative', formula: "f'(x) = lim[h→0] (f(x+h)-f(x))/h", variables: 'h: infinitesimal increment' },
      { name: 'Product Rule', formula: "(u·v)' = u'v + uv'", variables: 'u, v: differentiable functions' }
    ],
    prerequisites: ['Algebraic Factoring', 'Trigonometric Identities', 'Function Limits'],
    flashcards: [
      { front: 'Why does f(x) = |x| fail to be differentiable at x = 0?', back: 'Because the left derivative is -1 while the right derivative is +1; the limit does not exist.' },
      { front: 'What is the physical meaning of the second derivative f\'\'(x)?', back: 'Curvature / concavity of the graph, or acceleration in kinematics.' }
    ]
  },
  {
    id: 'mat_cpu',
    title: 'Computer Systems: Von Neumann Architecture & Datapath',
    type: 'notes',
    uploadedAt: '1 day ago',
    summary: 'Hardware mechanics of microprocessors: instruction fetching, register transfer logic, arithmetic logic unit operations, and bus timing.',
    sourceVerifiedInfo: [
      'Memory and processing unit share the common system bus in standard Von Neumann architectures.',
      'Clock signal synchronizes flip-flop state transitions on rising or falling edges.',
      'Instruction cycle executes in discrete phases: Fetch, Decode, Execute, Memory Access, Writeback.'
    ],
    aiInterpretation: [
      'Analogy: Imagine a restaurant kitchen with one head chef (ALU), an order board (Registers), a walk-in pantry (RAM), and an order ticker (Bus). Pipelining cooks multiple orders at staggered stations.'
    ],
    keyConcepts: [
      { name: 'Program Counter (PC)', description: 'Specialized register holding the address of the next machine instruction.', importance: 'Core' },
      { name: 'Arithmetic Logic Unit (ALU)', description: 'Combinational circuit performing mathematical and logical operations.', importance: 'Core' },
      { name: 'Instruction Pipeline', description: 'Technique that overlaps execution phases to boost throughput.', importance: 'High' }
    ],
    definitions: [
      { term: 'Opcode', definition: 'The portion of a machine language instruction that specifies the operation to be performed.' }
    ],
    formulas: [
      { name: 'CPU Execution Time', formula: 'Time = Instructions × CPI × Clock Cycle Time', variables: 'CPI: Cycles Per Instruction' }
    ],
    prerequisites: ['Binary Boolean Algebra', 'Logic Gates (AND, OR, XOR)', 'Basic RAM Addressing'],
    flashcards: [
      { front: 'What is the Von Neumann Bottleneck?', back: 'Throughput is limited because CPU and memory must share a single bus, restricting data transfer rate compared to CPU speed.' }
    ]
  }
];

export const sampleRoadmap: RoadmapWeek[] = [
  {
    weekNumber: 1,
    title: 'Limits & Continuity Diagnostics',
    focusTopics: ['Epsilon-Delta Rigor', 'One-Sided Limits', 'Intermediate Value Theorem'],
    status: 'completed',
    estimatedHours: 8,
    targetAccuracy: 90,
    diagnosticCheck: 'Mastered with 92% benchmark accuracy.'
  },
  {
    weekNumber: 2,
    title: 'Differentiation & Prerequisite Repair',
    focusTopics: ['Derivation from First Principles', 'Multivariable Chain Rule', 'Implicit Differentiation'],
    status: 'in_progress',
    estimatedHours: 10,
    targetAccuracy: 85,
    diagnosticCheck: 'Current weak gap identified in multivariable chain rule; targeted simulations queued.'
  },
  {
    weekNumber: 3,
    title: 'Extrema, Optimization & Related Rates',
    focusTopics: ['Critical Points', 'Second Derivative Test', 'Real-World Optimization Models'],
    status: 'upcoming',
    estimatedHours: 9,
    targetAccuracy: 85,
    diagnosticCheck: 'Scheduled for next week following differentiation diagnostic test.'
  },
  {
    weekNumber: 4,
    title: 'Mock Exam Blitz & Spaced Revision',
    focusTopics: ['Full-Length Timed Mocks', 'Mistake Memory Deep-Dive', 'Formula Sheet Speed Runs'],
    status: 'upcoming',
    estimatedHours: 12,
    targetAccuracy: 92,
    diagnosticCheck: 'Exam Readiness target: 90%+ before final exam.'
  }
];

export const sampleSpacedRevision: SpacedRevisionItem[] = [
  {
    id: 'rev1',
    concept: 'Chain Rule in Partial Derivatives',
    stage: 'Tomorrow (Quick Rev)',
    dueDate: 'Tomorrow, 09:00 AM',
    retentionRisk: 'high',
    intervalDays: 1
  },
  {
    id: 'rev2',
    concept: 'Photosynthesis Light Reactions (Z-Scheme)',
    stage: 'Day 3 (Practice)',
    dueDate: 'In 2 days',
    retentionRisk: 'medium',
    intervalDays: 3
  },
  {
    id: 'rev3',
    concept: 'Kirchhoff Circuit Voltage Loop Analysis',
    stage: 'Day 7 (Test)',
    dueDate: 'In 5 days',
    retentionRisk: 'low',
    intervalDays: 7
  },
  {
    id: 'rev4',
    concept: 'CPU Instruction Datapath Cycles',
    stage: 'Day 14 (Final)',
    dueDate: 'In 11 days',
    retentionRisk: 'low',
    intervalDays: 14
  }
];

export const sampleAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    type: 'mcq',
    difficulty: 'Medium',
    concept: 'Differentiation',
    question: 'A particle moves along a trajectory such that s(t) = t³ - 6t² + 9t. At what times is the particle instantaneously at rest?',
    options: [
      't = 1s and t = 3s',
      't = 0s and t = 2s',
      't = 3s only',
      't = 2s and t = 4s'
    ],
    correctAnswer: 't = 1s and t = 3s',
    explanation: 'Velocity is the derivative of position: v(t) = s\'(t) = 3t² - 12t + 9 = 3(t² - 4t + 3) = 3(t - 1)(t - 3). Setting v(t) = 0 yields t = 1s and t = 3s.',
    hint: 'Differentiate s(t) with respect to t to find velocity v(t), then factorize the resulting quadratic equation.',
    points: 10
  },
  {
    id: 'q2',
    type: 'descriptive',
    difficulty: 'Challenging',
    concept: 'Chemiosmosis in Chloroplasts',
    question: 'Explain how an electrochemical proton gradient drives ATP synthesis across the thylakoid membrane, and predict the effect of adding an ionophore that makes the membrane permeable to protons.',
    correctAnswer: 'Protons pumped into the thylakoid lumen create an electrochemical potential gradient (high H+ inside, low outside). Protons pass through the F0/F1 ATP Synthase complex, driving conformational rotation that phosphorylates ADP + Pi into ATP. An ionophore dissipates this gradient without proton flow through ATP Synthase, completely decoupling electron transport from ATP synthesis.',
    explanation: 'Evaluates chemiosmotic coupling, ATP Synthase mechanics, and uncoupling consequences.',
    hint: 'Think of the lumen like a pumped-storage hydroelectric dam, and ATP synthase as the water turbine.',
    points: 15
  },
  {
    id: 'q3',
    type: 'numerical',
    difficulty: 'Medium',
    concept: 'Electronics & Ohm\'s Law',
    question: 'A 12V battery is connected in series with a 4Ω resistor and an unknown resistor R. If the current through the circuit is measured to be 1.5A, find the resistance R.',
    correctAnswer: '4',
    explanation: 'Total resistance R_total = V / I = 12V / 1.5A = 8Ω. Since resistors are in series: R_total = R1 + R2 => 8Ω = 4Ω + R => R = 4Ω.',
    hint: 'Apply Ohm\'s law V = I × R_total, then solve for the unknown series resistor.',
    points: 10
  }
];

export const simulationConfigs: WhatIfSimulationConfig[] = [
  {
    id: 'sim_physics',
    subject: 'physics',
    title: 'Damped Pendulum & Gravity Field Simulator',
    description: 'Change gravitational acceleration (g), pendulum length (L), and air damping (b) to observe real-time phase space and oscillation frequencies.',
    variables: [
      { name: 'Gravity (g)', key: 'gravity', min: 1.6, max: 24.8, step: 0.1, defaultValue: 9.8, unit: 'm/s²', description: 'Planetary gravitational pull (Moon: 1.6, Earth: 9.8, Jupiter: 24.8)' },
      { name: 'Length (L)', key: 'length', min: 0.2, max: 3.0, step: 0.1, defaultValue: 1.0, unit: 'm', description: 'Distance from pivot to center of mass' },
      { name: 'Damping Coeff (b)', key: 'damping', min: 0.0, max: 1.0, step: 0.05, defaultValue: 0.1, unit: 'N·s/m', description: 'Viscous friction of fluid medium' },
      { name: 'Bob Mass (m)', key: 'mass', min: 0.1, max: 5.0, step: 0.1, defaultValue: 1.0, unit: 'kg', description: 'Inertial mass of the swinging bob' }
    ]
  },
  {
    id: 'sim_circuits',
    subject: 'electronics',
    title: 'Interactive RLC Series Circuit & Resonance',
    description: 'Tune Resistance (R), Inductance (L), Capacitance (C), and AC Source Frequency (f) to explore impedance matching and resonance peaks.',
    variables: [
      { name: 'Resistance (R)', key: 'resistance', min: 1, max: 100, step: 1, defaultValue: 20, unit: 'Ω', description: 'Energy dissipation channel' },
      { name: 'Inductance (L)', key: 'inductance', min: 10, max: 500, step: 10, defaultValue: 100, unit: 'mH', description: 'Magnetic flux storage element' },
      { name: 'Capacitance (C)', key: 'capacitance', min: 1, max: 100, step: 1, defaultValue: 10, unit: 'µF', description: 'Electric charge storage plate' },
      { name: 'Frequency (f)', key: 'frequency', min: 10, max: 500, step: 5, defaultValue: 159, unit: 'Hz', description: 'AC oscillation driving frequency' }
    ]
  },
  {
    id: 'sim_calculus',
    subject: 'calculus',
    title: 'Secant to Tangent Derivative Explorer',
    description: 'Contract step size (Δx or h) toward zero on polynomial curves f(x) = ax² + bx + c to visualize infinitesimal convergence into the tangent line.',
    variables: [
      { name: 'Coordinate (x₀)', key: 'x0', min: -5, max: 5, step: 0.5, defaultValue: 1.5, unit: '', description: 'Point of interest on the curve' },
      { name: 'Step Size (h)', key: 'h', min: 0.01, max: 2.0, step: 0.05, defaultValue: 0.8, unit: 'Δx', description: 'Distance to second secant coordinate' },
      { name: 'Curvature (a)', key: 'a', min: -3, max: 3, step: 0.2, defaultValue: 0.5, unit: '', description: 'Quadratic acceleration coefficient' }
    ]
  }
];

export const samplePeerMentors: PeerMentor[] = [
  {
    id: 'pm1',
    name: 'Aarav Patel',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    specialty: 'Calculus III & Electromagnetism',
    matchScore: 96,
    status: 'online',
    sharedGoal: 'Scoring 95%+ on STEM Entrance Finals'
  },
  {
    id: 'pm2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    specialty: 'Biochemistry & Molecular Genetics',
    matchScore: 92,
    status: 'studying',
    sharedGoal: 'Mastering Metabolic Cycles in 7 Days'
  },
  {
    id: 'pm3',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialty: 'Computer Architecture & Digital Logic',
    matchScore: 89,
    status: 'online',
    sharedGoal: 'Building RISC-V Micro-emulator'
  }
];
