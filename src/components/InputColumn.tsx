import { useState } from 'react';
import type { Project, ReplyTone } from '../data/mockData';

interface InputColumnProps {
    projects: Project[];
    onAnalyze: (payload: {
        projectId: string;
        request: string;
        tone: ReplyTone;
        privateVentEnabled: boolean;
        customScope?: string;
    }) => void;
    isAnalyzing: boolean;
}

export default function InputColumn({ projects, onAnalyze, isAnalyzing }: InputColumnProps) {
    const [selectedProject, setSelectedProject] = useState<string>(projects[0]?.id || '');
    const [clientRequest, setClientRequest] = useState(projects[0]?.demoClientRequest || '');
    const [tone, setTone] = useState<ReplyTone>('Friendly');
    const [privateVentEnabled, setPrivateVentEnabled] = useState(false);
    const [customScopeText, setCustomScopeText] = useState('');

    const activeProject = projects.find(p => p.id === selectedProject);

    const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        if (projectId === 'custom') {
            setClientRequest('');
        } else {
            setClientRequest(projects.find((project) => project.id === projectId)?.demoClientRequest || '');
        }
    };

    const isCustom = selectedProject === 'custom';

    const originalScopeValue = isCustom 
        ? customScopeText 
        : activeProject 
        ? `Project: ${activeProject.name}\nPrice: ${activeProject.price}\n\nIncluded:\n- ${activeProject.included.join('\n- ')}\n\nExcluded:\n- ${activeProject.excluded.join('\n- ')}\n\nAdditional Work: ${activeProject.additionalWork}`
        : '';

    const isRequestEmpty = clientRequest.trim().length === 0;
    const isScopeEmpty = isCustom && customScopeText.trim().length === 0;

    const handleAnalyze = () => {
        onAnalyze({
            projectId: selectedProject,
            request: clientRequest,
            tone,
            privateVentEnabled,
            customScope: isCustom ? customScopeText : undefined
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 h-full transition-all duration-300 hover:border-white/20">
            <div>
                <label htmlFor="projectSelect" className="block text-sm font-semibold text-slate-300 mb-2">Select Active Project</label>
                <select 
                    id="projectSelect"
                    className="w-full p-3 bg-slate-950/50 border border-white/10 rounded-xl text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:outline-none transition-all"
                    value={selectedProject}
                    onChange={(e) => handleProjectChange(e.target.value)}
                >
                    {projects.map(p => (
                        <option key={p.id} value={p.id} className="bg-slate-900">{p.name}</option>
                    ))}
                    <option value="custom" className="bg-slate-900">Custom Project (Paste your own)</option>
                </select>
            </div>

            <div>
                <label htmlFor="originalScope" className="block text-sm font-semibold text-slate-300 mb-1">Original Scope of Work</label>
                <p className="text-xs text-slate-500 mb-3">Paste your original scope, proposal, contract, or simply describe what you agreed to deliver.</p>
                <textarea 
                    id="originalScope"
                    readOnly={!isCustom}
                    className={`w-full h-40 p-4 border rounded-xl text-sm focus:outline-none resize-none custom-scrollbar transition-all ${isCustom ? 'bg-slate-950/50 border-white/10 text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 shadow-inner' : 'bg-slate-950/30 border-white/5 text-slate-400'}`}
                    value={originalScopeValue}
                    onChange={(e) => {
                        if (isCustom) setCustomScopeText(e.target.value);
                    }}
                    placeholder={isCustom ? "Paste your project scope, proposal, or contract here..." : ""}
                />
            </div>

            <div>
                <label htmlFor="clientRequest" className="block text-sm font-semibold text-slate-300 mb-2">Paste Client Request</label>
                <textarea 
                    id="clientRequest"
                    className="w-full h-28 p-4 bg-slate-950/50 border border-white/10 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:outline-none resize-none transition-all placeholder:text-slate-600 custom-scrollbar shadow-inner"
                    placeholder="Can you also add a payment page, rewrite the copy, and create 3 banners? Should be quick."
                    value={clientRequest}
                    onChange={(e) => setClientRequest(e.target.value)}
                    maxLength={3000}
                />
                <p className="mt-2 text-[10px] text-slate-500">
                    {clientRequest.length}/3000 characters
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="replyTone" className="block text-sm font-semibold text-slate-300 mb-2">Reply Tone</label>
                    <select 
                        id="replyTone"
                        className="w-full p-3 bg-slate-950/50 border border-white/10 rounded-xl text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:outline-none transition-all"
                        value={tone}
                        onChange={(e) => setTone(e.target.value as ReplyTone)}
                    >
                        <option value="Friendly" className="bg-slate-900">Friendly</option>
                        <option value="Firm" className="bg-slate-900">Firm</option>
                        <option value="Diplomatic" className="bg-slate-900">Diplomatic</option>
                        <option value="Premium" className="bg-slate-900">Premium</option>
                        <option value="Short" className="bg-slate-900">Short</option>
                    </select>
                </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 backdrop-blur-sm transition-colors hover:bg-amber-500/15">
                <input 
                    type="checkbox" 
                    id="privateVent"
                    className="w-4 h-4 mt-0.5 text-amber-500 bg-slate-900 border-amber-500/50 rounded focus:ring-amber-500/50 focus:ring-offset-slate-900"
                    checked={privateVentEnabled}
                    onChange={(e) => setPrivateVentEnabled(e.target.checked)}
                />
                <div className="flex flex-col">
                    <label htmlFor="privateVent" className="text-sm text-amber-400 font-medium cursor-pointer select-none">
                        Private Vent Mode — for laughs only, never sent to clients
                    </label>
                    <p className="text-[10px] text-amber-500/70 mt-1 font-bold uppercase tracking-widest">Applies on next analysis.</p>
                </div>
            </div>

            <button 
                className={`mt-4 w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 flex justify-center items-center gap-2 ${isAnalyzing || isRequestEmpty || isScopeEmpty ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}
                onClick={handleAnalyze}
                disabled={isAnalyzing || isRequestEmpty || isScopeEmpty}
            >
                {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing Scope...
                    </span>
                ) : (
                    "Analyze Request & Protect Revenue"
                )}
            </button>
            {(isRequestEmpty || isScopeEmpty) && (
                <p className="mt-2 text-xs text-amber-400">
                    {isScopeEmpty ? 'Provide your custom scope to continue.' : 'Paste a client request before running analysis.'}
                </p>
            )}
        </div>
    );
}
