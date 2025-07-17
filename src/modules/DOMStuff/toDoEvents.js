import { getTargetProject } from "../logic/manageToDos.js";
import { createToDo } from "../logic/manageToDos.js";
import { renderLiElements, renderTodo } from "./renderToDoElements.js";

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

      const todoArray = renderTodo(projectId);
      renderLiElements(todoArray);
      todoLiEvents();

      form.reset();
      console.log(todoArray);
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
    }

    if (e.target.closest(".todo-edit-btn")) {
      console.log("edit clicked");
    }

    if (e.target.closest(".todo-delete-btn")) {
      console.log("delete clicked");
    }
  }
}

export { newTodoDialogEvents, todoLiEvents };
