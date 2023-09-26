import { forwardRef, useEffect, useRef } from "react";
import closeIcon from "../assets/icons/close.svg";
import { topicOptions } from "../constant";

export default forwardRef(function DialogAddBook({ books, setBooks }, ref) {
  const formRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {};
    for (const pair of formData.entries()) {
      book[pair[0]] = pair[1];
    }
    book.rowId = new Date().getTime();
    const newBooks = [...books, book];
    localStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks);
    ref.current.close();
  }

  function handleClickCloseDialog() {
    ref.current.close();
  }

  useEffect(() => {
    ref.current.addEventListener("close", () => {
      formRef.current.reset();
    });
  }, [ref]);

  return (
    <dialog id="dialog-add-book" ref={ref}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <header>
          <div className="title">Add book</div>
          <div className="cursor-pointer" onClick={handleClickCloseDialog}>
            <img src={closeIcon} alt="Close" />
          </div>
        </header>
        <label>
          Name
          <input type="text" name="name" />
        </label>
        <label>
          Author
          <input type="text" name="author" />
        </label>
        <label>
          Topic
          <select name="topic" id="topic-select">
            {topicOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </label>
        <footer>
          <button className="btn" type="submit">
            Create
          </button>
        </footer>
      </form>
    </dialog>
  );
});
