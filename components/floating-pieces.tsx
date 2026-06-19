"use client"

import { useEffect, useRef, useState } from "react"

interface PieceConfig {
  id: number
  src: string
  size: number
  startX: number    // 0–1, fraction of container width  (piece center)
  startY: number    // 0–1, fraction of container height (piece center)
  initialRotation: number
  mass: number      // heavier = needs more force to move
  friction: number  // per-piece — lighter pieces coast longer
  shadow: string
}

const CONFIGS: PieceConfig[] = [
  { id: 1, src: "/piece1.png", size: 178, startX: 0.10, startY: 0.26, initialRotation: 165, mass: 1.0, friction: 0.991, shadow: "drop-shadow(0 2px 6px rgba(0,0,0,0.14))" },
  { id: 2, src: "/piece2.png", size: 162, startX: 0.83, startY: 0.22, initialRotation:  20, mass: 0.8, friction: 0.988, shadow: "drop-shadow(0 2px 6px rgba(0,0,0,0.14))" },
  { id: 3, src: "/piece3.png", size: 192, startX: 0.08, startY: 0.62, initialRotation:  10, mass: 1.3, friction: 0.994, shadow: "drop-shadow(0 2px 6px rgba(0,0,0,0.14))" },
  { id: 4, src: "/piece4.png", size: 158, startX: 0.87, startY: 0.67, initialRotation: 155, mass: 0.7, friction: 0.986, shadow: "drop-shadow(0 2px 6px rgba(0,0,0,0.14))" },
  { id: 5, src: "/piece5.png", size: 172, startX: 0.48, startY: 0.17, initialRotation: 185, mass: 1.1, friction: 0.990, shadow: "drop-shadow(0 2px 6px rgba(0,0,0,0.14))" },
]

// Initial autonomous velocities for mobile (unique per piece so they don't sync up)
const MOBILE_INIT_V = [
  { vx:  0.6, vy:  0.4, rotV:  0.08 },
  { vx: -0.5, vy:  0.3, rotV: -0.06 },
  { vx:  0.4, vy: -0.5, rotV:  0.05 },
  { vx: -0.7, vy:  0.4, rotV: -0.07 },
  { vx:  0.5, vy: -0.3, rotV:  0.09 },
]

const TOP_PAD   = 82
const BOUNCE    = 0.40
const MAX_SPD   = 14
const THROW     = 0.28
const HOVER_F   = 160
const SCROLL_K  = 0.08
// On mobile, friction is lower so pieces keep drifting without stalling
const MOB_FRICTION = 0.999

export function FloatingPieces() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elRefs = useRef<(HTMLDivElement | null)[]>([])
  const [sizeScale, setSizeScale] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    setSizeScale(mobile ? 0.55 : 1)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let W = container.offsetWidth
    let H = container.offsetHeight

    const state = CONFIGS.map((cfg, i) => ({
      cx:   cfg.startX * W,
      cy:   cfg.startY * H,
      vx:   isMobile ? MOBILE_INIT_V[i].vx : 0,
      vy:   isMobile ? MOBILE_INIT_V[i].vy : 0,
      rot:  cfg.initialRotation,
      rotV: isMobile ? MOBILE_INIT_V[i].rotV : 0,
    }))

    CONFIGS.forEach((cfg, i) => {
      const el = elRefs.current[i]
      if (!el) return
      const half = cfg.size * sizeScale / 2
      el.style.transform = `translate(${cfg.startX * W - half}px, ${cfg.startY * H - half}px) rotate(${cfg.initialRotation}deg)`
      el.style.opacity = "0.88"
      el.style.transition = "opacity 0.5s ease"
    })

    const mouse = { x: -9999, y: -9999, dx: 0, dy: 0 }
    let prevMX = -9999, prevMY = -9999
    let scrollVel = 0
    let lastScrollY = window.scrollY

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      const nx = e.clientX - r.left
      const ny = e.clientY - r.top
      mouse.dx = nx - prevMX
      mouse.dy = ny - prevMY
      prevMX = nx
      prevMY = ny
      mouse.x = nx
      mouse.y = ny
    }

    const onScroll = () => {
      const sy = window.scrollY
      scrollVel += (sy - lastScrollY) * SCROLL_K
      lastScrollY = sy
    }

    const onResize = () => {
      W = container.offsetWidth
      H = container.offsetHeight
    }

    let rafId: number
    const tick = () => {
      scrollVel *= 0.88

      CONFIGS.forEach((cfg, i) => {
        const el = elRefs.current[i]
        if (!el) return
        const s = state[i]
        const half = cfg.size * sizeScale / 2
        const friction = isMobile ? MOB_FRICTION : cfg.friction

        // ── Scroll inertia ──────────────────────────────────────────
        s.vy -= scrollVel / cfg.mass

        if (!isMobile) {
          // ── Mouse interaction (desktop only) ───────────────────────
          const overX = mouse.x >= s.cx - half && mouse.x <= s.cx + half
          const overY = mouse.y >= s.cy - half && mouse.y <= s.cy + half

          if (overX && overY) {
            const dx   = s.cx - mouse.x
            const dy   = s.cy - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const proximity = 1 - dist / (half * 1.5)
            const force = (HOVER_F * Math.max(0, proximity)) / cfg.mass * 0.016
            s.vx += (dx / dist) * force
            s.vy += (dy / dist) * force
            s.vx += (mouse.dx * THROW) / cfg.mass
            s.vy += (mouse.dy * THROW) / cfg.mass
            const tangential = mouse.dx * (dy / dist) - mouse.dy * (dx / dist)
            s.rotV += tangential * 0.014 / cfg.mass
          }
        } else {
          // ── Mobile: nudge pieces that slow down so they never stall ─
          const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
          if (spd < 0.25) {
            s.vx += (Math.random() - 0.5) * 0.4
            s.vy += (Math.random() - 0.5) * 0.4
          }
        }

        // ── Friction ────────────────────────────────────────────────
        s.vx   *= friction
        s.vy   *= friction
        s.rotV *= friction

        // ── Speed cap ───────────────────────────────────────────────
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
        if (spd > MAX_SPD) { s.vx = s.vx / spd * MAX_SPD; s.vy = s.vy / spd * MAX_SPD }

        // ── Integrate ────────────────────────────────────────────────
        s.cx  += s.vx
        s.cy  += s.vy
        s.rot += s.rotV

        // ── Wall bounce ──────────────────────────────────────────────
        if (s.cx < half) {
          s.cx = half; s.vx = Math.abs(s.vx) * (isMobile ? 0.85 : BOUNCE); s.rotV *= -0.5
        } else if (s.cx > W - half) {
          s.cx = W - half; s.vx = -Math.abs(s.vx) * (isMobile ? 0.85 : BOUNCE); s.rotV *= -0.5
        }
        if (s.cy < TOP_PAD + half) {
          s.cy = TOP_PAD + half; s.vy = Math.abs(s.vy) * (isMobile ? 0.85 : BOUNCE)
        } else if (s.cy > H - half) {
          s.cy = H - half; s.vy = -Math.abs(s.vy) * (isMobile ? 0.85 : BOUNCE)
        }

        el.style.transform = `translate(${s.cx - half}px, ${s.cy - half}px) rotate(${s.rot}deg)`
      })

      rafId = requestAnimationFrame(tick)
    }

    const fadeTimer = setTimeout(() => {
      CONFIGS.forEach((_, i) => {
        const el = elRefs.current[i]
        if (el) el.style.transition = "none"
      })
    }, 600)

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true })
    }
    window.addEventListener("scroll",  onScroll,    { passive: true })
    window.addEventListener("resize",  onResize,    { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      clearTimeout(fadeTimer)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("resize",    onResize)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile, sizeScale])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, black 74%, transparent 96%)",
        maskImage:        "linear-gradient(to bottom, black 74%, transparent 96%)",
      }}
    >
      {CONFIGS.map((cfg, i) => (
        <div
          key={cfg.id}
          ref={el => { elRefs.current[i] = el }}
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            width:      cfg.size * sizeScale,
            height:     cfg.size * sizeScale,
            opacity:    0,
            willChange: "transform",
            filter:     cfg.shadow,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cfg.src}
            alt=""
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "contain", userSelect: "none" }}
          />
        </div>
      ))}
    </div>
  )
}
