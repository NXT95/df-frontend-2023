import { forwardRef } from "react";
import closeIcon from "../assets/icons/close.svg";

export default forwardRef(function DialogDeleteBook(
  { deleteBook, books, setBooks },
  ref
) {
  function handleSubmit(event) {
    event.preventDefault();
    const newBooks = books.filter((row) => row.rowId !== deleteBook.rowId);
    localStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks);
    ref.current.close();
  }

  function handleClickCloseDialog() {
    ref.current.close();
  }

  return (
    <dialog id="dialog-delete-book" ref={ref}>
      <form onSubmit={handleSubmit}>
        <header>
          <div className="title">Delete book</div>
          <div className="cursor-pointer" onClick={handleClickCloseDialog}>
            <img src={closeIcon} alt="Close" />
          </div>
        </header>
        <p className="msg-delete">
          Do you want to delete <b>{deleteBook?.name}</b> book?
        </p>
        <footer>
          <button className="btn btn-flat mr-1" type="submit">
            Delete
          </button>
          <button
            className="btn"
            type="button"
            onClick={handleClickCloseDialog}
          >
            Cancel
          </button>
        </footer>
      </form>
    </dialog>
  );
});
