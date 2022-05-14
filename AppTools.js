import { DOM, taskListTools, filterTools } from "./main.js";

export default class App {
  currentTheme = "dark"; // currentTheme can be "dark" or "light"
  /**
   * A method that toggles classNames in case the theme is switched
   */
  toggleTheme() {
    DOM.body.classList.toggle("light-body");
    DOM.header.classList.toggle("light-header");
    DOM.controlMenu.classList.toggle("light-control-menu");
    DOM.allFilter.classList.toggle("light-filter-p");
    DOM.activeFilter.classList.toggle("light-filter-p");
    DOM.completedFilter.classList.toggle("light-filter-p");
    DOM.clearBtn.classList.toggle("light-filter-p");
    DOM.taskInput.classList.toggle("light-input");
    DOM.filter.classList.toggle("light-filter");
    DOM.footerP.classList.toggle("light-footer-p");

    taskListTools.pseudoCheckArr.forEach((item) =>
      item.classList.toggle("light-pseudo-check")
    );
    taskListTools.taskItemArr.forEach((item) =>
      item.classList.toggle("light-task-item")
    );

    let sunSrc = "images/icon-sun.svg";
    let moonSrc = "images/icon-moon.svg";

    if (DOM.toggleImage.src.match(sunSrc)) {
      DOM.toggleImage.src = moonSrc;
      this.currentTheme = "light";
    } else {
      DOM.toggleImage.src = sunSrc;
      this.currentTheme = "dark";
    }
  }
  /**
   * A method that clears the input value
   */
  clearInput() {
    DOM.taskInput.value = "";
  }
  /**
   * A method that initializes the app by adding all the event listeners and running the pre-start methods
   */
  initApp() {
    DOM.allFilter.addEventListener("click", () => {
      filterTools.displayItem(taskListTools.taskItemArr);
    });

    DOM.activeFilter.addEventListener("click", () => {
      filterTools.displayItem(taskListTools.taskItemArr);
      filterTools.hideItem(taskListTools.taskItemCompleted);
    });

    DOM.completedFilter.addEventListener("click", () => {
      filterTools.displayItem(taskListTools.taskItemArr);
      filterTools.hideItem(taskListTools.taskItemActive);
    });

    filterTools.filters.forEach((filter) =>
      filter.addEventListener("click", () => {
        filterTools.removeActiveColor();
        filterTools.addActiveColor(filter);
      })
    );

    DOM.toggleBtn.addEventListener("click", () => {
      this.toggleTheme();
    });

    DOM.taskInput.addEventListener("keypress", () => {
      taskListTools.createTaskItem(event);
    });

    DOM.clearBtn.addEventListener("click", function clearAllCompleted() {
      taskListTools.taskItemCompleted.forEach((task) => task.remove());
      taskListTools.updateCount();
    });

    taskListTools.updateList();
  }
}
