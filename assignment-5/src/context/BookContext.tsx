'use client'

import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Book } from '../types'
import { DEFAULT_BOOKS } from '../constant'

interface IBookContext {
  books: Book[]
  setBooks: Dispatch<SetStateAction<Book[]>>
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
  deleteBook: Book | null
  setDeleteBook: Dispatch<SetStateAction<Book | undefined>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  dialogDeleteBookRef: RefObject<HTMLDialogElement>
  dialogAddBookRef: RefObject<HTMLDialogElement>
}

const BookContext = createContext<IBookContext | undefined>(undefined)
BookContext.displayName = 'BookContext'

function BookProvider(props) {
  const dialogAddBookRef = useRef<HTMLDialogElement>(null)
  const dialogDeleteBookRef = useRef<HTMLDialogElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [searchText, setSearchText] = useState('')
  const [deleteBook, setDeleteBook] = useState<Book | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify(DEFAULT_BOOKS))
      setBooks(DEFAULT_BOOKS)
    } else {
      try {
        setBooks(JSON.parse(localStorage.getItem('books') ?? '[]'))
      } catch (error) {
        setError('parse data from localStorage fail')
      }
    }
  }, [])

  const value = useMemo(() => {
    return {
      books,
      setBooks,
      searchText,
      setSearchText,
      deleteBook,
      setDeleteBook,
      currentPage,
      setCurrentPage,
      dialogAddBookRef,
      dialogDeleteBookRef,
    }
  }, [books, currentPage, deleteBook, searchText])

  if (error) {
    return <h1>{error.toUpperCase()}</h1>
  }

  return <BookContext.Provider value={value} {...props} />
}

function useBook() {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error(`useBook must be used within a BookProvider`)
  }
  return context
}

export { BookProvider, useBook }
