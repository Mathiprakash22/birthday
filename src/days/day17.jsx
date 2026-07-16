import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day17.css'

export default function Day17() {
  const navigate = useNavigate()
  return (
    <div className="day-page day17-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🍰','🎂','💜','✨','🎉'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 17 of 19</div>
        <span className="day-emoji">🍰</span>
        <h1 className="day-title">Sweeter Than Cake</h1>
        <p className="day-message">Cake is sweet. Birthdays are sweet. But you? You're on a whole other level. 🍰</p>
        <div className="day-card">
          <p>You make every celebration <span className="highlight">taste better</span> just by being there. Life with you is the sweetest dessert, Pattu 🎂</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
