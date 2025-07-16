import "./toDo.css";
import threeDots from "../../images/dots-vertical-menu.svg";
import editIcon from "../../images/pencil.svg";
import deleteIcon from "../../images/trash-can.svg";
import { getTargetProject } from "../logic/manageToDos.js";

const main = document.querySelector("main");

function renderTodo(projectId) {
  const targetProject = getTargetProject(projectId);
  const todoArray = targetProject.todosArray;

  main.innerHTML = `
  <h3 class="todo-project-name">${targetProject.projectName}</h3>
  <ul class="todos-container">

  </ul>
  `;

  return "todo Array";
}

function renderLiElements(todoArray) {
  // for loop ...
  const todosContainer = document.querySelector(".todos-container");
  const li = document.createElement("li");
  console.log(todosContainer);
  console.log(todoArray + ". Received!");
  // li.className = "todo";
  li.innerHTML = `
      <div class="todo">
        <div class="todo-left">
          <input type="checkbox" id="checkbox"/>
          <p>Todo Title</p>
        </div>
        <div class="todo-right">
          <p>Priority</p>
          <p>dueDate</p>
          <button class="show-more-btn"><img src="${threeDots}" width="20px" alt="kebab menu icon, dots vertical menu" /></button>
        </div>
      </div>
      <div class="todo-more">
        <div class="desc">
          <h4>Description</h4>
          <p>
            My todo description goes here..
            My todo description goes here..
            My todo description goes here..
          </p>
        </div>
        <div>
          <h4>Creation Date</h4>
          <p>dd/mm/yy</p>
        </div>
        <div>
          <h4>Completion</h4>
          <p>Not completed</p>
        </div>
        <div class="notes">
          <h4>Note</h4>
          <p>
            My todo note goes here...
            My todo note goes here...
            My todo note goes here...
          </p>
        </div>
        <div class="btns">
          <button class="todo-edit-btn">
            <img src="${editIcon}" width="16px" alt="pencil svg, edit icon" /> <span>Edit</span>
          </button>
        </div>
        <div class="btns">
          <button class="todo-delete-btn">
            <img src="${deleteIcon}" width="16px" alt="trash can svg, delete icon" /> <span>Delete</span>
          </button>
        </div>
      </div>
    `;
  todosContainer.appendChild(li);
  // return li;
}

export { renderTodo, renderLiElements };

// <li>
//       <div class="todo">
//         <div class="todo-left">
//           <input type="checkbox" id="checkbox"/>
//           <p>Todo Title</p>
//         </div>
//         <div class="todo-right">
//           <p>Priority</p>
//           <p>dueDate</p>
//           <button class="show-more-btn"><img src="${threeDots}" width="20px" alt="kebab menu icon, dots vertical menu" /></button>
//         </div>
//       </div>
//       <div class="todo-more">
//         <div class="desc">
//           <h4>Description</h4>
//           <p>
//             My todo description goes here..
//             My todo description goes here..
//             My todo description goes here..
//           </p>
//         </div>
//         <div>
//           <h4>Creation Date</h4>
//           <p>dd/mm/yy</p>
//         </div>
//         <div>
//           <h4>Completion</h4>
//           <p>Not completed</p>
//         </div>
//         <div class="notes">
//           <h4>Note</h4>
//           <p>
//             My todo note goes here...
//             My todo note goes here...
//             My todo note goes here...
//           </p>
//         </div>
//         <div class="btns">
//           <button class="todo-edit-btn">
//             <img src="${editIcon}" width="16px" alt="pencil svg, edit icon" /> <span>Edit</span>
//           </button>
//         </div>
//         <div class="btns">
//           <button class="todo-delete-btn">
//             <img src="${deleteIcon}" width="16px" alt="trash can svg, delete icon" /> <span>Delete</span>
//           </button>
//         </div>
//       </div>
//     </li>
//     <li>
//       <div class="todo">
//         <div class="todo-left">
//           <input type="checkbox" id="checkbox"/>
//           <p>Todo Title-2</p>
//         </div>
//         <div class="todo-right">
//           <p>Priority-2</p>
//           <p>dueDate-2</p>
//           <button class="show-more-btn"><img src="${threeDots}" width="20px" alt="kebab menu icon, dots vertical menu" /></button>
//         </div>
//       </div>
//       <div class="todo-more">
//         <div class="desc">
//           <h4>Description</h4>
//           <p>
//             My todo description goes here..
//             My todo description goes here..
//             My todo description goes here..
//           </p>
//         </div>
//         <div>
//           <h4>Creation Date</h4>
//           <p>dd/mm/yy</p>
//         </div>
//         <div>
//           <h4>Completion</h4>
//           <p>Not completed</p>
//         </div>
//         <div class="notes">
//           <h4>Note</h4>
//           <p>
//             My todo note goes here...
//             My todo note goes here...
//             My todo note goes here...
//           </p>
//         </div>
//         <div class="btns">
//           <button class="todo-edit-btn">
//             <img src="${editIcon}" width="16px" alt="pencil svg, edit icon" /> <span>Edit</span>
//           </button>
//         </div>
//         <div class="btns">
//           <button class="todo-delete-btn">
//             <img src="${deleteIcon}" width="16px" alt="trash can svg, delete icon" /> <span>Delete</span>
//           </button>
//         </div>
//       </div>
//     </li>
//     <li>
//       <div class="todo">
//         <div class="todo-left">
//           <input type="checkbox" id="checkbox"/>
//           <p>Todo Title</p>
//         </div>
//         <div class="todo-right">
//           <p>Priority</p>
//           <p>dueDate</p>
//           <button>More</button>
//         </div>
//       </div>
//     </li>
