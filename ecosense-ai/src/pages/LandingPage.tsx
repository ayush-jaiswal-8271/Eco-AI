import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-variant text-on-surface flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-surface to-surface-variant py-20 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-container/20 text-primary border border-primary/20 text-xs sm:text-sm font-semibold">
              <span className="material-symbols-outlined text-base">verified</span>
              1M1B & IBM SkillsBuild AICTE Project
            </div>
            
            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-tight">
              Turn Campus Data Into <span className="text-primary">Sustainable Action</span>
            </h1>
            
            <p className="text-body-md text-on-surface-variant text-lg max-w-xl">
              EcoSense AI is a next-generation campus sustainability intelligence platform. Monitor energy, water, and waste metrics in real-time, detect resource anomalies, classify waste via AI, and generate ESG-compliant reports.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                to="/dashboard" 
                className="px-6 py-3.5 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary-hover transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
              >
                Launch Dashboard
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3.5 rounded-xl bg-surface-variant text-on-surface font-semibold hover:bg-outline-variant/20 transition-all border border-outline-variant/40"
              >
                Project Details
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 shadow-2xl relative z-10">
              <div className="flex items-center justify-between mb-4 border-b border-outline-variant/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <span className="text-xs font-mono text-outline">EcoSense AI Preview</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-surface/80 border border-outline-variant/30">
                  <span className="text-xs text-outline font-medium">Sustainability Index</span>
                  <div className="text-2xl font-bold text-primary mt-1">78.4 / 100</div>
                  <span className="text-xs text-emerald-500 font-semibold">+4.2% this month</span>
                </div>
                <div className="p-4 rounded-xl bg-surface/80 border border-outline-variant/30">
                  <span className="text-xs text-outline font-medium">Active Anomalies</span>
                  <div className="text-2xl font-bold text-amber-500 mt-1">3 Alerts</div>
                  <span className="text-xs text-outline">Block B HVAC leakage</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface/80 border border-outline-variant/30">
                <div className="flex items-center justify-between text-xs text-outline mb-2">
                  <span>Weekly Energy Consumption Trend</span>
                  <span className="text-primary font-mono">14,850 kWh</span>
                </div>
                <div className="h-24 bg-primary/10 rounded-lg flex items-end justify-between p-2 gap-2">
                  <div className="w-full bg-primary/40 rounded-t h-[60%]"></div>
                  <div className="w-full bg-primary/50 rounded-t h-[80%]"></div>
                  <div className="w-full bg-primary/40 rounded-t h-[55%]"></div>
                  <div className="w-full bg-error/60 rounded-t h-[95%]" title="Anomaly Spike Detected"></div>
                  <div className="w-full bg-primary/70 rounded-t h-[70%]"></div>
                  <div className="w-full bg-primary/80 rounded-t h-[65%]"></div>
                  <div className="w-full bg-primary rounded-t h-[40%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-on-surface mb-4">Comprehensive Campus Intelligence</h2>
          <p className="text-on-surface-variant">Built with robust machine learning & data analytics to turn complex utility telemetry into actionable eco-strategies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">monitoring</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Real-Time Telemetry</h3>
            <p className="text-on-surface-variant text-sm">Track energy (kWh), water (liters), and waste (kg) dynamically with building-level granularity across your entire campus.</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">troubleshoot</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">AI Anomaly Detection</h3>
            <p className="text-on-surface-variant text-sm">Automatically identify abnormal consumption spikes, equipment failures, and HVAC inefficiencies before costs escalate.</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">recycling</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Smart Waste Classifier</h3>
            <p className="text-on-surface-variant text-sm">Upload waste item photos to classify organic, recyclable, and hazardous waste with AI-powered sorting guidelines.</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">chat</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">EcoBot Assistant</h3>
            <p className="text-on-surface-variant text-sm">Interact with an AI assistant trained on campus sustainability data to query stats, generate insights, and get advice.</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">Actionable Recommendations</h3>
            <p className="text-on-surface-variant text-sm">Prioritized, high-ROI sustainability projects calculated using ROI formulas, payback periods, and CO2 reduction estimations.</p>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-outline-variant/40 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">ESG & Sustainability Reports</h3>
            <p className="text-on-surface-variant text-sm">Generate comprehensive exportable reports (JSON/CSV) structured according to global campus sustainability standards.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
