import { Component, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {

  constructor(
    public ts: TaskService,
    public us: UserService,
    public dd: DragDropService,
    public elementRef: ElementRef
  ) {
  }

  /**
   * Initializes the component by loading tasks and users from the server.
   */
  ngOnInit() {
    this.ts.loadTasks().then(() => {
      this.ts.filteredTasks = this.ts.tasks;
      this.us.loadUsersFromServer();
    });
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

}