'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Building2 } from 'lucide-react'
import type { OnboardingStatus } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface LockedOverlayProps {
  status?: OnboardingStatus
  onStartOnboarding?: () => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LockedOverlay({
  status,
  onStartOnboarding,
  className,
}: LockedOverlayProps) {
  // This component now just renders a subtle banner at the top
  // instead of obscuring the entire card content
  return (
    <div
      className={cn(
        'absolute top-0 left-0 right-0 z-10',
        'flex items-center justify-center gap-25',
        'px-50 py-25 bg-warning-subtle/80 backdrop-blur-sm',
        'text-label-2xs font-medium text-warning',
        'rounded-t-2xl',
        className
      )}
    >
      <Building2 className="size-icon-xs" />
      <span>Institutional Only</span>
    </div>
  )
}
