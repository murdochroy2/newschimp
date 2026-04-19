import React from 'react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=60'

export const NewsItem = ({ article }) => {
  const { title, description, urlToImage, url, author, publishedAt, source } = article

  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) : ''

  return (
    <div className="nc-story-row">
      <img
        src={urlToImage || FALLBACK_IMAGE}
        onError={e => { e.target.src = FALLBACK_IMAGE }}
        alt={title}
        className="nc-story-row-img"
      />
      <div className="nc-story-row-body">
        <span className="nc-cat-tag">{source?.name}</span>
        <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="nc-headline-md">{title}</h3>
        </a>
        {description && (
          <p className="nc-standfirst line-clamp-2" style={{ fontSize: '13px' }}>{description}</p>
        )}
        <p className="nc-byline"><strong>{author || 'Staff'}</strong> · {formattedDate}</p>
      </div>
    </div>
  )
}

export default NewsItem