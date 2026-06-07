import { useState } from 'react';
import type { Project, ReplyTone } from '../data/mockData';

interface InputColumnProps {
    projects: Project[];
    onAnalyze: (projectId: string, request: string, tone: ReplyTone, privateVent: boolean) => void;
    isAnalyzing: boolean;
}

export default function InputColumn({ projects, onAnalyze, isAnalyzing }: InputColumnProps) {
    const [selectedProject, setSelectedProject] = useState<string>(projects[0]?.id || '');
    const [clientRequest, setClientRequest] = useState(projects[0]?.demoClientRequest || '');
    const [tone, setTone] = useState<ReplyTone>('Friendly');
    const [privateVent, setPrivateVent] = useState(false);

    const activeProject = projects.find(p => p.id === selectedProject);

    const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setClientRequest(projects.find((project) => project.id === projectId)?.demoClientRequest || '');
    };

    const originalScopeText = activeProject 
        ? `Project: ${activeProject.name}\nPrice: ${activeProject.price}\n\nIncluded:\n- ${activeProject.included.join('\n- ')}\n\nExcluded:\n- ${activeProject.excluded.join('\n- ')}\n\nAdditional Work: ${activeProject.additionalWork}`
        : '';

    const handleAnalyze = () => {
        onAnalyze(selectedProject, clientRequest, tone, privateVent);
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-slate-200 h-full">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Active Project</label>
                <select 
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={selectedProject}
                    onChange={(e) => handleProjectChange(e.target.value)}
                >
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Original Scope of Work</label>
                <p className="text-xs text-slate-500 mb-2">Paste your original scope, proposal, contract, or simply describe what you agreed to deliver.</p>
                <textarea 
                    readOnly
                    className="w-full h-40 p-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-sm focus:outline-none resize-none"
                    value={originalScopeText}
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Paste Client Request</label>
                <textarea 
                    className="w-full h-24 p-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    placeholder="Can you also add a payment page, rewrite the copy, and create 3 banners? Should be quick."
                    value={clientRequest}
                    onChange={(e) => setClientRequest(e.target.value)}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Reply Tone</label>
                    <select 
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={tone}
                        onChange={(e) => setTone(e.target.value as ReplyTone)}
                    >
                        <option value="Friendly">Friendly</option>
                        <option value="Firm">Firm</option>
                        <option value="Diplomatic">Diplomatic</option>
                        <option value="Premium">Premium</option>
                        <option value="Short">Short</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <input 
                    type="checkbox" 
                    id="privateVent"
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    checked={privateVent}
                    onChange={(e) => setPrivateVent(e.target.checked)}
                />
                <label htmlFor="privateVent" className="text-sm text-amber-800 font-medium cursor-pointer select-none">
                    Private Vent Mode — for laughs only, never sent to clients
                </label>
            </div>

            <button 
                className={`mt-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2 ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
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
        </div>
    );
}
