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
import { Shield, Clock, FileCheck, ArrowRight } from 'lucide-react'
import type { Opportunity } from '../types'
import { formatAPY, formatTVL, getChainLabel } from '../mock-data'
import { OnboardingBadge } from './onboarding-badge'

// =============================================================================
// TYPES
// =============================================================================

export interface OnboardingModalProps {
  opportunity: Opportunity | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartOnboarding?: (opportunity: Opportunity) => void
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OnboardingModal({
  opportunity,
  open,
  onOpenChange,
  onStartOnboarding,
}: OnboardingModalProps) {
  if (!opportunity) return null

  const handleStart = () => {
    onStartOnboarding?.(opportunity)
    onOpenChange(false)
  }

  const steps = [
    {
      icon: <Shield className="size-icon-lg" />,
      title: 'Identity Verification',
      description: 'Complete KYC/AML verification process',
    },
    {
      icon: <FileCheck className="size-icon-lg" />,
      title: 'Accreditation',
      description: 'Verify accredited investor status',
    },
    {
      icon: <Clock className="size-icon-lg" />,
      title: 'Review Period',
      description: '1-3 business days for approval',
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogTitle>Institutional Onboarding Required</DialogTitle>
        <DialogDescription>
          This opportunity requires institutional onboarding before you can deposit.
        </DialogDescription>

        {/* Opportunity Info */}
        <div className="flex items-center gap-75 p-75 rounded-lg bg-primary mt-100">
          <TokenLogo token={opportunity.assetLogo} size="lg" />
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-50 w-full">
              <span className="text-label-md font-semibold text-fg-primary flex-1">
                {opportunity.asset}
              </span>
              <OnboardingBadge status={opportunity.onboardingStatus} />
            </div>
            <span className="text-body-xs text-fg-tertiary">
              {opportunity.protocol} • {getChainLabel(opportunity.chain)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-label-md font-semibold text-positive">
              {formatAPY(opportunity.apy)}
            </span>
            <span className="text-body-xs text-fg-tertiary">
              TVL: {formatTVL(opportunity.tvl)}
            </span>
          </div>
        </div>

        {/* Onboarding Steps */}
        <div className="flex flex-col gap-75 mt-150">
          <h4 className="text-label-sm font-semibold text-fg-primary">
            Onboarding Steps
          </h4>
          <div className="flex flex-col gap-50">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-75 p-75 rounded-lg bg-primary"
              >
                <div className="flex items-center justify-center size-control-md rounded-full bg-surface text-fg-secondary">
                  {step.icon}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-label-sm font-medium text-fg-primary">
                    {step.title}
                  </span>
                  <span className="text-body-xs text-fg-tertiary">
                    {step.description}
                  </span>
                </div>
              </div>
            ))}
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
            Maybe Later
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleStart}
            afterIcon={<ArrowRight />}
          >
            Start Onboarding
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
