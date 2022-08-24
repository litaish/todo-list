import { pubsub } from "./pubsub";
import { overlay } from "./overlay";
import { setAttributes } from "./utility";

export const addGroupForm = {
  render: title => {
    overlay.toggleOverlayDisplay();

    const contentContainer = document.getElementById("overlay_container");

    const titleContainer = document.createElement("header");
    titleContainer.textContent = title;

    const form = document.createElement("form");

    const formFieldTitle = document.createElement("div");
    formFieldTitle.classList.add("form-field", "field-long");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "group_title");
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.placeholder = "My Homework";
    setAttributes(titleInput, {
      id: "group_title",
      name: "group_title",
      type: "text",
      maxlength: "30",
    });

    formFieldTitle.append(titleLabel, titleInput);

    form.append(formFieldTitle);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("overlay-buttons");

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    setAttributes(cancel, {
      id: "cancel_button",
      type: "button",
    });

    cancel.addEventListener("click", () => {
      overlay.removeForm();
    });

    const submit = document.createElement("button");
    submit.textContent = "Submit";
    setAttributes(submit, {
      id: "submit_button",
      type: "button",
    });

    submit.addEventListener("click", addGroupForm.add);

    buttonsContainer.append(cancel, submit);

    contentContainer.append(titleContainer, form, buttonsContainer);
  },
  // Publish form data
  add: ev => {
    // Cancel the default action (submitting the form)
    ev.preventDefault();
    const inputTitle = document.getElementById("group_title");
    let title = inputTitle.value;
    inputTitle.value = "";
    overlay.removeForm();

    // Publish the form information
    pubsub.publish("groupAdded", title);
  },
};
