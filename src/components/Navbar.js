import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const categories = [
  { label: 'Home', path: '/' },
  { label: 'Business', path: '/business' },
  { label: 'Entertainment', path: '/entertainment' },
  { label: 'General', path: '/general' },
  { label: 'Health', path: '/health' },
  { label: 'Science', path: '/science' },
  { label: 'Sports', path: '/sports' },
  { label: 'Technology', path: '/technology' },
]

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      borderBottom: '1px solid rgba(99,102,241,0.2)',
      position: 'sticky', top: 0, zIndex: 1000,
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 'bold', color: 'white'
            }}>N</div>
            <span style={{
              fontSize: '1.25rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #a5b4fc, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>NewsChimp</span>
          </Link>

          {/* Desktop nav */}
          <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
            {categories.map(cat => {
              const isActive = location.pathname === cat.path
              return (
                <li key={cat.path}>
                  <Link to={cat.path} style={{
                    textDecoration: 'none', padding: '6px 14px', borderRadius: '20px',
                    fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s', display: 'block',
                    background: isActive ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                    color: isActive ? 'white' : '#94a3b8',
                    border: isActive ? '1px solid transparent' : '1px solid transparent',
                  }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#c7d2fe'; e.currentTarget.style.border = '1px solid rgba(99,102,241,0.4)' } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.border = '1px solid transparent' } }}
                  >
                    {cat.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn" style={{
            display: 'none', background: 'none', border: '1px solid rgba(99,102,241,0.4)',
            borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', color: '#a5b4fc', fontSize: '1.2rem'
          }}>☰</button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ paddingBottom: '1rem' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {categories.map(cat => {
                const isActive = location.pathname === cat.path
                return (
                  <li key={cat.path}>
                    <Link to={cat.path} onClick={() => setMenuOpen(false)} style={{
                      textDecoration: 'none', padding: '10px 16px', borderRadius: '8px',
                      display: 'block', fontSize: '0.9rem', fontWeight: 500,
                      background: isActive ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.04)',
                      color: isActive ? 'white' : '#94a3b8',
                    }}>{cat.label}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
export default Navbar