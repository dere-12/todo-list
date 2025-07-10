import Project from "../project/project.js";

let projectsArray = [];

function createProject(projectName) {
  const project = new Project(projectName);

  projectsArray.push(project);
}

// Note: projectName is used instead of projectId for testing purpose only. It will be replaced back to projectId.

function removeProject(projectId) {
  projectsArray = projectsArray.filter(
    (project) => project.projectName !== projectId
  );
}

function renameProject(projectId, newName) {
  const targetProject = projectsArray.find(
    (project) => project.projectName === projectId
  );

  const updatedProjectName = targetProject.renameProject(newName);
  return updatedProjectName;
}

export { createProject, removeProject, renameProject, projectsArray };
