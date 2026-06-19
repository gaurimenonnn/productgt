"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

const teamMembers = [
  {
    name: "Deborah Zhang",
    role: "Co-President",
    major: "ITM \u2013 Business Administration",
    image: "/deborah.png",
    linkedin: "https://www.linkedin.com/in/deborahmzhang/",
  },
  {
    name: "Gauri Menon",
    role: "Co-President",
    major: "Computer Science",
    image: "/gauri.PNG",
    linkedin: "https://www.linkedin.com/in/gaurimenonnn/",
  },
  {
    name: "Riddhi Goenka",
    role: "Vice President",
    major: "ITM \u2013 Business Administration",
    image: "/riddhiheadshot.jpeg",
    linkedin: "https://www.linkedin.com/in/riddhigoenka/",
  },
  {
    name: "Claire Lee",
    role: "Vice President",
    major: "Computer Science",
    image: "/claireshot.png",
    linkedin: "https://www.linkedin.com/in/clxire-lee/",
  },
  {
    name: "Michelle Rhee",
    role: "Director of Projects",
    major: "Business Administration",
    image: "/michelle.jpeg",
    linkedin: "https://www.linkedin.com/in/themichellerhee/",
  },
  {
    name: "David Stewart",
    role: "Director of Events",
    major: "Industrial Engineering",
    image: "/David.jpeg",
    linkedin: "https://www.linkedin.com/in/david-y-stewart/",
  },
  {
    name: "Dhriti Jengiti",
    role: "Director of Marketing",
    major: "Computer Science",
    image: "/Dhriti.jpeg",
    linkedin: "https://www.linkedin.com/in/dhriti-jengiti/",
  },
  {
    name: "Gautam Reddy",
    role: "Director of Finance",
    major: "Industrial Engineering",
    image: "/Gautam.jpeg",
    linkedin: "https://www.linkedin.com/in/gautamreddy20/",
  },
]

function TeamCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-white/40 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/15 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25),0_0_32px_rgba(255,255,255,0.08)]">
      {member.image ? (
        <Image
          src={member.image}
          alt={member.name}
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-2 ring-white/20 transition-all duration-300 group-hover:ring-white/40 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        />
      ) : (
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-2 ring-white/20 transition-colors duration-300 group-hover:bg-white/25">
          {member.name.split(" ").map((n) => n[0]).join("")}
        </div>
      )}
      <div className="mt-2 flex flex-1 flex-col">
        <h3 className="font-serif text-base font-semibold text-white md:text-lg" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
          {member.name}
        </h3>
        <p
          className="mt-0.5 text-sm font-semibold text-[#ffeda3]"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
        >
          {member.role}
        </p>
        <p
          className="mt-1 text-sm text-white/75"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
        >
          {member.major}
        </p>
        {member.linkedin && (
          <div className="mt-4 flex justify-center">
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:border-white/45 hover:scale-105"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.15)" }}
            >
              <Linkedin className="h-3.5 w-3.5 shrink-0" />
              Connect on LinkedIn
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export function Team() {
  return (
    <section id="team" className="relative border-t border-white/15 px-4 md:px-6 lg:px-8 py-24 md:py-32 overflow-hidden">
      {/* Puzzle accents */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece2.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute -left-8 top-20 w-36 opacity-15 rotate-[12deg]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/piece5.png" alt="" aria-hidden="true" draggable={false} className="pointer-events-none select-none absolute right-0 bottom-16 w-32 opacity-20 -rotate-[22deg]" />
      <div className="mx-auto max-w-6xl">
        <AnimateOnScroll direction="up" className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-widest text-[#ffeda3] uppercase">
            Leadership
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Meet the Team
          </h2>
        </AnimateOnScroll>

        <div className="mt-8 flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.slice(0, 4).map((member, index) => (
              <AnimateOnScroll key={member.name} direction="up" delay={index * 100}>
                <div className="w-[260px] min-w-[260px]">
                  <TeamCard member={member} />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.slice(4).map((member, index) => (
              <AnimateOnScroll key={member.name} direction="up" delay={index * 100}>
                <div className="w-[260px] min-w-[260px]">
                  <TeamCard member={member} />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
