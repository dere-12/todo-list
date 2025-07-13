import { projectsArray } from "../logic/manageProjects.js";
import { getTargetProject } from "../logic/manageToDos.js";
import { createProject, removeProject } from "../logic/manageProjects.js";
import { renderProject } from "./renderProjectElements.js";

const newBtn = document.querySelector(".new-btn-js");
const tooltip = document.querySelector(".tooltip");
const projects = document.querySelectorAll(".projects-container");
const projectDialog = document.querySelector("#projectDialog");
const cancelBtn = document.querySelector("#projectDialog .cancel-btn");
const projectNameInput = document.querySelector("#projectName");
// const renameInput = document.querySelector("#rename-input");

newBtn.addEventListener("mouseenter", () => {
  tooltip.style.visibility = "visible";
});

newBtn.addEventListener("mouseleave", () => {
  tooltip.style.visibility = "hidden";
});

newBtn.addEventListener("click", newBtnHandler);

cancelBtn.addEventListener("click", () => {
  projectNameInput.value = "";
  projectDialog.close();
});

projectDialog.addEventListener("close", () => {
  if (
    projectDialog.returnValue === "create" &&
    projectDialog.returnValue !== ""
  ) {
    const name = projectNameInput.value.trim();
    if (name) {
      createProject(name);
      renderProject();
    }
  }

  projectNameInput.value = "";
});

function newBtnHandler() {
  console.log("new btn clicked");
  projectNameInput.value = "";
  projectDialog.showModal();
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

    removeProject(projectId);
    renderProject();
  }

  if (e.target.classList.contains("rename")) {
    const projectId = e.target.dataset.projectId;
    const targetProject = getTargetProject(projectId);
    console.log(`Rename ${targetProject.projectName}`);

    const currentRenameWrapper = document.querySelector(
      `.rename-wrapper[data-project-id="${projectId}"]`
    );
    currentRenameWrapper.style.display =
      currentRenameWrapper.style.display === "flex" ? "none" : "flex";
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
      .forEach((menu) => (menu.style.display = "none"));
  }
});
