export class Task {
    constructor(title, desc, dueDate, priority, group, uuid) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.group = group;
        this.uuid = uuid;
    }
}