import { projectsArray } from "../logic/manageProjects.js";
import { getTargetProject } from "../logic/manageToDos.js";

const newBtn = document.querySelector(".new-btn-js");
const tooltip = document.querySelector(".tooltip");
const projects = document.querySelectorAll(".projects-container");

newBtn.addEventListener("mouseenter", () => {
  tooltip.style.visibility = "visible";
});

newBtn.addEventListener("mouseleave", () => {
  tooltip.style.visibility = "hidden";
});

newBtn.addEventListener("click", newBtnHandler);

function newBtnHandler() {
  console.log("new btn clicked");
}

projects.forEach((project) => {
  project.addEventListener("click", projectClickHandler);
});

function projectClickHandler(e) {
  const kebabIcon = e.target.closest(".menu-button");
  if (kebabIcon) {
    console.log("3dots clicked");
    const projectMenuOption = kebabIcon.nextElementSibling;
    document.querySelectorAll(".menu-options").forEach((menu) => {
      if (menu !== projectMenuOption) menu.style.display = "none";
    });
    projectMenuOption.style.display =
      projectMenuOption.style.display === "flex" ? "none" : "flex";
  }

  if (e.target.classList.contains("delete")) {
    const projectId = e.target.dataset.projectId;
    const targetProject = getTargetProject(projectId);
    console.log(`Delete ${targetProject.projectName}`);
  }

  if (e.target.classList.contains("rename")) {
    const projectId = e.target.dataset.projectId;
    const targetProject = getTargetProject(projectId);
    console.log(`Rename ${targetProject.projectName}`);
  }

  if (e.target.classList.contains("project-name")) {
    const projectId = e.target.dataset.projectId;
    const targetProject = getTargetProject(projectId);
    console.log(`${targetProject.projectName} clicked.`);
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-wrapper")) {
    document
      .querySelectorAll(".menu-options")
      .forEach((m) => (m.style.display = "none"));
  }
});
