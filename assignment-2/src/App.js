import { useEffect, useRef, useState } from "react";
import "./App.css";
import { defaultBooks } from "./constant";
import {
  TableActions,
  DialogAddBook,
  DialogDeleteBook,
  Header,
  Pagination,
  Table,
} from "./components";

function App() {
  const dialogAddBookRef = useRef(null);
  const dialogDeleteBookRef = useRef(null);

  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [deleteBook, setDeleteBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filterBooks = books
    .filter((book) => {
      return book.name.toLowerCase().includes(searchText.toLowerCase());
    })
    .sort((first, second) => second.rowId - first.rowId);
  const pageSize = 5;
  const total = filterBooks.length;
  const dataTable = filterBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    if (!localStorage.getItem("books")) {
      localStorage.setItem("books", JSON.stringify(defaultBooks));
      setBooks(defaultBooks);
    } else {
      try {
        setBooks(JSON.parse(localStorage.getItem("books")));
      } catch (error) {
        setError("parse data from localStorage fail");
      }
    }
  }, []);

  if (error) {
    return <h1>{error.toUpperCase()}</h1>;
  }

  return (
    <>
      <Header />
      <main>
        <TableActions
          dialogAddBookRef={dialogAddBookRef}
          setSearchText={setSearchText}
        />
        <section>
          <Table
            dataTable={dataTable}
            dialogDeleteBookRef={dialogDeleteBookRef}
            setDeleteBook={setDeleteBook}
          />
          <div className="wrap-pagination">
            <Pagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChangePage={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <DialogAddBook ref={dialogAddBookRef} books={books} setBooks={setBooks} />
      <DialogDeleteBook
        ref={dialogDeleteBookRef}
        deleteBook={deleteBook}
        books={books}
        setBooks={setBooks}
      />
    </>
  );
}

export default App;
