import React, { useState } from 'react';
import { TARGET_ROLES, FRESHERS_ROADMAP_DATA } from '../data/rolesData.js';
import { Compass, Milestone, CheckCircle2, AlertTriangle, BookOpen, Rocket, ShieldCheck } from 'lucide-react';

export const FreshersRoadmapView = () => {
  const [selectedRoleId, setSelectedRoleId] = useState('ai-engineer');

  const selectedRole = TARGET_ROLES.find(r => r.id === selectedRoleId) || TARGET_ROLES[0];
  const roadmapPhases = FRESHERS_ROADMAP_DATA[selectedRoleId] || FRESHERS_ROADMAP_DATA['ai-engineer'];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Freshers Guidance Portal
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                0-1 Years Experience Blueprint
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-3">
              Freshers Career Path & Milestone Roadmap
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Clear step-by-step roadmap clarifying how to build industry-level readiness, solve DSA benchmarks, build projects, and crack off-campus placement drives as a fresher.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-4 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-2">
          Select Fresher Career Track:
        </span>
        <div className="flex gap-2">
          {TARGET_ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoleId(r.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedRoleId === r.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Phase Interactive Roadmap Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Milestone className="w-6 h-6 text-indigo-400" />
          4-Phase Roadmap for {selectedRole.title} (Freshers 2026/2027)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapPhases.map((phase) => (
            <div key={phase.phaseNumber} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center font-['Outfit']">
                    P{phase.phaseNumber}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{phase.title}</h3>
                    <span className="text-[10px] text-indigo-300 font-semibold">{phase.timeframe}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                🎯 <strong>Core Objective:</strong> {phase.goal}
              </p>

              {/* Milestones Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Milestones:</h4>
                {phase.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Courses & Projects */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="glass-card p-3 rounded-xl">
                  <span className="font-bold text-indigo-400 flex items-center gap-1 mb-1">
                    <BookOpen className="w-3.5 h-3.5" /> Recommended Learning
                  </span>
                  <ul className="text-slate-400 space-y-1 list-disc pl-3">
                    {phase.recommendedCourses.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-3 rounded-xl">
                  <span className="font-bold text-purple-400 flex items-center gap-1 mb-1">
                    <Rocket className="w-3.5 h-3.5" /> Required Projects
                  </span>
                  <ul className="text-slate-400 space-y-1 list-disc pl-3">
                    {phase.keyProjects.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Freshers Checklist & Common Pitfalls Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Freshers Success Rules */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5" />
            Freshers Success Rules (0 YOE Advantage)
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span><strong>Show Deployed Projects:</strong> Don't just show code files. Provide live Vercel/HuggingFace links on your resume.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span><strong>Consistent LeetCode/DSA Streak:</strong> Solve 1 problem daily to keep problem-solving fresh for online coding assessments.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3.</span>
              <span><strong>Tailored ATS Resumes:</strong> Customize resume keywords for every specific company application.</span>
            </li>
          </ul>
        </div>

        {/* Common Pitfalls to Avoid */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-pink-400 flex items-center gap-2 border-b border-slate-800 pb-3">
            <AlertTriangle className="w-5 h-5" />
            Top 3 Mistakes Freshers Must Avoid
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-pink-400 font-bold">❌</span>
              <span><strong>Tutorial Hell:</strong> Watching courses without writing code or building custom projects.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 font-bold">❌</span>
              <span><strong>Generic Portfolio:</strong> Copying basic Weather apps instead of solving real industry problems.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 font-bold">❌</span>
              <span><strong>Ignoring Fundamentals:</strong> Rushing to ML/AI frameworks without mastering Python & Data Structures.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
