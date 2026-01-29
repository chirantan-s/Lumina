
import React from 'react';
import { UserState, Curriculum } from '../../types';
import { X, User, Target, Zap, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProfileModalProps {
  user: UserState;
  curriculum: Curriculum | null;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, curriculum, onClose }) => {
  const data = [
    { name: 'Completed', value: user.totalDays > 0 ? (user.currentDay / user.totalDays) * 100 : 0 },
    { name: 'Remaining', value: 100 - ((user.currentDay / user.totalDays) * 100) },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-lumina-900/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-lumina-800/90 border border-lumina-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in-up">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-lumina-700 rounded-full transition-colors"
        >
            <X className="w-6 h-6" />
        </button>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Identity & Key Stats */}
            <div className="md:col-span-1 space-y-8 border-b md:border-b-0 md:border-r border-lumina-700 pb-8 md:pb-0 md:pr-8">
                <div className="text-center md:text-left">
                    <div className="w-20 h-20 bg-gradient-to-br from-lumina-blue to-indigo-600 rounded-full mx-auto md:mx-0 flex items-center justify-center shadow-lg shadow-lumina-blue/30 mb-4">
                         <span className="text-3xl font-bold text-white">{user.name.charAt(0)}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-slate-400 text-sm mb-2">{user.email}</p>
                    <span className="inline-block px-3 py-1 bg-lumina-gold/10 text-lumina-gold border border-lumina-gold/20 rounded-full text-xs font-bold uppercase tracking-wider">
                        {user.personaName || user.role}
                    </span>
                </div>

                <div className="space-y-4">
                     <div className="bg-lumina-900/50 p-4 rounded-xl border border-lumina-700 flex items-center gap-3">
                        <Clock className="text-slate-500 w-5 h-5" />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Daily Commitment</p>
                            <p className="text-white font-medium">{user.dailyCommitment}</p>
                        </div>
                     </div>
                     <div className="bg-lumina-900/50 p-4 rounded-xl border border-lumina-700 flex items-center gap-3">
                        <Zap className="text-lumina-blue w-5 h-5" />
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Expertise Level</p>
                            <div className="flex gap-1 mt-1">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={`w-1.5 h-3 rounded-sm ${i < user.expertiseLevel ? 'bg-lumina-blue' : 'bg-lumina-700'}`}></div>
                                ))}
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            {/* Column 2 & 3: Analysis & Progress */}
            <div className="md:col-span-2 space-y-8">
                {/* Neural Match Section */}
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                        <Target className="text-lumina-gold" /> Neural Match Analysis
                    </h3>
                    <div className="bg-lumina-900/50 border border-lumina-700 p-6 rounded-xl">
                        <p className="text-slate-300 leading-relaxed italic">
                            "{user.personaDescription || "Based on your inputs, Lumina has optimized your curriculum for high-impact learning relative to your functional role."}"
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Trajectory */}
                     <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Trajectory</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            innerRadius={35}
                                            outerRadius={45}
                                            startAngle={90}
                                            endAngle={-270}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#334155" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{Math.round(data[0].value)}%</p>
                                <p className="text-xs text-slate-500">Course Completion</p>
                                <p className="text-xs text-slate-500 mt-1">Day {user.currentDay} of {user.totalDays}</p>
                            </div>
                        </div>
                     </div>

                     {/* Upcoming */}
                     <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Next Modules</h3>
                        <div className="space-y-3">
                            {/* Logic: Show upcoming starting from the CURRENT active day */}
                            {curriculum?.schedule
                                .filter(d => d.day >= user.currentDay)
                                .slice(0, 3)
                                .map(d => (
                                <div key={d.day} className="flex items-center gap-3 text-sm">
                                    <span className="w-6 h-6 rounded bg-lumina-700 flex items-center justify-center text-xs text-slate-400">{d.day}</span>
                                    <span className="text-slate-300 truncate">{d.title}</span>
                                </div>
                            ))}
                            {!curriculum && <p className="text-slate-600 text-sm">Curriculum loading...</p>}
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
