import { useState, useEffect } from 'react'
import { getRecommendations } from '../services/ecosense'
import type { Recommendation } from '../types/api'
import { Spinner, ErrorState, DemoModeBanner, EmptyState } from '../components/ui'

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getRecommendations()
        setRecommendations(data)
        if (data.some(d => d.is_demo)) setIsDemo(true)
      } catch (err: any) {
        setError(err.message || 'Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredRecs = recommendations.filter(
    (r) => categoryFilter === 'all' || r.category === categoryFilter
  )

  const impactColors: Record<string, string> = {
    high: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {isDemo && <DemoModeBanner message="Operating in Demo Mode with simulated recommendations data." />}

      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">lightbulb</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Actionable Sustainability Recommendations</h1>
            <p className="text-xs text-on-surface-variant">Prioritized eco-projects with estimated financial ROI, payback period, and carbon savings</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/40 pb-3 overflow-x-auto">
        {['all', 'energy', 'water', 'waste'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              categoryFilter === cat
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface text-on-surface-variant hover:bg-surface-variant border border-outline-variant/40'
            }`}
          >
            {cat === 'all' ? 'All Recommendations' : `${cat} Projects`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner message="Calculating high-ROI recommendations..." />
        </div>
      ) : error ? (
        <ErrorState title="Error Loading Data" message={error} />
      ) : filteredRecs.length === 0 ? (
        <EmptyState title="No Recommendations" description="No recommendations found for the selected category." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecs.map((rec) => (
            <div
              key={rec.id}
              className="glass-panel p-6 rounded-2xl border border-outline-variant/40 hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface border border-outline-variant/40 text-outline">
                    {rec.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                      impactColors[rec.impact_level] || impactColors['medium']
                    }`}
                  >
                    {rec.impact_level} Impact
                  </span>
                </div>

                <h3 className="text-lg font-bold text-on-surface">{rec.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{rec.description}</p>
              </div>

              {/* ROI Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-outline-variant/30">
                <div className="p-3 rounded-xl bg-surface/80 border border-outline-variant/30 text-center">
                  <span className="text-[10px] font-semibold text-outline uppercase">Est. Annual Cost</span>
                  <div className="text-sm font-mono font-bold text-on-surface mt-0.5">${rec.estimated_cost_usd?.toLocaleString() || 0}</div>
                </div>
                <div className="p-3 rounded-xl bg-surface/80 border border-outline-variant/30 text-center">
                  <span className="text-[10px] font-semibold text-outline uppercase">Est. Payback</span>
                  <div className="text-sm font-mono font-bold text-primary mt-0.5">{rec.payback_months || 0} Months</div>
                </div>
                <div className="p-3 rounded-xl bg-surface/80 border border-outline-variant/30 text-center">
                  <span className="text-[10px] font-semibold text-outline uppercase">CO2 Offset</span>
                  <div className="text-sm font-mono font-bold text-emerald-500 mt-0.5">{rec.co2_reduction_tons || 0} T/Yr</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-outline">ROI Score: <strong className="text-on-surface">{rec.roi_percentage || 0}%</strong></span>
                <button className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-all flex items-center gap-1">
                  <span>Implement Proposal</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
