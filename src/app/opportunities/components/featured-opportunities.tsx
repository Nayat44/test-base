'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Opportunity } from '../types'
import { OpportunityCard } from './opportunity-card'

// =============================================================================
// TYPES
// =============================================================================

export interface FeaturedOpportunitiesProps {
  opportunities: Opportunity[]
  onDeposit?: (opportunity: Opportunity) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FeaturedOpportunities({
  opportunities,
  onDeposit,
  onStartOnboarding,
  className,
}: FeaturedOpportunitiesProps) {
  const featured = opportunities.filter((o) => o.isFeatured).slice(0, 2)

  if (featured.length === 0) return null

  return (
    <section className={cn('flex flex-col gap-100', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-heading-h5 font-semibold text-fg-primary">
          Featured Opportunities
        </h2>
      </div>

      {/* Featured Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-100">
        {featured.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onDeposit={onDeposit}
            onStartOnboarding={onStartOnboarding}
            featured
          />
        ))}
      </div>
    </section>
  )
}
