import { TaskGroup } from "./group";

import { categories } from "./categories";
import { projects } from "./projects";
import { overlay } from "./overlay";

export const nav = {
  render: (container) => {
    const navEl = document.createElement("nav");
    container.appendChild(navEl);

    const contentContainer = document.createElement("div");
    navEl.appendChild(contentContainer);

    // Render seperate components
    categories.render(contentContainer);
    projects.render(contentContainer);
  },
};
