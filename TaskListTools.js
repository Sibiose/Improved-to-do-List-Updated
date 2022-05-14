import { DOM, app, dragAndDropTools } from "./main.js";

export default class TaskListTools {
  taskItemArr = [];
  pseudoCheckArr = [];
  taskItemCompleted = [];
  taskItemActive = [];
  /**
   * A method that creates a new List item with all features included
   */
  createTaskItem(event) {
    if (DOM.taskInput.value !== "" && event.keyCode === 13) {
      //-------Creating a new List Item Element
      let newLi = document.createElement("li");
      let newTextNode = document.createTextNode(DOM.taskInput.value);

      //------Adding classes to the List item Element depending on case
      newLi.classList.add("task-item");
      if (DOM.completedFilter.classList.contains("activeFilter")) {
        newLi.classList.add("hide");
      }
      //-----DRAG AND DROP PART-----------

      newLi.classList.add("draggable");
      newLi.setAttribute("draggable", true);

      //------Creating the check toggle Button

      let newCheckBtn = document.createElement("button");
      let newCheckImage = document.createElement("img");
      let newPseudoCheck = document.createElement("div");

      //----Adding classes to the check elements

      newCheckBtn.classList.add("check");
      newCheckImage.classList.add("check-img");
      newCheckImage.classList.add("hide");
      newCheckImage.src = "images/icon-check.svg";
      newPseudoCheck.classList.add("pseudo-check");

      if (app.currentTheme === "light") {
        newPseudoCheck.classList.add("light-pseudo-check");
        newLi.classList.add("light-task-item");
      }

      //-----Appending the check elements and storing them in arrays

      newCheckBtn.appendChild(newPseudoCheck);
      newCheckBtn.appendChild(newCheckImage);
      this.pseudoCheckArr.push(newPseudoCheck);

      //-----Adding Check button event listener
      newCheckBtn.addEventListener("click", () => {
        newLi.classList.toggle("completed-item");
        newCheckImage.classList.toggle("hide");
        newCheckBtn.classList.toggle("checkActive");
        newPseudoCheck.classList.toggle("pseudo-check");
        this.updateList();
        if (DOM.activeFilter.classList.contains("activeFilter")) {
          newLi.classList.add("hide");
        }
      });

      //----- Adding a Delete Button -----------------------

      let newDeleteBtn = document.createElement("img");
      newDeleteBtn.src = "images/icon-cross.svg";
      newDeleteBtn.classList.add("delete-img");

      //----Adding Delete Button an event listener

      newDeleteBtn.addEventListener("click", () => {
        this.taskItemArr = this.taskItemArr.filter((element) => {
          return element !== newLi;
        });
        this.pseudoCheckArr = this.pseudoCheckArr.filter((element) => {
          return element !== newPseudoCheck;
        });
        newLi.remove();
        this.updateList();
      });

      //----Appending all children to the Task item and task List
      newLi.appendChild(newCheckBtn);
      newLi.appendChild(newTextNode);
      newLi.appendChild(newDeleteBtn);
      DOM.taskList.appendChild(newLi);
      this.taskItemArr.push(newLi);
      console.log(this.taskItemArr);

      //---Updating the list and clearing the input;
      this.updateList();
      app.clearInput();
    }
  }

  /**
   * A method that updates all the arrays as well as the list items count
   */
  updateList() {
    dragAndDropTools.draggables = [...document.querySelectorAll(".draggable")];

    this.taskItemCompleted = this.taskItemArr.filter((taskItem) =>
      taskItem.classList.contains("completed-item")
    );

    this.taskItemActive = this.taskItemArr.filter(
      (taskItem) => !taskItem.classList.contains("completed-item")
    );
    this.updateCount();

    dragAndDropTools.dragFun();
  }
  /**
   * A method that updates the count depending on the number of active list items;
   */
  updateCount() {
    this.taskItemArr.length === 0
      ? (DOM.taskCount.innerText = "No task for today!")
      : (DOM.taskCount.innerText =
          this.taskItemArr.length -
          this.taskItemCompleted.length +
          " items left");
  }
}
