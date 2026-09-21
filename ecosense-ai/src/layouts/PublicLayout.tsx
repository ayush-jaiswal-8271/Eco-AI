import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function PublicLayout() {
  const navigate = useNavigate()

  return (
    <div className="bg-background font-body-md text-on-surface antialiased">
      {/* Public navbar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-nav">
        <div className="h-16 w-full px-gutter flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">eco</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface">EcoSense AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-space-lg">
            <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Platform</Link>
            <Link to="/analytics" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Analytics</Link>
            <Link to="/reports" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Impact</Link>
            <Link to="/settings" className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors">Ethics & Governance</Link>
          </nav>

          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-space-md py-space-xs rounded-lg bg-primary font-label-md text-label-md text-on-primary hover:bg-primary-container transition-colors"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}
