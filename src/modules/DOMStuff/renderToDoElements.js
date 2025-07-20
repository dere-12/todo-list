import "./toDos.css";
import threeDots from "../../images/dots-vertical-menu.svg";
import editIcon from "../../images/pencil.svg";
import deleteIcon from "../../images/trash-can.svg";
import { getTargetProject } from "../logic/manageToDos.js";
import { projectsArray } from "../logic/manageProjects.js";
import { format, parseISO } from "date-fns";

const main = document.querySelector("main");
// let projectId = projectsArray[0].id;

function renderTodo(projectId) {
  // projectId = projectId;
  const targetProject = getTargetProject(projectId);
  // const todoArray = targetProject.todosArray;

  main.innerHTML = `
  <h3 class="todo-project-name">${targetProject.projectName}</h3>
  <ul class="todos-container">

  </ul>
  `;

  // return todoArray;
}

function renderLiElements(projectId) {
  const todosContainer = document.querySelector(".todos-container");
  const targetProject = getTargetProject(projectId);
  const todoArray = targetProject.todosArray;
  // console.log(todosContainer);

  todosContainer.innerHTML = "";

  todoArray.forEach((todo) => {
    const li = document.createElement("li");
    console.log(todoArray + ". Received!");
    li.innerHTML = `
        <div class="todo">
          <div class="todo-left">
            <input
              type="checkbox"
              class="todo-checkbox"
              id="checkbox"
              data-project-id="${projectId}"
              data-todo-id="${todo.id}"
            />
            <p>Todo Title: ${todo.title}</p>
          </div>
          <div class="todo-right">
            <p>Priority: ${todo.priority}</p>
            <p>Due Date: ${
              todo.dueDate
                ? format(todo.dueDate, "MMM dd, yyyy")
                : "No due date"
            }</p>
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
            <h4>Completion</h4>
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
}

function renderAddToDoDialog(targetProject) {
  // const targetObj = getTargetProject(projectId);
  console.log(`${targetProject.projectName} dialog opened.`);
  const dialog = document.createElement("dialog");
  dialog.id = "newTodoDialog";
  // dialog.innerHTML = "";
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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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
// renderAddToDoDialog(projectId);

function renderEditToDoDialog(projectId, todoId) {
  const targetProject = getTargetProject(projectId);
  const todoArray = targetProject.todosArray;
  const targetTodo = todoArray.find((todo) => todo.id === todoId);
  console.log(`
    update-projectId: ${targetProject.projectName}.
    target todo: ${targetTodo.title}
    `);
  const dialog = document.createElement("dialog");
  dialog.id = "updateTodoDialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h3>Update ${targetTodo.title} todo</h3>
      <div class="todo-info-container">
        <div class="todo-info-left">
          <div>
            <label for="todo-title">Title:</label>
            <input type="text" id="todo-title" value="${targetTodo.title}" required/>
          </div>
          <div>
            <label for="due-date">Due Date:</label>
            <input type="date" value="${targetTodo.dueDate}" id="due-date" />
          </div>
          <div>
            <label for="select-priority">Select Priority: </label>
            <select id="select-priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
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
        <button type="submit" class="todo-save-btn" value="save" data-project-id="${projectId}" data-todo-id="${targetTodo.id}">Save Changes</button>
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
