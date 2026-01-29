
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Brain, Network, Target, Clock, Zap, Hexagon } from 'lucide-react';
import { Role } from '../types';
import { generatePersonaFromInputs } from '../services/geminiService';

interface OnboardingProps {
  onComplete: (role: Role, expertise: number, commitment: string, personaDescription: string, personaName: string, objective: string) => void;
}

const STEPS = [
    {
        id: 'role',
        icon: Target,
        insight: "Your role defines the architectural complexity of the models.",
        question: "What is your primary focus?",
        options: [
            "Business Strategy & Ops",
            "Product Management",
            "Engineering / Dev",
            "Executive Leadership",
            "System Architecture",
            "HR / People Ops"
        ]
    },
    {
        id: 'objective',
        icon: Brain,
        insight: "Lumina filters noise to focus on impact.",
        question: "Primary Goal?",
        options: [
            "Boost Personal Productivity",
            "Build AI-Powered Products",
            "Strategic Decision Making",
            "Deep Technical Mastery"
        ]
    },
    {
        id: 'expertise',
        icon: Zap,
        insight: "Calibrating technical depth...",
        question: "GenAI Familiarity?",
        options: [
            "Beginner (What is GenAI?)",
            "Intermediate (I use ChatGPT)",
            "Advanced (I build models)"
        ]
    },
    {
        id: 'time',
        icon: Clock,
        insight: "Consistency matters more than intensity.",
        question: "Daily Availability?",
        options: [
            "5-10 mins (Micro-learning)",
            "15-20 mins (Standard)",
            "30+ mins (Deep Dive)"
        ]
    }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optionalInput, setOptionalInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  const startCalibration = () => {
    setFadeState('out');
    setTimeout(() => {
        setShowIntro(false);
        setFadeState('in');
    }, 400);
  };

  const handleBack = () => {
      if (currentStepIndex > 0) {
          setFadeState('out');
          setTimeout(() => {
              setCurrentStepIndex(prev => prev - 1);
              setFadeState('in');
          }, 300);
      } else {
          setFadeState('out');
          setTimeout(() => {
            setShowIntro(true);
            setFadeState('in');
          }, 300);
      }
  };

  const handleOptionSelect = (option: string) => {
      const currentStepId = STEPS[currentStepIndex].id;
      const newAnswers = { ...answers, [currentStepId]: option };
      
      if (optionalInput.trim()) {
          newAnswers['customContext'] = (newAnswers['customContext'] || '') + ` [${currentStepId}: ${optionalInput}]`;
      }

      setAnswers(newAnswers);
      setOptionalInput(""); 

      setFadeState('out');
      setTimeout(() => {
          if (currentStepIndex < STEPS.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
              setFadeState('in');
          } else {
              finishOnboarding(newAnswers);
          }
      }, 300);
  };

  const finishOnboarding = async (finalAnswers: Record<string, string>) => {
      setIsAnalyzing(true);
      let role = finalAnswers['role'];
      if (role === "HR / People Ops") role = "HR";
      
      const objective = finalAnswers['objective'] || "General Growth";

      const analysis = await generatePersonaFromInputs({
          role: role,
          objective: objective,
          expertise: finalAnswers['expertise'],
          commitment: finalAnswers['time'],
          customContext: finalAnswers['customContext']
      });
      if (finalAnswers['role'] === "HR / People Ops") analysis.role = "HR";

      // Pass objective up
      onComplete(analysis.role, analysis.expertise, finalAnswers['time'], analysis.personaDescription, analysis.personaName, objective);
  };

  if (showIntro) {
      return (
        <div className={`flex flex-col items-center justify-center py-10 lg:py-20 transition-all duration-500 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                <Hexagon className="text-lumina-blue absolute w-full h-full stroke-[0.5] opacity-50 animate-spin-slow" />
                <Hexagon className="text-lumina-blue absolute w-2/3 h-2/3 stroke-[1] opacity-80" />
                <Brain className="text-white absolute w-1/3 h-1/3" />
                <div className="absolute inset-0 bg-lumina-blue/20 blur-2xl rounded-full"></div>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-thin text-white mb-6 text-center tracking-tight">Hello. I am <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-lumina-blue to-white">Lumina.</span></h2>
            
            <div className="max-w-2xl text-center space-y-4 text-slate-400 text-lg font-light leading-relaxed mb-12 px-6">
                <p>
                    I am your adaptive AI learning companion.
                </p>
                <p>
                    To architect your evolving learning path, I need to calibrate based on your professional landscape, goals, and availability.
                </p>
            </div>

            <button 
                onClick={startCalibration}
                className="group relative bg-white/5 hover:bg-white/10 text-white font-light py-4 px-12 text-lg rounded-full border border-white/10 flex items-center gap-4 transition-all hover:border-lumina-blue/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
            >
                <span className="tracking-widest uppercase text-sm">Begin Calibration</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-lumina-gold" />
            </button>
        </div>
      );
  }

  const currentStep = STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  if (isAnalyzing) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
            <div className="relative w-40 h-40 mb-8">
                <div className="absolute inset-0 border border-lumina-glassBorder rounded-full"></div>
                <div className="absolute inset-0 border-t border-lumina-blue rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-b border-lumina-gold rounded-full animate-spin-slow"></div>
            </div>
            <h3 className="text-3xl font-thin text-white mb-4 tracking-wide">Synthesizing Neural Profile</h3>
            <p className="text-slate-500 font-light text-lg">Aligning curriculum with your objectives...</p>
        </div>
      );
  }

  return (
    <div className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start py-4 lg:py-8 transition-all duration-500 ${fadeState === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-2 text-xs font-mono uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Back</button>
            <div className="flex items-center gap-3 text-lumina-gold mb-1">
                <div className="p-2 bg-lumina-gold/10 rounded-lg border border-lumina-gold/20"><StepIcon className="w-5 h-5" /></div>
                <span className="font-mono text-xs uppercase tracking-widest text-lumina-gold/80">Calibration Node {currentStepIndex + 1} / {STEPS.length}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-thin text-white leading-tight tracking-tight">{currentStep.question}</h2>
            <div className="glass-card p-5 rounded-2xl border-l-4 border-l-lumina-blue relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className="w-12 h-12 text-white" /></div>
                <p className="text-slate-300 font-light leading-relaxed text-sm lg:text-md italic">"{currentStep.insight}"</p>
            </div>
            <div className="flex gap-2 pt-2">{STEPS.map((s, i) => (<div key={i} className={`h-1 rounded-full transition-all duration-700 ${i <= currentStepIndex ? 'w-full bg-lumina-blue shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'w-full bg-lumina-glassBorder'}`} />))}</div>
        </div>

        <div className="lg:col-span-7 space-y-3 lg:space-y-4">
            <div className="grid grid-cols-1 gap-3">
                {currentStep.options.map((option, idx) => (
                    <button key={idx} onClick={() => handleOptionSelect(option)} className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-lumina-blue/40 px-6 py-4 lg:py-5 rounded-xl text-left transition-all hover:scale-[1.01] shadow-sm hover:shadow-2xl flex items-center justify-between">
                        <span className="text-md lg:text-lg text-slate-300 group-hover:text-white font-light tracking-wide">{option}</span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-lumina-blue group-hover:border-lumina-blue transition-colors"><ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" /></div>
                    </button>
                ))}
            </div>
            <div className="pt-4 border-t border-white/5 mt-4">
                <input type="text" value={optionalInput} onChange={(e) => setOptionalInput(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 text-sm text-slate-300 focus:outline-none focus:border-lumina-blue focus:bg-lumina-blue/5 transition-all placeholder:text-slate-700 font-light" placeholder="Optional Context..." />
            </div>
        </div>
    </div>
  );
};
