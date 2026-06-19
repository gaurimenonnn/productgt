"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type LinktreeLink = { url: string; title: string; thumbnail: string | null }

function LinktreeLinks() {
  const [links, setLinks] = useState<LinktreeLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/linktree")
      .then((r) => r.json())
      .then((data) => { setLinks(data.links ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-white/8 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!links.length) {
    return <p className="text-white/50 italic">No active links found. Check back soon.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 rounded-xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/18 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <span className="text-sm font-medium text-white">{link.title}</span>
          <ExternalLink className="h-4 w-4 shrink-0 text-white/40 transition-colors duration-200 group-hover:text-white/70" />
        </a>
      ))}
    </div>
  )
}

export default function JoinPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-2xl">
          <AnimateOnScroll direction="up">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
              Join Us
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/65">
              Get involved with Product&nbsp;@&nbsp;GT — whether you want to build products, lead initiatives, or bring your company on board.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Active Applications */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <AnimateOnScroll direction="up" delay={100}>
            <LinktreeLinks />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-2xl">
          <AnimateOnScroll direction="up">
            <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm px-10 py-12 text-center">
              <h2 className="font-serif text-2xl font-bold text-white md:text-3xl mb-4">
                Want to sponsor us?
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Partner with Product&nbsp;@&nbsp;GT to connect with Georgia Tech's brightest product thinkers and builders.
              </p>
              <Link
                href="mailto:gatechproductmanagement@gmail.com?subject=Sponsorship%20Inquiry"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2)" }}
              >
                Get in Touch
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </main>
  )
}
