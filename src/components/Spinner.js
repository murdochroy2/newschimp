import React from 'react'

export const Spinner = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', gap: '1rem' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid rgba(99,102,241,0.2)',
        borderTop: '3px solid #6366f1',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ color: '#6366f1', fontSize: '0.875rem', fontWeight: 500, margin: 0, letterSpacing: '0.05em' }}>Loading stories…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
export default Spinner