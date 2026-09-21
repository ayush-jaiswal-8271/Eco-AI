import apiClient from './api'
import type {
  DashboardSummary, TrendsData, ResourceStats,
  AIInsight, WasteScanResult, WasteScanHistory,
  ChatResponse, Recommendation, Report, AppInfo
} from '../types/api'

// Dashboard
export const getDashboardSummary = () =>
  apiClient.get<DashboardSummary>('/api/dashboard/summary').then(r => r.data)

export const getResourceTrends = (timeframe: string = 'daily') =>
  apiClient.get<TrendsData>(`/api/resource/trends?timeframe=${timeframe}`).then(r => r.data)

// Resources
export const getResourceStats = (type: string = 'energy') =>
  apiClient.get<ResourceStats>(`/api/resource/stats?resource_type=${type}`).then(r => r.data)

// AI Insights
export const getInsights = (category?: string) =>
  apiClient.get<AIInsight[]>(`/api/insights${category ? `?category=${category}` : ''}`).then(r => r.data)

export const runAIAnalysis = () =>
  apiClient.post<AIInsight[]>('/api/insights/run-analysis').then(r => r.data)

// Waste Scanner
export const classifyWasteImage = (file?: File) => {
  const formData = new FormData()
  if (file) {
    formData.append('file', file)
  }
  return apiClient.post<WasteScanResult>('/api/waste/classify', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data)
}

export const getWasteScanHistory = () =>
  apiClient.get<WasteScanHistory[]>('/api/waste/history').then(r => r.data)

// AI Chat
export const sendChatMessage = (message: string) =>
  apiClient.post<ChatResponse>('/api/chat', { message }).then(r => r.data)

// Recommendations
export const getRecommendations = () =>
  apiClient.get<Recommendation[]>('/api/recommendations').then(r => r.data)

// Reports
export const generateReport = (timeframe: string = 'monthly') =>
  apiClient.get<Report>(`/api/reports/generate?timeframe=${timeframe}`).then(r => r.data)

// App Info
export const getAppInfo = () =>
  apiClient.get<AppInfo>('/api/info').then(r => r.data)
