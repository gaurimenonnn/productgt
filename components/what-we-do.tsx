"use client"

import Link from "next/link"
import { CalendarDays, Briefcase, Users } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const cards = [
  {
    icon: CalendarDays,
    title: "Events & Workshops",
    description:
      "Interactive workshops, speaker events, and hands-on learning experiences designed to sharpen your product skills.",
    href: "/events",
  },
  {
    icon: Briefcase,
    title: "Pro-Bono Projects",
    description:
      "Work alongside real companies each semester on PM challenges, from research to roadmap.",
    href: "/projects",
  },
  {
    icon: Users,
    title: "Networking & Opportunities",
    description:
      "Connect with product managers, alumni, and industry professionals through panels, mixers, and recruiting events.",
    href: "/opportunities",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative border-t border-white/15 px-6 py-24 md:py-32 overflow-hidden">
      {/* Puzzle accents */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece2.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute right-0 top-16 w-28 opacity-15 rotate-[30deg]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece4.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute left-6 bottom-8 w-32 opacity-20 -rotate-[20deg]" />
      <div className="mx-auto max-w-6xl">
        <AnimateOnScroll direction="up" className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-[#ffeda3] uppercase">
            What We Do
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Our Core Pillars
          </h2>
        </AnimateOnScroll>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <AnimateOnScroll key={card.title} direction="up" delay={index * 150}>
              <div className="group h-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 transition-all duration-300 hover:border-white/40 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/15 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2),0_0_32px_rgba(255,255,255,0.08)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 transition-all duration-300 group-hover:bg-white/25 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.2)]">
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  {card.description}
                </p>
                {card.href && (
                  <div className="mt-5">
                    <Link
                      href={card.href}
                      className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/45 hover:scale-105"
                      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.15)" }}
                    >
                      {card.title === "Events & Workshops"
                        ? "Explore Events & Workshops"
                        : card.title === "Pro-Bono Projects"
                          ? "Explore Pro-Bono Projects"
                          : "Explore Opportunities"}
                    </Link>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
