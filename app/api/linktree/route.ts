import { NextResponse } from "next/server"

export async function GET() {
  const res = await fetch("https://linktr.ee/productgt", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    next: { revalidate: 60 },
  })

  const html = await res.text()

  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/)
  if (!match) {
    return NextResponse.json({ links: [] })
  }

  const data = JSON.parse(match[1])
  const pageProps = data?.props?.pageProps

  const rawLinks: Array<Record<string, unknown>> = pageProps?.links ?? []

  const links = rawLinks
    .filter((l) => {
      if (!l.url || !l.title || l.type === "HEADER") return false
      const url = l.url as string
      const title = (l.title as string).toLowerCase()
      // Omit links pointing back to this website or titled "our website"
      if (title.includes("our website") || title.includes("website")) return false
      if (url.includes("productatgt") || url.includes("productgt.com")) return false
      return true
    })
    .map((l) => ({
      url: l.url as string,
      title: l.title as string,
      thumbnail: (l.thumbnail as Record<string, unknown> | null)?.url ?? null,
    }))

  return NextResponse.json({ links })
}
