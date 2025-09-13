'use client'

import { config } from '@/lib/config'

export function TokenInfo() {
  const tokenAddress = config.solana.solutionTokenAddress

  return (
    <div className="terminal-window rounded-lg">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="terminal-text ml-4">token-info.exe</span>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="terminal-text">
          <span className="cyber-text">$</span> <span className="text-code">./token-info --contract</span>
        </div>
        
        <div className="space-y-3">
          <div className="matrix-text text-sm">[TOKEN_CONTRACT_INFORMATION]</div>
          
          <div className="terminal-text text-sm space-y-2">
            <div className="cyber-text">🪙 Symbol:</div>
            <div className="ml-4">$SOLUTION</div>
          </div>
          
          <div className="terminal-text text-sm space-y-2">
            <div className="cyber-text">📄 Contract Address:</div>
            <div className="ml-4 font-mono break-all">
              {tokenAddress === 'TO_BE_ADDED' ? (
                <span className="hacker-text">TO_BE_ADDED</span>
              ) : (
                <span className="matrix-text">{tokenAddress}</span>
              )}
            </div>
          </div>
          
          <div className="terminal-text text-sm space-y-2">
            <div className="cyber-text">🔢 Decimals:</div>
            <div className="ml-4">{config.solana.solutionTokenDecimals}</div>
          </div>
          
          <div className="terminal-text text-sm space-y-2">
            <div className="cyber-text">🎯 Required for Access:</div>
            <div className="ml-4">{config.solana.requiredWholeTokens.toLocaleString()} $SOLUTION</div>
          </div>
          
          <div className="terminal-text text-sm space-y-2">
            <div className="cyber-text">🌐 Network:</div>
            <div className="ml-4">Solana Mainnet</div>
          </div>
          
          {tokenAddress !== 'TO_BE_ADDED' && (
            <div className="terminal-text text-sm space-y-2 mt-4">
              <div className="cyber-text">🔗 Links:</div>
              <div className="ml-4 space-y-1">
                <div>
                  <a 
                    href={`https://solscan.io/token/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="matrix-text hover:cyber-text transition-colors"
                  >
                    [SOLSCAN] View on Solscan
                  </a>
                </div>
                <div>
                  <a 
                    href={`https://dexscreener.com/solana/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="matrix-text hover:cyber-text transition-colors"
                  >
                    [DEXSCREENER] View on DexScreener
                  </a>
                </div>
                <div>
                  <a 
                    href={`https://pump.fun/${tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="matrix-text hover:cyber-text transition-colors"
                  >
                    [PUMP.FUN] Trade on Pump.fun
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {tokenAddress === 'TO_BE_ADDED' && (
            <div className="hacker-text text-xs border-l-2 border-terminal pl-3 mt-4">
              [WARNING] Token contract not yet deployed. 
              Check back soon for the official $SOLUTION token address.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
