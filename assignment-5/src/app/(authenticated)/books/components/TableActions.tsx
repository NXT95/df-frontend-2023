import { Button } from '../../../../components/Button'

export default function TableActions({
  dialogAddBookRef,
  setSearchText,
}: TableActionsProps) {
  function handleChangeSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  const handleClickAddBook = () => {
    dialogAddBookRef.current?.showModal()
  }

  return (
    <section className="flex justify-end pb-5">
      <input
        className="mr-4 min-w-[200px] max-w-[280px] flex-1 rounded border-2 border-solid border-slate-300 px-2"
        placeholder="Search books"
        onChange={handleChangeSearchText}
      />
      <Button
        className="h-[36px] min-w-[80px] px-2.5"
        appearance="primary"
        onClick={handleClickAddBook}
      >
        Add book
      </Button>
    </section>
  )
}

interface TableActionsProps {
  dialogAddBookRef: React.RefObject<HTMLDialogElement>
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}
