/* Handles categories section in navbar */
import Scroll from "../images/icons-colored/scroll.svg";
import Clock from "../images/icons-colored/clock.svg";
import { main } from "./main";

export const categories = {
  list: [
    {
      name: "All Tasks",
      icon: Scroll,
      type: "All",
    },
    {
      name: "Low Priority",
      icon: Clock,
      type: "Priority",
    },
    {
      name: "Medium Priority",
      icon: Clock,
      type: "Priority",
    },
    {
      name: "High Priority",
      icon: Clock,
      type: "Priority",
    },
  ],
  render: (container) => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("nav-title-container");

    const title = document.createElement("h5");
    title.textContent = "Categories";

    const seperator = document.createElement("hr");
    titleContainer.append(title, seperator);

    const ul = document.createElement("ul");
    ul.classList.add("nav-list");
    container.append(titleContainer, ul);

    categories.list.forEach((cat) => {
      const li = document.createElement("li");

      const titleEl = document.createElement("p");
      titleEl.textContent = cat.name;

      li.addEventListener("click", () => {
        if (cat.type === "Priority") {
          main.filterByPriority(cat.name);
        }
        if (cat.type === "All") {
          main.displayAllTasks(cat.name);
        }
      });

      const svg = document.createElement("object");
      svg.classList.add("nav-icon");
      svg.setAttribute("data", cat.icon);
      svg.setAttribute("type", "image/svg+xml");

      li.append(svg, titleEl);
      ul.appendChild(li);
    });
  },
  addCategory: (cat, icon) => {
    categories.push({
      name: cat,
      icon: icon,
    });
  },
};
