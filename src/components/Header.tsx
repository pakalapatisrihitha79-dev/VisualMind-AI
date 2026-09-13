import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  Volume2,
  VolumeX,
  Type,
  Globe,
  Sun,
  Moon,
  ShieldCheck,
  Brain,
  Coffee,
  Lightbulb,
  Wifi,
  Sliders,
  Grid,
  CheckCircle2,
  User,
  Lock,
  Edit3,
  LogOut,
  Users,
  ChevronDown
} from 'lucide-react';
import { StudentProfile, AccessibilityConfig } from '../types';

interface HeaderProps {
  profile: StudentProfile;
  accessibility: AccessibilityConfig;
  setAccessibility: React.Dispatch<React.SetStateAction<AccessibilityConfig>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExtendedModal: (section?: string) => void;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onOpenEditProfileModal?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  accessibility,
  setAccessibility,
  activeTab,
  setActiveTab,
  onOpenExtendedModal,
  onOpenAuthModal,
  onOpenEditProfileModal,
  onLogout,
}) => {
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showCognitiveMenu, setShowCognitiveMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const cognitiveIcons = {
    optimal: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
    focused: <Zap className="w-3.5 h-3.5 text-amber-400" />,
    confused: <Lightbulb className="w-3.5 h-3.5 text-sky-400" />,
    fatigued: <Coffee className="w-3.5 h-3.5 text-rose-400" />,
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'Telugu (తెలుగు)' },
    { code: 'hi', label: 'Hindi (हिन्दी)' },
    { code: 'es', label: 'Spanish (Español)' },
    { code: 'fr', label: 'French (Français)' },
    { code: 'de', label: 'German (Deutsch)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner: Verification & System Status */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 px-4 py-1 text-xs border-b border-indigo-900/40 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-indigo-300">VisualMind AI</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> RAG-Grounded & Multimodal
          </span>
          <span className="hidden md:inline bg-indigo-900/60 text-indigo-200 px-1.5 py-0.5 rounded text-[10px] font-mono">
            gemini-3.8-flash
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Cognitive State Indicator */}
          <div className="relative">
            <button
              onClick={() => setShowCognitiveMenu(!showCognitiveMenu)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 transition border border-slate-700 text-[11px]"
              title="AI Cognitive State Monitor"
            >
              {cognitiveIcons[profile.cognitiveState]}
              <span className="capitalize text-slate-200">{profile.cognitiveState}</span>
            </button>

            {showCognitiveMenu && (
              <div className="absolute right-0 mt-1.5 w-60 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs">
                <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-indigo-400" /> Cognitive & Fatigue State
                </p>
                <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
                  AI tracks micro-pauses, error rates, and reading speed to recommend breaks or adaptive analogies.
                </p>
                <div className="space-y-1">
                  {(['optimal', 'focused', 'confused', 'fatigued'] as const).map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        profile.cognitiveState = state;
                        setShowCognitiveMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between text-xs ${
                        profile.cognitiveState === state ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2 capitalize">
                        {cognitiveIcons[state]} {state}
                      </span>
                      {profile.cognitiveState === state && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Offline Sync Status */}
          <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40">
            <Wifi className="w-3 h-3" /> Offline Synced
          </span>

          {/* Extended Features Launcher */}
          <button
            onClick={() => onOpenExtendedModal()}
            className="flex items-center gap-1 text-[11px] bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-0.5 rounded-md font-medium transition shadow-sm"
          >
            <Grid className="w-3 h-3" /> Extended Suite
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand & Mission */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl">
            V
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-white tracking-tight">VisualMind</h1>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                Companion
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Learn Visually. Understand Deeply.</p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/70 p-1 rounded-xl border border-slate-700/60">
          {[
            { id: 'home', label: 'HOME' },
            { id: 'learn', label: 'LEARN' },
            { id: 'visual_lab', label: 'VISUAL LAB' },
            { id: 'assess', label: 'ASSESS' },
            { id: 'ai_tutor', label: 'AI TUTOR' },
            { id: 'progress', label: 'PROGRESS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Stats & Accessibility Controls */}
        <div className="flex items-center gap-3">
          {/* Streaks & XP */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/70 text-xs">
            <span className="flex items-center gap-1 font-bold text-amber-400" title="Day Streak">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              {profile.streakDays}d
            </span>
            <span className="text-slate-600">|</span>
            <span className="font-semibold text-indigo-300 text-[11px]">{profile.xpPoints} XP</span>
          </div>

          {/* Accessibility Settings Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowAccessMenu(!showAccessMenu)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
              title="Accessibility & Multilingual Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {showAccessMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                  <span className="font-bold text-slate-100 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-indigo-400" /> Accessibility & Speech
                  </span>
                  <span className="text-[10px] text-slate-400">WCAG AA</span>
                </div>

                <div className="space-y-3">
                  {/* Dyslexia Font */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-200 font-medium block">Dyslexia-Friendly Font</span>
                      <span className="text-[10px] text-slate-400">High-legibility Lexend typeface</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={accessibility.fontDyslexic}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setAccessibility((prev) => ({ ...prev, fontDyslexic: checked }));
                        if (checked) {
                          document.body.classList.add('font-dyslexic');
                        } else {
                          document.body.classList.remove('font-dyslexic');
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 rounded bg-slate-700 border-slate-600 focus:ring-indigo-500"
                    />
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-200 font-medium block">High Contrast Mode</span>
                      <span className="text-[10px] text-slate-400">Sharpen borders & text contrast</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={accessibility.highContrast}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setAccessibility((prev) => ({ ...prev, highContrast: checked }));
                        if (checked) {
                          document.body.classList.add('high-contrast');
                        } else {
                          document.body.classList.remove('high-contrast');
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 rounded bg-slate-700 border-slate-600 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Font Scale */}
                  <div>
                    <span className="text-slate-200 font-medium block mb-1">Font Scaling</span>
                    <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg">
                      {(['normal', 'large', 'extra-large'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setAccessibility((prev) => ({ ...prev, fontSize: size }))}
                          className={`py-1 text-[11px] rounded capitalize ${
                            accessibility.fontSize === size ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {size.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Multilingual Voice / Language */}
                  <div>
                    <span className="text-slate-200 font-medium flex items-center gap-1 mb-1">
                      <Globe className="w-3.5 h-3.5 text-indigo-400" /> Language Explanations
                    </span>
                    <select
                      value={accessibility.language}
                      onChange={(e) => setAccessibility((prev) => ({ ...prev, language: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Speech Narration Speed */}
                  <div>
                    <div className="flex items-center justify-between text-slate-200 font-medium mb-1">
                      <span>Narration Speed: {accessibility.speechSpeed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.75"
                      max="1.5"
                      step="0.25"
                      value={accessibility.speechSpeed}
                      onChange={(e) => setAccessibility((prev) => ({ ...prev, speechSpeed: parseFloat(e.target.value) }))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition group text-left"
              title="User Account & Profile Menu"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/60 group-hover:ring-indigo-400 transition"
              />
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-white leading-tight max-w-[110px] truncate">
                  {profile.name}
                </span>
                <span className="block text-[10px] text-indigo-300 truncate max-w-[110px]">
                  {profile.email || 'Student'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-850 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                {/* Profile Snapshot */}
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800 mb-2.5">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500"
                  />
                  <div className="overflow-hidden">
                    <span className="font-bold text-white text-xs block truncate">{profile.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate font-mono">{profile.email}</span>
                    <span className="text-[10px] text-indigo-400 font-semibold block truncate mt-0.5">
                      {profile.gradeLevel}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  {onOpenEditProfileModal && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenEditProfileModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-indigo-600 hover:text-white transition flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                      <span>Edit / Add Profile Details</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setActiveTab('progress');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-750 transition flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>Digital Twin & Knowledge Graph</span>
                  </button>

                  <div className="my-1 border-t border-slate-800" />

                  {onOpenAuthModal && (
                    <>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onOpenAuthModal('signup');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-750 transition flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Create Another Student Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onOpenAuthModal('signin');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-750 transition flex items-center gap-2"
                      >
                        <Users className="w-4 h-4 text-sky-400" />
                        <span>Switch Account / Sign In</span>
                      </button>
                    </>
                  )}

                  {onLogout && (
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:bg-rose-950/60 hover:text-rose-200 transition flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-950/90 border-t border-slate-800 py-1.5 px-2">
        {[
          { id: 'home', label: 'HOME' },
          { id: 'learn', label: 'LEARN' },
          { id: 'visual_lab', label: 'LAB' },
          { id: 'assess', label: 'ASSESS' },
          { id: 'ai_tutor', label: 'TUTOR' },
          { id: 'progress', label: 'PROFILE' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
              activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
