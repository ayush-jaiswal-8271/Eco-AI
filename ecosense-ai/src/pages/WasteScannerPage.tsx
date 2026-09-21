import React, { useState, useEffect } from 'react'
import { classifyWasteImage, getWasteScanHistory } from '../services/ecosense'
import type { WasteScanResult, WasteScanHistory } from '../types/api'
import { Spinner, ErrorState, DemoModeBanner } from '../components/ui'

export default function WasteScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<WasteScanResult | null>(null)
  const [history, setHistory] = useState<WasteScanHistory[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  const fetchHistory = async () => {
    try {
      const data = await getWasteScanHistory()
      setHistory(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    }
  }

  const handleScan = async () => {
    if (!selectedFile && !previewUrl) return
    setLoading(true)
    setError(null)

    try {
      const res = await classifyWasteImage(selectedFile || undefined)
      setResult(res)
      if (res.is_demo) setIsDemo(true)
      fetchHistory()
    } catch (err: any) {
      setError(err.message || 'Failed to classify image')
    } finally {
      setLoading(false)
    }
  }

  const loadSampleImage = (item: string) => {
    // Demo sample selection
    setSelectedFile(null)
    if (item === 'plastic') {
      setPreviewUrl('https://images.unsplash.com/photo-1526958097901-5e6d742d3371?auto=format&fit=crop&w=400&q=80')
    } else if (item === 'paper') {
      setPreviewUrl('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=400&q=80')
    } else {
      setPreviewUrl('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80')
    }
    setResult(null)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {isDemo && <DemoModeBanner message="Running Waste Classification in Demo Mode." />}

      {/* Page Header */}
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">recycling</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">AI Smart Waste Scanner</h1>
            <p className="text-xs text-on-surface-variant">Classify campus waste items into proper segregation bins and view eco-disposal guidelines</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload & Scanner Section */}
        <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-6">
          <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">photo_camera</span>
            Scan Waste Item
          </h2>

          {/* Sample Preset buttons */}
          <div>
            <span className="text-xs font-semibold text-outline block mb-2">Or select sample image:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadSampleImage('plastic')}
                className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-xs hover:border-primary/50 text-on-surface"
              >
                🥤 PET Bottle
              </button>
              <button
                type="button"
                onClick={() => loadSampleImage('paper')}
                className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-xs hover:border-primary/50 text-on-surface"
              >
                📦 Cardboard Box
              </button>
              <button
                type="button"
                onClick={() => loadSampleImage('organic')}
                className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-xs hover:border-primary/50 text-on-surface"
              >
                🍏 Food Waste
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-6 text-center hover:border-primary transition-all relative bg-surface/40">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {previewUrl ? (
              <div className="space-y-4">
                <img
                  src={previewUrl}
                  alt="Waste preview"
                  className="max-h-56 mx-auto rounded-xl object-contain border border-outline-variant/40 shadow-sm"
                />
                <p className="text-xs text-outline">Click or drag a new image to replace</p>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <span className="material-symbols-outlined text-4xl text-outline">upload_file</span>
                <p className="text-sm font-semibold text-on-surface">Drag & drop or click to upload waste photo</p>
                <p className="text-xs text-outline">Supports PNG, JPG, WEBP</p>
              </div>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={!previewUrl || loading}
            className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary-hover disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
          >
            {loading ? (
              <Spinner size="sm" message="Analyzing waste item..." />
            ) : (
              <>
                <span className="material-symbols-outlined">center_focus_strong</span>
                Run AI Waste Scan
              </>
            )}
          </button>

          {error && <ErrorState title="Scan Error" message={error} />}
        </div>

        {/* Scan Results Section */}
        <div className="space-y-6">
          {result ? (
            <div className="glass-panel p-6 rounded-2xl border border-primary/40 space-y-5 bg-gradient-to-br from-surface to-primary-container/10">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-outline">Classification Result</span>
                  <h3 className="text-2xl font-bold text-primary capitalize mt-0.5">{result.item_name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-outline">Confidence</span>
                  <div className="text-lg font-mono font-bold text-emerald-500">
                    {Math.round(result.confidence * 100)}%
                  </div>
                </div>
              </div>

              {/* Bin Assignment */}
              <div className="p-4 rounded-xl bg-surface border border-outline-variant/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center font-bold">
                    ♻️
                  </div>
                  <div>
                    <span className="text-xs text-outline">Recommended Bin</span>
                    <h4 className="text-base font-bold text-on-surface capitalize">{result.category} Bin</h4>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold capitalize">
                  {result.category}
                </span>
              </div>

              {/* Segregation & Disposal Guidelines */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-outline uppercase tracking-wider">Disposal Instructions</h4>
                <div className="p-4 rounded-xl bg-surface border border-outline-variant/40 text-xs text-on-surface-variant leading-relaxed">
                  {result.disposal_instructions}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface border border-outline-variant/40">
                  <span className="text-[10px] font-semibold text-outline uppercase">CO2 Savings potential</span>
                  <p className="text-sm font-bold text-emerald-500 mt-0.5">{result.co2_saved_kg} kg CO2</p>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-outline-variant/40">
                  <span className="text-[10px] font-semibold text-outline uppercase">Campus Bin Location</span>
                  <p className="text-sm font-bold text-on-surface mt-0.5">Block A - Ground Floor</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-outline-variant/40 text-center space-y-4 flex flex-col items-center justify-center h-[340px]">
              <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-3xl">center_focus_weak</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">No Active Scan Result</h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-xs">Upload a waste photo or click a sample preset on the left to analyze bin segregation guidelines.</p>
              </div>
            </div>
          )}

          {/* History Log */}
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/40 space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center justify-between">
              <span>Recent Waste Scans Log</span>
              <span className="text-xs font-mono text-outline">{history.length} scans recorded</span>
            </h3>

            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {history.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-surface/60 border border-outline-variant/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">delete</span>
                    <div>
                      <span className="font-semibold text-on-surface capitalize">{item.item_name}</span>
                      <span className="text-outline ml-2">({item.category})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-500 font-semibold">{item.co2_saved_kg} kg CO2</span>
                    <span className="text-outline block text-[10px]">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
