import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day10.css'

export default function Day10() {
  const navigate = useNavigate()
  return (
    <div className="day-page day10-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🎂','🎉','🎊','💜','✨'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 10 of 19 🎉 Halfway!</div>
        <span className="day-emoji">🎂</span>
        <h1 className="day-title">Halfway to Forever</h1>
        <p className="day-message">10 days in and the celebration is only getting sweeter — just like you! 🎂</p>
        <div className="day-card">
          <p>We're halfway through this birthday universe and I still haven't run out of reasons why <span className="highlight">you are absolutely amazing</span>. Spoiler: I never will, Pattu 🎉</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
