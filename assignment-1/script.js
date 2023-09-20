class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate);
    }
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }
}

let activeUpdate;
function autorun(update) {
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate;
    update();
  }
  wrappedUpdate();
}

function observe(obj) {
  Object.keys(obj).forEach((key) => {
    let internalValue = obj[key];
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return internalValue;
      },
      set(newValue) {
        const isChanged = internalValue !== newValue;
        if (isChanged) {
          internalValue = newValue;
          dep.notify();
          renderTable();
        }
      },
    });
  });
}

const topicOptions = [
  {
    text: "Programming",
    value: "programming",
    selected: true,
  },
  {
    text: "Database",
    value: "database",
    selected: false,
  },
  {
    text: "Devops",
    value: "devops",
    selected: false,
  },
];
const tableColumns = ["name", "author", "topic", "action"];
const tableData = [
  {
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "programming",
    rowId: 0,
  },
  {
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "database",
    rowId: 1,
  },
  {
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "devops",
    rowId: 2,
  },
];

let state = {
  tableData,
  searchText: "",
};
let deleteRowId = -1;

const dialogAddBook = document.getElementById("dialog-add-book");
const dialogDeleteBook = document.getElementById("dialog-delete-book");
const addBookForm = dialogAddBook.getElementsByTagName("form")[0];
const deleteBookForm = dialogDeleteBook.getElementsByTagName("form")[0];
const inputSearch = document.getElementById("input-search");
const btnAddBook = document.getElementById("btn-add-book");

function renderTopicOptions() {
  const selectRef = document.getElementById("topic-select");
  topicOptions.forEach((option, key) => {
    selectRef[key] = new Option(
      option.text,
      option.value,
      option.defaultSelected,
      option.selected
    );
  });
}

function renderTable() {
  const { tableData, searchText } = state;
  const data = tableData.filter((row) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const tableRef = document.getElementById("books-table");
  const tbody = tableRef.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  data.forEach((rowData) => {
    const newRow = tbody.insertRow();
    tableColumns.forEach((column) => {
      const newCell = newRow.insertCell();
      let newText = null;
      if (column === "action") {
        newText = document.createElement("span");
        newText.innerText = "Delete";
        newText.classList.add("text-delete");
        newText.addEventListener("click", () => {
          deleteRowId = rowData["rowId"];
          dialogDeleteBook.showModal();
          const msgDeleteRef =
            dialogDeleteBook.getElementsByClassName("msg-delete")[0];
          msgDeleteRef.innerHTML = `Do you want to delete <b>${rowData["name"]}</b> book?`;
        });
      } else if (column === "topic") {
        newText = document.createTextNode(
          topicOptions.find((option) => option.value === rowData[column])?.text
        );
      } else {
        newText = document.createTextNode(rowData[column]);
      }
      newCell.appendChild(newText);
    });
  });
}

function handleAddBook() {
  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter.ariaLabel !== "close") {
      const formData = new FormData(addBookForm);
      const book = {};
      for (const pair of formData.entries()) {
        book[pair[0]] = pair[1];
      }
      book.rowId = new Date().getTime();
      state.tableData = [...state.tableData, book];
      localStorage.setItem("state", JSON.stringify(state));
    }
    dialogAddBook.close();
  });
}

function handleDeleteBook() {
  deleteBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter.ariaLabel !== "close") {
      state.tableData = state.tableData.filter(
        (row) => row.rowId !== deleteRowId
      );
      localStorage.setItem("state", JSON.stringify(state));
    }
    dialogDeleteBook.close();
  });
}

function handleClickBtnAddBook() {
  btnAddBook.addEventListener("click", () => dialogAddBook.showModal());
}

function handleChangeInputSearch() {
  inputSearch.addEventListener("input", (event) => {
    state.searchText = event.target.value;
  });
}

function handleCloseDialogAddBook() {
  dialogAddBook.addEventListener("close", () => {
    addBookForm.reset();
  });
}

function handleCloseDialogDeleteBook() {
  dialogDeleteBook.addEventListener("close", () => {
    deleteRowId = -1;
  });
}

function handlePressEnterOnForm(form) {
  form.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}

function init() {
  if (!localStorage.getItem("state")) {
    localStorage.setItem("state", JSON.stringify(state));
  } else {
    state.tableData = JSON.parse(localStorage.getItem("state")).tableData;
  }

  observe(state);
  autorun(() => {
    console.log("state is: ", state);
  });

  renderTopicOptions();
  renderTable();

  handlePressEnterOnForm(dialogAddBook);
  handlePressEnterOnForm(dialogDeleteBook);
  handleAddBook();
  handleDeleteBook();
  handleClickBtnAddBook();
  handleChangeInputSearch();
  handleCloseDialogAddBook();
  handleCloseDialogDeleteBook();
}

init();
