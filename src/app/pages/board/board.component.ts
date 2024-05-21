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

 


  

  




  

  // es fehlt noch das wenn ein task im handy modus verschoben wurde, das sich dasfeld angezeigt wird
  // es fehlt das ändern vom task
}