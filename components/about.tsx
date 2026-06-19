"use client"

import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const embeds = [
  {
    key: "linkedin",
    title: "ProductGT LinkedIn Post",
    src: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7461037674712363008/",
    height: 600,
  },
  {
    key: "instagram-1",
    title: "ProductGT Instagram Post",
    src: "https://www.instagram.com/p/DXpPb9ylvEH/embed/",
    height: 620,
  },
  {
    key: "instagram-2",
    title: "ProductGT Instagram Post 2",
    src: "https://www.instagram.com/p/DU8agwADSux/embed/",
    height: 620,
  },
]

// How each card looks based on its slot relative to active
// slot 0 = front, 1 = one behind, 2 = two behind, -1 = exiting
function cardStyle(slot: number, exitDir: 'left' | 'right' | null): React.CSSProperties {
  if (slot === -1) {
    // exiting card flies off in exit direction
    return {
      transform: `translateX(${exitDir === 'right' ? '55%' : '-55%'}) scale(0.9) rotate(${exitDir === 'right' ? '2deg' : '-2deg'})`,
      opacity: 1,
      zIndex: 10,
      transition: "transform 380ms cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: "none",
    }
  }
  if (slot === 0) {
    return {
      transform: "translateX(0) scale(1)",
      opacity: 1,
      zIndex: 9,
      transition: "transform 380ms cubic-bezier(0.4,0,0.2,1), opacity 280ms ease",
    }
  }
  if (slot === 1) {
    return {
      transform: "translateY(10px) scale(0.96)",
      opacity: 1,
      zIndex: 8,
      transition: "transform 380ms cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: "none",
    }
  }
  if (slot === 2) {
    return {
      transform: "translateY(20px) scale(0.92)",
      opacity: 0.7,
      zIndex: 7,
      transition: "transform 380ms cubic-bezier(0.4,0,0.2,1), opacity 380ms ease",
      pointerEvents: "none",
    }
  }
  // slot > 2: hidden behind
  return { opacity: 0, zIndex: 0, pointerEvents: "none" }
}

export function About() {
  const [idx, setIdx] = useState(0)
  const [leavingIdx, setLeavingIdx] = useState<number | null>(null)
  const [exitDir, setExitDir] = useState<'left' | 'right' | null>(null)
  const [busy, setBusy] = useState(false)

  const navigate = useCallback((dir: 1 | -1) => {
    if (busy) return
    const next = (idx + dir + embeds.length) % embeds.length
    const direction = dir === 1 ? 'right' : 'left'
    setBusy(true)
    setLeavingIdx(idx)
    setExitDir(direction)
    setTimeout(() => {
      setIdx(next)
      setLeavingIdx(null)
      setExitDir(null)
      setBusy(false)
    }, 380)
  }, [idx, busy])

  const activeHeight = embeds[idx].height

  return (
    <section id="about" className="relative px-6 py-24 md:py-32 overflow-hidden">
      {/* Puzzle accents */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece3.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute -left-10 top-12 w-36 opacity-20 rotate-[25deg]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece5.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute right-4 bottom-10 w-32 opacity-15 -rotate-[15deg]" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center">
        <div className="w-full md:w-1/2">
          <AnimateOnScroll direction="up">
            <p className="mb-3 text-sm font-medium tracking-widest text-[#ffeda3] uppercase">
              About Us
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Who We Are
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up" delay={150}>
            <div className="mt-6 space-y-5 text-xl leading-relaxed text-muted-foreground">
              <p>
                Product@GT is Georgia Tech's largest student community for all things
                product, with 400+ passionate, driven students obsessed with the
                world of product management and development.
              </p>
              <p>
                Our mission is to create product-minded thinkers and leaders who are
                well-versed in every aspect of building successful products. Each
                semester, our project teams partner directly with real companies,
                giving members hands-on PM experience that goes far beyond the classroom.
              </p>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll direction="up" delay={200} className="w-full md:w-1/2">
          <div className="relative mx-auto w-full max-w-lg px-12">

            {/* Outer mask wrapper — extends 50px beyond the card stack on each side.
                Cards animating out enter this zone and fade before reaching the text. */}
            <div
              style={{
                position: "relative",
                margin: "0 -75px",
                height: `${activeHeight + 28}px`,
                transition: "height 380ms ease",
                WebkitMaskImage: "linear-gradient(to right, transparent 0px, rgba(0,0,0,0.4) 40px, black 80px, black calc(100% - 80px), rgba(0,0,0,0.4) calc(100% - 40px), transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0px, rgba(0,0,0,0.4) 40px, black 80px, black calc(100% - 80px), rgba(0,0,0,0.4) calc(100% - 40px), transparent 100%)",
              }}
            >
              {/* Inner card stack — offset back to original position with 50px margin */}
              <div style={{ position: "relative", margin: "0 75px", height: "100%" }}>
              {embeds.map((embed, i) => {
                const isLeaving = i === leavingIdx
                let slot: number

                if (isLeaving) {
                  slot = -1
                } else {
                  slot = (i - idx + embeds.length) % embeds.length
                }

                return (
                  <div
                    key={embed.key}
                    className="absolute inset-x-0 top-0 overflow-hidden rounded-2xl border border-white/20 shadow-[0_2px_16px_rgba(0,0,0,0.12)]"
                    style={{
                      height: `${embed.height}px`,
                      ...cardStyle(slot, exitDir),
                    }}
                  >
                    <iframe
                      src={embed.src}
                      allowFullScreen={slot === 0}
                      title={embed.title}
                      scrolling="no"
                      className="w-full h-full"
                      style={{ border: "none", overflow: "hidden" }}
                    />
                  </div>
                )
              })}
              </div>
            </div>

            {/* Left arrow */}
            <button
              onClick={() => navigate(-1)}
              disabled={busy}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/25 hover:scale-110 hover:shadow-[0_0_16px_rgba(255,255,255,0.15)] disabled:opacity-40" style={{ zIndex: 20 }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => navigate(1)}
              disabled={busy}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm text-white transition-all duration-200 hover:bg-white/25 hover:scale-110 hover:shadow-[0_0_16px_rgba(255,255,255,0.15)] disabled:opacity-40" style={{ zIndex: 20 }}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dot indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {embeds.map((_, i) => (
                <button
                  key={i}
                  onClick={() => !busy && navigate(i > idx ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-white/80" : "w-1.5 bg-white/30"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
