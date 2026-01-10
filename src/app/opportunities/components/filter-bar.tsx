'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/select'
import { TrendingUp, BarChart3, Clock, Globe } from 'lucide-react'
import { chainOptions } from '../mock-data'
import type { Chain, SortOption } from '../types'

// =============================================================================
// SORT OPTIONS WITH ICONS
// =============================================================================

const sortOptionsWithIcons = [
  { value: 'apy_desc', label: 'Highest APY', icon: <TrendingUp className="size-icon-sm" /> },
  { value: 'tvl_desc', label: 'Highest TVL', icon: <BarChart3 className="size-icon-sm" /> },
  { value: 'newest', label: 'Newest', icon: <Clock className="size-icon-sm" /> },
]

// Chain options with globe icon for "All Chains"
const chainOptionsWithIcons = chainOptions.map((option) => ({
  ...option,
  icon: option.value === 'all' ? <Globe className="size-icon-sm" /> : option.icon,
}))

// =============================================================================
// TYPES
// =============================================================================

export interface FilterBarProps {
  chain: Chain | 'all'
  sort: SortOption
  onChainChange: (chain: Chain | 'all') => void
  onSortChange: (sort: SortOption) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FilterBar({
  chain,
  sort,
  onChainChange,
  onSortChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex items-center gap-75', className)}>
      <Select
        options={chainOptionsWithIcons}
        value={chain}
        onValueChange={(value) => onChainChange(value as Chain | 'all')}
        size="sm"
        variant="tertiary"
        placeholder="All Chains"
      />
      <Select
        options={sortOptionsWithIcons}
        value={sort}
        onValueChange={(value) => onSortChange(value as SortOption)}
        size="sm"
        variant="tertiary"
        placeholder="Sort by"
      />
    </div>
  )
}
