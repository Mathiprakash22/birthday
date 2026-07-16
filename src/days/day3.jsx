import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day3.css'

export default function Day3() {
  const navigate = useNavigate()
  return (
    <div className="day-page day3-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🌙','⭐','💫','🌟','✨'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 3 of 19</div>
        <span className="day-emoji">🌙</span>
        <h1 className="day-title">Moonlight & Dreams</h1>
        <p className="day-message">Even the moon stays up late just to watch over you while you sleep. 🌙</p>
        <div className="day-card">
          <p>Your dreams are <span className="highlight">made of stardust</span> and your smile is brighter than any constellation. Sweet dreams, Pattu 💫</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
