import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login(form)
      localStorage.setItem('token', res.data.access_token)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Left panel */}
      <div style={{
        flex: 1, background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px', color: 'white'
      }} className="hidden md:flex">
        <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
          HuntDesk 🎯
        </div>
        <div style={{ fontSize: '24px', fontWeight: 300, opacity: 0.9, lineHeight: 1.4, marginBottom: '40px' }}>
          Your intelligent<br />job hunt dashboard
        </div>
        {[
          'AI-powered resume matching',
          'Kanban board for applications',
          'Hunt analytics & insights',
        ].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', opacity: 0.85 }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />
            <span style={{ fontSize: '15px' }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Right panel */}
      <div style={{
        width: '100%', maxWidth: '480px', display: 'flex',
        flexDirection: 'column', justifyContent: 'center', padding: '48px'
      }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Sign in to your HuntDesk account
          </p>
        </div>

        {error && (
          <div style={{
            background: 'var(--danger-light)', border: '1px solid #fecaca',
            color: 'var(--danger)', borderRadius: '10px', padding: '12px 16px',
            fontSize: '14px', marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Email address', name: 'email', type: 'email', placeholder: 'surya@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
          ].map(field => (
            <div key={field.name} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1.5px solid var(--border)', fontSize: '15px',
                  outline: 'none', transition: 'border-color 0.15s',
                  background: 'white', color: 'var(--text)',
                  fontFamily: 'Geist, sans-serif'
                }}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px', borderRadius: '10px',
              background: loading ? '#93c5fd' : 'var(--accent)',
              color: 'white', fontWeight: 600, fontSize: '15px',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s', fontFamily: 'Geist, sans-serif',
              marginTop: '4px'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>
            Create one free
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login