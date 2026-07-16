import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day13.css'

export default function Day13() {
  const navigate = useNavigate()
  return (
    <div className="day-page day13-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🎠','🎡','💜','✨','🌟'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 13 of 19</div>
        <span className="day-emoji">🎠</span>
        <h1 className="day-title">Life's a Carousel</h1>
        <p className="day-message">Life spins round and round — and every spin is more fun when you're on it. 🎠</p>
        <div className="day-card">
          <p>Your laughter is the <span className="highlight">music of the carousel</span>. It makes everyone want to jump on and ride along with you, Pattu 🎡</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
