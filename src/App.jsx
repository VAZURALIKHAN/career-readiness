import React, { useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { AssessmentForm } from './components/AssessmentForm.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { RecommendationsView } from './components/RecommendationsView.jsx';
import { JobSwitchDiffPortal } from './components/JobSwitchDiffPortal.jsx';
import { FreshersRoadmapView } from './components/FreshersRoadmapView.jsx';
import { JobAlertsView } from './components/JobAlertsView.jsx';
import { ResumeAtsChecker } from './components/ResumeAtsChecker.jsx';

import { TARGET_ROLES, SAMPLE_JOB_OPENINGS } from './data/rolesData.js';
import { SAMPLE_PROFILES } from './data/sampleProfiles.js';
import { predictCareerReadiness, calculateJobMatch } from './utils/mlEngine.js';

export function App() {
  const [profile, setProfile] = useState({
    ...SAMPLE_PROFILES[0],
    name: 'My Career Profile'
  });
  const [activeTab, setActiveTab] = useState('landing');

  const roleBenchmark = TARGET_ROLES.find(r => r.title === profile.targetRole) || TARGET_ROLES[0];
  const prediction = predictCareerReadiness(profile, roleBenchmark);

  const unreadAlertsCount = SAMPLE_JOB_OPENINGS.filter((j) => {
    const { matchScore } = calculateJobMatch(profile, j);
    return matchScore >= 80;
  }).length;

  const handleUpdateResumeText = (newText) => {
    setProfile({
      ...profile,
      resumeText: newText
    });
  };

  const handleSelectRoleFromLanding = (roleTitle) => {
    const roleObj = TARGET_ROLES.find(r => r.title === roleTitle);
    const newSkills = { ...profile.technicalSkills };

    if (roleObj) {
      roleObj.requiredSkills.forEach(req => {
        if (newSkills[req.name] === undefined) {
          newSkills[req.name] = 50;
        }
      });
    }

    setProfile({
      ...profile,
      targetRole: roleTitle,
      technicalSkills: newSkills
    });
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectSampleProfile={(p) => setProfile(p)}
        unreadAlertsCount={unreadAlertsCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'landing' && (
          <LandingPage
            onGetStarted={() => setActiveTab('dashboard')}
            onAssessProfile={() => setActiveTab('assessment')}
            onSelectRole={handleSelectRoleFromLanding}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            profile={profile}
            prediction={prediction}
            roleBenchmark={roleBenchmark}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentForm
            profile={profile}
            onUpdateProfile={(updated) => setProfile(updated)}
            onSaveAndAnalyze={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'freshers-roadmap' && (
          <FreshersRoadmapView />
        )}

        {activeTab === 'job-switch-diff' && (
          <JobSwitchDiffPortal userSkills={profile.technicalSkills} />
        )}

        {activeTab === 'job-alerts' && (
          <JobAlertsView profile={profile} />
        )}

        {activeTab === 'ats-tools' && (
          <ResumeAtsChecker
            profile={profile}
            roleBenchmark={roleBenchmark}
            onUpdateResumeText={handleUpdateResumeText}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsView recommendations={prediction.recommendations} />
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-300">SkillGap AI Platform</span> • End-to-End ML Prediction, XAI, & Career Readiness System
        </div>
        <div>
          Built with React.js & Tailwind CSS for CSE Final Year Projects
        </div>
      </footer>

    </div>
  );
}

export default App;
