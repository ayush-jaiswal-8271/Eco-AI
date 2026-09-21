interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export function Spinner({ size = 'md', message }: SpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl">
      <div className={`${sizes[size]} rounded-full border-2 border-surface-container-high border-t-primary animate-spin`} />
      {message && <p className="font-body-sm text-body-sm text-on-surface-variant">{message}</p>}
    </div>
  )
}

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-space-xl gap-space-md text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center">
        <span className="material-symbols-outlined text-outline text-[32px]">{icon}</span>
      </div>
      <div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
        {description && <p className="font-body-md text-body-md text-on-surface-variant mt-1">{description}</p>}
      </div>
      {action}
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-space-xl gap-space-md text-center">
      <div className="w-16 h-16 rounded-2xl bg-error-container flex items-center justify-center">
        <span className="material-symbols-outlined text-error text-[32px]">error_outline</span>
      </div>
      <div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary">
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          Try Again
        </button>
      )}
    </div>
  )
}

interface DemoModeBannerProps {
  message?: string
}

export function DemoModeBanner({ message = 'Running in demo mode — connect a Gemini API key for live AI features.' }: DemoModeBannerProps) {
  return (
    <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-lg bg-tertiary-fixed/50 border border-tertiary/20">
      <span className="material-symbols-outlined text-tertiary text-[18px]">science</span>
      <span className="font-body-sm text-body-sm text-on-surface-variant">{message}</span>
      <span className="badge badge-demo ml-auto">DEMO DATA</span>
    </div>
  )
}

interface KpiCardProps {
  label: string
  value: string
  unit?: string
  change?: number
  changeLabel?: string
  icon?: string
  iconColor?: string
  footer?: string
  loading?: boolean
}

export function KpiCard({ label, value, unit, change, changeLabel, icon, iconColor = 'text-primary', footer, loading }: KpiCardProps) {
  if (loading) {
    return (
      <div className="kpi-card animate-pulse">
        <div className="h-3 bg-surface-container rounded w-24 mb-3" />
        <div className="h-8 bg-surface-container rounded w-32 mb-2" />
        <div className="h-3 bg-surface-container rounded w-20" />
      </div>
    )
  }

  const isPositiveChange = change !== undefined && change > 0
  const isNegativeChange = change !== undefined && change < 0

  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">{label}</span>
        {icon && <span className={`material-symbols-outlined text-[20px] ${iconColor}`}>{icon}</span>}
      </div>
      <div className="my-space-sm">
        <div className="font-metric-xl text-on-surface tracking-tight">
          {value} {unit && <span className="text-body-sm font-normal text-on-surface-variant">{unit}</span>}
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-semibold ${
              isPositiveChange ? 'bg-primary-fixed text-on-primary-fixed' :
              isNegativeChange ? 'bg-error-container text-on-error-container' :
              'bg-surface-container text-on-surface-variant'
            }`}>
              {isPositiveChange ? '↑' : isNegativeChange ? '↓' : '→'} {Math.abs(change).toFixed(1)}%
            </span>
            {changeLabel && <span className="text-outline text-xs">{changeLabel}</span>}
          </div>
        )}
      </div>
      {footer && (
        <div className="pt-space-xs mt-space-xs bg-surface-container-low rounded-lg p-2">
          <span className="text-[11px] text-on-surface-variant">{footer}</span>
        </div>
      )}
    </div>
  )
}

interface SeverityBadgeProps {
  severity: 'low' | 'medium' | 'high'
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const styles = {
    low: 'badge-green',
    medium: 'badge-amber',
    high: 'badge-red',
  }
  return <span className={`badge ${styles[severity]}`}>{severity.toUpperCase()}</span>
}

interface StatusBadgeProps {
  status: 'open' | 'accepted' | 'implemented' | 'dismissed'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    open: 'badge-blue',
    accepted: 'badge-green',
    implemented: 'bg-primary/20 text-primary',
    dismissed: 'bg-surface-container text-on-surface-variant',
  }
  return <span className={`badge ${styles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
}
