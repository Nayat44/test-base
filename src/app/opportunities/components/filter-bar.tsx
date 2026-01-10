'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Select } from '@/components/ui/select'
import { chainOptions, sortOptions } from '../mock-data'
import type { Chain, SortOption } from '../types'

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
        options={chainOptions}
        value={chain}
        onValueChange={(value) => onChainChange(value as Chain | 'all')}
        size="sm"
        variant="ghost"
        placeholder="All Chains"
      />
      <Select
        options={sortOptions}
        value={sort}
        onValueChange={(value) => onSortChange(value as SortOption)}
        size="sm"
        variant="ghost"
        placeholder="Sort by"
      />
    </div>
  )
}
