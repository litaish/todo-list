import { TaskGroup } from "./group";

import { categories } from "./categories";
import { projects } from "./projects";

export const nav = {
  render: (container) => {
    const navEl = document.createElement("nav");
    container.appendChild(navEl);

    const contentContainer = document.createElement("div");
    contentContainer.setAttribute("id", "nav_content_container");
    navEl.appendChild(contentContainer);

    // Render seperate nav components
    categories.render(contentContainer);
    projects.render(contentContainer);
  },
};
