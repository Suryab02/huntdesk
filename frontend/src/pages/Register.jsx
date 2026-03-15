import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/api'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
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
      const res = await register(form)
      localStorage.setItem('token', res.data.access_token)
      navigate('/onboarding')
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)' }}>
            HuntDesk 🎯
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '15px' }}>
            Start tracking your job hunt
          </p>
        </div>

        <div style={{
          background: 'white', borderRadius: '16px', padding: '36px',
          boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--text)' }}>
            Create your account
          </h2>

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
              { label: 'Full Name', name: 'full_name', type: 'text', placeholder: 'Surya Prabhas' },
              { label: 'Email address', name: 'email', type: 'email', placeholder: 'surya@example.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.name} style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>
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
                    width: '100%', padding: '10px 13px', borderRadius: '8px',
                    border: '1.5px solid var(--border)', fontSize: '14px',
                    outline: 'none', background: 'white', color: 'var(--text)',
                    fontFamily: 'Geist, sans-serif', transition: 'border-color 0.15s'
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
                width: '100%', padding: '11px', borderRadius: '8px',
                background: loading ? '#93c5fd' : 'var(--accent)',
                color: 'white', fontWeight: 600, fontSize: '14px',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Geist, sans-serif', marginTop: '4px'
              }}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register