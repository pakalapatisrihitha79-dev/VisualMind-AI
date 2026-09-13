import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  GraduationCap,
  Calendar,
  Clock,
  Brain,
  Sparkles,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Save,
  LogOut,
  Users,
  Eye,
  EyeOff,
  Target,
  BookOpen,
  Award
} from 'lucide-react';
import { StudentProfile, MistakeLog } from '../types';
import { AVATAR_PRESETS, saveUserProfile } from '../services/authStorage';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onProfileUpdated: (updatedProfile: StudentProfile) => void;
  onSwitchAccount: () => void;
  onLogout: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileUpdated,
  onSwitchAccount,
  onLogout,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'concepts' | 'mistakes' | 'goals'>('details');

  // Basic Details State
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email || '');
  const [password, setPassword] = useState(profile.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(profile.gradeLevel);
  const [institution, setInstitution] = useState(profile.institution || '');
  const [targetExam, setTargetExam] = useState(profile.targetExam);
  const [examDate, setExamDate] = useState(profile.examDate);
  const [studyGoalHours, setStudyGoalHours] = useState(profile.studyGoalHoursPerDay);
  const [preferredStyle, setPreferredStyle] = useState(profile.preferredStyle);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [customAvatar, setCustomAvatar] = useState('');
  const [bio, setBio] = useState(profile.bio || '');

  // Lists State
  const [strongConcepts, setStrongConcepts] = useState<string[]>(profile.strongConcepts || []);
  const [weakConcepts, setWeakConcepts] = useState<string[]>(profile.weakConcepts || []);
  const [primarySubjects, setPrimarySubjects] = useState<string[]>(profile.primarySubjects || []);
  const [learningGoals, setLearningGoals] = useState<string[]>(profile.learningGoals || []);
  const [mistakeMemory, setMistakeMemory] = useState<MistakeLog[]>(profile.mistakeMemory || []);

  // Quick Add Inputs
  const [newStrongConcept, setNewStrongConcept] = useState('');
  const [newWeakConcept, setNewWeakConcept] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newGoal, setNewGoal] = useState('');

  // Add Mistake Log Form
  const [newMistakeTopic, setNewMistakeTopic] = useState('');
  const [newMistakeConcept, setNewMistakeConcept] = useState('');
  const [newMistakePattern, setNewMistakePattern] = useState('');
  const [newMistakeRemedy, setNewMistakeRemedy] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Save
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const updated: StudentProfile = {
      ...profile,
      name: name.trim() || profile.name,
      email: email.trim() || profile.email,
      password: password || profile.password,
      gradeLevel,
      institution: institution.trim(),
      targetExam,
      examDate,
      studyGoalHoursPerDay: studyGoalHours,
      preferredStyle,
      avatar: customAvatar.trim() || avatar,
      bio: bio.trim(),
      strongConcepts,
      weakConcepts,
      primarySubjects,
      learningGoals,
      mistakeMemory,
    };

    saveUserProfile(updated);
    onProfileUpdated(updated);
    setToastMessage('Profile details saved successfully!');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 600);
  };

  // Add item helpers
  const handleAddStrongConcept = () => {
    if (!newStrongConcept.trim()) return;
    setStrongConcepts((prev) => [...prev, newStrongConcept.trim()]);
    setNewStrongConcept('');
  };

  const handleRemoveStrongConcept = (idx: number) => {
    setStrongConcepts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddWeakConcept = () => {
    if (!newWeakConcept.trim()) return;
    setWeakConcepts((prev) => [...prev, newWeakConcept.trim()]);
    setNewWeakConcept('');
  };

  const handleRemoveWeakConcept = (idx: number) => {
    setWeakConcepts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    setPrimarySubjects((prev) => [...prev, newSubject.trim()]);
    setNewSubject('');
  };

  const handleRemoveSubject = (idx: number) => {
    setPrimarySubjects((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;
    setLearningGoals((prev) => [...prev, newGoal.trim()]);
    setNewGoal('');
  };

  const handleRemoveGoal = (idx: number) => {
    setLearningGoals((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddMistake = () => {
    if (!newMistakeConcept.trim() || !newMistakePattern.trim()) return;
    const newLog: MistakeLog = {
      id: `m_custom_${Date.now()}`,
      topic: newMistakeTopic.trim() || 'General STEM',
      concept: newMistakeConcept.trim(),
      mistakePattern: newMistakePattern.trim(),
      frequency: 1,
      remedyAction: newMistakeRemedy.trim() || 'Review foundational concept diagram and test with visual simulation',
      lastOccurred: 'Just added',
    };
    setMistakeMemory((prev) => [newLog, ...prev]);
    setNewMistakeTopic('');
    setNewMistakeConcept('');
    setNewMistakePattern('');
    setNewMistakeRemedy('');
  };

  const handleRemoveMistake = (id: string) => {
    setMistakeMemory((prev) => prev.filter((m) => m.id !== id));
  };

  // Calculate days remaining to exam
  const examDaysLeft = Math.ceil(
    (new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={customAvatar || avatar}
              alt={name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500"
            />
            <div>
              <h3 className="font-bold text-white text-base leading-tight">Edit & Add Profile Details</h3>
              <p className="text-slate-400 text-xs">
                Customize your credentials, academic goals, syllabus topics, and Mistake Memory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave()}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 py-1.5 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'details', label: '1. Identity & Credentials', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'concepts', label: '2. Strong & Weak Concepts', icon: <Brain className="w-3.5 h-3.5" /> },
            { id: 'mistakes', label: `3. Mistake Memory (${mistakeMemory.length})`, icon: <AlertTriangle className="w-3.5 h-3.5" /> },
            { id: 'goals', label: '4. Goals & Exam Target', icon: <Target className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mx-6 mt-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300">
          {/* ================= SUBTAB 1: DETAILS & CREDENTIALS ================= */}
          {activeSubTab === 'details' && (
            <div className="space-y-4">
              {/* Account Credentials */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> Account & Login Credentials
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address (Login)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Update your password"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 pr-9 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Academic Stage & Institution */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400" /> Academic Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Academic Grade / Level</label>
                    <input
                      type="text"
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Institution / School</label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. State University, IIT, High School"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Personal Bio / Focus Statement</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Avatar & Visual Persona
                </h4>

                <div className="flex flex-wrap gap-2.5 items-center">
                  {AVATAR_PRESETS.map((av) => (
                    <img
                      key={av.id}
                      src={av.url}
                      alt={av.label}
                      onClick={() => {
                        setAvatar(av.url);
                        setCustomAvatar('');
                      }}
                      className={`w-11 h-11 rounded-xl object-cover cursor-pointer transition ${
                        avatar === av.url && !customAvatar
                          ? 'ring-2 ring-indigo-400 scale-110 shadow-lg shadow-indigo-500/30'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      title={av.label}
                    />
                  ))}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Or enter custom avatar image URL:</label>
                  <input
                    type="url"
                    value={customAvatar}
                    onChange={(e) => setCustomAvatar(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Account Management & Logout */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchAccount();
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center gap-1.5 transition font-semibold"
                  >
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Switch Profile / Add Another User</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 rounded-xl flex items-center gap-1.5 transition font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= SUBTAB 2: CONCEPTS & SUBJECTS ================= */}
          {activeSubTab === 'concepts' && (
            <div className="space-y-4">
              {/* Primary Subjects */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Primary Syllabus Subjects
                  </h4>
                  <span className="text-[10px] text-slate-400">{primarySubjects.length} subjects</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {primarySubjects.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-200 border border-indigo-700/60 flex items-center gap-1.5"
                    >
                      <span>{sub}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(i)}
                        className="hover:text-rose-400 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                    placeholder="Add new subject (e.g. Organic Chemistry, Algorithms)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubject}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Strong Concepts */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strong Core Concepts (Mastered)
                  </h4>
                  <span className="text-[10px] text-slate-400">{strongConcepts.length} concepts</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {strongConcepts.map((c, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStrongConcept(i)}
                        className="hover:text-rose-400 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStrongConcept}
                    onChange={(e) => setNewStrongConcept(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStrongConcept())}
                    placeholder="Add mastered concept (e.g. Kirchhoff's Current Law)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddStrongConcept}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Weak Concepts / Gaps */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-rose-400 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> High-Priority Knowledge Gaps
                  </h4>
                  <span className="text-[10px] text-slate-400">{weakConcepts.length} friction areas</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {weakConcepts.map((w, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-rose-950/50 text-rose-300 border border-rose-800/60 flex items-center gap-1.5"
                    >
                      <span>{w}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveWeakConcept(i)}
                        className="hover:text-rose-200 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newWeakConcept}
                    onChange={(e) => setNewWeakConcept(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddWeakConcept())}
                    placeholder="Add concept needing repair (e.g. Multivariable Chain Rule)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddWeakConcept}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Gap
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= SUBTAB 3: MISTAKE MEMORY ================= */}
          {activeSubTab === 'mistakes' && (
            <div className="space-y-4">
              {/* Add New Mistake Log Form */}
              <div className="bg-slate-850 border border-rose-900/40 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-rose-400" /> Log a New Recurring Mistake or Error Trap
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Subject / Topic</label>
                    <input
                      type="text"
                      value={newMistakeTopic}
                      onChange={(e) => setNewMistakeTopic(e.target.value)}
                      placeholder="e.g. Calculus III, Digital Logic"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Specific Concept</label>
                    <input
                      type="text"
                      value={newMistakeConcept}
                      onChange={(e) => setNewMistakeConcept(e.target.value)}
                      placeholder="e.g. Multivariable Chain Rule branch"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Mistake Pattern / Conceptual Trap</label>
                  <input
                    type="text"
                    value={newMistakePattern}
                    onChange={(e) => setNewMistakePattern(e.target.value)}
                    placeholder="e.g. Forgetting to sum both x(t) and y(t) partial branches"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">AI Remedial Rule / Mental Model</label>
                  <input
                    type="text"
                    value={newMistakeRemedy}
                    onChange={(e) => setNewMistakeRemedy(e.target.value)}
                    placeholder="e.g. Draw dependency tree first before writing derivatives"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddMistake}
                  disabled={!newMistakeConcept.trim() || !newMistakePattern.trim()}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded-xl font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert into Mistake Memory</span>
                </button>
              </div>

              {/* Existing Mistake Logs */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-300 text-xs">Logged Conceptual Traps ({mistakeMemory.length})</h5>
                {mistakeMemory.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded">
                          {m.topic}
                        </span>
                        <span className="font-bold text-white text-xs">{m.concept}</span>
                        <span className="text-rose-400 text-[10px] font-mono font-bold">Freq: {m.frequency}x</span>
                      </div>
                      <p className="text-slate-300 text-xs">{m.mistakePattern}</p>
                      <p className="text-[11px] text-emerald-400">
                        <strong>Remedy:</strong> {m.remedyAction}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMistake(m.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SUBTAB 4: GOALS & EXAM ================= */}
          {activeSubTab === 'goals' && (
            <div className="space-y-4">
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-400" /> Target Exam Schedule
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target Exam Name</label>
                    <input
                      type="text"
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Exam Date ({examDaysLeft > 0 ? `${examDaysLeft} days remaining` : 'Target date passed'})
                    </label>
                    <input
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Daily Study Hours Slider */}
                <div>
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="font-medium">Daily Study Goal Target:</span>
                    <span className="font-bold text-indigo-300">{studyGoalHours} Hours / Day</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8.0"
                    step="0.5"
                    value={studyGoalHours}
                    onChange={(e) => setStudyGoalHours(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              {/* Specific Milestones & Goals */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Milestones & Study Targets
                  </h4>
                  <span className="text-[10px] text-slate-400">{learningGoals.length} goals</span>
                </div>

                <div className="space-y-1.5">
                  {learningGoals.map((g, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-200 text-xs">• {g}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal(i)}
                        className="text-slate-500 hover:text-rose-400 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGoal())}
                    placeholder="Add personal milestone (e.g. Complete 50 practice derivatives)..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddGoal}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Account: <strong className="text-slate-200">{email}</strong>
          </span>
          <button
            onClick={() => handleSave()}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply All Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
