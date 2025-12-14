import type { Metadata } from 'next'
import './globals.css'
import { Figtree, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: { default: 'PWHLCord Stats', template: '%s | PWHLCord Stats' },
  description: 'Meta Stats for the unofficial PWHL Discord',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <div className="container mx-auto flex h-screen max-w-6xl flex-col justify-between px-4">
            <Navbar />
            <div className="my-8 grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
