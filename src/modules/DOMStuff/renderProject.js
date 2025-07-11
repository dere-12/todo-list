const newBtn = document.querySelector(".new-btn-js");
const tooltip = document.querySelector(".tooltip");
const project = document.querySelector(".project");

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

project.addEventListener("click", (e) => {
  // console.log("pro-clicked");
  if (e.target.classList.contains("menu-button")) {
    console.log("3dots clicked");
    // const menus = e.target.nextElementSibling;
    // document.querySelectorAll(".menu-options").forEach((menu) => {
    //   if (menu !== menus) menu.style.display = "none"; // Close other menus
    // });
    // menus.style.display = menus.style.display === "flex" ? "none" : "flex";
  }

  if (e.target.classList.contains("delete")) {
    console.log("delete");
  }
});
