export class Task {
    constructor(title, desc, dueDate, priority, group) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.group = group;
    }

    get title() {
        return this._title;
    }
    set title(newTitle) {
        // Input is taken from form
        newTitle = newTitle.trim();
        this._title = newTitle;
    }
}