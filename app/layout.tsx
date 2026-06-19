import type { Metadata } from 'next'
import { Poppins, Open_Sans } from 'next/font/google'
import './globals.css'

const _poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins" });
const _openSans = Open_Sans({ subsets: ["latin"], weight: ["700"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: 'Product @ GT — Georgia Tech Product Club',
  description: 'The premier product management and development club at Georgia Tech. Learn to build, ship, and scale products that matter.',
  icons: {
    icon: '/productlogo.png',
    apple: '/productlogo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_poppins.variable} ${_openSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
