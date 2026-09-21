import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Main Dashboard' },
  { path: '/insights', icon: 'troubleshoot', label: 'AI Insights' },
  { path: '/analytics', icon: 'query_stats', label: 'Resource Analytics' },
  { path: '/waste-scanner', icon: 'document_scanner', label: 'Waste AI Scanner' },
  { path: '/assistant', icon: 'smart_toy', label: 'AI Assistant' },
  { path: '/recommendations', icon: 'checklist', label: 'Recommendations' },
  { path: '/reports', icon: 'assignment', label: 'Reports' },
  { path: '/about', icon: 'info', label: 'About & Credits' },
  { path: '/settings', icon: 'shield', label: 'Settings & Governance' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 bottom-0 h-screen w-72 bg-surface-container-lowest flex flex-col justify-between z-50 shadow-nav">
      <div className="flex flex-col flex-1 overflow-y-auto px-space-md pt-space-lg">
        {/* Logo */}
        <div className="flex items-center gap-space-sm px-space-xs pb-space-lg mb-space-sm">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">eco</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-none">EcoSense AI</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Campus Intelligence</span>
          </div>
        </div>

        {/* Operations Core */}
        <div className="px-space-xs mb-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Operations Core</span>
        </div>
        <nav className="flex flex-col gap-space-xs">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-md text-body-md">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* External */}
        <div className="px-space-xs mt-space-md mb-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">External</span>
        </div>
        <nav className="flex flex-col gap-space-xs">
          <NavLink
            to="/"
            className="flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span className="font-body-md text-body-md">Landing Page</span>
          </NavLink>
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-space-md bg-surface-container-low">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-on-surface truncate">Demo User</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">Sustainability Admin</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="p-space-xs text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-colors"
            title="Sign Out"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
