import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HoverService } from '../../services/hover.service';
import { GreetingService } from '../../services/greeting.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  constructor(
    public us: UserService,
    public router: Router,
    public hs: HoverService,
    public gt: GreetingService,
    public ts: TaskService,
  ) {}

  /**
   * ngOnInit is an Angular lifecycle hook that is called after the component is initialized.
   */
  ngOnInit() {
    this.gt.generateGreeting();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.us.authToken = storedToken;
    }
    this.ts.loadTasks();
  }
  

  /**
   * Navigates to the '/board' route using the Angular Router.
   * Updates the active link in the 'hs' (assuming it stands for some service) to 'board'.
   */
  navigateToBoard() {
    this.router.navigateByUrl('/board');
    this.hs.activeLink = 'board';
  }

  /**
   * Sets the 'hoverTodo' property to true, indicating that the todo element is currently being hovered.
   */
  onHoverTodo() {
    this.hs.hoverTodo = true;
  }

  /**
   * Sets the 'hoverTodo' property to false, indicating that the hover state on the todo element has ended.
   */
  onLeaveTodo() {
    this.hs.hoverTodo = false;
  }

  /**
   * Sets the 'hoverDone' property to true, indicating that the associated element is currently being hovered.
   */
  onHover() {
    this.hs.hoverDone = true;
  }

  /**
   * Sets the 'hoverDone' property to false, indicating that the hover state on the associated element has ended.
   */
  onLeave() {
    this.hs.hoverDone = false;
  }

  /**
   * This function filters tasks based on their status and returns the count of tasks with the specified status.
   * @param status The status by which tasks should be filtered.
   * @returns The count of tasks with the specified status.
   */
  countTasksStatus(status: string): number {
    return this.ts.tasks.filter((task) => task.status === status).length;
  }

  /**
   * This function filters tasks based on their priority and returns the count of tasks with the specified priority.
   * @param priority The priority by which tasks should be filtered.
   * @returns The count of tasks with the specified priority.
   */
  countTasksPriority(priority: string): number {
    return this.ts.tasks.filter((task) => task.priority === priority).length;
  }

  /**
   * This function calculates the earliest deadline among tasks with 'Urgent' priority and returns it.
   * If there are no tasks with 'Urgent' priority, it returns null.
   * @returns The earliest deadline among tasks with 'Urgent' priority, or null if there are no such tasks.
   */
  loadUrgentDeadline(): Date | null {
    let urgentTasks = this.ts.tasks.filter(
      (task) => task.priority === 'Urgent'
    );
    if (urgentTasks.length === 0) {
      return null;
    }
    const nextDeadline = new Date(
      Math.min(...urgentTasks.map((task) => new Date(task.date).getTime()))
    );
    return nextDeadline;
  }

  /**
   * This function determines the color based on the number of remaining days.
   * If the remaining days are 2 or less, it returns 'red', otherwise, it returns 'black'.
   * @param remainingDays The number of days remaining until the deadline.
   * @returns The color string ('red' or 'black') based on the number of remaining days.
   */
  remainingDaysColor(remainingDays: number): string {
    return remainingDays <= 2 ? 'red' : 'black';
  }

  /**
   * This function calculates the number of remaining days until the given deadline.
   * @param deadline The deadline date.
   * @returns The number of remaining days until the deadline.
   */
  remainingDaysDeadline(deadline: Date): number {
    const currentDate = new Date();
    const timeDifference = deadline.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }
}