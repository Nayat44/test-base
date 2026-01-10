'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TokenLogo } from '@/components/ui/token-logo'
import { Pill } from '@/components/ui/pill'
import type { Opportunity } from '../types'
import { formatTVL, formatAPY, getChainLabel } from '../mock-data'
import { OnboardingBadge } from './onboarding-badge'
import { LockedOverlay } from './locked-overlay'

// =============================================================================
// TYPES
// =============================================================================

export interface OpportunityCardProps {
  opportunity: Opportunity
  onDeposit?: (opportunity: Opportunity) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
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
  className,
  featured = false,
  hideInstitutionalTag = false,
}: OpportunityCardProps) {
  const {
    asset,
    assetLogo,
    apy,
    tvl,
    chain,
    protocol,
    type,
    onboardingStatus,
  } = opportunity

  const isInstitutional = type === 'institutional'
  const needsOnboarding = isInstitutional && onboardingStatus !== 'approved'
  const showOnboardingBadge = isInstitutional && onboardingStatus

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
        {/* Header: Token + Chain */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-75">
            <TokenLogo token={assetLogo} size="lg" />
            <div className="flex flex-col">
              <span className="text-label-md font-semibold text-fg-primary">
                {asset}
              </span>
              <span className="text-body-xs text-fg-tertiary">{protocol}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-25">
            <Pill type="info" appearance="subtle" size="20">
              {getChainLabel(chain)}
            </Pill>
            {showOnboardingBadge && (
              <OnboardingBadge status={onboardingStatus} />
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between pt-50 border-t border-border-weak">
          <div className="flex flex-col">
            <span className="text-body-xs text-fg-tertiary">APY</span>
            <span className="text-heading-h5 font-semibold text-positive">
              {formatAPY(apy)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-body-xs text-fg-tertiary">TVL</span>
            <span className="text-label-md font-medium text-fg-secondary">
              {formatTVL(tvl)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          variant={needsOnboarding ? 'secondary' : 'primary'}
          size="sm"
          fullWidth
          onClick={handleClick}
          className="mt-50"
        >
          {needsOnboarding ? 'Start Onboarding' : 'Deposit'}
        </Button>
      </div>
    </div>
  )
}
