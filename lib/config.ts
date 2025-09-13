// Environment configuration
export const config = {
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct',
  },
  solana: {
    rpcUrl: process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
    solutionTokenAddress: process.env.SOLUTION_TOKEN_ADDRESS || 'TO_BE_ADDED',
    solutionTokenDecimals: parseInt(process.env.SOLUTION_TOKEN_DECIMALS || '6'),
    requiredWholeTokens: parseInt(process.env.REQUIRED_WHOLE_TOKENS || '1000000'),
  },
} as const
