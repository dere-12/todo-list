import Project from "../project/project.js";
import { saveProjectsToLocalStorage } from "../data/storage.js";

export let projectsArray = [];

function createProject(projectName) {
  const project = new Project(projectName);

  projectsArray.push(project);

  saveProjectsToLocalStorage(projectsArray);
}

function removeProject(projectId) {
  const initialLength = projectsArray.length;
  projectsArray = projectsArray.filter((project) => project.id !== projectId);

  if (projectsArray.length < initialLength) {
    saveProjectsToLocalStorage(projectsArray);
  }
}

function renameProject(projectId, newName) {
  const targetProject = projectsArray.find(
    (project) => project.id === projectId
  );

  if (targetProject) {
    const updatedProjectName = targetProject.renameProject(newName);
    saveProjectsToLocalStorage(projectsArray);
    return updatedProjectName;
  }

  return null;
}

export { createProject, removeProject, renameProject };
