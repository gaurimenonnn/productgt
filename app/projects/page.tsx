"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const projects = [
  {
    name: "HealthTrack Dashboard",
    partner: "HealthTrack Inc.",
    description:
      "Designed and prototyped a patient engagement dashboard to help healthcare providers track wellness metrics and improve patient outcomes.",
    status: "Completed",
  },
  {
    name: "Campus Eats Redesign",
    partner: "GT Dining Services",
    description:
      "Conducted user research and redesigned the mobile ordering experience for on-campus dining, reducing average order time by 40%.",
    status: "Completed",
  },
  {
    name: "GreenRoute Logistics",
    partner: "GreenRoute Startup",
    description:
      "Built a product roadmap and MVP for a sustainable last-mile delivery platform targeting small businesses in the Atlanta metro area.",
    status: "In Progress",
  },
  {
    name: "StudySync Platform",
    partner: "GT Student Government",
    description:
      "Developing a peer study-matching platform that connects students by course, learning style, and availability across campus.",
    status: "In Progress",
  },
  {
    name: "FinLit Mobile App",
    partner: "FinLit Foundation",
    description:
      "Created a financial literacy app aimed at college students, featuring budgeting tools, educational content, and gamified savings challenges.",
    status: "Completed",
  },
  {
    name: "EventPulse Analytics",
    partner: "Atlanta Tech Village",
    description:
      "Building an event analytics tool that helps organizers understand attendee engagement, feedback trends, and ROI for community events.",
    status: "In Progress",
  },
]

function StatusBadge({ status }: { status: string }) {
  if (status === "Completed") {
    return (
      <span className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium border border-white/15 bg-white/8 text-white/45">
        Completed
      </span>
    )
  }
  return (
    <span className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium border border-[#ffeda3]/25 bg-[#ffeda3]/10 text-[#ffeda3]/80">
      In Progress
    </span>
  )
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll direction="up">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
              Projects
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
              Each semester, our project teams partner with real companies to take on
              product management challenges, from user research and discovery through
              roadmapping and recommendations.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Photo banners */}
      <section className="px-6 pb-10">
        <AnimateOnScroll direction="up" className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <Image
                src="/img_5718.jpeg"
                alt="ProductGT x Georgia-Pacific"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-medium text-white/80">ProductGT × Georgia-Pacific (Spring 2026)</p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <Image
                src="/dim_1242.jpeg"
                alt="ProductGT team at Microsoft"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-medium text-white/80">ProductGT × Microsoft (Spring 2026)</p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Upcoming Projects */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll direction="up">
            <h2 className="font-serif text-2xl font-bold text-white md:text-3xl mb-6">Upcoming Projects</h2>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up" delay={100}>
            <p className="text-white/55 text-base italic">Coming soon...</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Past Projects */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll direction="up">
            <h2 className="font-serif text-2xl font-bold text-white md:text-3xl mb-10">Past Projects</h2>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up" delay={100}>
            <div className="flex flex-wrap gap-6 items-center">
              {[
                { name: "Microsoft",       logo: "/Microsoft-logo_rgb_c-wht.png" },
                { name: "Home Depot",      logo: "/Homedepotlogo.jpg" },
                { name: "risk3sixty",      logo: "/risk3sixty-logo-dark-lrg.png" },
                { name: "Georgia-Pacific", logo: "/Georgia-Pacific_logo.svg.webp" },
                { name: "Steelcase",       logo: "/steelcase.png" },
                { name: "Leland",          logo: "/Leland.png",         blendMultiply: true },
                { name: "APM Season",      logo: "/apmSeasonLogo.webp", rounded: true },
              ].map(({ name, logo, blendMultiply, rounded }) => (
                <div
                  key={name}
                  className="group flex h-24 w-44 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-5 transition-all duration-300 hover:border-white/40 hover:bg-white/18 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt={name}
                    className="h-12 w-auto max-w-[130px] object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      ...(blendMultiply ? { mixBlendMode: "multiply" } : {}),
                      ...(rounded ? { borderRadius: "6px" } : {}),
                    }}
                  />
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </main>
  )
}
