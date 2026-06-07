import { useState } from 'react';
import { ShieldAlert, AlertCircle, FileWarning, HelpCircle, DollarSign, MessageSquare, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import type { AnalysisResult } from '../types/analysis';
import type { ReplyTabId } from '../data/mockData';

interface OutputColumnProps {
    data: AnalysisResult | null;
    showPrivateVent: boolean;
    isLiveApi?: boolean;
}

const replyTabs: Array<{ id: ReplyTabId; label: string }> = [
    { id: 'friendly_upsell', label: 'Friendly Upsell' },
    { id: 'firm_pushback', label: 'Firm Pushback' },
    { id: 'follow_up', label: 'Follow-up' }
];

export default function OutputColumn({ data, showPrivateVent, isLiveApi = false }: OutputColumnProps) {
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
            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-12 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed backdrop-blur-sm">
                <ShieldAlert className="w-16 h-16 mb-6 text-slate-700/50" strokeWidth={1.5} />
                <p className="font-medium text-slate-400 text-center max-w-sm">Select a project and analyze a request to see the AI-powered scope assessment.</p>
            </div>
        );
    }

    const riskStyles: Record<string, { label: string; color: string; bg: string; bar: string }> = {
      high: {
        label: 'High Risk',
        color: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/20',
        bar: 'bg-gradient-to-r from-red-500 to-rose-600',
      },
      medium: {
        label: 'Medium Risk',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/20',
        bar: 'bg-gradient-to-r from-amber-400 to-orange-500',
      },
      low: {
        label: 'Low Risk',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
        bar: 'bg-gradient-to-r from-emerald-400 to-green-500',
      },
    };

    const riskStyle = riskStyles[data.risk_level] ?? riskStyles.medium;

    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <div className="absolute -top-3 right-4 z-10">
                {isLiveApi ? (
                    <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)] backdrop-blur-md">
                        Live AI analysis
                    </span>
                ) : (
                    <span className="bg-slate-800/80 text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-sm backdrop-blur-md">
                        Demo analysis sample
                    </span>
                )}
            </div>

            {/* Risk Meter */}
            <div className={`p-6 rounded-2xl border backdrop-blur-md shadow-lg ${riskStyle.bg} transition-all hover:shadow-xl`}>
                <div className="flex justify-between items-center mb-3">
                    <h2 className={`text-xl font-heading font-black ${riskStyle.color} flex items-center gap-2`}>
                        <AlertCircle className="w-6 h-6" />
                        <span>
                            {data.risk_score_percentage}% {riskStyle.label} <span className="text-sm opacity-60 font-sans font-medium">· {data.confidence_score_percentage}% AI Confidence</span>
                        </span>
                    </h2>
                </div>
                <div className="w-full bg-slate-950/50 rounded-full h-2.5 mb-5 overflow-hidden shadow-inner border border-white/5">
                    <div className={`${riskStyle.bar} h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]`} style={{ width: `${data.risk_score_percentage || 0}%` }}></div>
                </div>
                <p className="text-sm font-medium text-slate-200 leading-relaxed">{data.summary}</p>
            </div>

            {/* Evidence Highlights */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-lg hover:border-white/20 transition-all">
                <h3 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2 font-heading tracking-wide">
                    <FileWarning className="w-4 h-4 text-slate-400" />
                    Why this is out of scope
                </h3>
                <div className="flex flex-col gap-3">
                    {data.evidence_highlights.map((item, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-slate-950/50 rounded-xl text-sm border border-white/5 hover:bg-slate-900/80 transition-colors">
                            <div className="flex-1">
                                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold block mb-1.5">Client requested</span>
                                <span className="font-medium text-slate-200">{item.client_requested}</span>
                            </div>
                            <div className="hidden sm:block text-slate-600">→</div>
                            <div className="flex-1">
                                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold block mb-1.5">Original scope</span>
                                <span className="font-medium text-slate-200">{item.original_scope_reference}</span>
                            </div>
                            <div className="flex-none mt-2 sm:mt-0">
                                <span className="inline-block px-3 py-1 text-[10px] font-black text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-md uppercase tracking-widest shadow-sm">
                                    {item.assessment.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clarifications Needed */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-lg">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2 font-heading">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    Clarifications needed before quoting
                </h3>
                <div className="flex flex-wrap gap-2">
                    {data.missing_clarifications.map((chip, i) => (
                        <span key={i} className="px-4 py-2 bg-indigo-500/10 text-indigo-300 text-sm font-medium rounded-full border border-indigo-500/20 shadow-sm transition-all hover:bg-indigo-500/20">
                            {chip.endsWith('?') ? chip : `${chip}?`}
                        </span>
                    ))}
                </div>
            </div>

            {/* Private Vent */}
            {showPrivateVent && data.private_vent_roast && data.private_vent_roast.trim() !== '' && (
                <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/5 shadow-lg relative overflow-hidden backdrop-blur-md group">
                    <div className="absolute top-0 right-0 p-2 bg-orange-500/20 rounded-bl-xl border-b border-l border-orange-500/30">
                        <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block px-2">Internal Only</span>
                    </div>
                    <h3 className="text-sm font-bold text-orange-400 mb-3 font-heading tracking-wide">Private Vent</h3>
                    <p className="text-sm text-slate-300 italic font-medium leading-relaxed group-hover:text-white transition-colors">"{data.private_vent_roast}"</p>
                    <p className="text-[10px] text-orange-500/50 mt-4 font-bold uppercase tracking-widest border-t border-orange-500/20 pt-3">Do not send this to clients.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Change Quote */}
                <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md shadow-lg hover:border-emerald-500/30 transition-all">
                    <h3 className="text-sm font-bold text-emerald-400 mb-5 flex items-center gap-2 font-heading tracking-wide">
                        <DollarSign className="w-4 h-4" />
                        Suggested Change Quote
                    </h3>
                    <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl font-black text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{data.suggested_change_quote.label}</span>
                        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1.5 rounded-md border border-emerald-500/20 shadow-inner">
                            Timeline: {data.timeline_impact.label}
                        </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-5 border-t border-emerald-500/20 pt-4 leading-relaxed whitespace-pre-wrap">
                        <span className="font-bold block mb-1.5 text-[10px] uppercase tracking-widest text-emerald-500">Reason</span>
                        {data.suggested_change_quote.reason}
                    </p>
                </div>

                {/* Instant ROI */}
                <div className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md shadow-lg flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                        <DollarSign className="w-32 h-32 text-indigo-300" />
                    </div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 font-heading">Instant ROI Example</h3>
                    <p className="text-sm text-slate-300 mb-5 leading-relaxed font-medium relative z-10">
                        If ScopeGuard helps you avoid one unpaid $150 revision at a $12/month plan, your net ROI is <strong className="text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded font-black border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">1,150%</strong>.
                    </p>
                    <div className="text-xs font-mono font-bold bg-slate-950/80 text-slate-400 p-3 rounded-lg block w-full text-center border border-white/5 relative z-10 shadow-inner">
                        ($150 - $12) / $12 × 100 = 1,150%
                    </div>
                </div>
            </div>

            {/* Smart Replies */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md shadow-lg flex flex-col flex-1">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 font-heading tracking-wide">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        Smart Replies
                    </h3>
                    {data.selected_tone && (
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-white/5">
                            Tone: {data.selected_tone}
                        </span>
                    )}
                </div>
                <div className="flex gap-2 border-b border-white/10 mb-5 overflow-x-auto pb-2 custom-scrollbar">
                    {replyTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2.5 text-sm font-bold rounded-t-xl transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-500/10 text-indigo-300 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 flex-1 relative group shadow-inner">
                    <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-medium">{data.smart_replies[activeTab]}</p>
                    <button 
                        onClick={() => handleCopy(data.smart_replies[activeTab], 'reply')}
                        className="absolute top-4 right-4 px-3 py-1.5 bg-slate-800 rounded-lg border border-white/10 text-slate-300 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 shadow-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 backdrop-blur-md"
                    >
                        {copiedType === 'reply' ? (
                            <><CheckCircle className="w-4 h-4 text-emerald-400" /><span className="text-xs font-bold text-emerald-400">Copied!</span></>
                        ) : (
                            <><Copy className="w-4 h-4" /><span className="text-xs font-bold">Copy Reply</span></>
                        )}
                    </button>
                </div>
            </div>

            {/* Why not just ChatGPT? Card */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-md p-6 shadow-lg">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-heading">
                    Why not just ChatGPT?
                </p>
                <h3 className="mt-3 text-lg font-bold text-slate-200">
                    Built for one revenue-protection workflow
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    ScopeGuard remembers the project scope, maps each new client request against
                    that agreement, highlights evidence, identifies missing clarifications,
                    suggests a structured quote and timeline impact, and generates one-click
                    professional replies.
                </p>
            </section>

            {/* Community CTA */}
            <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-5 mt-2 shadow-lg">
                <p className="text-sm text-indigo-200 font-medium text-center sm:text-left">
                    Got an awkward client message? Test it and share your result in Discord.
                </p>
                <button 
                    onClick={() => handleCopy(`⚠️ Scope creep risk: ${data.risk_score_percentage}%\n💸 Suggested change quote: ${data.suggested_change_quote.label}\nBest reply angle: Friendly upsell\n\nPrivate Vent:\n"${data.private_vent_roast}"\n\nProfessional reply:\n${data.smart_replies.friendly_upsell}`, 'discord')}
                    className="flex-none px-5 py-3 bg-indigo-600 border border-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-lg"
                >
                    {copiedType === 'discord' ? (
                        <><CheckCircle className="w-4 h-4" /> Copied!</>
                    ) : (
                        <><ExternalLink className="w-4 h-4" /> Copy Discord Text</>
                    )}
                </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-600 font-bold uppercase tracking-widest mb-4">
                ScopeGuard helps with business communication and scope analysis. It does not provide legal advice.
            </p>
        </div>
    );
}
