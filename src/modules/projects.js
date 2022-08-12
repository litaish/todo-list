import { TaskGroup } from "./group";
import { createSvgIcon } from "./utility";
import { overlay } from "./overlay";
import Folder from "../images/icons-colored/folder.svg";
import Pencil from "../images/icons-colored/pencil.svg";
import Plus from "../images/icons-colored/plus.svg";

/* Handles project section (groups) in navbar */

export const projects = {
  groups: [new TaskGroup("User Tasks", false)],
  render: (container) => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("nav-title-container");

    const title = document.createElement("h5");
    const titleText = document.createTextNode("Groups");
    title.appendChild(titleText);

    const seperator = document.createElement("hr");

    titleContainer.append(title, seperator);

    const ul = document.createElement("ul");
    ul.classList.add("nav-list");

    container.append(titleContainer, ul);

    projects.renderGroups(ul);

    // Button to add new group
    const anLi = document.createElement("li");

    const anPadding = document.createElement("div");
    anPadding.classList.add("nav-icon");

    const anTitle = document.createElement("p");
    const anTitleText = document.createTextNode("Add New");
    anTitle.appendChild(anTitleText);

    const anIcon = createSvgIcon(Plus, ["nav-icon", "nav-icon-action"]);
    // Add event listener for Add New Group button
    anIcon.addEventListener("click", () => {
        overlay.renderGroupForm("Add A New Group");
    })

    anLi.append(anPadding, anTitle, anIcon);

    ul.appendChild(anLi);
  },
  renderGroups: (container) => {
    projects.groups.forEach((group) => {
      // Collection of elements that will be appended to list item
      let collection = [];

      const li = document.createElement("li");

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
    groups.push(new TaskGroup(name, isEditable));
  },
};
