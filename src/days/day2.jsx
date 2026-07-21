import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './day2.css'

// ─── Section 1 Data ───────────────────────────────────────────────────────────
const DOCUMENTS = [
  { id: 'birth',   label: 'Birth Certificate', icon: '📜' },
  { id: 'school',  label: 'School ID',          icon: '🪪' },
  { id: 'tenth',   label: '10th Marksheet',     icon: '📋' },
  { id: 'twelfth', label: '12th Marksheet',     icon: '📋' },
]
const DOC_POSITIONS = [
  { left: '12%', top: '18%' },
  { left: '62%', top: '10%' },
  { left: '30%', top: '38%' },
  { left: '70%', top: '42%' },
]

// ─── Section 2 Data ───────────────────────────────────────────────────────────
const BOOKS = [
  { id: 'b1', color: '#7c3aed', spine: '📘', front: 'People say books change lives.', back: 'Mine introduced me to the boy who would.' },
  { id: 'b2', color: '#0e7490', spine: '📗', front: 'Libraries are built to keep stories.', back: 'Ours simply decided to begin there.' },
  { id: 'b3', color: '#b45309', spine: '📙', front: 'I came looking for a classroom.', back: 'Life quietly handed me a reason to smile instead.' },
  { id: 'b4', color: '#be185d', spine: '📕', front: 'If every book has a favourite chapter', back: 'Mine started the moment you walked in.' },
]
const HIDDEN_BOOK = {
  id: 'hidden', color: '#d97706', spine: '✨',
  front: "This wasn't my favourite book",
  back: 'but it became my favourite beginning.',
}

// ─── Section 3 Data ───────────────────────────────────────────────────────────
const WIN_LINES = [
  'The whole campus was moving...',
  'but somehow...',
  'my heart paused beside one person.',
]

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3, dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1, alpha: Math.random() * 0.6 + 0.2,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192,132,252,${p.alpha})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="d2-particle-canvas" aria-hidden="true" />
}

// ─── Dust Canvas ──────────────────────────────────────────────────────────────
function DustCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const dust = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2, dx: (Math.random() - 0.5) * 0.18,
      dy: -Math.random() * 0.22 - 0.04, alpha: Math.random() * 0.5 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dust.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(251,191,36,${p.alpha})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="d2-dust-canvas" aria-hidden="true" />
}

// ─── Fog Canvas (Section 3) ───────────────────────────────────────────────────
function FogCanvas({ onWipeComplete }) {
  const canvasRef = useRef(null)
  const wipedRef = useRef(false)
  const completeRef = useRef(onWipeComplete)
  completeRef.current = onWipeComplete

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // redraw fog after resize
      ctx.fillStyle = 'rgba(180,200,220,0.82)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // initial fog fill
    ctx.fillStyle = 'rgba(180,200,220,0.82)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let totalWiped = 0
    const totalPixels = canvas.width * canvas.height

    const wipe = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      const r = Math.min(canvas.width, canvas.height) * 0.045
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, 'rgba(0,0,0,1)')
      grad.addColorStop(0.6, 'rgba(0,0,0,0.8)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalCompositeOperation = 'source-over'

      if (!wipedRef.current) {
        totalWiped += Math.PI * r * r * 0.4
        if (totalWiped / totalPixels > 0.72) {
          wipedRef.current = true
          completeRef.current?.()
        }
      }
    }

    // pointer events
    let dragging = false
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onDown = (e) => { dragging = true; const p = getPos(e); wipe(p.x, p.y) }
    const onMove = (e) => { if (!dragging) return; const p = getPos(e); wipe(p.x, p.y) }
    const onUp = () => { dragging = false }

    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', onDown, { passive: true })
    canvas.addEventListener('touchmove', onMove, { passive: true })
    canvas.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove', onMove)
      canvas.removeEventListener('touchend', onUp)
    }
  }, [])

  return <canvas ref={canvasRef} className="d2-fog-canvas" aria-label="Wipe the fog to reveal the view" />
}

// ─── Light Ripple Canvas (Section 3) ─────────────────────────────────────────
function RippleCanvas() {
  const canvasRef = useRef(null)
  const ripplesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const addRipple = (x, y) => {
      ripplesRef.current.push({ x, y, r: 0, alpha: 0.5 })
    }

    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX
      const y = e.touches ? e.touches[0].clientY : e.clientY
      if (Math.random() > 0.7) addRipple(x, y)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0.01)
      ripplesRef.current.forEach(r => {
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(251,191,36,${r.alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        r.r += 2.5
        r.alpha *= 0.93
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="d2-ripple-canvas" aria-hidden="true" />
}

// ─── Floating Doc ─────────────────────────────────────────────────────────────
function FloatingDoc({ doc, pos, visible, isAdmission, scrolled }) {
  if (!visible) return null
  const centered = isAdmission && scrolled
  return (
    <div
      className={`d2-doc ${isAdmission ? 'd2-doc--admission' : ''} ${scrolled && !isAdmission ? 'd2-doc--gone' : ''} ${centered ? 'd2-doc--centered' : ''}`}
      style={centered ? {} : { left: pos.left, top: pos.top }}
      aria-hidden="true"
    >
      <span className="d2-doc-icon">{doc.icon}</span>
      <span className="d2-doc-label">{doc.label}</span>
      {isAdmission && <div className="d2-doc-glow" />}
    </div>
  )
}

// ─── Book ─────────────────────────────────────────────────────────────────────
function Book({ book, index, onOpen }) {
  const [flipped, setFlipped] = useState(false)
  const handle = () => { if (flipped) return; setFlipped(true); onOpen(book.id) }
  return (
    <div
      className={`d2-book ${flipped ? 'd2-book--open' : ''}`}
      style={{ '--book-color': book.color, '--bi': index }}
      onClick={handle} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handle()}
      aria-label={`Open book: ${book.front}`}
    >
      <div className="d2-book-inner">
        <div className="d2-book-front">
          <span className="d2-book-spine">{book.spine}</span>
          <p className="d2-book-front-text">{book.front}</p>
          <span className="d2-book-tap">tap to open</span>
        </div>
        <div className="d2-book-back">
          <p className="d2-book-back-text">{book.back}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Section 4: Computer Lab ─────────────────────────────────────────────────
function CompLabSection({ formFields, statusStage, showLabQuote, labQuoteVisible }) {
  return (
    <div className="d2-lab" aria-label="Computer lab">
      <div className="d2-lab-scanlines" aria-hidden="true" />
      <div className="d2-lab-content">
        <div className="d2-monitor" aria-hidden="true">
          <div className="d2-monitor-screen">
            <p className="d2-monitor-title">🖥️ Student Registration Form</p>
            <div className="d2-form">
              {[['Name', formFields.name], ['Department', formFields.dept], ['Phone', formFields.phone]].map(([label, val]) => (
                <div className="d2-form-row" key={label}>
                  <span className="d2-form-label">{label}</span>
                  <span className="d2-form-val">{val}<span className="d2-cursor">|</span></span>
                </div>
              ))}
              <div className="d2-form-row">
                <span className="d2-form-label">Relationship Status</span>
                <span className={`d2-form-val ${statusStage === 1 ? 'd2-form-val--final' : ''}`}>
                  {formFields.status}<span className="d2-cursor">|</span>
                </span>
              </div>
            </div>
          </div>
          <div className="d2-monitor-base" />
        </div>
        {showLabQuote && (
          <p className={`d2-lab-quote ${labQuoteVisible ? 'd2-lab-quote--visible' : ''}`}>
            Somewhere in that lab, I became your favourite notification.
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Section 5: Two Chairs ────────────────────────────────────────────────────
function ChairsSection({ chairSlid, threadDrawn, chairLines, showFinalNav, onChairClick, onNav }) {
  const LINES = [
    'Every seat in that room was just a seat.',
    'Except the one beside you.',
    'That one felt like a choice the universe made for me.',
  ]
  return (
    <div className="d2-chairs-scene" aria-label="Two chairs">
      <div className="d2-chairs-blur" aria-hidden="true" />
      <div className="d2-chairs-wrap">
        <div className="d2-chair d2-chair--1" aria-hidden="true">🪑</div>
        <div
          className={`d2-chair d2-chair--2 ${chairSlid ? 'd2-chair--slid' : ''}`}
          onClick={onChairClick}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onChairClick()}
          aria-label="Slide the chair closer"
        >🪑</div>
      </div>
      {!chairSlid && <p className="d2-chairs-hint">✨ Tap the glowing chair</p>}
      {threadDrawn && (
        <svg className="d2-thread" viewBox="0 0 400 60" aria-hidden="true" preserveAspectRatio="none">
          <path d="M0 30 Q100 10 200 30 Q300 50 400 30" stroke="#d97706" strokeWidth="2"
            fill="none" strokeDasharray="600" strokeDashoffset="0"
            className="d2-thread-path" />
        </svg>
      )}
      <div className="d2-chairs-text">
        {LINES.map((line, i) => (
          <p key={i} className={`d2-chairs-line ${chairLines[i] ? 'd2-chairs-line--visible' : ''}`}>{line}</p>
        ))}
      </div>
      {showFinalNav && (
        <div className="d2-nav-wrap">
          <button className="d2-cta d2-cta--gold" onClick={onNav} aria-label="Next day">
            📖 Let’s see what tomorrow remembers
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Day2() {
  const navigate = useNavigate()

  // phases: entry→docs→scroll→quote→open→button→library→window→wintext→butterfly→s3nav→complab→chairs
  const [phase, setPhase] = useState('entry')
  const [started, setStarted] = useState(false)
  const [visibleDocs, setVisibleDocs] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)

  // Section 2
  const [openedBooks, setOpenedBooks] = useState(new Set())
  const [showHidden, setShowHidden] = useState(false)
  const [hiddenFlipped, setHiddenFlipped] = useState(false)
  const [hiddenTextIdx, setHiddenTextIdx] = useState(0)
  const [hiddenTextVisible, setHiddenTextVisible] = useState(false)

  // Section 3
  const [winLineIdx, setWinLineIdx] = useState(0)
  const [winLineVisible, setWinLineVisible] = useState(false)
  const [showButterfly, setShowButterfly] = useState(false)
  const [bfFlying, setBfFlying] = useState(false)
  const [fogWiped, setFogWiped] = useState(false)
  const [showWipeHint, setShowWipeHint] = useState(true)

  // Section 4
  const [formFields, setFormFields] = useState({ name: '', dept: '', phone: '', status: '' })
  const [statusStage, setStatusStage] = useState(0) // 0=typing, 1=glitch, 2=final
  const [showLabQuote, setShowLabQuote] = useState(false)
  const [labQuoteVisible, setLabQuoteVisible] = useState(false)

  // Section 5
  const [chairSlid, setChairSlid] = useState(false)
  const [threadDrawn, setThreadDrawn] = useState(false)
  const [chairLines, setChairLines] = useState([false, false, false])
  const [showFinalNav, setShowFinalNav] = useState(false)

  const timers = useRef([])
  const after = useCallback((ms, fn) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }, [])

  const QUOTES = ['Life writes thousands of documents...', 'But only one quietly rewrites your future.']

  const handleStart = () => {
    setStarted(true); setPhase('docs')
  }

  useEffect(() => {
    if (phase !== 'docs') return
    DOCUMENTS.forEach((_, i) => after(i * 700, () => setVisibleDocs(prev => [...prev, i])))
    after(DOCUMENTS.length * 700 + 1200, () => setPhase('scroll'))
  }, [phase]) // eslint-disable-line

  useEffect(() => {
    if (phase !== 'scroll') return
    after(400, () => setScrolled(true))
    after(1800, () => setPhase('quote'))
  }, [phase]) // eslint-disable-line

  useEffect(() => {
    if (phase !== 'quote') return
    after(300, () => setQuoteVisible(true))
    after(2800, () => { setQuoteVisible(false); after(700, () => { setQuoteIdx(1); after(300, () => setQuoteVisible(true)) }) })
    after(5800, () => setPhase('open'))
  }, [phase]) // eslint-disable-line

  useEffect(() => {
    if (phase !== 'open') return
    after(400, () => setPhase('button'))
  }, [phase]) // eslint-disable-line

  const handleBookOpen = useCallback((id) => {
    setOpenedBooks(prev => {
      const next = new Set([...prev, id])
      if (next.size === BOOKS.length) setTimeout(() => setShowHidden(true), 900)
      return next
    })
  }, [])

  const handleHiddenOpen = () => {
    if (hiddenFlipped) return
    setHiddenFlipped(true)
    after(800, () => setHiddenTextVisible(true))
    after(3400, () => { setHiddenTextVisible(false); after(600, () => { setHiddenTextIdx(1); after(300, () => setHiddenTextVisible(true)) }) })
    after(6800, () => setPhase('window'))
  }

  // ── Section 3: window expand then show fog ──
  useEffect(() => {
    if (phase !== 'window') return
    after(600, () => setShowWipeHint(true))
  }, [phase]) // eslint-disable-line

  // ── Fog wiped → show text lines ──
  const handleFogWiped = useCallback(() => {
    setFogWiped(true)
    setShowWipeHint(false)
    after(400, () => setPhase('wintext'))
  }, []) // eslint-disable-line

  useEffect(() => {
    if (phase !== 'wintext') return
    const showLine = (idx) => {
      setWinLineIdx(idx)
      setWinLineVisible(true)
      after(2200, () => {
        setWinLineVisible(false)
        after(600, () => {
          if (idx < WIN_LINES.length - 1) showLine(idx + 1)
          else after(400, () => setPhase('butterfly'))
        })
      })
    }
    after(300, () => showLine(0))
  }, [phase]) // eslint-disable-line

  // ── Butterfly lands, looks, flies ──
  useEffect(() => {
    if (phase !== 'butterfly') return
    after(400, () => setShowButterfly(true))
    after(2800, () => setBfFlying(true))
    after(4200, () => setPhase('s3nav'))
  }, [phase]) // eslint-disable-line

  // ── Section 4: computer lab auto-type ──
  useEffect(() => {
    if (phase !== 'complab') return
    const intervals = []

    const typeInto = (field, text, speed, cb) => {
      let i = 0
      const t = setInterval(() => {
        i++
        setFormFields(prev => ({ ...prev, [field]: text.slice(0, i) }))
        if (i >= text.length) { clearInterval(t); cb?.() }
      }, speed)
      intervals.push(t)
    }

    const deleteField = (currentWord, cb) => {
      let len = currentWord.length
      const t = setInterval(() => {
        len--
        setFormFields(prev => ({ ...prev, status: currentWord.slice(0, Math.max(0, len)) }))
        if (len <= 0) { clearInterval(t); cb?.() }
      }, 40)
      intervals.push(t)
    }

    const glitchWords = ['Best Friend', 'My Safe Place', 'Home ❤️']

    const runGlitch = (wi) => {
      typeInto('status', glitchWords[wi], 60, () => {
        setTimeout(() => {
          deleteField(glitchWords[wi], () => {
            setTimeout(() => {
              if (wi + 1 < glitchWords.length) {
                runGlitch(wi + 1)
              } else {
                setTimeout(() => {
                  setStatusStage(1)
                  setFormFields(prev => ({ ...prev, status: 'Future: Still being written...' }))
                  setTimeout(() => {
                    setShowLabQuote(true)
                    setTimeout(() => setLabQuoteVisible(true), 400)
                    setTimeout(() => setPhase('chairs'), 3400)
                  }, 1200)
                }, 400)
              }
            }, 300)
          })
        }, 700)
      })
    }

    setTimeout(() => typeInto('name', 'Pattu 🌸', 60, () => {
      setTimeout(() => typeInto('dept', 'Computer Science', 60, () => {
        setTimeout(() => typeInto('phone', '+91 98765 43210', 60, () => {
          setTimeout(() => runGlitch(0), 500)
        }), 600)
      }), 600)
    }), 800)

    return () => intervals.forEach(clearInterval)
  }, [phase]) // eslint-disable-line

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const isLibrary  = phase === 'library'
  const isWindow   = ['window','wintext','butterfly','s3nav'].includes(phase)
  const isCompLab  = ['complab'].includes(phase)
  const isChairs   = ['chairs'].includes(phase)
  const isSection1 = !isLibrary && !isWindow && !isCompLab && !isChairs

  return (
    <div className={`d2-root ${isLibrary ? 'd2-root--library' : ''} ${isWindow ? 'd2-root--window' : ''} ${isCompLab ? 'd2-root--lab' : ''} ${isChairs ? 'd2-root--chairs' : ''}`} role="main">

      {/* ── S1 bg ── */}
      {isSection1 && <ParticleCanvas />}
      {isSection1 && <div className="d2-glow d2-glow--tl" aria-hidden="true" />}
      {isSection1 && <div className="d2-glow d2-glow--br" aria-hidden="true" />}

      {/* ── S2 bg ── */}
      {isLibrary && <DustCanvas />}
      {isLibrary && <div className="d2-sunray" aria-hidden="true" />}
      {isLibrary && <div className="d2-curtain d2-curtain--left" aria-hidden="true" />}
      {isLibrary && <div className="d2-curtain d2-curtain--right" aria-hidden="true" />}
      {isLibrary && <div className="d2-shelf d2-shelf--top" aria-hidden="true" />}
      {isLibrary && <div className="d2-shelf d2-shelf--bottom" aria-hidden="true" />}
      {isLibrary && <div className="d2-lib-vignette" aria-hidden="true" />}

      {/* Badge */}
      <div className="d2-badge" role="banner">Day 2 of 19 · 📖 The First Page</div>

      {/* ══ SECTION 1 ══ */}
      {started && isSection1 && DOCUMENTS.map((doc, i) => (
        <FloatingDoc key={doc.id} doc={doc} pos={DOC_POSITIONS[i]}
          visible={visibleDocs.includes(i)} isAdmission={false} scrolled={scrolled} />
      ))}
      {phase === 'docs' && visibleDocs.length === DOCUMENTS.length && (
        <div className="d2-scroll-hint" aria-hidden="true"><span>↓</span></div>
      )}
      {(phase === 'quote' || phase === 'open' || phase === 'button') && (
        <div className="d2-quote-wrap" aria-live="polite">
          <p className={`d2-quote ${quoteVisible ? 'd2-quote--visible' : ''}`}>{QUOTES[quoteIdx]}</p>
        </div>
      )}

      {phase === 'button' && (
        <button className="d2-cta" onClick={() => setPhase('library')} aria-label="Enter the library">
          📖 Let's read what fate signed...
        </button>
      )}

      {/* ══ SECTION 2 ══ */}
      {isLibrary && (
        <div className="d2-library" aria-label="Library">
          <div className="d2-lib-content">
            <p className="d2-lib-hint" aria-live="polite">
              {openedBooks.size < BOOKS.length
                ? `Open each book... (${openedBooks.size} / ${BOOKS.length})`
                : showHidden ? 'A hidden book appeared ✨' : 'You found them all ✨'}
            </p>
            <div className="d2-books-row">
              {BOOKS.map((book, i) => <Book key={book.id} book={book} index={i} onOpen={handleBookOpen} />)}
            </div>
            {showHidden && (
              <div className="d2-hidden-wrap">
                <p className="d2-hidden-label">A hidden book appears...</p>
                <div
                  className={`d2-book d2-book--hidden ${hiddenFlipped ? 'd2-book--open' : ''}`}
                  style={{ '--book-color': HIDDEN_BOOK.color }}
                  onClick={handleHiddenOpen} role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleHiddenOpen()}
                  aria-label="Open hidden book"
                >
                  <div className="d2-book-inner">
                    <div className="d2-book-front">
                      <span className="d2-book-spine">{HIDDEN_BOOK.spine}</span>
                      <p className="d2-book-front-text">{HIDDEN_BOOK.front}</p>
                      <span className="d2-book-tap">tap to open</span>
                    </div>
                    <div className="d2-book-back">
                      <p className="d2-book-back-text">{HIDDEN_BOOK.back}</p>
                    </div>
                  </div>
                </div>
                {hiddenFlipped && (
                  <div className="d2-hidden-quote-wrap" aria-live="polite">
                    <p className={`d2-hidden-quote ${hiddenTextVisible ? 'd2-hidden-quote--visible' : ''}`}>
                      {hiddenTextIdx === 0 ? HIDDEN_BOOK.front : HIDDEN_BOOK.back}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ SECTION 3 — WINDOW ══ */}
      {isWindow && (
        <div className="d2-window-scene" aria-label="Window scene">

          {/* Outside view: sky, trees, birds, students, particles */}
          <div className="d2-outside" aria-hidden="true">
            <div className="d2-sky" />
            <div className="d2-sun" />
            <div className="d2-tree d2-tree--1" />
            <div className="d2-tree d2-tree--2" />
            <div className="d2-tree d2-tree--3" />
            <div className="d2-bird d2-bird--1">🐦</div>
            <div className="d2-bird d2-bird--2">🐦</div>
            <div className="d2-bird d2-bird--3">🐦</div>
            <div className="d2-student d2-student--1">🚶</div>
            <div className="d2-student d2-student--2">🚶‍♀️</div>
            <div className="d2-student d2-student--3">🚶</div>
            <div className="d2-win-particles" />
          </div>

          {/* Window frame */}
          <div className="d2-win-frame" aria-hidden="true">
            <div className="d2-win-cross-h" />
            <div className="d2-win-cross-v" />
          </div>

          {/* Ripple layer */}
          <RippleCanvas />

          {/* Fog layer */}
          {!fogWiped && <FogCanvas onWipeComplete={handleFogWiped} />}

          {/* Wipe hint */}
          {showWipeHint && !fogWiped && (
            <div className="d2-wipe-hint" aria-live="polite">
              <span>👆</span> Drag to wipe the fog
            </div>
          )}

          {/* Text lines after wipe */}
          {(phase === 'wintext' || phase === 'butterfly' || phase === 's3nav') && (
            <div className="d2-win-text-wrap" aria-live="polite">
              <p className={`d2-win-line ${winLineVisible ? 'd2-win-line--visible' : ''}`}>
                {WIN_LINES[winLineIdx]}
              </p>
            </div>
          )}

          {/* Butterfly */}
          {showButterfly && (
            <div className={`d2-win-butterfly ${bfFlying ? 'd2-win-butterfly--fly' : ''}`} aria-hidden="true">
              🦋
            </div>
          )}
        </div>
      )}

      {/* ── S3 Nav ── */}
      {phase === 's3nav' && (
        <div className="d2-nav-wrap">
          <button className="d2-cta d2-cta--gold" onClick={() => setPhase('complab')} aria-label="Next section">
            💻 Step inside...
          </button>
        </div>
      )}

      {/* ══ SECTION 4 — COMPUTER LAB ══ */}
      {isCompLab && <CompLabSection formFields={formFields} statusStage={statusStage} showLabQuote={showLabQuote} labQuoteVisible={labQuoteVisible} />}

      {/* ══ SECTION 5 — TWO CHAIRS ══ */}
      {isChairs && (
        <ChairsSection
          chairSlid={chairSlid} threadDrawn={threadDrawn}
          chairLines={chairLines} showFinalNav={showFinalNav}
          onChairClick={() => {
            if (chairSlid) return
            setChairSlid(true)
            setTimeout(() => setThreadDrawn(true), 800)
            setTimeout(() => setChairLines([true, false, false]), 1600)
            setTimeout(() => setChairLines([true, true, false]), 3000)
            setTimeout(() => setChairLines([true, true, true]), 4400)
            setTimeout(() => setShowFinalNav(true), 5800)
          }}
          onNav={() => navigate('/')}
        />
      )}

      {/* Entry overlay */}
      {!started && (
        <div className="d2-entry" onClick={handleStart} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleStart()} aria-label="Tap to begin Day 2">
          <div className="d2-entry-content">
            <span className="d2-entry-icon">📖</span>
            <p className="d2-entry-title">Day 2</p>
            <p className="d2-entry-sub">The First Page</p>
            <p className="d2-entry-tap">Tap anywhere to begin</p>
          </div>
        </div>
      )}
    </div>
  )
}
