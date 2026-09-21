import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { getDashboardSummary, getResourceTrends, getInsights, runAIAnalysis } from '../services/ecosense'
import type { DashboardSummary, TrendsData, AIInsight } from '../types/api'
import { Spinner, ErrorState, DemoModeBanner, KpiCard } from '../components/ui'

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [trends, setTrends] = useState<TrendsData | null>(null)
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [s, t, i] = await Promise.all([getDashboardSummary(), getResourceTrends(), getInsights()])
      setSummary(s)
      setTrends(t)
      setInsights(i.slice(0, 3))
    } catch {
      setError('Unable to load dashboard data. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    setAnalyzing(true)
    try {
      const newInsights = await runAIAnalysis()
      setInsights(newInsights.slice(0, 3))
    } catch {
      // silently fail, keep existing insights
    } finally {
      setAnalyzing(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const trendsList = trends?.daily || trends?.hourly || []
  const trendsChartData = trendsList.map((t) => ({
    month: t.timestamp,
    Energy: t.energy,
    Water: Math.round(t.water / 1000),
    Waste: t.waste,
  }))

  if (loading) {
    return (
      <div className="px-margin py-space-xl">
        <Spinner size="lg" message="Loading sustainability dashboard..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-margin py-space-xl">
        <ErrorState message={error} onRetry={loadData} />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <div className="px-margin pt-space-lg pb-space-md flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>AI-Powered Sustainability Analysis</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Campus Sustainability Dashboard</h1>
          <p className="font-body-md text-on-surface-variant mt-0.5">
            AI-powered overview of your campus sustainability performance & resource optimization.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-md">
            <span className="material-symbols-outlined text-secondary text-[18px]">calendar_month</span>
            <span>Real-time Telemetry</span>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="btn-primary"
          >
            <span className={`material-symbols-outlined text-[18px] ${analyzing ? 'animate-spin' : 'animate-pulse'}`}>auto_awesome</span>
            <span>{analyzing ? 'Analyzing...' : 'Run AI Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Demo Banner */}
      {summary?.is_demo && (
        <div className="px-margin pb-space-md">
          <DemoModeBanner />
        </div>
      )}

      <div className="px-margin pb-space-xl flex flex-col gap-space-lg">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md">
          <KpiCard
            label="Sustainability Index"
            value={summary?.sustainability_score?.toString() || '0'}
            unit="/ 100"
            change={summary?.score_change}
            changeLabel="vs last period"
            icon="verified"
            footer={`Score benchmark: 65/100`}
          />
          <KpiCard
            label="Energy Draw"
            value={summary?.energy_kwh?.toLocaleString() || '0'}
            unit="kWh"
            change={summary?.energy_change}
            changeLabel="vs baseline"
            icon="bolt"
            iconColor="text-secondary"
          />
          <KpiCard
            label="Water Usage"
            value={Math.round((summary?.water_liters || 0) / 1000).toLocaleString()}
            unit="kL"
            change={summary?.water_change}
            changeLabel="vs baseline"
            icon="water_drop"
            iconColor="text-secondary"
          />
          <KpiCard
            label="Waste Generated"
            value={summary?.waste_kg?.toLocaleString() || '0'}
            unit="kg"
            change={summary?.waste_change}
            changeLabel="vs baseline"
            icon="recycling"
            iconColor="text-tertiary"
          />
          <KpiCard
            label="Est. Carbon"
            value={Math.round((summary?.energy_kwh || 0) * 0.75).toLocaleString()}
            unit="kg CO₂e"
            change={summary?.energy_change}
            changeLabel="estimated"
            icon="co2"
            iconColor="text-tertiary"
            footer="Estimated from consumption data"
          />
        </div>

        {/* Trends Chart + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Trends Chart */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Resource Consumption Trends</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Sample campus data — energy (kWh), water (kL), waste (kg) over time
                </p>
              </div>
              <Link to="/analytics" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
                <span>Details</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            <div className="h-64">
              {trendsChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsChartData}>
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6d7a72' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6d7a72' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #bccac0',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="Energy" stroke="#006948" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Water" stroke="#006398" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Waste" stroke="#825100" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-on-surface-variant font-body-sm text-body-sm">
                  No trend data available
                </div>
              )}
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent AI Insights</h3>
              <Link to="/insights">
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary/15 text-secondary hover:bg-secondary/25 transition-colors">
                  {insights.length} Active
                </span>
              </Link>
            </div>
            <div className="flex flex-col gap-space-sm flex-1">
              {insights.length === 0 ? (
                <p className="text-on-surface-variant font-body-sm text-body-sm text-center py-space-lg">
                  No insights yet. Run AI Analysis to detect patterns.
                </p>
              ) : (
                insights.map((insight) => (
                  <div key={insight.id} className="p-space-sm rounded-lg bg-surface-container-low shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">{insight.title}</span>
                      <span className={`badge ml-2 shrink-0 ${
                        insight.severity === 'high' ? 'badge-red' :
                        insight.severity === 'medium' ? 'badge-amber' : 'badge-green'
                      }`}>{insight.severity}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{insight.description}</p>
                  </div>
                ))
              )}
            </div>
            <Link to="/insights" className="mt-space-md block text-center py-2 bg-primary/10 text-primary font-label-md text-label-md rounded-lg hover:bg-primary/20 transition-colors">
              View All AI Insights
            </Link>
          </div>
        </div>

        {/* Sustainability Breakdown Bar Chart */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Sustainability Breakdown</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Monthly resource consumption comparison (sample data)</p>
            </div>
          </div>
          <div className="h-48">
            {trendsChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendsChartData}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6d7a72' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6d7a72' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #bccac0', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Energy" fill="#006948" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Water" fill="#006398" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Waste" fill="#825100" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-on-surface-variant font-body-sm text-body-sm">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">Recent Activity</h3>
          <div className="flex flex-col divide-y divide-surface-container-high">
            {[
              { icon: 'auto_awesome', color: 'text-primary', text: 'AI analysis completed — 3 new insights detected', time: 'Just now' },
              { icon: 'document_scanner', color: 'text-secondary', text: 'Waste classification scan performed', time: '2 hours ago' },
              { icon: 'checklist', color: 'text-tertiary', text: 'Recommendation status updated: Energy Audit accepted', time: '1 day ago' },
              { icon: 'assignment', color: 'text-primary', text: 'Monthly sustainability report generated', time: '3 days ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-space-sm py-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined text-[18px] ${item.color}`}>{item.icon}</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface flex-1">{item.text}</span>
                <span className="font-code text-code text-on-surface-variant shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
