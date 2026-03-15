import { useNavigate, useLocation } from 'react-router-dom'

const links = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/kanban', label: 'Kanban' },
  { path: '/insights', label: 'Insights' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={{
      background: 'white', borderBottom: '1px solid var(--border)',
      padding: '0 32px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '60px',
      boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>
        HuntDesk 🎯
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        {links.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{
              padding: '6px 14px', borderRadius: '8px', border: 'none',
              background: location.pathname === link.path ? 'var(--accent-light)' : 'transparent',
              color: location.pathname === link.path ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: location.pathname === link.path ? 600 : 400,
              fontSize: '14px', cursor: 'pointer', fontFamily: 'Geist, sans-serif',
              transition: 'all 0.15s'
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--border)',
          background: 'transparent', color: 'var(--text-muted)', fontSize: '14px',
          cursor: 'pointer', fontFamily: 'Geist, sans-serif', transition: 'all 0.15s'
        }}
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar