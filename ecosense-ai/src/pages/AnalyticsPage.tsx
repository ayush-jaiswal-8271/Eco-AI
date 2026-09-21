import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getResourceStats } from '../services/ecosense'
import type { ResourceStats } from '../types/api'
import { Spinner, ErrorState, DemoModeBanner } from '../components/ui'

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'energy' | 'water' | 'waste'>('energy')
  const [stats, setStats] = useState<ResourceStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await getResourceStats(activeTab)
        setStats(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch resource statistics')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeTab])

  const tabs = [
    { id: 'energy', label: 'Energy Consumption', unit: 'kWh', color: '#1b6d47', icon: 'bolt' },
    { id: 'water', label: 'Water Usage', unit: 'Liters', color: '#00668f', icon: 'water_drop' },
    { id: 'waste', label: 'Waste Generation', unit: 'kg', color: '#735900', icon: 'recycling' },
  ] as const

  const tab = tabs.find((t) => t.id === activeTab)!

  const chartData = stats?.trends
    ? stats.trends.map((t) => ({ date: t.label, value: t.value, baseline: t.baseline }))
    : []

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <DemoModeBanner message="Showing real-time campus telemetry telemetry analytics and building breakdown." />

      {/* Resource selector tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/40 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface text-on-surface-variant hover:bg-surface-variant border border-outline-variant/40'
            }`}
          >
            <span className="material-symbols-outlined text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner message="Loading telemetry statistics..." />
        </div>
      ) : error ? (
        <ErrorState title="Telemetry Error" message={error} />
      ) : stats ? (
        <div className="space-y-6">
          {/* Main Chart Card */}
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-on-surface">{tab.label} Trend</h2>
                <p className="text-xs text-on-surface-variant">Daily consumption telemetry vs historical baseline model</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-outline">Total ({activeTab}): </span>
                  <span className="font-bold text-on-surface text-sm">
                    {stats.total.toLocaleString()} {stats.unit}
                  </span>
                </div>
                <div>
                  <span className="text-outline">Peak Facility: </span>
                  <span className="font-bold text-primary">{stats.peak_building}</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={tab.color} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={tab.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6d7a72' }} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 11, fill: '#6d7a72' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #bccac0', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(v: any) => [`${Number(v || 0).toLocaleString()} ${tab.unit}`, tab.label]}
                  />
                  <Area type="monotone" dataKey="value" stroke={tab.color} strokeWidth={2} fill="url(#colorGrad)" name={tab.label} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Building Breakdown Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-4">
            <h3 className="text-base font-bold text-on-surface">Building Level Consumption Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.buildings.map((b) => (
                <div key={b.name} className="p-4 rounded-xl bg-surface border border-outline-variant/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-on-surface">{b.name}</span>
                    <span className="text-primary font-mono">{b.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${b.percentage}%` }} />
                  </div>
                  <div className="text-[11px] text-outline font-mono">
                    {b.value.toLocaleString()} {stats.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
