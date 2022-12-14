import Trash from "../images/icons-colored/trash.svg";
import Illustration from "../images/illustrations/no_tasks.svg";
import { createSvgIcon } from "./utility";
import { projects } from "./projects";
import { pubsub } from "./pubsub";
import { addTaskForm } from "./addTaskForm";
import { Task } from "./task";

export const main = {
  // Renders base content - main element and content container
  renderBase: container => {
    const mainEl = document.createElement("main");

    const mainContent = document.createElement("div");
    mainContent.classList.add("main-content-wrapper");

    mainEl.append(mainContent);

    container.append(mainEl);

    // Subscribe to task added event
    pubsub.subscribe("taskAdded", main.taskAdded);
  },
  // Section - "Categories" or "Groups"
  renderTasks: (group, panelTitle, taskArray, section) => {

    const mainContent = document.querySelector(".main-content-wrapper");
    mainContent.replaceChildren();

    const groupTitle = document.createElement("h5");
    groupTitle.classList.add("main-title");
    groupTitle.textContent = panelTitle;
    mainContent.append(groupTitle);

    // If clicked section item is in groups, render group title, and "add a new task" controls
    if (section === "Groups") {
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("add-new-task-container");

      const btn = document.createElement("span");

      btn.addEventListener("click", () => {
        addTaskForm.render("Add A New Task", group);
      });

      const btnText = document.createElement("p");
      btnText.textContent = "Add a new task...";

      btnContainer.append(btn, btnText);

      mainContent.append(btnContainer);
    }

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    mainContent.append(taskContainer);

    // If no tasks are present in category or group, render a "no tasks" message
    if (taskArray.length === 0) {
      main.renderNoTasks();
      return;
    }

    // Render tasks
    taskArray.forEach((groupTask) => {
      const task = document.createElement("div");
      task.classList.add("task");

      const completeContainer = document.createElement("div");
      completeContainer.classList.add("task-complete-container");

      task.appendChild(completeContainer);

      const checkbox = document.createElement("input");

      // If task isCompleted, render checkbox as checked
      if (groupTask.isCompleted) {
        checkbox.checked = true;
        task.classList.add("task-completed");
      } else {
        checkbox.checked = false;
        task.classList.remove("task-completed");
      }

      checkbox.classList.add("task-action");
      checkbox.setAttribute("type", "checkbox");

      checkbox.addEventListener("change", () => {
        // Add class that changes task styling when task is completed
        task.classList.toggle("task-completed");

        groupTask.isCompleted === false
          ? (groupTask.isCompleted = true)
          : (groupTask.isCompleted = false);
      });

      completeContainer.append(checkbox);

      const contentContainer = document.createElement("div");
      contentContainer.classList.add("task-content-container");
      task.append(contentContainer);

      const taskTitle = document.createElement("p");
      taskTitle.classList.add("task-title");
      taskTitle.textContent = groupTask.title;

      const taskDesc = document.createElement("p");
      taskDesc.classList.add("task-desc");
      taskDesc.textContent = groupTask.desc;

      const taskDetails = document.createElement("div");
      taskDetails.classList.add("task-details");

      const priorityTag = document.createElement("div");
      priorityTag.classList.add("task-priority-tag");
      // Assign color to priority tag. Low - green, medium - yellow, high - red
      main.assignPriorityColor(priorityTag, groupTask.priority);
      priorityTag.textContent = groupTask.priority;

      const date = document.createElement("div");
      date.classList.add("task-tag");
      date.textContent = groupTask.dueDate.toLocaleDateString();

      const groupTag = document.createElement("div");
      groupTag.classList.add("task-tag");
      groupTag.textContent = groupTask.group.title;

      contentContainer.append(taskTitle, taskDesc, taskDetails);

      taskDetails.append(priorityTag, date, groupTag);

      const taskOptions = document.createElement("div");
      taskOptions.classList.add("task-options");

      const deleteIcon = createSvgIcon(Trash, ["task-options-icon"]);
      deleteIcon.classList.add("task-options-icon", "task-action");
      deleteIcon.addEventListener("click", (ev) => {
        main.taskDeleted(ev, group, groupTask.uuid);
      });

      taskOptions.append(deleteIcon);

      task.append(taskOptions);

      taskContainer.appendChild(task);
    });
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
    const taskContainer = document.querySelector(".task-container");

    const noTasksText = document.createElement("h5");
    noTasksText.textContent = "No Tasks!";
    noTasksText.classList.add("no-tasks-title");

    const illustration = createSvgIcon(Illustration, ["no-tasks-illustration"]);

    taskContainer.append(noTasksText, illustration);
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
  displayAllTasks: categoryName => {
    let allTasks = main.getAllTasks();

    main.renderTasks(undefined, categoryName, allTasks, "All Tasks");

    main.toggleHideTaskActions(true);
  },
  filterByPriority: (priority) => {
    let allTasks = main.getAllTasks();
    // Filter out by priority
    const filtered = allTasks.filter((task) => task.priority === priority);

    // Render tasks by filtered colleciton
    main.renderTasks(undefined, priority, filtered, "Categories");

    main.toggleHideTaskActions(true);
  },
  toggleHideTaskActions: isHidden => {
    const taskOptions = document.querySelectorAll(".task-action");
    taskOptions.forEach((option) => {
      isHidden
        ? (option.style.visibility = "hidden")
        : (option.style.visibility = "visibile");
    });
  },
  filterSelectedGroup: ev => {
    // Find closest li node, get its UUID
    const item = ev.target.closest("li");
    const uuid = item.getAttribute("data-group-uuid");

    // Find group that matches this uuid
    const group = projects.groups.find((group) => group.uuid === uuid);

    // Render tasks by group
    main.renderTasks(group, group.title, group.taskCollection, "Groups");
  },
  taskAdded: ([task, group]) => {
    // Recieves task object information from form
    // Register task, add it to group
    group.taskCollection.push(
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
    main.renderTasks(group, group.title, group.taskCollection, "Groups");
  },
  taskDeleted: (ev, group, taskId) => {
    const taskContainer = document.querySelector(".task-container");
    const taskEl = ev.target.closest(".task");
    // Get new filtered group task array
    group.taskCollection = group.taskCollection.filter(
      (task) => task.uuid !== taskId
    );
    // Remove task node
    taskContainer.removeChild(taskEl);
  },
};
