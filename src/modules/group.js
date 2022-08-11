/* Defines user created task groups (projects) */

export class TaskGroup {
    constructor(title, isEditable) {
        this.title = title;
        this.taskCollection = [];
        this.isEditable = isEditable;
    }

    addTask(task) {
        this.taskCollection.push(task);
    }
}