import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day15.css'

export default function Day15() {
  const navigate = useNavigate()
  return (
    <div className="day-page day15-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🌠','⭐','💫','✨','🌟'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 15 of 19</div>
        <span className="day-emoji">🌠</span>
        <h1 className="day-title">Wish Upon You</h1>
        <p className="day-message">People wish on shooting stars — but you're the wish that already came true. 🌠</p>
        <div className="day-card">
          <p>Every dream I ever had somehow <span className="highlight">led me to you</span>. You're not just a wish — you're the answer, Pattu ⭐</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
