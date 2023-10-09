'use client'

import { Button } from 'components/Button'

export default function Login() {
  const handleSubmit = () => {}

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-7">
      <div className="w-[320px] border-2 border-solid border-[#d6dce1] bg-white p-5 sm:w-[380px]">
        <div className="py-10 text-center text-3xl font-extrabold text-[#d2465b]">
          Bookstore
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block w-full text-sm" htmlFor="email">
            <span className="font-semibold">Email(*)</span>
            <input
              className="mb-[20px] h-[36px] w-full rounded border-2 border-solid border-[#d6dce1] px-2 text-sm"
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </label>

          <label className="block w-full text-sm" htmlFor="password">
            <span className="font-semibold">Password(*)</span>
            <input
              className="mb-[25px] h-[36px] w-full rounded border-2 border-solid border-[#d6dce1] px-2 text-sm"
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </label>

          <footer className="pb-[35px]">
            <Button
              className="h-[36px] w-full"
              type="submit"
              appearance="primary"
            >
              Login
            </Button>
          </footer>
        </form>
      </div>
    </div>
  )
}
