import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day4.css'

export default function Day4() {
  const navigate = useNavigate()
  return (
    <div className="day-page day4-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🦋','💜','🌸','✨','💫'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 4 of 19</div>
        <span className="day-emoji">🦋</span>
        <h1 className="day-title">Free Like a Butterfly</h1>
        <p className="day-message">You transform every room you walk into — just like a butterfly turning the world colorful. 🦋</p>
        <div className="day-card">
          <p>Your spirit is <span className="highlight">wild and free</span>, your heart is gentle and kind. That combination? Absolutely magical, Pattu 🌸</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
