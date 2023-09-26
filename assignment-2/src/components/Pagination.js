import { useEffect, useState } from "react";
import classNames from "classnames";

export default function Pagination({ current, total, pageSize, onChangePage }) {
  const [pageCount, setPageCount] = useState(0);
  const pageList = Array.from({ length: pageCount }, (_, i) => i + 1);

  function handleChangePage(page) {
    return function () {
      onChangePage(page);
    };
  }

  useEffect(() => {
    const pageCount = Math.floor((total - 1) / pageSize) + 1;
    setPageCount(pageCount);
    if (pageCount > 0) {
      onChangePage(1);
    } else {
      onChangePage(0);
    }
  }, [total, pageSize, onChangePage]);

  if (pageCount <= 0) {
    return null;
  }

  return (
    <ul className="pagination">
      {pageList.map((item) => (
        <li
          key={item}
          className={classNames("pagination-item", {
            "pagination-item-active": current === item,
            "no-margin": pageList.length === item,
          })}
          onClick={handleChangePage(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
