import { useState, useEffect } from 'react'
import { getInsights, runAIAnalysis } from '../services/ecosense'
import type { AIInsight } from '../types/api'
import { Spinner, ErrorState, DemoModeBanner, SeverityBadge, EmptyState } from '../components/ui'

const resourceColors: Record<string, string> = {
  energy: 'text-secondary',
  water: 'text-secondary',
  waste: 'text-tertiary',
  carbon: 'text-primary',
  general: 'text-outline',
}

const resourceIcons: Record<string, string> = {
  energy: 'bolt',
  water: 'water_drop',
  waste: 'recycling',
  carbon: 'co2',
  general: 'auto_awesome',
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const loadInsights = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getInsights()
      setInsights(data)
    } catch {
      setError('Unable to load AI insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    setAnalyzing(true)
    try {
      const data = await runAIAnalysis()
      setInsights(data)
    } catch {
      setError('AI analysis failed. Please check the backend.')
    } finally {
      setAnalyzing(false)
    }
  }

  useEffect(() => { loadInsights() }, [])

  const filtered = filter === 'all'
    ? insights
    : insights.filter(i => i.category === filter || i.severity === filter)

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin pt-space-lg pb-space-md flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">troubleshoot</span>
            <span>AI Pattern Detection</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">AI Sustainability Insights</h1>
          <p className="font-body-md text-on-surface-variant mt-0.5">
            Automatically detected patterns, anomalies, and opportunities in campus resource data.
          </p>
        </div>
        <button onClick={handleAnalyze} disabled={analyzing} className="btn-primary">
          <span className={`material-symbols-outlined text-[18px] ${analyzing ? 'animate-spin' : ''}`}>
            {analyzing ? 'sync' : 'auto_awesome'}
          </span>
          {analyzing ? 'EcoSense AI is analyzing data...' : 'Run New Analysis'}
        </button>
      </div>

      <div className="px-margin pb-space-xl flex flex-col gap-space-lg">
        {/* Demo Banner */}
        <DemoModeBanner message="Insights generated from sample campus dataset. Add Gemini API key for live AI analysis." />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['all', 'energy', 'water', 'waste', 'critical', 'high', 'medium', 'low'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-space-sm py-1 rounded-full font-label-md text-label-md transition-colors ${
                filter === f
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <Spinner message="Loading AI insights..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadInsights} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="troubleshoot"
            title="No insights yet"
            description="Click 'Run New Analysis' to detect patterns in campus data."
            action={
              <button onClick={handleAnalyze} className="btn-primary">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Analyze Data
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
            {filtered.map((insight) => (
              <div key={insight.id} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                      <span className={`material-symbols-outlined text-[20px] ${resourceColors[insight.category] || 'text-primary'}`}>
                        {resourceIcons[insight.category] || 'auto_awesome'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{insight.title}</h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant capitalize">{insight.building} • {insight.category}</span>
                    </div>
                  </div>
                  <SeverityBadge severity={insight.severity === 'critical' ? 'high' : insight.severity} />
                </div>

                <p className="font-body-md text-body-md text-on-surface-variant mb-space-sm">{insight.description}</p>

                {insight.evidence && (
                  <div className="bg-surface-container-low rounded-lg p-space-sm mb-space-sm">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-secondary">data_usage</span>
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Evidence</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{insight.evidence}</p>
                  </div>
                )}

                <div className="bg-primary/5 rounded-lg p-space-sm border border-primary/10">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">lightbulb</span>
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">AI Recommendation</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">{insight.recommendation}</p>
                </div>

                <div className="flex items-center justify-between mt-space-sm">
                  <span className="font-code text-code text-on-surface-variant">
                    {new Date(insight.detected_at).toLocaleDateString()}
                  </span>
                  <span className="badge badge-demo">Potential Savings: {insight.potential_savings}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
