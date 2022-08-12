import { setAttributes } from "./utility";

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
  renderGroupForm: (title) => {
    overlay.renderBase();
    overlay.toggleOverlayDisplay();

    const contentContainer = document.getElementById("overlay_container");

    // Title of overlay form
    const titleContainer = document.createElement("header");
    titleContainer.textContent = title;

    // Form
    const form = document.createElement("form");

    const formFieldTitle = document.createElement("div");
    formFieldTitle.classList.add("form-field", "field-long");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.placeholder = "My Homework";
    setAttributes(titleInput, {
      id: "text",
      name: "text",
      type: "text",
      maxlength: "30",
    });

    formFieldTitle.append(titleLabel, titleInput);

    form.append(formFieldTitle);

    // Render control buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("overlay-buttons");

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    setAttributes(cancel, {
      id: "cancel_button",
      type: "button",
    });
    // On click hide overlay and clear overlay container children
    cancel.addEventListener("click", () => {
        overlay.removeOverlay();
    })

    const submit = document.createElement("button");
    submit.textContent = "Submit";
    setAttributes(submit, {
      id: "submit_button",
      type: "button",
    });

    buttonsContainer.append(cancel, submit);

    contentContainer.append(titleContainer, form, buttonsContainer);
  },
  toggleOverlayDisplay: () => {
    const overlay = document.getElementById("overlay");

    overlay.style.display === "none"
      ? (overlay.style.display = "flex")
      : (overlay.style.display = "none");
  },
  removeOverlay: () => {
    const overlay = document.getElementById("overlay");
    // Remove all content container child nodes
    overlay.replaceChildren();
    overlay.remove();
  },
};
