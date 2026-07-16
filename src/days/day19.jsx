import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day19.css'

export default function Day19() {
  const navigate = useNavigate()
  return (
    <div className="day-page day19-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🎉','🎊','💜','✨','🌟','🎂','💫','🌈','💝','🎀'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 19 of 19 🎊 The Grand Finale!</div>
        <span className="day-emoji">🎉</span>
        <h1 className="day-title">Happy Birthday, Pattu! 🎂</h1>
        <p className="day-message">19 days. 19 reasons. But honestly? There are infinite reasons why you are the most wonderful person in this universe. 🌟</p>
        <div className="day-card">
          <p>Today is YOUR day, Pattu. The universe literally <span className="highlight">rearranged itself</span> to create someone as magical as you. May this birthday be the beginning of your most beautiful chapter yet. 💜✨🎂</p>
        </div>
        <div className="day-card" style={{ marginTop: '12px' }}>
          <p>🌟 You are loved. You are cherished. You are <span className="highlight">absolutely irreplaceable</span>. Happy Birthday! 🎉🎊💜</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
