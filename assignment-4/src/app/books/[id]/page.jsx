'use client'

import { useParams, useRouter } from 'next/navigation'
import { useBook } from '../../../context/BookContext'

export default function BookDetail() {
  const router = useRouter()
  const { id } = useParams()
  const { books, setDeleteBook, dialogDeleteBookRef } = useBook()

  function handleClickDeleteBook() {
    setDeleteBook(book)
    dialogDeleteBookRef.current?.showModal()
  }

  const book = books.find((book) => book.rowId === parseInt(id, 10))
  if (!book) {
    return (
      <div>
        <div>Book not found</div>
        <button onClick={() => router.back()}>{'<'} Back to list book</button>
      </div>
    )
  }

  return (
    <section>
      <button type="button" onClick={() => router.back()}>
        Back
      </button>
      <div>{book.name}</div>
      <div>
        <span>Author: </span>
        {book.author}
      </div>
      <div>
        <span>Topic: </span>
        {book.topic}
      </div>
      <button type="button" onClick={handleClickDeleteBook}>
        Delete
      </button>
    </section>
  )
}
