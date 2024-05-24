import { Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(public ts: TaskService) {}

  createComment() {
    console.log(this.ts.openTaskData);
  }
}
