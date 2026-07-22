import React, { useState } from 'react';
import { TARGET_ROLES } from '../data/rolesData.js';
import { computeJobSwitchDiff } from '../utils/jobSwitchEngine.js';
import { ArrowRightLeft, CheckCircle2, Clock, Zap, MapPin, Sparkles } from 'lucide-react';

export const JobSwitchDiffPortal = ({ userSkills }) => {
  const [currentRole, setCurrentRole] = useState('Data Analyst');
  const [targetRoleId, setTargetRoleId] = useState('ai-engineer');

  const diffResult = computeJobSwitchDiff(currentRole, targetRoleId, userSkills);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Job Switcher Portal
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Differential Skill Engine
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-3">
              <ArrowRightLeft className="w-8 h-8 text-indigo-400" />
              Career Transition & Skill Diff Analyzer
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Calculate transferable skills, missing technical delta, transition difficulty score, and strategic learning roadmaps when switching domains or roles.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Controls */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current Background / Role */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Your Current Role / Background
          </label>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Data Analyst">Data Analyst</option>
            <option value="QA Test Engineer">QA / Automation Engineer</option>
            <option value="Front-End Developer">Front-End Developer</option>
            <option value="Non-CS Graduate">Non-CS / Mechanical / ECE Graduate</option>
            <option value="IT Support / Admin">IT Support / System Admin</option>
          </select>
        </div>

        {/* Target New Role */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Select Your Target Role
          </label>
          <select
            value={targetRoleId}
            onChange={(e) => setTargetRoleId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            {TARGET_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.category})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Transition Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Difficulty Score Gauge */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <p className="text-xs font-semibold text-slate-400">Transition Difficulty Score</p>
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-4xl font-extrabold text-indigo-400 font-['Outfit']">
              {diffResult.transitionDifficultyScore}
            </span>
            <span className="text-slate-400 text-sm font-bold">/ 10</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {diffResult.transitionDifficultyScore <= 4
              ? '🟢 Smooth transition with high skill overlap.'
              : diffResult.transitionDifficultyScore <= 7
              ? '🟡 Moderate effort required for core delta skills.'
              : '🔴 High effort; comprehensive skill building needed.'}
          </p>
        </div>

        {/* Estimated Transition Time */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <p className="text-xs font-semibold text-slate-400">Estimated Transition Timeline</p>
          <div className="flex items-center gap-3 my-2">
            <Clock className="w-8 h-8 text-purple-400" />
            <span className="text-3xl font-extrabold text-white font-['Outfit']">
              {diffResult.estimatedTransitionMonths} Months
            </span>
          </div>
          <p className="text-[11px] text-purple-300">Based on 12–15 hours of weekly study commitment.</p>
        </div>

        {/* Transferable Skills Count */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <p className="text-xs font-semibold text-slate-400">Transferable Skills Count</p>
          <div className="flex items-center gap-3 my-2">
            <Zap className="w-8 h-8 text-emerald-400" />
            <span className="text-3xl font-extrabold text-emerald-400 font-['Outfit']">
              {diffResult.transferableSkills.length} Skills
            </span>
          </div>
          <p className="text-[11px] text-emerald-300">Skills directly reused in your new target role.</p>
        </div>

      </div>

      {/* Transferable Skills vs Missing Delta Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Transferable Skills */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle2 className="w-5 h-5" />
            Transferable Skill Assets ({diffResult.transferableSkills.length})
          </h3>

          {diffResult.transferableSkills.length > 0 ? (
            <div className="space-y-3">
              {diffResult.transferableSkills.map((s, idx) => (
                <div key={idx} className="glass-card p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-white">{s.name}</span>
                    <p className="text-[10px] text-slate-400">{s.relevance}</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                    {s.level}% Level
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No direct skill overlap detected yet. Build fundamental prerequisites!</p>
          )}
        </div>

        {/* Delta Missing Skills */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5" />
            Delta Missing Skills to Acquire ({diffResult.deltaMissingSkills.length})
          </h3>

          <div className="space-y-3">
            {diffResult.deltaMissingSkills.map((s, idx) => (
              <div key={idx} className="glass-card p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white">{s.name}</span>
                  <p className="text-[10px] text-slate-400">Target Benchmark: {s.requiredLevel}%</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${
                  s.learningCurve === 'Easy'
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800'
                    : s.learningCurve === 'Moderate'
                    ? 'text-amber-400 bg-amber-950/40 border-amber-800'
                    : 'text-pink-400 bg-pink-950/40 border-pink-800'
                }`}>
                  {s.learningCurve} Curve
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Strategic Roadmap */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <MapPin className="w-5 h-5 text-indigo-400" />
          Strategic Transition Roadmap ({diffResult.currentRole} ➔ {diffResult.targetRole})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diffResult.strategicRoadmap.map((step, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-400">{step.phase}</span>
                <span className="text-[10px] font-semibold text-slate-400">{step.duration}</span>
              </div>
              <h4 className="text-sm font-extrabold text-white">{step.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
