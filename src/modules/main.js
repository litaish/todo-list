import Trash from "../images/icons-colored/trash.svg";
import Pencil from "../images/icons-colored/trash.svg";
import { createSvgIcon } from "./utility";
import { projects } from "./projects";
import { pubsub } from "./pubsub";
import { addTaskForm } from "./addTaskForm";

export const main = {
  renderBase: (container) => {
    const mainEl = document.createElement("main");
    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content-wrapper");
    mainEl.append(mainContent);
    container.append(mainEl);

    // Subscribe to task added event
    pubsub.subscribe("taskAdded", main.taskAdded);
  },
  renderTasks: (group) => {
    const mainContent = document.querySelector(".main-content-wrapper");
    mainContent.replaceChildren();

    const groupTitle = document.createElement("h5");
    groupTitle.classList.add("main-title");
    groupTitle.textContent = group.title;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("add-new-task-container");

    const btn = document.createElement("span");

    // Render add a new task form on click
    btn.addEventListener("click", () => {
        addTaskForm.render("Add A New Task");
        
    });

    const btnText = document.createElement("p");
    btnText.textContent = "Add a new task...";

    btnContainer.append(btn, btnText);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    group.taskCollection.forEach((element) => {
      // Render tasks
      const task = document.createElement("div");
      const completeContainer = document.createElement("div");
      completeContainer.classList.add("task-complete-container");
      task.appendChild(completeContainer);

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      completeContainer.append(checkbox);

      const contentContainer = document.createElement("div");
      contentContainer.classList.add("task-content-container");
      task.append(contentContainer);

      const taskTitle = document.createElement("p");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = group.taskCollection.title; // change

      const taskDesc = document.createElement("p");
      taskDesc.classList.add("task-desc");
      taskDesc.textContent = group.taskCollection.desc; // change

      const taskDetails = document.createElement("div");
      taskDetails.classList.add("task-details");

      const priorityTag = document.createElement("div");
      priorityTag.classList.add("task-priority-tag");
      priorityTag.textContent = group.taskCollection.priority; // change

      const date = document.createElement("div");
      date.classList.add("task-tag");
      date.textContent = group.taskCollection.date; // change

      const groupTag = document.createElement("div");
      groupTag.classList.add("task-tag");
      groupTag.textContent = group.taskCollection.group; // change

      contentContainer.append(
        taskTitle,
        taskDesc,
        taskDetails,
        priorityTag,
        date,
        groupTag
      );

      const taskOptions = document.createElement("div");
      taskOptions.classList.add("task-options");

      const deleteIcon = createSvgIcon(Trash, ["task-options-icon"]);

      const editIcon = createSvgIcon(Pencil, ["task-options-icon"]);

      taskOptions.append(deleteIcon, editIcon);
    });

    mainContent.append(groupTitle, btnContainer, taskContainer);
  },
  renderNoTasks: () => {
    const mainContent = document.querySelector(".main-content-wrapper");
  },
  clear: () => {
    const mainContent = document.querySelector(".main-content-wrapper");
    mainContent.replaceChildren();
  },
  getAllTasks: () => {
    const allTasks = projects.groups.map((group) => group.taskCollection);
    // [[], []].. => [... , ...]
    return allTasks.flat();
  },
  registerTask: () => {
    
  },
  filterSelectedGroup: ev => {
    // Find closest li node, get its UUID
    const item = ev.target.closest("li");
    const uuid = item.getAttribute("data-group-uuid");

    // Find group that matches this uuid
    const group = projects.groups.find((group) => group.uuid === uuid);

    // Render tasks by group
    main.renderTasks(group);
  },
  taskAdded: task => {
    // Recieves task object information from form
    // Register task, add to group
    console.log(task.uuid)
  }
};
