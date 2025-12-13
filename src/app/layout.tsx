import type { Metadata } from 'next'
import './globals.css'
import { Figtree, Geist_Mono } from 'next/font/google'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'PWHLCord Stats',
  description: 'Meta Stats for the unofficial PWHL Discord',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${geistMono.variable} antialiased`}>
      <body className="dark">
        <div className="container mx-auto flex h-screen flex-col p-4">
          <div className="h-8" /> {/* Navbar placeholder */}
          <div className="flex-grow">{children}</div>
          {/*<Footer />*/}
        </div>
      </body>
    </html>
  )
}
