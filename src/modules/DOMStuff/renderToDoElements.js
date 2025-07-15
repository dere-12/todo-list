import "./toDo.css";
import { getTargetProject } from "../logic/manageToDos.js";

const main = document.querySelector("main");

function renderTodo(projectId) {
  const targetProject = getTargetProject(projectId);
  const todoArray = targetProject.todosArray;

  main.innerHTML = `
  <h3 class="todo-project-name">${targetProject.projectName}</h3>
  <ul class="todos-container">
    <li>
      <div class="todo">
        <div class="todo-left">
          <input type="checkbox" id="checkbox"/>
          <p>Todo Title</p>
        </div>
        <div class="todo-right">
          <p>Priority</p>
          <p>dueDate</p>
          <button>More</button>
        </div>
      </div>
      <div class="todo-more">
        <p>Todo Description</p>
        <p>Creation Date</p>
        <p>Completed or not</p>
        <p>Note</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
    <li>
      <div class="todo">
        <div class="todo-left">
          <input type="checkbox" id="checkbox"/>
          <p>Todo Title</p>
        </div>
        <div class="todo-right">
          <p>Priority</p>
          <p>dueDate</p>
          <button>More</button>
        </div>
      </div>
    </li>
    <li>
      <div class="todo">
        <div class="todo-left">
          <input type="checkbox" id="checkbox"/>
          <p>Todo Title</p>
        </div>
        <div class="todo-right">
          <p>Priority</p>
          <p>dueDate</p>
          <button>More</button>
        </div>
      </div>
    </li>
  </ul>
  `;
}

function renderLiElements(todoArray) {
  // for loop ...
  const li = document.createElement("li");
  const todosContainer = document.querySelector(".todos-container");
  li.className = "todo";
  li.innerHTML = `
      <div>
        <input type="checkbox" id="checkbox"/>
        <div>
          Todo Title
        </div>
      </div>
    `;
  todosContainer.appendChild(li);
}

export { renderTodo };
