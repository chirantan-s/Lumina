import React from 'react';
import { Curriculum, Role } from '../types';
import { CheckCircle, Calendar, ChevronRight, AlertCircle } from 'lucide-react';

interface CurriculumProps {
  data: Curriculum;
  role: Role;
  personaName?: string;
  onStart: () => void;
}

export const CurriculumReveal: React.FC<CurriculumProps> = ({ data, role, personaName, onStart }) => {
  // Safe guard: Ensure schedule exists
  const schedule = data?.schedule || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete.</h2>
        <p className="text-slate-400">
            Based on your role as <span className="text-lumina-gold font-bold">{personaName || role}</span>, 
            Lumina has architected the following neural pathway.
        </p>
      </div>

      <div className="bg-lumina-800/50 border border-lumina-700 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-lumina-700 flex justify-between items-center bg-lumina-800">
            <div>
                <h3 className="text-xl font-bold text-white">{data?.trackName || "Custom Track"}</h3>
                <p className="text-sm text-slate-400">{data?.description || "Your personalized learning journey."}</p>
            </div>
            <div className="px-3 py-1 bg-lumina-blue/10 text-lumina-blue border border-lumina-blue/20 rounded-full text-xs font-bold uppercase">
                4 Weeks
            </div>
        </div>
        
        <div className="divide-y divide-lumina-700/50">
            {schedule.length > 0 ? (
                schedule.slice(0, 5).map((day) => (
                <div key={day.day} className="p-4 flex items-center gap-4 hover:bg-lumina-700/30 transition-colors group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-lumina-900 border border-lumina-700 flex flex-col items-center justify-center text-slate-400 group-hover:border-lumina-gold/50 group-hover:text-lumina-gold transition-colors">
                        <span className="text-xs uppercase">Day</span>
                        <span className="font-bold">{day.day}</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-white font-medium">{day.title}</h4>
                        <p className="text-sm text-slate-500">{day.topic}</p>
                    </div>
                    <div className="text-slate-600">
                        {day.day === 1 ? <div className="text-xs text-lumina-blue font-bold px-2 py-1 bg-lumina-blue/10 rounded">START</div> : <Calendar className="w-4 h-4" />}
                    </div>
                </div>
            ))
            ) : (
                <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
                    <AlertCircle className="w-8 h-8 text-slate-600" />
                    <p>Curriculum data is initializing. Please click Initialize to start Day 1.</p>
                </div>
            )}
            
            <div className="p-4 text-center text-xs text-slate-500 uppercase tracking-widest">
                + 3 Weeks Remaining
            </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button 
            onClick={onStart}
            className="bg-lumina-gold hover:bg-yellow-400 text-lumina-900 font-bold py-4 px-8 rounded-full shadow-lg shadow-lumina-gold/20 flex items-center gap-2 transition-transform hover:scale-105"
        >
            <span>Initialize Day 1</span>
            <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};