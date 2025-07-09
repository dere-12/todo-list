import Todo from "../todo/todo.js";

class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = crypto.randomUUID();
    this.todosArray = [];
  }

  addToDo(todoProperties) {
    if (!todoProperties || !todoProperties.title) {
      console.warn("Attempted to add a todo without a title. Aborting.");
      return;
    }

    const todo = new Todo(todoProperties);

    this.todosArray.push(todo);
  }
}

export default Project;
