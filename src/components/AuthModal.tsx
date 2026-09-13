import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  Calendar,
  Clock,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Brain,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { StudentProfile } from '../types';
import {
  AVATAR_PRESETS,
  getStoredUsers,
  loginUser,
  registerNewUser,
  RegisterProfileInput,
} from '../services/authStorage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (profile: StudentProfile) => void;
  initialMode?: 'signin' | 'signup';
  canDismiss?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'signup',
  canDismiss = true,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up / Profile Creation State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Undergraduate Engineering / STEM');
  const [institution, setInstitution] = useState('');
  const [targetExam, setTargetExam] = useState('Advanced Calculus & STEM Finals');
  const [examDate, setExamDate] = useState(
    new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [studyGoalHours, setStudyGoalHours] = useState(3.0);
  const [preferredStyle, setPreferredStyle] = useState<'visual' | 'socratic' | 'step_by_step' | 'real_world'>('visual');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [bio, setBio] = useState('Aiming to master foundational STEM concepts through visual 3D simulation and Socratic problem solving.');
  const [primarySubjectsInput, setPrimarySubjectsInput] = useState('Calculus III, Computer Architecture, Physics, Biochemistry');
  const [weakConceptsInput, setWeakConceptsInput] = useState('Partial Derivative Chain Rule, Limits & Continuity');
  const [strongConceptsInput, setStrongConceptsInput] = useState('Vector Calculus Basics, Logic Gates, Classical Mechanics');

  if (!isOpen) return null;

  const storedUsers = getStoredUsers();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signInEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }

    const res = loginUser(signInEmail, signInPassword);
    if (!res.success || !res.user) {
      setError(res.error || 'Failed to sign in. Please verify your email and password.');
      return;
    }

    setSuccessNotice(`Welcome back, ${res.user.name}!`);
    setTimeout(() => {
      onAuthSuccess(res.user!);
      onClose();
    }, 600);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setError('Please choose a password with at least 4 characters.');
      return;
    }

    const primarySubjects = primarySubjectsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const weakConcepts = weakConceptsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const strongConcepts = strongConceptsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const inputData: RegisterProfileInput = {
      name: fullName.trim(),
      email: email.trim(),
      password,
      gradeLevel,
      institution: institution.trim() || 'University / Academy',
      targetExam,
      examDate,
      studyGoalHoursPerDay: Number(studyGoalHours),
      preferredStyle,
      avatar: customAvatarUrl.trim() || selectedAvatar,
      bio: bio.trim(),
      primarySubjects: primarySubjects.length > 0 ? primarySubjects : ['Calculus', 'Physics'],
      weakConcepts: weakConcepts.length > 0 ? weakConcepts : ['Multivariable Differentiation'],
      strongConcepts: strongConcepts.length > 0 ? strongConcepts : ['Coordinate Geometry'],
      learningGoals: [
        `Score top marks in ${targetExam}`,
        `Dedicate ${studyGoalHours} hours/day with visual focus`,
        `Repair knowledge gaps with Socratic inquiry`
      ]
    };

    const newProfile = registerNewUser(inputData);
    setSuccessNotice(`Welcome to VisualMind, ${newProfile.name}! Your tailored learning profile is ready.`);
    setTimeout(() => {
      onAuthSuccess(newProfile);
      onClose();
    }, 700);
  };

  const handleFillDemo = () => {
    setSignInEmail('sarah.chen@university.edu');
    setSignInPassword('Student123!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold text-base shadow-md shadow-indigo-600/30">
              V
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">
                {mode === 'signup' ? 'Create Student Profile & Start' : 'Student Sign In'}
              </h3>
              <p className="text-slate-400 text-xs">
                {mode === 'signup'
                  ? 'Enter your credentials and academic details to tailor your AI learning companion.'
                  : 'Access your personalized digital twin, notes, and study trajectory.'}
              </p>
            </div>
          </div>

          {canDismiss && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create New Profile (Full Setup)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'signin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In (Existing Profile)</span>
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successNotice && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300">
          {/* ======================= SIGN IN FORM ======================= */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 max-w-md mx-auto py-2">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="e.g. your.email@example.com"
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-850 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In & Open Profile</span>
                </button>

                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fill Demo Account (Sarah Chen)</span>
                </button>
              </div>

              {/* Saved accounts list */}
              {storedUsers.length > 0 && (
                <div className="pt-4 border-t border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                    Or choose from registered profiles on this browser:
                  </span>
                  <div className="space-y-1.5">
                    {storedUsers.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setSignInEmail(u.email);
                          setSignInPassword(u.password || '');
                        }}
                        className="p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 flex items-center justify-between cursor-pointer transition group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-white text-xs block group-hover:text-indigo-300 transition">
                              {u.name}
                            </span>
                            <span className="text-[10px] text-slate-400">{u.email}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-indigo-400 font-semibold group-hover:underline">
                          Select & Autofill
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          )}

          {/* ======================= SIGN UP / PROFILE SETUP FORM ======================= */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Step 1: Account Credentials */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs pb-1 border-b border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Step 1: Account Credentials</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Srihitha Pakalapati"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. pakalapatisrihitha928@gmail.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Password <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password (min 4 characters)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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

              {/* Step 2: Academic Profile & Target Exam */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs pb-1 border-b border-slate-800">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Step 2: Academic Stage & Target Exam</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Academic Grade / Stage</label>
                    <select
                      value={gradeLevel}
                      onChange={(e) => setGradeLevel(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="High School Junior / Senior">High School Junior / Senior</option>
                      <option value="AP / IB STEM Scholar">AP / IB STEM Scholar</option>
                      <option value="Undergraduate Engineering / STEM">Undergraduate Engineering / STEM</option>
                      <option value="College Sophomore / Pre-Med">College Sophomore / Pre-Med</option>
                      <option value="Graduate / Competitive Exam">Graduate / Competitive Exam</option>
                      <option value="Self-Directed Lifelong Learner">Self-Directed Lifelong Learner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">School / University / Academy</label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Engineering Institute / State High"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target Exam or Goal</label>
                    <input
                      type="text"
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value)}
                      placeholder="e.g. STEM Finals, JEE, MCAT, GRE"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Target Exam Date</label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Daily Study Goal Slider */}
                <div>
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" /> Daily Study Goal:
                    </span>
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
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>30m Light</span>
                    <span>2.5h Standard</span>
                    <span>5h+ Intensive</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Learning Style & Syllabus Focus */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs pb-1 border-b border-slate-800">
                  <Brain className="w-4 h-4 text-sky-400" />
                  <span>Step 3: Learning Style & Syllabus Topics</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Preferred AI Explanation Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'visual', label: '3D Visual & Interactive', desc: 'Dynamic SVG, charts & trees' },
                      { id: 'socratic', label: 'Socratic Guiding', desc: 'Guided questions & hints' },
                      { id: 'step_by_step', label: 'Step-by-Step Rigor', desc: 'Mathematical derivations' },
                      { id: 'real_world', label: 'Real-World Analogies', desc: 'Engineering metaphors' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setPreferredStyle(st.id as any)}
                        className={`p-2 rounded-xl border text-left transition ${
                          preferredStyle === st.id
                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                            : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="font-bold text-[11px] block">{st.label}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">{st.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Primary Subjects of Interest (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={primarySubjectsInput}
                    onChange={(e) => setPrimarySubjectsInput(e.target.value)}
                    placeholder="e.g. Calculus III, Computer Architecture, Physics"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Known Weak Areas / Gaps to Target
                    </label>
                    <input
                      type="text"
                      value={weakConceptsInput}
                      onChange={(e) => setWeakConceptsInput(e.target.value)}
                      placeholder="e.g. Chain Rule, Pipelining hazards"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Starting Strong Areas
                    </label>
                    <input
                      type="text"
                      value={strongConceptsInput}
                      onChange={(e) => setStrongConceptsInput(e.target.value)}
                      placeholder="e.g. Algebra, Logic Gates"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Avatar & Bio */}
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs pb-1 border-b border-slate-800">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Step 4: Avatar & Learning Objective</span>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Choose an Avatar</label>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {AVATAR_PRESETS.map((av) => (
                      <img
                        key={av.id}
                        src={av.url}
                        alt={av.label}
                        onClick={() => {
                          setSelectedAvatar(av.url);
                          setCustomAvatarUrl('');
                        }}
                        className={`w-11 h-11 rounded-xl object-cover cursor-pointer transition ${
                          selectedAvatar === av.url && !customAvatarUrl
                            ? 'ring-2 ring-indigo-400 scale-110 shadow-lg shadow-indigo-500/30'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                        title={av.label}
                      />
                    ))}
                  </div>

                  <div className="mt-2.5">
                    <input
                      type="url"
                      value={customAvatarUrl}
                      onChange={(e) => setCustomAvatarUrl(e.target.value)}
                      placeholder="Or enter custom image URL: https://..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Personal Objective / Bio</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe what you want to achieve..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition transform active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Save Details & Launch My Personal Companion (+250 XP Bonus)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
