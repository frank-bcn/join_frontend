import { Component, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  constructor(
    public ts: TaskService,
    public us: UserService,
    public elementRef: ElementRef
  ) {}

  /**
   * ngOnInit is an Angular lifecycle hook that is called after the component is initialized.
   * In this function, tasks are loaded asynchronously and users are loaded from the server.
   */
  ngOnInit() {
    this.ts.loadTasks().then(() => {});
    this.us.loadUsersFromServer();
  }

  /**
   * Scrolls the content horizontally within the '.dragAndDropWrapper' element.
   * @param direction The direction in which to scroll ('left' or 'right').
   */
  scrollTo(direction: string) {
    let wrapper: HTMLElement = this.elementRef.nativeElement.querySelector(
      '.dragAndDropWrapper'
    );
    let scroll = direction === 'left' ? -304 : 304;
    wrapper.scrollBy({
      left: scroll,
      behavior: 'smooth',
    });
  }

  /**
   * Sets the provided task as the currently open task and updates the status to indicate that a task is open.
   * Also logs a message to the console indicating that a task has been opened.
   * @param task The task to be opened.
   */
  openTasks(task: any) {
    this.ts.openTaskData = task;
    this.ts.openTask = true;
  }

  /**
   * Closes the currently open task by updating the status to indicate that no task is open.
   * Also logs the updated status to the console.
   */
  closeOpenTasks() {
    this.ts.openTask = false;
    this.ts.showMoveOptions = false;
  }

  /**
   * Returns the URL of the image corresponding to the provided priority.
   * @param priority The priority for which to retrieve the image URL.
   * @returns The URL of the image corresponding to the provided priority.
   */
  prioImages(priority: string): string {
    switch (priority) {
      case 'Urgent':
        return '/assets/img/prioUrgent.svg';
      case 'Low':
        return '/assets/img/prioLow.svg';
      case 'Medium':
        return '/assets/img/prioMedium.svg';
      default:
        return '';
    }
  }

  /**
   * Sets up the move options for the specified task.
   * @param taskId The ID of the task to move.
   */
  moveTo(taskId: string) {
    this.ts.taskStatus = this.loadTaskStatus(taskId);
    this.ts.showMoveOptions = true;
  }

  /**
   * Retrieves the status of the task with the specified ID.
   * @param taskId The ID of the task to retrieve the status for.
   * @returns The status of the task, or 'unknown' if the task is not found.
   */
  loadTaskStatus(taskId: string): string {
    const task = this.ts.tasks.find((task) => task.id === taskId);
    return task ? task.status : 'unknown';
  }

  /**
   * Determines the possible status changes based on the current status of a task.
   * @param status The current status of the task.
   * @returns An array of possible status changes.
   */
  possibleStatusChanges(status: string): string[] {
    switch (status) {
      case 'todo':
        return ['inProgress'];
      case 'inProgress':
        return ['todo', 'awaiting'];
      case 'awaiting':
        return ['inProgress', 'done'];
      default:
        return [];
    }
  }

  /**
   * Moves the task to the specified option (status) and updates the task list.
   * @param option The option (status) to which the task will be moved.
   */
  moveToOption(option: string) {
    const taskId = this.ts.openTaskData.id;
    this.ts.dropPhone(taskId, option);
    this.ts.openTask = false;
    this.ts.showMoveOptions = false;
  }

  // es fehlt noch das wenn ein task im handy modus verschoben wurde, das sich dasfeld angezeigt wird
  // es fehlt das ändern vom task
}