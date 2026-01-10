import type { Opportunity, Position, PortfolioDataPoint } from './types'

// =============================================================================
// OPPORTUNITIES DATA
// =============================================================================

export const opportunities: Opportunity[] = [
  // Featured Opportunities
  {
    id: 'feat-1',
    protocol: 'Morpho',
    protocolLogo: '/logos/morpho.svg',
    asset: 'USDC',
    assetLogo: 'usdc',
    assetCategory: 'stablecoin',
    apy: 12.5,
    tvl: 245000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'not_started',
    isFeatured: true,
  },
  {
    id: 'feat-2',
    protocol: 'Aave',
    protocolLogo: '/logos/aave.svg',
    asset: 'WBTC',
    assetLogo: 'wbtc',
    assetCategory: 'btc',
    apy: 4.2,
    tvl: 180000000,
    chain: 'arbitrum',
    type: 'open',
    isFeatured: true,
  },
  {
    id: 'feat-3',
    protocol: 'Spark',
    protocolLogo: '/logos/spark.svg',
    asset: 'WETH',
    assetLogo: 'weth',
    assetCategory: 'eth',
    apy: 5.8,
    tvl: 320000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: true,
  },

  // Stablecoin Opportunities
  {
    id: 'stable-1',
    protocol: 'Aave',
    protocolLogo: '/logos/aave.svg',
    asset: 'USDC',
    assetLogo: 'usdc',
    assetCategory: 'stablecoin',
    apy: 8.2,
    tvl: 500000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'stable-2',
    protocol: 'Morpho',
    protocolLogo: '/logos/morpho.svg',
    asset: 'USDC',
    assetLogo: 'usdc',
    assetCategory: 'stablecoin',
    apy: 12.5,
    tvl: 245000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'in_progress',
    isFeatured: false,
  },
  {
    id: 'stable-3',
    protocol: 'Fluid',
    protocolLogo: '/logos/fluid.svg',
    asset: 'USDT',
    assetLogo: 'usdt',
    assetCategory: 'stablecoin',
    apy: 7.8,
    tvl: 320000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'stable-4',
    protocol: 'Spark',
    protocolLogo: '/logos/spark.svg',
    asset: 'DAI',
    assetLogo: 'dai',
    assetCategory: 'stablecoin',
    apy: 9.1,
    tvl: 180000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'stable-5',
    protocol: 'Aave',
    protocolLogo: '/logos/aave.svg',
    asset: 'USDC',
    assetLogo: 'usdc',
    assetCategory: 'stablecoin',
    apy: 10.2,
    tvl: 150000000,
    chain: 'arbitrum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'stable-6',
    protocol: 'Maple',
    protocolLogo: '/logos/maple.svg',
    asset: 'USDC',
    assetLogo: 'usdc',
    assetCategory: 'stablecoin',
    apy: 14.5,
    tvl: 85000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'approved',
    isFeatured: false,
  },

  // BTC Opportunities
  {
    id: 'btc-1',
    protocol: 'Aave',
    protocolLogo: '/logos/aave.svg',
    asset: 'WBTC',
    assetLogo: 'wbtc',
    assetCategory: 'btc',
    apy: 2.1,
    tvl: 280000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'btc-2',
    protocol: 'Morpho',
    protocolLogo: '/logos/morpho.svg',
    asset: 'cbBTC',
    assetLogo: 'cbbtc',
    assetCategory: 'btc',
    apy: 4.2,
    tvl: 180000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'not_started',
    isFeatured: false,
  },
  {
    id: 'btc-3',
    protocol: 'Fluid',
    protocolLogo: '/logos/fluid.svg',
    asset: 'WBTC',
    assetLogo: 'wbtc',
    assetCategory: 'btc',
    apy: 1.8,
    tvl: 120000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'btc-4',
    protocol: 'Lombard',
    protocolLogo: '/logos/lombard.svg',
    asset: 'LBTC',
    assetLogo: 'lbtc',
    assetCategory: 'btc',
    apy: 3.5,
    tvl: 95000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'in_progress',
    isFeatured: false,
  },

  // ETH Opportunities
  {
    id: 'eth-1',
    protocol: 'Aave',
    protocolLogo: '/logos/aave.svg',
    asset: 'WETH',
    assetLogo: 'weth',
    assetCategory: 'eth',
    apy: 3.5,
    tvl: 450000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'eth-2',
    protocol: 'Morpho',
    protocolLogo: '/logos/morpho.svg',
    asset: 'stETH',
    assetLogo: 'weth',
    assetCategory: 'eth',
    apy: 5.8,
    tvl: 320000000,
    chain: 'ethereum',
    type: 'institutional',
    onboardingStatus: 'approved',
    isFeatured: false,
  },
  {
    id: 'eth-3',
    protocol: 'Aave',
    protocolLogo: '/logos/aave.svg',
    asset: 'WETH',
    assetLogo: 'weth',
    assetCategory: 'eth',
    apy: 4.2,
    tvl: 200000000,
    chain: 'arbitrum',
    type: 'open',
    isFeatured: false,
  },
  {
    id: 'eth-4',
    protocol: 'Spark',
    protocolLogo: '/logos/spark.svg',
    asset: 'WETH',
    assetLogo: 'weth',
    assetCategory: 'eth',
    apy: 4.8,
    tvl: 175000000,
    chain: 'ethereum',
    type: 'open',
    isFeatured: false,
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
  { value: 'all', label: 'All Chains' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'arbitrum', label: 'Arbitrum' },
  { value: 'solana', label: 'Solana' },
  { value: 'base', label: 'Base' },
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
