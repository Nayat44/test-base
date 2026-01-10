import type { TokenId } from '@/components/ui/token-logo'

// =============================================================================
// OPPORTUNITY TYPES
// =============================================================================

export type AssetCategory = 'stablecoin' | 'btc' | 'eth' | 'other'

export type OpportunityType = 'institutional' | 'open'

export type OnboardingStatus = 'not_started' | 'in_progress' | 'approved'

export type Chain = 'ethereum' | 'arbitrum' | 'solana' | 'base'

export interface Opportunity {
  id: string
  protocol: string
  protocolLogo: string
  asset: string
  assetLogo: TokenId
  assetCategory: AssetCategory
  apy: number
  tvl: number
  chain: Chain
  type: OpportunityType
  onboardingStatus?: OnboardingStatus
  isFeatured: boolean
}

// =============================================================================
// POSITION TYPES
// =============================================================================

export interface Position {
  id: string
  opportunityId: string
  asset: string
  assetLogo: TokenId
  amount: number
  valueUsd: number
  apy: number
  earnings: number
  protocol: string
  chain: Chain
}

// =============================================================================
// FILTER & SORT TYPES
// =============================================================================

export type SortOption = 'apy_desc' | 'tvl_desc' | 'newest'

export interface FilterState {
  chain: Chain | 'all'
  sort: SortOption
  type: OpportunityType
}

// =============================================================================
// CHART DATA TYPES
// =============================================================================

export interface PortfolioDataPoint {
  date: string
  balance: number
  borrows: number
  deposits: number
}
