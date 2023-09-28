export default function TableActions({
  dialogAddBookRef,
  setSearchText,
}: TableActionsProps) {
  function handleChangeSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  function handleClickAddBook() {
    dialogAddBookRef.current?.showModal()
  }

  return (
    <section className="table-actions">
      <input
        id="input-search"
        placeholder="Search books"
        onChange={handleChangeSearchText}
      />
      <button className="btn" id="btn-add-book" onClick={handleClickAddBook}>
        Add book
      </button>
    </section>
  )
}

interface TableActionsProps {
  dialogAddBookRef: React.RefObject<HTMLDialogElement>
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}
