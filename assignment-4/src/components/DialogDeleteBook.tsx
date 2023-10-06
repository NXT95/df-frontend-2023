'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import closeIcon from '../assets/icons/close.svg'
import { Book } from '../types'
import { Button } from './Button'

const DialogDeleteBook = forwardRef(function DialogDeleteBook(
  { deleteBook, books, setBooks }: Props,
  ref: React.Ref<HTMLDialogElement>,
) {
  const router = useRouter()
  const { id } = useParams()

  function handleSubmit(event: React.BaseSyntheticEvent) {
    event.preventDefault()
    const newBooks = books.filter((row) => row.rowId !== deleteBook?.rowId)
    localStorage.setItem('books', JSON.stringify(newBooks))
    setBooks(newBooks)
    ;(ref as React.RefObject<HTMLDialogElement>).current?.close()
    if (id) {
      router.push('/books')
    }
  }

  const handleClickCloseDialog = () => {
    ;(ref as React.RefObject<HTMLDialogElement>).current?.close()
  }

  return (
    <dialog
      className="w-[340px] rounded border-2 border-solid border-[#d6dce1] p-4"
      ref={ref}
    >
      <header className="mb-[25px] flex items-center justify-between">
        <div className="text-2xl font-bold">Delete book</div>
        <Button
          className="bg-white"
          appearance="default"
          onClick={handleClickCloseDialog}
        >
          <Image src={closeIcon} alt="Close" />
        </Button>
      </header>
      <form onSubmit={handleSubmit}>
        <p className="px-[30px] py-[20px] text-center">
          Do you want to delete <b>{deleteBook?.name}</b> book?
        </p>
        <footer className="pt-[10px] text-center">
          <Button
            className="mr-4 h-[36px] min-w-[80px] bg-transparent  px-2.5"
            appearance="secondary"
            type="submit"
          >
            Delete
          </Button>
          <Button
            className="h-[36px] min-w-[80px] px-2.5"
            appearance="primary"
            onClick={handleClickCloseDialog}
          >
            Cancel
          </Button>
        </footer>
      </form>
    </dialog>
  )
})

export default DialogDeleteBook

interface Props {
  deleteBook: Book | null
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}
