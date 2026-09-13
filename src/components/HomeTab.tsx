import React from 'react';
import {
  Activity,
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Flame,
  Target,
  BookOpen,
  Eye,
  Bot,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  Compass,
  FileText,
  Edit3
} from 'lucide-react';
import { StudentProfile, SpacedRevisionItem, AgentActivity } from '../types';

interface HomeTabProps {
  profile: StudentProfile;
  spacedRevision: SpacedRevisionItem[];
  setActiveTab: (tab: string) => void;
  onSelectScenario: (scenarioId: number) => void;
  onOpenKnowledgeGap: (concept: string) => void;
  onOpenExamPrep: () => void;
  onEditProfile?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  profile,
  spacedRevision,
  setActiveTab,
  onSelectScenario,
  onOpenKnowledgeGap,
  onOpenExamPrep,
  onEditProfile,
}) => {
  // Real-time Agent Orchestrator activity logs
  const agentActivities: AgentActivity[] = [
    {
      id: 'a1',
      agent: 'KnowledgeGap',
      action: 'Detected prerequisite friction',
      timestamp: '2m ago',
      status: 'active',
      detail: 'Tracing differentiation error to limits & continuity foundation.'
    },
    {
      id: 'a2',
      agent: 'Visual',
      action: 'Synthesized interactive CPU pipeline model',
      timestamp: '14m ago',
      status: 'completed',
      detail: 'Generated dynamic bus state animation with fetch/decode gates.'
    },
    {
      id: 'a3',
      agent: 'Revision',
      action: 'Queued Spaced Repetition card',
      timestamp: '35m ago',
      status: 'completed',
      detail: 'Multivariable Chain Rule predicted to hit 60% forgetting threshold tomorrow.'
    },
    {
      id: 'a4',
      agent: 'Tutor',
      action: 'Socratic hint scaffold prepared',
      timestamp: '1h ago',
      status: 'idle',
      detail: 'Ready to guide intuition for thylakoid proton pump dynamics.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. HERO LEARNING PULSE & TODAY'S GOAL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Visual Learning Pulse Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/90 via-slate-850 to-slate-900 border border-slate-700/80 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Activity className="w-4 h-4 animate-pulse" />
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Welcome back, <span className="text-indigo-400">{profile.name}</span>!
                </h2>
              </div>
              <p className="text-slate-400 text-xs">
                {profile.gradeLevel} {profile.institution ? `• ${profile.institution}` : ''} | Target: <strong className="text-slate-200">{profile.targetExam}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/70 px-3 py-1.5 rounded-xl text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-300 font-medium">Cognitive State:</span>
                <span className="text-emerald-400 font-bold capitalize">{profile.cognitiveState}</span>
              </div>

              {onEditProfile && (
                <button
                  onClick={onEditProfile}
                  className="px-2.5 py-1.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-indigo-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                  title="Edit & Add Profile Details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Visual Pulse Meter Ring */}
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col items-center justify-center text-center relative group">
              <div className="relative w-24 h-24 mb-2 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-500 transition-all duration-1000 ease-out"
                    strokeDasharray={`${profile.overallMastery}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{profile.overallMastery}%</span>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-300 font-bold">Pulse</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-200">Overall Concept Mastery</span>
              <span className="text-[11px] text-slate-400">+4.2% higher than last week</span>
            </div>

            {/* Retention Predictor */}
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-medium">Memory Retention Index</span>
                  <span className="text-emerald-400 font-bold">88.4%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500 rounded-full w-[88%]" />
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Based on Ebbinghaus forgetting curve modeling. 3 spaced reviews scheduled to lock concepts.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Streak: {profile.streakDays} days</span>
                <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-amber-400" /> Active
                </span>
              </div>
            </div>

            {/* Exam Readiness & Rationale */}
            <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-indigo-500/50 transition" onClick={onOpenExamPrep}>
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-medium">Exam Readiness Score</span>
                  <span className="text-indigo-400 font-black text-sm">{profile.readinessScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full w-[78%]" />
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
                  <span className="font-semibold text-slate-200">"Why 78%?":</span> High mastery in Kinematics & Biology (90%+), but Multivariable Chain Rule and Inductive AC Reactance require diagnostic repair.
                </p>
              </div>
              <span className="text-indigo-400 font-semibold text-[11px] flex items-center gap-1 mt-2">
                Open Exam Prep Plan <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Today's Learning Goal Card */}
        <div className="bg-slate-850/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Target className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-white text-base">Today's Study Goal</h3>
              </div>
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                2.2 / 3.5 hrs
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              You are 63% through your daily STEM target. Complete today's 2 visual simulations and the Socratic quiz to maintain your streak.
            </p>

            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-[63%]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Limits Tangent Slope Simulation
                </span>
                <span className="text-emerald-400 text-[11px] font-semibold">Done</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Multivariable Chain Rule Diagnostics
                </span>
                <span className="text-amber-400 text-[11px] font-semibold">Pending</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('learn')}
            className="w-full mt-4 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
          >
            Continue Learning Journey <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 2. FIVE REAL-WORLD DEMONSTRATION SCENARIOS (Prompt Section 33) */}
      <section className="bg-slate-850/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-white text-base">Guided Demonstration Scenarios</h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
              End-to-End Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Click any scenario to see the complete Ingest → Explain → Visualize → Assess loop in action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              id: 1,
              title: 'Scenario 1: Difficult Concept',
              desc: 'Upload CPU chapter → AI visual pipeline → 90s animated video → interactive quiz.',
              icon: <Cpu className="w-4 h-4 text-indigo-400" />,
              tag: 'Visual Video',
              tab: 'visual_lab'
            },
            {
              id: 2,
              title: 'Scenario 2: Handwritten Notes',
              desc: 'OCR & Multimodal Vision extract math/diagram → structures study pack & flashcards.',
              icon: <FileText className="w-4 h-4 text-emerald-400" />,
              tag: 'Computer Vision',
              tab: 'learn'
            },
            {
              id: 3,
              title: 'Scenario 3: Knowledge Gap',
              desc: 'Student struggles with Differentiation → AI traces missing prerequisite in Limits.',
              icon: <Brain className="w-4 h-4 text-rose-400" />,
              tag: 'Prerequisite Repair',
              tab: 'progress'
            },
            {
              id: 4,
              title: 'Scenario 4: Exam Preparation',
              desc: 'Input exam date & syllabus → AI generates daily schedule, readiness & mock test.',
              icon: <Calendar className="w-4 h-4 text-amber-400" />,
              tag: 'Readiness 78%',
              tab: 'assess'
            },
            {
              id: 5,
              title: 'Scenario 5: Interactive Learning',
              desc: '"What happens if resistance increases?" → Launches dynamic simulation & prediction.',
              icon: <Eye className="w-4 h-4 text-sky-400" />,
              tag: 'What-If Lab',
              tab: 'visual_lab'
            }
          ].map((sc) => (
            <div
              key={sc.id}
              onClick={() => {
                onSelectScenario(sc.id);
                setActiveTab(sc.tab);
              }}
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-200 group hover:-translate-y-0.5 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-indigo-500/40 transition">
                    {sc.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                    {sc.tag}
                  </span>
                </div>
                <h4 className="font-bold text-slate-200 text-xs group-hover:text-indigo-300 transition mb-1">
                  {sc.title}
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {sc.desc}
                </p>
              </div>
              <div className="pt-3 flex items-center text-[10px] font-bold text-indigo-400 group-hover:text-indigo-300">
                Launch Scenario <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CONTINUE LEARNING & WEAK CONCEPTS RADAR */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Continue Learning Topics */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Continue Learning
            </h3>
            <button
              onClick={() => setActiveTab('learn')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View All Topics <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Card 1 */}
            <div
              onClick={() => setActiveTab('visual_lab')}
              className="bg-slate-850 border border-slate-700/80 hover:border-indigo-500/60 rounded-xl p-4 cursor-pointer transition shadow-sm group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-mono text-[10px]">
                  Computer Science
                </span>
                <span>85% completed</span>
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition mb-1">
                How a CPU Works: Pipeline & ALU
              </h4>
              <p className="text-slate-400 text-xs mb-3 line-clamp-2">
                Input → Fetch → Decode → Execute → Memory → Output animated visual breakdown.
              </p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-indigo-500 rounded-full w-[85%]" />
              </div>
              <span className="text-indigo-400 text-[11px] font-bold flex items-center gap-1">
                Resume Animated Video <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => setActiveTab('learn')}
              className="bg-slate-850 border border-slate-700/80 hover:border-indigo-500/60 rounded-xl p-4 cursor-pointer transition shadow-sm group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono text-[10px]">
                  Biology & Chemistry
                </span>
                <span>65% completed</span>
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition mb-1">
                Photosynthesis & Calvin Cycle
              </h4>
              <p className="text-slate-400 text-xs mb-3 line-clamp-2">
                Light-dependent proton pumping in thylakoid membrane and carbon fixation.
              </p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-emerald-500 rounded-full w-[65%]" />
              </div>
              <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                Explore 3D Concept Lab <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Weak Concepts Alert & Knowledge Gap Fixer */}
          <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Prerequisite Friction Points</span>
              </div>
              <span className="text-[10px] text-rose-300 font-mono bg-rose-900/40 px-2 py-0.5 rounded">
                AI Knowledge-Gap Engine
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-3">
              Diagnostic assessments identified that difficulty with <strong className="text-rose-300">Differentiation & Rates</strong> stems from incomplete mastery of <strong className="text-amber-300">Limits & Infinitesimals</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.weakConcepts.map((wc, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenKnowledgeGap(wc)}
                  className="px-2.5 py-1 rounded-lg bg-rose-900/30 hover:bg-rose-800/40 border border-rose-700/50 text-rose-200 text-xs font-medium flex items-center gap-1 transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  {wc} <ArrowRight className="w-3 h-3 ml-1 text-rose-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Spaced Revision Queue & Agent Stream */}
        <div className="space-y-4">
          {/* Spaced Revision Box */}
          <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Spaced Revision Queue
              </h4>
              <span className="text-[10px] text-slate-400">Day 1 → 14</span>
            </div>

            <div className="space-y-2">
              {spacedRevision.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveTab('assess')}
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="text-slate-200 font-semibold block text-[11px]">{item.concept}</span>
                    <span className="text-slate-500 text-[10px]">{item.stage} • Due {item.dueDate}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      item.retentionRisk === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : item.retentionRisk === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.retentionRisk} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Multi-Agent Live Feed */}
          <div className="bg-slate-850 border border-slate-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                AI Learning Orchestrator Feed
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Coordinating
              </span>
            </div>

            <div className="space-y-2">
              {agentActivities.map((act) => (
                <div key={act.id} className="text-[11px] p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-indigo-300">{act.agent} Agent</span>
                    <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                  </div>
                  <p className="text-slate-300 font-medium">{act.action}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{act.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
