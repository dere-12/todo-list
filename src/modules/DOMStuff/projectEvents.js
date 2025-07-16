import { getTargetProject } from "../logic/manageToDos.js";
import {
  createProject,
  removeProject,
  renameProject,
} from "../logic/manageProjects.js";
import { renderProject } from "./renderProjectElements.js";
import { renderTodo, renderLiElements } from "./renderToDoElements.js";

const newBtn = document.querySelector(".new-btn-js");
const tooltip = document.querySelector(".tooltip");
const projects = document.querySelectorAll(".projects-container");
const projectDialog = document.querySelector("#projectDialog");
const cancelBtn = document.querySelector("#projectDialog .cancel-btn");
const projectNameInput = document.querySelector("#projectName");

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
    const projectNameInputValue = projectNameInput.value;
    const name = toTitleCase(projectNameInputValue);
    createProject(name);
    renderProject();
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
    // console.log("3dots clicked");
    const projectMenuOption = kebabIcon.nextElementSibling;
    document.querySelectorAll(".menu-options").forEach((menu) => {
      if (menu !== projectMenuOption) menu.style.display = "none";
    });
    projectMenuOption.style.display =
      projectMenuOption.style.display === "flex" ? "none" : "flex";
  }

  if (e.target.classList.contains("delete")) {
    const projectId = e.target.dataset.projectId;
    // const targetProject = getTargetProject(projectId);
    // console.log(`Delete ${targetProject.projectName}`);

    removeProject(projectId);
    renderProject();
  }

  if (e.target.classList.contains("rename-option")) {
    const projectId = e.target.dataset.projectId;
    // const targetProject = getTargetProject(projectId);
    // console.log(`Rename ${targetProject.projectName}`);

    const currentRenameWrapper = document.querySelector(
      `.rename-wrapper[data-project-id="${projectId}"]`
    );
    // console.log(document.querySelectorAll(`.rename-wrapper[data-project-id]`));
    document
      .querySelectorAll(`.rename-wrapper[data-project-id]`)
      .forEach((rw) => {
        if (rw !== currentRenameWrapper) rw.style.display = "none";
      });
    currentRenameWrapper.style.display =
      currentRenameWrapper.style.display === "flex" ? "none" : "flex";

    currentRenameWrapper.firstElementChild.focus();
  }

  if (e.target.classList.contains("rename-btn")) {
    const renameWrapper = e.target.closest(".rename-wrapper");
    const projectId = e.target.dataset.projectId;
    // const targetProject = getTargetProject(projectId);
    const renameInput = renameWrapper.querySelector("#rename-input");
    const inputValue = renameInput.value;
    if (inputValue) {
      const newName = toTitleCase(inputValue);
      renameInput.value = "";
      renameWrapper.style.display = "none";
      renameProject(projectId, newName);
      renderProject();
    }
  }

  if (e.target.classList.contains("add-todo")) {
    const newTodoDialog = document.querySelector("#newTodoDialog");
    newTodoDialog.showModal();
    console.log("Add todo clicked");
  }

  if (e.target.classList.contains("project-name")) {
    const projectId = e.target.dataset.projectId;
    const targetProject = getTargetProject(projectId);
    console.log(`${targetProject.projectName} clicked.`);
    const todoArray = renderTodo(projectId);
    renderLiElements(todoArray);
  }
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim() !== "")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-wrapper")) {
    document
      .querySelectorAll(".menu-options")
      .forEach((menu) => (menu.style.display = "none"));
  }

  if (!e.target.closest(".projects-container li")) {
    document
      .querySelectorAll(".rename-wrapper[data-project-id]")
      .forEach((rw) => {
        rw.style.display = "none";
      });
  }
});
