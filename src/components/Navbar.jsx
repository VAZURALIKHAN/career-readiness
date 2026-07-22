import React, { useState } from 'react';
import { Brain, Home, LayoutDashboard, Sliders, ArrowRightLeft, Compass, Bell, FileText, Sparkles, UserCheck } from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/sampleProfiles.js';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onSelectSampleProfile,
  unreadAlertsCount
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessment', label: 'Edit Profile', icon: Sliders },
    { id: 'freshers-roadmap', label: 'Freshers Path', icon: Compass, badge: 'Crucial' },
    { id: 'job-switch-diff', label: 'Job Switch Diff', icon: ArrowRightLeft, badge: 'New' },
    { id: 'job-alerts', label: 'Job Openings', icon: Bell, count: unreadAlertsCount },
    { id: 'ats-tools', label: 'ATS & Interview', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">SkillGap</span>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text font-black text-xl">AI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">v2.5 ⭐</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Intelligent Career Readiness & Transition Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-300 hover:border-purple-400/50 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>Demo Profiles</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 glass-panel rounded-xl border border-slate-800 shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-800/80">
                    <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                      Load Benchmark Student Profile
                    </p>
                  </div>
                  {SAMPLE_PROFILES.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectSampleProfile(p);
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-indigo-600/20 hover:text-white text-slate-300 transition-colors flex flex-col gap-0.5"
                    >
                      <span className="font-semibold text-slate-200">{p.name}</span>
                      <span className="text-[10px] text-slate-400">Target: {p.targetRole} • CGPA {p.cgpa}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
