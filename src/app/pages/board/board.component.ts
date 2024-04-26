import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  
  constructor(public ts: TaskService){}

  ngOnInit() {
    this.ts.loadTasks();
  }

  getPriorityImageSrc(priority: string): string {
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
}
