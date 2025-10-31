import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container mx-auto flex h-screen flex-col p-4">
          <div className="h-8" /> {/* Navbar placeholder */}
          <div className="flex-grow">{children}</div>
          {/*<Footer />*/}
        </div>
      </body>
    </html>
  )
}
