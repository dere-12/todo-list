import { getTargetProject } from "../logic/manageToDos.js";
import {
  createProject,
  removeProject,
  renameProject,
} from "../logic/manageProjects.js";
import {
  renderProject,
  renderNewProjectDialog,
} from "./renderProjectElements.js";
import {
  renderTodo,
  renderLiElements,
  renderAddToDoDialog,
} from "./renderToDoElements.js";
import { newTodoDialogEvents, todoLiEvents } from "./toDoEvents.js";

const newBtn = document.querySelector(".new-btn-js");
const tooltip = document.querySelector(".tooltip");
const projects = document.querySelector(".projects-container");

newBtn.addEventListener("mouseenter", () => {
  tooltip.style.visibility = "visible";
});

newBtn.addEventListener("mouseleave", () => {
  tooltip.style.visibility = "hidden";
});

newBtn.addEventListener("click", newBtnHandler);

function newProjectDialogEvents() {
  const projectDialog = document.querySelector("#projectDialog");
  const cancelBtn = document.querySelector("#projectDialog .cancel-btn");

  cancelBtn.addEventListener("click", () => {
    projectDialog.close();
  });

  projectDialog.addEventListener("close", () => {
    if (projectDialog.returnValue === "create") {
      const projectNameInputValue = projectDialog
        .querySelector("#projectName")
        .value.trim();
      const name = toTitleCase(projectNameInputValue);
      createProject(name);
      renderProject();
    }
  });
}

function newBtnHandler() {
  const previousProjectDialog = document.querySelector("#projectDialog");
  if (previousProjectDialog) {
    document.body.removeChild(previousProjectDialog);
  }

  renderNewProjectDialog();
  newProjectDialogEvents();

  const projectDialog = document.querySelector("#projectDialog");
  projectDialog.showModal();
}

projects.addEventListener("click", projectClickHandler);

function projectClickHandler(e) {
  const kebabIcon = e.target.closest(".menu-button");
  if (kebabIcon) {
    const projectMenuOption = kebabIcon.nextElementSibling;
    document.querySelectorAll(".menu-options").forEach((menu) => {
      if (menu !== projectMenuOption) menu.style.display = "none";
    });
    projectMenuOption.style.display =
      projectMenuOption.style.display === "flex" ? "none" : "flex";
  }

  if (e.target.classList.contains("delete")) {
    const projectId = e.target.dataset.projectId;
    const main = document.querySelector("main");

    removeProject(projectId);
    renderProject();
    main.innerHTML = "";
  }

  if (e.target.classList.contains("rename-option")) {
    const projectId = e.target.dataset.projectId;

    const currentRenameWrapper = document.querySelector(
      `.rename-wrapper[data-project-id="${projectId}"]`
    );
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
    const renameInput = renameWrapper.querySelector("#rename-input");
    const inputValue = renameInput.value;
    if (inputValue) {
      const newName = toTitleCase(inputValue);
      renameInput.value = "";
      renameWrapper.style.display = "none";
      renameProject(projectId, newName);
      renderProject();
      renderTodo(projectId);
      renderLiElements(projectId);
      todoLiEvents();
    }
  }

  if (e.target.classList.contains("add-todo")) {
    const projectId = e.target.dataset.projectId;
    const targetProject = getTargetProject(projectId);
    const previousNewTodoDialog = document.querySelector("#newTodoDialog");
    if (previousNewTodoDialog) {
      document.body.removeChild(previousNewTodoDialog);
    }
    renderAddToDoDialog(targetProject);
    newTodoDialogEvents();
    const newTodoDialog = document.querySelector("#newTodoDialog");
    newTodoDialog.showModal();
  }

  if (e.target.classList.contains("project-name")) {
    const projectId = e.target.dataset.projectId;
    renderTodo(projectId);
    renderLiElements(projectId);
    todoLiEvents();
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

  if (!e.target.closest(".todos-container li")) {
    document.querySelectorAll(".todo-more").forEach((tm) => {
      tm.style.display = "none";
    });
  }
});

export { toTitleCase };
