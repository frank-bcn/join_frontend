import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-open-edit-task',
  templateUrl: './open-edit-task.component.html',
  styleUrl: './open-edit-task.component.scss',
})
export class OpenEditTaskComponent {
  constructor(public ts: TaskService, public us: UserService) {}

  /**
   * Closes the edit task interface and resets priority flags.
   */
  closeEditTasks() {
    this.ts.editTask = false;
    this.ts.isUrgent = false;
    this.ts.isMedium = false;
    this.ts.isLow = false;
  }

  /**
   * Closes the edit task interface and resets priority flags.
   */
  openAssignedToEdit() {
    this.ts.assignedEditDropdown = !this.ts.assignedEditDropdown;
    this.userCheckedCheck();
  }

  /**
   * Synchronizes the checked state of users in the user list
   * based on whether they are assigned to the currently open task.
   */
  userCheckedCheck(): void {
    this.us.users.forEach((user) => {
      user.checked = this.ts.openTaskData.assignedTo.includes(user.user_id);
    });
  }

  /**
   * Toggles the assignment of a user to the currently open task based on checkbox events.
   * @param user The user object representing the user being checked or unchecked.
   * @param event The event object containing information about the checkbox event.
   */
  checkUser(user: any, event: any): void {
    if (event) {
      if (!this.ts.openTaskData.assignedTo.includes(user.user_id)) {
        this.ts.openTaskData.assignedTo.push(user.user_id);
      }
    } else {
      const index = this.ts.openTaskData.assignedTo.indexOf(user.user_id);
      if (index > -1) {
        this.ts.openTaskData.assignedTo.splice(index, 1);
      }
    }
    user.checked = event;
  }
}