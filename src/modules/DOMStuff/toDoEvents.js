const newTodoDialog = document.querySelector("#newTodoDialog");
const todoCancelBtn = document.querySelector("#newTodoDialog .todo-cancel-btn");

console.log("todo events js is running.");

todoCancelBtn.addEventListener("click", () => {
  newTodoDialog.close();
});

newTodoDialog.addEventListener("close", () => {
  const title = document.querySelector("#todo-title");
  title.value = "";
  console.log("Todo dialog closed.");
});
