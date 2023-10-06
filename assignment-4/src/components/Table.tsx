import { Fragment } from 'react'
import Link from 'next/link'
import { tableColumns } from '../constant'
import { Book } from '../types'
import { Button } from './Button'
import { getTextOfTopic } from '../utils'

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

  function renderTd(columnName: string, book: Book) {
    if (columnName === 'action') {
      return (
        <td className="cursor-pointer border-2 border-solid border-slate-300 px-1 text-red-500">
          <Button
            className="underline"
            appearance="default"
            onClick={handleClickDeleteBook(book)}
          >
            Delete
          </Button>
          |
          <Link className="underline" href={`/books/${book.rowId}`}>
            View
          </Link>
        </td>
      )
    }
    if (columnName === 'topic') {
      return (
        <td className="border-2 border-solid border-slate-300 px-1">
          {getTextOfTopic(book[columnName])}
        </td>
      )
    }
    return (
      <td className="border-2 border-solid border-slate-300 px-1">
        {book[columnName]}
      </td>
    )
  }

  return (
    <table className="w-full min-w-[680px] border-collapse border-2 border-solid border-slate-300 text-left">
      <colgroup>
        {tableColumns.map(({ width }, index) => (
          <col key={index} width={width} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {tableColumns.map(({ name }, index) => (
            <th
              key={index}
              scope="col"
              className="border-2 border-solid border-slate-300 px-1 capitalize"
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((book) => (
          <tr key={book.rowId}>
            {tableColumns.map(({ name }) => (
              <Fragment key={name}>{renderTd(name, book)}</Fragment>
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
  setDeleteBook: React.Dispatch<React.SetStateAction<Book | undefined>>
}
