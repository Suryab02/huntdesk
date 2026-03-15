import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadResume, savePreferences } from '../services/api'

const inputStyle = {
  width: '100%', padding: '10px 13px', borderRadius: '8px',
  border: '1.5px solid var(--border)', fontSize: '14px',
  outline: 'none', fontFamily: 'Geist, sans-serif',
  color: 'var(--text)', background: 'white', transition: 'border-color 0.15s'
}

const labelStyle = {
  display: 'block', fontSize: '13px', fontWeight: 500,
  color: 'var(--text)', marginBottom: '6px'
}

function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resumeData, setResumeData] = useState(null)
  const [file, setFile] = useState(null)
  const [prefs, setPrefs] = useState({
    target_role: '',
    work_type: 'remote',
    target_location: '',
    expected_ctc: '',
    notice_period: '',
    platforms: ''
  })

  const handleFileChange = (e) => setFile(e.target.files[0])

  const handleUploadResume = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const res = await uploadResume(file)
      setResumeData(res.data)
      setStep(2)
    } catch {
      setError('Failed to parse resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrefsChange = (e) => {
    setPrefs({ ...prefs, [e.target.name]: e.target.value })
  }

  const handleSavePrefs = async () => {
    setLoading(true)
    setError('')
    try {
      await savePreferences(prefs)
      setStep(3)
    } catch {
      setError('Failed to save preferences.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)' }}>
            HuntDesk 🎯
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Let's set up your dashboard
          </p>
        </div>

        <div style={{
          background: 'white', borderRadius: '16px', padding: '36px',
          boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)'
        }}>

          {/* Progress bar */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                flex: 1, height: '4px', borderRadius: '99px',
                background: s <= step ? 'var(--accent)' : 'var(--border)',
                transition: 'background 0.3s'
              }} />
            ))}
          </div>

          {/* Step label */}
          <p style={{
            fontSize: '12px', fontWeight: 600, color: 'var(--accent)',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px'
          }}>
            Step {step} of 3
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: 'var(--danger-light)', border: '1px solid #fecaca',
              color: 'var(--danger)', borderRadius: '10px', padding: '12px 16px',
              fontSize: '14px', marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          {/* ── Step 1 — Upload Resume ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
                Upload your resume
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                We'll extract your skills and experience automatically
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="resume-upload"
              />
              <label htmlFor="resume-upload" style={{
                display: 'block', border: '2px dashed var(--border)',
                borderRadius: '12px', padding: '36px', textAlign: 'center',
                cursor: 'pointer', marginBottom: '20px', transition: 'border-color 0.15s',
                background: file ? 'var(--accent-light)' : 'transparent'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>
                  {file ? '✅' : '📄'}
                </div>
                <p style={{
                  fontSize: '14px', fontWeight: 500,
                  color: file ? 'var(--accent)' : 'var(--text-muted)'
                }}>
                  {file ? file.name : 'Click to upload your PDF resume'}
                </p>
                {!file && (
                  <p style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '4px' }}>
                    PDF only
                  </p>
                )}
              </label>

              <button
                onClick={handleUploadResume}
                disabled={!file || loading}
                style={{
                  width: '100%', padding: '11px', borderRadius: '8px',
                  background: !file || loading ? '#93c5fd' : 'var(--accent)',
                  color: 'white', fontWeight: 600, fontSize: '14px',
                  border: 'none', cursor: !file || loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Geist, sans-serif'
                }}
              >
                {loading ? 'Parsing resume...' : 'Upload & Continue →'}
              </button>
            </div>
          )}

          {/* ── Step 2 — Preferences ── */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
                What are you targeting?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                Help us personalize your dashboard
              </p>

              {/* Extracted resume info */}
              {resumeData && (
                <div style={{
                  background: 'var(--accent-light)', border: '1px solid #bfdbfe',
                  borderRadius: '10px', padding: '14px 16px', marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px' }}>
                    EXTRACTED FROM RESUME
                  </p>
                  {[
                    { label: 'Role', value: resumeData.current_role },
                    { label: 'Company', value: resumeData.current_company },
                    { label: 'Skills', value: resumeData.skills },
                  ].map(item => item.value && (
                    <p key={item.label} style={{ fontSize: '13px', color: 'var(--text)', marginBottom: '3px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{item.label}:</span> {item.value}
                    </p>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Target Role', name: 'target_role', placeholder: 'Backend Engineer', type: 'input' },
                  { label: 'Target Location', name: 'target_location', placeholder: 'Hyderabad / Remote', type: 'input' },
                  { label: 'Expected CTC', name: 'expected_ctc', placeholder: '20-25 LPA', type: 'input' },
                  { label: 'Notice Period', name: 'notice_period', placeholder: '60 days', type: 'input' },
                  { label: 'Platforms', name: 'platforms', placeholder: 'linkedin, wellfound, instahyre', type: 'input' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={labelStyle}>{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={prefs[field.name]}
                      onChange={handlePrefsChange}
                      placeholder={field.placeholder}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#2563eb'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}

                <div>
                  <label style={labelStyle}>Work Type</label>
                  <select
                    name="work_type"
                    value={prefs.work_type}
                    onChange={handlePrefsChange}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">Onsite</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSavePrefs}
                disabled={loading}
                style={{
                  width: '100%', padding: '11px', borderRadius: '8px',
                  background: loading ? '#93c5fd' : 'var(--accent)',
                  color: 'white', fontWeight: 600, fontSize: '14px',
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Geist, sans-serif', marginTop: '20px'
                }}
              >
                {loading ? 'Saving...' : 'Save & Continue →'}
              </button>
            </div>
          )}

          {/* ── Step 3 — Done ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                You're all set!
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>
                Your personalized hunt dashboard is ready
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  width: '100%', padding: '12px', borderRadius: '8px',
                  background: 'var(--accent)', color: 'white', fontWeight: 600,
                  fontSize: '15px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Geist, sans-serif'
                }}
              >
                Go to Dashboard →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Onboarding