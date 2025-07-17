import "./project.css";
import threeDots from "../../images/dots-vertical-menu.svg";
import { projectsArray } from "../logic/manageProjects.js";

const aside = document.querySelector("aside");

aside.innerHTML = `
  <div class="project-title">
      <div class="title">
        <h2>My Projects</h2>
        <button class="new-button new-btn-js"><span>+</span> New</button>
      </div>
      <span class="tooltip">Create New Project</span>
  </div>
  <ul class="projects-container">

  </ul>
`;

function renderProject() {
  document.querySelector(".projects-container").innerHTML = "";
  projectsArray.forEach((project) => {
    const projectsContainer = document.querySelector(".projects-container");
    const li = document.createElement("li");
    li.className = "project";
    // li.dataset.projectId = project.id;
    li.innerHTML = `
        <h3 class="project-name" data-project-id="${project.id}">${project.projectName}</h3>
        <p class="add-todo" data-project-id="${project.id}"><span>+</span>Add ToDo</p>
        <div class="menu-wrapper">
          <button class="menu-button">
            <img src="${threeDots}" width="20px" alt="kebab menu icon, dots vertical menu" />
          </button>
          <div class="menu-options">
            <div class="menu-item rename-option" data-project-id="${project.id}">Rename</div>
            <div class="menu-item delete" data-project-id="${project.id}">Delete</div>
          </div>
        </div>
        <div class="rename-wrapper" data-project-id="${project.id}">
          <input type="text" id="rename-input" placeholder="Rename Your Project" data-project-id="${project.id}" />
          <button class="rename-btn" data-project-id="${project.id}">Rename</button>
        </div>
    `;
    projectsContainer.appendChild(li);
  });
}

function renderNewProjectDialog() {
  // console.log("rnpd fn triggered");
  const dialog = document.createElement("dialog");
  dialog.id = "projectDialog";
  dialog.innerHTML = `
  <form method="dialog">
      <h3>New Project</h3>
      <input
        type="text"
        id="projectName"
        placeholder="Enter project name"
        required
      />
      <div>
        <button type="button" class="cancel-btn" value="cancel">Cancel</button>
        <button type="submit" class="create-btn" value="create">Create</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
}
renderNewProjectDialog();

export { renderProject };
