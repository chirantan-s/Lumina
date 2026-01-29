
import React, { useState } from 'react';
import { ArrowRight, Lock, Fingerprint } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string, email: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!name.trim()) {
        setError('Please enter your full name.');
        return;
    }
    if (password.length < 4) {
        setError('Please verify your identity.');
        return;
    }
    onLogin(name, email);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="glass-card p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
            <Fingerprint className="w-5 h-5 text-lumina-gold" />
            <span className="text-xs font-mono text-lumina-gold uppercase tracking-widest">Authentication</span>
        </div>
        <h2 className="text-4xl font-extralight text-white mb-2 tracking-tight">Identify.</h2>
        <p className="text-slate-400 mb-6 font-light text-sm">Secure access to your personalized neural pathway.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-lumina-blue transition-colors">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-lumina-blue focus:bg-lumina-blue/5 transition-all placeholder:text-slate-700 font-light"
              placeholder="e.g. Rohan Gupta"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-lumina-blue transition-colors">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
              }}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-lumina-blue focus:bg-lumina-blue/5 transition-all placeholder:text-slate-700 font-light"
              placeholder="name@company.com"
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-lumina-blue transition-colors">Verify Identity</label>
            <div className="relative">
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-lumina-blue focus:bg-lumina-blue/5 transition-all placeholder:text-slate-700 font-light"
                placeholder="••••••••"
                />
                <Lock className="absolute right-4 top-4 w-4 h-4 text-slate-600" />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs mt-2 pl-1 border-l-2 border-red-500">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-lumina-blue to-indigo-600 hover:from-lumina-glow hover:to-indigo-500 text-white font-medium py-4 rounded-xl mt-4 flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-[1.02]"
          >
            <span className="tracking-wide">Begin Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
