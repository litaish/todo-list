/* Handles categories section in navbar */
import Scroll from '../images/icons-colored/scroll.svg';
import Clock from '../images/icons-colored/clock.svg';

export const categories = {
  list: [
    {
      name: "All Tasks",
      icon: Scroll,
    },
    {
      name: "Low Priority",
      icon: Clock,
    },
    {
      name: "Medium Priority",
      icon: Clock,
    },
    {
      name: "High Priority",
      icon: Clock,
    },
  ],
  render: (container) => {
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("nav-title-container");
    const title = document.createElement("h5");
    const titleText = document.createTextNode("Categories");
    title.appendChild(titleText);
    const seperator = document.createElement("hr");
    titleContainer.append(title, seperator);

    const ul = document.createElement("ul");
    ul.classList.add("nav-list");
    container.append(titleContainer, ul);

    // Render categories
    categories.list.forEach((cat) => {
      const li = document.createElement("li");
      const titleEl = document.createElement("p");
      const title = document.createTextNode(cat.name);
      const svg = document.createElement("object");
      svg.classList.add("nav-icon");
      svg.setAttribute("data", cat.icon);
      svg.setAttribute("type", "image/svg+xml");
      
      titleEl.append(title);
      li.append(svg, titleEl);
      ul.appendChild(li);
    });
  },
  filterAll: function () {},
  filterPriority: (priority) => {},
  addCategory: (cat, icon) => {
    categories.push({
      name: cat,
      icon: icon,
    });
  },
};
