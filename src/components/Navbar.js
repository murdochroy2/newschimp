import React from 'react'
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

const BREAKING = [
  'G20 Nations Agree on Landmark Climate Debt Framework',
  'Tech Giants Face New EU Antitrust Scrutiny Over AI Partnerships',
  'Fed Holds Rates Steady Amid Mixed Economic Signals',
  'UN Peacekeeping Mission Expanded in West Africa',
  'Scientists Announce Breakthrough in Renewable Energy Storage',
  'Global Markets Rally on Positive Trade Data',
  'WHO Reports Decline in Infectious Disease Outbreaks Globally',
  'Olympic Committee Announces 2034 Winter Games Host City',
]

export const Navbar = () => {
  const location = useLocation()
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <header>
      {/* Breaking Ticker */}
      <div className="nc-ticker">
        <span className="nc-ticker-label">Breaking</span>
        <div className="nc-ticker-overflow">
          <div className="nc-ticker-track">
            {[...BREAKING, ...BREAKING].map((h, i) => <span key={i}>{h}</span>)}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="nc-masthead">
        <div className="nc-masthead-top">
          <span className="nc-meta">{date} · Est. 2023</span>
          <Link to="/" className="nc-logo">News<span>Chimp</span></Link>
          <div className="nc-masthead-actions">
            <button className="nc-btn-search">&#128269; Search</button>
            <button className="nc-btn-subscribe">Subscribe</button>
          </div>
        </div>

        {/* Nav */}
        <nav className="nc-nav">
          {categories.map(cat => (
            <Link
              key={cat.path}
              to={cat.path}
              className={`nc-nav-link${location.pathname === cat.path ? ' active' : ''}`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
export default Navbar