import {
  editToDo,
  getTargetProject,
  removeToDo,
  toggleCompletion,
  createToDo,
} from "../logic/manageToDos.js";
// import { createToDo } from "../logic/manageToDos.js";
import {
  renderEditToDoDialog,
  renderLiElements,
  renderTodo,
} from "./renderToDoElements.js";
import { parse, parseISO } from "date-fns";

function newTodoDialogEvents() {
  const newTodoDialog = document.querySelector("#newTodoDialog");
  const todoCancelBtn = document.querySelector(
    "#newTodoDialog .todo-cancel-btn"
  );

  // console.log("todo events js is running.");

  todoCancelBtn.addEventListener("click", () => {
    newTodoDialog.close();
  });

  newTodoDialog.addEventListener("close", () => {
    if (newTodoDialog.returnValue === "create") {
      const form = newTodoDialog.querySelector("form");
      const projectId =
        newTodoDialog.querySelector(".todo-create-btn").dataset.projectId;
      const targetProject = getTargetProject(projectId);

      const title = newTodoDialog.querySelector("#todo-title").value.trim();
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

      createToDo(projectId, {
        title,
        description,
        dueDate,
        priority,
        notes,
      });

      // const todoArray = renderTodo(projectId);
      renderTodo(projectId);
      renderLiElements(projectId);
      todoLiEvents();

      form.reset();
      // console.log(todoArray);
      console.log(
        `New todo created for: ${targetProject.projectName} and here it is:`
      );
      console.log(targetProject);
    }
  });
}

function todoLiEvents() {
  const todosContainer = document.querySelector(".todos-container");

  todosContainer.addEventListener("click", todoClickHandler);

  function todoClickHandler(e) {
    if (e.target.closest(".show-more-btn")) {
      console.log("3dots clicked");
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
      console.log("checkbox clicked" + checkbox);
      const projectId = e.target.closest(".todo-checkbox").dataset.projectId;
      const todoId = e.target.closest(".todo-checkbox").dataset.todoId;

      // will be implemented after local storage implementation.
      // console.log(e.target.closest(".todo-checkbox").value);
      // if (e.target.closest(".todo-checkbox").value) {
      //   toggleCompletion(projectId, todoId);
      //   // renderTodo(projectId);
      //   // renderLiElements(projectId);
      //   // todoLiEvents();
      //   // e.target.closest(".todo-checkbox").value = "on";
      // }
    }

    if (e.target.closest(".todo-edit-btn")) {
      console.log("edit clicked");
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
      console.log("delete clicked");
      console.log(`
          project id: ${projectId}
          todo id: ${todoId}
        `);
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
      console.log("change saved");
      const form = updateTodoDialog.querySelector("form");
      const projectId =
        updateTodoDialog.querySelector(".todo-save-btn").dataset.projectId;
      const todoId =
        updateTodoDialog.querySelector(".todo-save-btn").dataset.todoId;

      const title = updateTodoDialog.querySelector("#todo-title").value.trim();
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

  // update the caret position to the end of the text/todo title or name.
  const titleInput = updateTodoDialog.querySelector("#todo-title");
  if (titleInput) {
    titleInput.selectionStart = titleInput.value.length;
    titleInput.selectionEnd = titleInput.value.length;
  }
}

export { newTodoDialogEvents, todoLiEvents };
