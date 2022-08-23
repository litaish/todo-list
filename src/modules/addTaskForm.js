import { pubsub } from "./pubsub";
import { overlay } from "./overlay";
import { setAttributes } from "./utility";
import { v4 as uuidv4 } from 'uuid';

export const addTaskForm = {
  render: (title, group) => {
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
      minlength: "1",
      maxlength: "30",
    });

    formFieldTitle.append(titleLabel, titleInput);

    // Description field
    const formFieldDesc = document.createElement("div");
    formFieldDesc.classList.add("form-field", "field-long");

    const descLabel = document.createElement("label");
    descLabel.setAttribute("for", "task_desc");
    descLabel.textContent = "Description";

    const descTextarea = document.createElement("textarea");
    descTextarea.placeholder =
      "Wake up at 8:00 AM. Eat breakfast and go to the gym.";
    setAttributes(descTextarea, {
      id: "task_desc",
      name: "task_desc",
      type: "text",
      maxlength: "120",
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
    optionLow.textContent = "Low Priority";
    optionLow.setAttribute("value", "priority_low");

    const optionMed = document.createElement("option");
    optionMed.setAttribute("value", "priority_med");
    optionMed.textContent = "Medium Priority";

    const optionHigh = document.createElement("option");
    optionHigh.setAttribute("value", "priority_high");
    optionHigh.textContent = "High Priority";

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

    submit.addEventListener("click", (ev) => {
        addTaskForm.add(ev, group);
    });

    buttonsContainer.append(cancel, submit);

    contentContainer.append(titleContainer, form, buttonsContainer);
  },
  // Publish form data
  add: (ev, group) => {
    // Cancel the default action (submitting the form)
    ev.preventDefault();
    const inputTitle = document.getElementById("task_title");
    let title = inputTitle.value;
    inputTitle.value = "";

    const textareaDesc = document.getElementById("task_desc");
    let desc = textareaDesc.value;
    textareaDesc.value = "";

    const dateDue = document.getElementById("task_date");
    let due = new Date(dateDue.value);
    dateDue.value = "";

    const selectPriority = document.getElementById("select_priority");
    let priority = selectPriority.options[selectPriority.selectedIndex].text;
    selectPriority.value = "";

    // Add all values to object
    const task = {
        uuid: uuidv4(),
        title: title,
        desc: desc,
        due: due,
        priority: priority,
        group: group,
    }

    overlay.removeForm();

    // Publish the form information
    console.log(`TASK ADD FORM: just taskAdded "${task.title}"`);
    pubsub.publish("taskAdded", [task, group]);
  },
};
