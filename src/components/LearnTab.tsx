import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Camera,
  Image as ImageIcon,
  Sparkles,
  Layers,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  Zap,
  HelpCircle,
  Cpu,
  ChevronRight,
  ExternalLink,
  Brain,
  Sliders,
  Send,
  ArrowRight
} from 'lucide-react';
import { UploadedMaterial, AccessibilityConfig } from '../types';
import { understandContent, explainImageVision, explainDifferently, speakText, stopSpeaking } from '../services/api';

interface LearnTabProps {
  materials: UploadedMaterial[];
  selectedMaterial: UploadedMaterial | null;
  onSelectMaterial: (m: UploadedMaterial) => void;
  accessibility: AccessibilityConfig;
}

export const LearnTab: React.FC<LearnTabProps> = ({
  materials,
  selectedMaterial,
  onSelectMaterial,
  accessibility,
}) => {
  const [activeMaterial, setActiveMaterial] = useState<UploadedMaterial>(
    selectedMaterial || materials[0]
  );
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'multimodal' | 'explain_differently' | 'study_pack'>('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // "Explain It Differently" State
  const [diffConcept, setDiffConcept] = useState('Differentiation & Instantaneous Rate of Change');
  const [diffMode, setDiffMode] = useState<string>('analogy');
  const [diffResult, setDiffResult] = useState<any>(null);
  const [isLoadingDiff, setIsLoadingDiff] = useState(false);

  // Multimodal Vision "Explain this" State
  const [visionImage, setVisionImage] = useState<string | null>(null);
  const [visionPrompt, setVisionPrompt] = useState('Explain this diagram and its core components.');
  const [visionResult, setVisionResult] = useState<any>(null);
  const [isAnalyzingVision, setIsAnalyzingVision] = useState(false);

  // Pre-loaded sample diagram for instant demo
  const sampleDiagramUrl = 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80';

  const explanationModes = [
    { id: 'simple', label: 'Simple Explanation', desc: 'Zero jargon, crystal-clear clarity' },
    { id: 'exam', label: 'Exam Mode', desc: 'Formulas, grading criteria & rubrics' },
    { id: 'visual', label: 'Visual Explanation', desc: 'Spatial flows, colors & diagrams' },
    { id: 'real_world', label: 'Real-World Example', desc: 'Modern industry & engineering' },
    { id: 'analogy', label: 'Analogy Mode', desc: 'Everyday intuitive mental models' },
    { id: 'step_by_step', label: 'Step-by-Step', desc: 'Numbered sequential causality' },
    { id: 'beginner', label: 'Beginner Mode', desc: 'Zero prior knowledge assumed' },
    { id: 'advanced', label: 'Advanced Mode', desc: 'Mathematical rigor & edge cases' },
  ];

  // Handle TTS narration
  const handleToggleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, {
        speed: accessibility.speechSpeed,
        onEnd: () => setIsSpeaking(false),
      });
    }
  };

  // Handle Explain Differently fetch
  const handleExplainDifferently = async (mode: string) => {
    setDiffMode(mode);
    setIsLoadingDiff(true);
    try {
      const res = await explainDifferently(diffConcept, mode);
      if (res && res.data) {
        setDiffResult(res.data);
      }
    } finally {
      setIsLoadingDiff(false);
    }
  };

  // Handle Multimodal Vision "Explain this"
  const handleRunVisionAnalysis = async (imgBase64?: string) => {
    setIsAnalyzingVision(true);
    try {
      const res = await explainImageVision({
        imageBase64: imgBase64 || 'sample_base64',
        question: visionPrompt,
      });
      if (res && res.data) {
        setVisionResult(res.data);
      }
    } finally {
      setIsAnalyzingVision(false);
    }
  };

  // Handle custom file upload simulation
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      if (file.type.startsWith('image/')) {
        setVisionImage(base64);
        setActiveSubTab('multimodal');
        await handleRunVisionAnalysis(base64);
      } else {
        const result = await understandContent({
          title: file.name.replace(/\.[^/.]+$/, ''),
          content: `Uploaded file contents for ${file.name}. AI extracting key principles and structure.`,
        });
        if (result && result.data) {
          const newMat: UploadedMaterial = {
            id: `mat_${Date.now()}`,
            title: result.data.title || file.name,
            type: 'pdf',
            uploadedAt: 'Just now',
            summary: result.data.summary,
            sourceVerifiedInfo: result.data.sourceVerifiedInfo || [],
            aiInterpretation: result.data.aiInterpretation || [],
            keyConcepts: result.data.keyConcepts || [],
            definitions: result.data.definitions || [],
            formulas: result.data.formulas || [],
            prerequisites: result.data.prerequisites || [],
            flashcards: result.data.flashcards || [],
          };
          setActiveMaterial(newMat);
          setActiveSubTab('overview');
        }
      }
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls: Material Selector & Ingestion Actions */}
      <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Brain className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">AI Content Understanding Engine</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Ingest PDFs, lecture notes, textbook chapters, or handwritten notes with source-grounded verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Document Switcher */}
          <select
            value={activeMaterial.id}
            onChange={(e) => {
              const found = materials.find((m) => m.id === e.target.value);
              if (found) {
                setActiveMaterial(found);
                onSelectMaterial(found);
              }
            }}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-indigo-500"
          >
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>

          {/* Upload Button */}
          <label className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer transition shadow-md shadow-indigo-600/20">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Material</span>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.txt,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Camera / Scan Button */}
          <button
            onClick={() => {
              setActiveSubTab('multimodal');
              setVisionImage(sampleDiagramUrl);
              handleRunVisionAnalysis();
            }}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700 transition"
          >
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Scan Handwritten Note</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: '1. Structured Knowledge & Verification', icon: <Layers className="w-4 h-4" /> },
          { id: 'multimodal', label: '2. Multimodal Vision ("Explain This")', icon: <Camera className="w-4 h-4" /> },
          { id: 'explain_differently', label: '3. "Explain It Differently" (8 Modes)', icon: <Sliders className="w-4 h-4" /> },
          { id: 'study_pack', label: '4. AI Auto-Generated Study Pack', icon: <BookOpen className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeSubTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SUBTAB 1: STRUCTURED KNOWLEDGE & SOURCE VERIFICATION */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content & Synthesis */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title & Speech Header */}
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-bold">
                    Ingested Document
                  </span>
                  <span className="text-slate-400 text-xs">• Uploaded {activeMaterial.uploadedAt}</span>
                </div>

                <button
                  onClick={() => handleToggleSpeak(activeMaterial.summary)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition font-medium ${
                    isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{isSpeaking ? 'Pause Narration' : 'Narrate Summary'}</span>
                </button>
              </div>

              <h3 className="text-xl font-black text-white tracking-tight mb-2">
                {activeMaterial.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                {activeMaterial.summary}
              </p>

              {/* Strict Source vs AI Interpretation Labels (Prompt Requirement 2 & 27) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                {/* Source-Derived Box */}
                <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="tracking-wide">SOURCE VERIFIED FACTS</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-xs">
                    {activeMaterial.sourceVerifiedInfo.map((info, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Interpretation Box */}
                <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="tracking-wide">AI COGNITIVE INTERPRETATION</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-xs">
                    {activeMaterial.aiInterpretation.map((info, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Concepts List */}
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Extracted Concepts & Pedagogical Hierarchy
              </h4>

              <div className="space-y-2.5">
                {activeMaterial.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-100 text-xs sm:text-sm">{concept.name}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            concept.importance === 'Core'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {concept.importance}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{concept.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        setDiffConcept(concept.name);
                        setActiveSubTab('explain_differently');
                        handleExplainDifferently('visual');
                      }}
                      className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-semibold flex items-center gap-1 transition"
                      title="Explain Differently"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Formulas, Definitions, & Prerequisite Chain */}
          <div className="space-y-5">
            {/* Formulas & Governing Equations */}
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 text-slate-300 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Governing Formulas
              </h4>
              <div className="space-y-3">
                {activeMaterial.formulas.map((f, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-300 block mb-1">{f.name}</span>
                    <div className="font-mono text-indigo-300 text-xs bg-slate-950 p-2 rounded-lg border border-slate-800/80 mb-1.5 overflow-x-auto">
                      {f.formula}
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight">{f.variables}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites Chain */}
            <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 text-slate-300 flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-sky-400" /> Prerequisite Concepts
              </h4>
              <p className="text-slate-400 text-xs mb-3">
                To master this material without friction, ensure solid recall of:
              </p>
              <div className="space-y-1.5">
                {activeMaterial.prerequisites.map((prereq, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{prereq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MULTIMODAL COMPUTER VISION ("EXPLAIN THIS") */}
      {activeSubTab === 'multimodal' && (
        <div className="space-y-5">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-indigo-400" />
                  Multimodal Computer Vision Learning Engine
                </h3>
                <p className="text-slate-400 text-xs">
                  Upload scientific diagrams, handwritten formulas, engineering circuits, or textbook photos and ask: <strong className="text-indigo-300">"Explain this."</strong>
                </p>
              </div>

              {/* Sample Presets */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setVisionImage(sampleDiagramUrl);
                    setVisionPrompt('Explain this photosynthesis light reaction and electron flow.');
                    handleRunVisionAnalysis();
                  }}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  Load Photosynthesis Sample
                </button>
                <button
                  onClick={() => {
                    setVisionImage('https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80');
                    setVisionPrompt('Explain the CPU silicon architecture and bus registers in this diagram.');
                    handleRunVisionAnalysis();
                  }}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  Load CPU Architecture Sample
                </button>
              </div>
            </div>

            {/* Input / Image Preview & Question Prompt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Image Preview Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden min-h-[220px] flex items-center justify-center relative">
                {visionImage ? (
                  <img
                    src={visionImage}
                    alt="Diagram to analyze"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="p-8 text-center">
                    <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-400 text-xs">No diagram uploaded yet. Click above or select a preset.</p>
                  </div>
                )}
                {isAnalyzingVision && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-indigo-400 text-xs font-semibold">
                    <RefreshCw className="w-6 h-6 animate-spin text-indigo-500" />
                    <span>Analyzing diagram with Gemini Computer Vision & OCR...</span>
                  </div>
                )}
              </div>

              {/* Prompt Controls */}
              <div className="flex flex-col justify-between space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Your Question / Prompt to AI Vision Engine:
                  </label>
                  <textarea
                    value={visionPrompt}
                    onChange={(e) => setVisionPrompt(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                    placeholder="e.g. Explain this diagram, list its components, and show real-world applications."
                  />
                </div>

                <button
                  onClick={() => handleRunVisionAnalysis()}
                  disabled={isAnalyzingVision}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explain This Diagram (Multimodal AI)</span>
                </button>
              </div>
            </div>

            {/* Vision Results Section (Prompt Section 3 Requirement) */}
            {visionResult && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Vision Analysis Complete ({Math.round(visionResult.confidenceScore * 100)}% Confidence)
                  </span>
                  <button
                    onClick={() => handleToggleSpeak(visionResult.simplifiedExplanation)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen to Audio Explanation
                  </button>
                </div>

                {/* Detected Type & OCR Text */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">OCR Transcribed Text & Symbols</span>
                  <p className="font-mono text-xs text-indigo-300 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                    {visionResult.ocrText}
                  </p>
                </div>

                {/* Simplified Explanation */}
                <div className="bg-indigo-950/20 border border-indigo-800/40 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-indigo-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Intuitive Simplified Mental Model
                  </h4>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {visionResult.simplifiedExplanation}
                  </p>
                </div>

                {/* Step by Step Explanation */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-white mb-3">Step-by-Step Flow & Mechanism</h4>
                  <div className="space-y-2">
                    {visionResult.stepByStepExplanation?.map((st: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 text-xs p-2.5 rounded-lg bg-slate-850 border border-slate-800">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {st.step || i + 1}
                        </span>
                        <div>
                          <strong className="text-slate-100 block mb-0.5">{st.heading}</strong>
                          <span className="text-slate-400 leading-relaxed">{st.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Components & Relationships Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-white mb-2">Identified Components</h4>
                    <div className="space-y-1.5">
                      {visionResult.components?.map((c: any, idx: number) => (
                        <div key={idx} className="text-xs p-2 rounded bg-slate-850 border border-slate-800/60">
                          <span className="font-semibold text-indigo-300">{c.name}:</span>{' '}
                          <span className="text-slate-300">{c.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-white mb-2">Real-World Engineering Applications</h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {visionResult.realWorldApplications?.map((app: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 3: "EXPLAIN IT DIFFERENTLY" (8 MODES) */}
      {activeSubTab === 'explain_differently' && (
        <div className="space-y-5">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                "Explain It Differently" Engine
              </h3>
              <p className="text-slate-400 text-xs">
                Don't understand the first explanation? Switch cognitive paradigms instantly across 8 tailored learning styles.
              </p>
            </div>

            {/* Concept Input Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-5">
              <input
                type="text"
                value={diffConcept}
                onChange={(e) => setDiffConcept(e.target.value)}
                placeholder="Enter any concept to explain differently..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              />
              <button
                onClick={() => handleExplainDifferently(diffMode)}
                disabled={isLoadingDiff}
                className="w-full sm:w-auto shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-md shadow-indigo-600/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDiff ? 'animate-spin' : ''}`} />
                <span>Explain</span>
              </button>
            </div>

            {/* 8 Mode Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {explanationModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleExplainDifferently(m.id)}
                  className={`p-3 rounded-xl text-left border transition ${
                    diffMode === m.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs mb-0.5 flex items-center justify-between">
                    <span>{m.label}</span>
                    {diffMode === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <span className="text-[10px] text-slate-400 block leading-tight">{m.desc}</span>
                </button>
              ))}
            </div>

            {/* Explanation Result Output */}
            {isLoadingDiff ? (
              <div className="p-12 text-center text-indigo-400">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-xs font-semibold">Generating tailored {diffMode.replace('_', ' ')} explanation...</p>
              </div>
            ) : diffResult ? (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-bold">
                      {diffResult.mode?.replace('_', ' ')}
                    </span>
                    <h4 className="text-base font-black text-white mt-1">{diffResult.headline}</h4>
                  </div>

                  <button
                    onClick={() => handleToggleSpeak(`${diffResult.headline}. ${diffResult.explanation}`)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition"
                    title="Narrate"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Mental Model Hook / Analogy */}
                {diffResult.analogyOrHook && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
                    <strong className="text-amber-300 block mb-1">Core Mental Model Anchor:</strong>
                    {diffResult.analogyOrHook}
                  </div>
                )}

                {/* Formatted Explanation */}
                <div className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-2">
                  {diffResult.explanation}
                </div>

                {/* Key Takeaways */}
                {diffResult.keyTakeaways && (
                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-300 block mb-2">Essential Takeaways:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {diffResult.keyTakeaways.map((t: string, i: number) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-850 border border-slate-800 text-xs text-slate-300">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                Select an explanation mode above to synthesize an alternative perspective.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 4: AI AUTO-GENERATED STUDY PACK */}
      {activeSubTab === 'study_pack' && (
        <div className="space-y-5">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  AI Study Material Pack
                </h3>
                <p className="text-slate-400 text-xs">
                  Automatically generated from your uploaded notes: Interactive Flashcards, Definitions, and Exam Questions.
                </p>
              </div>
            </div>

            {/* Interactive Flashcard 3D Flipper */}
            {activeMaterial.flashcards.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">
                    Flashcard {activeCardIndex + 1} of {activeMaterial.flashcards.length}
                  </span>
                  <span>Click card to flip</span>
                </div>

                <div
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className={`cursor-pointer min-h-[160px] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border shadow-lg ${
                    isCardFlipped
                      ? 'bg-gradient-to-br from-indigo-900/60 to-slate-900 border-indigo-500/60'
                      : 'bg-slate-900 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-2">
                    {isCardFlipped ? 'ANSWER' : 'QUESTION'}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-white max-w-lg leading-relaxed">
                    {isCardFlipped
                      ? activeMaterial.flashcards[activeCardIndex]?.back
                      : activeMaterial.flashcards[activeCardIndex]?.front}
                  </p>
                  <span className="text-[11px] text-slate-500 mt-4">
                    {isCardFlipped ? 'Tap to see question again' : 'Tap to reveal answer'}
                  </span>
                </div>

                {/* Next / Prev Controls */}
                <div className="flex items-center justify-center gap-3 mt-3">
                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : activeMaterial.flashcards.length - 1));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      setIsCardFlipped(false);
                      setActiveCardIndex((prev) => (prev < activeMaterial.flashcards.length - 1 ? prev + 1 : 0));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold shadow"
                  >
                    Next Flashcard
                  </button>
                </div>
              </div>
            )}

            {/* Definitions & Formula Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Key Definitions</h4>
                <div className="space-y-2">
                  {activeMaterial.definitions.map((def, i) => (
                    <div key={i} className="text-xs p-2.5 rounded-lg bg-slate-850 border border-slate-800">
                      <span className="font-bold text-indigo-300 block mb-0.5">{def.term}</span>
                      <span className="text-slate-300">{def.definition}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">Formula Quick-Sheet</h4>
                <div className="space-y-2">
                  {activeMaterial.formulas.map((f, i) => (
                    <div key={i} className="text-xs p-2.5 rounded-lg bg-slate-850 border border-slate-800">
                      <span className="font-bold text-white block mb-0.5">{f.name}</span>
                      <div className="font-mono text-indigo-300 text-xs bg-slate-950 p-1.5 rounded mb-1">
                        {f.formula}
                      </div>
                      <span className="text-[10px] text-slate-400">{f.variables}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
