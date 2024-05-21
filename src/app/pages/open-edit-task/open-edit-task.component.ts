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
    this.ts.assignedEditDropdown = true;
  }
}