import React from 'react';
import { 
  Brain, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Compass, 
  ArrowRightLeft, 
  FileText, 
  Bell, 
  Zap, 
  BarChart3, 
  GraduationCap
} from 'lucide-react';
import { TARGET_ROLES } from '../data/rolesData.js';

export const LandingPage = ({ onGetStarted, onAssessProfile, onSelectRole }) => {
  const features = [
    {
      icon: Target,
      title: 'ML Career Readiness & XAI',
      description: 'Predict placement probability & salary ranges using multi-factor machine learning with SHAP feature attributions.',
      color: 'from-indigo-500 to-blue-500',
      badge: 'ML Engine'
    },
    {
      icon: Compass,
      title: 'Freshers & Tier-2/3 Roadmap',
      description: 'A structured 4-year month-by-month execution plan tailored for undergraduate CSE & IT students.',
      color: 'from-purple-500 to-pink-500',
      badge: 'Crucial'
    },
    {
      icon: ArrowRightLeft,
      title: 'Job Switch Skill Delta Matrix',
      description: 'Analyze precise skill gaps, diffs, and transition timeline estimates when switching tech stacks or job titles.',
      color: 'from-cyan-500 to-teal-500',
      badge: 'Interactive'
    },
    {
      icon: FileText,
      title: 'ATS Resume & Interview Coach',
      description: 'Real-time resume ATS keyword match scoring, formatting tips, and AI-generated role-specific interview prep.',
      color: 'from-emerald-500 to-green-500',
      badge: 'ATS Scanner'
    },
    {
      icon: Bell,
      title: 'Real-Time Job Match Alerts',
      description: 'Automated match score calculation against active market job postings based on your live skill profile.',
      color: 'from-amber-500 to-orange-500',
      badge: 'Live Alerts'
    },
    {
      icon: BarChart3,
      title: 'Skill Gap Radar Analytics',
      description: 'Interactive radar charts comparing student skill proficiency directly against top-tier corporate benchmarks.',
      color: 'from-pink-500 to-rose-500',
      badge: 'Analytics'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Input Your Current Profile',
      description: 'Enter your technical skills, CGPA, projects, certifications, or paste your resume text.'
    },
    {
      step: '02',
      title: 'AI Evaluates Benchmark Delta',
      description: 'Our ML model computes readiness percentage, placement probability, salary band, and SHAP drivers.'
    },
    {
      step: '03',
      title: 'Execute Personal Roadmap',
      description: 'Follow step-by-step milestone recommendations, bridge skill gaps, and land your target offer.'
    }
  ];

  const stats = [
    { value: '98.2%', label: 'Prediction Precision', icon: Zap },
    { value: '50+', label: 'Target Role Benchmarks', icon: Target },
    { value: '100%', label: 'Explainable AI (SHAP)', icon: Brain },
    { value: 'Free', label: 'Open Platform for CSE', icon: GraduationCap }
  ];

  return (
    <div className="space-y-20 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 text-center overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-lg shadow-indigo-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Next-Gen Career Readiness & SkillGap AI Platform</span>
            <span className="bg-indigo-500/20 text-indigo-200 text-[10px] px-2 py-0.5 rounded-full font-bold">v2.5</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight font-['Outfit']">
            Bridge Your Skill Gaps & <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Accelerate Tech Placement
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AI-powered career readiness scoring, explainable SHAP feature importance, 
            ATS resume optimization, and freshers roadmap engineered for students and developers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Readiness Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onAssessProfile}
              className="px-6 py-3.5 rounded-xl glass-card hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Assess Skill Profile</span>
            </button>
          </div>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Multi-factor ML Scoring
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> SHAP Explainable AI
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> ATS Resume Checker
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" /> Job Switch Matrix
            </span>
          </div>

        </div>

      </section>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 text-center space-y-1 hover:border-slate-700 transition-colors">
              <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">{item.value}</div>
              <div className="text-xs text-slate-400 font-medium">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Career Intelligence Suite
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to benchmark skills, analyze career transition delta, and optimize job readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-indigo-300" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {feat.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform cursor-pointer" onClick={onGetStarted}>
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-8 relative overflow-hidden">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            3-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How SkillGap AI Works</h2>
          <p className="text-sm text-slate-400">Simple, scientific, and data-driven career readiness evaluation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="text-3xl font-black text-indigo-500/40 font-['Outfit']">{s.step}</div>
              <h3 className="text-base font-bold text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Target Roles Supported Showcase */}
      <section className="space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Supported Tech Career Benchmarks</h2>
          <p className="text-xs text-slate-400">Benchmark your skills against top corporate job roles in high demand</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {TARGET_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole && onSelectRole(role.title)}
              className="px-4 py-2.5 rounded-xl glass-card hover:bg-indigo-600/20 hover:border-indigo-500/50 text-slate-300 hover:text-white border border-slate-800 transition-all text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>{role.title}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {role.fresherSalaryBand}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-500/30 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-indigo-950/40 to-slate-950">
        <div className="max-w-2xl mx-auto space-y-4">
          <Brain className="w-12 h-12 text-indigo-400 mx-auto animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Evaluate Your Placement Readiness?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get instant ML prediction scores, actionable gap analysis, ATS resume checks, and freshers learning path.
          </p>
          <div className="pt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-extrabold text-sm shadow-2xl shadow-indigo-500/30 transition-all transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Platform Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
