import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day7.css'

export default function Day7() {
  const navigate = useNavigate()
  return (
    <div className="day-page day7-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🎀','💜','🎁','✨','💝'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 7 of 19</div>
        <span className="day-emoji">🎀</span>
        <h1 className="day-title">Wrapped in Love</h1>
        <p className="day-message">You are the most precious gift this universe ever gave — wrapped in kindness and tied with love. 🎀</p>
        <div className="day-card">
          <p>No ribbon, no box could ever contain how <span className="highlight">wonderfully special</span> you are. You're a gift that keeps giving, Pattu 💝</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
