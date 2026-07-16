import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day18.css'

export default function Day18() {
  const navigate = useNavigate()
  return (
    <div className="day-page day18-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🌻','🌸','💜','✨','🌟'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 18 of 19</div>
        <span className="day-emoji">🌻</span>
        <h1 className="day-title">Always Face the Sun</h1>
        <p className="day-message">Like a sunflower, you always turn toward the light — and you become the light for others. 🌻</p>
        <div className="day-card">
          <p>Your positivity and warmth are <span className="highlight">genuinely contagious</span>. You make the people around you want to grow, Pattu 🌸</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
