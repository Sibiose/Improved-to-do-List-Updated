import { DOM } from "./main.js";

export class FilterTools {
  filters = [DOM.allFilter, DOM.activeFilter, DOM.completedFilter];
  /**
   * A method that handles removing the filter color
   */
  removeActiveColor() {
    this.filters.forEach((item) => item.classList.remove("activeFilter"));
  }
  /**
   * A method that handles adding the filter color
   */
  addActiveColor(item) {
    item.classList.add("activeFilter");
  }
  /**
   *  A method that takes an Arr of items and removes the hide className for each element
   */
  displayItem(itemArr) {
    itemArr.forEach((el) => {
      el.classList.remove("hide");
    });
  }
  /**
   *  A method that takes an Arr of items and adds the hide className for each element
   */
  hideItem(itemArr) {
    itemArr.forEach((el) => {
      el.classList.add("hide");
    });
  }
}

export default FilterTools;
