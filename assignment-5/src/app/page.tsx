'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    console.log('user', user)
    if (user) {
      router.push('/books')
    } else {
      router.push('/login')
    }
  }, [router, user])

  return <div />
}
