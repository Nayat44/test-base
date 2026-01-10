'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TokenLogo } from '@/components/ui/token-logo'
import { Pill } from '@/components/ui/pill'
import type { Opportunity } from '../types'
import { formatAPY, formatTVL, getChainLabel } from '../mock-data'

// =============================================================================
// TYPES
// =============================================================================

export interface DepositModalProps {
  opportunity: Opportunity | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: (opportunity: Opportunity, amount: string) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function DepositModal({
  opportunity,
  open,
  onOpenChange,
  onConfirm,
}: DepositModalProps) {
  const [amount, setAmount] = React.useState('')

  // Reset amount when modal opens with new opportunity
  React.useEffect(() => {
    if (open) {
      setAmount('')
    }
  }, [open, opportunity?.id])

  if (!opportunity) return null

  const handleConfirm = () => {
    if (amount && opportunity) {
      onConfirm?.(opportunity, amount)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogTitle>Deposit {opportunity.asset}</DialogTitle>
        <DialogDescription>
          Deposit into {opportunity.protocol} on {getChainLabel(opportunity.chain)}
        </DialogDescription>

        {/* Opportunity Info */}
        <div className="flex items-center gap-75 p-75 rounded-lg bg-primary mt-100">
          <TokenLogo token={opportunity.assetLogo} size="lg" />
          <div className="flex flex-col flex-1">
            <span className="text-label-md font-semibold text-fg-primary">
              {opportunity.asset}
            </span>
            <span className="text-body-xs text-fg-tertiary">
              {opportunity.protocol}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-label-md font-semibold text-positive">
              {formatAPY(opportunity.apy)}
            </span>
            <span className="text-body-xs text-fg-tertiary">APY</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-50 mt-100">
          <label className="text-label-sm font-medium text-fg-primary">
            Amount
          </label>
          <div className="flex items-center gap-50 p-75 rounded-lg border border-border-subtle bg-surface focus-within:border-brand">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-heading-h5 font-semibold text-fg-primary outline-none placeholder:text-fg-muted"
            />
            <Pill type="secondary" appearance="default" size="24">
              {opportunity.asset}
            </Pill>
          </div>
          <div className="flex items-center justify-between text-body-xs text-fg-tertiary">
            <span>TVL: {formatTVL(opportunity.tvl)}</span>
            <button className="text-brand hover:underline">Max</button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-50 mt-150">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleConfirm}
            disabled={!amount}
          >
            Confirm Deposit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
