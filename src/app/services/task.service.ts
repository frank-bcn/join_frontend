import { Input } from '@angular/core';
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

  isUrgent: boolean = false;
  isMedium: boolean = false;
  isLow: boolean = false;

  tasks: any[] = [];
  taskToUpdate: any;
  openTask: boolean = false;
  openAddTaskBoard: boolean = false;

  constructor(
    public us: UserService,
    public router: Router,
    public hs: HoverService,
    private http: HttpClient
  ) {}

  AddUserTask() {
    this.router.navigateByUrl('/addTask');
    this.hs.activeLink = 'addTask';
    this.checkUser(this.us.selectedUser);
    this.updateCheckedStatus();
  }

  updateCheckedStatus() {
    this.us.users.forEach((user) => {
      user.checked = this.us.selectedUsers.some(
        (selectedUser) => selectedUser.user_id === user.user_id
      );
    });
  }

  /**
   * Sets task priority to 'Urgent' and updates related properties.
   * - Sets 'isUrgent' to true, indicating the task has an urgent priority.
   * - Sets 'isMedium' and 'isLow' to false, indicating non-urgent priorities.
   * - Updates task service properties ('clickUrgent', 'clickMedium', 'clickLow') accordingly.
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

  checkUser(user: any) {
    const userIndex = this.us.selectedUsers.findIndex(
      (selectedUser) => selectedUser.user_id === user.user_id
    );

    if (userIndex !== -1) {
      this.us.selectedUsers.splice(userIndex, 1);
      console.log('Benutzer entfernt:', user);
    } else {
      this.us.selectedUsers.push(user);
      console.log('Benutzer hinzugefügt:', user);
    }

    console.log(this.us.selectedUsers);
  }

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
      console.log(
        'Title, Description, Date, Users, Priority, Subtasks, Category, and Color are required'
      );
      return;
    }
    this.createAddTask();
  }

  async createAddTask() {
    const url = environment.baseUrl + '/api/addTask/';
    const body = this.createTaskBody();
    console.log(body);

    try {
      const response = await this.http.post(url, body).toPromise();

      console.log('Task erfolgreich erstellt:', response);
      this.clearInputFields();
      this.clearArray();
      this.openAddTaskBoard = false;
      this.loadBoard();
      this.loadTasks();
    } catch (error) {
      console.error('Fehler beim Erstellen des Tasks:', error);
    }
  }

  createTaskBody(): any {
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
    const category = this.selectedCategory;
    const assignedToIds = this.us.selectedUsers.map((user) => user.user_id);
    const date = (
      document.querySelector('input[name="dateField"]') as HTMLInputElement
    ).value;
    const priority = this.prio();
    const subtasks = this.subtasks;
    const status = 'todo';

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

  clearArray() {
    this.us.selectedUsers = [];
    this.subtasks = [];
    this.isUrgent = false;
    this.isMedium = false;
    this.isLow = false;
  }

  loadBoard() {
    this.router.navigateByUrl('/board');
    this.hs.activeLink = 'board';
  }

  async loadTasks() {
    const url = environment.baseUrl + '/api/loadTasks/';
    try {
      const response = await this.http.get<any[]>(url).toPromise();
      this.tasks = response as any[];
    } catch (error) {
      console.error('Error loading user list:', error);
    }
  }

  deleteTodo(taskId: number) {
    console.log('task deleted:', taskId);
    if (confirm('Are you sure you want to delete this task?')) {
      const url = environment.baseUrl + '/api/deleteTask/';
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

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    const movedTask = event.item.data;
    movedTask.status = newStatus;
    const taskId = movedTask.id;
    this.updateTaskStatus(taskId, newStatus);
    
  }

  updateTaskStatus(taskId: number, newStatus: string) {
    const url = environment.baseUrl + '/api/updateTaskStatus/';
    const body = { id: taskId, status: newStatus };

    this.http
      .put<any>(url, body)
      .toPromise()
      .then((response) => {
        this.loadTasks();
      })
      .catch((error) => {
      });
  }

  updateTaskDeadline(): void {
    this.taskToUpdate = this.tasks.find((task) => task.id === 25);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      this.taskToUpdate.date = currentDate;
      this.updatedTaskPrio();
  }

  updatedTaskPrio(): void {
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    this.http
      .put<any>(url, body)
      .toPromise()
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  openAddTaskPage() {
    this.openAddTaskBoard = true;
  }

  closeAddTaskPage() {
    this.openAddTaskBoard = false;
  }

}
