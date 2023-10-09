'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import closeIcon from 'assets/icons/close.svg'
import { Button } from 'components/Button'
import { useBook } from 'context/BookContext'

export default function DialogDeleteBook({ onSubmit }: Props) {
  const { dialogDeleteBookRef } = useBook()
  const router = useRouter()
  const { id } = useParams()
  const { deleteBook } = useBook()

  const handleSubmit =
    (cbFunc: React.FormEventHandler<HTMLFormElement>) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      cbFunc(event)
      dialogDeleteBookRef.current?.close()
      if (id) {
        router.push('/books')
      }
    }

  const handleClose = () => {
    dialogDeleteBookRef.current?.close()
  }

  return (
    <dialog
      className="w-[340px] rounded border-2 border-solid border-[#d6dce1] p-4"
      ref={dialogDeleteBookRef}
    >
      <header className="mb-[25px] flex items-center justify-between">
        <div className="text-2xl font-bold">Delete book</div>
        <Button className="bg-white" appearance="default" onClick={handleClose}>
          <Image src={closeIcon} alt="Close" />
        </Button>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="px-[30px] py-[20px] text-center">
          Do you want to delete <b>{deleteBook?.name}</b> book?
        </p>
        <footer className="pt-[10px] text-center">
          <Button
            className="mr-4 h-[36px] min-w-[80px] bg-transparent  px-2.5"
            appearance="secondary"
            type="submit"
          >
            Delete
          </Button>
          <Button
            className="h-[36px] min-w-[80px] px-2.5"
            appearance="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </footer>
      </form>
    </dialog>
  )
}

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>
}
