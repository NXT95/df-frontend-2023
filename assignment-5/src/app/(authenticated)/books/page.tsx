'use client'

import { Table, TableActions } from './components'
import { useBook } from 'context/BookContext'
import { DEFAULT_PAGE_SIZE } from 'constant'
import { Pagination } from 'components/Pagination'

export default function Books() {
  const { books, searchText, currentPage, setCurrentPage } = useBook()

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
      <TableActions />
      <section>
        <div className="overflow-x-auto">
          <Table dataTable={dataTable} />
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
