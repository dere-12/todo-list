import "./style.css";
import { renderProject } from "./modules/DOMStuff/renderProjectElements.js";
import "./modules/DOMStuff/projectEvents.js";
import { loadProjectsFromLocalStorage } from "./modules/data/storage.js";
import { projectsArray } from "./modules/logic/manageProjects.js";
import { createProject } from "./modules/logic/manageProjects.js";
import { createToDo } from "./modules/logic/manageToDos.js";
import { todoLiEvents } from "./modules/DOMStuff/toDoEvents.js";
import {
  renderLiElements,
  renderTodo,
} from "./modules/DOMStuff/renderToDoElements.js";

console.log("Webpack is Working!");

function initializeApp() {
  const loadedProjects = loadProjectsFromLocalStorage();

  if (loadedProjects.length > 0) {
    projectsArray.splice(0, projectsArray.length, ...loadedProjects);
    const defaultProjectOneId = projectsArray[0].id;
    renderTodo(defaultProjectOneId);
    renderLiElements(defaultProjectOneId);
    todoLiEvents();

    console.log("App initialized with loaded projects:", projectsArray);
  } else {
    console.log("No projects loaded, creating default projects.");
    createProject("General");

    if (projectsArray.length > 0) {
      const defaultProjectOneId = projectsArray[0].id;
      const dueDate = new Date();

      createToDo(defaultProjectOneId, {
        title: "Check Your Inbox",
        description: "Clear out new emails and respond to urgent messages.",
        priority: "Low",
      });
      createToDo(defaultProjectOneId, {
        title: "Morning Stretch Routine",
        description:
          "Start each morning with a 15-minute full-body stretch routine",
        notes: "Use exercise app for guidance and adjust stretches as needed",
        priority: "Medium",
        dueDate,
      });

      renderTodo(defaultProjectOneId);
      renderLiElements(defaultProjectOneId);
      todoLiEvents();
    }
  }
  renderProject();
}

initializeApp();
