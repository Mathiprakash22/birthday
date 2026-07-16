import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day9.css'

export default function Day9() {
  const navigate = useNavigate()
  return (
    <div className="day-page day9-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🌈','💜','🌟','✨','🦋'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 9 of 19</div>
        <span className="day-emoji">🌈</span>
        <h1 className="day-title">Rainbow After the Rain</h1>
        <p className="day-message">After every storm, you show up like a rainbow — full of color, full of hope. 🌈</p>
        <div className="day-card">
          <p>You remind everyone that <span className="highlight">beauty follows every struggle</span>. Your resilience is one of the most beautiful things about you, Pattu 💜</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
