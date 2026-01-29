
import React from 'react';
import { User, LogOut, LayoutDashboard, Map, Hexagon, BrainCircuit } from 'lucide-react';
import { UserState } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  showProfile?: boolean;
  user?: UserState;
  onLogout?: () => void;
  onOpenProfile?: () => void;
}

// Sophisticated Logo Component
const LuminaLogo = ({ large = false }: { large?: boolean }) => (
  <div className={`relative flex items-center justify-center ${large ? 'w-16 h-16' : 'w-10 h-10'}`}>
      <div className="absolute inset-0 bg-lumina-blue/20 blur-xl rounded-full"></div>
      <Hexagon className={`absolute ${large ? 'w-16 h-16' : 'w-10 h-10'} text-lumina-blue stroke-[1.5]`} />
      <BrainCircuit className={`absolute ${large ? 'w-8 h-8' : 'w-5 h-5'} text-white/90`} />
      <div className="absolute top-0 right-0 w-2 h-2 bg-lumina-gold rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse"></div>
  </div>
);

export const Layout: React.FC<LayoutProps> = ({ children, showProfile, user, onLogout, onOpenProfile }) => {
  // Login Screen Layout (Split Screen)
  if (!showProfile) {
      return (
        <div className="min-h-screen bg-lumina-950 text-slate-200 flex overflow-hidden selection:bg-lumina-blue selection:text-white font-sans">
            {/* Left Side - Value Prop (Desktop Only) */}
            <div className="hidden lg:flex w-5/12 bg-lumina-900/40 relative flex-col justify-between p-10 border-r border-lumina-glassBorder">
                 {/* Background FX */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
                 <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-lumina-blue/10 rounded-full blur-[150px]"></div>
                 
                 <div className="z-10 mt-6">
                     <div className="flex items-center gap-4 mb-6">
                        <LuminaLogo large />
                        <span className="text-2xl font-light tracking-[0.2em] text-white uppercase">Lumina</span>
                     </div>
                     <h1 className="text-5xl font-light mt-4 leading-tight tracking-tight text-white">
                        Clarity in <br/>Complexity.
                     </h1>
                     <p className="text-2xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-lumina-blue to-indigo-300 font-light">
                        Your Adaptive AI Journey.
                     </p>
                 </div>

                 <div className="z-10 space-y-8 mb-6">
                     <div className="glass-card p-8 rounded-2xl border-l-4 border-l-lumina-gold bg-black/40 shadow-2xl backdrop-blur-xl">
                        <h3 className="text-lumina-gold font-mono text-xs uppercase tracking-widest mb-3">Core Objective</h3>
                        <p className="text-lg text-slate-200 font-light leading-relaxed">
                            "Lumina transforms generic AI concepts into actionable strategies tailored specifically for your professional growth. Learn how to leverage GenAI to drive impact."
                        </p>
                     </div>
                     
                     <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                             <div className="w-8 h-8 rounded-full bg-lumina-blue/10 flex items-center justify-center border border-lumina-blue/20">
                                <User className="w-4 h-4 text-lumina-blue" />
                             </div>
                             <span>Personalized "The Visionary" Personas</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                             <div className="w-8 h-8 rounded-full bg-lumina-gold/10 flex items-center justify-center border border-lumina-gold/20">
                                <LayoutDashboard className="w-4 h-4 text-lumina-gold" />
                             </div>
                             <span>Real-world Tech Use Cases</span>
                        </div>
                     </div>
                 </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-7/12 flex flex-col items-center justify-center p-6 relative z-10 bg-lumina-950">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
                 <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[100px]"></div>

                 {/* Mobile Header */}
                 <div className="lg:hidden mb-12 flex flex-col items-center">
                    <LuminaLogo />
                    <h1 className="text-2xl font-light mt-4 text-white">Lumina</h1>
                 </div>

                 <main className="w-full max-w-md relative z-10">
                    {children}
                </main>
            </div>
        </div>
      );
  }

  // Dashboard Layout
  return (
    <div className="min-h-screen bg-lumina-950 text-slate-200 flex overflow-hidden selection:bg-lumina-blue selection:text-white font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[150px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-lumina-blue/5 rounded-full blur-[120px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
      </div>

      {/* Desktop Sidebar - Glass Aesthetic */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 z-20 border-r border-lumina-glassBorder bg-lumina-950/60 backdrop-blur-xl">
        <div className="p-8">
            <div className="flex items-center gap-4 mb-12 group cursor-default">
                <LuminaLogo />
                <div>
                    <h1 className="text-2xl font-light text-white tracking-widest uppercase group-hover:text-glow transition-all">Lumina</h1>
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1 h-1 rounded-full bg-lumina-gold"></div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">Personal</p>
                    </div>
                </div>
            </div>

            <nav className="space-y-2">
                <button className="w-full flex items-center gap-4 px-5 py-4 bg-white/5 text-white rounded-xl border border-white/5 transition-all hover:border-lumina-blue/30 hover:bg-white/10 group shadow-lg shadow-black/20">
                    <LayoutDashboard className="w-5 h-5 text-lumina-blue group-hover:text-white transition-colors" />
                    <span className="font-light tracking-wide text-sm">Current Session</span>
                </button>
                <button 
                    onClick={onOpenProfile}
                    className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                    <Map className="w-5 h-5" />
                    <span className="font-light tracking-wide text-sm">Neural Map</span>
                </button>
            </nav>
        </div>

        <div className="mt-auto p-8 border-t border-lumina-glassBorder">
            {user && (
                <div 
                    onClick={onOpenProfile}
                    className="flex items-center gap-4 mb-6 cursor-pointer group"
                >
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lumina-blue to-indigo-400 flex items-center justify-center text-white font-medium shadow-lg shadow-indigo-500/20 group-hover:ring-2 ring-white/20 transition-all">
                            {user.name.charAt(0)}
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-lumina-950 rounded-full"></div>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate group-hover:text-lumina-blue transition-colors">{user.name}</p>
                        {/* PERSONA NAME INSTEAD OF ROLE */}
                        <p className="text-xs text-lumina-gold/80 truncate font-mono mt-0.5 uppercase tracking-wider">{user.personaName || user.role}</p>
                    </div>
                </div>
            )}
            <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-xs text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest font-medium pl-1"
            >
                <LogOut className="w-3 h-3" /> Terminate Session
            </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-30 bg-lumina-950/80 backdrop-blur-xl border-b border-lumina-glassBorder px-6 py-4 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <LuminaLogo />
            <span className="font-light text-lg tracking-widest text-white uppercase">Lumina</span>
         </div>
         <button onClick={onOpenProfile} className="p-2 border border-white/10 rounded-full bg-white/5">
            <User className="w-5 h-5 text-slate-300" />
         </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto z-10 pt-24 lg:pt-0 scroll-smooth">
        <div className="w-full max-w-7xl mx-auto p-6 lg:p-12">
            {children}
        </div>
      </main>
    </div>
  );
};
