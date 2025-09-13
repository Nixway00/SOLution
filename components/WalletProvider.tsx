'use client'

import { FC, ReactNode, useMemo, useEffect } from 'react'
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

// Custom styles are handled in globals.css

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  // Use your custom Helius RPC endpoint
  const endpoint = useMemo(() => 'https://mainnet.helius-rpc.com/?api-key=35aca90c-9479-4f8b-8284-f9701ab0b0af', [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  )

  // Auto-select Phantom if available
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).solana?.isPhantom) {
      // Phantom is available, we can connect directly
      console.log('Phantom wallet detected')
    }
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}
