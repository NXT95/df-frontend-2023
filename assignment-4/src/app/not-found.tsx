'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div>
      <div>404</div>
      <div>Page not found</div>
      <button onClick={() => router.push('/')}>{'<'} Back to home page</button>
    </div>
  )
}
