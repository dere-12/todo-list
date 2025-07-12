import "./project.css";
import threeDots from "../../images/dots-vertical-menu.svg";
import { projectsArray } from "../logic/manageProjects.js";
// import "./projectEvents.js";

const aside = document.querySelector("aside");

aside.innerHTML = `
  <div class="project-title">
      <div class="title">
        <h2>My Projects</h2>
        <button class="new-button new-btn-js">+ New</button>
      </div>
      <span class="tooltip">Create New Project</span>
  </div>
  <ul class="projects-container">

  </ul>
`;

function renderProject() {
  projectsArray.forEach((project) => {
    const projectsContainer = document.querySelector(".projects-container");
    const li = document.createElement("li");
    li.className = "project";
    // li.dataset.projectId = project.id;
    li.innerHTML = `
        <h3 class="project-name" data-project-id="${project.id}">${project.projectName}</h3>
        <p> <span>+</span> Add ToDo</p>
        <div class="menu-wrapper">
          <button class="menu-button">
            <img src="${threeDots} "width="20px" alt="kebab menu icon, dots vertical menu" />
          </button>
          <div class="menu-options">
            <div class="menu-item rename" data-project-id="${project.id}">Rename</div>
            <div class="menu-item delete" data-project-id="${project.id}">Delete</div>
          </div>
        </div>
    `;
    projectsContainer.appendChild(li);
  });
}

function addNewProjectElement() {
  const projectsContainer = document.querySelector(".projects-container");
  const li = document.createElement("li");
  //   li inside li???? this function may no longer use.
  li.innerHTML = `
    <li class="project">
      <h3>General</h3>
      <p> <span>+</span> Add ToDo</p>
      <div class="menu-wrapper">
        <button class="menu-button">
          <img src="${threeDots} "width="20px" alt="kebab menu icon, dots vertical menu" />
        </button>
        <div class="menu-options">
          <div class="menu-item rename">Rename</div>
          <div class="menu-item delete">Delete</div>
        </div>
      </div>
    </li>
  `;
  projectsContainer.appendChild(li);
}

function renderDialogElement() {
  // <dialog id="projectDialog">
  //   <form method="dialog">
  //     <h3>New Project</h3>
  //     <input
  //       type="text"
  //       id="projectName"
  //       placeholder="Enter project name"
  //       required
  //     />
  //     <div>
  //       <button type="button" class="close-btn" id="cancelBtn">
  //         Cancel
  //       </button>
  //       <button type="submit" class="create-btn">
  //         Create
  //       </button>
  //     </div>
  //   </form>
  // </dialog>;
}

export { renderProject };
