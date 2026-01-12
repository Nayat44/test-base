import type { Opportunity, Position, PortfolioDataPoint } from './types'

// =============================================================================
// OPPORTUNITIES DATA
// =============================================================================

export const opportunities: Opportunity[] = [
  {
    id: 'syrup-usdc',
    protocol: 'Maple',
    protocolLogo: '/logos/maple.svg',
    asset: 'syrupUSDC',
    assetLogo: 'syrupusdc',
    assetCategory: 'stablecoin',
    apy: 8.2,
    tvl: 245000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'syrup-usdt',
    protocol: 'Maple',
    protocolLogo: '/logos/maple.svg',
    asset: 'syrupUSDT',
    assetLogo: 'syrupusdt',
    assetCategory: 'stablecoin',
    apy: 4.1,
    tvl: 180000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'syrup-btc',
    protocol: 'Maple',
    protocolLogo: '/logos/maple.svg',
    asset: 'syrupBTC',
    assetLogo: 'syrupbtc',
    assetCategory: 'btc',
    apy: 3.9,
    tvl: 120000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'maple-institutional',
    protocol: 'Maple',
    protocolLogo: '/logos/maple.svg',
    asset: 'USDC',
    assetLogo: 'usdc',
    assetCategory: 'stablecoin',
    apy: 8.0,
    tvl: 520000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'not_started',
    isFeatured: false,
    collateral: ['btc', 'eth', 'lbtc'],
  },
]

// =============================================================================
// POSITIONS DATA
// =============================================================================

export const positions: Position[] = [
  {
    id: 'pos-1',
    opportunityId: 'btc-1',
    asset: 'WBTC',
    assetLogo: 'wbtc',
    amount: 0.001,
    valueUsd: 90.56,
    apy: 0.044,
    earnings: 0.04,
    protocol: 'Aave',
    chain: 'ethereum',
  },
  {
    id: 'pos-2',
    opportunityId: 'stable-1',
    asset: 'USDC',
    assetLogo: 'usdc',
    amount: 5000,
    valueUsd: 5000,
    apy: 8.2,
    earnings: 34.16,
    protocol: 'Aave',
    chain: 'ethereum',
  },
  {
    id: 'pos-3',
    opportunityId: 'eth-1',
    asset: 'WETH',
    assetLogo: 'weth',
    amount: 2.5,
    valueUsd: 8750,
    apy: 3.5,
    earnings: 25.52,
    protocol: 'Aave',
    chain: 'ethereum',
  },
]

// =============================================================================
// PORTFOLIO CHART DATA
// =============================================================================

export const portfolioChartData: PortfolioDataPoint[] = [
  { date: '2025-12-01', balance: 12500, borrows: 0, deposits: 12500 },
  { date: '2025-12-05', balance: 12650, borrows: 0, deposits: 12650 },
  { date: '2025-12-10', balance: 12800, borrows: 0, deposits: 12800 },
  { date: '2025-12-15', balance: 13100, borrows: 0, deposits: 13100 },
  { date: '2025-12-20', balance: 13400, borrows: 0, deposits: 13400 },
  { date: '2025-12-25', balance: 13750, borrows: 0, deposits: 13750 },
  { date: '2025-12-30', balance: 13840, borrows: 0, deposits: 13840 },
  { date: '2026-01-05', balance: 13840.56, borrows: 0, deposits: 13840.56 },
]

// =============================================================================
// FILTER OPTIONS
// =============================================================================

export const chainOptions = [
  { value: 'all', label: 'All Chains', icon: null },
  { value: 'ethereum', label: 'Ethereum', icon: '/logos/eth.svg' },
  { value: 'arbitrum', label: 'Arbitrum', icon: '/logos/arbitrium.svg' },
  { value: 'solana', label: 'Solana', icon: '/logos/sol.svg' },
  { value: 'base', label: 'Base', icon: '/logos/eth.svg' },
]

export const sortOptions = [
  { value: 'apy_desc', label: 'APY (High to Low)' },
  { value: 'tvl_desc', label: 'TVL (High to Low)' },
  { value: 'newest', label: 'Newest' },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function formatTVL(tvl: number): string {
  if (tvl >= 1_000_000_000) {
    return `$${(tvl / 1_000_000_000).toFixed(1)}B`
  }
  if (tvl >= 1_000_000) {
    return `$${(tvl / 1_000_000).toFixed(0)}M`
  }
  if (tvl >= 1_000) {
    return `$${(tvl / 1_000).toFixed(0)}K`
  }
  return `$${tvl.toFixed(0)}`
}

export function formatAPY(apy: number): string {
  return `${apy.toFixed(2)}%`
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatAmount(amount: number, decimals: number = 4): string {
  if (amount < 0.0001) {
    return amount.toExponential(2)
  }
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}

export function getAssetCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    stablecoin: 'Stablecoins',
    btc: 'Bitcoin',
    eth: 'Ethereum',
    other: 'Other',
  }
  return labels[category] || category
}

export function getChainLabel(chain: string): string {
  const labels: Record<string, string> = {
    ethereum: 'Ethereum',
    arbitrum: 'Arbitrum',
    solana: 'Solana',
    base: 'Base',
  }
  return labels[chain] || chain
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return opportunities.find((o) => o.id === id)
}
