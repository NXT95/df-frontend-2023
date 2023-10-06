import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '../components'
import { BookProvider } from '../context/BookContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookStore',
  description: 'BookStore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="p-5">
          <BookProvider>{children}</BookProvider>
        </main>
      </body>
    </html>
  )
}
