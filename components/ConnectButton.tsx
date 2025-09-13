'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'

export function ConnectButton() {
  const { publicKey, connected, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="terminal-button h-10 w-48 animate-pulse"></div>
    )
  }

  if (!connected || !publicKey) {
    return (
      <div className="flex flex-col items-end space-y-1 sm:space-y-2">
        <WalletMultiButton />
        <div className="terminal-text text-xs text-right hidden sm:block">
          <span className="cyber-text">[INFO]</span> Click to connect your wallet
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div className="text-right">
        <div className="terminal-text text-xs">
          <span className="matrix-text">[CONNECTED]</span>
        </div>
        <div className="terminal-text text-xs font-mono hidden sm:block">
          {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
        </div>
        <div className="terminal-text text-xs font-mono sm:hidden">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </div>
      </div>
      <button
        onClick={() => disconnect()}
        className="terminal-button h-8 sm:h-10 px-2 sm:px-4 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
      >
        <span className="hacker-text">[DISCONNECT]</span>
        <span className="hidden sm:inline">Disconnect</span>
      </button>
    </div>
  )
}