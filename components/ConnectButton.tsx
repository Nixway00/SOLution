'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export function ConnectButton() {
  const { publicKey, connected, disconnect, connect, select, wallet } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="terminal-button h-10 w-48 animate-pulse"></div>
    )
  }

  const handleConnect = async () => {
    if (!wallet) {
      // If no wallet is selected, try to connect with Phantom directly
      try {
        setIsConnecting(true)
        // Try to connect with Phantom if available
        if (typeof window !== 'undefined' && (window as any).solana?.isPhantom) {
          const phantom = (window as any).solana
          const response = await phantom.connect()
          console.log('Connected to Phantom:', response.publicKey.toString())
        } else {
          alert('Please install Phantom wallet from https://phantom.app')
        }
      } catch (error) {
        console.error('Connection error:', error)
        alert('Failed to connect wallet. Please try again.')
      } finally {
        setIsConnecting(false)
      }
    } else {
      try {
        setIsConnecting(true)
        await connect()
      } catch (error) {
        console.error('Connection error:', error)
        alert('Failed to connect wallet. Please try again.')
      } finally {
        setIsConnecting(false)
      }
    }
  }

  if (!connected || !publicKey) {
    return (
      <div className="flex flex-col items-end space-y-1 sm:space-y-2">
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="terminal-button h-10 w-48 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-terminal"></div>
              <span className="cyber-text">[CONNECTING]</span>
            </>
          ) : (
            <>
              <span className="cyber-text">[CONNECT]</span>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
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