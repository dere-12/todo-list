class Todo {
  constructor({
    title,
    description = "",
    dueDate = null,
    creationDate, // should be default to current date, will be fixed using date-fns library.
    priority = "low",
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
  }) {
    (this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.notes = notes);
  }
}

export default Todo;
