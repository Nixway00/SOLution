import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
        extend: {
          colors: {
            'terminal': '#00ff00',     // Verde terminale
            'matrix': '#00ff41',       // Verde Matrix
            'glitch': '#ff0080',       // Rosa glitch
            'cyber': '#00ffff',        // Ciano cyber
            'hacker': '#ff6b35',       // Arancione hacker
            'dark': '#0a0a0a',         // Nero profondo
            'darker': '#000000',       // Nero assoluto
            'terminal-bg': '#0d1117',  // Sfondo terminale
            'code': '#f0f6fc',         // Testo codice
          },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
          animation: {
            'matrix': 'matrix 20s linear infinite',
            'matrix-down': 'matrix-down 15s linear infinite',
            'matrix-up': 'matrix-up 15s linear infinite',
            'matrix-right': 'matrix-right 8s linear infinite',
            'matrix-left': 'matrix-left 8s linear infinite',
            'glitch': 'glitch 0.3s ease-in-out infinite alternate',
            'terminal-blink': 'terminal-blink 1s infinite',
            'scan-line': 'scan-line 2s linear infinite',
            'hack': 'hack 3s ease-in-out infinite',
            'typing': 'typing 2s steps(40) 1s 1 normal both',
          },
          keyframes: {
            matrix: {
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(100vh)' },
            },
            'matrix-down': {
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(100vh)' },
            },
            'matrix-up': {
              '0%': { transform: 'translateY(100vh)' },
              '100%': { transform: 'translateY(-100%)' },
            },
            'matrix-right': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100vw)' },
            },
            'matrix-left': {
              '0%': { transform: 'translateX(100vw)' },
              '100%': { transform: 'translateX(-100%)' },
            },
            glitch: {
              '0%': { transform: 'translate(0)' },
              '20%': { transform: 'translate(-2px, 2px)' },
              '40%': { transform: 'translate(-2px, -2px)' },
              '60%': { transform: 'translate(2px, 2px)' },
              '80%': { transform: 'translate(2px, -2px)' },
              '100%': { transform: 'translate(0)' },
            },
            'terminal-blink': {
              '0%, 50%': { opacity: '1' },
              '51%, 100%': { opacity: '0' },
            },
            'scan-line': {
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(100vh)' },
            },
            hack: {
              '0%, 100%': { filter: 'hue-rotate(0deg) brightness(1)' },
              '50%': { filter: 'hue-rotate(90deg) brightness(1.2)' },
            },
            typing: {
              '0%': { width: '0' },
              '100%': { width: '100%' },
            },
          },
    },
  },
  plugins: [],
}
export default config
