import { useState } from 'react';
import Header from './components/Header';
import InputColumn from './components/InputColumn';
import OutputColumn from './components/OutputColumn';
import { projects, getMockAnalysis } from './data/mockData';
import type { AnalysisResult } from './types/analysis';
import type { ReplyTone } from './data/mockData';

async function analyzeWithApi({
  originalScope,
  clientRequest,
  tone,
  privateVentEnabled,
}: {
  originalScope: string;
  clientRequest: string;
  tone: ReplyTone;
  privateVentEnabled: boolean;
}) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      originalScope,
      clientRequest,
      tone,
      privateVentEnabled,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error || 'Failed to analyze request');
  }

  return response.json();
}

export default function App() {
    const defaultProject = projects[0];
    
    const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(() =>
        getMockAnalysis(defaultProject.id, {
            request: defaultProject.demoClientRequest,
            tone: 'Friendly',
        })
    );
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showPrivateVent, setShowPrivateVent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLiveApi, setIsLiveApi] = useState(false);

    const handleAnalyze = async (payload: {
      projectId: string;
      request: string;
      tone: ReplyTone;
      privateVentEnabled: boolean;
      customScope?: string;
    }) => {
      setIsAnalyzing(true);
      setError(null);
      setShowPrivateVent(payload.privateVentEnabled);
    
      let originalScopeText: string;
      if (payload.projectId === 'custom') {
          originalScopeText = payload.customScope || '';
      } else {
          const project = projects.find((item) => item.id === payload.projectId);
          if (!project) {
              setError('Project not found.');
              setIsAnalyzing(false);
              return;
          }
          originalScopeText = `Project: ${project.name}\nPrice: ${project.price}\n\nIncluded:\n- ${project.included.join('\n- ')}\n\nExcluded:\n- ${project.excluded.join('\n- ')}\n\nAdditional Work: ${project.additionalWork}`;
      }
        
      try {
        const data = await analyzeWithApi({
          originalScope: originalScopeText,
          clientRequest: payload.request,
          tone: payload.tone,
          privateVentEnabled: payload.privateVentEnabled,
        });
    
        setAnalysisData(data);
        setIsLiveApi(true);
      } catch {
        const fallback = getMockAnalysis(payload.projectId, {
          request: payload.request,
          tone: payload.tone,
        });
    
        setAnalysisData(fallback);
        setIsLiveApi(false);
      } finally {
        setIsAnalyzing(false);
      }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-300 relative selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[150px]"></div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full min-h-screen">
                <Header />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {error && (
                    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                    {/* Left Column */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <InputColumn 
                            projects={projects} 
                            onAnalyze={handleAnalyze} 
                            isAnalyzing={isAnalyzing} 
                        />
                    </div>
                    
                    {/* Right Column */}
                    <div className="h-full">
                        <OutputColumn 
                            data={analysisData} 
                            showPrivateVent={showPrivateVent} 
                            isLiveApi={isLiveApi}
                        />
                    </div>
                </div>
            </main>
            </div>
        </div>
    );
}
