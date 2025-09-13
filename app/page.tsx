'use client'

import { useState } from 'react'
import { ConnectButton } from '@/components/ConnectButton'
import { LoreCard } from '@/components/LoreCard'
import { UploadBar } from '@/components/UploadBar'
import { ResultCard } from '@/components/ResultCard'
import { MatrixBorders } from '@/components/MatrixBorders'
import { TokenInfo } from '@/components/TokenInfo'
import { config } from '@/lib/config'

interface AnalysisResult {
  signal: 'BUY' | 'SELL'
  reason: string
}

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-terminal text-xs font-mono animate-matrix"
              style={{
                left: `${(i * 2) % 100}%`,
                animationDelay: `${(i * 0.4) % 20}s`,
                animationDuration: `${15 + (i % 10)}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} className="opacity-30">
                  {(i + j).toString(36).substring(0, 1)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Matrix Borders */}
      <MatrixBorders />
      
      {/* Terminal Header */}
      <header className="relative w-full p-3 sm:p-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="terminal-window rounded-lg">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="terminal-text ml-2 sm:ml-4 text-xs sm:text-sm">SOLution.exe - Oracle Terminal v2.0</span>
              <div className="ml-auto flex items-center space-x-1 sm:space-x-4">
                <div className="terminal-text text-xs hidden lg:block">
                  <span className="cyber-text">CA:</span> <span className="matrix-text">TO_BE_ADDED</span>
                </div>
                <a
                  href="https://github.com/Nixway00/SOLution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-button p-1.5 sm:p-2"
                  title="View Source Code on GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                {config.solana.solutionTokenAddress !== 'TO_BE_ADDED' && (
                  <a
                    href={`https://pump.fun/${config.solana.solutionTokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-button p-1.5 sm:p-2"
                    title="Trade $SOLUTION on Pump.fun"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </a>
                )}
                <a
                  href="https://x.com/SOLution_tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-button p-1.5 sm:p-2"
                  title="Follow us on X"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pb-12 relative z-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Lore Card */}
          <LoreCard />

          {/* Token Information */}
          <TokenInfo />

          {/* Upload Section */}
          <UploadBar onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {/* Result Section */}
          <ResultCard result={result} isAnalyzing={isAnalyzing} error={error} />
        </div>
      </div>

      {/* Terminal Footer */}
      <footer className="relative w-full py-4 sm:py-6 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="terminal-window rounded-lg">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="terminal-text ml-2 sm:ml-4 text-xs sm:text-sm">system-info.exe</span>
            </div>
            <div className="p-3 sm:p-4">
              <div className="terminal-text text-xs sm:text-sm space-y-1">
                    <div>Built on <span className="cyber-text">Solana</span> • Powered by <span className="matrix-text">Solana</span></div>
                <div>Status: <span className="hacker-text">ONLINE</span> • Oracle: <span className="matrix-text">READY</span></div>
                <div className="terminal-cursor"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
