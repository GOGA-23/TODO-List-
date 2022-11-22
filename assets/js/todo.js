// Getting all required elements
let inputEl = document.getElementById("input-text");
let inputBtn = document.querySelector(".input-field .input-icon2");
let todoLists = document.querySelector(".todolists");
let noLists = document.querySelector(".no-todolists");
let completedTask = document.querySelector(".completed-task span");
let pendingTask = document.querySelector(".pending-task .pending-no");
let clearBtn = document.querySelector(".completed-task button");

// we will call this function while adding,deleting and checking-unchecking the task
function allTask() {
  let tasks = document.querySelectorAll(".pending").length;
  let checkBtn = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;

  // if children exists or not exists. then condition will be applied accordingly
  todoLists.children.length > 0
    ? (noLists.hidden = true)
    : (noLists.hidden = false);

  // if task text length is zero. then pending & completed count will be zero.
  // if text length is greater than 0 means, then pending & completed  count added to ti
  completedTask.textContent = checkBtn === 0 ? "0" : checkBtn;
  pendingTask.textContent = tasks === 0 ? "0" : tasks;
}

let handleInputVal = (e) => {
  let inputValue = inputEl.value.trim(); // trim function to removes space of front and back in text

  // if enter key pressed or clicked on button, input value will be trigger when length of input value greater than 0
  if ((e.key === "Enter" || e.which == 1) && inputValue.length > 0) {
    let todoList = `<li class="todolist pending" onclick="handleCheckBox(this)">
                        <input type="checkbox" class="list-checkbox"/>
                        <p class="list-content">${inputValue}</p>
                        <button onclick="deleteTask(this)">X</button>
                      </li>`;

    todoLists.insertAdjacentHTML("beforeend", todoList); //inserting the HTML elements before end of the element(last-child)
    inputEl.value = "";
    allTask();
  }
};

// function for checkbox that we were using toggle to count the tasks
function handleCheckBox(e) {
  let checkBox = e.querySelector('input[type="checkbox"]');
  checkBox.checked = checkBox.checked ? false : true;
  e.classList.toggle("pending");
  allTask();
}

// deleting the task while when we click on the X icon button
function deleteTask(e) {
  e.parentElement.remove(); //getting the element and deleting the task  when click on X (button) icon
}

// clear all task while when we click on the clear All
clearBtn.addEventListener("click", () => {
  todoLists.innerHTML = ""; // clearing all tasks while using Clear All button
  allTask();
});

// add task while we put value in input field and click the button or icon
inputBtn.addEventListener("click", handleInputVal);

// add task while we put value in input field and press Enter
inputEl.addEventListener("keyup", handleInputVal);
