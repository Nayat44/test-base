'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Opportunity, AssetCategory, Chain, SortOption, OpportunityType } from '../types'
import { AssetGroup } from './asset-group'

// =============================================================================
// TYPES
// =============================================================================

export interface OpportunityGridProps {
  opportunities: Opportunity[]
  chain: Chain | 'all'
  sort: SortOption
  type: OpportunityType
  onDeposit?: (opportunity: Opportunity) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
  onViewDetails?: (opportunity: Opportunity) => void
  className?: string
}

// =============================================================================
// HELPERS
// =============================================================================

const assetCategoryOrder: AssetCategory[] = ['stablecoin', 'btc', 'eth', 'other']

function filterOpportunities(
  opportunities: Opportunity[],
  chain: Chain | 'all',
  type: OpportunityType
): Opportunity[] {
  return opportunities.filter((o) => {
    // Exclude featured from grid (they appear separately)
    if (o.isFeatured) return false
    
    // Filter by type
    if (o.type !== type) return false
    
    // Filter by chain
    if (chain !== 'all' && o.chain !== chain) return false
    
    return true
  })
}

function sortOpportunities(
  opportunities: Opportunity[],
  sort: SortOption
): Opportunity[] {
  const sorted = [...opportunities]
  
  switch (sort) {
    case 'apy_desc':
      return sorted.sort((a, b) => b.apy - a.apy)
    case 'tvl_desc':
      return sorted.sort((a, b) => b.tvl - a.tvl)
    case 'newest':
      // For demo, reverse the array to simulate newest
      return sorted.reverse()
    default:
      return sorted
  }
}

function groupByAssetCategory(
  opportunities: Opportunity[]
): Record<AssetCategory, Opportunity[]> {
  const groups: Record<AssetCategory, Opportunity[]> = {
    stablecoin: [],
    btc: [],
    eth: [],
    other: [],
  }

  opportunities.forEach((o) => {
    groups[o.assetCategory].push(o)
  })

  return groups
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OpportunityGrid({
  opportunities,
  chain,
  sort,
  type,
  onDeposit,
  onStartOnboarding,
  onViewDetails,
  className,
}: OpportunityGridProps) {
  // Filter, sort, and group opportunities
  const filtered = filterOpportunities(opportunities, chain, type)
  const sorted = sortOpportunities(filtered, sort)
  const grouped = groupByAssetCategory(sorted)

  const hasOpportunities = sorted.length > 0

  if (!hasOpportunities) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-200', className)}>
        <p className="text-body-base text-fg-tertiary">
          No opportunities found matching your filters.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-150', className)}>
      {assetCategoryOrder.map((category) => (
        <AssetGroup
          key={category}
          category={category}
          opportunities={grouped[category]}
          onDeposit={onDeposit}
          onStartOnboarding={onStartOnboarding}
          onViewDetails={onViewDetails}
          hideInstitutionalTag={type === 'institutional'}
        />
      ))}
    </div>
  )
}
