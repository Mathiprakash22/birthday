import React from 'react'
import { useNavigate } from 'react-router-dom'
import './day5.css'

export default function Day5() {
  const navigate = useNavigate()
  return (
    <div className="day-page day5-page">
      <div className="day-bg-glow top" />
      <div className="day-bg-glow bottom" />
      <div className="sparkles" aria-hidden="true">
        {['🌸','💜','🌺','✨','💝'].map((s, i) => (
          <span key={i} className="sparkle" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="day-content">
        <div className="day-badge">Day 5 of 19</div>
        <span className="day-emoji">🌸</span>
        <h1 className="day-title">Bloom Like a Flower</h1>
        <p className="day-message">You bloom in every season — in joy, in rain, in sunshine, in everything. 🌸</p>
        <div className="day-card">
          <p>Like the prettiest flower in the universe, you <span className="highlight">bring life and color</span> to everything around you. Never stop blooming, Pattu 🌺</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
      </div>
    </div>
  )
}
