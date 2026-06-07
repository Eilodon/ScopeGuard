import { useState } from 'react';
import { ShieldAlert, AlertCircle, FileWarning, HelpCircle, DollarSign, MessageSquare, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import type { AnalysisResult, ReplyTabId } from '../data/mockData';

interface OutputColumnProps {
    data: AnalysisResult | null;
    showPrivateVent: boolean;
}

const replyTabs: Array<{ id: ReplyTabId; label: string }> = [
    { id: 'friendly_upsell', label: 'Friendly Upsell' },
    { id: 'firm_pushback', label: 'Firm Pushback' },
    { id: 'follow_up', label: 'Follow-up' }
];

export default function OutputColumn({ data, showPrivateVent }: OutputColumnProps) {
    const [activeTab, setActiveTab] = useState<ReplyTabId>('friendly_upsell');
    const [copiedType, setCopiedType] = useState<'reply' | 'discord' | null>(null);

    const handleCopy = (text: string, type: 'reply' | 'discord') => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedType(type);
            setTimeout(() => setCopiedType(null), 2000);
        }
    };

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                <ShieldAlert className="w-12 h-12 mb-4 text-slate-300" />
                <p className="font-medium text-slate-500">Select a project and analyze a request to see the scope assessment.</p>
            </div>
        );
    }

    const isHighRisk = data.risk_level === 'high';
    const riskColor = isHighRisk ? 'text-red-600' : 'text-amber-600';
    const riskBg = isHighRisk ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200';
    const riskBar = isHighRisk ? 'bg-red-500' : 'bg-amber-500';

    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Risk Meter */}
            <div className={`p-5 rounded-xl border shadow-sm ${riskBg}`}>
                <div className="flex justify-between items-center mb-3">
                    <h2 className={`text-xl font-bold ${riskColor} flex items-center gap-2`}>
                        <AlertCircle className="w-6 h-6" />
                        {data.risk_score_percentage}% {isHighRisk ? 'High Risk' : 'Medium Risk'}
                    </h2>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200/50">
                        {data.confidence_score_percentage}% AI Confidence
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4 overflow-hidden">
                    <div className={`${riskBar} h-2.5 rounded-full`} style={{ width: `${data.risk_score_percentage || 0}%` }}></div>
                </div>
                <p className="text-sm font-medium text-slate-800">{data.summary}</p>
            </div>

            {/* Evidence Highlights */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-slate-500" />
                    Why this is out of scope
                </h3>
                <div className="flex flex-col gap-3">
                    {data.evidence_highlights.map((item, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                            <div className="flex-1">
                                <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold block mb-1">Client requested</span>
                                <span className="font-medium text-slate-800">{item.client_requested}</span>
                            </div>
                            <div className="hidden sm:block text-slate-300">→</div>
                            <div className="flex-1">
                                <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold block mb-1">Original scope</span>
                                <span className="font-medium text-slate-800">{item.original_scope_reference}</span>
                            </div>
                            <div className="flex-none">
                                <span className="inline-block px-2.5 py-1 text-[10px] font-black text-red-700 bg-red-100 rounded uppercase tracking-widest">
                                    {item.assessment.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clarifications Needed */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500" />
                    Clarifications needed before quoting
                </h3>
                <div className="flex flex-wrap gap-2">
                    {data.missing_clarifications.map((chip, i) => (
                        <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-100">
                            {chip}?
                        </span>
                    ))}
                </div>
            </div>

            {/* Private Vent */}
            {showPrivateVent && data.private_vent_roast && (
                <div className="p-5 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1.5 bg-amber-200 rounded-bl-lg">
                        <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest block px-1">Internal Only</span>
                    </div>
                    <h3 className="text-sm font-bold text-amber-900 mb-2">Private Vent</h3>
                    <p className="text-sm text-amber-800 italic font-medium leading-relaxed">"{data.private_vent_roast}"</p>
                    <p className="text-[10px] text-amber-700/70 mt-3 font-bold uppercase tracking-wider border-t border-amber-200/50 pt-2">Do not send this to clients.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Change Quote */}
                <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 shadow-sm">
                    <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        Suggested Change Quote
                    </h3>
                    <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-3xl font-black text-emerald-700">{data.suggested_change_quote.label}</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded border border-emerald-200">
                            Timeline: {data.timeline_impact.label}
                        </span>
                    </div>
                    <p className="text-sm text-emerald-800 mt-4 border-t border-emerald-200/50 pt-3">
                        <span className="font-bold block mb-1 text-xs uppercase tracking-wider text-emerald-600">Reason</span>
                        {data.suggested_change_quote.reason}
                    </p>
                </div>

                {/* Instant ROI */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <DollarSign className="w-24 h-24" />
                    </div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Instant ROI Example</h3>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed font-medium relative z-10">
                        If ScopeGuard helps you avoid one unpaid $150 revision at a $12/month plan, your net ROI is <strong className="text-indigo-700 bg-indigo-100/50 px-1.5 py-0.5 rounded font-black border border-indigo-200">1,150%</strong>.
                    </p>
                    <div className="text-xs font-mono font-bold bg-slate-200/70 text-slate-700 p-2 rounded block w-full text-center border border-slate-300/50 relative z-10">
                        ($150 - $12) / $12 × 100 = 1,150%
                    </div>
                </div>
            </div>

            {/* Smart Replies */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    Smart Replies
                </h3>
                <div className="flex gap-2 border-b border-slate-100 mb-4 overflow-x-auto pb-2">
                    {replyTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex-1 relative group">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-medium">{data.smart_replies[activeTab]}</p>
                    <button 
                        onClick={() => handleCopy(data.smart_replies[activeTab], 'reply')}
                        className="absolute top-3 right-3 px-3 py-1.5 bg-white rounded-md border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 shadow-sm opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2"
                    >
                        {copiedType === 'reply' ? (
                            <><CheckCircle className="w-4 h-4 text-emerald-500" /><span className="text-xs font-bold text-emerald-600">Copied!</span></>
                        ) : (
                            <><Copy className="w-4 h-4" /><span className="text-xs font-bold">Copy Reply</span></>
                        )}
                    </button>
                </div>
            </div>

            {/* Community CTA */}
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-sm">
                <p className="text-sm text-indigo-900 font-semibold text-center sm:text-left">
                    Got an awkward client message? Test it and share your result in Discord.
                </p>
                <button 
                    onClick={() => handleCopy(`⚠️ Scope creep risk: ${data.risk_score_percentage}%\n💸 Suggested change quote: ${data.suggested_change_quote.label}\nBest reply angle: Friendly upsell\n\nPrivate Vent:\n"${data.private_vent_roast}"\n\nProfessional reply:\n${data.smart_replies.friendly_upsell}`, 'discord')}
                    className="flex-none px-4 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm font-black uppercase tracking-wider rounded-lg hover:bg-indigo-600 hover:text-white transition-colors flex items-center gap-2 shadow-sm"
                >
                    {copiedType === 'discord' ? (
                        <><CheckCircle className="w-4 h-4" /> Copied!</>
                    ) : (
                        <><ExternalLink className="w-4 h-4" /> Copy Discord Text</>
                    )}
                </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-wider mb-2">
                ScopeGuard helps with business communication and scope analysis. It does not provide legal advice.
            </p>
        </div>
    );
}
