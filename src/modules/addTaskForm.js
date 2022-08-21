import { pubsub } from "./pubsub";
import { overlay } from "./overlay";
import { setAttributes } from "./utility";

export const addTaskForm = {
  render: (title) => {
    overlay.toggleOverlayDisplay();

    const contentContainer = document.getElementById("overlay_container");

    // Title of overlay form
    const titleContainer = document.createElement("header");
    titleContainer.textContent = title;

    const form = document.createElement("form");

    // Title field
    const formFieldTitle = document.createElement("div");
    formFieldTitle.classList.add("form-field", "field-long");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "task_title");
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.placeholder = "Work Out In The Morning";
    setAttributes(titleInput, {
      id: "task_title",
      name: "task_title",
      type: "text",
      maxlength: "30",
    });

    formFieldTitle.append(titleLabel, titleInput);

    // Description field
    const formFieldDesc = document.createElement("div");
    formFieldDesc.classList.add("form-field", "field-long");

    const descLabel = document.createElement("label");
    titleLabel.setAttribute("for", "task_desc");
    titleLabel.textContent = "Title";

    const descTextarea = document.createElement("textarea");
    descTextarea.placeholder =
      "Wake up at 8:00 AM. Eat breakfast and go to the gym.";
    setAttributes(titleInput, {
      id: "task_desc",
      name: "task_desc",
      type: "text",
      maxlength: "30",
    });

    formFieldDesc.append(descLabel, descTextarea);

    // Due date field
    const formFieldDate = document.createElement("div");
    formFieldDate.classList.add("form-field", "field-short");

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "task_date");
    dateLabel.textContent = "Date Due";

    const dateInput = document.createElement("input");
    setAttributes(dateInput, {
      id: "task_date",
      name: "task_date",
      type: "date",
    });

    formFieldDate.append(dateLabel, dateInput);

    // Priority select
    const formFieldPriority = document.createElement("div");

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "select_priority");
    priorityLabel.textContent = "Priority";

    formFieldPriority.classList.add("form-field", "field-short");
    const selectPriority = document.createElement("select");
    setAttributes(selectPriority, {
        id: "select_priority",
        name: "select_priority"
    });

    const optionLow = document.createElement("option");
    optionLow.setAttribute("value", "priority_low");
    const optionMed = document.createElement("option");
    optionMed.setAttribute("value", "priority_med");
    const optionHigh = document.createElement("high");
    optionHigh.setAttribute("value", "priority_high");

    selectPriority.append(optionLow, optionMed, optionHigh);

    formFieldPriority.append(priorityLabel, selectPriority);
     

    form.append(formFieldTitle, formFieldDesc, formFieldDate, formFieldPriority);

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
      overlay.removeForm();
    });

    const submit = document.createElement("button");
    submit.textContent = "Submit";
    setAttributes(submit, {
      id: "submit_button",
      type: "button",
    });

    submit.addEventListener("click", addTaskForm.add);

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
    console.log(`TASK ADD FORM: just taskAdded "${task}"`);
    pubsub.publish("taskAdded", task);
  },
};
