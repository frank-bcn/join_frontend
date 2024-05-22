import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HoverService } from './hover.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskTitle: string = '';
  taskDescription: string = '';
  dateInputValue: string = '';
  clickUrgent = true;
  clickMedium = true;
  clickLow = true;
  subtasks: string[] = [];
  newSubtask: string = '';
  categoryColors: string[] = [
    '#FFD700',
    '#98FB98',
    '#FFB6C1',
    '#87CEEB',
    '#FFA07A',
    '#FF69B4',
    '#B0C4DE',
    '#D8BFD8',
  ];
  selectedCategory = {
    name: '',
    color: '',
  };
  openTaskData: any;
  isUrgent: boolean = false;
  isMedium: boolean = false;
  isLow: boolean = false;
  tasks: any[] = [];
  openTask: boolean = false;
  openAddTaskBoard: boolean = false;
  taskStatus: string = '';
  editTask: boolean = false;
  assignedEditDropdown: boolean = false;
  taskPriority: string = '';
  showMoveOptions: boolean = false;

  constructor(
    public us: UserService,
    public router: Router,
    public hs: HoverService,
    public http: HttpClient
  ) {}

  /**
   * Navigates to the "addTask" route and performs additional actions related to adding a task.
   * This function navigates to the "addTask" route using the Angular router.
   * It also sets the active link in the navigation bar to "addTask".
   * Additionally, it checks if a user is selected and updates the checked status.
   */
  AddUserTask() {
    this.router.navigateByUrl('/addTask');
    this.hs.activeLink = 'addTask';
    this.checkUser(this.us.selectedUser);
    this.updateCheckedStatus();
  }

  /**
   * Updates the 'checked' status of users based on whether they are selected.
   * This function iterates over each user in the user list and checks if they are selected.
   * It sets the 'checked' property of each user to true if they are selected, and false otherwise.
   */
  updateCheckedStatus() {
    this.us.users.forEach((user) => {
      user.checked = this.us.selectedUsers.some(
        (selectedUser) => selectedUser.user_id === user.user_id
      );
    });
  }

  /**
   * Determines the priority level based on the boolean flags isUrgent, isMedium, and isLow.
   * This function evaluates the boolean flags isUrgent, isMedium, and isLow to determine the priority level.
   * It returns a priority level string: 'Urgent', 'Medium', 'Low', or an empty string if no priority level is set.
   * @returns A string indicating the priority level.
   */
  prio(): string {
    if (this.isUrgent) {
      return 'Urgent';
    } else if (this.isMedium) {
      return 'Medium';
    } else if (this.isLow) {
      return 'Low';
    } else {
      return '';
    }
  }

  /**
   * Checks or unchecks a user in the list of selected users.
   * This function checks if the specified user is already in the list of selected users.
   * If the user is found in the list, it removes the user from the list (unchecks).
   * If the user is not found in the list, it adds the user to the list (checks).
   * @param user The user object to be checked or unchecked.
   */
  checkUser(user: any) {
    const userIndex = this.us.selectedUsers.findIndex(
      (selectedUser) => selectedUser.user_id === user.user_id
    );
    if (userIndex !== -1) {
      this.us.selectedUsers.splice(userIndex, 1);
    } else {
      this.us.selectedUsers.push(user);
    }
  }

  /**
   * Validates the task input fields before creating and adding a new task.
   * This function checks if all required input fields are filled out and selections are made
   * before proceeding to create and add a new task.
   * If any of the required fields are empty or not selected, the function returns early.
   * Otherwise, it proceeds to create and add a new task.
   */
  validateTask() {
    if (
      !this.taskTitle ||
      !this.taskDescription ||
      this.us.selectedUsers.length === 0 ||
      !this.dateInputValue ||
      (!this.isUrgent && !this.isMedium && !this.isLow) ||
      this.subtasks.length === 0 ||
      !this.selectedCategory.name ||
      !this.selectedCategory.color
    ) {
      return;
    }
    this.createAddTask();
  }

  /**
   * Creates and adds a new task by sending a POST request to the server.
   * This function constructs the request body for creating a new task,
   * sends a POST request to the server, and handles the response.
   * If the request is successful, it clears input fields, closes the add task board,
   * and reloads the task board and task list to reflect the changes.
   * If an error occurs during the request, it catches the error.
   */
  async createAddTask() {
    const url = environment.baseUrl + '/api/task/';
    const body = this.createTaskBody();
    try {
      await this.http.post(url, body).toPromise();
      this.clearInputFields();
      this.clearArray();
      this.openAddTaskBoard = false;
      this.loadBoard();
      this.loadTasks();
    } catch (error) {}
  }

  /**
   * Constructs the request body for creating a new task.
   * @returns {any} The request body containing task details.
   */
  createTaskBody(): any {
    const { title, description, date } = this.basicTaskDetails();
    const { category, assignedToIds, priority, subtasks, status } =
      this.additionalTaskDetails();

    return {
      title: title,
      description: description,
      category: category,
      assignedTo: assignedToIds,
      date: date,
      priority: priority,
      subtasks: subtasks,
      status: status,
    };
  }

  /**
   * Retrieves basic task details from HTML input elements.
   * @returns title, description and date the basic task details.
   */
  basicTaskDetails() {
    const title = (
      document.querySelector(
        'input[placeholder="enter a Title"]'
      ) as HTMLInputElement
    ).value;
    const description = (
      document.querySelector(
        'textarea[placeholder="enter a description"]'
      ) as HTMLTextAreaElement
    ).value;
    const date = (
      document.querySelector('input[name="dateField"]') as HTMLInputElement
    ).value;
    return { title, description, date };
  }

  /**
   * Gathers additional details of a task.
   * @returns category, assignedToIds, prioity ,subtasks and status additional task details.
   */
  additionalTaskDetails() {
    const category = this.selectedCategory;
    const assignedToIds = this.us.selectedUsers.map((user) => user.user_id);
    const priority = this.prio();
    const subtasks = this.subtasks;
    const status = 'todo';

    return { category, assignedToIds, priority, subtasks, status };
  }

  /**
   * Clears the input fields related to task creation.
   */
  clearInputFields() {
    (
      document.querySelector(
        'input[placeholder="enter a Title"]'
      ) as HTMLInputElement
    ).value = '';
    (
      document.querySelector(
        'textarea[placeholder="enter a description"]'
      ) as HTMLTextAreaElement
    ).value = '';
    (
      document.querySelector('input[name="dateField"]') as HTMLInputElement
    ).value = '';
  }

  /**
   * Clears the arrays and boolean flags related to task creation.
   * This function resets the arrays and boolean flags used during task creation to their initial state.
   * It empties the array of selected users, subtasks, and resets the priority level flags to false.
   */
  clearArray() {
    this.us.selectedUsers = [];
    this.subtasks = [];
    this.isUrgent = false;
    this.isMedium = false;
    this.isLow = false;
  }

  /**
   * Navigates to the "board" route and sets the active link accordingly.
   * This function navigates to the "board" route using the Angular router.
   * It also sets the active link in the navigation bar to "board".
   */
  loadBoard() {
    this.router.navigateByUrl('/board');
    this.hs.activeLink = 'board';
  }

  /**
   * Loads tasks from the server.
   * This function sends a GET request to the server to fetch tasks data.
   * If the request is successful, it updates the 'tasks' array with the received data.
   * If an error occurs during the request, it catches the error and logs it.
   */
  async loadTasks() {
    const url = environment.baseUrl + '/api/task/';
    try {
      const response = await this.http.get<any[]>(url).toPromise();
      this.tasks = response as any[];
    } catch (error) {
      console.error('Error loading user list:', error);
    }
  }

  /**
   * Deletes a task by sending a DELETE request to the server.
   * This function prompts the user to confirm the deletion of the task.
   * If the user confirms, it sends a DELETE request to the server to delete the task.
   * After successful deletion, it reloads the tasks list and closes the task view.
   * If an error occurs during the request, it logs the error.
   * @param taskId The ID of the task to be deleted.
   */
  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      const url = environment.baseUrl + '/api/task/';
      this.http
        .delete<any>(url, { body: { id: taskId } })
        .toPromise()
        .then((response) => {
          this.loadTasks();
          this.openTask = false;
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
  }

  /**
   * Handles the drop event when a task is moved to a new status column.
   * This function is triggered when a task is dropped into a new status column in the task board.
   * It updates the status of the moved task locally and sends a request to the server to update the status.
   * @param event The drop event containing information about the dropped task.
   * @param newStatus The new status column to which the task is moved.
   */
  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    let movedTask = event.item.data;
    movedTask.status = newStatus;
    let taskId = movedTask.id;
    this.updateTaskStatus(taskId, newStatus);
  }

  /**
   * Updates the status of a task by sending a PUT request to the server.
   * This function sends a PUT request to the server to update the status of a task.
   * If the request is successful, it reloads the tasks list to reflect the changes.
   * If an error occurs during the request, it catches the error.
   * @param taskId The ID of the task to be updated.
   * @param newStatus The new status of the task.
   */
  updateTaskStatus(taskId: number, newStatus: string) {
    const url = environment.baseUrl + '/api/updateTaskStatus/';
    const body = { id: taskId, status: newStatus };
    this.http
      .put<any>(url, body)
      .toPromise()
      .then((response) => {
        this.loadTasks();
      })
      .catch((error) => {});
  }

  /**
   * Drops (moves) the task to the specified new status.
   * @param taskId The ID of the task to be moved.
   * @param newStatus The new status to which the task will be moved.
   */
  dropPhone(taskId: any, newStatus: string) {
    const url = environment.baseUrl + '/api/updateTaskStatus/';
    const body = { id: taskId, status: newStatus };
    this.http
      .put<any>(url, body)
      .toPromise()
      .then((response) => {
        this.loadTasks();
        this.loadBoard();
      })
      .catch((error) => {});
  }

  /**
   * Opens the add task page by setting the flag to indicate that the add task board should be open.
   * This function sets the `openAddTaskBoard` flag to `true`, which triggers the display of the add task board.
   */
  openAddTaskPage() {
    this.openAddTaskBoard = true;
  }

  /**
   * Closes the add task page by setting the flag to indicate that the add task board should be closed.
   * This function sets the `openAddTaskBoard` flag to `false`, which hides the add task board.
   */
  closeAddTaskPage() {
    this.openAddTaskBoard = false;
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

  /**
   * Opens the edit task form, hiding the task details and move options.
   * Sets the editTask flag to true.
   * Checks the status of the open task.
   */
  openEditTask() {
    this.openTask = false;
    this.showMoveOptions = false;
    this.editTask = true;
    this.checkTaskStatus();
    console.log(this.openTaskData);
  }

  /**
   * Checks the status of the open task for editing.
   * Loads the task status and updates the priority flags accordingly.
   */
  checkTaskStatus(): void {
    const taskStatus = this.loadTaskEditStatus();
    this.isUrgent = false;
    this.isMedium = false;
    this.isLow = false;

    if (taskStatus === 'Urgent') {
      this.isUrgent = true;
    } else if (taskStatus === 'Medium') {
      this.isMedium = true;
    } else if (taskStatus === 'Low') {
      this.isLow = true;
    }
  }

  /**
   * Loads the priority of the open task for editing.
   * Returns the priority of the open task.
   */
  loadTaskEditStatus(): string {
    return this.openTaskData.priority;
  }

  /**
   * Changes the priority of the open task and updates the UI accordingly.
   * @param priority - The new priority for the task.
   */
  changePriority(priority: string): void {
    this.openTaskData.priority = priority;
    this.taskPriority = priority;
    this.checkTaskStatus();
  }

  /**
   * Sends a PUT request to update an existing task with the edited details.
   * Closes the edit task view and assigned user edit dropdown after the update.
   */
  async changetask() {
    const url = environment.baseUrl + '/api/task/';
    const body = {
      id: this.openTaskData.id,
      title: this.openTaskData.title,
      description: this.openTaskData.description,
      date: this.openTaskData.date,
      priority: this.openTaskData.priority,
      assignedTo: this.openTaskData.assignedTo,
      category: this.openTaskData.category,
    };
    this.http.put<any>(url, body).toPromise();
    this.assignedEditDropdown = false;
    this.editTask = false;
  }
}