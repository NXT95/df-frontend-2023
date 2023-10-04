'use client'

import { DialogAddBook, DialogDeleteBook } from '../../components'
import { useBook } from '../../context/BookContext'

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { books, setBooks, deleteBook, dialogAddBookRef, dialogDeleteBookRef } =
    useBook()

  return (
    <>
      {children}
      <DialogAddBook ref={dialogAddBookRef} books={books} setBooks={setBooks} />
      <DialogDeleteBook
        ref={dialogDeleteBookRef}
        deleteBook={deleteBook}
        books={books}
        setBooks={setBooks}
      />
    </>
  )
}
