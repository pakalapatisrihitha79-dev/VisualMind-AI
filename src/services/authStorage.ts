import { StudentProfile } from '../types';
import { initialStudentProfile } from '../data/mockData';

const STORAGE_KEY_USERS = 'visualmind_users_v2';
const STORAGE_KEY_ACTIVE_USER = 'visualmind_active_user_id_v2';

export const AVATAR_PRESETS = [
  {
    id: 'avatar_1',
    label: 'Scholar Violet',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar_2',
    label: 'Tech Explorer',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar_3',
    label: 'Science Innovator',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar_4',
    label: 'Physics Thinker',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar_5',
    label: 'Creative Engineer',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'avatar_6',
    label: 'Logic Strategist',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

/**
 * Retrieve all registered users from localStorage
 */
export function getStoredUsers(): StudentProfile[] {
  if (typeof window === 'undefined') return [initialStudentProfile];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      // Seed default demo user
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify([initialStudentProfile]));
      return [initialStudentProfile];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [initialStudentProfile];
  } catch (err) {
    console.error('Failed to parse stored users:', err);
    return [initialStudentProfile];
  }
}

/**
 * Save / Update a user profile
 */
export function saveUserProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    const users = getStoredUsers();
    const index = users.findIndex((u) => u.id === profile.id || u.email.toLowerCase() === profile.email.toLowerCase());
    if (index >= 0) {
      users[index] = profile;
    } else {
      users.push(profile);
    }
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY_ACTIVE_USER, profile.id);
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
}

/**
 * Get active student profile
 */
export function getActiveUser(): StudentProfile {
  if (typeof window === 'undefined') return initialStudentProfile;
  try {
    const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE_USER);
    const users = getStoredUsers();
    if (activeId) {
      const match = users.find((u) => u.id === activeId);
      if (match) return match;
    }
    return users[0] || initialStudentProfile;
  } catch (err) {
    return initialStudentProfile;
  }
}

/**
 * Switch active user
 */
export function setActiveUserId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_ACTIVE_USER, id);
}

/**
 * Sign in existing user with email and password
 */
export function loginUser(
  email: string,
  password?: string
): { success: boolean; user?: StudentProfile; error?: string } {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const matched = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!matched) {
    return {
      success: false,
      error: 'No account found with this email address. Please register a new profile below.',
    };
  }

  // If password was set, verify it
  if (matched.password && password && matched.password !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please try again.',
    };
  }

  setActiveUserId(matched.id);
  return { success: true, user: matched };
}

/**
 * Register a new student profile
 */
export interface RegisterProfileInput {
  name: string;
  email: string;
  password?: string;
  gradeLevel: string;
  targetExam: string;
  examDate?: string;
  studyGoalHoursPerDay?: number;
  preferredStyle?: 'visual' | 'socratic' | 'step_by_step' | 'real_world';
  avatar?: string;
  bio?: string;
  institution?: string;
  primarySubjects?: string[];
  weakConcepts?: string[];
  strongConcepts?: string[];
  learningGoals?: string[];
}

export function registerNewUser(input: RegisterProfileInput): StudentProfile {
  const users = getStoredUsers();
  const normalizedEmail = input.email.trim().toLowerCase();

  // Check if email already registered
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    // Update existing
    const updated: StudentProfile = {
      ...existing,
      ...input,
      email: normalizedEmail,
    };
    saveUserProfile(updated);
    return updated;
  }

  const newProfile: StudentProfile = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: input.name.trim() || 'Visual Learner',
    email: normalizedEmail,
    password: input.password || '',
    avatar: input.avatar || AVATAR_PRESETS[1].url,
    gradeLevel: input.gradeLevel || 'College Student',
    targetExam: input.targetExam || 'General STEM Exam',
    examDate: input.examDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    studyGoalHoursPerDay: input.studyGoalHoursPerDay || 2.5,
    streakDays: 1,
    xpPoints: 250, // Welcome XP bonus!
    overallMastery: 65,
    readinessScore: 70,
    cognitiveState: 'optimal',
    preferredStyle: input.preferredStyle || 'visual',
    weakConcepts: input.weakConcepts && input.weakConcepts.length > 0
      ? input.weakConcepts
      : ['Prerequisite Limits', 'Partial Differentiation', 'Complex Vector Fields'],
    strongConcepts: input.strongConcepts && input.strongConcepts.length > 0
      ? input.strongConcepts
      : ['Basic Algebra', 'Geometric Coordinate Systems', 'Newtonian Mechanics'],
    mistakeMemory: [
      {
        id: `m_init_${Date.now()}`,
        topic: input.primarySubjects?.[0] || 'Core Fundamentals',
        concept: 'Initial Setup Trap Check',
        mistakePattern: 'Skipping prerequisite foundation checks when tackling advanced chapters',
        frequency: 1,
        remedyAction: 'Use VisualMind knowledge DAG to review underlying foundation nodes first',
        lastOccurred: 'Today',
      },
    ],
    completedTopicsCount: 4,
    totalHoursStudied: 2.5,
    offlinePacksReady: true,
    bio: input.bio || 'Eager visual learner aiming to master STEM concepts through deep interactive intuition.',
    institution: input.institution || 'Self-Directed / Academy',
    primarySubjects: input.primarySubjects || ['Calculus', 'Physics', 'Computer Systems'],
    learningGoals: input.learningGoals || [
      'Master core syllabus concepts with 3D models',
      'Maintain daily study streaks',
      'Target top percentile exam score',
    ],
    createdAt: new Date().toISOString(),
  };

  saveUserProfile(newProfile);
  return newProfile;
}

/**
 * Log out the current user session
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_ACTIVE_USER);
}
