export const overlay = {
  // Render base of overlay
  renderBase: () => {
    const overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");

    const contentContainer = document.createElement("div");
    contentContainer.setAttribute("id", "overlay_container");

    overlay.append(contentContainer);

    document.body.append(overlay);
    overlay.style.display = "none";
  },
  toggleOverlayDisplay: () => {
    const overlay = document.getElementById("overlay");

    overlay.style.display === "none"
      ? (overlay.style.display = "flex")
      : (overlay.style.display = "none");
  },
  removeForm: () => {
    const overlayContainer = document.getElementById("overlay_container");
    // Remove all content container child nodes
    overlayContainer.replaceChildren();
    overlay.toggleOverlayDisplay();
  },
};
