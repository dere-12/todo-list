import { projectsArray } from "./manageProjects.js";

// Note: projectName is used instead of projectId for testing purpose only. It will be replaced back to projectId.

function getTargetProject(projectId) {
  return projectsArray.find((project) => project.id === projectId);
}

function createToDo(projectId, todoProperties) {
  const targetProject = getTargetProject(projectId);
  targetProject.createToDo(todoProperties);
}

function removeToDo(projectId, todoId) {
  const targetProject = getTargetProject(projectId);
  targetProject.removeToDo(todoId);
}

function toggleCompletion(projectId, todoId) {
  const targetProject = getTargetProject(projectId);
  const targetTodo = targetProject.getToDo(todoId);
  targetTodo.toggleCompletion();
}

function updatePriority(projectId, todoId, newPriority) {
  const targetProject = getTargetProject(projectId);
  const targetTodo = targetProject.getToDo(todoId);
  targetTodo.updatePriority(newPriority);
}

function editToDo(projectId, todoId, newToDoProperties) {
  const targetProject = getTargetProject(projectId);
  const targetTodo = targetProject.getToDo(todoId);
  targetTodo.updateToDo(newToDoProperties);
}

export { createToDo, removeToDo, toggleCompletion, updatePriority, editToDo };
