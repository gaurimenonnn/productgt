"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Team",     href: "/#team" },
  { label: "Events",   href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Join Us",  href: "/join" },
]

// Maps section IDs → which nav href should be highlighted
const SECTION_NAV: Record<string, string> = {
  about:        "/#about",
  "what-we-do": "/#about",
  sponsors:     "/#about",
  team:         "/#team",
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSectionHref, setActiveSectionHref] = useState("/")
  const pathname = usePathname()

  const updateActive = useCallback(() => {
    if (pathname !== "/") return
    // Walk sections bottom→top; first one whose top is above 45% viewport = active
    const ids = ["team", "sponsors", "what-we-do", "about"]
    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        setActiveSectionHref(SECTION_NAV[id] ?? "/")
        return
      }
    }
    setActiveSectionHref("/")
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 320)
      updateActive()
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [updateActive])

  // Reset active section when navigating away from home
  useEffect(() => {
    if (pathname !== "/") setActiveSectionHref("/")
  }, [pathname])

  const isActive = (href: string) => {
    if (pathname === "/") return href === activeSectionHref
    // Non-home pages: match by pathname
    return href !== "/" && !href.startsWith("/#") && pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    cn(
      "relative text-sm transition-all duration-200 hover:text-white",
      "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#ffeda3] after:transition-all after:duration-300 hover:after:w-full",
      isActive(href) ? "text-white font-medium after:!w-full" : "text-white/65"
    )

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6">
      <div
        className={cn(
          "flex w-full max-w-4xl items-center justify-between rounded-full border px-6 py-3 backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-white/25 bg-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
            : "border-white/15 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/productlogo.png"
            alt="ProductGT logo"
            width={40}
            height={40}
            className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
            style={{ mixBlendMode: "multiply" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-white/80 lg:hidden transition-all duration-200 hover:text-white hover:scale-110"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu — sits below the pill */}
      {open && (
        <div className="absolute top-full mt-2 w-full max-w-4xl rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm transition-all duration-200 hover:text-white hover:pl-1",
                  isActive(link.href) ? "text-white font-medium" : "text-white/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
