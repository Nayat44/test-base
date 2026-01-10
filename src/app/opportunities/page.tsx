'use client'

import * as React from 'react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  OpportunityGrid,
  FilterBar,
  DepositModal,
  OnboardingModal,
} from './components'
import {
  opportunities,
} from './mock-data'
import type { Opportunity, Chain, SortOption, OpportunityType } from './types'

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function OpportunitiesPage() {
  // Filter state
  const [opportunityType, setOpportunityType] = React.useState<OpportunityType>('open')
  const [chain, setChain] = React.useState<Chain | 'all'>('all')
  const [sort, setSort] = React.useState<SortOption>('apy_desc')

  // Modal state
  const [depositModalOpen, setDepositModalOpen] = React.useState(false)
  const [onboardingModalOpen, setOnboardingModalOpen] = React.useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = React.useState<Opportunity | null>(null)

  // Handlers
  const handleDeposit = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setDepositModalOpen(true)
  }

  const handleStartOnboarding = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setOnboardingModalOpen(true)
  }

  const handleViewDetails = (opportunity: Opportunity) => {
    console.log('Viewing details for', opportunity.asset, 'by', opportunity.protocol)
    // In real app, would navigate to details page
  }

  const handleConfirmDeposit = (opportunity: Opportunity, amount: string) => {
    console.log('Depositing', amount, opportunity.asset, 'into', opportunity.protocol)
    // In real app, would call contract here
  }

  return (
    <div className="flex flex-col gap-150 p-150 max-w-[1000px] min-w-[800px] mx-auto">
      {/* Opportunities Section */}
      <div className="flex flex-col gap-100">
        {/* Type Tabs + Filters */}
        <div className="flex items-center justify-between">
          {/* Type Tabs */}
          <Tabs
            value={opportunityType}
            onValueChange={(value) => setOpportunityType(value as OpportunityType)}
          >
            <TabsList variant="canvas" padding="noPadding">
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="institutional">Institutional</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filters */}
          <FilterBar
            chain={chain}
            sort={sort}
            onChainChange={setChain}
            onSortChange={setSort}
          />
        </div>

        {/* Opportunity Grid */}
        <OpportunityGrid
          opportunities={opportunities}
          chain={chain}
          sort={sort}
          type={opportunityType}
          onDeposit={handleDeposit}
          onStartOnboarding={handleStartOnboarding}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Modals */}
      <DepositModal
        opportunity={selectedOpportunity}
        open={depositModalOpen}
        onOpenChange={setDepositModalOpen}
        onConfirm={handleConfirmDeposit}
      />

      <OnboardingModal
        opportunity={selectedOpportunity}
        open={onboardingModalOpen}
        onOpenChange={setOnboardingModalOpen}
        onStartOnboarding={(opp) => {
          console.log('Starting onboarding for', opp.protocol)
          // In real app, would redirect to onboarding flow
        }}
      />
    </div>
  )
}
