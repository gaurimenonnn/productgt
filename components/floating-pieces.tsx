"use client"

import { useEffect, useRef } from "react"

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

// Keep pieces below the navbar and above the section boundary
const TOP_PAD = 82   // approx navbar height in px

const BOUNCE   = 0.40   // energy kept on wall hit — soft landings
const MAX_SPD  = 14     // px/frame cap
const THROW    = 0.28   // mouse-swipe velocity transfer
const HOVER_F  = 160    // push force magnitude when mouse is on piece
const SCROLL_K = 0.08   // scroll-delta → upward velocity multiplier

export function FloatingPieces() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const sizeScale = isMobile ? 0.55 : 1

    let W = container.offsetWidth
    let H = container.offsetHeight

    // cx/cy = piece center in px, vx/vy = velocity, rot = degrees, rotV = deg/frame
    const state = CONFIGS.map(cfg => ({
      cx:   cfg.startX * W,
      cy:   cfg.startY * H,
      vx:   0,
      vy:   0,
      rot:  cfg.initialRotation,
      rotV: 0,
    }))

    // Position elements correctly before first paint, then fade in
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
      // Decay scroll impulse slowly so the drift feels gradual
      scrollVel *= 0.88

      CONFIGS.forEach((cfg, i) => {
        const el = elRefs.current[i]
        if (!el) return
        const s = state[i]
        const half = cfg.size * sizeScale / 2

        // ── Scroll inertia: scroll down → float up ─────────────────
        s.vy -= scrollVel / cfg.mass

        // ── Mouse: only when cursor is inside this piece's box ──────
        const overX = mouse.x >= s.cx - half && mouse.x <= s.cx + half
        const overY = mouse.y >= s.cy - half && mouse.y <= s.cy + half

        if (overX && overY) {
          // Direction from mouse to piece center
          const dx   = s.cx - mouse.x
          const dy   = s.cy - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1

          // Push force — stronger when mouse is near center
          const proximity = 1 - dist / (half * 1.5)
          const force = (HOVER_F * Math.max(0, proximity)) / cfg.mass * 0.016
          s.vx += (dx / dist) * force
          s.vy += (dy / dist) * force

          // Swipe/throw: transfer mouse delta velocity to piece
          s.vx += (mouse.dx * THROW) / cfg.mass
          s.vy += (mouse.dy * THROW) / cfg.mass

          // Spin from swipe direction
          const tangential = mouse.dx * (dy / dist) - mouse.dy * (dx / dist)
          s.rotV += tangential * 0.014 / cfg.mass
        }

        // ── Per-piece friction ──────────────────────────────────────
        s.vx   *= cfg.friction
        s.vy   *= cfg.friction
        s.rotV *= cfg.friction

        // ── Speed cap ──────────────────────────────────────────────
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
        if (spd > MAX_SPD) { s.vx = s.vx / spd * MAX_SPD; s.vy = s.vy / spd * MAX_SPD }

        // ── Integrate ──────────────────────────────────────────────
        s.cx  += s.vx
        s.cy  += s.vy
        s.rot += s.rotV

        // ── Wall bounce (center stays half-size away from each edge) ─
        if (s.cx < half) {
          s.cx = half; s.vx = Math.abs(s.vx) * BOUNCE; s.rotV *= -0.5
        } else if (s.cx > W - half) {
          s.cx = W - half; s.vx = -Math.abs(s.vx) * BOUNCE; s.rotV *= -0.5
        }
        if (s.cy < TOP_PAD + half) {
          s.cy = TOP_PAD + half; s.vy = Math.abs(s.vy) * BOUNCE
        } else if (s.cy > H - half) {
          s.cy = H - half; s.vy = -Math.abs(s.vy) * BOUNCE
        }

        // ── DOM: top-left = center − half ──────────────────────────
        el.style.transform = `translate(${s.cx - half}px, ${s.cy - half}px) rotate(${s.rot}deg)`
      })

      rafId = requestAnimationFrame(tick)
    }

    // Remove CSS transition after fade-in so it doesn't fight the RAF loop
    const fadeTimer = setTimeout(() => {
      CONFIGS.forEach((_, i) => {
        const el = elRefs.current[i]
        if (el) el.style.transition = "none"
      })
    }, 600)

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("scroll",    onScroll,    { passive: true })
    window.addEventListener("resize",    onResize,    { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      clearTimeout(fadeTimer)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("resize",    onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

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
            opacity:    0,           // physics engine sets this on first frame
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
