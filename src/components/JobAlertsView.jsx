import React, { useState } from 'react';
import { SAMPLE_JOB_OPENINGS } from '../data/rolesData.js';
import { calculateJobMatch } from '../utils/mlEngine.js';
import { Bell, ExternalLink, AlertCircle, Building2, MapPin, Sparkles } from 'lucide-react';

export const JobAlertsView = ({ profile }) => {
  const [filterType, setFilterType] = useState('All');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const jobsWithScores = SAMPLE_JOB_OPENINGS.map((job) => {
    const { matchScore, missingSkills } = calculateJobMatch(profile, job);
    return {
      ...job,
      matchScore,
      missingSkillsForStudent: missingSkills
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const filteredJobs = jobsWithScores.filter((job) => {
    if (filterType === 'Freshers') return job.experienceLevel === 'Freshers';
    if (filterType === 'Switchers') return job.experienceLevel === 'Career Switcher';
    return true;
  });

  const highMatchJobsCount = jobsWithScores.filter(j => j.matchScore >= 80).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" />
                Live Job Alert Radar
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {highMatchJobsCount} High Match Roles Found
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-3">
              Matched Job Openings & Placement Drives
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Real-time matched entry-level positions, internships, and hiring drives filtered by your AI Readiness score.
            </p>
          </div>

          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              notificationsEnabled
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Bell className={`w-4 h-4 ${notificationsEnabled ? 'text-emerald-400 animate-bounce' : ''}`} />
            <span>{notificationsEnabled ? 'Job Notifications ACTIVE' : 'Notifications Paused'}</span>
          </button>

        </div>
      </div>

      {/* Notification Toast Alert Box */}
      {notificationsEnabled && highMatchJobsCount > 0 && (
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">🚀 High Readiness Match Alert!</p>
              <p className="text-xs text-slate-300">
                Your profile matches <strong>{highMatchJobsCount} active hiring drive(s)</strong> with over 80% skill compatibility for {profile.targetRole}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter Drives:</span>
        {['All', 'Freshers', 'Switchers'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === type
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-2xl flex items-center justify-center shrink-0">
                  {job.companyLogo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-white">{job.title}</h3>
                    {job.isHot && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        🔥 Hiring Drive
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-slate-500" /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}</span>
                    <span className="text-indigo-400 font-bold">{job.salaryRange}</span>
                  </div>
                </div>
              </div>

              {/* Match Score Badge & Apply CTA */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className={`text-xl font-extrabold font-['Outfit'] ${
                    job.matchScore >= 80 ? 'text-emerald-400' : job.matchScore >= 60 ? 'text-amber-400' : 'text-pink-400'
                  }`}>
                    {job.matchScore}% Match
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {job.matchScore >= 80 ? 'Strongly Recommended' : 'Partial Skill Match'}
                  </p>
                </div>

                <a
                  href={job.applyUrl}
                  onClick={(e) => { e.preventDefault(); alert(`Redirecting to ${job.company} portal...`); }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Required Skills & Missing Skills Breakdown */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-semibold">Required Tech Stack:</span>
                {job.requiredSkills.map((s, i) => {
                  const hasSkill = (profile.technicalSkills[s] || 0) >= 50;
                  return (
                    <span
                      key={i}
                      className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${
                        hasSkill
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {hasSkill ? '✓ ' : ''}{s}
                    </span>
                  );
                })}
              </div>

              {job.missingSkillsForStudent.length > 0 && (
                <div className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Bridge {job.missingSkillsForStudent.join(', ')} before interview</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
