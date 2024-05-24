import { Component } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  constructor(
    public cs: CommentService,
    public ts: TaskService
  ) {}

}
