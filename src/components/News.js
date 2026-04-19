import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60'
const MARKETS = [
  { name: 'S&P 500',    val: '5,312',  change: '▲ 0.42%', up: true },
  { name: 'NASDAQ',     val: '18,740', change: '▲ 0.67%', up: true },
  { name: 'FTSE 100',   val: '7,890',  change: '▼ 0.19%', up: false },
  { name: 'Nikkei 225', val: '39,450', change: '▲ 1.12%', up: true },
  { name: 'Brent Crude',val: '$74.30', change: '▼ 0.55%', up: false },
  { name: 'Gold',       val: '$3,287', change: '▲ 0.88%', up: true },
]

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const pageSize = 20
  const NEWSAPI_URL = process.env.REACT_APP_NEWSAPI_URL
  const API_KEY = process.env.REACT_APP_API_KEY
  const apiKeyParam = process.env.NODE_ENV === 'development' && API_KEY ? `&apiKey=${API_KEY}` : ''

  useEffect(() => { updateNews() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateNews = async () => {
    props.setProgress(10)
    setLoading(true)
    try {
      const url = `${NEWSAPI_URL}/v2/top-headlines?country=${props.country}&category=${props.category}&page=1&pageSize=${pageSize}${apiKeyParam}`
      props.setProgress(30)
      const data = await fetch(url)
      props.setProgress(70)
      const parsed = await data.json()
      setArticles(parsed.articles || [])
      setTotalResults(parsed.totalResults || 0)
      setPage(1)
    } catch (e) { console.error(e) }
    props.setProgress(100)
    setLoading(false)
  }

  const fetchMoreData = async () => {
    const newPage = page + 1
    setPage(newPage)
    const url = `${NEWSAPI_URL}/v2/top-headlines?country=${props.country}&category=${props.category}&page=${newPage}&pageSize=${pageSize}${apiKeyParam}`
    const data = await fetch(url)
    const parsed = await data.json()
    setArticles(prev => prev.concat(parsed.articles || []))
    setTotalResults(parsed.totalResults || 0)
  }

  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
  const fmtDateShort = d => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''

  if (loading && articles.length === 0) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spinner /></div>

  const heroMain = articles[0]
  const heroSubs = articles.slice(1, 3)
  const listArticles = articles.slice(3)
  const focusArticles = articles.slice(3, 6)

  return (
    <>
      {/* ── HERO GRID ── */}
      {articles.length >= 3 && (
        <div className="nc-container">
          <div className="nc-hero-grid">
            {/* Lead story */}
            <div className="nc-hero-main">
              <img
                src={heroMain.urlToImage || FALLBACK_IMAGE}
                onError={e => { e.target.src = FALLBACK_IMAGE }}
                alt={heroMain.title}
                className="nc-hero-main-img"
              />
              <div className="nc-hero-main-body">
                <span className="nc-cat-tag">{heroMain.source?.name || cap(props.category)} · Exclusive</span>
                <h1 className="nc-headline-xl">{heroMain.title}</h1>
                {heroMain.description && <p className="nc-standfirst">{heroMain.description}</p>}
                <p className="nc-byline" style={{ marginTop: '16px' }}>
                  <strong>{heroMain.author || 'Staff Reporter'}</strong> · {fmtDate(heroMain.publishedAt)}
                </p>
              </div>
            </div>

            {/* Sub stories */}
            <div>
              {heroSubs.map((article, i) => (
                <div key={article.url} className="nc-hero-sub"
                  style={i === 0 ? { borderBottom: '1px solid var(--border)' } : {}}>
                  <img
                    src={article.urlToImage || FALLBACK_IMAGE}
                    onError={e => { e.target.src = FALLBACK_IMAGE }}
                    alt={article.title}
                    className="nc-hero-sub-img"
                  />
                  <span className="nc-cat-tag">{article.source?.name}</span>
                  <h2 className="nc-headline-lg">{article.title}</h2>
                  {article.description && <p className="nc-standfirst" style={{ fontSize: '13px' }}>{article.description}</p>}
                  <p className="nc-byline">
                    <strong>{article.author || 'Staff'}</strong> · {fmtDateShort(article.publishedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="nc-container">
        <div className="nc-page-body">

          {/* MAIN */}
          <main>
            <div className="nc-section-head">
              <h2>Latest News</h2>
              <div className="nc-section-line"></div>
              <span className="nc-section-tag">Updated hourly</span>
            </div>

            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={page * pageSize < totalResults}
              loader={<Spinner />}
              style={{ overflow: 'visible' }}
            >
              <div className="nc-stories-list">
                {listArticles.map(article => (
                  <NewsItem key={article.url} article={article} />
                ))}
              </div>
            </InfiniteScroll>

            {/* In Focus grid */}
            {focusArticles.length >= 3 && (
              <>
                <div className="nc-section-head">
                  <h2>In Focus</h2>
                  <div className="nc-section-line"></div>
                </div>
                <div className="nc-topic-grid">
                  {focusArticles.map(article => (
                    <a key={article.url} href={article.url} target="_blank" rel="noreferrer" className="nc-topic-card">
                      <img
                        src={article.urlToImage || FALLBACK_IMAGE}
                        onError={e => { e.target.src = FALLBACK_IMAGE }}
                        alt={article.title}
                        className="nc-topic-card-img"
                      />
                      <div className="nc-topic-card-body">
                        <span className="nc-cat-tag">{article.source?.name}</span>
                        <h3 className="nc-headline-md">{article.title}</h3>
                        <p className="nc-byline" style={{ marginTop: '6px' }}>{article.author || 'Staff'} · {fmtDateShort(article.publishedAt)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </main>

          {/* SIDEBAR */}
          <aside className="nc-sidebar">
            {/* Newsletter */}
            <div className="nc-newsletter">
              <h3>Morning Briefing</h3>
              <p>The top stories that matter, before 7 a.m. — in your inbox, every weekday.</p>
              <input type="email" placeholder="your@email.com" />
              <button>Subscribe — it's free</button>
            </div>

            {/* Markets */}
            <div style={{ marginBottom: '32px' }}>
              <div className="nc-section-head" style={{ marginTop: 0, marginBottom: '12px' }}>
                <h2 style={{ fontSize: '17px' }}>Markets</h2>
                <div className="nc-section-line"></div>
                <span className="nc-section-tag" style={{ color: '#1e8449' }}>● Live</span>
              </div>
              {MARKETS.map(m => (
                <div key={m.name} className="nc-market-row">
                  <span className="nc-market-name">{m.name}</span>
                  <span className={`nc-market-val ${m.up ? 'nc-up' : 'nc-dn'}`}>{m.val} {m.change}</span>
                </div>
              ))}
            </div>

            {/* Most Read */}
            <div className="nc-section-head" style={{ marginTop: 0, marginBottom: 0 }}>
              <h2 style={{ fontSize: '17px' }}>Most Read</h2>
              <div className="nc-section-line"></div>
            </div>
            <ul className="nc-most-read-list">
              {articles.slice(0, 5).map((article, i) => (
                <li key={article.url} onClick={() => window.open(article.url, '_blank')}>
                  <span className="nc-read-num">{i + 1}</span>
                  <p className="nc-read-title">{article.title}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="nc-footer">
        <div className="nc-container">
          <div className="nc-footer-grid">
            <div className="nc-footer-brand">
              <a href="/" className="nc-logo" style={{ color: '#fff', textDecoration: 'none' }}>News<span>Chimp</span></a>
              <p>Independent journalism you can trust. Award-winning coverage of world affairs, politics, culture, science, and business — without fear or favour.</p>
            </div>
            <div className="nc-footer-col">
              <h4>Sections</h4>
              {['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'].map(s => (
                <a key={s} href={`/${s.toLowerCase()}`}>{s}</a>
              ))}
            </div>
            <div className="nc-footer-col">
              <h4>Company</h4>
              {['About Us', 'Careers', 'Advertise', 'Press Office', 'Ethics Policy'].map(s => (
                <a key={s} href="/">{s}</a>
              ))}
            </div>
            <div className="nc-footer-col">
              <h4>Services</h4>
              {['Subscribe', 'Apps', 'Newsletters', 'Podcasts', 'Archive'].map(s => (
                <a key={s} href="/">{s}</a>
              ))}
            </div>
          </div>
          <div className="nc-footer-bottom">
            <span>© {new Date().getFullYear()} NewsChimp. All rights reserved.</span>
            <div>
              {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map(s => (
                <a key={s} href="/">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

News.defaultProps = { country: 'us', pageSize: 4, category: 'general' }
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News

