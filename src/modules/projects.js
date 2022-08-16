import { TaskGroup } from "./group";
import { createSvgIcon } from "./utility";
import { addGroupForm } from "./addGroupForm";
import Folder from "../images/icons-colored/folder.svg";
import Pencil from "../images/icons-colored/pencil.svg";
import Plus from "../images/icons-colored/plus.svg";
import { pubsub } from "./pubsub";
import { v4 as uuidv4 } from 'uuid';
import { main } from "./main";

/* Handles project section (groups) in navbar */

export const projects = {
  groups: [new TaskGroup("User Tasks", false, uuidv4())],
  render: (container) => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("nav-title-container");

    const title = document.createElement("h5");
    const titleText = document.createTextNode("Groups");
    title.appendChild(titleText);

    const seperator = document.createElement("hr");

    titleContainer.append(title, seperator);

    const groupUl = document.createElement("ul");
    groupUl.setAttribute("id", "group_list");
    groupUl.classList.add("nav-list");
    // Add one event listener for whole group list
    groupUl.addEventListener("click", main.filterSelectedGroup);

    container.append(titleContainer, groupUl);

    projects.renderGroups(groupUl);

    // Button to add new group
    const anUl = document.createElement("ul");

    anUl.classList.add("nav-list");
    const anLi = document.createElement("li");

    const anPadding = document.createElement("div");
    anPadding.classList.add("nav-icon");

    const anTitle = document.createElement("p");
    const anTitleText = document.createTextNode("Add New");
    anTitle.appendChild(anTitleText);

    const anIcon = createSvgIcon(Plus, ["nav-icon", "nav-icon-action"]);
    // Add event listener for Add New Group button
    anIcon.addEventListener("click", () => {
        addGroupForm.render("Add A New Group");
    })

    anLi.append(anPadding, anTitle, anIcon);

    anUl.appendChild(anLi);
    container.append(anUl);

    // Subscribed to pass in data to projects.groupAdded
    pubsub.subscribe("groupAdded", projects.groupAdded);
  },
  renderGroups: (container) => {
    projects.groups.forEach((group) => {
      // Collection of elements that will be appended to list item
      let collection = [];

      const li = document.createElement("li");
      // Set unique identificator for each group
      li.setAttribute("data-group-uuid", group.uuid);

      const svgLeft = createSvgIcon(Folder, ["nav-icon"]);

      const titleEl = document.createElement("p");
      const title = document.createTextNode(group.title);
      titleEl.appendChild(title);

      collection.push(svgLeft, titleEl);

      // If group is ment to be edited, create the icon and add it to the appendable collection
      if (group.isEditable !== false) {
        const svgRight = createSvgIcon(Pencil, ["nav-icon", "nav-icon-action"]);
        // svgRight.addEventListener("click", projects.addGroup);
        collection.push(svgRight);
      }

      // Append collection of children to li element
      collection.forEach((element) => {
        li.appendChild(element);
      });
      container.appendChild(li);
    });
  },
  registerGroup: (name, isEditable) => {
    projects.groups.push(new TaskGroup(name, isEditable, uuidv4()));
  },
  groupAdded: title => {
    projects.registerGroup(title, true);
    // Refresh group list - delete child nodes and display again
    const ul = document.getElementById("group_list");
    ul.replaceChildren();
    projects.renderGroups(ul);
  }
};
