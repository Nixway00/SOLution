'use client'

import React, { useState, useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection } from '@solana/web3.js'
import { getTokenBalance, formatTokenAmount } from '@/lib/solana'
import { config } from '@/lib/config'

interface UploadBarProps {
  onAnalyze: (file: File) => Promise<void>
  isAnalyzing: boolean
}

export function UploadBar({ onAnalyze, isAnalyzing }: UploadBarProps) {
  const { publicKey, connected } = useWallet()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [tokenBalance, setTokenBalance] = useState<number | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [isCheckingBalance, setIsCheckingBalance] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const checkTokenBalance = async () => {
    if (!publicKey) return

    setIsCheckingBalance(true)
    try {
      // TEMPORARY: Bypass token gating for testing
      if (config.solana.solutionTokenAddress === 'TO_BE_ADDED') {
        setTokenBalance(1000000) // Simulate having enough tokens
        setHasAccess(true)
        setIsCheckingBalance(false)
        return
      }

      const connection = new Connection(config.solana.rpcUrl)
      const balance = await getTokenBalance(connection, publicKey, config.solana.solutionTokenAddress)
      setTokenBalance(balance.balance)
      setHasAccess(balance.hasAccess)
    } catch (error) {
      console.error('Error checking token balance:', error)
      // In case of error, still allow access for testing
      setTokenBalance(1000000)
      setHasAccess(true)
    } finally {
      setIsCheckingBalance(false)
    }
  }

  // Check balance when wallet connects
  React.useEffect(() => {
    if (connected && publicKey) {
      checkTokenBalance()
    } else {
      setTokenBalance(null)
      setHasAccess(false)
    }
  }, [connected, publicKey])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile)
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        alert('Please select a valid image file (.png, .jpg, .jpeg)')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file && hasAccess && !isAnalyzing) {
      await onAnalyze(file)
    }
  }

  const isDisabled = !connected || !hasAccess || isAnalyzing || isCheckingBalance

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Token Gate Status Terminal */}
      <div className="terminal-window rounded-lg">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="terminal-text ml-4">token-gate.exe</span>
        </div>
        
        <div className="p-6">
          {!connected ? (
            <div className="space-y-2">
              <div className="terminal-text">
                <span className="cyber-text">$</span> <span className="text-code">./token-gate --check</span>
              </div>
              <div className="glitch-text text-sm">[ERROR] Wallet not connected</div>
              <div className="terminal-text text-sm">Please connect your Phantom wallet to continue...</div>
            </div>
          ) : isCheckingBalance ? (
            <div className="space-y-2">
              <div className="terminal-text">
                <span className="cyber-text">$</span> <span className="text-code">./token-gate --check --wallet {publicKey?.toString().slice(0, 8)}...</span>
              </div>
              <div className="matrix-text text-sm">[SCANNING] Checking token balance...</div>
              <div className="terminal-text text-sm flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-terminal mr-2"></div>
                Loading blockchain data...
              </div>
            </div>
          ) : hasAccess ? (
            <div className="space-y-2">
              <div className="terminal-text">
                <span className="cyber-text">$</span> <span className="text-code">./token-gate --check --wallet {publicKey?.toString().slice(0, 8)}...</span>
              </div>
              <div className="matrix-text text-sm">[SUCCESS] Access granted!</div>
              <div className="terminal-text text-sm">
                Balance: <span className="cyber-text">{formatTokenAmount(tokenBalance || 0)} $SOLUTION</span>
                {config.solana.solutionTokenAddress === 'TO_BE_ADDED' && (
                  <span className="hacker-text ml-2">[DEMO_MODE]</span>
                )}
              </div>
              <div className="terminal-text text-sm">Status: <span className="matrix-text">READY_FOR_ANALYSIS</span></div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="terminal-text">
                <span className="cyber-text">$</span> <span className="text-code">./token-gate --check --wallet {publicKey?.toString().slice(0, 8)}...</span>
              </div>
              <div className="glitch-text text-sm">[ACCESS_DENIED] Insufficient tokens</div>
              <div className="terminal-text text-sm">
                Current: <span className="hacker-text">{formatTokenAmount(tokenBalance || 0)} $SOLUTION</span>
              </div>
              <div className="terminal-text text-sm">
                Required: <span className="cyber-text">1,000,000 $SOLUTION</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Guidelines Terminal */}
      <div className="terminal-window rounded-lg">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="terminal-text ml-4">analysis-guidelines.exe</span>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="terminal-text">
            <span className="cyber-text">$</span> <span className="text-code">./analysis-guidelines --optimal-chart</span>
          </div>
          
          <div className="space-y-3">
            <div className="matrix-text text-sm">[OPTIMAL_CHART_SETTINGS]</div>
            
            <div className="terminal-text text-sm space-y-2">
              <div className="cyber-text">📊 Timeframe:</div>
              <div className="ml-4">• Use 5-minute or 10-minute candlestick charts</div>
              <div className="ml-4">• Avoid 1-minute (too noisy) or daily (too slow)</div>
            </div>
            
            <div className="terminal-text text-sm space-y-2">
              <div className="cyber-text">📈 Chart Elements:</div>
              <div className="ml-4">• Include price action with clear support/resistance</div>
              <div className="ml-4">• Show volume bars (essential for analysis)</div>
              <div className="ml-4">• Display technical indicators (RSI, MACD, etc.)</div>
            </div>
            
            <div className="terminal-text text-sm space-y-2">
              <div className="cyber-text">💰 Market Data:</div>
              <div className="ml-4">• Market cap, 24h volume, holders count</div>
              <div className="ml-4">• Price change percentage (1h, 24h, 7d)</div>
              <div className="ml-4">• Trading pairs and liquidity info</div>
            </div>
            
            <div className="terminal-text text-sm space-y-2">
              <div className="cyber-text">🎯 Best Results:</div>
              <div className="ml-4">• Screenshot from TradingView, DexScreener, or CoinGecko</div>
              <div className="ml-4">• High resolution, clear text, complete data</div>
              <div className="ml-4">• Recent data (within last 24 hours)</div>
            </div>
            
            <div className="hacker-text text-xs border-l-2 border-terminal pl-3 mt-4">
              [WARNING] Poor quality charts may result in inaccurate signals. 
              For best results, use professional trading platforms with complete market data.
            </div>
          </div>
        </div>
      </div>

      {/* Upload Terminal */}
      <form onSubmit={handleSubmit} className="terminal-window rounded-lg">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="terminal-text ml-4">chart-analyzer.exe</span>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="terminal-text">
            <span className="cyber-text">$</span> <span className="text-code">./chart-analyzer --upload</span>
          </div>
          
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              disabled={isDisabled}
              className="hidden"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isDisabled}
              className={`w-full terminal-button py-4 text-left ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-terminal/30'
              }`}
            >
              <span className="cyber-text">[FILE]</span> {file ? `Selected: ${file.name}` : 'Click to select chart image (.png, .jpg)'}
            </button>
            
            {preview && (
              <div className="terminal-text text-sm">
                <div className="matrix-text">[PREVIEW] Image loaded successfully</div>
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 max-w-full max-h-48 mx-auto border border-terminal/30"
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={isDisabled || !file}
              className={`w-full terminal-button py-4 text-center ${
                isDisabled || !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-terminal/30'
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-terminal"></div>
                  <span className="matrix-text">[ANALYZING] Running AI analysis...</span>
                </div>
              ) : (
                <span><span className="cyber-text">[EXECUTE]</span> Run Analysis</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
