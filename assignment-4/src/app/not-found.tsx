'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../components/Button'

export default function NotFound() {
  const router = useRouter()

  const backToHome = () => {
    router.push('/')
  }

  return (
    <div className="mt-[40%] text-center sm:mt-[15%]">
      <div className="mb-3 text-8xl font-bold">404</div>
      <div className="mb-7 font-semibold">Page not found</div>
      <Button
        className="text-red-500"
        appearance="default"
        onClick={backToHome}
      >
        {'< Back to home page'}
      </Button>
    </div>
  )
}
