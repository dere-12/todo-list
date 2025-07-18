import {
  getTargetProject,
  removeToDo,
  toggleCompletion,
} from "../logic/manageToDos.js";
import { createToDo } from "../logic/manageToDos.js";
import {
  renderEditToDoDialog,
  renderLiElements,
  renderTodo,
} from "./renderToDoElements.js";

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

      const title = newTodoDialog.querySelector("#todo-title").value;
      const description = newTodoDialog.querySelector("#short-desc").value;
      const dueDate = newTodoDialog.querySelector("#due-date").value;
      const priority = newTodoDialog.querySelector("#select-priority").value;
      const notes = newTodoDialog.querySelector("#todo-note").value;

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
      console.log("checkbox clicked");
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
      const targetTodo = e.target.closest(".todo-edit-btn").dataset.todo;

      renderEditToDoDialog(projectId, targetTodo);
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

// function updateTodoDialogEvents() {}

export { newTodoDialogEvents, todoLiEvents };
