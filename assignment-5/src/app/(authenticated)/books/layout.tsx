'use client'

import { DialogAddBook, DialogDeleteBook } from './components'
import { useBook } from 'context/BookContext'
import { Book } from 'types'

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { books, setBooks, deleteBook } = useBook()

  const handleAddBook: React.FormEventHandler<HTMLFormElement> = (
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

  function handleDeleteBook(event: React.BaseSyntheticEvent) {
    event.preventDefault()
    const newBooks = books.filter((row) => row.rowId !== deleteBook?.rowId)
    localStorage.setItem('books', JSON.stringify(newBooks))
    setBooks(newBooks)
  }

  return (
    <>
      {children}
      <DialogAddBook onSubmit={handleAddBook} />
      <DialogDeleteBook onSubmit={handleDeleteBook} />
    </>
  )
}
