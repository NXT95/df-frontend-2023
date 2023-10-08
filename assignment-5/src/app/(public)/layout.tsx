'use client'

import { useUser } from 'hooks/useUser'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUser()

  if (user) {
    return <h1>Loading.....</h1>
  }

  return <>{children}</>
}
