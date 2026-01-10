'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Position } from '../types'
import { formatUSD } from '../mock-data'
import { PositionCard } from './position-card'

// =============================================================================
// TYPES
// =============================================================================

export interface PositionsGridProps {
  positions: Position[]
  onWithdraw?: (position: Position) => void
  onAddMore?: (position: Position) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function PositionsGrid({
  positions,
  onWithdraw,
  onAddMore,
  className,
}: PositionsGridProps) {
  // Calculate totals
  const totalValue = positions.reduce((sum, p) => sum + p.valueUsd, 0)
  const totalEarnings = positions.reduce((sum, p) => sum + p.earnings, 0)
  const avgApy = positions.length > 0
    ? positions.reduce((sum, p) => sum + p.apy, 0) / positions.length
    : 0

  if (positions.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-200', className)}>
        <p className="text-body-base text-fg-tertiary">
          You don&apos;t have any positions yet.
        </p>
        <p className="text-body-sm text-fg-muted mt-25">
          Explore opportunities and make your first deposit.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-150', className)}>
      {/* Summary Stats */}
      <div className="flex items-center gap-150 p-100 rounded-xl bg-primary">
        <div className="flex flex-col">
          <span className="text-body-xs text-fg-tertiary">Total Value</span>
          <span className="text-heading-h5 font-semibold text-fg-primary">
            {formatUSD(totalValue)}
          </span>
        </div>
        <div className="w-px h-control-md bg-border-subtle" />
        <div className="flex flex-col">
          <span className="text-body-xs text-fg-tertiary">Avg APY</span>
          <span className="text-heading-h5 font-semibold text-positive">
            {avgApy.toFixed(2)}%
          </span>
        </div>
        <div className="w-px h-control-md bg-border-subtle" />
        <div className="flex flex-col">
          <span className="text-body-xs text-fg-tertiary">Total Earnings</span>
          <span className="text-heading-h5 font-semibold text-fg-primary">
            {formatUSD(totalEarnings)}
          </span>
        </div>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-100">
        {positions.map((position) => (
          <PositionCard
            key={position.id}
            position={position}
            onWithdraw={onWithdraw}
            onAddMore={onAddMore}
          />
        ))}
      </div>
    </div>
  )
}
