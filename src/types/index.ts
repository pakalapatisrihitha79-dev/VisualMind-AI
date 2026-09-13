export type ConceptStatus = 'mastered' | 'needs_practice' | 'weak' | 'not_started';

export interface ConceptNode {
  id: string;
  label: string;
  category: string;
  status: ConceptStatus;
  masteryScore: number; // 0 - 100
  prerequisites?: string[]; // IDs of prerequisites
  description: string;
  formula?: string;
  examWeight?: string;
}

export interface ConceptEdge {
  id: string;
  source: string;
  target: string;
  relation: 'prerequisite_of' | 'subconcept_of' | 'applies_to' | 'contrasts_with';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  gradeLevel: string;
  targetExam: string;
  examDate: string; // ISO date
  studyGoalHoursPerDay: number;
  streakDays: number;
  xpPoints: number;
  overallMastery: number; // percentage
  readinessScore: number; // e.g., 78%
  cognitiveState: 'optimal' | 'focused' | 'confused' | 'fatigued';
  preferredStyle: 'visual' | 'socratic' | 'step_by_step' | 'real_world';
  weakConcepts: string[];
  strongConcepts: string[];
  mistakeMemory: MistakeLog[];
  completedTopicsCount: number;
  totalHoursStudied: number;
  offlinePacksReady: boolean;
  bio?: string;
  institution?: string;
  primarySubjects?: string[];
  learningGoals?: string[];
  createdAt?: string;
}

export interface MistakeLog {
  id: string;
  topic: string;
  concept: string;
  mistakePattern: string;
  frequency: number;
  remedyAction: string;
  lastOccurred: string;
}

export interface UploadedMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'notes' | 'image' | 'formula_sheet' | 'textbook';
  uploadedAt: string;
  summary: string;
  sourceVerifiedInfo: string[];
  aiInterpretation: string[];
  ocrText?: string;
  keyConcepts: Array<{ name: string; description: string; importance: 'Core' | 'High' | 'Medium' }>;
  definitions: Array<{ term: string; definition: string }>;
  formulas: Array<{ name: string; formula: string; variables: string }>;
  prerequisites: string[];
  flashcards: Array<{ front: string; back: string }>;
  imageUrl?: string;
}

export interface VideoScene {
  sceneNumber: number;
  title: string;
  narration: string;
  visualDescription: string;
  keywords: string[];
  duration: string;
  graphicType: 'diagram' | 'flowchart' | 'simulation' | 'quiz' | 'comparison';
}

export interface VideoScript {
  title: string;
  totalDuration: string;
  style: string;
  scenes: VideoScene[];
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  focusTopics: string[];
  status: 'completed' | 'in_progress' | 'upcoming';
  estimatedHours: number;
  targetAccuracy: number;
  diagnosticCheck: string;
}

export interface SpacedRevisionItem {
  id: string;
  concept: string;
  stage: 'Today (Learn)' | 'Tomorrow (Quick Rev)' | 'Day 3 (Practice)' | 'Day 7 (Test)' | 'Day 14 (Final)';
  dueDate: string;
  retentionRisk: 'low' | 'medium' | 'high';
  intervalDays: number;
}

export interface AssessmentQuestion {
  id: string;
  type: 'mcq' | 'numerical' | 'descriptive' | 'diagram' | 'true_false' | 'fill_blank';
  difficulty: 'Easy' | 'Medium' | 'Challenging' | 'Olympiad';
  concept: string;
  question: string;
  diagramUrl?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  points: number;
}

export interface AnswerEvaluationResult {
  score: number;
  maxScore: number;
  correctness: 'Correct' | 'Partially Correct' | 'Incorrect';
  missingConcepts: string[];
  mistakes: string[];
  suggestedImprovements: string;
  modelAnswer: string;
  personalizedFeedback: string;
  detectedCognitiveGap?: string;
}

export interface WhatIfSimulationConfig {
  id: string;
  subject: 'physics' | 'electronics' | 'calculus' | 'chemistry' | 'computerscience';
  title: string;
  description: string;
  variables: Array<{
    name: string;
    key: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit: string;
    description: string;
  }>;
}

export interface AgentActivity {
  id: string;
  agent: 'Orchestrator' | 'Content' | 'Tutor' | 'Visual' | 'Assessment' | 'KnowledgeGap' | 'Roadmap' | 'Research' | 'Revision' | 'Motivation';
  action: string;
  status: 'active' | 'completed' | 'idle';
  timestamp: string;
  detail: string;
}

export interface PeerMentor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  matchScore: number;
  status: 'online' | 'studying' | 'offline';
  sharedGoal: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  confidenceScore?: number;
  sourceAttribution?: {
    source: string;
    page: string;
    status: string;
  };
}

export interface AccessibilityConfig {
  fontDyslexic: boolean;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  speechSpeed: number; // 0.8 - 1.5
  language: string; // 'en' | 'te' | 'hi' | 'es' | 'fr'
  reducedMotion?: boolean;
  screenReaderActive?: boolean;
  gestureNav?: boolean;
}
