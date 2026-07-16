import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day6.css'

export default function Day6() {
  const navigate = useNavigate()
  return (
    <div className="day-page day6-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['✨','💫','🌟','⭐','🌠'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 6 of 19</div>
        <span className="day-emoji">✨</span>
        <h1 className="day-title">You Are the Sparkle</h1>
        <p className="day-message">Not everyone has that sparkle — but you? You were born with it. ✨</p>
        <div className="day-card">
          <p>Every room gets <span className="highlight">10x brighter</span> the moment you walk in. That's not magic — that's just you being you, Pattu 🌟</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
