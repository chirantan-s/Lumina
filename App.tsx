
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/ui/Layout';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { CurriculumReveal } from './components/Curriculum';
import { DailySession } from './components/DailySession';
import { ProfileModal } from './components/ui/ProfileModal';
import { AppPhase, UserState, Role, Curriculum } from './types';
import { generateCurriculum, generateDailyContent } from './services/geminiService';
import { User, PlayCircle, RotateCcw, Lock, Loader2, BrainCircuit, Sparkles } from 'lucide-react';

const DEFAULT_USER: UserState = {
  name: '',
  email: '',
  role: 'Unassigned',
  objective: '',
  expertiseLevel: 1,
  dailyCommitment: '15 mins',
  currentDay: 0,
  totalDays: 30,
  lastQuizScore: 0,
  isReturningUser: false,
};

function App() {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.LOGIN);
  const [user, setUser] = useState<UserState>(DEFAULT_USER);
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [loading, setLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Ref to track if we are already generating content to prevent double-firing
  const generationRef = useRef(false); 

  useEffect(() => {
    const saved = localStorage.getItem('lumina_user');
    const savedCurriculum = localStorage.getItem('lumina_curriculum');
    
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser({ ...parsed, isReturningUser: true });
    }
    if (savedCurriculum) {
        setCurriculum(JSON.parse(savedCurriculum));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const mainContent = document.getElementById('main-content-area');
    if (mainContent) mainContent.scrollTo(0, 0);
  }, [phase]);

  // Remove the previous useEffect for pre-fetching. 
  // We now use handleQuizFinished to trigger it explicitly.

  const handleLogin = (name: string, email: string) => {
    if (user.isReturningUser && user.name) {
       setPhase(AppPhase.LOGIN); 
    } else {
       setUser(prev => ({ ...prev, name, email }));
       setPhase(AppPhase.ONBOARDING);
    }
  };

  const handleOnboardingComplete = async (role: Role, expertise: number, commitment: string, personaDescription: string, personaName: string, objective: string) => {
    setLoading(true);
    const updatedUser = { 
        ...user, 
        role, 
        objective,
        personaName, 
        expertiseLevel: expertise, 
        dailyCommitment: commitment,
        personaDescription,
        isReturningUser: true
    };
    setUser(updatedUser);
    
    const plan = await generateCurriculum(role, objective, expertise);
    setCurriculum(plan);
    
    setLoading(false);
    setPhase(AppPhase.CURRICULUM_REVEAL);
    localStorage.setItem('lumina_user', JSON.stringify(updatedUser));
    localStorage.setItem('lumina_curriculum', JSON.stringify(plan));
  };

  const startJourney = () => {
    const dayToStart = user.currentDay > 0 ? user.currentDay : 1;
    const startingUser = { ...user, currentDay: dayToStart };
    setUser(startingUser);
    localStorage.setItem('lumina_user', JSON.stringify(startingUser));
    setPhase(AppPhase.DAILY_LOOP);
  };

  // Triggered AS SOON as quiz is finished, running in background while user reads summary
  const handleQuizFinished = async (score: number) => {
      if (generationRef.current || !curriculum) return;
      
      const nextDay = user.currentDay + 1;
      // If buffer already has next day, skip
      if (user.contentBuffer?.day === nextDay) return;

      const nextDayTopic = curriculum.schedule.find(d => d.day === nextDay)?.topic;
      
      if (nextDayTopic) {
          console.log(`🔒 Neural Core: Background Synthesis Started for Day ${nextDay}...`);
          generationRef.current = true;
          
          // We calculate the *future* expertise level to generate correct content content
          // but we do NOT update the user state yet, user update happens in handleSessionComplete
          let futureExpertise = user.expertiseLevel;
          if (score >= 90) futureExpertise = Math.min(10, user.expertiseLevel + 1);
          if (score <= 50) futureExpertise = Math.max(1, user.expertiseLevel - 1);
          
          const tempUserState = { ...user, expertiseLevel: futureExpertise, lastQuizScore: score, currentDay: nextDay };

          // Generate asynchronously
          generateDailyContent(tempUserState, nextDayTopic).then((content) => {
              console.log(`🔓 Neural Core: Day ${nextDay} Ready in Background.`);
              
              // We need to update the user in state so that when they go to dashboard, buffer is there
              setUser(prev => {
                  const newUser = {
                    ...prev,
                    contentBuffer: {
                        day: nextDay,
                        topic: nextDayTopic,
                        data: content
                    }
                  };
                  localStorage.setItem('lumina_user', JSON.stringify(newUser));
                  return newUser;
              });
              generationRef.current = false;
          });
      }
  };

  const handleSessionComplete = (score: number) => {
      // Transition User State formally
      const nextDay = user.currentDay + 1;
      let newExpertise = user.expertiseLevel;
      if (score >= 90) newExpertise = Math.min(10, user.expertiseLevel + 1);
      if (score <= 50) newExpertise = Math.max(1, user.expertiseLevel - 1);

      // Note: we don't clear contentBuffer here if it matches nextDay, 
      // because handleQuizFinished might have already populated it!
      const updatedUser = { 
          ...user, 
          currentDay: nextDay, 
          lastQuizScore: score,
          expertiseLevel: newExpertise,
          isReturningUser: true
      };
      
      setUser(updatedUser);
      localStorage.setItem('lumina_user', JSON.stringify(updatedUser));
      setPhase(AppPhase.LOGIN);
  };

  const fullLogout = () => {
      localStorage.removeItem('lumina_user');
      localStorage.removeItem('lumina_curriculum');
      setUser(DEFAULT_USER);
      setCurriculum(null);
      setPhase(AppPhase.LOGIN);
      setIsProfileOpen(false);
  }

  if (phase === AppPhase.LOGIN && user.isReturningUser && user.name) {
      const nextDay = user.currentDay > 0 ? user.currentDay : 1;
      // Check if buffer is ready for the upcoming day
      const isBufferReady = user.contentBuffer?.day === nextDay;
      const dayTopic = curriculum?.schedule.find(d => d.day === nextDay)?.topic || "Fundamentals";

      return (
        <Layout showProfile user={user} onLogout={fullLogout} onOpenProfile={() => setIsProfileOpen(true)}>
             {isProfileOpen && (
                <ProfileModal 
                    user={user} 
                    curriculum={curriculum} 
                    onClose={() => setIsProfileOpen(false)} 
                />
            )}
            
            <div className="w-full max-w-2xl mx-auto bg-lumina-800/50 p-12 rounded-3xl border border-lumina-700 animate-fade-in-up backdrop-blur-md shadow-2xl mt-12">
                <div className="mb-10 text-center">
                    <div className="flex justify-center mb-4">
                        {isBufferReady ? (
                            <div className="p-3 bg-green-500/10 rounded-full border border-green-500/30">
                                <BrainCircuit className="w-8 h-8 text-green-400" />
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="absolute inset-0 bg-lumina-gold/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="p-3 bg-lumina-gold/10 rounded-full border border-lumina-gold/30 relative z-10">
                                    <Sparkles className="w-8 h-8 text-lumina-gold animate-pulse" />
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-lumina-gold font-mono text-xs uppercase tracking-widest mb-3">Neural Core Status: {isBufferReady ? "Online" : "Adapting"}</p>
                    <h2 className="text-5xl font-light text-white mb-4">Welcome back, {(user.name || '').split(' ')[0]}.</h2>
                    <p className="text-slate-400 text-lg">
                        {isBufferReady 
                         ? "Your adaptive module is calibrated and ready for deployment." 
                         : "Analyzing your recent assessment performance to restructure the upcoming module..."}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <button 
                        onClick={() => {
                            if (isBufferReady) setPhase(AppPhase.DAILY_LOOP);
                        }}
                        disabled={!isBufferReady}
                        className={`group w-full p-6 rounded-2xl shadow-lg transition-all flex items-center justify-between transform 
                            ${isBufferReady 
                                ? 'bg-gradient-to-r from-lumina-blue to-indigo-600 hover:from-lumina-glow hover:to-indigo-500 text-white hover:scale-[1.02] cursor-pointer' 
                                : 'bg-lumina-900 border border-lumina-700 cursor-not-allowed opacity-90'
                            }`}
                    >
                        <div className="text-left flex-1">
                            <p className={`font-bold text-xl mb-1 ${!isBufferReady ? 'text-slate-400' : ''}`}>
                                {isBufferReady ? 'Resume Session' : 'Optimizing Curriculum...'}
                            </p>
                            <p className={`${isBufferReady ? 'text-blue-100' : 'text-slate-500'} text-sm uppercase tracking-wider`}>
                                Day {nextDay}: {dayTopic}
                            </p>
                            {!isBufferReady && (
                                <div className="mt-4 flex flex-col gap-2">
                                     <div className="w-full max-w-[200px] h-1 bg-lumina-950 rounded-full overflow-hidden">
                                        <div className="h-full bg-lumina-gold animate-progress-indeterminate"></div>
                                     </div>
                                     <span className="text-[10px] text-lumina-gold/70 font-mono animate-pulse">RE-ALIGNING COMPLEXITY VECTORS</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="relative">
                            {isBufferReady ? (
                                <>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white/20"></div>
                                    <PlayCircle className="w-10 h-10 opacity-80 group-hover:scale-110 transition-transform" />
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-1">
                                    <Lock className="w-8 h-8 text-slate-600" />
                                </div>
                            )}
                        </div>
                    </button>

                    <div className="grid grid-cols-2 gap-6">
                        <button 
                            onClick={() => setIsProfileOpen(true)}
                            className="bg-lumina-900/50 border border-lumina-700 hover:border-lumina-blue/50 text-slate-300 hover:text-white p-5 rounded-2xl transition-all flex flex-col items-center justify-center gap-2"
                        >
                            <User className="w-8 h-8 text-lumina-gold" />
                            <span className="font-medium">View Profile</span>
                        </button>
                        <button 
                            onClick={fullLogout}
                            className="bg-lumina-900/50 border border-lumina-700 hover:border-red-500/50 text-slate-300 hover:text-white p-5 rounded-2xl transition-all flex flex-col items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-8 h-8 text-slate-500" />
                            <span className="font-medium">Reset Path</span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
      )
  }

  return (
    <Layout showProfile={phase !== AppPhase.LOGIN} user={user} onLogout={fullLogout} onOpenProfile={() => setIsProfileOpen(true)}>
      {isProfileOpen && (
        <ProfileModal 
            user={user} 
            curriculum={curriculum} 
            onClose={() => setIsProfileOpen(false)} 
        />
      )}

      {phase === AppPhase.LOGIN && (
        <Login onLogin={handleLogin} />
      )}

      {phase === AppPhase.ONBOARDING && (
          loading ? (
            <div className="flex flex-col items-center justify-center h-full w-full animate-fade-in-up">
                <div className="relative w-24 h-24 mb-6">
                     <div className="absolute inset-0 border-4 border-lumina-blue/30 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-lumina-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-3xl font-light text-white mb-2">Architecting Neural Path</h3>
                <p className="text-slate-400 text-lg">Synthesizing {user.objective} focused curriculum...</p>
            </div>
          ) : (
            <Onboarding onComplete={handleOnboardingComplete} />
          )
      )}

      {phase === AppPhase.CURRICULUM_REVEAL && curriculum && (
         <div className="max-w-3xl mx-auto py-12">
            <CurriculumReveal data={curriculum} role={user.role} personaName={user.personaName} onStart={startJourney} />
         </div>
      )}

      {phase === AppPhase.DAILY_LOOP && (
        <DailySession 
            user={user} 
            topic={curriculum?.schedule.find(d => d.day === user.currentDay)?.topic || "Introduction to AI"} 
            onComplete={handleSessionComplete}
            onQuizFinished={handleQuizFinished}
        />
      )}
    </Layout>
  );
}

export default App;
