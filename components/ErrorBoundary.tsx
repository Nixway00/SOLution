'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="terminal-window rounded-lg p-6">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="terminal-text ml-4">error-boundary.exe</span>
      </div>
      <div className="p-4">
        <div className="glitch-text text-sm">[ERROR] Something went wrong</div>
        <div className="terminal-text text-xs mt-2">
          {error?.message || 'An unexpected error occurred'}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="terminal-button mt-4 px-4 py-2"
        >
          <span className="cyber-text">[RELOAD]</span> Refresh Page
        </button>
      </div>
    </div>
  )
}
