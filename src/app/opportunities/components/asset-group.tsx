'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Opportunity, AssetCategory } from '../types'
import { getAssetCategoryLabel } from '../mock-data'
import { OpportunityCard } from './opportunity-card'

// =============================================================================
// TYPES
// =============================================================================

export interface AssetGroupProps {
  category: AssetCategory
  opportunities: Opportunity[]
  onDeposit?: (opportunity: Opportunity) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
  className?: string
  hideInstitutionalTag?: boolean
}

// =============================================================================
// COMPONENT
// =============================================================================

export function AssetGroup({
  category,
  opportunities,
  onDeposit,
  onStartOnboarding,
  className,
  hideInstitutionalTag = false,
}: AssetGroupProps) {
  if (opportunities.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-100', className)}>
      {/* Group Header */}
      <div className="flex items-center gap-75">
        <h3 className="text-label-md font-semibold text-fg-primary">
          {getAssetCategoryLabel(category)}
        </h3>
        <span className="text-body-xs text-fg-tertiary">
          {opportunities.length} {opportunities.length === 1 ? 'opportunity' : 'opportunities'}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-100">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onDeposit={onDeposit}
            onStartOnboarding={onStartOnboarding}
            hideInstitutionalTag={hideInstitutionalTag}
          />
        ))}
      </div>
    </div>
  )
}
