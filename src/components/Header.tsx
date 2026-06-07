import { ShieldAlert } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white border-b border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">ScopeGuard AI</h1>
                    <p className="text-sm text-slate-500 font-medium">AI Revenue Shield for Freelancers</p>
                </div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    Stop working for free.
                </span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 rounded-md uppercase tracking-wider">
                    Built for HackOnVibe
                </span>
            </div>
        </header>
    );
}
