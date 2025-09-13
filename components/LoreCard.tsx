'use client'

export function LoreCard() {
  return (
    <div className="terminal-window rounded-lg max-w-7xl mx-auto relative overflow-hidden">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="terminal-text ml-4">SOLution.exe - Oracle Terminal</span>
      </div>
      
      {/* Scan Line Effect */}
      <div className="scan-line"></div>
      
      {/* Terminal Content */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6 relative z-10">
        {/* Title */}
        <div className="text-center">
          <div className="matrix-text text-4xl sm:text-5xl md:text-6xl font-black mb-8" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
            SOLUTION
          </div>
        </div>
        
        {/* New Lore Content */}
        <div className="space-y-6 text-left">
          {/* The Beginning */}
          <div className="space-y-3">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./lore --display --section=beginning</span>
            </div>
            <div className="terminal-text text-sm space-y-2">
              <div className="hacker-text text-sm">⚡ The Beginning</div>
              <div>Blockchain was chaos. Countless projects rose and fell, chasing hype but leaving nothing behind.</div>
              <div>On Solana—a chain of relentless speed—something new was forged.</div>
              <div>Not just another project. Not just another token.</div>
              <div>But the true <span className="matrix-text font-bold">answer</span>.</div>
              <div>That answer is <span className="glitch-text font-bold">SOLution</span>.</div>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-3">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./lore --display --section=vision</span>
            </div>
            <div className="terminal-text text-sm space-y-2">
              <div className="hacker-text text-sm">🔮 Our Vision</div>
              <div>SOLution is more than speed.</div>
              <div>It is a <span className="matrix-text font-bold">living ecosystem</span> where:</div>
              <div className="ml-4 space-y-1">
                <div>• Every block is a heartbeat.</div>
                <div>• Every transaction is a breath.</div>
                <div>• Communities unite instead of fragment.</div>
                <div>• Tools deliver real value.</div>
                <div>• Growth lasts beyond the hype.</div>
              </div>
              <div>SOLution is built to endure.</div>
            </div>
          </div>

          {/* The Name */}
          <div className="space-y-3">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./lore --display --section=name</span>
            </div>
            <div className="terminal-text text-sm space-y-2">
              <div className="hacker-text text-sm">🛠️ The Name</div>
              <div><span className="glitch-text font-bold">SOLution</span> = <span className="matrix-text font-bold">SOL</span> + <span className="cyber-text font-bold">ution</span></div>
              <div className="ml-4 space-y-1">
                <div>• <span className="matrix-text font-bold">SOL</span>: The essence of Solana ⚡</div>
                <div>• <span className="cyber-text font-bold">ution</span>: Evolution, revolution, direction</div>
              </div>
              <div>Together, they form the <span className="matrix-text font-bold">Solana Solution</span>.</div>
            </div>
          </div>

          {/* Mission */}
          <div className="space-y-3">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./lore --display --section=mission</span>
            </div>
            <div className="terminal-text text-sm space-y-2">
              <div className="hacker-text text-sm">🌍 Our Mission</div>
              <div>We exist to make Solana fertile ground for everyone:</div>
              <div className="ml-4 space-y-1">
                <div>• <span className="matrix-text font-bold">Builders</span>: tools to create</div>
                <div>• <span className="cyber-text font-bold">Traders</span>: speed and stability</div>
                <div>• <span className="hacker-text font-bold">Newcomers</span>: clarity and guidance</div>
              </div>
              <div>SOLution is not just a brand.</div>
              <div>It is a <span className="glitch-text font-bold">movement</span>.</div>
            </div>
          </div>

          {/* Identity */}
          <div className="space-y-3">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./lore --display --section=identity</span>
            </div>
            <div className="terminal-text text-sm space-y-2">
              <div className="hacker-text text-sm">🔥 Identity</div>
              <div>SOLution thrives on duality:</div>
              <div className="ml-4 space-y-1">
                <div>• <span className="matrix-text font-bold">Tech & Meme</span></div>
                <div>• <span className="cyber-text font-bold">Serious & Playful</span></div>
                <div>• <span className="hacker-text font-bold">Community & Code</span></div>
              </div>
              <div>This balance makes it <span className="matrix-text font-bold">accessible to newcomers</span> and <span className="glitch-text font-bold">powerful for veterans</span>.</div>
            </div>
          </div>

          {/* The Message */}
          <div className="space-y-3">
            <div className="terminal-text">
              <span className="cyber-text">$</span> <span className="text-code">./lore --display --section=message</span>
            </div>
            <div className="terminal-text text-sm space-y-2">
              <div className="hacker-text text-sm">🪐 The Message</div>
              <div>Blockchain didn't need another project.</div>
              <div>It needed <span className="matrix-text font-bold">the Solution</span>.</div>
              <div className="mt-4 p-4 bg-terminal/10 rounded border border-terminal/30">
                <div className="matrix-text font-bold">Born on Solana.</div>
                <div className="cyber-text font-bold">Built for the future.</div>
                <div className="glitch-text font-bold">Known as SOLution.</div>
              </div>
            </div>
          </div>

          {/* BUY/SELL Signals */}
          <div className="flex justify-center space-x-8 my-8">
            <div className="text-center">
              <div className="matrix-text text-6xl font-black glitch-text">BUY</div>
              <div className="terminal-text text-xs mt-2">[SIGNAL_STRONG]</div>
            </div>
            <div className="text-center">
              <div className="glitch-text text-6xl font-black matrix-text">SELL</div>
              <div className="terminal-text text-xs mt-2">[SIGNAL_STRONG]</div>
            </div>
          </div>

          <div className="terminal-text">
            <span className="cyber-text">$</span> <span className="text-code">echo "Ready to hack the market..."</span>
            <span className="terminal-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
