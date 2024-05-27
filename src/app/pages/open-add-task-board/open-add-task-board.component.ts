import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-open-add-task-board',
  templateUrl: './open-add-task-board.component.html',
  styleUrl: './open-add-task-board.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translate(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translate(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translate(+100%)' })),
      ]),
    ]),
  ],
})
export class OpenAddTaskBoardComponent {

  constructor(public ts: TaskService){}

}
