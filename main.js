import DOMElements from "./DOMElements.js";
import TaskListTools from "./TaskListTools.js";
import FilterTools from "./FilterTools.js";
import DragAndDropTools from "./DragAndDropTools.js";
import App from "./AppTools.js";

// Creating instances of each class
const dragAndDropTools = new DragAndDropTools();
const app = new App();
const DOM = new DOMElements();
const filterTools = new FilterTools();
const taskListTools = new TaskListTools();

//Initializing the app - Adding event listeners
app.initApp();

//
export { dragAndDropTools, app, DOM, filterTools, taskListTools };
