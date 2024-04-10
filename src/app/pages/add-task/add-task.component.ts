import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  isCategoryDropdownOpen: boolean = false;
  isAssignedDropdownOpen: boolean = false;
  issubtasksDropdownOpen: boolean = false;

  isUrgent: boolean = false;
  isMedium: boolean = false;
  isLow: boolean = false;

  constructor(public ts: TaskService, public us: UserService) {}

  /**
   * Angular lifecycle hook called after the component has been initialized.
   * Initiates the process of loading user data from the server by calling the appropriate service method.
   */
  ngOnInit() {
    this.us.loadUsersFromServer();
  }

  /**
   * Toggles the visibility of the category dropdown.
   * Sets the 'isCategoryDropdownOpen' property to true, indicating that the dropdown should be displayed.
   */
  toggleCategoryDropdown() {
    this.isCategoryDropdownOpen = true;
  }

  /**
   * Toggles the visibility of the assigned-to dropdown.
   * Sets the 'isAssignedDropdownOpen' property to true, indicating that the dropdown should be displayed.
   */
  toggleAssignedDropdown() {
    this.isAssignedDropdownOpen = true;
    this.ts.updateCheckedStatus();
  }

  /**
   * Toggles the visibility of the subtasks dropdown.
   * Sets the 'issubtasksDropdownOpen' property to true, indicating that the dropdown should be displayed.
   */
  togglesubtasksToDropdown() {
    this.issubtasksDropdownOpen = true;
  }

  /**
   * Sets task priority to 'Urgent' and updates related properties.
   * - Sets 'isUrgent' to true, indicating the task has an urgent priority.
   * - Sets 'isMedium' and 'isLow' to false, indicating non-urgent priorities.
   * - Updates task service properties ('clickUrgent', 'clickMedium', 'clickLow') accordingly.
   */
  prioUrgent() {
    this.isUrgent = true;
    this.isMedium = false;
    this.isLow = false;
    this.ts.clickUrgent = false;
    this.ts.clickMedium = true;
    this.ts.clickLow = true;
  }

  /**
   * Sets task priority to 'Medium' and updates related properties.
   * - Sets 'isMedium' to true, indicating the task has a medium priority.
   * - Sets 'isUrgent' and 'isLow' to false, indicating non-medium priorities.
   * - Updates task service properties ('clickUrgent', 'clickMedium', 'clickLow') accordingly.
   */
  prioMedium() {
    this.isMedium = true;
    this.isUrgent = false;
    this.isLow = false;
    this.ts.clickUrgent = true;
    this.ts.clickMedium = false;
    this.ts.clickLow = true;
  }

  /**
   * Sets task priority to 'Low' and updates related properties.
   * - Sets 'isLow' to true, indicating the task has a low priority.
   * - Sets 'isUrgent' and 'isMedium' to false, indicating non-low priorities.
   * - Updates task service properties ('clickUrgent', 'clickMedium', 'clickLow') accordingly.
   */
  prioLow() {
    this.isLow = true;
    this.isUrgent = false;
    this.isMedium = false;
    this.ts.clickUrgent = true;
    this.ts.clickMedium = true;
    this.ts.clickLow = false;
  }
}
