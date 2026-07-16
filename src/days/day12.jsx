import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day12.css'

export default function Day12() {
  const navigate = useNavigate()
  return (
    <div className="day-page day12-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🌺','🌸','💜','✨','🦋'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 12 of 19</div>
        <span className="day-emoji">🌺</span>
        <h1 className="day-title">Rare & Beautiful</h1>
        <p className="day-message">Like the rarest flower, you only bloom once — and the world stops to stare. 🌺</p>
        <div className="day-card">
          <p>Your uniqueness isn't just a trait — it's a <span className="highlight">superpower</span>. There's no one like you and there never will be, Pattu 🌸</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
