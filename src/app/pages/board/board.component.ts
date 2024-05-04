import { Component, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {

  
  // taskCategories = [
  //   { title: 'Todo', tasks: [] as any[] },
  //   { title: 'In Progress', tasks: [] as any[] },
  //   { title: 'Awaiting Feedback', tasks: [] as any[] },
  //   { title: 'Done', tasks: [] as any[] },
  // ];


  constructor(
    public ts: TaskService,
    public us: UserService,
    public elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.ts.loadTasks().then(() => {
      // this.assignTasksToCategories();
      // console.log(this.taskCategories);
    });
    this.us.loadUsersFromServer();
  }

  scrollTo(direction: string) {
    let wrapper: HTMLElement = this.elementRef.nativeElement.querySelector(
      '.dragAndDropWrapper'
    );
    let scroll = direction === 'left' ? -304 : 304;

    wrapper.scrollBy({
      left: scroll,
      behavior: 'smooth',
    });
  }

 
  // assignTasksToCategories() {
  //   this.ts.tasks.forEach(task => {
  //     let categoryIndex = this.taskCategories.findIndex(category => category.title === task.status);
  //     if (categoryIndex !== -1) {
  //       this.taskCategories[categoryIndex].tasks.push(task);
  //     }
  //   });
  // }
}
