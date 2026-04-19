import React from 'react'

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=60"

export const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) : ''

  return (
    <div className="news-card" style={{
      background: 'linear-gradient(145deg, #1e293b, #1a2234)',
      border: '1px solid rgba(99,102,241,0.15)',
      borderRadius: '16px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <img
          src={imageUrl || FALLBACK_IMAGE}
          alt={title}
          onError={e => { e.target.src = FALLBACK_IMAGE }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        {source && (
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', fontSize: '0.7rem', fontWeight: 600,
            padding: '4px 10px', borderRadius: '20px',
            letterSpacing: '0.03em', boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>{source}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '1rem', fontWeight: 700, lineHeight: 1.4,
          color: '#f1f5f9', margin: '0 0 0.75rem',
        }} className="line-clamp-2">{title || 'No title available'}</h3>

        <p style={{
          fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8',
          margin: '0 0 1rem', flex: 1
        }} className="line-clamp-3">{description || 'No description available.'}</p>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(99,102,241,0.12)', paddingTop: '0.875rem', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>✍ {author || 'Staff'}</p>
              <p style={{ fontSize: '0.72rem', color: '#475569', margin: '2px 0 0' }}>📅 {formattedDate}</p>
            </div>
            <a
              href={newsUrl} target="_blank" rel="noreferrer"
              style={{
                textDecoration: 'none', padding: '7px 16px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', fontSize: '0.8rem', fontWeight: 600,
                boxShadow: '0 4px 12px rgba(99,102,241,0.3)', transition: 'opacity 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Read More →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem