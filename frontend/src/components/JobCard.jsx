const STATUS_STYLES = {
  wishlist:  { bg: '#f1f5f9', color: '#475569' },
  applied:   { bg: '#eff6ff', color: '#2563eb' },
  screening: { bg: '#fffbeb', color: '#d97706' },
  interview: { bg: '#f5f3ff', color: '#7c3aed' },
  offer:     { bg: '#f0fdf4', color: '#16a34a' },
  rejected:  { bg: '#fef2f2', color: '#dc2626' },
}

function JobCard({ job, onDelete, dragging = false }) {
  const status = STATUS_STYLES[job.status] || STATUS_STYLES.wishlist

  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      padding: '14px',
      marginBottom: '8px',
      border: dragging ? `1.5px solid ${status.color}` : '1px solid var(--border)',
      boxShadow: dragging ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      cursor: 'grab',
      transition: 'box-shadow 0.15s, border 0.15s'
    }}>

      {/* Company avatar */}
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '7px',
        background: status.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 700,
        color: status.color,
        marginBottom: '8px'
      }}>
        {job.company[0]}
      </div>

      {/* Company + role */}
      <p style={{
        fontWeight: 600,
        color: 'var(--text)',
        fontSize: '13px'
      }}>
        {job.company}
      </p>
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '12px',
        marginTop: '2px'
      }}>
        {job.role}
      </p>

      {/* Match score */}
      {job.match_score && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginTop: '8px',
          fontSize: '11px',
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: '20px',
          background: job.match_score >= 70
            ? '#f0fdf4'
            : job.match_score >= 40
            ? '#fffbeb'
            : '#fef2f2',
          color: job.match_score >= 70
            ? '#16a34a'
            : job.match_score >= 40
            ? '#d97706'
            : '#dc2626'
        }}>
          {job.match_score}% match
        </div>
      )}

      {/* Platform */}
      {job.platform && (
        <p style={{
          color: 'var(--text-subtle)',
          fontSize: '11px',
          marginTop: '6px'
        }}>
          {job.platform}
        </p>
      )}

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={() => onDelete(job.id)}
          style={{
            display: 'block',
            marginTop: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '11px',
            color: 'var(--text-subtle)',
            padding: 0,
            fontFamily: 'Geist, sans-serif',
            transition: 'color 0.15s'
          }}
          onMouseEnter={e => e.target.style.color = '#dc2626'}
          onMouseLeave={e => e.target.style.color = 'var(--text-subtle)'}
        >
          Remove
        </button>
      )}
    </div>
  )
}

export default JobCard