import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day8.css'

export default function Day8() {
  const navigate = useNavigate()
  return (
    <div className="day-page day8-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['💫','🌟','✨','⭐','💜'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 8 of 19</div>
        <span className="day-emoji">💫</span>
        <h1 className="day-title">Shooting Star Energy</h1>
        <p className="day-message">Make a wish — because you ARE the shooting star everyone else is wishing upon. 💫</p>
        <div className="day-card">
          <p>Your energy is <span className="highlight">electric and rare</span>. You streak across the sky of life leaving trails of wonder everywhere, Pattu ⭐</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
