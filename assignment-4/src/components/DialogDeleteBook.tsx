'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import closeIcon from '../assets/icons/close.svg'
import { Book } from '../types'
import { useParams, useRouter } from 'next/navigation'

export default forwardRef(
  (
    { deleteBook, books, setBooks }: Props,
    ref: React.Ref<HTMLDialogElement>,
  ) => {
    const router = useRouter()
    const { id } = useParams()

    function handleSubmit(event: React.BaseSyntheticEvent) {
      event.preventDefault()
      const newBooks = books.filter((row) => row.rowId !== deleteBook?.rowId)
      localStorage.setItem('books', JSON.stringify(newBooks))
      setBooks(newBooks)
      ;(ref as React.RefObject<HTMLDialogElement>).current?.close()
      if (id) {
        router.replace('/books')
      }
    }

    function handleClickCloseDialog() {
      ;(ref as React.RefObject<HTMLDialogElement>).current?.close()
    }

    return (
      <dialog id="dialog-delete-book" ref={ref}>
        <header>
          <div className="title">Delete book</div>
          <button onClick={handleClickCloseDialog}>
            <Image src={closeIcon} alt="Close" />
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <p className="msg-delete">
            Do you want to delete <b>{deleteBook?.name}</b> book?
          </p>
          <footer>
            <button className="btn btn-flat mr-1" type="submit">
              Delete
            </button>
            <button
              className="btn"
              type="button"
              onClick={handleClickCloseDialog}
            >
              Cancel
            </button>
          </footer>
        </form>
      </dialog>
    )
  },
)

interface Props {
  deleteBook: Book | null
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}
