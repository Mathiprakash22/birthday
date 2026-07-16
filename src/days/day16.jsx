import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day16.css'

export default function Day16() {
  const navigate = useNavigate()
  return (
    <div className="day-page day16-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🎶','🎵','💜','✨','🌟'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 16 of 19</div>
        <span className="day-emoji">🎶</span>
        <h1 className="day-title">You're My Favorite Song</h1>
        <p className="day-message">Some songs you never skip. Some people you never want to lose. You're both. 🎶</p>
        <div className="day-card">
          <p>Your voice, your laugh, your presence — they're all <span className="highlight">music to my soul</span>. I could listen to you forever, Pattu 🎵</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
