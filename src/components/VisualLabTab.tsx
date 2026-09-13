import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Video,
  Sliders,
  Sparkles,
  Zap,
  Activity,
  HelpCircle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Layers,
  Cpu,
  RefreshCw,
  Box,
  Compass,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { VideoScript, WhatIfSimulationConfig, AccessibilityConfig } from '../types';
import { simulationConfigs } from '../data/mockData';
import { generateVideoScript, runWhatIf, speakText, stopSpeaking } from '../services/api';

interface VisualLabTabProps {
  accessibility: AccessibilityConfig;
}

export const VisualLabTab: React.FC<VisualLabTabProps> = ({ accessibility }) => {
  const [activeLabTab, setActiveLabTab] = useState<'video' | 'what_if' | 'ar_3d'>('video');

  // --- VIDEO GENERATOR & SYNCHRONIZED PLAYER STATE ---
  const [videoTopic, setVideoTopic] = useState('How a CPU Works: Fetch, Decode, Execute Pipeline');
  const [videoStyle, setVideoStyle] = useState('Visual Mode');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoScript, setVideoScript] = useState<VideoScript | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isNarrating, setIsNarrating] = useState(false);

  // --- WHAT-IF SIMULATOR STATE ---
  const [activeSimIndex, setActiveSimIndex] = useState(0);
  const activeSim = simulationConfigs[activeSimIndex];
  const [simValues, setSimValues] = useState<Record<string, number>>({});
  const [studentPrediction, setStudentPrediction] = useState('');
  const [isSimulatingWhatIf, setIsSimulatingWhatIf] = useState(false);
  const [whatIfAnalysis, setWhatIfAnalysis] = useState<any>(null);

  // Initialize simulation slider values
  useEffect(() => {
    const initial: Record<string, number> = {};
    activeSim.variables.forEach((v) => {
      initial[v.key] = v.defaultValue;
    });
    setSimValues(initial);
    setWhatIfAnalysis(null);
  }, [activeSimIndex]);

  // Load initial video script on mount
  useEffect(() => {
    handleGenerateVideo('How a CPU Works: Fetch, Decode, Execute Pipeline');
  }, []);

  const handleGenerateVideo = async (topic = videoTopic) => {
    setIsGeneratingVideo(true);
    try {
      const res = await generateVideoScript(topic, videoStyle);
      if (res && res.data) {
        setVideoScript(res.data);
        setCurrentSceneIndex(0);
        setPlaybackTime(0);
        setIsPlayingVideo(false);
      }
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  // Video playback loop
  useEffect(() => {
    let timer: any = null;
    if (isPlayingVideo && videoScript) {
      timer = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= 25) {
            // Advance to next scene
            if (currentSceneIndex < videoScript.scenes.length - 1) {
              setCurrentSceneIndex((idx) => idx + 1);
              return 0;
            } else {
              setIsPlayingVideo(false);
              return 25;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingVideo, currentSceneIndex, videoScript]);

  // Handle scene narration
  const handleNarrateScene = (text: string) => {
    if (isNarrating) {
      stopSpeaking();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      speakText(text, {
        speed: accessibility.speechSpeed,
        onEnd: () => setIsNarrating(false),
      });
    }
  };

  // Run What-If Simulation
  const handleExecuteWhatIf = async () => {
    setIsSimulatingWhatIf(true);
    try {
      const firstVar = activeSim.variables[0];
      const res = await runWhatIf({
        subject: activeSim.subject,
        variable: firstVar.name,
        change: `${simValues[firstVar.key]} ${firstVar.unit}`,
        currentContext: activeSim.title,
        studentPrediction,
      });
      if (res && res.data) {
        setWhatIfAnalysis(res.data);
      }
    } finally {
      setIsSimulatingWhatIf(false);
    }
  };

  const currentScene = videoScript?.scenes[currentSceneIndex];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">AI Visual Lab & Simulator</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Convert complex educational mechanics into animated video lessons, interactive what-if simulations, and 3D models.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700/80 text-xs font-semibold">
          <button
            onClick={() => setActiveLabTab('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeLabTab === 'video' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>AI Animated Video</span>
          </button>
          <button
            onClick={() => setActiveLabTab('what_if')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeLabTab === 'what_if' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive What-If Lab</span>
          </button>
          <button
            onClick={() => setActiveLabTab('ar_3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeLabTab === 'ar_3d' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D / AR Projections</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: AI ANIMATED VIDEO GENERATOR & SYNCHRONIZED PLAYER --- */}
      {activeLabTab === 'video' && (
        <div className="space-y-6">
          {/* Topic Generator Bar */}
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-md">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={videoTopic}
                onChange={(e) => setVideoTopic(e.target.value)}
                placeholder="Enter any topic to synthesize into an animated visual video..."
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-indigo-500"
              />

              {/* Style Selector */}
              <select
                value={videoStyle}
                onChange={(e) => setVideoStyle(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-indigo-500 shrink-0"
              >
                <option value="Visual Mode">Visual Mode (Diagrams & Motion)</option>
                <option value="Quick Explanation">Quick Explanation (60s)</option>
                <option value="Detailed Lesson">Detailed Lesson (Deep Scaffolding)</option>
                <option value="Exam Preparation">Exam Preparation (Rubric Focused)</option>
                <option value="Beginner Mode">Beginner Mode (Intuitive)</option>
              </select>

              <button
                onClick={() => handleGenerateVideo()}
                disabled={isGeneratingVideo}
                className="w-full sm:w-auto shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-md shadow-indigo-600/20"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingVideo ? 'animate-spin' : ''}`} />
                <span>{isGeneratingVideo ? 'Synthesizing...' : 'Generate Video'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Player Screen */}
          {videoScript && currentScene ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Visual Stage / Animated Canvas */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
                {/* Visual Simulation Canvas Display */}
                <div className="relative min-h-[340px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Scene Title Pill */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full font-bold">
                      Scene {currentScene.sceneNumber} of {videoScript.scenes.length}: {currentScene.title}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {playbackTime}s / {currentScene.duration}
                    </span>
                  </div>

                  {/* Dynamic Graphic Rendering based on current scene */}
                  <div className="my-auto py-8 flex flex-col items-center justify-center relative z-10">
                    {/* CPU Datapath Simulation Graphic */}
                    {videoTopic.toLowerCase().includes('cpu') ? (
                      <div className="w-full max-w-lg space-y-4">
                        <div className="grid grid-cols-5 gap-2 text-center text-xs">
                          {['Input', 'Fetch (PC)', 'Decode (IR)', 'Execute (ALU)', 'Writeback'].map((stage, i) => (
                            <div
                              key={i}
                              className={`p-2.5 rounded-xl border transition-all duration-500 ${
                                (currentScene.sceneNumber - 1) % 5 === i
                                  ? 'bg-indigo-600 text-white font-bold scale-105 border-indigo-400 shadow-lg shadow-indigo-500/30'
                                  : 'bg-slate-800/80 text-slate-400 border-slate-700/60'
                              }`}
                            >
                              <div className="text-[10px] opacity-75">Stage {i + 1}</div>
                              <div className="text-[11px] truncate">{stage}</div>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Data Bus Beam */}
                        <div className="relative h-12 bg-slate-950 rounded-xl border border-indigo-500/40 p-2 flex items-center justify-around overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-pulse" />
                          <div className="font-mono text-xs text-indigo-300 flex items-center gap-4 z-10">
                            <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-[11px]">Bus 0x7FFF04</span>
                            <span className="animate-bounce text-emerald-400">➜</span>
                            <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[11px]">OPCODE: ADD R1, R2</span>
                            <span className="animate-bounce text-indigo-400">➜</span>
                            <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 text-[11px]">FLAG: Z=0</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* General Concept Dynamic SVG Flow */
                      <div className="w-full max-w-md flex flex-col items-center justify-center text-center space-y-3">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-emerald-400 p-0.5 shadow-xl animate-pulse">
                          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                            <Activity className="w-8 h-8 text-indigo-400" />
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-slate-200">
                          {currentScene.visualDescription}
                        </p>
                      </div>
                    )}

                    {/* Keywords Glowing Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                      {currentScene.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-indigo-300 border border-slate-700 shadow-sm"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Synchronized Captions & Subtitles Box */}
                  <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 z-10">
                    <p className="text-slate-200 text-xs sm:text-sm text-center leading-relaxed">
                      "{currentScene.narration}"
                    </p>
                  </div>
                </div>

                {/* Player Controls Bar */}
                <div className="bg-slate-950 border-t border-slate-800 p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (currentSceneIndex > 0) {
                          setCurrentSceneIndex(currentSceneIndex - 1);
                          setPlaybackTime(0);
                        }
                      }}
                      disabled={currentSceneIndex === 0}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
                      title="Previous Scene"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-md shadow-indigo-600/30"
                      title={isPlayingVideo ? 'Pause' : 'Play'}
                    >
                      {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button
                      onClick={() => {
                        if (currentSceneIndex < videoScript.scenes.length - 1) {
                          setCurrentSceneIndex(currentSceneIndex + 1);
                          setPlaybackTime(0);
                        }
                      }}
                      disabled={currentSceneIndex === videoScript.scenes.length - 1}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
                      title="Next Scene"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setCurrentSceneIndex(0);
                        setPlaybackTime(0);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                      title="Reset"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scene scrubber pills */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    {videoScript.scenes.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentSceneIndex(idx);
                          setPlaybackTime(0);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          currentSceneIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                        }`}
                        title={`Go to scene ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Speech Narration Toggle */}
                  <button
                    onClick={() => handleNarrateScene(currentScene.narration)}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition font-medium ${
                      isNarrating ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isNarrating ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
                    <span className="hidden md:inline">{isNarrating ? 'Stop' : 'Read Out'}</span>
                  </button>
                </div>
              </div>

              {/* Sidebar: Scene Breakdown & Knowledge Check Question */}
              <div className="space-y-4">
                {/* Scene List */}
                <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
                    Scene Breakdown ({videoScript.totalDuration})
                  </h4>
                  <div className="space-y-2">
                    {videoScript.scenes.map((sc, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setCurrentSceneIndex(i);
                          setPlaybackTime(0);
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                          currentSceneIndex === i
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-200">
                            {sc.sceneNumber}. {sc.title}
                          </span>
                          <span className="text-[10px] text-slate-500">{sc.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{sc.visualDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Knowledge Check Checkpoint */}
                {videoScript.knowledgeCheck && (
                  <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>Video Knowledge Checkpoint</span>
                    </div>

                    <p className="text-slate-200 text-xs font-semibold mb-3 leading-relaxed">
                      {videoScript.knowledgeCheck.question}
                    </p>

                    <div className="space-y-1.5">
                      {videoScript.knowledgeCheck.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setSelectedQuizAnswer(optIdx)}
                          className={`w-full text-left p-2 rounded-lg text-xs border transition ${
                            selectedQuizAnswer === optIdx
                              ? optIdx === videoScript.knowledgeCheck.correctIndex
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {selectedQuizAnswer !== null && (
                      <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-0.5">
                          {selectedQuizAnswer === videoScript.knowledgeCheck.correctIndex ? 'Correct! 🌟' : 'Review Note:'}
                        </strong>
                        {videoScript.knowledgeCheck.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* --- TAB 2: INTERACTIVE WHAT-IF LAB & CONCEPT SIMULATOR --- */}
      {activeLabTab === 'what_if' && (
        <div className="space-y-6">
          {/* Simulator Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {simulationConfigs.map((sim, i) => (
              <button
                key={sim.id}
                onClick={() => setActiveSimIndex(i)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  activeSimIndex === i
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {sim.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Sliders & Prediction Input (Prompt Section 16 & 17) */}
            <div className="lg:col-span-1 bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="font-bold text-white text-base">{activeSim.title}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{activeSim.description}</p>
              </div>

              {/* Sliders for Variables */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                {activeSim.variables.map((v) => (
                  <div key={v.key} className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-300">{v.name}</span>
                      <span className="font-mono text-indigo-400 font-bold">
                        {simValues[v.key] ?? v.defaultValue} {v.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={v.min}
                      max={v.max}
                      step={v.step}
                      value={simValues[v.key] ?? v.defaultValue}
                      onChange={(e) =>
                        setSimValues((prev) => ({
                          ...prev,
                          [v.key]: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full accent-indigo-500"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">{v.description}</span>
                  </div>
                ))}
              </div>

              {/* Prediction Step: "What do you think will happen?" (Prompt Requirement) */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Before running: What do you predict will happen?
                </label>
                <textarea
                  value={studentPrediction}
                  onChange={(e) => setStudentPrediction(e.target.value)}
                  rows={2}
                  placeholder="e.g. As gravity drops, oscillation period will elongate and max speed will reduce..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                onClick={handleExecuteWhatIf}
                disabled={isSimulatingWhatIf}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulatingWhatIf ? 'animate-spin' : ''}`} />
                <span>Simulate & Compare Prediction</span>
              </button>
            </div>

            {/* Dynamic Graph & AI Physical Law Explanation */}
            <div className="lg:col-span-2 space-y-5">
              {/* Simulation Graph Canvas */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-indigo-500/20 text-indigo-400">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    <span className="font-bold text-white text-xs">Phase Space & System Trajectory Response</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Real-time Numerical ODE Solver</span>
                </div>

                {/* SVG Visual Graph */}
                <div className="h-48 w-full flex items-end justify-between px-4 py-2 border-b border-slate-800 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-10 border-t border-slate-600" />

                  {/* Render simulated trajectory curve */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
                    <path
                      d={`M 0 100 Q 125 ${100 - (simValues['gravity'] || 9.8) * 4} 250 100 T 500 100`}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeDasharray="6 2"
                    />
                    <path
                      d={`M 0 100 C 100 ${50 + (simValues['damping'] || 0.1) * 80}, 200 ${150 - (simValues['damping'] || 0.1) * 60}, 500 100`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                    />
                  </svg>

                  {/* Live coordinates tooltip */}
                  <div className="absolute top-4 right-4 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-300">
                    <div>Period T = {(2 * Math.PI * Math.sqrt((simValues['length'] || 1.0) / (simValues['gravity'] || 9.8))).toFixed(2)}s</div>
                    <div>Peak Energy: {((simValues['mass'] || 1.0) * (simValues['gravity'] || 9.8) * 0.5).toFixed(1)} Joules</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2.5 h-1 bg-emerald-400 inline-block rounded" /> Damped Trajectory
                    </span>
                    <span className="flex items-center gap-1 text-indigo-400">
                      <span className="w-2.5 h-1 bg-indigo-400 inline-block rounded" /> Ideal Phase Limit
                    </span>
                  </div>
                  <span>Time Domain (seconds)</span>
                </div>
              </div>

              {/* What-If Prediction Comparison (Prompt Section 16 & 17) */}
              {whatIfAnalysis && (
                <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        Prediction vs. Simulated Scientific Reality
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      {whatIfAnalysis.predictionAccuracy}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {whatIfAnalysis.predictionFeedback}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <strong className="text-indigo-300 block">Governing Principle:</strong>
                    <p className="text-slate-300">{whatIfAnalysis.governingLaw}</p>
                    <p className="text-slate-400 text-[11px] mt-1">{whatIfAnalysis.scientificOutcome}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>
                      <strong className="text-slate-300">Real-world analog:</strong> {whatIfAnalysis.realWorldExample}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: 3D / AR CONCEPTUAL PROJECTION --- */}
      {activeLabTab === 'ar_3d' && (
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
            <Box className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-white">Augmented Reality & 3D Molecule/Die Explorer</h3>
          <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed">
            Project high-resolution 3D schematics directly onto your desk using WebXR / mobile AR camera overlays for molecules, electromagnetic fields, and CPU silicon layers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
            {[
              { title: 'Chloroplast Thylakoid 3D', desc: 'Rotate molecular ATP Synthase rotor', tag: 'Biochemistry' },
              { title: '7nm FinFET Transistor Die', desc: 'Inspect gate insulator and source/drain', tag: 'Hardware' },
              { title: '3D Vector Gradient Field', desc: 'Visualize divergence & curl vectors', tag: 'Calculus III' },
            ].map((ar, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-indigo-500/40 transition">
                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded">{ar.tag}</span>
                <h4 className="text-xs font-bold text-slate-200 mt-2">{ar.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{ar.desc}</p>
                <button className="mt-3 text-[10px] font-bold text-indigo-400 flex items-center gap-1 hover:text-indigo-300">
                  Launch WebXR Projection <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
