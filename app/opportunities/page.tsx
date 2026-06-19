"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { Users, GraduationCap, Building2, Briefcase, Instagram } from "lucide-react"

const opportunities = [
  {
    icon: Users,
    title: "Networking Events",
    description:
      "Connect with product managers from leading tech companies at our mixers, coffee chats, and networking nights. Build relationships that extend well beyond campus.",
    details: [
      "Quarterly networking mixers with Atlanta tech professionals",
      "One-on-one coffee chats with practicing PMs",
      "Cross-club networking with GT design and engineering orgs",
    ],
  },
  {
    icon: GraduationCap,
    title: "Alumni Panels",
    description:
      "Hear firsthand from ProductGT alumni who have launched successful careers in product management at companies of all sizes.",
    details: [
      "Semester alumni panel with diverse career paths",
      "Mentorship matching with GT product alumni",
      "Resume and portfolio review sessions",
    ],
  },
  {
    icon: Building2,
    title: "Industry Connections",
    description:
      "Gain direct access to hiring managers and recruiters from companies actively seeking product talent from Georgia Tech.",
    details: [
      "Sponsored info sessions with partner companies",
      "Exclusive job and internship postings",
      "Mock interview practice with industry PMs",
    ],
  },
  {
    icon: Briefcase,
    title: "Recruiting Opportunities",
    description:
      "ProductGT members get a head start on recruiting with tailored prep, insider knowledge, and a community that supports your job search.",
    details: [
      "PM interview prep workshops and study groups",
      "Access to our curated PM recruiting resource library",
      "Referral network across 50+ companies",
    ],
  },
]

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll direction="up">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
              Opportunities
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              ProductGT opens doors to the product world through networking,
              mentorship, and recruiting support that accelerates your career.
            </p>
            <Link
              href="https://www.instagram.com/product.gt/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2)" }}
            >
              <Instagram className="h-4 w-4" />
              Follow us on Instagram
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {opportunities.map((opp, index) => (
              <AnimateOnScroll key={opp.title} direction="up" delay={index * 120}>
                <div className="group h-full rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(62,95,168,0.08)] hover:-translate-y-1">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <opp.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-card-foreground">
                    {opp.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {opp.description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {opp.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
