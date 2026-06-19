# Product @ GT — Official Website

The official website for **Product@GT**, Georgia Tech's largest student community for product management. Built with Next.js 14 and deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Project Structure

```
app/
├── api/
│   └── linktree/         # Proxy API route for live Linktree link data
├── events/               # Events page with Luma calendar embed
├── join/                 # Join Us page with live application links
├── opportunities/        # Networking & Opportunities page
├── projects/             # Projects page with partner logos and photos
├── globals.css           # Global styles and background gradient
└── layout.tsx            # Root layout with fonts and favicon

components/
├── about.tsx             # Who We Are section with social media carousel
├── animate-on-scroll.tsx # Scroll-triggered animation wrapper
├── floating-pieces.tsx   # Interactive physics-based puzzle pieces (hero)
├── footer.tsx            # Footer with social links
├── hero.tsx              # Hero section
├── navbar.tsx            # Floating glass pill navbar
├── sponsors.tsx          # Project partners marquee carousel
├── team.tsx              # Team member cards
└── what-we-do.tsx        # Core pillars section

public/                   # Static assets (logos, team photos, puzzle pieces)
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — hero, about, core pillars, partners carousel, team |
| `/events` | Live Luma calendar embed with link to register |
| `/join` | Active applications (live from Linktree) and sponsor CTA |
| `/opportunities` | Networking and recruiting opportunities |
| `/projects` | Past project partners and photo banners |

## Key Features

- **Interactive hero** — Physics-based puzzle pieces that respond to mouse and scroll
- **Glass UI** — Consistent frosted glass aesthetic with `backdrop-blur` throughout
- **Live Linktree integration** — `/join` page fetches active application links from Linktree and re-validates every 60 seconds
- **Luma integration** — `/events` page embeds the live Luma calendar so events stay up to date automatically
- **Partner marquee** — Auto-scrolling carousel of project partner logos
- **Social carousel** — Card-stack carousel in the About section featuring LinkedIn and Instagram posts

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Deployment

The site is deployed on **Vercel**. Pushing to the `main` branch triggers an automatic production deployment.

## Content Updates

| What to update | Where |
|----------------|-------|
| Team members | `components/team.tsx` |
| Partner logos | `components/sponsors.tsx` + `public/` |
| Past project partners | `app/projects/page.tsx` |
| Application links | Update directly on [Linktree](https://linktr.ee/productgt) — site updates within 60 seconds |
| Events | Add/update on [Luma](https://lu.ma/user/productgt) — embed is always live |
| Social media posts in carousel | `components/about.tsx` (embed URLs) |
| Footer social links | `components/footer.tsx` |

## Contact

**Email**: gatechproductmanagement@gmail.com  
**Instagram**: [@product.gt](https://www.instagram.com/product.gt/)  
**LinkedIn**: [Product@GT](https://www.linkedin.com/company/product-gt/)  
**Linktree**: [linktr.ee/productgt](https://linktr.ee/productgt)
