import { Component, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {

  constructor(
    public ts: TaskService,
    public us: UserService,
    public elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.ts.loadTasks().then(() => {
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
}
