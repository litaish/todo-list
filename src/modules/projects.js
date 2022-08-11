import { TaskGroup } from "./group"
import { createSvgElement } from "./utility";
import Folder from '../images/icons-colored/folder.svg';
import Pencil from '../images/icons-colored/pencil.svg';

/* Handles project section (groups) in navbar */

export const projects = {
    groups: [
        new TaskGroup("User Tasks", false),
    ],
    render: container => {
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
    },
    renderGroups: container => {
        projects.groups.forEach(group => {
                // Collection of elements that will be appended to list item
                let collection = [];

                const li = document.createElement("li");
                const svgLeft = createSvgElement(Folder, ["nav-icon"]);
                const titleEl = document.createElement("p");
                const title = document.createTextNode(group.title);
                titleEl.appendChild(title);
                collection.push(svgLeft, titleEl);
                
                // If group is ment to be edited, create the icon and add it to the appendable collection
                if (group.isEditable !== false) {
                    const svgRight = createSvgElement(Pencil, ["nav-icon", "nav-icon-action"]);
                    collection.push(svgRight);
                }

                // Append collection of children to li element
                collection.forEach(element => {
                    li.appendChild(element);
                })
                container.appendChild(li);
        });
    },
    createAndRegisterGroup: (name) => {
        groups.push(new TaskGroup(name));
    },
}