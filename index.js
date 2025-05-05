import { next } from '@vercel/edge';

export default function middleware(req) {
  return next({
    headers: {
      'Referrer-Policy': 'origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
    },
  });
}


const todoForm = document.getElementById("form");
const todoInput = document.getElementById("input");
const listContainer = document.getElementById("todo-ul");

arrayTodos = getData();
updateTodo();
console.log(arrayTodos);
console.log(updateTodo());

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  // todoForm.addEventListener("submit", () => {
  if (todoInput.value === "") {
    alert("Write Somthing");
  } else {
    let todoObject = {
      text: todoInput.value,
      complete: false,
      // listIndex: listContainer.length,
    };
    arrayTodos.push(todoObject);
    // createTodo(todoObject, todoObject);
    updateTodo();
    saveData();
    console.log(todoObject.complete);
  }
  todoInput.value = "";
  // });
}
function updateTodo() {
  listContainer.innerHTML = "";
  arrayTodos.forEach((todo, todoIndex) => {
    todoItem = createTodo(todo, todoIndex);
    listContainer.append(todoItem);
  });
}

function createTodo(todo, todoIndex) {
  let list = document.createElement("li");
  let todoItem = todo.text;
  let todoId = "todo-" + todoIndex;
  list.className = "todo-main";
  list.innerHTML = `
      <input id="${todoId}" type="checkbox">
        <label for="${todoId}" class="custom-checkbox">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="li-text">
              ${todo.text}
        </label>
        <button class="delete-btn">
          <svg fill="var(--second-color)" xmlns="http://www.w3.org/2000/svg" 
            height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#e3e3e3">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
        </button>
  `;
  console.log(todoId);
  // listContainer.append(list);
  const removeBtn = list.querySelector(".delete-btn");
  console.log();
  removeBtn.addEventListener("click", () => {
    deleteBtn(todoIndex);
  });
  const check = list.querySelector("input");
  console.log(check);
  check.addEventListener("change", () => {
    arrayTodos[todoIndex].complete = check.checked;
    saveData();
    console.log(arrayTodos[todoIndex].complete);
  });
  check.checked = todo.complete;
  return list;
}

// function done(IsComplete, todoIndex) {
//   let todoId = "todo-" + todoIndex;
//   let check = document.getElementById(`${todoId}`);
//   check.classList.toggle("open");
// }
// done();
function deleteBtn(todoIndex) {
  //   _ _  the underscore is common convetion for a variable that is not used
  arrayTodos = arrayTodos.filter((_, i) => i !== todoIndex);
  saveData();
  updateTodo();
}
function saveData() {
  const newArray = JSON.stringify(arrayTodos);
  localStorage.setItem("todos", newArray);
}
console.log(saveData());
function getData() {
  const todos = localStorage.getItem("todos" || "[]");
  return JSON.parse(todos);
}
