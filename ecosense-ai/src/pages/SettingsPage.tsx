import React, { useState } from 'react'

export default function SettingsPage() {
  const [anomalyThreshold, setAnomalyThreshold] = useState('2.5')
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [autoReportFrequency, setAutoReportFrequency] = useState('monthly')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">shield</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Settings & Governance</h1>
            <p className="text-xs text-on-surface-variant">Configure AI thresholds, alerts, and platform governance policies</p>
          </div>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-base">check_circle</span>
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Anomaly detection settings */}
        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-4">
          <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">troubleshoot</span>
            AI Anomaly Detection Tuning
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-outline font-semibold mb-1">
                Z-Score Spike Sensitivity Threshold (Std Devs)
              </label>
              <select
                value={anomalyThreshold}
                onChange={(e) => setAnomalyThreshold(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="1.5">High Sensitivity (1.5 σ) - Flag minor fluctuations</option>
                <option value="2.0">Medium Sensitivity (2.0 σ) - Standard production setting</option>
                <option value="2.5">Low Sensitivity (2.5 σ) - Flag major anomalies only</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-on-surface block">Automated Critical Spikes Email Alerts</span>
                <span className="text-outline">Send instant notification to facilities management on severe spikes</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* ESG Reporting Schedule */}
        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-4">
          <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">assignment</span>
            Automated ESG Report Scheduling
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-outline font-semibold mb-1">
                Report Compilation Frequency
              </label>
              <select
                value={autoReportFrequency}
                onChange={(e) => setAutoReportFrequency(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="weekly">Weekly Summary (Every Monday 08:00 AM)</option>
                <option value="monthly">Monthly Full ESG Audit (1st of every month)</option>
                <option value="quarterly">Quarterly Sustainability Review</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary-hover transition-all flex items-center gap-2 text-sm shadow-md shadow-primary/20"
        >
          <span className="material-symbols-outlined text-lg">save</span>
          Save Governance Settings
        </button>
      </form>
    </div>
  )
}
