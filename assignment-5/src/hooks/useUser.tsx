import { useAuth } from 'context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useUser() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/books')
    } else {
      router.push('/login')
    }
  }, [router, user])

  return user
}
