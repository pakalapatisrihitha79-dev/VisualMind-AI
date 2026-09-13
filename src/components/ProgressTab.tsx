import React, { useState } from 'react';
import {
  Brain,
  Layers,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Zap,
  Target,
  RefreshCw,
  Sliders,
  Compass,
  Edit3,
  Mail,
  Users,
  Plus
} from 'lucide-react';
import { StudentProfile, ConceptNode, ConceptEdge, RoadmapWeek, SpacedRevisionItem } from '../types';

interface ProgressTabProps {
  profile: StudentProfile;
  knowledgeNodes: ConceptNode[];
  knowledgeEdges: ConceptEdge[];
  roadmap: RoadmapWeek[];
  spacedRevision: SpacedRevisionItem[];
  selectedGapConcept?: string | null;
  onSelectConcept: (node: ConceptNode) => void;
  onEditProfile?: () => void;
  onSwitchAccount?: () => void;
}

export const ProgressTab: React.FC<ProgressTabProps> = ({
  profile,
  knowledgeNodes,
  knowledgeEdges,
  roadmap,
  spacedRevision,
  selectedGapConcept,
  onSelectConcept,
  onEditProfile,
  onSwitchAccount,
}) => {
  const [activeSubView, setActiveSubView] = useState<'digital_twin' | 'knowledge_graph' | 'roadmap' | 'spaced_revision'>('digital_twin');
  const [inspectedNodeId, setInspectedNodeId] = useState<string>(
    selectedGapConcept ? 'differentiation' : 'differentiation'
  );

  const inspectedNode = knowledgeNodes.find((n) => n.id === inspectedNodeId) || knowledgeNodes[2];

  // Find prerequisites of the inspected node
  const prerequisites = knowledgeNodes.filter((n) => inspectedNode.prerequisites?.includes(n.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Sub-Views */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Brain className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">Student Digital Twin & Knowledge Architecture</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Dynamic computational model of your cognitive state, prerequisite knowledge graph, and exam trajectory.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700/80 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'digital_twin', label: 'Digital Twin Profile', icon: <Brain className="w-3.5 h-3.5" /> },
            { id: 'knowledge_graph', label: 'Interactive Knowledge Graph', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'roadmap', label: 'Adaptive Roadmap', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'spaced_revision', label: 'Spaced Revision (Curve)', icon: <Clock className="w-3.5 h-3.5" /> },
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubView(sub.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeSubView === sub.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sub.icon}
              <span>{sub.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- SUBVIEW 1: STUDENT DIGITAL TWIN PROFILE (Prompt Section 12) --- */}
      {activeSubView === 'digital_twin' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Identity & Stats */}
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-md shadow-indigo-500/20"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                    {profile.email && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Mail className="w-3 h-3 text-indigo-400" /> {profile.email}
                      </span>
                    )}
                    <p className="text-xs text-indigo-400 font-medium mt-0.5">{profile.gradeLevel}</p>
                    {profile.institution && (
                      <span className="text-[11px] text-slate-400 block">{profile.institution}</span>
                    )}
                    <span className="text-[11px] text-slate-400 block mt-0.5 font-semibold text-slate-300">
                      Target: {profile.targetExam}
                    </span>
                  </div>
                </div>
              </div>

              {profile.bio && (
                <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  "{profile.bio}"
                </p>
              )}

              {/* Action Buttons: Edit and Switch Profile */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                {onEditProfile && (
                  <button
                    onClick={onEditProfile}
                    className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit / Add Details</span>
                  </button>
                )}
                {onSwitchAccount && (
                  <button
                    onClick={onSwitchAccount}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
                  >
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Switch Profile</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px]">Study Streak</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1 text-sm">
                    <Flame className="w-4 h-4 fill-amber-400" /> {profile.streakDays} Days
                  </span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px]">Total XP Earned</span>
                  <span className="font-bold text-indigo-400 text-sm">{profile.xpPoints} XP</span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px]">Daily Study Target</span>
                  <span className="font-bold text-slate-200 text-sm">{profile.studyGoalHoursPerDay} hrs/day</span>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px]">Topics Mastered</span>
                  <span className="font-bold text-emerald-400 text-sm">{profile.completedTopicsCount}</span>
                </div>
              </div>

              {/* Cognitive State */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 block text-[10px] mb-1">Active Cognitive State:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 capitalize flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> {profile.cognitiveState}
                  </span>
                  <span className="text-[10px] text-slate-400">Preferred: {profile.preferredStyle}</span>
                </div>
              </div>
            </div>

            {/* Concept Mastery Radar / Breakdown */}
            <div className="lg:col-span-2 bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" /> Concept Mastery Breakdown
                </h4>
                <span className="text-xs text-slate-400">Overall Mastery: <strong className="text-indigo-400">{profile.overallMastery}%</strong></span>
              </div>

              {/* Bar progress breakdown */}
              <div className="space-y-3">
                {knowledgeNodes.slice(0, 6).map((node) => (
                  <div key={node.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300">{node.label}</span>
                      <span className="font-mono text-slate-400">{node.masteryScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          node.masteryScore >= 80
                            ? 'bg-emerald-500'
                            : node.masteryScore >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${node.masteryScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strong vs Weak Concepts Grid with Quick Add */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strong Core Concepts
                    </span>
                    {onEditProfile && (
                      <button
                        onClick={onEditProfile}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    )}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {profile.strongConcepts.map((sc, i) => (
                      <li key={i} className="truncate">• {sc}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> High-Priority Knowledge Gaps
                    </span>
                    {onEditProfile && (
                      <button
                        onClick={onEditProfile}
                        className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    )}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {profile.weakConcepts.map((wc, i) => (
                      <li key={i} className="truncate">• {wc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SUBVIEW 2: INTERACTIVE KNOWLEDGE GRAPH (Prompt Section 13) --- */}
      {activeSubView === 'knowledge_graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual Interactive Graph Stage */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[440px] shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between z-10">
              <div>
                <h3 className="font-bold text-white text-sm">Interactive Syllabus Knowledge Graph</h3>
                <p className="text-slate-400 text-xs">
                  Click any node to trace prerequisites and identify missing foundation roots.
                </p>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                DAG Topological Graph
              </span>
            </div>

            {/* Interactive SVG Node-Link Visualization */}
            <div className="relative h-80 w-full my-4 flex items-center justify-center">
              {/* SVG Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="20%" y1="35%" x2="50%" y2="35%" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="50%" y1="35%" x2="80%" y2="35%" stroke="#ef4444" strokeWidth="2" />
                <line x1="50%" y1="35%" x2="50%" y2="75%" stroke="#4f46e5" strokeWidth="2" />
                <line x1="80%" y1="35%" x2="80%" y2="75%" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              {/* Node Elements */}
              <div className="absolute inset-0 flex items-center justify-between px-6">
                {/* Node 1: Limits */}
                <div
                  onClick={() => setInspectedNodeId('limits')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 text-center w-36 shadow-lg ${
                    inspectedNodeId === 'limits'
                      ? 'ring-2 ring-indigo-400 scale-105 bg-indigo-900/60 border-indigo-400'
                      : 'bg-slate-850 border-emerald-500/50 hover:border-emerald-400'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block mb-1" />
                  <h4 className="font-bold text-xs text-white">Limits</h4>
                  <span className="text-[10px] font-mono text-emerald-300">92% Mastered</span>
                </div>

                {/* Node 2: Continuity */}
                <div
                  onClick={() => setInspectedNodeId('continuity')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 text-center w-36 shadow-lg ${
                    inspectedNodeId === 'continuity'
                      ? 'ring-2 ring-indigo-400 scale-105 bg-indigo-900/60 border-indigo-400'
                      : 'bg-slate-850 border-amber-500/50 hover:border-amber-400'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block mb-1" />
                  <h4 className="font-bold text-xs text-white">Continuity</h4>
                  <span className="text-[10px] font-mono text-amber-300">62% Review</span>
                </div>

                {/* Node 3: Differentiation (Gap Focus) */}
                <div
                  onClick={() => setInspectedNodeId('differentiation')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all duration-200 text-center w-40 shadow-lg ${
                    inspectedNodeId === 'differentiation'
                      ? 'ring-2 ring-rose-400 scale-105 bg-rose-950/70 border-rose-500 animate-pulse'
                      : 'bg-slate-850 border-rose-500/50 hover:border-rose-400'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block mb-1" />
                  <h4 className="font-bold text-xs text-rose-200">Differentiation</h4>
                  <span className="text-[10px] font-mono text-rose-400 font-bold">48% Friction Gap</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Foundation Ready</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Review Recommended</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> Prerequisite Gap</span>
            </div>
          </div>

          {/* Node Inspector & Prerequisite Gap Tracing (Prompt Requirement) */}
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-bold">
                  {inspectedNode.category}
                </span>
                <h4 className="text-base font-bold text-white mt-1">{inspectedNode.label}</h4>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400">{inspectedNode.masteryScore}%</span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">{inspectedNode.description}</p>

            {inspectedNode.formula && (
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                {inspectedNode.formula}
              </div>
            )}

            {/* Traced Prerequisite Gaps */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <h5 className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Prerequisite Root Analysis
              </h5>

              {prerequisites.length > 0 ? (
                <div className="space-y-1.5">
                  {prerequisites.map((pr) => (
                    <div key={pr.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-200 block">{pr.label}</span>
                        <span className="text-[10px] text-slate-400">{pr.masteryScore}% mastery</span>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        pr.masteryScore > 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {pr.masteryScore > 80 ? 'Solid' : 'Weak'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400">This concept is a foundational root with no required prerequisites.</p>
              )}
            </div>

            <button
              onClick={() => onSelectConcept(inspectedNode)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-md shadow-indigo-600/20"
            >
              <span>Repair Gap with AI Visual Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* --- SUBVIEW 3: ADAPTIVE LEARNING ROADMAP (Prompt Section 14) --- */}
      {activeSubView === 'roadmap' && (
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-base">Dynamic Personalized Study Roadmap</h3>
              <p className="text-slate-400 text-xs">
                Automatically adjusts daily tasks based on diagnostic test accuracy and time left until exam.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
              Exam: {profile.targetExam} ({profile.examDate})
            </span>
          </div>

          <div className="space-y-4">
            {roadmap.map((week) => (
              <div
                key={week.weekNumber}
                className={`p-4 rounded-xl border transition ${
                  week.status === 'in_progress'
                    ? 'bg-slate-900 border-indigo-500 shadow-md'
                    : week.status === 'completed'
                    ? 'bg-slate-900/60 border-slate-800 opacity-80'
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-400">Week {week.weekNumber}</span>
                    <h4 className="font-bold text-white text-sm">{week.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      week.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : week.status === 'in_progress'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {week.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {week.focusTopics.map((topic, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span>{week.diagnosticCheck}</span>
                  <span className="font-mono">{week.estimatedHours} hrs study</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SUBVIEW 4: SPACED REPETITION & FORGETTING CURVE (Prompt Section 18) --- */}
      {activeSubView === 'spaced_revision' && (
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-white text-base">Ebbinghaus Spaced Repetition Engine</h3>
              <p className="text-slate-400 text-xs">
                Reviews automatically queued at 1-day, 3-day, 7-day, and 14-day intervals to beat the forgetting curve.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
              Retention Predictor: 88.4%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spacedRevision.map((rev) => (
              <div key={rev.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100">{rev.concept}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      rev.retentionRisk === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : rev.retentionRisk === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {rev.retentionRisk} Risk
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Scheduled Stage: <strong className="text-indigo-300">{rev.stage}</strong></span>
                  <span>Due: {rev.dueDate}</span>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      rev.retentionRisk === 'high' ? 'bg-rose-500 w-1/4' : rev.retentionRisk === 'medium' ? 'bg-amber-500 w-2/4' : 'bg-emerald-500 w-3/4'
                    }`}
                  />
                </div>

                <button className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-400 hover:text-indigo-300 text-xs font-semibold rounded-lg transition border border-slate-700 flex items-center justify-center gap-1">
                  <span>Start 3-Minute Quick Review</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
