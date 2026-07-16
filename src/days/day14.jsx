import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day14.css'

export default function Day14() {
  const navigate = useNavigate()
  return (
    <div className="day-page day14-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['💌','💜','💝','🌸','✨'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 14 of 19</div>
        <span className="day-emoji">💌</span>
        <h1 className="day-title">A Letter to You</h1>
        <p className="day-message">If I wrote you a letter every day, I'd never run out of beautiful things to say. 💌</p>
        <div className="day-card">
          <p>Dear Pattu, you are <span className="highlight">my favorite story</span> — the one I want to keep reading forever. With all the love in the universe 💜</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
