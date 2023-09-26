import { Fragment } from "react";
import { tableColumns, topicOptions } from "../constant";

export default function Table({
  dataTable,
  dialogDeleteBookRef,
  setDeleteBook,
}) {
  function handleClickDeleteBook(book) {
    return function () {
      setDeleteBook(book);
      dialogDeleteBookRef.current.showModal();
    };
  }

  function getTextOfTopic(value) {
    return topicOptions.find((option) => option.value === value)?.text;
  }

  return (
    <table>
      <thead>
        <tr>
          {tableColumns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((book) => (
          <tr key={book.rowId}>
            {tableColumns.map((column) => (
              <Fragment key={column}>
                {column === "action" ? (
                  <td
                    className="text-delete"
                    onClick={handleClickDeleteBook(book)}
                  >
                    Delete
                  </td>
                ) : column === "topic" ? (
                  <td>{getTextOfTopic(book[column])}</td>
                ) : (
                  <td>{book[column]}</td>
                )}
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
