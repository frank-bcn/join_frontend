import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TaskService } from './task.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskService {
  taskToUpdate: any;

  constructor(public http: HttpClient, public ts: TaskService, public us: UserService) {}

  /**
   * Updates the deadline of a specific task (ID: 25) and triggers the update on the server.
   */
  async updateTaskDeadline25(): Promise<void> {
    if (!this.us.loggedIn) { 
      return;
    }
    this.taskToUpdate = this.ts.tasks.find((task) => task.id === 25);
    if (!this.taskToUpdate) {
      return;
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    this.taskToUpdate.date = currentDate;
    await this.updatedTask27();
  }

  async updatedTask25(): Promise<void> {
    if (!this.us.loggedIn) { 
      return;
    }
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    await this.http.put<any>(url, body).toPromise();
  }

  async updateTaskDeadline26(): Promise<void> {
    if (!this.us.loggedIn) { 
      return;
    }
    this.taskToUpdate = this.ts.tasks.find((task) => task.id === 26);
    if (!this.taskToUpdate) {
      return;
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 6);
    this.taskToUpdate.date = currentDate;
    await this.updatedTask27();
  }

  async updatedTask26(): Promise<void> {
    if (!this.us.loggedIn) { 
      return;
    }
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    await this.http.put<any>(url, body).toPromise();
  }

  async updateTaskDeadline27(): Promise<void> {
    if (!this.us.loggedIn) { 
      return;
    }
    this.taskToUpdate = this.ts.tasks.find((task) => task.id === 27);
    if (!this.taskToUpdate) {
      return;
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 12);
    this.taskToUpdate.date = currentDate;
    await this.updatedTask27();
  }
  

  async updatedTask27(): Promise<void> {
    if (!this.us.loggedIn) { 
      return;
    }
    const url = environment.baseUrl + '/api/updateTaskDeadline/';
    const isoDate = this.taskToUpdate.date.toISOString().split('T')[0];
    const body = { id: this.taskToUpdate.id, date: isoDate };

    await this.http.put<any>(url, body).toPromise();
  }
}
