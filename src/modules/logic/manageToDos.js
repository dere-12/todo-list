import { projectsArray } from "./manageProjects.js";
import { saveProjectsToLocalStorage } from "../data/storage.js";

function getTargetProject(projectId) {
  return projectsArray.find((project) => project.id === projectId);
}

function createToDo(projectId, todoProperties) {
  const targetProject = getTargetProject(projectId);

  if (targetProject) {
    targetProject.createToDo(todoProperties);
    saveProjectsToLocalStorage(projectsArray);
  }
}

function removeToDo(projectId, todoId) {
  const targetProject = getTargetProject(projectId);

  if (targetProject) {
    const removed = targetProject.removeToDo(todoId);
    if (removed) {
      saveProjectsToLocalStorage(projectsArray);
    }
  }
}

function toggleCompletion(projectId, todoId) {
  const targetProject = getTargetProject(projectId);

  if (targetProject) {
    const targetTodo = targetProject.getToDo(todoId);
    if (targetTodo) {
      targetTodo.toggleCompletion();
      saveProjectsToLocalStorage(projectsArray);
    }
  }
}

function updatePriority(projectId, todoId, newPriority) {
  const targetProject = getTargetProject(projectId);

  if (targetProject) {
    const targetTodo = targetProject.getToDo(todoId);
    if (targetTodo) {
      targetTodo.updatePriority(newPriority);
      saveProjectsToLocalStorage(projectsArray);
    }
  }
}

function editToDo(projectId, todoId, newToDoProperties) {
  const targetProject = getTargetProject(projectId);

  if (targetProject) {
    const targetTodo = targetProject.getToDo(todoId);
    if (targetTodo) {
      targetTodo.updateToDo(newToDoProperties);
      saveProjectsToLocalStorage(projectsArray);
    }
  }
}

export {
  createToDo,
  removeToDo,
  toggleCompletion,
  updatePriority,
  editToDo,
  getTargetProject,
};
