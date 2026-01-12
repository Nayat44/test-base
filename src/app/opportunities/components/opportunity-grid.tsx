'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Opportunity, Chain, SortOption } from '../types'
import { OpportunityCard } from './opportunity-card'

// =============================================================================
// TYPES
// =============================================================================

export interface OpportunityGridProps {
  opportunities: Opportunity[]
  chain: Chain | 'all'
  sort: SortOption
  onDeposit?: (opportunity: Opportunity) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
  onViewDetails?: (opportunity: Opportunity) => void
  className?: string
}

// =============================================================================
// HELPERS
// =============================================================================

function filterOpportunities(
  opportunities: Opportunity[],
  chain: Chain | 'all'
): Opportunity[] {
  return opportunities.filter((o) => {
    // Exclude featured from grid (they appear separately)
    if (o.isFeatured) return false
    
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

// =============================================================================
// COMPONENT
// =============================================================================

export function OpportunityGrid({
  opportunities,
  chain,
  sort,
  onDeposit,
  onStartOnboarding,
  onViewDetails,
  className,
}: OpportunityGridProps) {
  // Filter and sort opportunities
  const filtered = filterOpportunities(opportunities, chain)
  const sorted = sortOpportunities(filtered, sort)

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-100">
        {sorted.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onDeposit={onDeposit}
            onStartOnboarding={onStartOnboarding}
            onViewDetails={onViewDetails}
            hideInstitutionalTag={false}
          />
        ))}
      </div>
    </div>
  )
}
