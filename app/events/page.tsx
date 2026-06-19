import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-10">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll direction="up">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
              Events
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/65">
              From workshops to speaker panels, our events are designed to build
              your product toolkit and connect you with the community.
            </p>
            <Link
              href="https://luma.com/user/productgt"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(0,0,0,0.2)" }}
            >
              View on Luma
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll direction="up" delay={100}>
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <iframe
                src="https://lu.ma/embed/calendar/cal-EUYFL9RIISD7u7i/events?lt=light"
                width="100%"
                height="700"
                frameBorder="0"
                style={{ border: "none" }}
                allowFullScreen
                aria-hidden={false}
                tabIndex={0}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </main>
  )
}
