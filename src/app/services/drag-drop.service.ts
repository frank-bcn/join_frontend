import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  constructor(public ts: TaskService, public http: HttpClient) {}

  /**
   * Handles the drop event when a task is moved to a new status column.
   * This function is triggered when a task is dropped into a new status column in the task board.
   * It updates the status of the moved task locally and sends a request to the server to update the status.
   * @param event The drop event containing information about the dropped task.
   * @param newStatus The new status column to which the task is moved.
   */
  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    let movedTask = event.item.data;
    movedTask.status = newStatus;
    let taskId = movedTask.id;
    this.updateTaskStatus(taskId, newStatus);
    this.ts.comment = true;
  }

  /**
   * Updates the status of a task by sending a PUT request to the server.
   * This function sends a PUT request to the server to update the status of a task.
   * If the request is successful, it reloads the tasks list to reflect the changes.
   * If an error occurs during the request, it catches the error.
   * @param taskId The ID of the task to be updated.
   * @param newStatus The new status of the task.
   */
  updateTaskStatus(taskId: number, newStatus: string) {
    const url = environment.baseUrl + '/api/updateTaskStatus/';
    const body = { id: taskId, status: newStatus };
    this.http
      .put<any>(url, body)
      .toPromise()
      .then((response) => {
        this.ts.loadTasks();
      })
      .catch((error) => {});
  }

  /**
   * Drops (moves) the task to the specified new status.
   * @param taskId The ID of the task to be moved.
   * @param newStatus The new status to which the task will be moved.
   */
  dropPhone(taskId: any, newStatus: string) {
    const url = environment.baseUrl + '/api/updateTaskStatus/';
    const body = { id: taskId, status: newStatus };
    this.http
      .put<any>(url, body)
      .toPromise()
      .then((response) => {
        this.ts.comment = true;
        this.ts.loadTasks().then(() => {
          this.ts.loadBoard();
        });
      })
      .catch((error) => {});
  }
}