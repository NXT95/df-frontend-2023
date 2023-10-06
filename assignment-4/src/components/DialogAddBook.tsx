'use client'

import { forwardRef, useEffect, useRef } from 'react'
import Image from 'next/image'
import closeIcon from '../assets/icons/close.svg'
import { Book } from '../types'
import { topicOptions } from '../constant'
import { Button } from './Button'

const DialogAddBook = forwardRef(function DialogAddBook(
  { books, setBooks }: Props,
  ref: React.Ref<HTMLDialogElement>,
) {
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(event: React.BaseSyntheticEvent) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const book = {} as Book
    for (const pair of formData.entries()) {
      book[pair[0]] = pair[1]
    }
    book.rowId = new Date().getTime()
    const newBooks = [...books, book]
    localStorage.setItem('books', JSON.stringify(newBooks))
    setBooks(newBooks)
    ;(ref as React.RefObject<HTMLDialogElement>).current?.close()
  }

  const handleClickCloseDialog = () => {
    ;(ref as React.RefObject<HTMLDialogElement>).current?.close()
  }

  useEffect(() => {
    ;(ref as React.RefObject<HTMLDialogElement>).current?.addEventListener(
      'close',
      () => {
        formRef.current?.reset()
      },
    )
  }, [ref])

  return (
    <dialog
      className="w-[340px] rounded border-2 border-solid border-[#d6dce1] p-4"
      ref={ref}
    >
      <header className="mb-[25px] flex items-center justify-between">
        <div className="text-2xl font-bold">Add book</div>
        <Button
          className="bg-white"
          appearance="default"
          onClick={handleClickCloseDialog}
        >
          <Image src={closeIcon} alt="Close" />
        </Button>
      </header>
      <form onSubmit={handleSubmit} ref={formRef}>
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
            {topicOptions.map((option, index) => (
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
    </dialog>
  )
})

export default DialogAddBook
interface Props {
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}
