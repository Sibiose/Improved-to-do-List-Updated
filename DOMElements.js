/**
 * A class that holds all DOM elements;
 */
export default class DOMElements {
  body = document.querySelector("body");
  toggleBtn = document.querySelector(".toggle");
  taskList = document.querySelector(".task-list");
  taskCount = document.querySelector(".dynamic-number");
  allFilter = document.querySelector(".all");
  activeFilter = document.querySelector(".active");
  completedFilter = document.querySelector(".completed");
  clearBtn = document.querySelector(".clear");
  taskInput = document.querySelector(".task-input");
  controlMenu = document.querySelector(".control-menu");
  header = document.querySelector("header");
  toggleImage = document.querySelector(".toggle-image");
  filter = document.querySelector(".filter");
  footerP = document.querySelector(".footer-p");
}
