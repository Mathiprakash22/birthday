import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day2.css'

export default function Day2() {
  const navigate = useNavigate()
  return (
    <div className="day-page day2-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['💜','🦋','💫','🌙','💝'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 2 of 19</div>
        <span className="day-emoji">💜</span>
        <h1 className="day-title">Purple Skies for You</h1>
        <p className="day-message">If the sky could pick a color just for you, it would choose the deepest, warmest purple. 💜</p>
        <div className="day-card">
          <p>You paint every ordinary moment with <span className="highlight">extraordinary colors</span>. The world is more beautiful because you're in it, Pattu 🌙</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
