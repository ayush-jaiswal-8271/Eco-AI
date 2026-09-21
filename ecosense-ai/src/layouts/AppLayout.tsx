import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const pageNames: Record<string, string> = {
  '/dashboard': 'Campus Sustainability Dashboard',
  '/insights': 'AI Insights',
  '/analytics': 'Resource Analytics',
  '/waste-scanner': 'Waste AI Scanner',
  '/assistant': 'AI Sustainability Assistant',
  '/recommendations': 'Recommendations',
  '/reports': 'Sustainability Reports',
  '/settings': 'Settings & Responsible AI',
}

export default function AppLayout() {
  const location = useLocation()
  const pageName = pageNames[location.pathname] || 'EcoSense AI'

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Main content offset by sidebar width */}
      <div className="pl-72 flex flex-col min-h-screen w-full">
        {/* Top header bar */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-nav z-40 flex items-center justify-between px-gutter">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">apartment</span>
              <span>EcoSense AI</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface font-semibold">{pageName}</span>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm font-semibold">Demo Mode</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pt-16 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
