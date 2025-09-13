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
      <div className="flex flex-col items-end space-y-2">
        <WalletMultiButton />
        <div className="terminal-text text-xs text-right">
          <span className="cyber-text">[INFO]</span> Click to connect your wallet
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="text-right">
        <div className="terminal-text text-xs">
          <span className="matrix-text">[CONNECTED]</span>
        </div>
        <div className="terminal-text text-xs font-mono">
          {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
        </div>
      </div>
      <button
        onClick={() => disconnect()}
        className="terminal-button h-10 px-4 flex items-center space-x-2"
      >
        <span className="hacker-text">[DISCONNECT]</span>
        <span>Disconnect</span>
      </button>
    </div>
  )
}