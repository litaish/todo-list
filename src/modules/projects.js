import { TaskGroup } from "./group";
import { createSvgIcon } from "./utility";
import { addGroupForm } from "./addGroupForm";
import Folder from "../images/icons-colored/folder.svg";
import Trash from "../images/icons-colored/trash.svg";
import Plus from "../images/icons-colored/plus.svg";
import { pubsub } from "./pubsub";
import { v4 as uuidv4 } from "uuid";
import { main } from "./main";

/* Handles project section (groups) in navbar */

export const projects = {
  // groups: [new TaskGroup("User Tasks", false, uuidv4())],
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

    container.append(titleContainer, groupUl);

    projects.renderGroups(groupUl);

    const anUl = document.createElement("ul");

    anUl.classList.add("nav-list");
    const anLi = document.createElement("li");

    const anPadding = document.createElement("div");
    anPadding.classList.add("nav-icon");

    const anTitle = document.createElement("p");
    const anTitleText = document.createTextNode("Add New");
    anTitle.appendChild(anTitleText);

    const anIcon = createSvgIcon(Plus, ["nav-icon", "nav-icon-action"]);

    anIcon.addEventListener("click", () => {
      addGroupForm.render("Add A New Group");
    });

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
      li.setAttribute("data-group-uuid", group.uuid);

      const svgLeft = createSvgIcon(Folder, ["nav-icon"]);

      const titleEl = document.createElement("p");
      const title = document.createTextNode(group.title);
      titleEl.appendChild(title);

      titleEl.addEventListener("click", main.filterSelectedGroup);

      collection.push(svgLeft, titleEl);

      // If group is ment to be removed, create the remove icon and add it to the collection
      if (group.isEditable !== false) {
        const svgRight = createSvgIcon(Trash, ["nav-icon", "nav-icon-action"]);

        svgRight.addEventListener("click", (ev) => {
          projects.groupDeleted(ev, group);
        });

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
  groupAdded: (title) => {
    projects.registerGroup(title, true);
    // Refresh group list - delete child nodes and display again
    const ul = document.getElementById("group_list");
    ul.replaceChildren();
    projects.renderGroups(ul);
  },
  groupDeleted: (ev, group) => {
    projects.groups = projects.groups.filter(
      (item) => item.uuid !== group.uuid
    );

    const ul = document.getElementById("group_list");

    ul.replaceChildren();

    projects.renderGroups(ul);
  },
};
