'use client'

import { useEffect, useRef } from 'react'
import { TOPIC_OPTIONS } from 'constant'
import { Dialog } from 'components/Dialog/Dialog'
import { Button } from 'components/Button'
import { useBook } from 'context/BookContext'

export default function DialogAddBook({ onSubmit }: Props) {
  const { dialogAddBookRef } = useBook()
  const formRef = useRef<HTMLFormElement>(null)

  const handleClose = () => {
    dialogAddBookRef.current?.close()
  }

  const handleSubmit =
    (cbFunc: React.FormEventHandler<HTMLFormElement>) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      cbFunc(event)
      dialogAddBookRef.current?.close()
    }

  useEffect(() => {
    dialogAddBookRef.current?.addEventListener('close', () => {
      formRef.current?.reset()
    })
  }, [dialogAddBookRef])

  return (
    <Dialog ref={dialogAddBookRef} title="Add book" onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <label className="block w-full text-sm" htmlFor="name">
          Name
          <input
            className="mb-[15px] h-[36px] w-full rounded border-2 border-solid border-[#d6dce1] px-2 text-sm"
            type="text"
            name="name"
            id="name"
          />
        </label>

        <label className="block w-full text-sm" htmlFor="author">
          Author
          <input
            className="mb-[15px] h-[36px] w-full rounded border-2 border-solid border-[#d6dce1] px-2 text-sm"
            type="text"
            name="author"
            id="author"
          />
        </label>

        <label className="block w-full text-sm" htmlFor="topic">
          Topic
          <select
            className="mb-[15px] block h-[36px] w-full appearance-none rounded border-2 border-solid border-[#d6dce1] bg-[url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+')] bg-[right_6px_top] bg-no-repeat px-2 text-sm"
            name="topic"
            id="topic"
          >
            {TOPIC_OPTIONS.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </label>

        <footer className="pt-[10px] text-right">
          <Button
            className="h-[36px] min-w-[80px] px-2.5"
            type="submit"
            appearance="primary"
          >
            Create
          </Button>
        </footer>
      </form>
    </Dialog>
  )
}

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>
}
