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
  },
  {
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "database",
  },
  {
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "devops",
  },
];
let state = {
  tableData,
};
window.Dep = class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    console.log("depend");
    if (activeUpdate) {
      // register the current active update as a subscriber
      this.subscribers.add(activeUpdate);
    }
  }

  notify() {
    console.log("notify");
    // run all subscriber functions
    this.subscribers.forEach((subscriber) => subscriber());
  }
};

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
    console.log("observe", {
      internalValue,
      dep,
    });
    Object.defineProperty(obj, key, {
      get() {
        console.log("11111111");
        dep.depend();
        return internalValue;
      },
      set(newValue) {
        const isChanged = internalValue !== newValue;
        if (isChanged) {
          internalValue = newValue;
          dep.notify();
          if (key === "tableData") {
            renderTable();
          }
        }
      },
    });
  });
}

observe(state);

autorun(() => {
  console.log("state is", state);
});

let deleteRowIndex = -1;

const dialogAddBook = document.getElementById("dialog-add-book");
const dialogDeleteBook = document.getElementById("dialog-delete-book");
const inputSearch = document.getElementById("input-search");

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
  const { tableData } = state;
  console.log("renderTable: ", state.tableData);
  const searchText = inputSearch.value;
  const data = tableData.filter((row) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });
  const tableRef = document.getElementById("books-table");
  data.forEach((rowData, rowIndex) => {
    const newRow = tableRef.insertRow();
    tableColumns.forEach((column) => {
      const newCell = newRow.insertCell();
      let newText = null;
      if (column === "action") {
        newText = document.createElement("span");
        newText.innerText = "Delete";
        newText.classList.add("text-delete");
        newText.addEventListener("click", () => {
          deleteRowIndex = rowIndex;
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

function addEventDeleteBook() {
  const deleteBookForm = dialogDeleteBook.getElementsByTagName("form")[0];
  deleteBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.submitter.ariaLabel !== "close") {
      // state.tableData.splice(deleteRowIndex, 1);
      state.tableData = [];
      localStorage.setItem("state", JSON.stringify(state));
    }
    dialogDeleteBook.close();
  });
}

function addEventAddBook() {
  const addBookForm = dialogAddBook.getElementsByTagName("form")[0];
  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addBookForm);
    console.log("formData", formData);
  });
}

function init() {
  if (!localStorage.getItem("state")) {
    localStorage.setItem("state", JSON.stringify(state));
  } else {
    state = JSON.parse(localStorage.getItem("state"));
  }

  renderTable();
  renderTopicOptions();
  addEventDeleteBook();
  dialogDeleteBook.addEventListener("close", () => {
    deleteRowIndex = -1;
  });
}

init();
