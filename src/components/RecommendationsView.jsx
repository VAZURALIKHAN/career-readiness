import React, { useState } from 'react';
import { CheckSquare, BookOpen, Wrench, Code2, Award, Clock, CheckCircle2 } from 'lucide-react';

export const RecommendationsView = ({ recommendations }) => {
  const [completedIds, setCompletedIds] = useState([]);

  const toggleComplete = (id) => {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter(i => i !== id));
    } else {
      setCompletedIds([...completedIds, id]);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Learn': return BookOpen;
      case 'Project': return Wrench;
      case 'Practice': return Code2;
      case 'Certify': return Award;
      default: return CheckSquare;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <CheckSquare className="w-3.5 h-3.5" />
                Personalized Learning Roadmap
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {completedIds.length} / {recommendations.length} Completed
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-3">
              Actionable Recommendations & Learning Roadmap
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              AI-generated step-by-step action items to bridge your identified skill gaps, build capstone projects, and reach 90%+ readiness.
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => {
          const Icon = getIcon(rec.type);
          const isDone = completedIds.includes(rec.id);

          return (
            <div
              key={rec.id}
              className={`glass-panel p-6 rounded-2xl border transition-all space-y-4 ${
                isDone
                  ? 'border-emerald-500/50 bg-emerald-950/10 opacity-75'
                  : 'border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                    rec.type === 'Learn' ? 'bg-indigo-600' :
                    rec.type === 'Project' ? 'bg-purple-600' :
                    rec.type === 'Practice' ? 'bg-pink-600' : 'bg-emerald-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">
                      {rec.type} Action
                    </span>
                    <h3 className="font-extrabold text-base text-white">{rec.title}</h3>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  rec.priority === 'High'
                    ? 'text-pink-400 bg-pink-950/40 border-pink-800'
                    : 'text-amber-400 bg-amber-950/40 border-amber-800'
                }`}>
                  {rec.priority} Priority
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Estimated: {rec.estimatedTime}
                </span>

                <button
                  onClick={() => toggleComplete(rec.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
