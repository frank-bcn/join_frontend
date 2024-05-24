import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { UserTaskService } from '../../services/user-task.service';

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

  constructor(
    public ts: TaskService,
    public us: UserService,
    public ut: UserTaskService
  ) {}

  /**
   * ngOnInit is an Angular lifecycle hook that is called after the component is initialized.
   * In this function, users are loaded from the server.
   */
  ngOnInit() {
    this.us.selectedUser;
    this.us.loadUsersFromServer();
    this.ts.clearInputFields();
    this.ts.clearArray();
    this.ut.checkUser(this.us.selectedUser);
    this.ut.updateCheckedStatus();
  }

  /**
   * Toggles the visibility of the category dropdown.
   * Sets the 'isCategoryDropdownOpen' property to true, indicating that the dropdown should be displayed.
   */
  openCategory() {
    this.assignedDropdown = false;
    this.categoryDropdown = !this.categoryDropdown;
  }

  /**
   * Sets the flags to control the visibility of category dropdowns.
   * It hides the category dropdown and shows the new category dropdown.
   */
  createNewCategory() {
    this.categoryDropdown = false;
    this.newCategoryDropdown = true;
  }

  /**
   * Sets the selected color index and updates the selected color.
   * @param color The color string to be selected.
   * @param index The index of the selected color in the color array.
   */
  selectedColor(color: string, index: number) {
    this.selectedColorIndex = index;
    this.color = color;
    console.log(color);
  }

  /**
   * Saves the selected category by updating its name and color properties.
   * It also logs the selected category to the console and hides the new category dropdown.
   */
  saveCategory() {
    this.ts.selectedCategory.name = this.inputValue;
    this.ts.selectedCategory.color = this.color;
    console.log(this.ts.selectedCategory);
    this.newCategoryDropdown = false;
  }

  /**
   * Toggles the visibility of the assigned dropdown and updates the checked status of tasks.
   * If the dropdown is currently visible, it hides it; otherwise, it shows it.
   */
  openAssignedTo() {
    if (!this.assignedDropdown) {
      this.ut.updateCheckedStatus();
    }
    this.categoryDropdown = false;
    this.assignedDropdown = !this.assignedDropdown;
  }

  /**
   * Toggles the visibility of the subtasks dropdown.
   * If the dropdown is currently closed and there is a new subtask entered,
   * it opens the dropdown and adds the new subtask to the list of subtasks.
   * If the dropdown is currently open, it closes it.
   */
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

  /**
   * Retrieves the current date in the format 'YYYY-MM-DD'.
   * @returns The current date in the format 'YYYY-MM-DD'.
   */
  checkDate(): string {
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }
}
