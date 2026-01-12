'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TokenLogo } from '@/components/ui/token-logo'
import type { Opportunity } from '../types'
import { formatTVL, formatAPY } from '../mock-data'
import { LockedOverlay } from './locked-overlay'

// =============================================================================
// TYPES
// =============================================================================

export interface OpportunityCardProps {
  opportunity: Opportunity
  onDeposit?: (opportunity: Opportunity) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
  onViewDetails?: (opportunity: Opportunity) => void
  className?: string
  featured?: boolean
  hideInstitutionalTag?: boolean
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OpportunityCard({
  opportunity,
  onDeposit,
  onStartOnboarding,
  onViewDetails,
  className,
  featured = false,
  hideInstitutionalTag = false,
}: OpportunityCardProps) {
  const {
    asset,
    assetLogo,
    apy,
    tvl,
    protocol,
    type,
    onboardingStatus,
  } = opportunity

  const isInstitutional = type === 'institutional'
  const needsOnboarding = isInstitutional && onboardingStatus !== 'approved'

  const handleClick = () => {
    if (needsOnboarding) {
      onStartOnboarding?.(opportunity)
    } else {
      onDeposit?.(opportunity)
    }
  }

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl bg-surface border border-border-subtle overflow-hidden',
        'transition-all duration-fast ease-default',
        'hover:border-border-strong hover:shadow-200',
        featured && 'border-brand/30 bg-gradient-to-br from-surface to-brand-subtle/10',
        isInstitutional && 'border-warning/30',
        className
      )}
    >
      {/* Institutional indicator banner */}
      {isInstitutional && !hideInstitutionalTag && <LockedOverlay status={onboardingStatus} />}

      {/* Card Content */}
      <div className={cn('flex flex-col p-100 gap-100', isInstitutional && !hideInstitutionalTag && 'pt-150')}>
        {/* Header: Token Info with APY */}
        <div className="flex items-center gap-75">
          <TokenLogo token={assetLogo} size="lg" />
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-50 w-full">
              <span className="text-label-md font-semibold text-fg-primary flex-1">
                {asset}
              </span>
              <span className="text-label-md font-semibold text-fg-primary text-right">
                APY {formatAPY(apy)}
              </span>
            </div>
            <span className="text-body-xs text-fg-tertiary">{protocol}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between pt-50 border-t border-border-weak">
          <div className="flex flex-col items-start">
            <span className="text-body-xs text-fg-tertiary">TVL</span>
            <span className="text-label-md font-medium text-fg-secondary">
              {formatTVL(tvl)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-body-xs text-fg-tertiary">Collateral Ratio</span>
            <span className="text-label-md font-medium text-fg-secondary text-positive">
              &gt; 150%
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-50 mt-50">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleClick}
          >
            {needsOnboarding ? 'Start Onboarding' : 'Deposit'}
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            fullWidth
            onClick={() => onViewDetails?.(opportunity)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
