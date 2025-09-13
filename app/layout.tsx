import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SOLution - Trading Oracle',
  description: 'The oracle that filters the noise and lights the path in chaotic markets.',
  keywords: ['crypto', 'trading', 'oracle', 'solana', 'ai', 'analysis', 'mobile'],
  authors: [{ name: 'SOLution Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#000000',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'SOLution - Trading Oracle',
    description: 'The oracle that filters the noise and lights the path in chaotic markets.',
    type: 'website',
    locale: 'en_US',
    siteName: 'SOLution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLution - Trading Oracle',
    description: 'The oracle that filters the noise and lights the path in chaotic markets.',
    creator: '@SOLution_tool',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white min-h-screen`}>
        <ErrorBoundary>
          <WalletProvider>
            {children}
          </WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
