import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import PublicLayout from './layouts/PublicLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import InsightsPage from './pages/InsightsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import WasteScannerPage from './pages/WasteScannerPage'
import AssistantPage from './pages/AssistantPage'
import RecommendationsPage from './pages/RecommendationsPage'
import ReportsPage from './pages/ReportsPage'
import AboutPage from './pages/AboutPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* App routes with sidebar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/waste-scanner" element={<WasteScannerPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
