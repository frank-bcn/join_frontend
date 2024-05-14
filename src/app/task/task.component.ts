import { Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task: any; 

  constructor(public ts: TaskService, public us: UserService) { }


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

  loadUserColor(userId: string): string {
    let user = this.us.users.find((user) => user.user_id === userId);
    return user ? user.user_color : 'transparent';
  }

  loadUsernameTask(userId: string)  {
    let user = this.us.users.find((user) => user.user_id === userId);
    if (user) {
      return `${this.us.employeesInitials(user.username, user.last_name)}`;
    } else {
      return 'Unknown';
    }
  } 
}