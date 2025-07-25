import "./toDos.css";
import threeDots from "../../images/dots-vertical-menu.svg";
import editIcon from "../../images/pencil.svg";
import deleteIcon from "../../images/trash-can.svg";
import { getTargetProject } from "../logic/manageToDos.js";
import { format, parseISO, formatISO } from "date-fns";

const main = document.querySelector("main");

function renderTodo(projectId) {
  const targetProject = getTargetProject(projectId);

  main.innerHTML = `
  <h3 class="todo-project-name">${targetProject.projectName}</h3>
  <ul class="todos-container">

  </ul>
  `;
}

function renderLiElements(projectId) {
  const todosContainer = document.querySelector(".todos-container");
  const targetProject = getTargetProject(projectId);
  const todoArray = targetProject.todosArray;
  const reversedTodoArray = [...todoArray].reverse();

  todosContainer.innerHTML = "";

  reversedTodoArray.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-list-item";
    li.innerHTML = `
        <div class="todo">
          <div class="todo-left">
            <input
              type="checkbox"
              class="todo-checkbox"
              id="checkbox"
              data-project-id="${projectId}"
              data-todo-id="${todo.id}"
              ${todo.isCompleted ? "checked" : ""}
            />
            <p class="${
              todo.isCompleted ? "completed-todo-title" : ""
            }">Todo Title: <span>${todo.title}</span></p>
          </div>
          <div class="todo-right">
            <p class="todo-priority">Priority: <span>${todo.priority}</span></p>
            <p>Due Date: <span>${
              todo.dueDate
                ? format(todo.dueDate, "MMM dd, yyyy")
                : "No due date"
            }</span></p>
            <button class="show-more-btn"><img src="${threeDots}" width="20px" alt="kebab menu icon, dots vertical menu" /></button>
          </div>
        </div>
        <div class="todo-more">
          <div class="desc">
            <h4>Description</h4>
            <p>${todo.description}</p>
          </div>
          <div>
            <h4>Creation Date</h4>
            <p id="creation-date-para">${format(
              todo.creationDate,
              "MMM dd, yyyy"
            )}</p>
          </div>
          <div>
            <h4>Completion Status</h4>
            <p id="completion-para">${
              todo.isCompleted === true ? "Completed" : "Not Completed"
            }</p>
          </div>
          <div class="notes">
            <h4>Note</h4>
            <p>${todo.notes}</p>
          </div>
          <div class="btns">
            <button class="todo-edit-btn" data-project-id=${projectId} data-todo-id="${
      todo.id
    }">
              <img src="${editIcon}" width="16px" alt="pencil svg, edit icon" /> <span>Edit</span>
            </button>
          </div>
          <div class="btns">
            <button class="todo-delete-btn" data-project-id=${projectId} data-todo-id="${
      todo.id
    }">
                <img src="${deleteIcon}" width="16px" alt="trash can svg, delete icon" /><span>Delete</span>
            </button>
          </div>
        </div>
      `;
    todosContainer.appendChild(li);
  });

  const prioritySpans = document.querySelectorAll(
    ".todo-right .todo-priority span"
  );

  for (let i = 0; i < prioritySpans.length; i++) {
    if (prioritySpans[i].textContent === "Urgent") {
      prioritySpans[i].style.color = "#ff4c4c";
    } else if (prioritySpans[i].textContent === "High") {
      prioritySpans[i].style.color = "#ff9800";
    } else if (prioritySpans[i].textContent === "Medium") {
      prioritySpans[i].style.color = "#ffeb3b";
    } else if (prioritySpans[i].textContent === "Low") {
      prioritySpans[i].style.color = "#46ff4fff";
    }
  }
}

function renderAddToDoDialog(targetProject) {
  const dialog = document.createElement("dialog");
  dialog.id = "newTodoDialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h3>Create New Todo For ${targetProject.projectName}</h3>
      <div class="todo-info-container">
        <div class="todo-info-left">
          <div>
            <label for="todo-title">Title:</label>
            <input type="text" id="todo-title" placeholder="Todo Title" required/>
          </div>
          <div>
            <label for="due-date">Due Date:</label>
            <input type="date" id="due-date" />
          </div>
          <div>
            <label for="select-priority">Select Priority: </label>
            <select id="select-priority">
              <option value="Low" style="background-color: #525050;color: #81c784; font-weight: bold;">Low</option>
              <option value="Medium" style="background-color: #525050;color: #ffeb3b; font-weight: bold;">Medium</option>
              <option value="High" style="background-color: #525050;color: #ff9800;" font-weight: bold;>High</option>
              <option value="Urgent" style="background-color: #525050;color: #ff4c4c; font-weight: bold;">Urgent</option>
            </select>
          </div>
        </div>
        <div class="todo-info-right">
          <div>
            <label for="short-desc">Short Description:</label>
            <textarea id="short-desc"></textarea>
          </div>
          <div>
            <label for="todo-note">Note:</label>
            <textarea id="todo-note"></textarea>
          </div>
        </div>
      </div>
      <div class="create-todo-btns">
        <button type="button" class="todo-cancel-btn" value="cancel">Cancel</button>
        <button type="submit" class="todo-create-btn" value="create" data-project-id="${targetProject.id}">Create</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
}

function renderEditToDoDialog(projectId, todoId) {
  const targetProject = getTargetProject(projectId);
  const todoArray = targetProject.todosArray;
  const targetTodo = todoArray.find((todo) => todo.id === todoId);
  const dialog = document.createElement("dialog");
  dialog.id = "updateTodoDialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h3>Update ${targetTodo.title} todo</h3>
      <div class="todo-info-container">
        <div class="todo-info-left">
          <div>
            <label for="todo-title">Title:</label>
            <input type="text" id="todo-title" value="${
              targetTodo.title
            }" required/>
          </div>
          <div>
            <label for="due-date">Due Date:</label>
            <input type="date" value="${
              targetTodo.dueDate && !isNaN(targetTodo.dueDate.getTime())
                ? formatISO(targetTodo.dueDate, { representation: "date" })
                : ""
            }" id="due-date" />
          </div>
          <div>
            <label for="select-priority">Select Priority: </label>
            <select id="select-priority">
              <option value="Low" style="background-color: #525050;color: #81c784; font-weight: bold;">Low</option>
              <option value="Medium" style="background-color: #525050;color: #ffeb3b; font-weight: bold;">Medium</option>
              <option value="High" style="background-color: #525050;color: #ff9800;" font-weight: bold;>High</option>
              <option value="Urgent" style="background-color: #525050;color: #ff4c4c; font-weight: bold;">Urgent</option>
            </select>
          </div>
        </div>
        <div class="todo-info-right">
          <div>
            <label for="short-desc">Short Description:</label>
            <textarea id="short-desc">${targetTodo.description}</textarea>
          </div>
          <div>
            <label for="todo-note">Note:</label>
            <textarea id="todo-note">${targetTodo.notes}</textarea>
          </div>
        </div>
      </div>
      <div class="update-todo-btns">
        <button type="button" class="todo-discard-btn" value="discard">Discard Changes</button>
        <button type="submit" class="todo-save-btn" value="save" data-project-id="${projectId}" data-todo-id="${
    targetTodo.id
  }">Save Changes</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
  const selectPriorityElement = dialog.querySelector("#select-priority");
  selectPriorityElement.value = targetTodo.priority;
}

export {
  renderTodo,
  renderLiElements,
  renderAddToDoDialog,
  renderEditToDoDialog,
};
