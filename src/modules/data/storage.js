import Project from "../project/project.js";
import Todo from "../todo/todo.js";
import { parseISO } from "date-fns";

const STORAGE_KEY = "todoAppProjects";

// @para projects - array of Project objects or simply projectsArray
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

    // Re-hydrate the objects: plain JS objects back/restore into class instances
    const hydratedProjects = parsedData.map((projectData) => {
      const newProject = new Project(projectData.projectName);
      newProject.id = projectData.id;

      // Re-hydrate todos within this project
      newProject.todosArray = projectData.todosArray.map((todoData) => {
        const newTodo = new Todo({
          title: todoData.title,
          description: todoData.description,
          dueDate: todoData.dueDate ? parseISO(todoData.dueDate) : null, // Convert date string back to Date object
          creationDate: parseISO(todoData.creationDate), // Convert date string back to Date object
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
