import React, { useState } from 'react';
import { TARGET_ROLES } from '../data/rolesData.js';
import { GraduationCap, Code2, Briefcase, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const AssessmentForm = ({
  profile,
  onUpdateProfile,
  onSaveAndAnalyze
}) => {
  const [activeStep, setActiveStep] = useState(1);

  const selectedRoleBenchmark = TARGET_ROLES.find(r => r.title === profile.targetRole) || TARGET_ROLES[0];

  const handleRoleChange = (roleTitle) => {
    const roleObj = TARGET_ROLES.find(r => r.title === roleTitle);
    const newSkills = { ...profile.technicalSkills };

    if (roleObj) {
      roleObj.requiredSkills.forEach(req => {
        if (newSkills[req.name] === undefined) {
          newSkills[req.name] = 50;
        }
      });
    }

    onUpdateProfile({
      ...profile,
      targetRole: roleTitle,
      technicalSkills: newSkills
    });
  };

  const handleSkillChange = (skillName, value) => {
    onUpdateProfile({
      ...profile,
      technicalSkills: {
        ...profile.technicalSkills,
        [skillName]: value
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Form Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-400" />
            Student Assessment & Career Profile
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Configure your technical proficiencies, academic background, and practical experience to run the ML Prediction Engine.
          </p>
        </div>

        <button
          onClick={onSaveAndAnalyze}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
        >
          <span>Run AI Prediction</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex border-b border-slate-800 space-x-4 overflow-x-auto pb-2">
        {[
          { step: 1, label: '1. Target Role & Academics', icon: GraduationCap },
          { step: 2, label: '2. Technical Skill Ratings', icon: Code2 },
          { step: 3, label: '3. Experience & Projects', icon: Briefcase },
          { step: 4, label: '4. Soft Skills & Aptitude', icon: Award }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step 1: Target Role & Academics */}
      {activeStep === 1 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">1</span>
            Target Role Selection & Academic Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Target Role Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Target Career Role</label>
              <select
                value={profile.targetRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role.id} value={role.title}>
                    {role.title} ({role.category})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/40">
                💡 {selectedRoleBenchmark.description}
              </p>
            </div>

            {/* Candidate Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Candidate Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Candidate Name / Your Name"
              />
            </div>

            {/* CGPA Input Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">CGPA / Percentage</label>
                <span className="text-sm font-extrabold text-indigo-400">{profile.cgpa} / 10.0</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="10.0"
                step="0.1"
                value={profile.cgpa}
                onChange={(e) => onUpdateProfile({ ...profile, cgpa: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>4.0 (Min)</span>
                <span>Target: {selectedRoleBenchmark.targetCgpa} CGPA</span>
                <span>10.0 (Max)</span>
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Department / Branch</label>
              <select
                value={profile.department}
                onChange={(e) => onUpdateProfile({ ...profile, department: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                <option value="Information Technology">Information Technology (IT)</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science (AI/DS)</option>
                <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                <option value="Electrical Engineering">Electrical Engineering (EEE)</option>
                <option value="Mechanical / Non-CS">Mechanical / Non-CS Branch</option>
              </select>
            </div>

            {/* College Tier */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Institution Tier</label>
              <div className="grid grid-cols-3 gap-2">
                {['Tier 1', 'Tier 2', 'Tier 3'].map((tier) => (
                  <button
                    type="button"
                    key={tier}
                    onClick={() => onUpdateProfile({ ...profile, collegeTier: tier })}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      profile.collegeTier === tier
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Graduation Year */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Graduation Year</label>
              <select
                value={profile.graduationYear}
                onChange={(e) => onUpdateProfile({ ...profile, graduationYear: parseInt(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={2026}>2026 (Final Year)</option>
                <option value={2027}>2027 (Pre-Final Year)</option>
                <option value={2025}>2025 (Fresh Graduate)</option>
                <option value={2024}>2024 (1 YOE / Switcher)</option>
              </select>
            </div>

          </div>
        </div>
      )}

      {/* Step 2: Technical Skill Ratings */}
      {activeStep === 2 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">2</span>
              Role-Aligned Technical Skill Matrix
            </h3>
            <span className="text-xs text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800">
              Benchmark for: {selectedRoleBenchmark.title}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedRoleBenchmark.requiredSkills.map((req) => {
              const currentLevel = profile.technicalSkills[req.name] || 0;
              let badgeColor = 'text-red-400 bg-red-950/40 border-red-800/40';
              if (currentLevel >= req.minRequired) badgeColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40';
              else if (currentLevel >= req.minRequired - 20) badgeColor = 'text-amber-400 bg-amber-950/40 border-amber-800/40';

              return (
                <div key={req.name} className="glass-card p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-white">{req.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                      Current: {currentLevel}% | Target: {req.minRequired}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentLevel}
                    onChange={(e) => handleSkillChange(req.name, parseInt(e.target.value))}
                    className="w-full"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>Beginner (0%)</span>
                    <span>Intermediate (50%)</span>
                    <span>Expert (100%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Experience & Projects */}
      {activeStep === 3 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">3</span>
            Practical Experience & Portfolio Records
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="glass-card p-4 rounded-xl space-y-2">
              <label className="text-xs font-semibold text-slate-300">Internships Completed</label>
              <input
                type="number"
                min="0"
                max="5"
                value={profile.internships}
                onChange={(e) => onUpdateProfile({ ...profile, internships: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
              />
              <p className="text-[10px] text-slate-400">Industry domain internships</p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <label className="text-xs font-semibold text-slate-300">Technical Projects Count</label>
              <input
                type="number"
                min="0"
                max="10"
                value={profile.projectsCount}
                onChange={(e) => onUpdateProfile({ ...profile, projectsCount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
              />
              <p className="text-[10px] text-slate-400">Deployed or GitHub hosted</p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <label className="text-xs font-semibold text-slate-300">Certifications Earned</label>
              <input
                type="number"
                min="0"
                max="10"
                value={profile.certificationsCount}
                onChange={(e) => onUpdateProfile({ ...profile, certificationsCount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
              />
              <p className="text-[10px] text-slate-400">AWS, Coursera, Meta, etc.</p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <label className="text-xs font-semibold text-slate-300">Hackathons Participated/Won</label>
              <input
                type="number"
                min="0"
                max="10"
                value={profile.hackathonsCount}
                onChange={(e) => onUpdateProfile({ ...profile, hackathonsCount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
              />
              <p className="text-[10px] text-slate-400">Coding hackathon events</p>
            </div>

            <div className="glass-card p-4 rounded-xl space-y-2">
              <label className="text-xs font-semibold text-slate-300">Open-Source PRs / Contributions</label>
              <input
                type="number"
                min="0"
                max="20"
                value={profile.openSourceContributions}
                onChange={(e) => onUpdateProfile({ ...profile, openSourceContributions: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white"
              />
              <p className="text-[10px] text-slate-400">Merged GitHub Pull Requests</p>
            </div>

          </div>
        </div>
      )}

      {/* Step 4: Soft Skills & Aptitude */}
      {activeStep === 4 && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">4</span>
            Aptitude & Behavioral Ratings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Coding Test Score */}
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">LeetCode / Coding Test Score</span>
                <span className="text-xs font-extrabold text-indigo-400">{profile.codingTestScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={profile.codingTestScore}
                onChange={(e) => onUpdateProfile({ ...profile, codingTestScore: parseInt(e.target.value) })}
                className="w-full"
              />
              <p className="text-[10px] text-slate-400">DSA problem solving rating in screening rounds.</p>
            </div>

            {/* Problem Solving Score */}
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Logical Problem Solving</span>
                <span className="text-xs font-extrabold text-purple-400">{profile.problemSolvingScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={profile.problemSolvingScore}
                onChange={(e) => onUpdateProfile({ ...profile, problemSolvingScore: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Communication Score */}
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Communication & Articulation</span>
                <span className="text-xs font-extrabold text-pink-400">{profile.communicationScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={profile.communicationScore}
                onChange={(e) => onUpdateProfile({ ...profile, communicationScore: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Teamwork Score */}
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">Team Collaboration & Agility</span>
                <span className="text-xs font-extrabold text-cyan-400">{profile.teamworkScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={profile.teamworkScore}
                onChange={(e) => onUpdateProfile({ ...profile, teamworkScore: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onSaveAndAnalyze}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-sm hover:opacity-95 transition-all shadow-xl shadow-indigo-500/30 flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Save & View AI Dashboard</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
