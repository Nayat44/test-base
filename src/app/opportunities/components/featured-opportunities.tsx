'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TokenLogo, type TokenId } from '@/components/ui/token-logo'
import type { Opportunity } from '../types'
import { formatTVL, formatAPY } from '../mock-data'
import { Lock } from 'lucide-react'

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
// OPEN ACCESS CARD COMPONENT
// =============================================================================

interface OpenAccessCardProps {
  opportunity: Opportunity
  onDeposit?: (opportunity: Opportunity) => void
}

function OpenAccessCard({ opportunity, onDeposit }: OpenAccessCardProps) {
  const { asset, assetLogo, apy, tvl, protocol } = opportunity

  return (
    <div className="relative flex flex-col rounded-2xl bg-surface border border-border-subtle overflow-hidden transition-all duration-fast ease-default hover:border-border-strong hover:shadow-200">
      {/* Open Access Badge */}
      <div className="absolute top-75 right-75">
        <span className="text-label-xs font-medium text-positive bg-positive/10 px-50 py-25 rounded-full">
          Open Access
        </span>
      </div>

      <div className="flex flex-col p-100 gap-100">
        {/* Header: Token Info with APY */}
        <div className="flex items-center gap-75">
          <TokenLogo token={assetLogo} size="lg" />
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-50 w-full">
              <span className="text-label-md font-semibold text-fg-primary flex-1">
                {asset}
              </span>
              <span className="text-label-md font-semibold text-fg-primary text-right">
                {formatAPY(apy)}
              </span>
            </div>
            <span className="text-body-xs text-fg-tertiary">{protocol}</span>
          </div>
        </div>

        {/* TVL */}
        <div className="flex items-center justify-between pt-50 border-t border-border-weak">
          <div className="flex flex-col">
            <span className="text-body-xs text-fg-tertiary">TVL</span>
            <span className="text-label-md font-medium text-fg-secondary">
              {formatTVL(tvl)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={() => onDeposit?.(opportunity)}
          className="mt-50"
        >
          Deposit
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// INSTITUTIONAL LENDING CARD COMPONENT
// =============================================================================

interface InstitutionalLendingCardProps {
  opportunity: Opportunity
  onStartOnboarding?: (opportunity: Opportunity) => void
}

function InstitutionalLendingCard({ opportunity, onStartOnboarding }: InstitutionalLendingCardProps) {
  const { asset, assetLogo, apy, tvl, collateral = [] } = opportunity

  return (
    <div className="relative flex flex-col rounded-2xl bg-gradient-to-br from-surface via-surface to-warning/5 border border-warning/30 overflow-hidden transition-all duration-fast ease-default hover:border-warning/50 hover:shadow-200">
      {/* Locked Banner */}
      <div className="flex items-center gap-50 px-100 py-50 bg-warning/10 border-b border-warning/20">
        <Lock className="size-100 text-warning" />
        <span className="text-label-xs font-medium text-warning">
          Institutional Access Required
        </span>
      </div>

      <div className="flex flex-col p-100 gap-100">
        {/* Header */}
        <div className="flex flex-col gap-50">
          <span className="text-heading-h6 font-semibold text-fg-primary">
            Institutional Lending
          </span>
          <span className="text-body-xs text-fg-tertiary">
            Higher yields through vetted institutional borrowers
          </span>
        </div>

        {/* Lending Asset */}
        <div className="flex flex-col gap-50 p-75 bg-surface-subtle rounded-lg border border-border-weak">
          <span className="text-body-xs text-fg-tertiary uppercase tracking-wide">Lending Asset</span>
          <div className="flex items-center gap-75">
            <TokenLogo token={assetLogo} size="md" />
          <div className="flex items-center gap-50 flex-1">
            <span className="text-label-md font-semibold text-fg-primary flex-1">{asset}</span>
            <span className="text-label-md font-semibold text-fg-primary text-right">{formatAPY(apy)}</span>
          </div>
          </div>
        </div>

        {/* Collateral Section */}
        {collateral.length > 0 && (
          <div className="flex flex-col gap-50 p-75 bg-surface-subtle rounded-lg border border-border-weak">
            <span className="text-body-xs text-fg-tertiary uppercase tracking-wide">Backed by Collateral</span>
            <div className="flex items-center gap-50">
              {collateral.map((token, index) => (
                <div key={token} className="flex items-center gap-50">
                  <TokenLogo token={token as TokenId} size="sm" />
                  <span className="text-label-sm font-medium text-fg-secondary uppercase">
                    {token === 'lbtc' ? 'LSBTC' : token.toUpperCase()}
                  </span>
                  {index < collateral.length - 1 && (
                    <span className="text-fg-tertiary mx-25">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TVL */}
        <div className="flex items-center justify-between pt-50 border-t border-border-weak">
          <div className="flex flex-col">
            <span className="text-body-xs text-fg-tertiary">Total Value Locked</span>
            <span className="text-label-md font-medium text-fg-secondary">{formatTVL(tvl)}</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={() => onStartOnboarding?.(opportunity)}
          className="mt-50"
        >
          Start Onboarding
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function FeaturedOpportunities({
  opportunities,
  onDeposit,
  onStartOnboarding,
  className,
}: FeaturedOpportunitiesProps) {
  const featured = opportunities.filter((o) => o.isFeatured)
  const openAccess = featured.filter((o) => o.type === 'open').slice(0, 2)
  const institutional = featured.find((o) => o.type === 'institutional')

  if (featured.length === 0) return null

  return (
    <section className={cn('flex flex-col gap-100', className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-heading-h5 font-semibold text-fg-primary">
          Featured Opportunities
        </h2>
      </div>

      {/* Featured Cards - Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-100">
        {/* Open Access Cards - Stack on left */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-100">
          {openAccess.map((opportunity) => (
            <OpenAccessCard
              key={opportunity.id}
              opportunity={opportunity}
              onDeposit={onDeposit}
            />
          ))}
        </div>

        {/* Institutional Lending Card - Full height on right */}
        {institutional && (
          <div className="lg:col-span-1">
            <InstitutionalLendingCard
              opportunity={institutional}
              onStartOnboarding={onStartOnboarding}
            />
          </div>
        )}
      </div>
    </section>
  )
}
