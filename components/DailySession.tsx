
import React, { useState, useEffect } from 'react';
import { DailyContent, UserState, VisualStep } from '../types';
import { generateDailyContent } from '../services/geminiService';
import { Play, CheckCircle, BarChart2, Lightbulb, Clock, ArrowLeft, Share2, Hexagon, FileText, ExternalLink, Network, Layers, ArrowRight, Database, Monitor, Cpu, HelpCircle, RefreshCw, Zap, AlertTriangle, Terminal } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DailySessionProps {
  user: UserState;
  topic: string;
  onComplete: (score: number) => void;
  onQuizFinished: (score: number) => void; // Trigger background gen
}

const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const ArchitectureFlow = ({ steps }: { steps: VisualStep[] }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-4">
            {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                let Icon = Monitor;
                let colorClass = "border-slate-500 text-slate-300";
                switch(step.type) {
                    case 'input': Icon = FileText; colorClass="border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(96,165,250,0.3)]"; break;
                    case 'process': Icon = Cpu; colorClass="border-indigo-400 text-indigo-300 shadow-[0_0_15px_rgba(129,140,248,0.3)]"; break;
                    case 'decision': Icon = HelpCircle; colorClass="border-lumina-gold text-yellow-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]"; break;
                    case 'output': Icon = CheckCircle; colorClass="border-green-400 text-green-300 shadow-[0_0_15px_rgba(74,222,128,0.3)]"; break;
                    case 'storage': Icon = Database; colorClass="border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"; break;
                }
                return (
                    <div key={step.id} className="flex items-center gap-2 md:gap-4 group">
                        <div className={`relative w-28 h-20 md:w-32 md:h-24 rounded-xl border-2 ${colorClass} bg-black/40 backdrop-blur-md flex flex-col items-center justify-center p-2 text-center transition-transform hover:scale-105 hover:bg-white/5`}>
                             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-2 text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest">{step.type}</div>
                             <Icon className="w-5 h-5 md:w-6 md:h-6 mb-1 md:mb-2 opacity-80" />
                             <p className="text-[10px] md:text-xs font-bold text-white leading-tight">{step.label}</p>
                             {step.subLabel && <p className="text-[9px] md:text-[10px] text-slate-400 mt-0.5">{step.subLabel}</p>}
                        </div>
                        {!isLast && (<div className="text-slate-600"><ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></div>)}
                    </div>
                );
            })}
        </div>
    );
};

const GenerationLoader = () => {
    const CIRCUMFERENCE = 364.4;
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("Aligning with your objective...");
    const [timeLeft, setTimeLeft] = useState(30); 

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => { if (prev >= 98) return 98; return prev + (100 / 300); });
            setTimeLeft(prev => { if (prev <= 0) return 0; return prev - 0.1; });
        }, 100);
        const timeouts = [
            setTimeout(() => setMessage("Synthesizing practical exercises..."), 4000),
            setTimeout(() => setMessage("Optimizing for your expertise level..."), 10000),
            setTimeout(() => setMessage("Finalizing neural pathways..."), 18000),
        ];
        return () => { clearInterval(interval); timeouts.forEach(clearTimeout); };
    }, []);

    const isOvertime = timeLeft <= 0;

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] w-full animate-fade-in-up">
            <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-lumina-blue/10"></div>
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-lumina-blue transition-all duration-300 ease-linear" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Hexagon className="w-16 h-16 text-lumina-gold animate-pulse-slow stroke-[1.5]" />
                </div>
            </div>
            <h3 className="text-2xl font-light text-white tracking-widest uppercase mb-2">Curating Content</h3>
            <p className="text-lumina-blue font-mono text-sm mb-6 animate-pulse">{isOvertime ? "Polishing final details..." : message}</p>
            <div className={`px-4 py-2 rounded-full border flex items-center gap-3 transition-colors ${isOvertime ? 'bg-amber-500/10 border-amber-500/20' : 'bg-white/5 border-white/10'}`}>
                <Clock className={`w-4 h-4 ${isOvertime ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className={`text-xs font-mono ${isOvertime ? 'text-amber-200' : 'text-slate-300'}`}>
                    {isOvertime ? "Finishing up..." : <>Est. Remaining: <span className="text-white font-bold">{Math.ceil(timeLeft)}s</span></>}
                </span>
            </div>
        </div>
    );
};

export const DailySession: React.FC<DailySessionProps> = ({ user, topic, onComplete, onQuizFinished }) => {
  const [content, setContent] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'QUIZ' | 'CONTENT' | 'DASHBOARD'>('CONTENT');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [isPlayingVisual, setIsPlayingVisual] = useState(false);

  // Robust Scroll-to-Top Logic
  useEffect(() => {
      // Small timeout ensures the DOM has fully updated with the new step content before scrolling
      const timer = setTimeout(() => {
          const main = document.getElementById('main-content-area');
          if (main) {
              main.scrollTop = 0;
          }
          window.scrollTo(0, 0);
      }, 50);

      return () => clearTimeout(timer);
  }, [step, user.currentDay]);

  const loadContent = async (forceRefresh = false) => {
    setLoading(true);
    setStep('CONTENT');
    setQuizAnswers([]);
    setQuizScore(0);
    setIsPlayingVisual(false);

    if (!forceRefresh && user.contentBuffer && user.contentBuffer.day === user.currentDay && user.contentBuffer.topic === topic) {
        setContent(user.contentBuffer.data);
        setLoading(false);
        return;
    }

    const cacheKey = `lumina_content_${user.role}_${user.objective}_day_${user.currentDay}_${topic}`;
    if (forceRefresh) localStorage.removeItem(cacheKey);
    const cached = localStorage.getItem(cacheKey);
    if (cached && !forceRefresh) {
        try { setContent(JSON.parse(cached)); setLoading(false); return; } catch (e) { localStorage.removeItem(cacheKey); }
    }

    const start = Date.now();
    const data = await generateDailyContent(user, topic);
    const duration = Date.now() - start;
    if (duration < 3000 && !user.contentBuffer) await new Promise(r => setTimeout(r, 3000 - duration));
    
    if (!data.dayTitle.includes("Unavailable")) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    setContent(data);
    setLoading(false);
  };

  useEffect(() => { loadContent(); }, [user.currentDay, topic, user.role]);

  const handleQuizSubmit = (index: number, answerIdx: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = answerIdx;
    setQuizAnswers(newAnswers);
  };

  const finishQuiz = () => {
    if (!content?.quiz) return;
    let correct = 0;
    content.quiz.forEach((q, i) => { if (q.correctIndex === quizAnswers[i]) correct++; });
    const score = (correct / content.quiz.length) * 100;
    setQuizScore(score);
    
    // TRIGGER BACKGROUND GENERATION
    onQuizFinished(score);

    setStep('DASHBOARD');
  };

  const startQuiz = () => {
    setStep('QUIZ');
  };

  if (loading) return <GenerationLoader />;

  if (!content || content.dayTitle.includes("Unavailable")) return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 animate-fade-in-up">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 mb-2"><AlertTriangle className="w-10 h-10 text-red-400" /></div>
          <div className="text-center max-w-md">
              <h2 className="text-2xl font-light text-white mb-2">Synthesis Failed</h2>
              <p className="text-slate-400">High latency detected. Please retry.</p>
          </div>
          <button onClick={() => loadContent(true)} className="flex items-center gap-2 px-6 py-3 bg-lumina-blue hover:bg-lumina-glow rounded-xl text-white transition-all shadow-lg"><RefreshCw className="w-4 h-4" /> Force Regenerate</button>
      </div>
  );

  if (step === 'QUIZ') {
    return (
        <div className="max-w-3xl mx-auto py-12 animate-fade-in-up">
            <div className="mb-8 flex justify-between items-end">
                <div><span className="text-lumina-gold font-mono text-xs uppercase tracking-widest">Assessment</span><h2 className="text-3xl font-light text-white mt-2">Knowledge Verification</h2></div>
                <button onClick={() => loadContent(true)} className="text-xs text-slate-500 hover:text-white flex items-center gap-2 mb-2"><RefreshCw className="w-3 h-3" /> Restart</button>
            </div>
            <div className="space-y-6">
                {content.quiz?.map((q, idx) => (
                    <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5">
                        <p className="text-lg font-light text-slate-200 mb-6"><span className="text-lumina-blue font-bold mr-2">{idx + 1}.</span> {q.question}</p>
                        <div className="grid grid-cols-1 gap-3">
                            {q.options.map((opt, optIdx) => (
                                <button key={optIdx} onClick={() => handleQuizSubmit(idx, optIdx)} className={`w-full text-left px-6 py-4 rounded-xl border transition-all font-light ${quizAnswers[idx] === optIdx ? 'bg-lumina-blue/20 border-lumina-blue text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}>{opt}</button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={finishQuiz} disabled={quizAnswers.length !== content.quiz?.length} className="w-full mt-10 bg-lumina-blue hover:bg-lumina-glow text-white font-medium py-4 rounded-xl disabled:opacity-50 transition-all">Submit & Continue</button>
        </div>
    );
  }

  if (step === 'DASHBOARD') {
      const data = [{ name: 'Completed', value: user.totalDays > 0 ? (user.currentDay / user.totalDays) * 100 : 0 }, { name: 'Remaining', value: 100 - ((user.currentDay / user.totalDays) * 100) }];
      return (
          <div className="max-w-4xl mx-auto py-12 animate-fade-in-up space-y-8">
              <div className="glass-card border border-white/5 rounded-3xl p-10 shadow-2xl bg-lumina-950/80">
                  <h2 className="text-3xl font-light text-white mb-8 flex items-center gap-3"><BarChart2 className="text-lumina-gold w-8 h-8" /> Session Complete</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="bg-white/5 rounded-2xl p-8 border border-white/5">
                            <table className="w-full text-left mb-6"><tbody><tr className="h-16"><td className="text-slate-400">Status</td><td className="text-green-400 text-right">Success</td></tr><tr className="h-16"><td className="text-slate-400">Score</td><td className="text-white text-right">{Math.round(quizScore)}%</td></tr></tbody></table>
                      </div>
                      <div className="w-56 h-56 mx-auto relative">
                           <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">{Math.round(data[0].value)}%</div>
                           <ResponsiveContainer><PieChart><Pie data={data} innerRadius={80} outerRadius={100} dataKey="value"><Cell fill="#6366f1" /><Cell fill="#1e293b" /></Pie></PieChart></ResponsiveContainer>
                      </div>
                  </div>
              </div>
              <div className="text-center pt-8"><button onClick={() => onComplete(quizScore)} className="w-full max-w-sm bg-lumina-blue text-white py-4 rounded-xl">Return to Dashboard</button></div>
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up pb-12">
      <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3 text-lumina-blue font-mono text-xs uppercase tracking-widest mb-3">
                    <span className="px-2 py-1 bg-lumina-blue/10 rounded border border-lumina-blue/20">Day {user.currentDay}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-lumina-gold uppercase text-[10px] tracking-widest">{user.objective} Track</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">{content.dayTitle}</h1>
            </div>
            <button onClick={() => loadContent(true)} className="text-slate-500 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
          </div>

          <div className="space-y-8">
            {content.sections.map((section, idx) => (
                <div key={idx} className="glass-card p-8 rounded-2xl border-l-2 border-l-lumina-blue">
                    <h3 className="text-2xl font-medium text-white mb-4 flex items-center gap-3"><Lightbulb className="w-5 h-5 text-lumina-gold" />{section.header}</h3>
                    <div className="text-slate-300 text-lg leading-relaxed space-y-4 font-light">
                        {(section.body || '').split('\n').map((para, pIdx) => <p key={pIdx}>{renderFormattedText(para)}</p>)}
                    </div>
                </div>
            ))}
          </div>

          {/* NEW PRACTICAL TASK MODULE */}
          {content.practicalTask && (
             <div className="bg-gradient-to-br from-indigo-900/30 to-lumina-900 border border-lumina-blue/30 rounded-2xl p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10"><Terminal className="w-24 h-24 text-lumina-blue" /></div>
                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-lumina-gold" /> Neural Lab: Practical Application</h3>
                 <p className="text-slate-400 mb-6">{content.practicalTask.description}</p>
                 <div className="space-y-3">
                     {content.practicalTask.actionItems.map((item, i) => (
                         <div key={i} className="flex items-start gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
                             <div className="mt-1 w-5 h-5 rounded-full bg-lumina-blue/20 flex items-center justify-center text-xs font-bold text-lumina-blue">{i + 1}</div>
                             <p className="text-slate-200 text-sm font-mono">{item}</p>
                         </div>
                     ))}
                 </div>
             </div>
          )}

          {content.deepDive && (
            <div className="bg-gradient-to-br from-lumina-900 to-black border border-lumina-glassBorder rounded-2xl overflow-hidden mt-8 shadow-2xl relative">
                <div className="p-8 relative z-10">
                    <div className="bg-black/20 rounded-xl border border-white/10 p-2 md:p-4 mb-6">
                        {content.deepDive.visualSteps && <ArchitectureFlow steps={content.deepDive.visualSteps} />}
                    </div>
                    <h4 className="text-white font-medium text-lg mb-3">Analysis</h4>
                    <p className="text-slate-400 leading-relaxed font-light text-lg">{renderFormattedText(content.deepDive.explanation || '')}</p>
                </div>
            </div>
          )}
           
           <div className="pt-8 flex justify-between items-center border-t border-white/5 mt-8">
              <button className="text-slate-500 hover:text-white flex items-center gap-2"><Share2 className="w-4 h-4" /> Share Node</button>
              <button onClick={startQuiz} className="bg-lumina-blue hover:bg-lumina-glow text-white font-medium py-4 px-12 rounded-xl transition-all">Proceed to Verification</button>
           </div>
      </div>

      <div className="lg:col-span-1 space-y-6 sticky top-8 h-fit">
             <div onClick={() => setIsPlayingVisual(!isPlayingVisual)} className={`rounded-2xl overflow-hidden bg-black border border-lumina-glassBorder aspect-[4/3] relative group shadow-2xl cursor-pointer ${isPlayingVisual ? 'ring-2 ring-lumina-gold/50' : ''}`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
                    {isPlayingVisual ? (
                        <div className="animate-fade-in-up">
                            <p className="text-white font-medium text-lg leading-snug drop-shadow-lg">"{content.visualConcept}"</p>
                            <p className="text-xs text-lumina-gold mt-4 uppercase tracking-widest animate-pulse">Simulating Concept...</p>
                        </div>
                    ) : (
                        <div className="absolute bottom-6 left-6 right-6">
                             <p className="text-[10px] text-lumina-gold font-bold uppercase tracking-widest mb-1">Interactive Simulation</p>
                             <p className="text-white/60 text-sm truncate">Tap to visualize concept</p>
                        </div>
                    )}
                </div>
             </div>
             <div className="glass-card border border-white/5 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 text-[10px] uppercase tracking-widest">Session Telemetry</h4>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-400"><Clock className="w-4 h-4 text-lumina-blue" /><span className="text-sm font-light">~{user.dailyCommitment} read time</span></div>
                    <div className="flex items-center gap-3 text-slate-400"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-sm font-light">{content.quiz?.length || 5} Knowledge Checks</span></div>
                    <div className="flex items-center gap-3 text-slate-400"><Zap className="w-4 h-4 text-amber-500" /><span className="text-sm font-light">1 Practical Lab</span></div>
                </div>
             </div>
      </div>
    </div>
  );
};
