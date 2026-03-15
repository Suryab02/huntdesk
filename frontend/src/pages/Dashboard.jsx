import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStats, getJobs, addJob } from '../services/api'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'

const STATUS_STYLES = {
  wishlist: { bg: '#f1f5f9', color: '#475569' },
  applied: { bg: '#eff6ff', color: '#2563eb' },
  screening: { bg: '#fffbeb', color: '#d97706' },
  interview: { bg: '#f5f3ff', color: '#7c3aed' },
  offer: { bg: '#f0fdf4', color: '#16a34a' },
  rejected: { bg: '#fef2f2', color: '#dc2626' },
}

function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddJob, setShowAddJob] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newJob, setNewJob] = useState({
    company: '', role: '', job_description: '',
    platform: '', location: '', salary_range: ''
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [statsRes, jobsRes] = await Promise.all([getStats(), getJobs()])
      setStats(statsRes.data)
      setJobs(jobsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddJob = async () => {
    setAdding(true)
    try {
      await addJob(newJob)
      setShowAddJob(false)
      setNewJob({ company: '', role: '', job_description: '', platform: '', location: '', salary_range: '' })
      fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Loading your dashboard...</p>
    </div>
  )

  const statCards = [
    { label: 'Applied', value: stats?.applied ?? 0, color: 'var(--accent)', bg: 'var(--accent-light)' },
    { label: 'Interviews', value: stats?.interview ?? 0, color: 'var(--purple)', bg: 'var(--purple-light)' },
    { label: 'Offers', value: stats?.offer ?? 0, color: 'var(--success)', bg: 'var(--success-light)' },
    { label: 'Response Rate', value: `${stats?.response_rate ?? 0}%`, color: 'var(--warning)', bg: 'var(--warning-light)' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '2px' }}>
              Track and manage your job applications
            </p>
          </div>
          <button
            onClick={() => setShowAddJob(true)}
            style={{
              padding: '10px 20px', borderRadius: '10px', background: 'var(--accent)',
              color: 'white', fontWeight: 600, fontSize: '14px', border: 'none',
              cursor: 'pointer', fontFamily: 'Geist, sans-serif',
              boxShadow: '0 1px 3px rgba(37,99,235,0.3)'
            }}
          >
            + Add Application
          </button>
        </div>

        {/* Stat cards */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
  {statCards.map(card => (
    <StatCard
      key={card.label}
      label={card.label}
      value={card.value}
      color={card.color}
      bg={card.bg}
    />
  ))}
</div>

        {/* Jobs list */}
        <div style={{
          background: 'white', borderRadius: '14px',
          boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>
              Applications
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {jobs.length} total
            </span>
          </div>

          {jobs.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                No applications yet
              </p>
              <p style={{ color: 'var(--text-subtle)', fontSize: '13px', marginTop: '4px' }}>
                Click "Add Application" to get started
              </p>
            </div>
          ) : (
            jobs.map((job, i) => (
              <div key={job.id} style={{
                padding: '16px 24px',
                borderBottom: i < jobs.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background 0.1s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'var(--accent-light)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 700, color: 'var(--accent)',
                    flexShrink: 0
                  }}>
                    {job.company[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '15px' }}>
                      {job.company}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '1px' }}>
                      {job.role} {job.platform && `· ${job.platform}`}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {job.match_score && (
                    <span style={{
                      fontSize: '13px', fontWeight: 600, padding: '4px 10px',
                      borderRadius: '20px',
                      background: job.match_score >= 70 ? 'var(--success-light)' : job.match_score >= 40 ? 'var(--warning-light)' : '#fef2f2',
                      color: job.match_score >= 70 ? 'var(--success)' : job.match_score >= 40 ? 'var(--warning)' : 'var(--danger)'
                    }}>
                      {job.match_score}% match
                    </span>
                  )}
                  <span style={{
                    fontSize: '12px', fontWeight: 500, padding: '4px 12px',
                    borderRadius: '20px', textTransform: 'capitalize',
                    background: STATUS_STYLES[job.status]?.bg || '#f1f5f9',
                    color: STATUS_STYLES[job.status]?.color || '#475569'
                  }}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Job Modal */}
      {showAddJob && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, padding: '24px'
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            width: '100%', maxWidth: '480px', boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                Add Application
              </h3>
              <button
                onClick={() => setShowAddJob(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-muted)' }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              {[
                { name: 'company', placeholder: 'Company name' },
                { name: 'role', placeholder: 'Role / Position' },
                { name: 'platform', placeholder: 'Platform' },
                { name: 'location', placeholder: 'Location' },
                { name: 'salary_range', placeholder: 'Salary range' },
              ].map(field => (
                <input
                  key={field.name}
                  placeholder={field.placeholder}
                  value={newJob[field.name]}
                  onChange={e => setNewJob({ ...newJob, [field.name]: e.target.value })}
                  style={{
                    padding: '10px 13px', borderRadius: '8px',
                    border: '1.5px solid var(--border)', fontSize: '14px',
                    outline: 'none', fontFamily: 'Geist, sans-serif',
                    color: 'var(--text)'
                  }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              ))}
            </div>

            <textarea
              placeholder="Paste job description for AI match scoring (optional)"
              value={newJob.job_description}
              onChange={e => setNewJob({ ...newJob, job_description: e.target.value })}
              rows={3}
              style={{
                width: '100%', padding: '10px 13px', borderRadius: '8px',
                border: '1.5px solid var(--border)', fontSize: '14px',
                outline: 'none', fontFamily: 'Geist, sans-serif',
                color: 'var(--text)', resize: 'none', marginBottom: '16px'
              }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowAddJob(false)}
                style={{
                  flex: 1, padding: '10px', borderRadius: '8px',
                  border: '1.5px solid var(--border)', background: 'white',
                  color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer',
                  fontFamily: 'Geist, sans-serif'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddJob}
                disabled={adding || !newJob.company || !newJob.role}
                style={{
                  flex: 1, padding: '10px', borderRadius: '8px',
                  background: adding ? '#93c5fd' : 'var(--accent)',
                  color: 'white', fontWeight: 600, fontSize: '14px',
                  border: 'none', cursor: adding ? 'not-allowed' : 'pointer',
                  fontFamily: 'Geist, sans-serif'
                }}
              >
                {adding ? 'Adding...' : 'Add Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard