import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'admin' | 'faculty' | 'student'>('admin')
  const [email, setEmail] = useState('admin@ecosense.edu')
  const [password, setPassword] = useState('demo1234')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Save login state in localStorage
    localStorage.setItem('ecosense_user', JSON.stringify({ email, role, loggedInAt: new Date().toISOString() }))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-surface-variant flex items-center justify-center p-6">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-outline-variant/40 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
            <span className="material-symbols-outlined text-3xl">eco</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface">Welcome to EcoSense AI</h1>
          <p className="text-sm text-on-surface-variant mt-1">Sign in to access campus sustainability telemetry</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-2">
              Select User Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['admin', 'faculty', 'student'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r)
                    setEmail(`${r}@ecosense.edu`)
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border capitalize transition-all ${
                    role === r
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface/50 text-on-surface-variant border-outline-variant/40 hover:bg-surface'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/40 text-on-surface focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined text-xl">login</span>
            Sign In to Platform
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-outline-variant/30 text-center">
          <p className="text-xs text-outline">
            1M1B & IBM SkillsBuild AICTE Virtual Internship Demonstration Mode
          </p>
        </div>
      </div>
    </div>
  )
}
