import React from 'react'
import { useNavigate } from 'react-router-dom'
import './dashboard.css'

const days = [
  { day: 1, emoji: '🦋 ', caption: 'Day 1' },
  { day: 2, emoji: '💜', caption: 'Day 2' },
  { day: 3, emoji: '🌙', caption: 'Day 3' },
  { day: 4, emoji: '🦋', caption: 'Day 4' },
  { day: 5, emoji: '🌸', caption: 'Day 5' },
  { day: 6, emoji: '✨', caption: 'Day 6' },
  { day: 7, emoji: '🎀', caption: 'Day 7' },
  { day: 8, emoji: '💫', caption: 'Day 8' },
  { day: 9, emoji: '🌈', caption: 'Day 9' },
  { day: 10, emoji: '🎂', caption: 'Day 10' },
  { day: 11, emoji: '💝', caption: 'Day 11' },
  { day: 12, emoji: '🌺', caption: 'Day 12' },
  { day: 13, emoji: '🎠', caption: 'Day 13' },
  { day: 14, emoji: '💌', caption: 'Day 14' },
  { day: 15, emoji: '🌠', caption: 'Day 15' },
  { day: 16, emoji: '🎶', caption: 'Day 16' },
  { day: 17, emoji: '🍰', caption: 'Day 17' },
  { day: 18, emoji: '🌻', caption: 'Day 18' },
  { day: 19, emoji: '🎉', caption: 'Day 19' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="dashboard">
      <div className="stars" aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <span key={i} className="star" style={{ '--i': i }} />
        ))}
      </div>

      <header className="dashboard-header">
        <div className="logo-badge">🎂</div>
        <h1 className="title">Pattuvin பிறந்தநாள் பரிசு</h1>
        <p className="subtitle">✨ 19 Days of Magic & Love ✨</p>
      </header>

      <div className="grid">
        {days.map(({ day, emoji, caption }) => (
          <div
            key={day}
            className="card"
            onClick={() => navigate(`/day/${day}`)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(`/day/${day}`)}
          >
            <div className="card-glow" />
            <div className="card-emoji">{emoji}</div>
            <div className="card-number">Day {day}</div>
            <div className="card-caption">{caption}</div>
            <div className="card-play">▶</div>
          </div>
        ))}
      </div>
    </div>
  )
}
