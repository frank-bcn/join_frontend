import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { DragDropService } from './drag-drop.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  commentText: string = '';
  commentError: boolean = false;

  constructor(
    public ts: TaskService,
    public us: UserService,
    public dd: DragDropService,
    public http: HttpClient
  ) {}

  /**
   * Validates the comment before creating it.
   * If there's no text in the comment field, sets commentError to true.
   * Otherwise, proceeds to create the comment.
   */
  validateComment() {
    if (!this.commentText) {
      this.commentError = true;
    } else {
      this.createComment();
    }
  }

  /**
   * Sends a POST request to the server to create a new comment.
   * Constructs the request body using the commentBody function.
   * Logs an error if the request fails.
   */
  async createComment() {
    const url = environment.baseUrl + '/api/comments/';
    const body = this.commentBody();
    try {
      await this.http.post(url, body).toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Constructs the body of the comment object to be sent as part of the POST request.
   * Returns the comment object.
   */
  commentBody() {
    const comment = {
      taskId: this.ts.openTaskData.id,
      authorId: this.us.userData.id,
      text: this.commentText,
      date: new Date().toISOString(),
      users: this.ts.openTaskData.assignedTo,
    };
    this.ts.comment = false;
    return comment;
  }
}