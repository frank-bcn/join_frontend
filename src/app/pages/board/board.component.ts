import { Component, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  openTaskData: any;

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
    this.openTaskData = task;
    this.ts.openTask = true;
    console.log('Task geöffnet:', task);
  }

  /**
   * Closes the currently open task by updating the status to indicate that no task is open.
   * Also logs the updated status to the console.
   */
  closeOpenTasks() {
    this.ts.openTask = false;
    console.log(this.ts.openTask);
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
   * Retrieves the color associated with a user based on their user ID.
   * @param userId The ID of the user whose color is to be retrieved.
   * @returns The color associated with the user, or 'transparent' if the user is not found.
   */
  loadUserColor(userId: string): string {
    let user = this.us.users.find((user) => user.user_id === userId);
    return user ? user.user_color : 'transparent';
  }

  /**
   * Retrieves the username and initials of a user based on their user ID.
   * @param userId The ID of the user whose username and initials are to be retrieved.
   * @returns An object containing the user's initials and full name, or 'Unknown' if the user is not found.
   */
  loadUsernameTask(userId: string) {
    let user = this.us.users.find((user) => user.user_id === userId);
    if (user) {
      return {
        initials: this.us.employeesInitials(user.username, user.last_name),
        fullName: `${user.username} ${user.last_name}`,
      };
    } else {
      return { initials: 'Unknown', fullName: 'Unknown' };
    }
  }

  openEditTask() {}
}
