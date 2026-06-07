import { ShieldAlert } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <div className="absolute inset-0 bg-indigo-500 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-xl border border-white/20 shadow-lg">
                        <ShieldAlert className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">ScopeGuard AI</h1>
                    <p className="text-sm text-slate-400 font-medium tracking-wide">AI Revenue Shield for Freelancers</p>
                </div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
                <span className="text-sm font-medium text-slate-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                    Stop working for free.
                </span>
                <span className="text-xs font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 px-3 py-1.5 rounded-md uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.15)] relative overflow-hidden group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                    Built for HackOnVibe
                </span>
            </div>
        </header>
    );
}
