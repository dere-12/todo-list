const newBtn = document.querySelector(".new-btn-js");
const tooltip = document.querySelector(".tooltip");
const projects = document.querySelectorAll(".project");

newBtn.addEventListener("mouseenter", () => {
  tooltip.style.visibility = "visible";
});

newBtn.addEventListener("mouseleave", () => {
  tooltip.style.visibility = "hidden";
});

newBtn.addEventListener("click", newBtnHandler);

function newBtnHandler() {
  console.log("new btn clicked");
}

projects.forEach((project) => {
  project.addEventListener("click", projectClickHandler);
});

function projectClickHandler(e) {
  const kebabIcon = e.target.closest(".menu-button");
  if (kebabIcon) {
    console.log("3dots clicked");
    const projectMenuOptions = kebabIcon.nextElementSibling;
    document.querySelectorAll(".menu-options").forEach((menu) => {
      if (menu !== projectMenuOptions) menu.style.display = "none";
    });
    projectMenuOptions.style.display =
      projectMenuOptions.style.display === "flex" ? "none" : "flex";
  }

  if (e.target.classList.contains("delete")) {
    console.log("delete clicked");
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-wrapper")) {
    document
      .querySelectorAll(".menu-options")
      .forEach((m) => (m.style.display = "none"));
  }
});
