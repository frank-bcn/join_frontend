import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TaskService } from '../../../services/task.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrl: './selected-user.component.scss',
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
export class SelectedUserComponent {

  

  constructor(public us: UserService, public ts: TaskService) {}

  ngOnInit() {
    this.checkScreen();
  }

  goBackTo() {
    this.us.selectedUser = null;

    if (!this.us.selectedUser) {
      this.us.changeZIndex(0);
    }
  }

  openEditContact() {
    this.us.editContact = true;
  }

  checkScreen() {
    this.us.mobileScreen = window.innerWidth <= 700;
    console.log(this.us.mobileScreen);
  }
}
