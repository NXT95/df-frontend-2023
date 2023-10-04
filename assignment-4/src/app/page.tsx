'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookProvider } from '../context/BookContext'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/books')
  }, [])

  return <></>
}
