import Project from "../project/project.js";

let projectsArray = [];

function createProject(projectName) {
  const project = new Project(projectName);

  projectsArray.push(project);
}

function removeProject(projectId) {
  projectsArray = projectsArray.filter((project) => project.id !== projectId);
}

function renameProject(projectId, newName) {
  const targetProject = projectsArray.find(
    (project) => project.id === projectId
  );

  const updatedProjectName = targetProject.renameProject(newName);
  return updatedProjectName;
}

export { createProject, removeProject, renameProject, projectsArray };
