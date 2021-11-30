const body = document.querySelector("body");
const toggleBtn = document.querySelector(".toggle");
const taskList = document.querySelector(".task-list");
let taskItem = [...document.querySelectorAll(".task-item")];
let checkBtn = document.querySelector(".check");
let deleteBtn = document.querySelector(".delete-img");
const taskCount = document.querySelector(".dynamic-number");
const allFilter = document.querySelector(".all");
const activeFilter = document.querySelector(".active");
const completedFilter = document.querySelector(".completed");
const clearBtn = document.querySelector(".clear");
const taskInput = document.querySelector(".task-input");
let taskItemCompleted = document.getElementsByClassName("completed-item")
let taskItemActive;
let pseudoCheck = [...document.querySelectorAll(".pseudo-check")];
let controlMenu = document.querySelector(".control-menu");
const header = document.querySelector("header");
let toggleImage = document.querySelector(".toggle-image");
let filter = document.querySelector(".filter");
let footerP = document.querySelector(".footer-p");
let currentTheme = "dark"; //default for current theme is dark;

function clearInput() {
    taskInput.value = "";
}

updateList();

function createTaskItem(event) {
    if (taskInput.value !== "" && event.keyCode === 13) {
        let newLi = document.createElement("li");
        if (currentTheme == "dark") {
            newLi.classList.add("task-item")
        } else if (currentTheme == "light") {
            newLi.classList.add("task-item");
            newLi.classList.add("light-task-item");
        }
        let newTextNode = document.createTextNode(taskInput.value);



        let newCheckBtn = document.createElement("button");
        newCheckBtn.classList.add("check");

        //----Adding a check icon to check Btn

        let newCheckImage = document.createElement("img");
        newCheckBtn.appendChild(newCheckImage);
        newCheckImage.classList.add("check-img");
        newCheckImage.classList.add("hide");
        newCheckImage.src = "images/icon-check.svg"
        let newPseudoCheck = document.createElement("div");
        newCheckBtn.appendChild(newPseudoCheck);
        if (currentTheme == "dark") {
            newPseudoCheck.classList.add("pseudo-check")
        } else if (currentTheme == "light") {
            newPseudoCheck.classList.add("pseudo-check");
            newPseudoCheck.classList.add("light-pseudo-check");
        }





        //-------------------------------------

        let newDeleteBtn = document.createElement("img");
        newDeleteBtn.src = "images/icon-cross.svg"
        newDeleteBtn.classList.add("delete-img");

        newLi.appendChild(newCheckBtn);
        newLi.appendChild(newTextNode);
        newLi.appendChild(newDeleteBtn);
        taskList.appendChild(newLi);

        newCheckBtn.addEventListener("click", function completeItem() {
            newLi.classList.toggle("completed-item");
            newCheckImage.classList.toggle("hide");
            newCheckBtn.classList.toggle("checkActive");
            newPseudoCheck.classList.toggle("pseudo-check");
            updateList();
        })
        newDeleteBtn.addEventListener("click", function deleteItem() {
            newLi.remove();
            updateList();
        })

        updateList();
        clearInput();
    }

}


taskInput.addEventListener("keypress", createTaskItem);

function updateList() {
    taskItem = [...document.querySelectorAll(".task-item")];
    pseudoCheck = [...document.querySelectorAll(".pseudo-check")];
    taskItemCompleted = document.querySelectorAll(".completed-item")
    taskItemActive = taskItem.filter(taskItem => !taskItem.classList.contains("completed-item"))
    taskCountUpdate();
}





//--------------------Dynamic Number ------------------------------------

function taskCountUpdate() {
    if (taskItem.length === 0) {
        taskCount.innerText = "No tasks for today!"
    } else {
        taskCount.innerText = taskItem.length - taskItemCompleted.length + " items left"
    }
}
taskCountUpdate();

//-----------------------Filtering -------------------------------------

allFilter.addEventListener("click", function filterAll() {
    removeActiveColor()
    allFilter.classList.add("activeFilter");
    for (let i = 0; i < taskItem.length; i++) {
        taskItem[i].classList.remove("hide");
    }
});

activeFilter.addEventListener("click", function filterActive() {
    removeActiveColor()
    activeFilter.classList.add("activeFilter");
    for (let i = 0; i < taskItemActive.length; i++) {
        taskItemActive[i].classList.remove("hide");
    }
    for (let i = 0; i < taskItemCompleted.length; i++) {
        taskItemCompleted[i].classList.add("hide");

    }
});

completedFilter.addEventListener("click", function filterCompleted() {
    removeActiveColor()
    completedFilter.classList.add("activeFilter");
    for (let i = 0; i < taskItemCompleted.length; i++) {
        taskItemCompleted[i].classList.remove("hide");
    }
    for (let i = 0; i < taskItemActive.length; i++) {
        taskItemActive[i].classList.add("hide");
    }

})

function removeActiveColor() {
    allFilter.classList.remove("activeFilter");
    activeFilter.classList.remove("activeFilter");
    completedFilter.classList.remove("activeFilter");
}

//----------------------------Clear completed items ---------------------------------

clearBtn.addEventListener("click", function clearAllCompleted() {
    for (let i = 0; i < taskItemCompleted.length; i++) {
        taskItemCompleted[i].remove();
    }
})


// ------------------------- Toggle between themes------------------

toggleBtn.addEventListener("click", function toggleFun() {
    body.classList.toggle("light-body");
    header.classList.toggle("light-header");
    controlMenu.classList.toggle("light-control-menu");
    allFilter.classList.toggle("light-filter-p");
    activeFilter.classList.toggle("light-filter-p");
    completedFilter.classList.toggle("light-filter-p");
    clearBtn.classList.toggle("light-filter-p");
    taskInput.classList.toggle("light-input");
    filter.classList.toggle("light-filter");
    footerP.classList.toggle("light-footer-p")

    for (let i = 0; i < pseudoCheck.length; i++) {
        pseudoCheck[i].classList.toggle("light-pseudo-check");
    }

    for (let i = 0; i < taskItem.length; i++) {
        taskItem[i].classList.toggle("light-task-item");
    }





    if (toggleImage.src.match("images/icon-sun.svg")) {
        toggleImage.src = "images/icon-moon.svg";
        currentTheme = "light";
    } else {
        toggleImage.src = "images/icon-sun.svg";
        currentTheme = "dark";
    }


})

