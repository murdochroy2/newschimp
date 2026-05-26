import React from 'react'

export const Spinner = () => {
  return (
    <div className="nc-spinner-wrap">
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        border: '2.5px solid var(--border)',
        borderTop: '2.5px solid var(--accent)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p className="nc-spinner-text">Loading stories…</p>
    </div>
  )
}
export default Spinner