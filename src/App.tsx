/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeTab } from './components/HomeTab';
import { LearnTab } from './components/LearnTab';
import { VisualLabTab } from './components/VisualLabTab';
import { AssessTab } from './components/AssessTab';
import { AITutorTab } from './components/AITutorTab';
import { ProgressTab } from './components/ProgressTab';
import { ExtendedFeaturesModal } from './components/ExtendedFeaturesModal';
import { AuthModal } from './components/AuthModal';
import { EditProfileModal } from './components/EditProfileModal';
import { getActiveUser, saveUserProfile, logoutUser } from './services/authStorage';

import {
  initialStudentProfile,
  sampleKnowledgeNodes,
  sampleKnowledgeEdges,
  sampleMaterials,
  sampleRoadmap,
  sampleSpacedRevision,
  sampleAssessmentQuestions,
} from './data/mockData';

import { StudentProfile, AccessibilityConfig, UploadedMaterial, ConceptNode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [profile, setProfile] = useState<StudentProfile>(() => getActiveUser());
  const [accessibility, setAccessibility] = useState<AccessibilityConfig>({
    fontDyslexic: false,
    highContrast: false,
    fontSize: 'normal',
    language: 'en',
    speechSpeed: 1.0,
    gestureNav: false,
  });

  const [materials, setMaterials] = useState<UploadedMaterial[]>(sampleMaterials);
  const [selectedMaterial, setSelectedMaterial] = useState<UploadedMaterial | null>(sampleMaterials[0]);
  const [knowledgeNodes, setKnowledgeNodes] = useState<ConceptNode[]>(sampleKnowledgeNodes);
  const [knowledgeEdges, setKnowledgeEdges] = useState(sampleKnowledgeEdges);
  const [roadmap, setRoadmap] = useState(sampleRoadmap);
  const [spacedRevision, setSpacedRevision] = useState(sampleSpacedRevision);
  const [questions, setQuestions] = useState(sampleAssessmentQuestions);

  // Auth & Profile Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Extended suite modal
  const [isExtendedModalOpen, setIsExtendedModalOpen] = useState(false);
  const [extendedModalSection, setExtendedModalSection] = useState<string>('gamification');
  const [selectedGapConcept, setSelectedGapConcept] = useState<string | null>(null);

  // Scenario 1-5 launcher (Prompt section 33)
  const handleSelectScenario = (scenarioId: number) => {
    switch (scenarioId) {
      case 1:
        // Scenario 1: Difficult Concept -> AI Visual Pipeline -> Animated Video
        setActiveTab('visual_lab');
        break;
      case 2:
        // Scenario 2: Handwritten Notes -> OCR & Multimodal Vision
        setActiveTab('learn');
        break;
      case 3:
        // Scenario 3: Knowledge Gap -> Prerequisite Root Repair
        setSelectedGapConcept('differentiation');
        setActiveTab('progress');
        break;
      case 4:
        // Scenario 4: Exam Prep & Readiness
        setActiveTab('assess');
        break;
      case 5:
        // Scenario 5: Interactive What-If Simulation
        setActiveTab('visual_lab');
        break;
      default:
        setActiveTab('home');
    }
  };

  const handleOpenKnowledgeGap = (concept: string) => {
    setSelectedGapConcept(concept);
    setActiveTab('progress');
  };

  const handleOpenExamPrep = () => {
    setActiveTab('assess');
  };

  const handleOpenExtendedModal = (section = 'gamification') => {
    setExtendedModalSection(section);
    setIsExtendedModalOpen(true);
  };

  const handleAuthSuccess = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
    setIsAuthModalOpen(false);
  };

  const handleProfileUpdated = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    saveUserProfile(updatedProfile);
  };

  const handleOpenAuthModal = (mode: 'signin' | 'signup' = 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white ${
      accessibility.fontDyslexic ? 'font-dyslexic' : ''
    } ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      {/* Universal Top Header */}
      <Header
        profile={profile}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExtendedModal={handleOpenExtendedModal}
        onOpenAuthModal={handleOpenAuthModal}
        onOpenEditProfileModal={handleOpenEditProfile}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'home' && (
          <HomeTab
            profile={profile}
            spacedRevision={spacedRevision}
            setActiveTab={setActiveTab}
            onSelectScenario={handleSelectScenario}
            onOpenKnowledgeGap={handleOpenKnowledgeGap}
            onOpenExamPrep={handleOpenExamPrep}
            onEditProfile={handleOpenEditProfile}
          />
        )}

        {activeTab === 'learn' && (
          <LearnTab
            materials={materials}
            selectedMaterial={selectedMaterial}
            onSelectMaterial={setSelectedMaterial}
            accessibility={accessibility}
          />
        )}

        {activeTab === 'visual_lab' && (
          <VisualLabTab accessibility={accessibility} />
        )}

        {activeTab === 'assess' && (
          <AssessTab
            questions={questions}
            profile={profile}
            knowledgeNodes={knowledgeNodes}
            onOpenKnowledgeGap={handleOpenKnowledgeGap}
          />
        )}

        {activeTab === 'ai_tutor' && (
          <AITutorTab
            profile={profile}
            materials={materials}
            accessibility={accessibility}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTab
            profile={profile}
            knowledgeNodes={knowledgeNodes}
            knowledgeEdges={knowledgeEdges}
            roadmap={roadmap}
            spacedRevision={spacedRevision}
            selectedGapConcept={selectedGapConcept}
            onSelectConcept={(node) => {
              setActiveTab('visual_lab');
            }}
            onEditProfile={handleOpenEditProfile}
            onSwitchAccount={() => handleOpenAuthModal('signin')}
          />
        )}
      </main>

      {/* Extended Suite Modal (Sections 19 through 31) */}
      <ExtendedFeaturesModal
        isOpen={isExtendedModalOpen}
        onClose={() => setIsExtendedModalOpen(false)}
        initialSection={extendedModalSection}
        profile={profile}
      />

      {/* Auth & Profile Creation Modal (Email & Password + Full Academic Details) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
        canDismiss={Boolean(profile)}
      />

      {/* Edit & Add Profile Details Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        profile={profile}
        onProfileUpdated={handleProfileUpdated}
        onSwitchAccount={() => handleOpenAuthModal('signin')}
        onLogout={handleLogout}
      />
    </div>
  );
}
