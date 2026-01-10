# DeFi Lending Opportunities Overview Page

> Specification document for the institutional and open lending opportunities dashboard.

---

## Overview

A unified dashboard displaying DeFi lending opportunities for two user types:
1. **Institutional Users** - Require onboarding/KYC before depositing
2. **Open Opportunities** - Available to everyone without onboarding

The goal is to have all lending opportunities in one place, making it easy to discover, compare, and deposit into various DeFi protocols.

---

## Page Type

- **Dashboard** - Users see their positions alongside browsable opportunities
- **Target Users**: Both new users exploring opportunities AND existing users managing positions (equally important)

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Navbar                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Featured   │  │  Featured   │  │  Featured   │  ← 3 Cards  │
│  │  Opp #1     │  │  Opp #2     │  │  Opp #3     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │  Small/Collapsible Portfolio Chart               │          │
│  │  (Balance, Borrows, Deposits over time)          │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  [ Opportunities ]  [ My Positions ]  ← Tabs                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────┐          │
│  │  [ Institutional ▼ ]  [ Open ▼ ]  ← Sub-tabs     │          │
│  │                                                   │          │
│  │  Chain: [All ▼]    Sort: [APY High to Low ▼]     │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  ── Stablecoins ─────────────────────────────────────          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │  Card   │  │  Card   │  │  Card   │  │  Card   │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│                                                                 │
│  ── BTC ─────────────────────────────────────────────          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                        │
│  │  Card   │  │  Card   │  │  Card   │                        │
│  └─────────┘  └─────────┘  └─────────┘                        │
│                                                                 │
│  ── ETH ─────────────────────────────────────────────          │
│  ┌─────────┐  ┌─────────┐                                     │
│  │  Card   │  │  Card   │                                     │
│  └─────────┘  └─────────┘                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Main Sections

### 1. Featured Opportunities (Top)

- **Count**: 3 featured opportunity cards
- **Purpose**: Highlight best/promoted opportunities
- **Placement**: Prominent position at top of dashboard

### 2. Portfolio Chart (Collapsible)

- **Size**: Small, collapsible
- **Data**: Balance, Borrows, Deposits over time
- **Time Range**: 1D, 1W, 1M, 6M, 1Y, All (inspired by Aave)
- **Behavior**: Can be collapsed to save space

### 3. Main Tabs

| Tab | Content |
|-----|---------|
| **Opportunities** | Browse all lending opportunities |
| **My Positions** | View user's current deposits/positions |

### 4. Opportunity Sub-Tabs

| Sub-Tab | Description |
|---------|-------------|
| **Institutional** | Opportunities requiring onboarding (KYC/AML) |
| **Open** | Opportunities available to everyone |

---

## Opportunity Card Design

### Data Displayed

| Field | Description | Priority |
|-------|-------------|----------|
| **Asset/Token** | e.g., USDC, WBTC, ETH | Primary |
| **APY/Yield** | Current yield percentage | Primary (Key metric) |
| **TVL** | Total Value Locked | Secondary |
| **Chain/Network** | Ethereum, Arbitrum, etc. | Secondary |

### Card Layout (Conceptual)

```
┌─────────────────────────────────┐
│  [Token Logo]  USDC             │
│                                 │
│  APY          TVL               │
│  12.5%        $245M             │
│                                 │
│  Chain: Ethereum                │
│                                 │
│  [ Deposit ]  ← Primary CTA     │
└─────────────────────────────────┘
```

### Primary CTA

- **Button**: "Deposit"
- **Action**: Opens deposit modal (no page navigation required)

---

## Opportunities List

### Format
- **Layout**: Cards in a grid
- **Responsive**: 4 cards → 3 → 2 → 1 column based on viewport

### Grouping
- **Grouped by**: Asset type
- **Groups**:
  - Stablecoins (USDC, USDT, DAI, etc.)
  - BTC (WBTC, cbBTC, etc.)
  - ETH (WETH, stETH, etc.)
  - Other

### Filtering

| Filter | Type | Options |
|--------|------|---------|
| **Chain/Network** | Dropdown | All, Ethereum, Arbitrum, Solana, etc. |

### Sorting

| Sort Option | Description |
|-------------|-------------|
| **APY (High to Low)** | Default sort |
| **TVL (High to Low)** | Most liquidity first |
| **Newest** | Recently added opportunities |

---

## Institutional Opportunities - Onboarding

### Visual Indicators

1. **Badge on Card**: Shows onboarding status
   - `Not Started` - Gray badge
   - `In Progress` - Yellow/Orange badge
   - `Approved` - Green badge / No badge needed

2. **Locked Overlay**: For non-onboarded users
   - Semi-transparent overlay
   - Lock icon
   - "Start Onboarding" CTA

### Onboarding Flow

**When user clicks a locked opportunity:**
1. Modal appears with:
   - Opportunity details
   - Onboarding requirements explanation
   - "Start Onboarding" button
   - Estimated time/steps

---

## My Positions Tab

### Position Card Data

| Field | Description |
|-------|-------------|
| **Asset + Amount** | e.g., 0.001 WBTC |
| **Current USD Value** | e.g., $90.56 |
| **APY Earned** | Current yield rate |
| **Total Earnings** | Accumulated earnings |

### Position Card Layout (Conceptual)

```
┌─────────────────────────────────┐
│  [Token Logo]  WBTC             │
│                                 │
│  Deposited      Value           │
│  0.001 WBTC     $90.56          │
│                                 │
│  APY            Earnings        │
│  0.044%         $0.04           │
│                                 │
│  [ Withdraw ]  [ Add More ]     │
└─────────────────────────────────┘
```

---

## Dummy Data Structure

### Opportunities

```typescript
interface Opportunity {
  id: string;
  protocol: string;           // "Aave", "Compound", "Morpho"
  protocolLogo: string;       // URL to logo
  asset: string;              // "USDC", "WBTC", "ETH"
  assetLogo: string;          // URL to token logo
  assetCategory: "stablecoin" | "btc" | "eth" | "other";
  apy: number;                // 12.5 (percentage)
  tvl: number;                // 245000000 (USD)
  chain: string;              // "ethereum", "arbitrum"
  chainLogo: string;          // URL to chain logo
  type: "institutional" | "open";
  onboardingStatus?: "not_started" | "in_progress" | "approved";
  isFeatured: boolean;
}
```

### User Position

```typescript
interface Position {
  id: string;
  opportunityId: string;
  asset: string;
  assetLogo: string;
  amount: number;             // 0.001 (in token units)
  valueUsd: number;           // 90.56
  apy: number;                // 0.044 (percentage)
  earnings: number;           // 0.04 (USD)
  protocol: string;
  chain: string;
}
```

---

## Sample Dummy Data

### Featured Opportunities

| Asset | APY | TVL | Chain | Type |
|-------|-----|-----|-------|------|
| USDC | 12.5% | $245M | Ethereum | Institutional |
| WBTC | 4.2% | $180M | Arbitrum | Open |
| ETH | 5.8% | $320M | Ethereum | Open |

### All Opportunities

#### Stablecoins
| Asset | Protocol | APY | TVL | Chain | Type |
|-------|----------|-----|-----|-------|------|
| USDC | Aave | 8.2% | $500M | Ethereum | Open |
| USDC | Morpho | 12.5% | $245M | Ethereum | Institutional |
| USDT | Compound | 7.8% | $320M | Ethereum | Open |
| DAI | Spark | 9.1% | $180M | Ethereum | Open |
| USDC | Aave | 10.2% | $150M | Arbitrum | Open |

#### BTC
| Asset | Protocol | APY | TVL | Chain | Type |
|-------|----------|-----|-----|-------|------|
| WBTC | Aave | 2.1% | $280M | Ethereum | Open |
| cbBTC | Morpho | 4.2% | $180M | Ethereum | Institutional |
| WBTC | Compound | 1.8% | $120M | Ethereum | Open |

#### ETH
| Asset | Protocol | APY | TVL | Chain | Type |
|-------|----------|-----|-----|-------|------|
| WETH | Aave | 3.5% | $450M | Ethereum | Open |
| stETH | Morpho | 5.8% | $320M | Ethereum | Institutional |
| WETH | Aave | 4.2% | $200M | Arbitrum | Open |

### User Positions (Sample)

| Asset | Amount | Value | APY | Earnings |
|-------|--------|-------|-----|----------|
| WBTC | 0.001 | $90.56 | 0.044% | $0.04 |
| USDC | 5,000 | $5,000 | 8.2% | $34.16 |

---

## UI Components Required

### New Components
- [ ] `OpportunityCard` - Card displaying opportunity details
- [ ] `FeaturedOpportunityCard` - Larger featured card variant
- [ ] `PositionCard` - Card displaying user position
- [ ] `OpportunityGrid` - Grid layout with asset grouping
- [ ] `AssetGroupHeader` - Section header for asset groups
- [ ] `OnboardingBadge` - Badge showing onboarding status
- [ ] `LockedOverlay` - Overlay for locked opportunities
- [ ] `DepositModal` - Modal for depositing into opportunity
- [ ] `OnboardingModal` - Modal with onboarding info/CTA
- [ ] `PortfolioChart` - Collapsible chart component

### Existing Components to Use
- `Tabs` - For main navigation
- `Select` - For filters/sorting dropdowns
- `Button` - For CTAs
- `Badge` - Base for status badges
- `Modal/Dialog` - Base for modals
- `TokenLogo` - For asset icons

---

## Responsive Behavior

| Breakpoint | Grid Columns | Featured Cards |
|------------|--------------|----------------|
| Desktop (1280px+) | 4 | 3 side-by-side |
| Tablet (768px-1279px) | 3 | 3 side-by-side |
| Mobile (640px-767px) | 2 | Stack vertically |
| Small Mobile (<640px) | 1 | Stack vertically |

---

## Inspiration Reference

**Aave Pro** (see attached screenshot):
- Clean dark theme
- Portfolio summary with chart
- Time range selector (1D, 1W, 1M, 6M, 1Y, All)
- Positions table with sortable columns
- Health factor visualization
- Deposit/Borrow CTAs

---

## Implementation Priority

1. **Phase 1**: Basic layout with tabs, featured cards, opportunity grid
2. **Phase 2**: Filtering, sorting, asset grouping
3. **Phase 3**: Institutional onboarding flow (badges, overlays, modals)
4. **Phase 4**: My Positions tab with position cards
5. **Phase 5**: Portfolio chart (collapsible)

---

## Implementation Status

**COMPLETED** - All phases implemented.

### Files Created

```
src/app/opportunities/
├── page.tsx                         # Main page with all sections
├── mock-data.ts                     # Dummy data + helper functions
├── types.ts                         # TypeScript interfaces
└── components/
    ├── index.ts                     # Component exports
    ├── featured-opportunities.tsx   # 3 featured cards section
    ├── opportunity-card.tsx         # Individual opportunity card
    ├── opportunity-grid.tsx         # Grid with asset grouping
    ├── asset-group.tsx              # Asset category group
    ├── filter-bar.tsx               # Chain filter + sort dropdown
    ├── position-card.tsx            # User position card
    ├── positions-grid.tsx           # Positions tab content
    ├── deposit-modal.tsx            # Deposit modal
    ├── onboarding-modal.tsx         # Institutional onboarding modal
    ├── onboarding-badge.tsx         # Status badge component
    ├── locked-overlay.tsx           # Locked opportunity overlay
    └── portfolio-chart.tsx          # Collapsible area chart
```

### Access

Visit: `http://localhost:3000/opportunities`
