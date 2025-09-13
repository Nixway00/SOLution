# SOLution - Trading Oracle

A Next.js 14 dApp that analyzes trading charts using AI and provides BUY/SELL signals.

## Features

- 🔗 **Wallet Connection**: Connect with Phantom wallet
- 🎯 **AI Analysis**: Upload chart images for BUY/SELL analysis
- 🎨 **Terminal UI**: Matrix/Hacker themed interface
- ⚡ **Solana Integration**: Built on Solana blockchain
- 🤖 **Groq AI**: Powered by Groq's vision models

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Blockchain**: Solana, Phantom Wallet
- **AI**: Groq API (Llama 4 Scout)
- **Deployment**: Vercel

## Environment Variables

Create `.env.local` with:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
SOLANA_RPC=your_solana_rpc_url
SOLUTION_TOKEN_ADDRESS=your_token_address
SOLUTION_TOKEN_DECIMALS=6
REQUIRED_WHOLE_TOKENS=1000000
```

## Deploy on Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.