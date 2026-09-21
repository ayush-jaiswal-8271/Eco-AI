---
name: EcoSense AI
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  metric-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.03em
  metric-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies an authoritative, precision-engineered aesthetic tailored for campus sustainability directors, facilities engineers, and institutional operations teams. It sits at the intersection of modern enterprise software (Linear, Stripe) and advanced telemetry monitoring (Datadog), infusing ecological stewardship with predictive AI intelligence.

The visual direction rejects both raw tech brutalism and kitschy organic cliches (such as leaves, hand-drawn motifs, or pastel washes). Instead, it adopts a **Minimal Corporate Precision** model: razor-sharp geometry, high-density metric legibility, translucent status washes, and calibrated white space. The emotional response is calibrated toward composure, rigor, and technical empowerment—instilling instant confidence that institutional resource data (energy, HVAC, water, carbon offsets) is being tracked and optimized with algorithmic precision.

## Colors

The palette is engineered around clean, ultra-light layered surfaces with deep contrast metrics and high-visibility status telemetry.

### Palette Roles
- **Canvas & Surface System**: Grounded in cool slate neutrals. Canvas defaults to `#F8FAFC`, card containers to `#FFFFFF`, and subtle inset telemetry/table headers to `#F1F5F9`. Border delineation uses a crisp `#E2E8F0`.
- **Text & Hierarchy**: Primary typography is anchored in `#0F172A` (Slate 900) for maximum legibility; secondary body and supporting metadata use `#334155` (Slate 700) and `#64748B` (Slate 500). Disabled/placeholder states rest at `#94A3B8`.
- **Primary (Sustainability Emerald)**: `#059669` (Emerald 600) drives key interactions, confirmed savings, and ecological progress. Hover states use `#047857` (Emerald 700); accent fills and badges leverage `#ECFDF5` (Emerald 50) with `#10B981` borders.
- **Secondary (AI & Intelligence)**: `#0284C7` (Sky 600) and `#0EA5E9` (Sky 500) identify automated predictions, real-time sensor streams, and AI-driven recommendations.
- **Feedback & Telemetry Status**:
  - **Success / Optimal**: `#059669`
  - **Warning / Demand Spike**: `#F59E0B` (Amber 500) on `#FFFBEB`
  - **Critical / System Fault**: `#EF4444` (Rose 500) on `#FEF2F2`
  - **Informational / Machine Learning**: `#0284C7` on `#F0F9FF`

Color is applied functionally rather than decoratively; charts and heatmaps strictly adhere to WCAG AAA contrast against white cards.

## Typography

The typography structure couples **Plus Jakarta Sans** for structural headlines and large numerical telemetry with **Inter** for dense dashboards, tabular data, and control interfaces.

### Numerical and Metric Formatting
- All tabular data, telemetry readouts, timestamp trackers, and consumption counters must enable tabular lining figures (`font-variant-numeric: tabular-nums lining-nums`) to prevent horizontal jitter during real-time streaming updates.
- Micro-labels and table headings enforce uppercase or subtle tracking via `label-sm` with a muted slate color (`#64748B`) to anchor dense operational views without visual noise.

## Layout & Spacing

The layout is built on a 12-column fluid grid system pinned inside an application shell with an offset 260px collapsible telemetry navigation sidebar.

### Breakpoints & Adaptations
- **Desktop (1280px and above)**: Full 12-column layout with 24px (`gutter`) column separation and 32px (`margin`) outer canvas margins. Analytical cards span 3, 4, 6, or 12 columns.
- **Tablet (768px - 1279px)**: 8-column layout with 16px (`gutter-sm`) gaps and 24px margins. Sub-dashboards reflow to stacked two-column modular blocks. Navigation defaults to a rail or sliding drawer.
- **Mobile (< 768px)**: 4-column single-column flow with 16px (`margin-sm`) margins. Metrics cluster horizontally in snap-scroll carousels, while telemetry charts collapse into primary KPIs with drill-down sheets.

Internal component gaps and padding are strictly aligned to a 4px baseline rhythm (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px).

## Elevation & Depth

Visual hierarchy uses crisp boundary delineation paired with soft, low-intensity ambient shadows. This keeps the interface pristine, airy, and clinical, avoiding the muddiness of heavy drop shadows.

### Elevation Hierarchy
- **Level 0 (Canvas)**: `#F8FAFC` flat surface. No shadow.
- **Level 1 (Cards & Data Panels)**: `#FFFFFF` surface framed with a 1px solid `#E2E8F0` border, resting on a dual-stop diffused shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Hover States, Active Filter Toggles, Floating Popovers)**: `#FFFFFF` surface with `1px solid #CBD5E1` and shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Modals, Slide-over Drawers, Command Palettes)**: `#FFFFFF` surface with `1px solid #E2E8F0` and shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Accompanied by a semi-translucent backdrop (`rgba(15, 23, 42, 0.4)` with 4px blur).
- **Sub-surface Insets (Code snippets, sensor readouts, graph control trays)**: `#F1F5F9` surface with an inner shadow `inset 0 1px 2px 0 rgba(15, 23, 42, 0.04)` and 1px `#E2E8F0` border.

## Shapes

The interface balances soft technical precision with ergonomic interaction points using a structured scale (`roundedness: 2`).

### Corner Radius System
- **Base (8px / `0.5rem`)**: Standard interactive inputs, button groups, dropdown menus, and standard metric tiles.
- **Large (12px - 14px)**: Primary dashboard containers, analytical card frames, data tables, and telemetry modal containers.
- **Extra Large (16px / `1rem`)**: Global structural panels, alert callouts, and notification toasts.
- **Full Pill (`9999px`)**: Metric status badges, filter tags, chip triggers, and tertiary toggle switches.

## Components

### Buttons
- **Primary**: Solid `#059669` fill with white text, font-weight 600. On hover, shifts to `#047857` with an elevation increase to Level 2. Padding is 8px 16px for standard sizes with a radius of 8px.
- **Secondary (AI / Intelligence)**: `#0284C7` fill with white text, or light variant `#F0F9FF` with `#0284C7` text and 1px `#BAE6FD` border.
- **Outline / Neutral**: Pure `#FFFFFF` background, 1px solid `#E2E8F0`, `#334155` text. On hover, background transitions to `#F8FAFC` and border to `#CBD5E1`.
- **Ghost**: Transparent background, `#475569` text. Hover adds `#F1F5F9` fill.

### Metric Cards & Analytics Panels
- Built on `#FFFFFF` with 12px or 16px corner radius and a 1px `#E2E8F0` border.
- Header contains an uppercase category label (`label-sm`), trailing status indicator (e.g., live green pulse dot), and overflow actions.
- Metrics display using `metric-xl` with integrated delta pill badges (e.g., `↓ 14.2% kWh` with green pill for savings, red pill for overconsumption).

### Status Badges & Chips
- Fully rounded pills (`border-radius: 9999px`) with 2px 8px internal padding.
- **Optimal / Green**: `#ECFDF5` background, `#047857` text, 1px `#A7F3D0` border.
- **AI Suggested / Cyan**: `#F0F9FF` background, `#0369A1` text, 1px `#BAE6FD` border.
- **High Demand / Amber**: `#FFFBEB` background, `#B45309` text, 1px `#FDE68A` border.
- **System Alarm / Rose**: `#FEF2F2` background, `#B91C1C` text, 1px `#FECACA` border.

### Inputs & Form Controls
- **Input Fields**: 38px height, `#FFFFFF` fill, 1px `#CBD5E1` border, 8px radius. Active focus transitions to a 1px `#059669` border with a subtle `0 0 0 3px rgba(5, 150, 105, 0.15)` focus ring.
- **Checkboxes & Radios**: 16px squared (4px radius) or circular controls. Active state fills with `#059669` featuring a crisp white SVG check icon.
- **Search & Filters**: Integrate leading Lucide-style line icons (`16px`, `#64748B`) with inline keyboard shortcut pills (`⌘K` in `#F1F5F9` with 4px radius).

### Tables & Real-Time Telemetry Lists
- Headers use `#F8FAFC` with 1px border bottom `#E2E8F0`, displaying `label-sm` tracking.
- Row heights are calibrated to 48px with zebra striping omitted in favor of clean 1px `#F1F5F9` dividing borders.
- Hover states apply an instantaneous background transition to `#F8FAFC`.
- Real-time cell values incorporate micro sparklines and inline status indicators.