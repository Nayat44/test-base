'use client'

import * as React from 'react'
import { Pill } from '@/components/ui/pill'
import { Clock, CheckCircle, Circle } from 'lucide-react'
import type { OnboardingStatus } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface OnboardingBadgeProps {
  status?: OnboardingStatus
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OnboardingBadge({ status, className }: OnboardingBadgeProps) {
  if (!status) return null

  const config = {
    not_started: {
      label: 'Not Started',
      type: 'primary' as const,
      appearance: 'subtle' as const,
      icon: <Circle className="size-icon-xs" />,
    },
    in_progress: {
      label: 'In Progress',
      type: 'warning' as const,
      appearance: 'subtle' as const,
      icon: <Clock className="size-icon-xs" />,
    },
    approved: {
      label: 'Approved',
      type: 'positive' as const,
      appearance: 'subtle' as const,
      icon: <CheckCircle className="size-icon-xs" />,
    },
  }

  const { label, type, appearance, icon } = config[status]

  return (
    <Pill
      type={type}
      appearance={appearance}
      size="16"
      beforeIcon={icon}
      className={className}
    >
      {label}
    </Pill>
  )
}
