import Project from "../project/project.js";
import Todo from "../todo/todo.js";
import { parseISO } from "date-fns";

const STORAGE_KEY = "todoAppProjects";

function saveProjectsToLocalStorage(projects) {
  try {
    const jsonString = JSON.stringify(projects);
    localStorage.setItem(STORAGE_KEY, jsonString);
    console.log("Projects saved to localStorage.");
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

function loadProjectsFromLocalStorage() {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY);
    if (jsonString === null) {
      console.log("No projects found in localStorage. Returning empty array.");
      return [];
    }

    const parsedData = JSON.parse(jsonString);
    console.log("Projects loaded from localStorage.");

    const hydratedProjects = parsedData.map((projectData) => {
      const newProject = new Project(projectData.projectName);
      newProject.id = projectData.id;

      newProject.todosArray = projectData.todosArray.map((todoData) => {
        const newTodo = new Todo({
          title: todoData.title,
          description: todoData.description,
          dueDate: todoData.dueDate ? parseISO(todoData.dueDate) : null,
          creationDate: parseISO(todoData.creationDate),
          priority: todoData.priority,
          notes: todoData.notes,
        });
        newTodo.isCompleted = todoData.isCompleted;
        newTodo.id = todoData.id;
        return newTodo;
      });
      return newProject;
    });
    return hydratedProjects;
  } catch (error) {
    console.error("Error loading or parsing from localStorage:", error);
    return [];
  }
}

export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage };
