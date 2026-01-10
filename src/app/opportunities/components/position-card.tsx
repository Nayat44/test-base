'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TokenLogo } from '@/components/ui/token-logo'
import { Pill } from '@/components/ui/pill'
import type { Position } from '../types'
import { formatUSD, formatAmount, formatAPY, getChainLabel } from '../mock-data'

// =============================================================================
// TYPES
// =============================================================================

export interface PositionCardProps {
  position: Position
  onWithdraw?: (position: Position) => void
  onAddMore?: (position: Position) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PositionCard({
  position,
  onWithdraw,
  onAddMore,
  className,
}: PositionCardProps) {
  const { asset, assetLogo, amount, valueUsd, apy, earnings, protocol, chain } = position

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl bg-surface border border-border-subtle overflow-hidden',
        'transition-all duration-fast ease-default',
        'hover:border-border-strong hover:shadow-200',
        className
      )}
    >
      {/* Card Content */}
      <div className="flex flex-col p-100 gap-100">
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

          <Pill type="info" appearance="subtle" size="20">
            {getChainLabel(chain)}
          </Pill>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-75 pt-50 border-t border-border-weak">
          {/* Deposited Amount */}
          <div className="flex flex-col">
            <span className="text-body-xs text-fg-tertiary">Deposited</span>
            <span className="text-label-md font-semibold text-fg-primary">
              {formatAmount(amount)} {asset}
            </span>
            <span className="text-body-xs text-fg-tertiary">
              {formatUSD(valueUsd)}
            </span>
          </div>

          {/* APY */}
          <div className="flex flex-col">
            <span className="text-body-xs text-fg-tertiary">APY</span>
            <span className="text-label-md font-semibold text-positive">
              {formatAPY(apy)}
            </span>
          </div>

          {/* Earnings */}
          <div className="flex flex-col col-span-2">
            <span className="text-body-xs text-fg-tertiary">Earnings</span>
            <span className="text-label-md font-semibold text-fg-primary">
              {formatUSD(earnings)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-50 mt-50">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={() => onWithdraw?.(position)}
          >
            Withdraw
          </Button>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={() => onAddMore?.(position)}
          >
            Add More
          </Button>
        </div>
      </div>
    </div>
  )
}
