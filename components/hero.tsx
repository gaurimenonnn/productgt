"use client"

import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { FloatingPieces } from "@/components/floating-pieces"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-24">
      <FloatingPieces />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16 text-center md:px-10 md:py-24">
        <AnimateOnScroll direction="none" duration={800}>
          <h1 className="mx-auto font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl text-balance whitespace-normal text-center md:whitespace-nowrap">
            Product{" "}
            <span style={{ fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif', fontWeight: 700 }}>@</span>
            <br className="block md:hidden" />
            <span
              className="inline-block bg-clip-text text-transparent [background-size:200%_100%] [animation:gradient-shift_4s_ease_infinite]"
              style={{
                backgroundImage: "linear-gradient(90deg, #ffeda3, #fffef9, #ffeda3, #fffef9)",
              }}
            >
              {"\u00A0"}Georgia Tech
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll direction="up" delay={400} duration={700}>
          <div className="mt-10 flex justify-center">
            <Link
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,255,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2)" }}
            >
              Learn More
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
