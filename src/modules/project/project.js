import Todo from "../todo/todo.js";

class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.id = crypto.randomUUID();
    this.todosArray = [];
  }

  createToDo(todoProperties) {
    if (!todoProperties || !todoProperties.title) {
      console.warn("Attempted to add a todo without a title. Aborting.");
      return;
    }

    const todo = new Todo(todoProperties);

    this.todosArray.push(todo);
  }

  // Note: projectName is used instead of projectId for testing purpose only. It will be replaced back to projectId.

  removeToDo(todoId) {
    const initialLength = this.todosArray.length;
    this.todosArray = this.todosArray.filter((todo) => todo.title !== todoId);
    return this.todosArray.length < initialLength;
  }

  getToDo(todoId) {
    return this.todosArray.find((todo) => todo.title === todoId);
  }

  renameProject(newName) {
    return (this.projectName = newName);
  }
}

export default Project;
