import "./project.css";
import threeDots from "../../images/dots-vertical-menu.svg";

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
    <li class="project">
      <h3>General</h3>
      <p> <span>+</span> Add ToDo</p>
      <div class="menu-wrapper">
        <button class="menu-button" id="idd">
          <img src="${threeDots} "width="20px" alt="kebab menu icon, dots vertical menu" />
        </button>
        <div class="menu-options">
          <div class="menu-item rename">Rename</div>
          <div class="menu-item delete">Delete</div>
        </div>
      </div>
    </li>
    <li class="project">
      <h3>Personal</h3>
      <p> <span>+</span> Add ToDo</p>
      <button>...</button>
    </li>
  </ul>

  <dialog id="projectDialog">
    <form method="dialog">
      <h3>New Project</h3>
      <input
        type="text"
        id="projectName"
        placeholder="Enter project name"
        required
      />
      <div>
        <button type="button" class="close-btn" id="cancelBtn">Cancel</button>
        <button type="submit" class="create-btn">Create</button>
      </div>
    </form>
  </dialog>
`;

function addNewProjectElement() {
  const li = `
    <li class="project">
      <h3>Your Project Name</h3>
      <p> <span>+</span> Add ToDo</p>
      <button>...</button>
    </li>
  `;
  aside.appendChild(li);
}

export { addNewProjectElement };
