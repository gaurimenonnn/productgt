"use client"

import Link from "next/link"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const partners: { name: string; logo: string; blendMultiply?: boolean; rounded?: boolean }[] = [
  { name: "Leland",           logo: "/Leland.png",         blendMultiply: true },
  { name: "APM Season",       logo: "/apmSeasonLogo.webp", rounded: true },
  { name: "UPS",              logo: "/UPS.webp" },
  { name: "Google",           logo: "/google-white-logo.png" },
  { name: "Microsoft",        logo: "/Microsoft-logo_rgb_c-wht.png" },
  { name: "Home Depot",       logo: "/Homedepotlogo.jpg" },
  { name: "risk3sixty",       logo: "/risk3sixty-logo-dark-lrg.png" },
  { name: "Georgia-Pacific",  logo: "/Georgia-Pacific_logo.svg.webp" },
  { name: "Steelcase",        logo: "/steelcase.png" },
]

function PartnerLogo({ name, logo, blendMultiply, rounded }: { name: string; logo: string; blendMultiply?: boolean; rounded?: boolean }) {
  return (
    <div className="group relative flex h-28 w-auto shrink-0 items-center justify-center px-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={name}
        className="relative h-24 w-auto max-w-[200px] object-contain opacity-80 transition-all duration-300 group-hover:opacity-100"
        style={{
          ...(blendMultiply ? { mixBlendMode: "multiply" } : {}),
          ...(rounded ? { borderRadius: "8px" } : {}),
        }}
      />
    </div>
  )
}

export function Sponsors() {
  const doubled = [...partners, ...partners]

  return (
    <section id="sponsors" className="relative border-t border-white/15 px-6 py-24 md:py-32 overflow-hidden">
      {/* Puzzle accents */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece1.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute -right-6 top-8 w-32 opacity-15 -rotate-[10deg]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece4.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute left-2 bottom-6 w-28 opacity-15 rotate-[18deg]" />
      <div className="mx-auto max-w-6xl">
        <AnimateOnScroll direction="up" className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-[#ffeda3] uppercase">
            Partners
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Our Project Partners
          </h2>
          <div className="mt-6 flex justify-center">
            <Link
              href="mailto:gatechproductmanagement@gmail.com?subject=Project%20Partner%20Inquiry"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2)" }}
            >
              Become a Project Partner
            </Link>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Marquee — full viewport width, mask fades edges */}
      <div
        className="relative mt-4 overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-0 hover:[animation-play-state:paused]">
          {doubled.map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} name={partner.name} logo={partner.logo} blendMultiply={partner.blendMultiply} rounded={partner.rounded} />
          ))}
        </div>
      </div>
    </section>
  )
}
