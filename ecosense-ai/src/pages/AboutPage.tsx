import { useState, useEffect } from 'react'
import { getAppInfo } from '../services/ecosense'
import type { AppInfo } from '../types/api'

export default function AboutPage() {
  const [info, setInfo] = useState<AppInfo | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getAppInfo()
        setInfo(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header banner */}
      <div className="glass-panel p-8 rounded-2xl border border-outline-variant/40 bg-gradient-to-br from-surface to-primary-container/10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold mb-4">
          <span className="material-symbols-outlined text-base">military_tech</span>
          1M1B & IBM SkillsBuild AICTE Virtual Internship Project
        </div>
        <h1 className="text-3xl font-bold text-on-surface mb-3">About EcoSense AI</h1>
        <p className="text-on-surface-variant text-base leading-relaxed max-w-3xl">
          EcoSense AI is an intelligent campus sustainability management platform engineered to collect telemetry data from campus facilities, apply machine learning anomaly detection algorithms, provide AI-powered waste classification, and deliver automated ESG compliance reports.
        </p>
      </div>

      {/* Program Collaborators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
            1M1B
          </div>
          <h3 className="font-bold text-on-surface">1 Million 1 Billion</h3>
          <p className="text-xs text-on-surface-variant">Global initiative driving purposeful youth leadership and AI for social good impact.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto text-xl font-bold">
            IBM
          </div>
          <h3 className="font-bold text-on-surface">IBM SkillsBuild</h3>
          <p className="text-xs text-on-surface-variant">Providing technology enablement, AI models, and cloud infrastructure guidance.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl font-bold">
            AICTE
          </div>
          <h3 className="font-bold text-on-surface">AICTE</h3>
          <p className="text-xs text-on-surface-variant">All India Council for Technical Education institutional internship support.</p>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="glass-panel p-8 rounded-2xl border border-outline-variant/40 space-y-6">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">architecture</span>
          System Architecture & Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4 p-4 rounded-xl bg-surface border border-outline-variant/40">
            <h4 className="font-bold text-sm text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">web</span>
              Frontend (Stitch UI Preserved)
            </h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li>• <strong>Framework:</strong> React 19 + TypeScript + Vite</li>
              <li>• <strong>Styling:</strong> Tailwind CSS v3 + Custom Material Design 3 tokens</li>
              <li>• <strong>Visualization:</strong> Recharts for real-time telemetry rendering</li>
              <li>• <strong>Icons & Typography:</strong> Google Material Symbols Outlined + Inter / Plus Jakarta Sans</li>
            </ul>
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-surface border border-outline-variant/40">
            <h4 className="font-bold text-sm text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined">dns</span>
              Backend AI & Data Pipeline
            </h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li>• <strong>Framework:</strong> Python FastAPI + Uvicorn ASGI</li>
              <li>• <strong>Database:</strong> SQLite / SQLAlchemy for relational storage</li>
              <li>• <strong>ML & AI:</strong> Statistical Anomaly Detection + Waste Image Classifier + Intent Engine</li>
              <li>• <strong>Export Engine:</strong> Automated CSV/JSON ESG Report Generators</li>
            </ul>
          </div>
        </div>

        {info && (
          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-outline font-mono">
            <span>Version: {info.version}</span>
            <span>Status: {info.status}</span>
            <span>AI Engine: {info.ai_module_status}</span>
          </div>
        )}
      </div>
    </div>
  )
}
