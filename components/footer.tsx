"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-white/5 backdrop-blur-sm px-6 py-12">
      <AnimateOnScroll direction="up" duration={500}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2.5">
              <Image
                src="/productlogo.png"
                alt="ProductGT logo"
                width={28}
                height={28}
                className="h-7 w-auto"
                style={{ mixBlendMode: "multiply" }}
              />
              <span className="font-serif text-sm font-semibold text-white/90">
                ProductGT
              </span>
            </div>

            <div className="flex items-center gap-4">
              {[
                { href: "https://www.instagram.com/product.gt/", Icon: Instagram, label: "Instagram" },
                { href: "https://www.linkedin.com/company/productgt/", Icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:gatechproductmanagement@gmail.com", Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:border-white/40 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}

              {/* Slack */}
              <Link
                href="https://productgt.slack.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:border-white/40 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                aria-label="Slack"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                </svg>
              </Link>

              {/* GroupMe */}
              <Link
                href="https://groupme.com/join_group/71836797/AJf13HBy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                aria-label="GroupMe"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/groupme_monochrome_large.webp" alt="GroupMe" className="h-4 w-4 object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 md:flex-row">
            <p className="text-xs text-white/50">{"gatechproductmanagement@gmail.com"}</p>
            <p className="text-xs text-white/50">
              {"\u00A9 2026 ProductGT \u2014 Georgia Institute of Technology"}
            </p>
          </div>
        </div>
      </AnimateOnScroll>
    </footer>
  )
}
