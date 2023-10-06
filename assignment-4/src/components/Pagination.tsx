'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Button } from './Button'

export default function Pagination({
  current,
  total,
  pageSize,
  onChangePage,
}: PaginationProps) {
  const [pageCount, setPageCount] = useState(0)
  const pageList = Array.from({ length: pageCount }, (_, i) => i + 1)

  function handleChangePage(page: number) {
    return () => {
      onChangePage(page)
    }
  }

  useEffect(() => {
    const pageCount = Math.floor((total - 1) / pageSize) + 1
    setPageCount(pageCount)
    if (pageCount > 0) {
      onChangePage(1)
    } else {
      onChangePage(0)
    }
  }, [total, pageSize, onChangePage])

  if (pageCount <= 0) {
    return null
  }

  return (
    <ul className="m-0 box-border list-none p-0 text-sm text-black">
      {pageList.map((item) => (
        <li
          key={item}
          className={cn(
            'me-2 inline-block h-[30px] w-[30px] cursor-pointer select-none list-none rounded-md border border-solid border-transparent bg-transparent text-center align-middle outline-0 transition duration-200 hover:bg-gray-300',
            {
              '!border-[#1677ff] bg-white font-semibold text-[#1677ff] hover:!bg-white':
                current === item,
              'me-0': pageList.length === item,
            },
          )}
        >
          <Button
            className="h-full w-full bg-transparent align-sub"
            appearance="default"
            onClick={handleChangePage(item)}
          >
            {item}
          </Button>
        </li>
      ))}
    </ul>
  )
}

interface PaginationProps {
  current: number
  total: number
  pageSize: number
  onChangePage: React.Dispatch<React.SetStateAction<number>>
}
