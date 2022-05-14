import { DOM } from "./main.js";

export default class DragAndDropTools {
  // Web DEV SIMPLIFIED Tutorial on DRAG AND DROP....

  draggables = [...document.querySelectorAll(".draggable")];

  /**
   * A method that sets and removes the class "dragging" when drag event is detected. Also, it handles the dragover functionality of the taskList
   */
  dragFun() {
    this.draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", function draggingClassAdd() {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", function draggingClassRemove() {
        draggable.classList.remove("dragging");
      });
    });

    DOM.taskList.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = this.dragAfterElement(DOM.taskList, e.clientY);
      const draggable = document.querySelector(".dragging");
      DOM.taskList.appendChild(draggable);
      if (afterElement == null) {
        DOM.taskList.appendChild(draggable);
      } else {
        DOM.taskList.insertBefore(draggable, afterElement);
      }
    });
  }
  /**
   * A method that determines the position of the dragged element in relation with the other list item elements. It establishes the order and y of the dragged element in the task list;
   */
  dragAfterElement(taskList, y) {
    // Select all the draggable elements that are not currently being dragged.
    const draggableElements = [
      ...taskList.querySelectorAll(".draggable:not(.dragging)"),
    ];

    // Use a reducer on the array returned before
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        // Calculates the position in regards to the vertical center of the list item
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
