import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  inputValue: string = '';
  color: string = '';

  categoryDropdown: boolean = false;
  newCategoryDropdown: boolean = false;
  selectedColorIndex: number = -1;

  assignedDropdown: boolean = false;
  subtasksDropdown: boolean = false;

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
  openCategory() {
    this.categoryDropdown = !this.categoryDropdown;
  }

  createNewCategory() {
    this.categoryDropdown = false;
    this.newCategoryDropdown = true;
  }

  selectedColor(color: string, index: number) {
    this.selectedColorIndex = index;
    this.color = color;
    console.log(color);
  }

  saveCategory() {
    this.ts.selectedCategory.name = this.inputValue;
    this.ts.selectedCategory.color = this.color;
    console.log(this.ts.selectedCategory);
    this.newCategoryDropdown = false;

    // this.inputValue = this.selectedCategory.name;
    // this.color = this.selectedCategory.color;
  }

  /**
   * Toggles the visibility of the assigned-to dropdown.
   * Sets the 'isAssignedDropdownOpen' property to true, indicating that the dropdown should be displayed.
   */
  openAssignedTo() {
    this.assignedDropdown = !this.assignedDropdown;
    this.ts.updateCheckedStatus();
  }

  openSubtasks() {
    if (!this.subtasksDropdown && this.ts.newSubtask.trim() !== '') {
      this.subtasksDropdown = true;
      if (this.ts.subtasks.length === 0) {
        this.ts.subtasks.push(this.ts.newSubtask);
      } else {
        this.ts.subtasks.push(this.ts.newSubtask);
      }
      this.ts.newSubtask = '';
    } else {
      this.subtasksDropdown = !this.subtasksDropdown;
    }
  }

  /**
   * Sets task priority to 'Urgent' and updates related properties.
   * - Sets 'isUrgent' to true, indicating the task has an urgent priority.
   * - Sets 'isMedium' and 'isLow' to false, indicating non-urgent priorities.
   * - Updates task service properties ('clickUrgent', 'clickMedium', 'clickLow') accordingly.
   */
  prioUrgent() {
    this.ts.isUrgent = true;
    this.ts.isMedium = false;
    this.ts.isLow = false;
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
    this.ts.isMedium = true;
    this.ts.isUrgent = false;
    this.ts.isLow = false;
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
    this.ts.isLow = true;
    this.ts.isUrgent = false;
    this.ts.isMedium = false;
    this.ts.clickUrgent = true;
    this.ts.clickMedium = true;
    this.ts.clickLow = false;
  }

  checkDate(): string {
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }
}
