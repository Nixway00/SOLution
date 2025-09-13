'use client'

import { useState } from 'react'
import { ConnectButton } from '@/components/ConnectButton'
import { LoreCard } from '@/components/LoreCard'
import { UploadBar } from '@/components/UploadBar'
import { ResultCard } from '@/components/ResultCard'
import { MatrixBorders } from '@/components/MatrixBorders'
import { TokenInfo } from '@/components/TokenInfo'

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
      <header className="relative w-full p-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="terminal-window rounded-lg">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="terminal-text ml-4">SOLution.exe - Oracle Terminal v2.0</span>
              <div className="ml-auto flex items-center space-x-4">
                <div className="terminal-text text-xs hidden sm:block">
                  <span className="cyber-text">CA:</span> <span className="matrix-text">TO_BE_ADDED</span>
                </div>
                <a
                  href="https://x.com/SOLution_tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-button p-2"
                  title="Follow us on X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
      <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
        <div className="space-y-8">
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
      <footer className="relative w-full py-6 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="terminal-window rounded-lg">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
              <span className="terminal-text ml-4">system-info.exe</span>
            </div>
            <div className="p-4">
              <div className="terminal-text text-sm space-y-1">
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
