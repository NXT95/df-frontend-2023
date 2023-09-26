export default function TableActions({ dialogAddBookRef, setSearchText }) {
  function handleChangeSearchText(event) {
    setSearchText(event.target.value);
  }

  function handleClickAddBook() {
    dialogAddBookRef.current.showModal();
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
  );
}
