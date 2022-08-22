import Trash from "../images/icons-colored/trash.svg";
import Pencil from "../images/icons-colored/pencil.svg";
import { createSvgIcon } from "./utility";
import { projects } from "./projects";
import { pubsub } from "./pubsub";
import { addTaskForm } from "./addTaskForm";
import { Task } from "./task";

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
      addTaskForm.render("Add A New Task", group);
    });

    const btnText = document.createElement("p");
    btnText.textContent = "Add a new task...";

    btnContainer.append(btn, btnText);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    group.taskCollection.forEach((groupTask) => {
      // Render tasks
      const task = document.createElement("div");
      task.classList.add("task");

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
      taskTitle.textContent = groupTask.title 

      const taskDesc = document.createElement("p");
      taskDesc.classList.add("task-desc");
      taskDesc.textContent = groupTask.desc

      const taskDetails = document.createElement("div");
      taskDetails.classList.add("task-details");

      const priorityTag = document.createElement("div");
      priorityTag.classList.add("task-priority-tag");
      // Assign color to priority tag. Low - green, medium - yellow, high - red
      main.assignPriorityColor(priorityTag, groupTask.priority);
      priorityTag.textContent = groupTask.priority

      const date = document.createElement("div");
      date.classList.add("task-tag");
      date.textContent = groupTask.dueDate.toLocaleDateString();

      const groupTag = document.createElement("div");
      groupTag.classList.add("task-tag");
      groupTag.textContent = groupTask.group.title;

      contentContainer.append(
        taskTitle,
        taskDesc,
        taskDetails,
      );

      taskDetails.append(
        priorityTag,
        date,
        groupTag
      );

      const taskOptions = document.createElement("div");
      taskOptions.classList.add("task-options");

      const deleteIcon = createSvgIcon(Trash, ["task-options-icon"]);
      deleteIcon.classList.add("task-options-icon");

      const editIcon = createSvgIcon(Pencil, ["task-options-icon"]);
      editIcon.classList.add("task-options-icon");

      taskOptions.append(deleteIcon, editIcon);

      task.append(taskOptions);

      // Append task to task container
      taskContainer.appendChild(task);
    });

    mainContent.append(groupTitle, btnContainer, taskContainer);
  },
  assignPriorityColor: (element, selectedPriority) => {
    switch (selectedPriority) {
        case "Low Priority":
            element.setAttribute("id", "priority_low");
            break;
        case "Medium Priority": 
            element.setAttribute("id", "priority_med");
            break;
        case "High Priority":
            element.setAttribute("id", "priority_high");
            break;
    }
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
  filterSelectedGroup: (ev) => {
    // Find closest li node, get its UUID
    const item = ev.target.closest("li");
    const uuid = item.getAttribute("data-group-uuid");

    // Find group that matches this uuid
    const group = projects.groups.find((group) => group.uuid === uuid);

    // Render tasks by group
    main.renderTasks(group);
  },
  taskAdded: ([task, group]) => {
    // Recieves task object information from form
    // Register task, add it to group
    group.addTask(
      new Task(
        task.title,
        task.desc,
        task.due,
        task.priority,
        task.group,
        task.uuid
      )
    );

    // Render newly added group tasks
    main.renderTasks(group);
  },
};
