import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './day1.css'

// ─── Data ────────────────────────────────────────────────────────────────────
const MEMORIES = [
  { id: 'care',    label: '🦋 Care',         text: 'This butterfly remembers\nThe way you cared about me.' },
  { id: 'calm',    label: '🦋 Calm',         text: 'The way your anger fades for me.' },
  { id: 'future',  label: '🦋 Future',       text: 'How excited you become\nwhen talking about our future.' },
  { id: 'thoughts',label: '🦋 Thoughts',     text: 'The way you think about me\neven in the smallest moments.' },
  { id: 'smile',   label: '🦋 Smile',        text: 'The world probably calls it a smile.\nI call it\nthe place where my bad days disappear.' },
  { id: 'eyes',    label: '🦋 Eyes',         text: 'Do you know why I keep looking into your eyes?\nBecause they always tell me\nwhat your words forget.\nThey melt me\nwithout even trying.' },
  { id: 'safe',    label: '🦋 Safe Place',   text: 'Whenever life becomes loud\nmy heart quietly walks toward you.' },
  { id: 'laugh',   label: '🦋 Laugh',        text: "I don't know what my favorite song is anymore\nbecause your laugh keeps winning." },
  { id: 'dreams',  label: '🦋 Dreams',       text: "One day\nI'll proudly say,\n'I knew him before the world did.'" },
  { id: 'home',    label: '🦋 Home',         text: "I spent my whole life thinking\n'home'\nwas a place\nThen I met you." },
  { id: 'comfort', label: '🦋 Comfort',      text: 'Some people hug with their arms.\nYou somehow hug my soul.' },
  { id: 'name',    label: '🦋 Pattu',    text: 'Your name stopped being just a name\nit became my favorite feeling.\nI like hearing my name after yours.\nIt makes me feel like\nI belong with you.' },
  { id: 'wings',   label: '🦋 Invisible Wings', text: 'I wish you could borrow my eyes\njust for five minutes\nso you could finally see\nthe wings everyone else sees.' },
]

const LAST_BUTTERFLY = {
  id: 'last',
  text: 'Congratulations\n\nYou finally caught the last butterfly.\nUnfortunately\nI\'m still the one\nwho got caught first. ❤️',
}

// Deterministic positions so butterflies don't jump on re-render
const MEMORY_POSITIONS = [
  { top: '12%', left: '8%' },  { top: '8%',  left: '55%' }, { top: '18%', left: '82%' },
  { top: '35%', left: '4%' },  { top: '30%', left: '70%' }, { top: '50%', left: '88%' },
  { top: '55%', left: '12%' }, { top: '65%', left: '50%' }, { top: '72%', left: '78%' },
  { top: '80%', left: '6%' },  { top: '85%', left: '35%' }, { top: '78%', left: '65%' },
  { top: '42%', left: '42%' },
]

// ─── Phases ──────────────────────────────────────────────────────────────────
// intro → chase → reveal → garden → lastChase → wings → finale → nav
const INTRO_LINES = [
  'Pattu...',
  'Before this journey begins...',
  'there\'s something I need you to know.',
]

// ─── Floating bg butterflies ─────────────────────────────────────────────────
function BgButterflies({ count = 30 }) {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 6 + Math.random() * 8,
      delay: Math.random() * 6,
      size: 0.7 + Math.random() * 0.8,
    }))
  )
  return (
    <div className="bg-butterflies" aria-hidden="true">
      {items.current.map(b => (
        <span
          key={b.id}
          className="bg-bf"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            fontSize: `${b.size}rem`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        >🦋</span>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Day1() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('intro')          // intro|chase|reveal|garden|lastChase|wings|finale|nav
  const [introIdx, setIntroIdx] = useState(0)          // which intro line
  const [introVisible, setIntroVisible] = useState(false)
  const [chaseCount, setChaseCount] = useState(0)      // 0-2 escaped
  const [bfPos, setBfPos] = useState({ x: 50, y: 50 })
  const [bfVisible, setBfVisible] = useState(false)
  const [opened, setOpened] = useState(new Set())
  const [modal, setModal] = useState(null)             // memory text
  const [lastEscapes, setLastEscapes] = useState(0)
  const [lastPos, setLastPos] = useState({ x: 50, y: 50 })
  const [started, setStarted] = useState(false)
  const timerRef = useRef(null)


  // ── helpers ──
  const after = (ms, fn) => { timerRef.current = setTimeout(fn, ms); return timerRef.current }

  const randomBfPos = () => ({
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 70,
  })

  // ── intro sequence ──
  useEffect(() => {
    if (phase !== 'intro') return
    after(800, () => setIntroVisible(true))
  }, [phase]) // eslint-disable-line

  const advanceIntro = useCallback(() => {
    setIntroVisible(false)
    after(700, () => {
      if (introIdx < INTRO_LINES.length - 1) {
        setIntroIdx(i => i + 1)
        after(300, () => setIntroVisible(true))
      } else {
        // transition to chase
        after(400, () => {
          setPhase('chase')
          setBfPos(randomBfPos())
          after(600, () => setBfVisible(true))
        })
      }
    })
  }, [introIdx])

  // auto-advance intro lines after delay
  useEffect(() => {
    if (phase !== 'intro' || !introVisible) return
    const t = after(2800, advanceIntro)
    return () => clearTimeout(t)
  }, [phase, introVisible, advanceIntro])

  // ── chase logic ──
  const handleChaseClick = () => {
    if (phase !== 'chase') return
    setBfVisible(false)
    after(400, () => {
      const next = chaseCount + 1
      if (next >= 3) {
        // move to reveal
        setPhase('reveal')
      } else {
        setChaseCount(next)
        setBfPos(randomBfPos())
        after(500, () => setBfVisible(true))
      }
    })
  }

  // ── garden logic ──
  const openMemory = (mem) => {
    setModal(mem.text)
    setOpened(prev => new Set([...prev, mem.id]))
  }

  const allOpened = opened.size >= MEMORIES.length

  useEffect(() => {
    if (allOpened && phase === 'garden') {
      after(600, () => {
        setPhase('lastChase')
        setLastPos(randomBfPos())
      })
    }
  }, [allOpened, phase]) // eslint-disable-line

  // ── last butterfly chase ──
  const handleLastClick = () => {
    if (lastEscapes < 3) {
      setLastEscapes(e => e + 1)
      setLastPos(randomBfPos())
    } else {
      setModal(LAST_BUTTERFLY.text)
      after(400, () => setPhase('wings'))
    }
  }

  // ── wings → finale ──
  useEffect(() => {
    if (phase !== 'wings') return
    after(3200, () => setPhase('finale'))
  }, [phase]) // eslint-disable-line

  useEffect(() => {
    if (phase !== 'finale') return
    after(4000, () => setPhase('nav'))
  }, [phase]) // eslint-disable-line

  // ── save butterfly to jar (localStorage) ──
  useEffect(() => {
    if (phase === 'nav') {
      const jar = JSON.parse(localStorage.getItem('bday_jar') || '[]')
      if (!jar.includes(1)) localStorage.setItem('bday_jar', JSON.stringify([...jar, 1]))
    }
  }, [phase])

  // ── cleanup ──
  useEffect(() => () => clearTimeout(timerRef.current), [])

  // ── entry tap ──
  const handleStart = () => {
    setStarted(true)
  }



  // ─── Render helpers ───────────────────────────────────────────────────────

  const renderIntro = () => (
    <div className="d1-scene intro-scene">
      <BgButterflies count={25} />
      <div className={`intro-line ${introVisible ? 'visible' : ''}`}>
        {INTRO_LINES[introIdx]}
      </div>
    </div>
  )

  const renderChase = () => (
    <div className="d1-scene chase-scene">
      <BgButterflies count={15} />
      <p className="chase-hint">Tap the butterfly...</p>
      {bfVisible && (
        <button
          className="chase-bf"
          style={{ left: `${bfPos.x}%`, top: `${bfPos.y}%` }}
          onClick={handleChaseClick}
          aria-label="Catch butterfly"
        >🦋</button>
      )}
    </div>
  )

  const renderReveal = () => (
    <div className="d1-scene reveal-scene">
      <BgButterflies count={8} />
      <div className="reveal-text">
        <p className="reveal-line">You've been trying to catch butterflies</p>
        <p className="reveal-line delay1">without realizing</p>
      </div>
      <div className="photo-wrap">
        <img src="/placeholder.jpg" alt="Pattu" className="pattu-photo" onError={e => { e.target.style.display='none' }} />
        <div className="orbiting-bfs" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="orbit-bf" style={{ '--oi': i }}>🦋</span>
          ))}
        </div>
      </div>
      <p className="reveal-final">You were the butterfly all along.</p>
      <div className="quote-block">
        <p>"A butterfly never gets to admire its own wings."</p>
        <p className="quote-sub">Maybe that's why<br />you don't always see yourself<br />the way I do.</p>
      </div>
      <button className="d1-btn" onClick={() => setPhase('garden')}>Enter the Garden →</button>
    </div>
  )

  const renderGarden = () => (
    <div className="d1-scene garden-scene">
      <div className="garden-photo-wrap">
        <img src="/placeholder.jpg" alt="Pattu" className="pattu-photo-sm" onError={e => { e.target.style.display='none' }} />
      </div>
      <p className="garden-hint">Tap each butterfly to reveal a memory</p>
      {MEMORIES.map((mem, i) => (
        <button
          key={mem.id}
          className={`garden-bf ${opened.has(mem.id) ? 'opened' : ''}`}
          style={MEMORY_POSITIONS[i]}
          onClick={() => openMemory(mem)}
          aria-label={mem.label}
        >
          <span className="garden-bf-emoji">🦋</span>
          <span className="garden-bf-label">{mem.label.replace('🦋 ', '')}</span>
        </button>
      ))}
      <div className="garden-progress">
        {opened.size} / {MEMORIES.length} memories found
      </div>
    </div>
  )

  const renderLastChase = () => (
    <div className="d1-scene chase-scene">
      <BgButterflies count={5} />
      <p className="chase-hint last-hint">One last butterfly remains<br /><span></span></p>
      <button
        className="chase-bf last-bf"
        style={{ left: `${lastPos.x}%`, top: `${lastPos.y}%` }}
        onClick={handleLastClick}
        aria-label="Catch last butterfly"
      >🦋</button>
    </div>
  )

  const renderWings = () => (
    <div className="d1-scene wings-scene">
      <div className="wings-photo-wrap">
        <img src="/placeholder.jpg" alt="Pattu" className="pattu-photo" onError={e => { e.target.style.display='none' }} />
        <div className="angel-wings left-wing" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="wing-bf" style={{ '--wi': i }}>🦋</span>
          ))}
        </div>
        <div className="angel-wings right-wing" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="wing-bf" style={{ '--wi': i }}>🦋</span>
          ))}
        </div>
        <div className="wing-glow" aria-hidden="true" />
      </div>
      <div className="particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="particle" style={{ '--pi': i }}>✨</span>
        ))}
      </div>
    </div>
  )

  const renderFinale = () => (
    <div className="d1-scene finale-scene">
      <div className="finale-text">
        <p>Maybe butterflies never see their own wings...</p>
        <p className="finale-pause">...</p>
        <p>...so I borrowed the angels...</p>
        <p className="finale-pause">...</p>
        <p>...to show you yours.</p>
      </div>
    </div>
  )

  const renderNav = () => (
    <div className="d1-scene nav-scene">
      <BgButterflies count={20} />
      <div className="jar-wrap">
        <span className="jar-emoji">🫙</span>
        <span className="jar-bf">🦋</span>
        <p className="jar-label">1 butterfly collected</p>
      </div>
      <div className="ending-text">
        <p>This is only the first wing.</p>
        {/* <p className="ending-pause">...</p> */}
        <p>There are eighteen more waiting to unfold.</p>
        <p className="days-left">18 Days Remaining</p>
      </div>
      <button className="d1-btn nav-btn" onClick={() => navigate('/')}>
        <span className="nav-bf-icon">🦋</span>
        Come fly with me tomorrow.
      </button>
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Universe</button>
    </div>
  )

  // ─── Modal ────────────────────────────────────────────────────────────────
  const renderModal = () => modal && (
    <div className="modal-overlay" onClick={() => setModal(null)}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <p className="modal-text">{modal}</p>
        <button className="modal-close" onClick={() => setModal(null)}>✕</button>
      </div>
    </div>
  )

  // ─── Scene map ────────────────────────────────────────────────────────────
  const scenes = {
    intro: renderIntro,
    chase: renderChase,
    reveal: renderReveal,
    garden: renderGarden,
    lastChase: renderLastChase,
    wings: renderWings,
    finale: renderFinale,
    nav: renderNav,
  }

  return (
    <div className="day1-root">
      {/* Ambient glow */}
      <div className="d1-glow top" />
      <div className="d1-glow bottom" />

      {/* Day badge */}
      <div className="d1-badge">Day 1 of 19 · 🦋 The Wings You Never See</div>

      {/* Active scene */}
      <div className="scene-wrap" key={phase}>
        {scenes[phase]?.()}
      </div>

      {/* Entry screen */}
      {!started && (
        <div className="entry-overlay" onClick={handleStart}>
          <div className="entry-content">
            <span className="entry-bf">🦋</span>
            <p className="entry-title">Day 1</p>
            <p className="entry-sub">The Wings You Never See</p>
            <p className="entry-tap">Tap anywhere to begin</p>
          </div>
        </div>
      )}

      {/* Modal */}
      {renderModal()}
    </div>
  )
}
