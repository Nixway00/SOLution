import { Connection, PublicKey } from '@solana/web3.js'
import { config } from './config'

export const SOLUTION_TOKEN_ADDRESS = config.solana.solutionTokenAddress
export const SOLUTION_TOKEN_DECIMALS = config.solana.solutionTokenDecimals
export const REQUIRED_WHOLE_TOKENS = config.solana.requiredWholeTokens

export interface TokenBalance {
  balance: number
  hasAccess: boolean
  required: number
  current: number
}

export async function getTokenBalance(
  connection: Connection,
  walletAddress: PublicKey,
  tokenMint: string
): Promise<TokenBalance> {
  try {
    const mintPublicKey = new PublicKey(tokenMint)
    
    // Get all token accounts for the wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletAddress,
      {
        mint: mintPublicKey,
      }
    )

    // Sum up all token accounts for this mint
    let totalBalance = 0
    for (const account of tokenAccounts.value) {
      const tokenAmount = account.account.data.parsed.info.tokenAmount
      totalBalance += parseInt(tokenAmount.amount)
    }

    // Convert from raw amount to whole tokens
    const wholeTokens = totalBalance / Math.pow(10, SOLUTION_TOKEN_DECIMALS)
    const hasAccess = wholeTokens >= REQUIRED_WHOLE_TOKENS

    return {
      balance: wholeTokens,
      hasAccess,
      required: REQUIRED_WHOLE_TOKENS,
      current: Math.floor(wholeTokens)
    }
  } catch (error) {
    console.error('Error fetching token balance:', error)
    return {
      balance: 0,
      hasAccess: false,
      required: REQUIRED_WHOLE_TOKENS,
      current: 0
    }
  }
}

export function formatTokenAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
