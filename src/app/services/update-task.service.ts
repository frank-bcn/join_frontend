import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskService {
  taskToUpdate: any;

  constructor(public http: HttpClient, public ts: TaskService) {}

  /**
   * Updates the deadline of a specific task (ID: 25) and triggers the update on the server.
   * This function finds the task with ID 25 from the list of tasks.
   * It then calculates a new deadline date (2 days from the current date) and updates the task's deadline.
   * Finally, it triggers the update of the task on the server.
   */
  updateTaskDeadline25(): void {
    this.taskToUpdate = this.ts.tasks.find((task) => task.id === 25);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    this.taskToUpdate.date = currentDate;
    this.updatedTask25();
  }

  /**
   * Updates the deadline of a specific task (ID: 25) and triggers the update on the server.
   * This function finds the task with ID 25 from the list of tasks.
   * It then calculates a new deadline date (2 days from the current date) and updates the task's deadline.
   * Finally, it triggers the update of the task on the server.
   */
  updatedTask25(): void {
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    this.http.put<any>(url, body).toPromise();
  }

  /**
   * Updates the deadline of a specific task (ID: 26) and triggers the update on the server.
   * This function finds the task with ID 26 from the list of tasks.
   * It then calculates a new deadline date (6 days from the current date) and updates the task's deadline.
   * Finally, it triggers the update of the task on the server.
   */
  updateTaskDeadline26(): void {
    this.taskToUpdate = this.ts.tasks.find((task) => task.id === 26);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 6);
    this.taskToUpdate.date = currentDate;
    this.updatedTask26();
  }

  /**
   * Updates the deadline of a specific task (ID: 26) on the server.
   * This function sends a PUT request to the server to update the deadline of the task with ID 26.
   * It constructs the request body containing the task ID and the new deadline date.
   * The new deadline date is converted to ISO string format for sending in the request.
   * The PUT request is sent to the server to update the task's deadline.
   * Note: This function is currently not handling the response or error from the server.
   */
  updatedTask26(): void {
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    this.http.put<any>(url, body).toPromise();
  }

  /**
   * Updates the deadline of a specific task (ID: 27) and triggers the update on the server.
   * This function finds the task with ID 27 from the list of tasks.
   * It then calculates a new deadline date (12 days from the current date) and updates the task's deadline.
   * Finally, it triggers the update of the task on the server.
   */
  updateTaskDeadline27(): void {
    this.taskToUpdate = this.ts.tasks.find((task) => task.id === 27);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 12);
    this.taskToUpdate.date = currentDate;
    this.updatedTask26();
  }

  /**
   * Updates the deadline of a specific task (ID: 27) on the server.
   * This function sends a PUT request to the server to update the deadline of the task with ID 27.
   * It constructs the request body containing the task ID and the new deadline date.
   * The new deadline date is converted to ISO string format for sending in the request.
   * The PUT request is sent to the server to update the task's deadline.
   * Note: This function is currently not handling the response or error from the server.
   */
  updatedTask27(): void {
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    this.http.put<any>(url, body).toPromise();
  }
}