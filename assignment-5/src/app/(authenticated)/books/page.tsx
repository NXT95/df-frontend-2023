'use client'

import { Pagination, Table, TableActions } from './components'
import { useBook } from '../../../context/BookContext'
import { DEFAULT_PAGE_SIZE } from 'constant'

export default function Books() {
  const {
    books,
    searchText,
    setSearchText,
    setDeleteBook,
    currentPage,
    setCurrentPage,
    dialogAddBookRef,
    dialogDeleteBookRef,
  } = useBook()

  const filterBooks = books
    .filter((book) => {
      return book.name.toLowerCase().includes(searchText.toLowerCase())
    })
    .sort((first, second) => second.rowId - first.rowId)
  const total = filterBooks.length
  const dataTable = filterBooks.slice(
    (currentPage - 1) * DEFAULT_PAGE_SIZE,
    currentPage * DEFAULT_PAGE_SIZE,
  )

  return (
    <>
      <TableActions
        dialogAddBookRef={dialogAddBookRef}
        setSearchText={setSearchText}
      />
      <section>
        <div className="overflow-x-auto">
          <Table
            dataTable={dataTable}
            dialogDeleteBookRef={dialogDeleteBookRef}
            setDeleteBook={setDeleteBook}
          />
        </div>
        <div className="mt-5 text-right">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={DEFAULT_PAGE_SIZE}
            onChangePage={setCurrentPage}
          />
        </div>
      </section>
    </>
  )
}
