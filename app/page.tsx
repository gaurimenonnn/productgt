import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { WhatWeDo } from "@/components/what-we-do"
import { Sponsors } from "@/components/sponsors"
import { Team } from "@/components/team"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WhatWeDo />
      <Sponsors />
      <Team />
      <Footer />
    </main>
  )
}
