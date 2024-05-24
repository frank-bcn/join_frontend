import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-open-add-task-board',
  templateUrl: './open-add-task-board.component.html',
  styleUrl: './open-add-task-board.component.scss'
})
export class OpenAddTaskBoardComponent {

  constructor(public ts: TaskService){}

}
