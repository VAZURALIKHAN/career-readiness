import React, { useState } from 'react';
import { analyzeResumeAts } from '../utils/atsEngine.js';
import { generateMockInterview } from '../utils/interviewEngine.js';
import { FileText, MessageSquareCode, Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const ResumeAtsChecker = ({
  profile,
  roleBenchmark,
  onUpdateResumeText
}) => {
  const [subTab, setSubTab] = useState('ats');

  const atsResult = analyzeResumeAts(profile.resumeText || '', roleBenchmark);
  
  const mockGaps = roleBenchmark.requiredSkills
    .filter(req => (profile.technicalSkills[req.name] || 0) < req.minRequired)
    .map(req => ({
      skillName: req.name,
      currentLevel: profile.technicalSkills[req.name] || 0,
      requiredLevel: req.minRequired,
      gapDelta: req.minRequired - (profile.technicalSkills[req.name] || 0),
      priority: 'High',
      estimatedWeeks: 2
    }));

  const interviewQuestions = generateMockInterview(mockGaps);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Career Intelligence Tools
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-3">
              Resume ATS Checker & Mock Interview Generator
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Optimize your resume for automated applicant tracking systems (ATS) and practice custom technical interview questions tailored to your identified skill gaps.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Tab Switcher */}
      <div className="flex border-b border-slate-800 space-x-4">
        <button
          onClick={() => setSubTab('ats')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-all ${
            subTab === 'ats'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resume ATS Keyword Scanner</span>
        </button>

        <button
          onClick={() => setSubTab('interview')}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm border-b-2 transition-all ${
            subTab === 'interview'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquareCode className="w-4 h-4" />
          <span>Skill-Gap Mock Interview Questions</span>
        </button>
      </div>

      {/* ATS Scanner View */}
      {subTab === 'ats' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Input Textarea */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Paste Resume Content
            </h3>

            <textarea
              rows={12}
              value={profile.resumeText || ''}
              onChange={(e) => onUpdateResumeText(e.target.value)}
              placeholder="Paste your plain text resume content here (Skills, Projects, Education, Work Experience)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />
            <p className="text-[11px] text-slate-400">
              Scans against target role benchmark keywords for <strong>{roleBenchmark.title}</strong>.
            </p>
          </div>

          {/* Right: ATS Analysis Results */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">ATS Compatibility Score</h3>
                <span className={`text-2xl font-black font-['Outfit'] ${
                  atsResult.score >= 80 ? 'text-emerald-400' : atsResult.score >= 60 ? 'text-amber-400' : 'text-pink-400'
                }`}>
                  {atsResult.score}%
                </span>
              </div>

              <p className="text-xs text-slate-300 font-semibold">{atsResult.summary}</p>

              {/* Matched vs Missing Keywords */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Matched Keywords ({atsResult.matchedKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.matchedKeywords.map((k, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                        ✓ {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Missing Target Keywords ({atsResult.missingKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {atsResult.missingKeywords.map((k, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                        ✗ {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Optimization Tips:</span>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                  {atsResult.formatSuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Mock Interview Generator View */}
      {subTab === 'interview' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                Tailored Technical Interview Questions
              </h3>
              <p className="text-xs text-slate-400">Questions generated specifically for identified skill gaps</p>
            </div>
          </div>

          <div className="space-y-4">
            {interviewQuestions.map((q, idx) => (
              <div key={q.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800">
                      {q.skillName}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    q.difficulty === 'Beginner'
                      ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800'
                      : 'text-amber-400 bg-amber-950/40 border-amber-800'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-white">{q.question}</h4>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <span className="font-bold text-emerald-400">💡 Model Candidate Answer:</span>
                  <p className="text-slate-300 leading-relaxed">{q.sampleAnswer}</p>
                </div>

                <p className="text-[11px] text-purple-300 font-medium">
                  🎯 <strong>Recruiter Tip:</strong> {q.tips}
                </p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
