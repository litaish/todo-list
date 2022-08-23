/* Defines user created task groups (projects) */

export class TaskGroup {
  constructor(title, isEditable, uuid) {
    this.title = title;
    this.taskCollection = [];
    this.isEditable = isEditable;
    this.uuid = uuid;
  }

  addTask(task) {
    this.taskCollection.push(task);
  }
}
