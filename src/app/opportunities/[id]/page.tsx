'use client'

import * as React from 'react'
import { use } from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'
import {
  Button,
  IconButton,
  Pill,
  TokenLogo,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
  DashboardCard,
} from '@/components/ui'
import {
  ArrowLeft,
  ExternalLink,
  Info,
  ShieldCheck,
  TrendingUp,
  Lock,
  Zap,
} from 'lucide-react'
import { getOpportunityById, formatAPY, formatTVL, getChainLabel } from '../mock-data'
import { Opportunity } from '../types'

// =============================================================================
// HELPERS
// =============================================================================

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function InfoRow({ label, value, tooltip }: { label: string; value: React.ReactNode; tooltip?: string }) {
  return (
    <div className="flex items-center justify-between py-75 border-b border-border-subtle last:border-0">
      <div className="flex items-center gap-50">
        <span className="text-label-sm text-fg-secondary">{label}</span>
        {tooltip && <Info className="size-icon-xs text-fg-tertiary cursor-help" />}
      </div>
      <span className="text-label-sm font-medium text-fg-primary">{value}</span>
    </div>
  )
}

function StatCard({ label, value, subValue, trend }: { label: string; value: string; subValue?: string; trend?: string }) {
  return (
    <div className="flex flex-col gap-25">
      <span className="text-label-xs font-medium text-fg-secondary uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-75">
        <span className="text-heading-h4 font-semibold text-fg-primary">{value}</span>
        {trend && <span className="text-label-sm font-medium text-positive">{trend}</span>}
      </div>
      {subValue && <span className="text-body-xs text-fg-tertiary">{subValue}</span>}
    </div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

interface OpportunityDetailPageProps {
  params: Promise<{ id: string }>
}

export default function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const { id } = use(params)
  const opportunity = getOpportunityById(id)

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-h5 text-fg-primary mb-50">Opportunity not found</h1>
          <p className="text-body-sm text-fg-muted mb-150">
            The opportunity you're looking for doesn't exist.
          </p>
          <NextLink href="/opportunities">
            <Button variant="secondary">Back to opportunities</Button>
          </NextLink>
        </div>
      </div>
    )
  }

  const { asset, assetLogo, apy, tvl, protocol, chain, type, onboardingStatus } = opportunity
  const isInstitutional = type === 'institutional'
  const needsOnboarding = isInstitutional && onboardingStatus !== 'approved'

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-[1200px] mx-auto px-150">
        {/* Navigation */}
        <header className="py-100">
          <NextLink
            href="/opportunities"
            className="inline-flex items-center gap-50 text-label-sm text-fg-muted hover:text-fg-primary transition-colors"
          >
            <ArrowLeft className="size-icon-md" />
            Back to Opportunities
          </NextLink>
        </header>

        <main className="pb-200">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-150 mb-200">
            {/* Title & Stats */}
            <div className="lg:col-span-2 flex flex-col gap-150">
              <div className="flex flex-col gap-75">
                <div className="flex items-center gap-100">
                  <div className="flex -space-x-100">
                    <TokenLogo token={assetLogo} size="xl" className="ring-2 ring-canvas" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-75">
                      <h1 className="text-heading-h3 font-semibold text-fg-primary">
                        {protocol} {asset} Vault
                      </h1>
                      <Pill type="secondary" appearance="subtle" size="24">
                        {getChainLabel(chain)}
                      </Pill>
                    </div>
                    <span className="text-body-sm text-fg-secondary">
                      Optimized yield for {asset} holders via {protocol}'s lending markets.
                    </span>
                  </div>
                </div>
              </div>

              {/* High Level Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-100 p-150 bg-surface border border-border-subtle rounded-2xl">
                <StatCard 
                  label="Net APY" 
                  value={formatAPY(apy)} 
                  trend="+2.1%" 
                  subValue="Last 7d average" 
                />
                <StatCard 
                  label="Total Value Locked" 
                  value={formatTVL(tvl)} 
                  subValue={`${formatTVL(tvl / 1.05)} ${asset}`} 
                />
                <StatCard 
                  label="Collateral Ratio" 
                  value="> 150%" 
                  subValue="Risk managed" 
                />
                <StatCard 
                  label="Curators" 
                  value="Maple Labs" 
                  subValue="Institutional grade" 
                />
              </div>
            </div>

            {/* Action Card (Deposit/Withdraw) */}
            <div className="lg:col-span-1">
              <div className="sticky top-100">
                <DashboardCard className="p-0 border-border-strong shadow-lg overflow-hidden">
                  <Tabs defaultValue="deposit">
                    <div className="border-b border-border-subtle p-50">
                      <TabsList variant="canvas" className="w-full">
                        <TabsTrigger value="deposit" className="flex-1">Deposit</TabsTrigger>
                        <TabsTrigger value="withdraw" className="flex-1">Withdraw</TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="p-150 flex flex-col gap-150">
                      <TabsPanel value="deposit" className="m-0 p-0 flex flex-col gap-100">
                        <div className="flex flex-col gap-50">
                          <div className="flex justify-between items-center text-label-xs">
                            <span className="text-fg-secondary">Amount</span>
                            <span className="text-fg-tertiary">Balance: 0.00 {asset}</span>
                          </div>
                          <div className="flex items-center gap-75 p-100 bg-primary border border-border-subtle rounded-xl focus-within:border-brand transition-colors">
                            <input 
                              type="number" 
                              placeholder="0.00" 
                              className="flex-1 bg-transparent text-heading-h5 font-semibold text-fg-primary outline-none placeholder:text-fg-muted" 
                            />
                            <div className="flex items-center gap-50">
                              <Button variant="secondary" size="xs">MAX</Button>
                              <div className="flex items-center gap-25">
                                <TokenLogo token={assetLogo} size="xs" />
                                <span className="text-label-md font-medium">{asset}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {isInstitutional && (
                          <div className="p-75 bg-warning-subtle border border-warning/20 rounded-lg flex gap-75">
                            <Lock className="size-icon-sm text-warning shrink-0" />
                            <div className="flex flex-col gap-25">
                              <span className="text-label-xs font-semibold text-warning">KYC Required</span>
                              <span className="text-body-xs text-warning/80">
                                This vault requires institutional onboarding.
                              </span>
                            </div>
                          </div>
                        )}

                        <Button 
                          variant="primary" 
                          size="lg" 
                          fullWidth 
                          disabled={needsOnboarding}
                          className="mt-50"
                        >
                          {needsOnboarding ? 'Start Onboarding First' : 'Deposit'}
                        </Button>
                        <p className="text-center text-body-xs text-fg-tertiary px-100">
                          By depositing, you agree to the {protocol} Terms of Service.
                        </p>
                      </TabsPanel>

                      <TabsPanel value="withdraw" className="m-0 p-0 flex flex-col gap-100">
                        <div className="p-200 text-center">
                          <span className="text-body-sm text-fg-tertiary">
                            You have no {asset} deposited in this vault.
                          </span>
                        </div>
                        <Button variant="secondary" size="lg" fullWidth disabled>
                          Withdraw
                        </Button>
                      </TabsPanel>
                    </div>
                  </Tabs>
                </DashboardCard>
              </div>
            </div>
          </div>

          {/* Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-200">
            {/* Left Content (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-200">
              {/* APY Chart Placeholder */}
              <div className="flex flex-col gap-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-heading-h6 font-semibold text-fg-primary">APY Over Time</h2>
                  <div className="flex items-center gap-50">
                    <Button variant="secondary" size="xs">1W</Button>
                    <Button variant="tertiary" size="xs">1M</Button>
                    <Button variant="secondary" size="xs">ALL</Button>
                  </div>
                </div>
                <div className="h-[300px] w-full bg-surface border border-border-subtle rounded-2xl flex items-center justify-center relative overflow-hidden">
                   {/* Simplified chart visual */}
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand/5 to-transparent" />
                   <div className="text-label-sm text-fg-tertiary flex flex-col items-center gap-50">
                     <TrendingUp className="size-icon-xl text-brand/20" />
                     APY Chart coming soon
                   </div>
                </div>
              </div>

              {/* About Section */}
              <div className="flex flex-col gap-100">
                <h2 className="text-heading-h6 font-semibold text-fg-primary">About this Vault</h2>
                <div className="flex flex-col gap-100 text-body-base text-fg-secondary leading-relaxed">
                  <p>
                    The {protocol} {asset} vault is a non-custodial yield optimization tool designed to maximize returns for {asset} holders while maintaining exposure to low-risk lending markets. 
                  </p>
                  <p>
                    This vault automatically rebalances between the most efficient lending sub-markets within {protocol}, ensuring users capture the highest risk-adjusted yield available at any given time.
                  </p>
                </div>
              </div>

              {/* Strategy Section */}
              <div className="flex flex-col gap-100">
                <h2 className="text-heading-h6 font-semibold text-fg-primary">Strategy & Risk</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-100">
                  <div className="p-100 bg-surface border border-border-subtle rounded-xl flex gap-100">
                    <ShieldCheck className="size-icon-lg text-positive shrink-0" />
                    <div className="flex flex-col gap-25">
                      <span className="text-label-md font-semibold text-fg-primary">Institutional Grade</span>
                      <span className="text-body-sm text-fg-secondary">
                        Underlying assets are only lent to vetted institutional borrowers with proven credit history.
                      </span>
                    </div>
                  </div>
                  <div className="p-100 bg-surface border border-border-subtle rounded-xl flex gap-100">
                    <Zap className="size-icon-lg text-brand shrink-0" />
                    <div className="flex flex-col gap-25">
                      <span className="text-label-md font-semibold text-fg-primary">Auto-Compounding</span>
                      <span className="text-body-sm text-fg-secondary">
                        Earned interest is automatically reinvested back into the vault to maximize long-term growth.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content (1/3) */}
            <div className="lg:col-span-1 flex flex-col gap-150">
              {/* Vault Details Card */}
              <div className="p-150 bg-surface border border-border-subtle rounded-2xl">
                <h3 className="text-label-sm font-semibold text-fg-primary uppercase tracking-wider mb-100">Vault Details</h3>
                <div className="flex flex-col">
                  <InfoRow label="Protocol" value={protocol} />
                  <InfoRow label="Network" value={getChainLabel(chain)} />
                  <InfoRow label="Asset" value={asset} />
                  <InfoRow label="Collateral Ratio" value="> 150%" />
                  <InfoRow label="Min. Deposit" value={`0.00 ${asset}`} />
                  <InfoRow label="Management Fee" value="0.5% p.a." />
                  <InfoRow label="Withdrawal Period" value="Instant" />
                  <div className="pt-100 mt-50 border-t border-border-subtle">
                    <a 
                      href="#" 
                      className="text-label-sm font-medium text-brand hover:text-brand-emphasis inline-flex items-center gap-25"
                    >
                      View Smart Contract <ExternalLink className="size-icon-xs" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="p-150 bg-surface border border-border-subtle rounded-2xl">
                <h3 className="text-label-sm font-semibold text-fg-primary uppercase tracking-wider mb-100">Security</h3>
                <div className="flex flex-col gap-100">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-fg-secondary">Audited by</span>
                    <span className="text-label-sm font-medium text-fg-primary">SigmaPrime, Cantina</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-fg-secondary">Risk Score</span>
                    <Pill type="positive" appearance="subtle" size="20">A+ Stable</Pill>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
