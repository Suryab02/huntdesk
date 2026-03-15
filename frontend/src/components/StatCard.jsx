function StatCard({ label, value, color, bg }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '14px',
      padding: '20px 24px',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border)'
    }}>
      <div style={{
        display: 'inline-flex',
        padding: '5px 10px',
        borderRadius: '8px',
        background: bg,
        color: color,
        fontSize: '12px',
        fontWeight: 600,
        marginBottom: '12px'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '32px',
        fontWeight: 700,
        color: 'var(--text)'
      }}>
        {value}
      </div>
    </div>
  )
}

export default StatCard