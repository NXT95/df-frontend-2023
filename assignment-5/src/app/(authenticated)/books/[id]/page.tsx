'use client'

import { useParams, useRouter } from 'next/navigation'
import { useBook } from '../../../../context/BookContext'
import { Button } from '../../../../components/Button'
import { getTextOfTopic } from '../../../../utils'

export default function BookDetail() {
  const router = useRouter()
  const { id } = useParams()
  const { books, setDeleteBook, dialogDeleteBookRef } = useBook()

  const handleClickDeleteBook = () => {
    setDeleteBook(book)
    dialogDeleteBookRef.current?.showModal()
  }

  const book = books.find((book) => book.rowId === parseInt(id as string, 10))
  if (!book) {
    return (
      <div className="mt-[40%] text-center sm:mt-[15%]">
        <div className="mb-3 text-3xl font-bold">Book not found</div>
        <Button
          className="text-red-500"
          appearance="default"
          onClick={() => router.back()}
        >
          {'< Back to list book'}
        </Button>
      </div>
    )
  }

  return (
    <section>
      <Button
        className="mb-6 text-red-500"
        appearance="default"
        onClick={() => router.back()}
      >
        {'< Back'}
      </Button>
      <div className="mb-6 text-xl font-bold">Name: {book.name}</div>
      <div>
        <span className="font-bold">Author: </span>
        {book.author}
      </div>
      <div className="mb-6">
        <span className="font-bold">Topic: </span>
        {getTextOfTopic(book.topic)}
      </div>
      <Button
        className="text-red-500 underline"
        appearance="default"
        onClick={handleClickDeleteBook}
      >
        Delete
      </Button>
    </section>
  )
}
