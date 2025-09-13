'use client'

import { AnalysisResult } from '@/app/api/analyze/route'

interface ResultCardProps {
  result: AnalysisResult | null
  isAnalyzing: boolean
  error: string | null
}

export function ResultCard({ result, isAnalyzing, error }: ResultCardProps) {
  if (isAnalyzing) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="terminal-window rounded-lg">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="terminal-text ml-4">ai-analyzer.exe</span>
          </div>
          
          <div className="p-8 text-center">
            <div className="space-y-4">
              <div className="terminal-text">
                <span className="cyber-text">$</span> <span className="text-code">./ai-analyzer --analyze --chart</span>
              </div>
              
              <div className="matrix-text text-sm space-y-2">
                <div>[AI] Initializing neural networks...</div>
                <div>[AI] Loading chart analysis models...</div>
                <div>[AI] Processing market patterns...</div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terminal"></div>
                <span className="matrix-text text-lg">[ANALYZING] Oracle is reading...</span>
              </div>
              
              <div className="terminal-text text-sm mt-4">
                <span className="cyber-text">[PROGRESS]</span> Scanning chart patterns and market signals
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="terminal-window rounded-lg border border-glitch/50">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
            <span className="terminal-text ml-4">error-handler.exe</span>
          </div>
          
          <div className="p-8 text-center">
            <div className="space-y-4">
              <div className="terminal-text">
                <span className="cyber-text">$</span> <span className="text-code">./ai-analyzer --analyze --chart</span>
              </div>
              
              <div className="glitch-text text-6xl mb-4">⚠</div>
              <div className="glitch-text text-lg">[ERROR] Analysis failed</div>
              
              <div className="terminal-text text-sm mt-4 p-4 bg-terminal/10 rounded border border-terminal/30">
                <span className="cyber-text">[DETAILS]</span> {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  const isBuy = result.signal === 'BUY'

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="terminal-window rounded-lg">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="terminal-text ml-4">oracle-result.exe</span>
        </div>
        
        <div className="p-8 text-center">
          <div className="space-y-6">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./oracle --analyze --chart --output</span>
            </div>
            
            <div className="matrix-text text-sm">
              [ORACLE] Analysis complete. Verdict ready.
            </div>
            
            {/* Signal Display */}
            <div className="my-8">
              <div className={`text-8xl font-black ${
                isBuy ? 'matrix-text glitch-text' : 'glitch-text matrix-text'
              }`}>
                {result.signal}
              </div>
              <div className="terminal-text text-sm mt-2">
                <span className="cyber-text">[SIGNAL]</span> {isBuy ? 'STRONG_BUY' : 'STRONG_SELL'}
              </div>
            </div>
            
            <div className="terminal-text text-lg max-w-3xl mx-auto">
              <span className="cyber-text">[REASON]</span> {result.reason}
            </div>
            
            <div className="terminal-text text-sm mt-6 p-4 bg-terminal/10 rounded border border-terminal/30">
              <span className="matrix-text">[DISCLAIMER]</span> The oracle points the way, but the final decision is always yours.
            </div>
            
            <div className="terminal-text text-xs mt-4">
              <span className="cyber-text">$</span> <span className="text-code">echo "Analysis complete. Ready for next chart..."</span>
              <span className="terminal-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}