export const footer = {
  render: (container) => {
    const footerEl = document.createElement("footer");

    const createdByContainer = document.createElement("div");
    createdByContainer.classList.add("created-by-container");

    const createdBy = document.createElement("p");
    const createdByText = document.createTextNode("Created By");
    createdBy.appendChild(createdByText);

    const link = document.createElement("a");
    link.setAttribute("href", footer.footerDetails.link);
    const linkText = document.createTextNode(footer.footerDetails.creator);
    link.appendChild(linkText);

    createdByContainer.append(createdBy, link);

    footerEl.appendChild(createdByContainer);

    container.appendChild(footerEl);
  },
  footerDetails: {
    link: "https://github.com/litaish",
    creator: "litaish",
  },
};
