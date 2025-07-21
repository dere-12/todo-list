class Todo {
  constructor({
    title,
    description = "",
    dueDate = null,
    creationDate = new Date(),
    priority = "Low",
    notes = "",
  }) {
    if (!title) {
      throw new Error("Todo title is required!");
    }
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.creationDate = creationDate;
    this.priority = priority;
    this.notes = notes;
    this.isCompleted = false;
    this.id = crypto.randomUUID();
  }

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateToDo({
    title = this.title,
    description = this.description,
    dueDate = this.dueDate,
    notes = this.notes,
    priority = this.priority,
  }) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.notes = notes);
    this.priority = priority;
  }
}

export default Todo;
