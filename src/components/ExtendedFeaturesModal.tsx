import React, { useState } from 'react';
import {
  X,
  Award,
  Users,
  GraduationCap,
  Heart,
  FileSearch,
  Briefcase,
  Lightbulb,
  Scale,
  Leaf,
  Cpu,
  Wifi,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';
import { StudentProfile, PeerMentor } from '../types';
import { samplePeerMentors } from '../data/mockData';

interface ExtendedFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: string;
  profile: StudentProfile;
}

export const ExtendedFeaturesModal: React.FC<ExtendedFeaturesModalProps> = ({
  isOpen,
  onClose,
  initialSection = 'gamification',
  profile,
}) => {
  const [activeSection, setActiveSection] = useState<string>(initialSection);

  // Debate state
  const [debateTopic, setDebateTopic] = useState('Should Gene Editing via CRISPR be Permitted for Cognitive Enhancement?');
  const [studentDebatePoint, setStudentDebatePoint] = useState('');
  const [debateRounds, setDebateRounds] = useState<Array<{ speaker: 'student' | 'ai'; text: string; rubric?: string }>>([
    {
      speaker: 'ai',
      text: 'I argue that cognitive enhancement via CRISPR risks exacerbating global inequality, creating biological caste systems inaccessible to underprivileged populations. How do you address the distributive justice critique under a Rawlsian veil of ignorance?',
      rubric: 'Ethical Framework: Rawlsian Justice & Distributive Equity'
    }
  ]);

  if (!isOpen) return null;

  const sections = [
    { id: 'gamification', label: '1. Gamification & XP', icon: <Award className="w-4 h-4" /> },
    { id: 'peer_mentor', label: '2. AI Peer Mentors', icon: <Users className="w-4 h-4" /> },
    { id: 'educator', label: '3. Educator Dashboard', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'parent', label: '4. Parent Portal', icon: <Heart className="w-4 h-4" /> },
    { id: 'research', label: '5. Research Companion', icon: <FileSearch className="w-4 h-4" /> },
    { id: 'career', label: '6. Career & Skill Pathways', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'creativity', label: '7. Innovation & Project Lab', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'debate', label: '8. Ethical Debate Arena', icon: <Scale className="w-4 h-4" /> },
    { id: 'sustainability', label: '9. Climate & Impact', icon: <Leaf className="w-4 h-4" /> },
    { id: 'agents', label: '10. Multi-Agent System', icon: <Cpu className="w-4 h-4" /> },
    { id: 'offline', label: '11. Offline Sync Packs', icon: <Wifi className="w-4 h-4" /> },
  ];

  const handlePostDebate = () => {
    if (!studentDebatePoint.trim()) return;
    const newPoint = studentDebatePoint;
    setStudentDebatePoint('');

    setDebateRounds((prev) => [
      ...prev,
      { speaker: 'student', text: newPoint },
      {
        speaker: 'ai',
        text: `Intriguing utilitarian argument! However, consider the slippery slope: when does elective enhancement cease to be medical treatment and transform into compulsory social conformity? Under Kantian deontology, using individuals as competitive tools violates categorical imperatives.`,
        rubric: 'Evaluated on: Logical Consistency (9/10), Addressing Counterarguments (8/10), Philosophical Grounding (9/10)'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-white text-base">VisualMind Platform Extended Suite</h3>
              <p className="text-slate-400 text-xs">Explore all 33 architectural dimensions of the Intelligent Learning Companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: Sidebar + Active View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-3 space-y-1 overflow-y-auto shrink-0">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                  activeSection === sec.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {sec.icon}
                <span className="truncate">{sec.label}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-900 space-y-5">
            {/* 1. GAMIFICATION */}
            {activeSection === 'gamification' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Gamified Adaptive Learning Engine (Section 19)
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Encouraging deep intrinsic motivation through concept masteries, study streaks, and daily visual quests.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-center">
                    <Flame className="w-6 h-6 text-amber-400 fill-amber-400 mx-auto mb-1 animate-pulse" />
                    <span className="text-xl font-bold text-white">{profile.streakDays} Days</span>
                    <span className="text-xs text-slate-400 block">Consecutive Learning Streak</span>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-center">
                    <Sparkles className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
                    <span className="text-xl font-bold text-white">{profile.xpPoints} XP</span>
                    <span className="text-xs text-slate-400 block">Cognitive Experience Points</span>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-center">
                    <Award className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                    <span className="text-xl font-bold text-white">Mastery Tier IV</span>
                    <span className="text-xs text-slate-400 block">Senior Visual Problem Solver</span>
                  </div>
                </div>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-xs text-slate-200">Daily Quest: "Master Derivatives in 24 Hours"</h5>
                  <p className="text-slate-400 text-xs">
                    Complete 2 interactive what-if simulations on tangent slopes and score 80%+ on the chain rule quiz to unlock the <strong>Master Deriver</strong> badge (+150 XP).
                  </p>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[65%]" />
                  </div>
                  <span className="text-[11px] text-amber-400 font-semibold">Progress: 65% Completed</span>
                </div>
              </div>
            )}

            {/* 2. PEER MENTORS */}
            {activeSection === 'peer_mentor' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" /> AI Peer Mentor & Collaborative Matching (Section 20)
                </h4>
                <p className="text-slate-400 text-xs">
                  AI matches students with complementary strengths and shared exam goals for peer explanations and study rooms.
                </p>

                <div className="space-y-3">
                  {samplePeerMentors.map((pm) => (
                    <div key={pm.id} className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={pm.avatar} alt={pm.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-indigo-500" />
                        <div>
                          <h5 className="font-bold text-white text-xs sm:text-sm">{pm.name}</h5>
                          <span className="text-indigo-400 text-xs block">{pm.specialty}</span>
                          <span className="text-[11px] text-slate-400">Goal: {pm.sharedGoal}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-emerald-400 font-bold text-xs block">{pm.matchScore}% Match</span>
                        <button className="mt-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold">
                          Invite to Study Room
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. EDUCATOR DASHBOARD */}
            {activeSection === 'educator' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400" /> Educator & Classroom Intelligence (Section 21)
                </h4>
                <p className="text-slate-400 text-xs">
                  Live dashboard providing teachers with class-wide concept struggle heatmaps, AI homework grading suggestions, and interactive whiteboard simulations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-rose-400 block">Class Friction Hotspot:</span>
                    <h5 className="text-sm font-bold text-white">42% of students struggling with Multivariable Chain Rule</h5>
                    <p className="text-slate-400 text-xs">
                      AI recommends projecting the 3D dependency tree simulation during tomorrow's lecture.
                    </p>
                    <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold">
                      Project Simulation on Class Whiteboard
                    </button>
                  </div>

                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 block">Automated Rubric Grading:</span>
                    <h5 className="text-sm font-bold text-white">28 Homework Submissions Evaluated</h5>
                    <p className="text-slate-400 text-xs">
                      AI identified recurring arithmetic factoring traps across 12 papers and drafted personalized annotations.
                    </p>
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold">
                      Review & Approve Grades
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PARENT PORTAL */}
            {activeSection === 'parent' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" /> Parent & Guardian Learning Companion (Section 22)
                </h4>
                <p className="text-slate-400 text-xs">
                  Constructive, encouraging insights for parents without technical jargon—focusing on effort, consistency, and positive family discussion prompts.
                </p>

                <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded">Weekly Family Learning Digest</span>
                  <h5 className="text-sm font-bold text-white">Sarah has studied 14.5 hours this week with high consistency!</h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    She achieved a breakthrough in Cell Biology and is actively practicing Calculus derivatives. Her focus is strong during morning sessions.
                  </p>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                    <strong className="text-amber-300 block">Recommended Conversation Starter:</strong>
                    <p className="text-slate-300">
                      "I heard you were testing how CPU microprocessors execute instructions today! Could you teach me the restaurant kitchen analogy you learned?"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. RESEARCH COMPANION */}
            {activeSection === 'research' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <FileSearch className="w-5 h-5 text-indigo-400" /> AI Research & Academic Deep-Dive (Section 23)
                </h4>
                <p className="text-slate-400 text-xs">
                  Connect textbook concepts to contemporary academic papers and Nobel-prize research.
                </p>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">Nature Biotech (2025)</span>
                  <h5 className="text-sm font-bold text-white">High-Efficiency Biomimetic Photolysis Arrays for Hydrogen Fuel</h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Extends the Photosystem II Z-scheme you studied in Chapter 4 to artificial nanostructured leaves that achieve 18% solar-to-hydrogen efficiency.
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                    <span>Citation: APA / BibTeX available</span>
                    <button className="flex items-center gap-1 hover:text-indigo-300">
                      Read AI Paper Summary <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 6. CAREER & SKILL PATHWAYS */}
            {activeSection === 'career' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-400" /> Career & Practical Skill Pathways (Section 24)
                </h4>
                <p className="text-slate-400 text-xs">
                  Maps the specific mathematical and computational principles you are learning to high-demand careers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-white text-xs sm:text-sm">Silicon Hardware Architect</h5>
                    <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded">Relevance: 96% Match</span>
                    <p className="text-slate-400 text-xs">
                      Applies CPU datapath pipelining, ALU logic, and cache hierarchy mechanics to designing next-gen AI accelerator chips.
                    </p>
                    <span className="text-slate-300 text-[11px] block">Key Tools: Verilog, SystemC, RISC-V, Synopsys</span>
                  </div>

                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="font-bold text-white text-xs sm:text-sm">Autonomous Systems & Robotics</h5>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">Relevance: 92% Match</span>
                    <p className="text-slate-400 text-xs">
                      Applies multivariable calculus gradients, phase space damping, and Kirchhoff circuit laws to flight control algorithms.
                    </p>
                    <span className="text-slate-300 text-[11px] block">Key Tools: ROS2, MATLAB/Simulink, PyTorch</span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. INNOVATION & CREATIVITY LAB */}
            {activeSection === 'creativity' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" /> AI Creativity & Innovation Lab (Section 25)
                </h4>
                <p className="text-slate-400 text-xs">
                  Generate capstone project ideas, visual mind maps, and prototype concepts from your syllabus topics.
                </p>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400">Capstone Project Proposal:</span>
                  <h5 className="text-sm font-bold text-white">Browser-Based 4-Bit Microprocessor Simulator in WebAssembly</h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Build an interactive simulator that visualizes instruction fetch, decode, and ALU flags in real-time as users write assembly code.
                  </p>
                  <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold">
                    Generate Full Project Spec & Architecture
                  </button>
                </div>
              </div>
            )}

            {/* 8. ETHICAL DEBATE ARENA */}
            {activeSection === 'debate' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-indigo-400" /> AI Ethical Reasoning & Debate Arena (Section 26)
                </h4>
                <p className="text-slate-400 text-xs">
                  Engage in Socratic debate with the AI on ethical, technological, and scientific dilemmas evaluated by philosophical rubrics.
                </p>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400">Motion:</span>
                  <h5 className="font-bold text-white text-xs sm:text-sm">{debateTopic}</h5>

                  {/* Debate History */}
                  <div className="space-y-2.5 max-h-56 overflow-y-auto p-2">
                    {debateRounds.map((round, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl text-xs space-y-1 ${
                          round.speaker === 'student' ? 'bg-indigo-950/60 border border-indigo-700/60' : 'bg-slate-900 border border-slate-800'
                        }`}
                      >
                        <span className="font-bold text-slate-300 block">
                          {round.speaker === 'student' ? 'Your Counter-Argument' : 'AI Socratic Moderator'}
                        </span>
                        <p className="text-slate-200 leading-relaxed">{round.text}</p>
                        {round.rubric && (
                          <span className="text-[10px] text-amber-300 block font-mono mt-1">{round.rubric}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Input Argument */}
                  <div className="flex gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      value={studentDebatePoint}
                      onChange={(e) => setStudentDebatePoint(e.target.value)}
                      placeholder="Submit your philosophical or evidence-based rebuttal..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handlePostDebate}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                    >
                      Debate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 9. SUSTAINABILITY */}
            {activeSection === 'sustainability' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-400" /> Sustainability & Social Impact (Section 29)
                </h4>
                <p className="text-slate-400 text-xs">
                  Connect physics, electronics, and biochemistry to UN Sustainable Development Goals (SDGs) and climate technology.
                </p>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">UN SDG 7: Clean Energy</span>
                  <h5 className="text-sm font-bold text-white">How Photosynthesis Powers Next-Gen Artificial Bio-Photovoltaics</h5>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    By mimicking the Z-scheme light reaction and proton pumping in chloroplast thylakoids, engineers are fabricating organic solar cells that emit zero toxic heavy metal runoff.
                  </p>
                </div>
              </div>
            )}

            {/* 10. MULTI-AGENT SYSTEM */}
            {activeSection === 'agents' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-400" /> Multi-Agent AI Orchestrator Architecture (Section 30)
                </h4>
                <p className="text-slate-400 text-xs">
                  VisualMind is powered by 6 specialized agents coordinating via server-side Gemini:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Content Agent', role: 'OCR, parsing, source fact-check' },
                    { name: 'Vision Agent', role: 'Multimodal diagram & handwriting recognition' },
                    { name: 'Tutor Agent', role: 'Socratic dialogue & conversational scaffolding' },
                    { name: 'Assessment Agent', role: 'Dynamic questions & rubric evaluation' },
                    { name: 'Knowledge Gap Agent', role: 'Graph prerequisite tracing & remediation' },
                    { name: 'Roadmap Agent', role: 'Adaptive study timeline & readiness calculation' },
                  ].map((ag, i) => (
                    <div key={i} className="p-3 bg-slate-850 border border-slate-800 rounded-xl">
                      <span className="font-bold text-indigo-300 text-xs block">{ag.name}</span>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{ag.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. OFFLINE SYNC PACKS */}
            {activeSection === 'offline' && (
              <div className="space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-emerald-400" /> Offline & Low-Bandwidth Synchronization (Section 31)
                </h4>
                <p className="text-slate-400 text-xs">
                  All study packs, formula sheets, flashcards, and simulated trajectory models are cached locally for full offline study.
                </p>

                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-semibold">Offline STEM Package Cache:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 14.2 MB Cached (Ready)
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between p-2 rounded bg-slate-900">
                      <span>Calculus III Revision Pack & Formulas</span>
                      <span className="text-slate-400">Cached</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900">
                      <span>CPU Datapath Visual Simulation Models</span>
                      <span className="text-slate-400">Cached</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-slate-900">
                      <span>Photosynthesis 3D Schematics</span>
                      <span className="text-slate-400">Cached</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Download Full Syllabus Pack for Travel (ZIP)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
