'use client'

import { Pagination, Table, TableActions } from '../../components'
import { useBook } from '../../context/BookContext'

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
  const pageSize = 5
  const total = filterBooks.length
  const dataTable = filterBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
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
            pageSize={pageSize}
            onChangePage={setCurrentPage}
          />
        </div>
      </section>
    </>
  )
}
