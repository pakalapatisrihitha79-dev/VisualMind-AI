import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  TrendingUp,
  Brain,
  Sparkles,
  Send,
  RefreshCw,
  Clock,
  Calendar,
  Layers,
  BarChart2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { AssessmentQuestion, StudentProfile, ConceptNode } from '../types';
import { evaluateAnswer } from '../services/api';

interface AssessTabProps {
  questions: AssessmentQuestion[];
  profile: StudentProfile;
  knowledgeNodes: ConceptNode[];
  onOpenKnowledgeGap: (concept: string) => void;
}

export const AssessTab: React.FC<AssessTabProps> = ({
  questions,
  profile,
  knowledgeNodes,
  onOpenKnowledgeGap,
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const activeQ = questions[activeQuestionIndex];

  // MCQ selection
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Student written answer for descriptive / numerical
  const [studentWrittenAnswer, setStudentWrittenAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  // Mock exam simulation mode
  const [isExamMode, setIsExamMode] = useState(false);
  const [examTimeRemaining, setExamTimeRemaining] = useState(1200); // 20 mins

  const handleSelectOption = (opt: string) => {
    setSelectedOption(opt);
    setEvaluationResult({
      score: opt === activeQ.correctAnswer ? activeQ.points : 0,
      maxScore: activeQ.points,
      correctness: opt === activeQ.correctAnswer ? 'Correct' : 'Incorrect',
      missingConcepts: opt === activeQ.correctAnswer ? [] : ['Derivation step factorization'],
      mistakes: opt === activeQ.correctAnswer ? [] : ['Arithmetic factoring error on quadratic roots'],
      suggestedImprovements: 'Always double-check roots of the factored derivative equation: 3(t-1)(t-3) = 0.',
      modelAnswer: activeQ.explanation,
      personalizedFeedback: opt === activeQ.correctAnswer
        ? 'Spot on! You derived velocity instantaneously from the position polynomial.'
        : 'Notice how setting s\'(t) = 0 requires factoring out the common 3 first.',
      detectedCognitiveGap: opt === activeQ.correctAnswer ? undefined : 'Polynomial Factorization'
    });
  };

  const handleEvaluateWrittenAnswer = async () => {
    if (!studentWrittenAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const res = await evaluateAnswer({
        question: activeQ.question,
        expectedAnswer: activeQ.correctAnswer,
        studentAnswer: studentWrittenAnswer,
        maxMarks: activeQ.points,
      });
      if (res && res.data) {
        setEvaluationResult(res.data);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Exam Readiness Banner */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Adaptive Assessment & Diagnostic Engine</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Multi-modal evaluation with real-time cognitive gap detection, rubric scoring, and predictive exam readiness.
          </p>
        </div>

        {/* Readiness Meter & Mock Trigger */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 rounded-xl text-xs">
            <span className="text-slate-400 block text-[10px]">Predicted Readiness</span>
            <span className="text-indigo-400 font-black text-sm">{profile.readinessScore}%</span>
          </div>

          <button
            onClick={() => setIsExamMode(!isExamMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isExamMode
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isExamMode ? 'End Timed Mock' : 'Start Timed Mock Exam'}</span>
          </button>
        </div>
      </div>

      {/* Timed Mock Notification if active */}
      {isExamMode && (
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2 font-semibold">
            <Clock className="w-4 h-4 animate-spin text-amber-400" />
            <span>Timed Exam Mode Active • 18:42 Remaining</span>
          </div>
          <span className="text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-amber-700/50">
            Target Exam: {profile.targetExam}
          </span>
        </div>
      )}

      {/* Main Assessment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Question & Answer Workspace */}
        <div className="lg:col-span-2 space-y-5">
          {/* Question Navigator Pills */}
          <div className="flex items-center justify-between bg-slate-850 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionIndex(idx);
                    setSelectedOption(null);
                    setStudentWrittenAnswer('');
                    setEvaluationResult(null);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    activeQuestionIndex === idx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">
                {activeQ.type.toUpperCase()}
              </span>
              <span className="text-slate-400">{activeQ.points} Points</span>
            </div>
          </div>

          {/* Active Question Card */}
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Concept: <strong className="text-slate-200">{activeQ.concept}</strong></span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  activeQ.difficulty === 'Challenging'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {activeQ.difficulty} Difficulty
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {activeQ.question}
            </h3>

            {/* Hint Dropdown */}
            {activeQ.hint && (
              <div className="bg-indigo-950/20 border border-indigo-800/30 rounded-xl p-3 text-xs text-indigo-300 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-indigo-200 mb-0.5">Socratic Hint:</strong>
                  <span>{activeQ.hint}</span>
                </div>
              </div>
            )}

            {/* Answer Input depending on Question Type */}
            {activeQ.type === 'mcq' && activeQ.options && (
              <div className="space-y-2 pt-2">
                {activeQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${
                      selectedOption === opt
                        ? opt === activeQ.correctAnswer
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 font-bold'
                          : 'bg-rose-950/60 border-rose-500 text-rose-100 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedOption === opt && (
                      <span>
                        {opt === activeQ.correctAnswer ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {(activeQ.type === 'descriptive' || activeQ.type === 'numerical') && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Your Solution / Written Explanation:
                </label>
                <textarea
                  value={studentWrittenAnswer}
                  onChange={(e) => setStudentWrittenAnswer(e.target.value)}
                  rows={4}
                  placeholder={
                    activeQ.type === 'numerical'
                      ? 'Enter your step-by-step mathematical derivation and final numerical value...'
                      : 'Provide a detailed explanation of the mechanism, components, and chemical/physical consequences...'
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none font-mono"
                />

                <button
                  onClick={handleEvaluateWrittenAnswer}
                  disabled={isEvaluating || !studentWrittenAnswer.trim()}
                  className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
                  <span>{isEvaluating ? 'AI Evaluating Answer...' : 'Submit for AI Grading & Gap Analysis'}</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Comprehensive Evaluation Breakdown (Prompt Section 9) */}
          {evaluationResult && (
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm">AI Pedagogical Answer Evaluation</h4>
                    <span className="text-[10px] text-slate-400">Rubric & Cognitive Gap Breakdown</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                      evaluationResult.correctness === 'Correct'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : evaluationResult.correctness === 'Partially Correct'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {evaluationResult.correctness}
                  </span>

                  <div className="font-mono text-sm font-black text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                    {evaluationResult.score} / {evaluationResult.maxScore} pts
                  </div>
                </div>
              </div>

              {/* Personalized Feedback */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-indigo-400 block mb-1">Feedback:</strong>
                {evaluationResult.personalizedFeedback}
              </div>

              {/* Missing Concepts & Mistakes */}
              {(evaluationResult.missingConcepts?.length > 0 || evaluationResult.mistakes?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evaluationResult.missingConcepts?.length > 0 && (
                    <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-3 text-xs text-amber-200">
                      <strong className="text-amber-300 block mb-1">Missing Concepts:</strong>
                      <ul className="list-disc list-inside space-y-0.5">
                        {evaluationResult.missingConcepts.map((mc: string, i: number) => (
                          <li key={i}>{mc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {evaluationResult.mistakes?.length > 0 && (
                    <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3 text-xs text-rose-200">
                      <strong className="text-rose-300 block mb-1">Identified Inaccuracies:</strong>
                      <ul className="list-disc list-inside space-y-0.5">
                        {evaluationResult.mistakes.map((mk: string, i: number) => (
                          <li key={i}>{mk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Detected Cognitive Gap Action */}
              {evaluationResult.detectedCognitiveGap && (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/50 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-rose-400 font-bold block">Prerequisite Gap Identified:</span>
                    <span className="text-rose-200">{evaluationResult.detectedCognitiveGap}</span>
                  </div>
                  <button
                    onClick={() => onOpenKnowledgeGap(evaluationResult.detectedCognitiveGap)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 transition"
                  >
                    Fix Gap in Graph <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Model Answer */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-slate-300">
                <strong className="text-emerald-400 block mb-1">Model Canonical Solution:</strong>
                <p className="leading-relaxed">{evaluationResult.modelAnswer}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Knowledge Map & Exam Countdown */}
        <div className="space-y-5">
          {/* Exam Target Card */}
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" /> Target Exam
              </span>
              <span className="text-[10px] font-mono text-slate-400">{profile.examDate}</span>
            </div>
            <h4 className="text-sm font-bold text-indigo-300">{profile.targetExam}</h4>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full w-[78%]" />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              34 days remaining. Current readiness is 78%. Raising Differentiation from 48% to 85% will push readiness above 90%.
            </p>
          </div>

          {/* Visual Knowledge Map (Prompt Section 10: 🟢 Mastered, 🟡 Needs Practice, 🔴 Weak, 🔵 Not Started) */}
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Visual Knowledge Map
              </h4>
              <span className="text-[10px] text-slate-400">Color-Coded Status</span>
            </div>

            <div className="space-y-2">
              {knowledgeNodes.slice(0, 5).map((node) => {
                const statusStyles = {
                  mastered: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
                  needs_practice: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
                  weak: 'border-rose-500/40 bg-rose-950/20 text-rose-300',
                  not_started: 'border-sky-500/40 bg-sky-950/20 text-sky-300',
                };
                const statusDots = {
                  mastered: 'bg-emerald-400',
                  needs_practice: 'bg-amber-400',
                  weak: 'bg-rose-400',
                  not_started: 'bg-sky-400',
                };

                return (
                  <div
                    key={node.id}
                    onClick={() => onOpenKnowledgeGap(node.label)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer hover:scale-[1.01] transition ${statusStyles[node.status]}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDots[node.status]}`} />
                      <span className="font-semibold">{node.label}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold">{node.masteryScore}%</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-3 mt-3 border-t border-slate-800">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> 🟢 Mastered</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> 🟡 Needs Practice</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> 🔴 Weak Gap</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400" /> 🔵 Not Started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
