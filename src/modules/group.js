/* Defines user created task groups (projects) */

export class TaskGroup {
    constructor(title) {
        this.title = title;
        this.taskCollection = [];
    }

    addTask(task) {
        this.taskCollection.push(task);
    }
}