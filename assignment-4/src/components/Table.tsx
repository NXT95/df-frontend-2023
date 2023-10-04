import { Fragment } from 'react'
import Link from 'next/link'
import { tableColumns, topicOptions } from '../constant'
import { Book } from '../types'

export default function Table({
  dataTable,
  dialogDeleteBookRef,
  setDeleteBook,
}: TableProps) {
  function handleClickDeleteBook(book: Book) {
    return () => {
      setDeleteBook(book)
      dialogDeleteBookRef.current?.showModal()
    }
  }

  function getTextOfTopic(value: string) {
    return topicOptions.find((option) => option.value === value)?.text
  }

  function renderTd(column: string, book: Book) {
    if (column === 'action') {
      return (
        <td className="text-delete">
          <span onClick={handleClickDeleteBook(book)}>Delete</span>|
          <Link href={`/books/${book.rowId}`}>View</Link>
        </td>
      )
    }
    if (column === 'topic') {
      return <td>{getTextOfTopic(book[column])}</td>
    }
    return <td>{book[column]}</td>
  }

  return (
    <table>
      <thead>
        <tr>
          {tableColumns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((book) => (
          <tr key={book.rowId}>
            {tableColumns.map((column) => (
              <Fragment key={column}>{renderTd(column, book)}</Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface TableProps {
  dataTable: Book[]
  dialogDeleteBookRef: React.RefObject<HTMLDialogElement>
  setDeleteBook: React.Dispatch<React.SetStateAction<Book | null>>
}
