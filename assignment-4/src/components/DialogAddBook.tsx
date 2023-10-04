'use client'

import { forwardRef, useEffect, useRef } from 'react'
import Image from 'next/image'
import closeIcon from '../assets/icons/close.svg'
import { Book } from '../types'
import { topicOptions } from '../constant'

export default forwardRef(
  ({ books, setBooks }: Props, ref: React.Ref<HTMLDialogElement>) => {
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

    function handleClickCloseDialog() {
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
      <dialog id="dialog-add-book" ref={ref}>
        <header>
          <div className="title">Add book</div>
          <button onClick={handleClickCloseDialog}>
            <Image src={closeIcon} alt="Close" />
          </button>
        </header>
        <form onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="name">
            Name
            <input type="text" name="name" id="name" />
          </label>
          <label htmlFor="author">
            Author
            <input type="text" name="author" id="author" />
          </label>
          <label htmlFor="topic">
            Topic
            <select name="topic" id="topic">
              {topicOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </label>
          <footer>
            <button className="btn" type="submit">
              Create
            </button>
          </footer>
        </form>
      </dialog>
    )
  },
)

interface Props {
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}
