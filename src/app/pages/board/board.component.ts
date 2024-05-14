import { Component, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  openTaskData: any;

  constructor(
    public ts: TaskService,
    public us: UserService,
    public elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.ts.loadTasks().then(() => {});
    this.us.loadUsersFromServer();
  }

  scrollTo(direction: string) {
    let wrapper: HTMLElement = this.elementRef.nativeElement.querySelector(
      '.dragAndDropWrapper'
    );
    let scroll = direction === 'left' ? -304 : 304;

    wrapper.scrollBy({
      left: scroll,
      behavior: 'smooth',
    });
  }

  openTasks(task: any) {
    this.openTaskData = task;
    this.ts.openTask = true;
    console.log('Task geöffnet:', task);
  }

  closeOpenTasks() {
    this.ts.openTask = false;
    console.log(this.ts.openTask);
  }

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

  openEditTask() {}
  
}
