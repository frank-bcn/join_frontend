import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  /**
   * Input decorator indicating that the `task` property is an input property of the component.
   */
  @Input() task: any;

  constructor(public ts: TaskService, public us: UserService) {}

  /**
   * Returns the path to the priority image based on the priority level.
   * @param priority The priority level of the task.
   * @returns The path to the corresponding priority image.
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
   * Retrieves the color associated with a user based on the user's ID.
   * @param userId The ID of the user whose color is to be retrieved.
   * @returns The color associated with the user, or 'transparent' if the user is not found.
   */
  loadUserColor(userId: string): string {
    let user = this.us.users.find((user) => user.user_id === userId);
    return user ? user.user_color : 'transparent';
  }

  /**
   * Retrieves the username or initials associated with a user based on the user's ID.
   * If the user is found, it returns the initials generated from the user's first and last names.
   * If the user is not found, it returns 'Unknown'.
   * @param userId The ID of the user whose username or initials are to be retrieved.
   * @returns The username or initials associated with the user, or 'Unknown' if the user is not found.
   */
  loadUsernameTask(userId: string) {
    let user = this.us.users.find((user) => user.user_id === userId);
    if (user) {
      return `${this.us.employeesInitials(user.username, user.last_name)}`;
    } else {
      return 'Unknown';
    }
  }

  /**
   * Checks if the user with the given ID exists.
   * @param userId The ID of the user to check.
   * @returns True if the user exists, false otherwise.
   */
  userValid(userId: string): boolean {
    return this.us.users.some((user) => user.user_id === userId);
  }
}
