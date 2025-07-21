import {
  editToDo,
  getTargetProject,
  removeToDo,
  toggleCompletion,
  createToDo,
} from "../logic/manageToDos.js";
import {
  renderEditToDoDialog,
  renderLiElements,
  renderTodo,
} from "./renderToDoElements.js";
import { parseISO } from "date-fns";
import { toTitleCase } from "./projectEvents.js";

function newTodoDialogEvents() {
  const newTodoDialog = document.querySelector("#newTodoDialog");
  const todoCancelBtn = document.querySelector(
    "#newTodoDialog .todo-cancel-btn"
  );
  todoCancelBtn.addEventListener("click", () => {
    newTodoDialog.close();
  });

  newTodoDialog.addEventListener("close", () => {
    if (newTodoDialog.returnValue === "create") {
      const form = newTodoDialog.querySelector("form");
      const projectId =
        newTodoDialog.querySelector(".todo-create-btn").dataset.projectId;
      const targetProject = getTargetProject(projectId);

      let title = newTodoDialog.querySelector("#todo-title").value.trim();
      const description = newTodoDialog
        .querySelector("#short-desc")
        .value.trim();
      let dueDate = newTodoDialog.querySelector("#due-date").value.trim();
      if (dueDate) {
        dueDate = parseISO(dueDate);
      } else {
        dueDate = null;
      }
      const priority = newTodoDialog
        .querySelector("#select-priority")
        .value.trim();
      const notes = newTodoDialog.querySelector("#todo-note").value.trim();

      if (title === "") {
        alert("Todo title cannot be empty!");
        return;
      }

      title = toTitleCase(title);
      createToDo(projectId, {
        title,
        description,
        dueDate,
        priority,
        notes,
      });

      renderTodo(projectId);
      renderLiElements(projectId);
      todoLiEvents();

      form.reset();
    }
  });
}

function todoLiEvents() {
  const todosContainer = document.querySelector(".todos-container");

  todosContainer.addEventListener("click", todoClickHandler);

  function todoClickHandler(e) {
    if (e.target.closest(".show-more-btn")) {
      const todoMoreParent = e.target.closest(".todo");
      const currentTodoMore = todoMoreParent.nextElementSibling;
      document.querySelectorAll(".todo-more").forEach((todoMore) => {
        if (todoMore !== currentTodoMore) todoMore.style.display = "none";
      });
      currentTodoMore.style.display =
        currentTodoMore.style.display === "flex" ? "none" : "flex";
    }

    if (e.target.closest(".todo-checkbox")) {
      const checkbox = e.target.closest(".todo-checkbox");
      const projectId = e.target.closest(".todo-checkbox").dataset.projectId;
      const todoId = e.target.closest(".todo-checkbox").dataset.todoId;

      toggleCompletion(projectId, todoId);
      const targetProject = getTargetProject(projectId);
      const targetTodo = targetProject.getToDo(todoId);

      if (targetTodo) {
        const todoListItem = checkbox.closest(".todo-list-item");
        const todoTitlePara = todoListItem.querySelector(".todo-left p");
        const completionStatusPara =
          todoListItem.querySelector("#completion-para");

        if (targetTodo.isCompleted) {
          todoTitlePara.classList.add("completed-todo-title");
          completionStatusPara.textContent = "Completed";
          checkbox.checked = true;
        } else {
          todoTitlePara.classList.remove("completed-todo-title");
          completionStatusPara.textContent = "Not Completed";
          checkbox.checked = false;
        }
      }
    }

    if (e.target.closest(".todo-edit-btn")) {
      const projectId = e.target.closest(".todo-edit-btn").dataset.projectId;
      const todoId = e.target.closest(".todo-edit-btn").dataset.todoId;
      const previousNewTodoDialog = document.querySelector("#updateTodoDialog");
      if (previousNewTodoDialog) {
        document.body.removeChild(previousNewTodoDialog);
      }

      renderEditToDoDialog(projectId, todoId);
      updateTodoDialogEvents();
      const updateTodoDialog = document.querySelector("#updateTodoDialog");
      updateTodoDialog.showModal();
    }

    if (e.target.closest(".todo-delete-btn")) {
      const projectId = e.target.closest(".todo-delete-btn").dataset.projectId;
      const todoId = e.target.closest(".todo-delete-btn").dataset.todoId;
      removeToDo(projectId, todoId);
      renderTodo(projectId);
      renderLiElements(projectId);
      todoLiEvents();
    }
  }
}

function updateTodoDialogEvents() {
  const updateTodoDialog = document.querySelector("#updateTodoDialog");
  const discardChangesBtn = document.querySelector(
    "#updateTodoDialog .todo-discard-btn"
  );

  discardChangesBtn.addEventListener("click", () => {
    updateTodoDialog.close();
  });

  updateTodoDialog.addEventListener("close", () => {
    if (updateTodoDialog.returnValue === "save") {
      const projectId =
        updateTodoDialog.querySelector(".todo-save-btn").dataset.projectId;
      const todoId =
        updateTodoDialog.querySelector(".todo-save-btn").dataset.todoId;

      let title = updateTodoDialog.querySelector("#todo-title").value.trim();
      const description = updateTodoDialog
        .querySelector("#short-desc")
        .value.trim();
      let dueDate = updateTodoDialog.querySelector("#due-date").value.trim();
      if (dueDate) {
        dueDate = parseISO(dueDate);
      } else {
        dueDate = null;
      }
      const priority = updateTodoDialog
        .querySelector("#select-priority")
        .value.trim();
      const notes = updateTodoDialog.querySelector("#todo-note").value.trim();

      if (title === "") {
        alert("Todo title cannot be empty!");
        return;
      }

      title = toTitleCase(title);
      editToDo(projectId, todoId, {
        title,
        description,
        dueDate,
        priority,
        notes,
      });

      renderTodo(projectId);
      renderLiElements(projectId);
      todoLiEvents();
    }
  });

  const titleInput = updateTodoDialog.querySelector("#todo-title");
  if (titleInput) {
    titleInput.selectionStart = titleInput.value.length;
    titleInput.selectionEnd = titleInput.value.length;
  }
}

export { newTodoDialogEvents, todoLiEvents };
