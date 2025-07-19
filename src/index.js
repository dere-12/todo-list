import "./style.css";
import { renderProject } from "./modules/DOMStuff/renderProjectElements.js";
import "./modules/DOMStuff/projectEvents.js";
// import "./modules/DOMStuff/toDoEvents.js";
import { loadProjectsFromLocalStorage } from "./modules/data/storage.js";
import { projectsArray } from "./modules/logic/manageProjects.js";
import {
  createProject,
  renameProject,
  removeProject,
} from "./modules/logic/manageProjects.js";
import {
  createToDo,
  removeToDo,
  toggleCompletion,
  updatePriority,
  editToDo,
} from "./modules/logic/manageToDos.js";
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
    console.log("App initialized with loaded projects:", projectsArray);
  } else {
    console.log("No projects loaded, creating default projects.");
    createProject("General");
    createProject("Personal");
  }

  if (projectsArray.length > 0) {
    const defaultProjectOneId = projectsArray[0].id;
    createToDo(defaultProjectOneId, {
      title: "Morning Stretch Routine",
      description:
        "Start each morning with a 15-minute full-body stretch routine",
      duDate: new Date(),
      notes: "Use a yoga app for guidance and adjust stretches as needed",
      priority: "medium",
    });

    renderTodo(defaultProjectOneId);
    renderLiElements(defaultProjectOneId);
    todoLiEvents();
  }

  renderProject();
}

initializeApp();

// const proj1 = createProject("xoGame");
// const proj2 = createProject("personal");
// const proj3 = createProject("general");

// test: project rename and remove project methods functionality.
// renameProject("xoGame", "3T-G");
// removeProject("3T-G");

// test: create todo for personal project
// createToDo("personal", {
//   title: "personal-todo-title1",
//   description: "personal-desc",
//   priority: "high",
// });
// createToDo("personal", {
//   title: "personal-todo-title2",
//   description: "personal-desc",
//   priority: "low",
// });

// test: create todo for general project
// createToDo("general", {
//   title: "general-todo-title1",
//   description: "general-desc",
//   priority: "high",
// });
// createToDo("general", {
//   title: "general-todo-title2",
//   description: "general-desc",
//   priority: "low",
// });

// test: remove a todo from specified project
// removeToDo("personal", "personal-todo-title2");

// test: toggle completion of specific todo of specific project
// toggleCompletion("personal", "personal-todo-title1");

// test: update priority of specific todo of specific project
// updatePriority("personal", "personal-todo-title1", "intermediate");
// updatePriority("general", "general-todo-title2", "intermediate");

// test: update properties of specific todo of specific project
// editToDo("general", "general-todo-title1", {
//   title: "gen-tit-one",
//   dueDate: "12",
//   notes: "nb: ls",
//   description: "short description",
// });
// editToDo("personal", "personal-todo-title1", {
//   dueDate: "11",
// });

// console.log(projectsArray);
