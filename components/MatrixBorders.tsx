'use client'

import { useEffect, useState } from 'react'

interface MatrixColumn {
  id: number
  characters: string[]
  speed: number
  delay: number
  direction: 'down' | 'up'
  opacity: number
}

export function MatrixBorders() {
  const [columns, setColumns] = useState<MatrixColumn[]>([])
  const [mounted, setMounted] = useState(false)

  const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?'
  const terminalChars = '$>#@%&*+-=[]{}|;:,.<>?'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const generateColumns = () => {
      const newColumns: MatrixColumn[] = []
      
      // Left border columns
      for (let i = 0; i < 8; i++) {
        newColumns.push({
          id: i,
          characters: Array.from({ length: 15 }, () => 
            Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : terminalChars[Math.floor(Math.random() * terminalChars.length)]
          ),
          speed: 0.5 + Math.random() * 2,
          delay: Math.random() * 5,
          direction: 'down',
          opacity: 0.1 + Math.random() * 0.3
        })
      }
      
      // Right border columns
      for (let i = 8; i < 16; i++) {
        newColumns.push({
          id: i,
          characters: Array.from({ length: 15 }, () => 
            Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : terminalChars[Math.floor(Math.random() * terminalChars.length)]
          ),
          speed: 0.5 + Math.random() * 2,
          delay: Math.random() * 5,
          direction: 'up',
          opacity: 0.1 + Math.random() * 0.3
        })
      }
      
      setColumns(newColumns)
    }

    generateColumns()
    const interval = setInterval(generateColumns, 3000)
    
    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Left Border */}
      <div className="absolute left-0 top-0 w-16 h-full overflow-hidden">
        {columns.slice(0, 8).map((column) => (
          <div
            key={`left-${column.id}`}
            className="absolute text-terminal text-xs font-mono leading-tight"
            style={{
              left: `${column.id * 8}px`,
              animation: `matrix-${column.direction} ${column.speed}s linear infinite`,
              animationDelay: `${column.delay}s`,
              opacity: column.opacity
            }}
          >
            {column.characters.map((char, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? 'text-matrix font-bold' : 
                  index < 3 ? 'text-cyber' : 
                  index < 6 ? 'text-terminal' : 'text-terminal/50'
                }`}
                style={{
                  textShadow: index === 0 ? '0 0 10px currentColor' : 'none'
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Right Border */}
      <div className="absolute right-0 top-0 w-16 h-full overflow-hidden">
        {columns.slice(8, 16).map((column) => (
          <div
            key={`right-${column.id}`}
            className="absolute text-terminal text-xs font-mono leading-tight"
            style={{
              right: `${(column.id - 8) * 8}px`,
              animation: `matrix-${column.direction} ${column.speed}s linear infinite`,
              animationDelay: `${column.delay}s`,
              opacity: column.opacity
            }}
          >
            {column.characters.map((char, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? 'text-glitch font-bold' : 
                  index < 3 ? 'text-hacker' : 
                  index < 6 ? 'text-terminal' : 'text-terminal/50'
                }`}
                style={{
                  textShadow: index === 0 ? '0 0 10px currentColor' : 'none'
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="absolute text-terminal text-xs font-mono"
            style={{
              left: `${i * 5}%`,
              animation: 'matrix-right 3s linear infinite',
              animationDelay: `${(i * 0.15) % 3}s`,
              opacity: 0.1 + (i % 3) * 0.1
            }}
          >
            {Array.from({ length: 3 }).map((_, j) => (
              <span
                key={j}
                className={`${
                  j === 0 ? 'text-matrix font-bold' : 
                  j === 1 ? 'text-cyber' : 'text-terminal/70'
                }`}
                style={{
                  textShadow: j === 0 ? '0 0 5px currentColor' : 'none'
                }}
              >
                {terminalChars[(i + j) % terminalChars.length]}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="absolute text-terminal text-xs font-mono"
            style={{
              left: `${i * 5}%`,
              animation: 'matrix-left 3s linear infinite',
              animationDelay: `${(i * 0.15) % 3}s`,
              opacity: 0.1 + (i % 3) * 0.1
            }}
          >
            {Array.from({ length: 3 }).map((_, j) => (
              <span
                key={j}
                className={`${
                  j === 0 ? 'text-glitch font-bold' : 
                  j === 1 ? 'text-hacker' : 'text-terminal/70'
                }`}
                style={{
                  textShadow: j === 0 ? '0 0 5px currentColor' : 'none'
                }}
              >
                {terminalChars[(i + j + 10) % terminalChars.length]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
