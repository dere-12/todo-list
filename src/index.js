import "./style.css";
import Project from "./modules/project/project.js";

console.log("Webpack is Working!");

const pro1 = new Project("3t-Game");
const pro2 = new Project("library");
const pro3 = new Project("r-page");

pro1.addToDo({
  title: "3t-Title",
  description: "desc",
  dueDate: "due-d",
  creationDate: "cre-d",
  priority: "high",
  notes: "3t-note",
});

pro3.addToDo({
  title: "rp-title",
  description: "rp-desc",
  dueDate: "rp-dueDate",
});

pro3.addToDo({
  description: "rp-desc-2",
  dueDate: "rp-dueDate-2",
  title: "rp-title-2-new",
  creationDate: "rp-cre-2",
});

pro3.addToDo({ title: "A todo with just a title" });
pro3.addToDo();

console.log(pro1);
console.log(pro2);
console.log(pro3);
