'use client'

import { DialogAddBook, DialogDeleteBook } from './components'
import { useBook } from '../../../context/BookContext'
import { Book } from 'types'

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { books, setBooks, deleteBook, dialogAddBookRef, dialogDeleteBookRef } =
    useBook()

  const handleSubmitAddBook: React.FormEventHandler<HTMLFormElement> = (
    event: React.BaseSyntheticEvent,
  ) => {
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
  }

  return (
    <>
      {children}
      <DialogAddBook onSubmit={handleSubmitAddBook} />
      <DialogDeleteBook
        ref={dialogDeleteBookRef}
        deleteBook={deleteBook}
        books={books}
        setBooks={setBooks}
      />
    </>
  )
}
