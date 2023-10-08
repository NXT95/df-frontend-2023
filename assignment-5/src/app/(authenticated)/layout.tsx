'use client'

import { Header } from './components'
import { BookProvider } from 'context/BookContext'
import { useUser } from 'hooks/useUser'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  if (!user) {
    return <h1>Loading.......</h1>
  }

  return (
    <>
      <Header />
      <BookProvider>
        <main className="p-5">{children}</main>
      </BookProvider>
    </>
  )
}
