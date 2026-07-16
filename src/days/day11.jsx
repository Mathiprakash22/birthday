import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day11.css'

export default function Day11() {
  const navigate = useNavigate()
  return (
    <div className="day-page day11-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['💝','💜','💌','🌸','✨'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 11 of 19</div>
        <span className="day-emoji">💝</span>
        <h1 className="day-title">Heart Full of You</h1>
        <p className="day-message">Some people fill a room. You fill hearts. Every single one you touch. 💝</p>
        <div className="day-card">
          <p>The way you love, laugh, and care for others is <span className="highlight">genuinely one of a kind</span>. The world is lucky to have your heart in it, Pattu 💌</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
