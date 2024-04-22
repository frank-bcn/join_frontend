import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HoverService } from './hover.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
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

  createTaskBody(): any {
    const title = (document.querySelector('input[placeholder="enter a Title"]') as HTMLInputElement).value;
    const description = (document.querySelector('textarea[placeholder="enter a description"]') as HTMLTextAreaElement).value;
    const category = this.selectedCategory;
    const assignedTo = this.us.selectedUsers;
    const date = (document.querySelector('input[name="dateField"]') as HTMLInputElement).value;
    const priority = this.prio(); 
    const subtasks = this.subtasks;
  
    return {
      title: title,
      description: description,
      category: category,
      assignedTo: assignedTo,
      date: date,
      priority: priority,
      subtasks: subtasks
    };
  }
  
  async createAddTask() {
    const url = environment.baseUrl + '/api/addTask/';

    const body = this.createTaskBody();
    console.log(body);

    try {
      const response = await this.http.post(url, body).toPromise();

      console.log('Task erfolgreich erstellt:', response);
    } catch (error) {
      console.error('Fehler beim Erstellen des Tasks:', error);
    }
  }
}  
