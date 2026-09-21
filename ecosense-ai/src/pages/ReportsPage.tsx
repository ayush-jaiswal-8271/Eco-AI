import { useState, useEffect } from 'react'
import { generateReport } from '../services/ecosense'
import type { Report } from '../types/api'
import { Spinner, ErrorState, DemoModeBanner } from '../components/ui'

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'annual'>('monthly')
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await generateReport(timeframe)
      setReport(data)
      if (data.is_demo) setIsDemo(true)
    } catch (err: any) {
      setError(err.message || 'Failed to generate report')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGenerate()
  }, [timeframe])

  const downloadJSON = () => {
    if (!report) return
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ecosense_report_${timeframe}_${new Date().toISOString().slice(0,10)}.json`
    a.click()
  }

  const downloadCSV = () => {
    if (!report) return
    let csv = `Metric,Value,Unit\n`
    csv += `Total Energy,${report.summary.total_energy_kwh},kWh\n`
    csv += `Total Water,${report.summary.total_water_liters},Liters\n`
    csv += `Total Waste,${report.summary.total_waste_kg},kg\n`
    csv += `Carbon Footprint,${report.summary.carbon_footprint_tons},Tons CO2\n`
    csv += `Sustainability Index,${report.summary.sustainability_score},/100\n`

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ecosense_report_${timeframe}_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {isDemo && <DemoModeBanner message="Operating in Demo Mode with simulated report generation." />}

      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">ESG & Sustainability Reports</h1>
            <p className="text-xs text-on-surface-variant">Generate standard ESG compliance reports and export data in JSON/CSV formats</p>
          </div>
        </div>

        {/* Timeframe Selector & Export */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface p-1 rounded-xl border border-outline-variant/40 text-xs font-semibold">
            {(['monthly', 'quarterly', 'annual'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  timeframe === tf ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={downloadJSON}
            disabled={!report || loading}
            className="px-4 py-2 rounded-xl bg-surface border border-outline-variant/40 text-xs font-semibold hover:border-primary/50 flex items-center gap-1.5 transition-all text-on-surface disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">download</span>
            JSON
          </button>

          <button
            onClick={downloadCSV}
            disabled={!report || loading}
            className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover flex items-center gap-1.5 transition-all shadow-md shadow-primary/20 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">file_download</span>
            CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner message="Compiling ESG report data..." />
        </div>
      ) : error ? (
        <ErrorState title="Report Generation Error" message={error} />
      ) : report ? (
        <div className="space-y-6">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/40">
              <span className="text-xs text-outline font-medium">Report Period</span>
              <div className="text-lg font-bold text-on-surface mt-1 capitalize">{report.period}</div>
              <span className="text-[10px] text-outline">Generated: {new Date(report.generated_at).toLocaleDateString()}</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/40">
              <span className="text-xs text-outline font-medium">Total Campus Energy</span>
              <div className="text-xl font-bold font-mono text-primary mt-1">
                {report.summary.total_energy_kwh.toLocaleString()} <span className="text-xs text-outline font-sans">kWh</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-semibold">-3.4% vs last period</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/40">
              <span className="text-xs text-outline font-medium">Total Campus Water</span>
              <div className="text-xl font-bold font-mono text-secondary mt-1">
                {report.summary.total_water_liters.toLocaleString()} <span className="text-xs text-outline font-sans">L</span>
              </div>
              <span className="text-[10px] text-amber-500 font-semibold">+1.2% vs last period</span>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/40">
              <span className="text-xs text-outline font-medium">Estimated Carbon Footprint</span>
              <div className="text-xl font-bold font-mono text-tertiary mt-1">
                {report.summary.carbon_footprint_tons} <span className="text-xs text-outline font-sans">Tons CO2</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-semibold">Scope 1 & 2 Emissions</span>
            </div>
          </div>

          {/* Detailed ESG Table Preview */}
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-4">
            <h3 className="text-base font-bold text-on-surface flex items-center justify-between">
              <span>ESG Metric Breakdown</span>
              <span className="text-xs text-outline font-normal">Standardized ISO 14064 Compliance</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-on-surface">
                <thead className="bg-surface/80 text-outline border-b border-outline-variant/40 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Metric Identifier</th>
                    <th className="py-3 px-4">Value Recorded</th>
                    <th className="py-3 px-4">Unit</th>
                    <th className="py-3 px-4">ESG Category</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr>
                    <td className="py-3 px-4 font-semibold">Total Electricity Consumption</td>
                    <td className="py-3 px-4 font-mono">{report.summary.total_energy_kwh.toLocaleString()}</td>
                    <td className="py-3 px-4 text-outline">kWh</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Environmental</span></td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">On Target</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Total Potable Water Usage</td>
                    <td className="py-3 px-4 font-mono">{report.summary.total_water_liters.toLocaleString()}</td>
                    <td className="py-3 px-4 text-outline">Liters</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Environmental</span></td>
                    <td className="py-3 px-4 text-amber-500 font-semibold">Elevated</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Solid Waste Generation</td>
                    <td className="py-3 px-4 font-mono">{report.summary.total_waste_kg.toLocaleString()}</td>
                    <td className="py-3 px-4 text-outline">Kilograms</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Environmental</span></td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">On Target</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Calculated GHG Footprint</td>
                    <td className="py-3 px-4 font-mono">{report.summary.carbon_footprint_tons}</td>
                    <td className="py-3 px-4 text-outline">Metric Tons CO2e</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary">Governance</span></td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">Compliant</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Campus Sustainability Rating</td>
                    <td className="py-3 px-4 font-mono font-bold text-primary">{report.summary.sustainability_score} / 100</td>
                    <td className="py-3 px-4 text-outline">Index Points</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary">Overall</span></td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
