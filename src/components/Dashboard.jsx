import React, { useEffect } from 'react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale 
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  CheckSquare,
  ArrowRight,
  Brain,
  Sliders
} from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export const Dashboard = ({
  profile,
  prediction,
  roleBenchmark,
  onNavigateToTab
}) => {
  const { readinessScore, classification, placementProbability, expectedSalaryRange, topPositiveDrivers, topNegativeDrivers, skillGaps, recommendations } = prediction;

  useEffect(() => {
    if (readinessScore >= 80) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [readinessScore]);

  let classBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  let classIcon = CheckCircle2;
  if (classification === 'Nearly Ready') {
    classBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    classIcon = AlertTriangle;
  } else if (classification === 'Needs Improvement') {
    classBadge = 'bg-red-500/20 text-red-300 border-red-500/30';
    classIcon = XCircle;
  }
  const ClassIcon = classIcon;

  const radarLabels = roleBenchmark.requiredSkills.map(s => s.name);
  const radarBenchmarkData = roleBenchmark.requiredSkills.map(s => s.minRequired);
  const radarStudentData = roleBenchmark.requiredSkills.map(s => profile.technicalSkills[s.name] || 0);

  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: `${profile.name} (Actual)`,
        data: radarStudentData,
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#818cf8',
        borderWidth: 2
      },
      {
        label: `${roleBenchmark.title} (Benchmark)`,
        data: radarBenchmarkData,
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderColor: '#ec4899',
        borderDash: [4, 4],
        borderWidth: 2
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        pointLabels: { color: '#cbd5e1', font: { size: 11, family: 'Plus Jakarta Sans' } },
        ticks: { color: '#64748b', backdropColor: 'transparent', stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        labels: { color: '#f1f5f9', font: { family: 'Plus Jakarta Sans' } }
      }
    },
    maintainAspectRatio: false
  };

  const barData = {
    labels: radarLabels,
    datasets: [
      {
        label: 'Student Level (%)',
        data: radarStudentData,
        backgroundColor: radarStudentData.map((val, idx) => 
          val >= radarBenchmarkData[idx] ? '#10b981' : '#f59e0b'
        ),
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' }, max: 100 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/0 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Details & Classification */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Target Role: {roleBenchmark.title}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${classBadge}`}>
                <ClassIcon className="w-3.5 h-3.5" />
                <span>Prediction: {classification}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {classification === 'Ready'
                ? `🚀 Excellent profile alignment! You exceed technical and practical requirements for the ${roleBenchmark.title} position.`
                : classification === 'Nearly Ready'
                ? `⚡ Strong foundational skills! With minor targeted improvements in ${skillGaps.map(s => s.skillName).slice(0, 2).join(' & ')}, you will achieve top-tier shortlist status.`
                : `📈 Your profile requires dedicated skill development in key benchmark areas before applying for high-tier ${roleBenchmark.title} roles.`}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateToTab('recommendations')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
              >
                <span>View Learning Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateToTab('assessment')}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Adjust Skills</span>
              </button>
            </div>
          </div>

          {/* Right Column: Readiness Score Dial Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center glass-card p-6 rounded-2xl border border-slate-800">
            <div className="relative w-44 h-44 flex items-center justify-center">
              
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-indigo-500 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * readinessScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                  {readinessScore}%
                </span>
                <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                  Readiness Score
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center mt-3">
              Composite index calculated across Technical Skills, Portfolio, CGPA, and Aptitude.
            </p>
          </div>

        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Placement Probability */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Placement Probability</p>
            <p className="text-2xl font-black text-white font-['Outfit']">{placementProbability}%</p>
            <p className="text-[10px] text-emerald-400 font-semibold">Campus & Off-Campus Hiring</p>
          </div>
        </div>

        {/* Expected Salary Range */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Expected Salary Band</p>
            <p className="text-2xl font-black text-white font-['Outfit']">{expectedSalaryRange}</p>
            <p className="text-[10px] text-purple-400 font-semibold">Entry-Level Fresher Package</p>
          </div>
        </div>

        {/* Missing Skills Count */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Identified Skill Gaps</p>
            <p className="text-2xl font-black text-white font-['Outfit']">{skillGaps.length}</p>
            <p className="text-[10px] text-amber-400 font-semibold">Skills Below Benchmark</p>
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Action Roadmap</p>
            <p className="text-2xl font-black text-white font-['Outfit']">{recommendations.length}</p>
            <p className="text-[10px] text-indigo-400 font-semibold">Personalized Milestones</p>
          </div>
        </div>

      </div>

      {/* Visual Analytics Grid: Radar & Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Radar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Skill Matrix Radar Analysis</h3>
              <p className="text-xs text-slate-400">Actual proficiency vs role benchmark requirements</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
              Interactive
            </span>
          </div>

          <div className="h-72 relative">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Technical Proficiency Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Skill Gap Breakdown</h3>
              <p className="text-xs text-slate-400">Green = Exceeds target | Amber = Improvement required</p>
            </div>
          </div>

          <div className="h-72 relative">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

      </div>

      {/* Explainable AI (XAI / SHAP) Feature Importance Drivers */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Brain className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Explainable AI (XAI) Model Feature Drivers</h3>
          <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-800 ml-auto font-bold">
            SHAP Attribution Model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Top Positive Drivers */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Positive Readiness Drivers (Boosted Score)
            </h4>

            {topPositiveDrivers.length > 0 ? (
              topPositiveDrivers.map((driver, idx) => (
                <div key={idx} className="glass-card p-3 rounded-xl border-l-4 border-l-emerald-500 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{driver.featureName}</span>
                    <span className="text-xs font-black text-emerald-400">+{driver.impactValue}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{driver.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No significant positive drivers identified yet.</p>
            )}
          </div>

          {/* Top Negative Drivers */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Negative Readiness Drivers (Skill Gaps)
            </h4>

            {topNegativeDrivers.length > 0 ? (
              topNegativeDrivers.map((driver, idx) => (
                <div key={idx} className="glass-card p-3 rounded-xl border-l-4 border-l-amber-500 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{driver.featureName}</span>
                    <span className="text-xs font-black text-amber-400">{driver.impactValue}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{driver.description}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No negative drivers! Perfect score alignment.</p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
