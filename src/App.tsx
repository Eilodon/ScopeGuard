import React, { useState } from 'react';
import Header from './components/Header';
import InputColumn from './components/InputColumn';
import OutputColumn from './components/OutputColumn';
import { projects, getMockAnalysis } from './data/mockData';

export default function App() {
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showPrivateVent, setShowPrivateVent] = useState(false);

    const handleAnalyze = (projectId: string, request: string, tone: string, privateVent: boolean) => {
        setIsAnalyzing(true);
        setShowPrivateVent(privateVent);
        
        // Simulate network delay to mimic AI processing
        setTimeout(() => {
            const data = getMockAnalysis(projectId);
            setAnalysisData(data);
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
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
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
