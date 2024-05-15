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

  /**
   * ngOnInit is an Angular lifecycle hook that is called after the component is initialized.
   * In this function, it checks the screen size to perform any necessary actions.
   */
  ngOnInit() {
    this.checkScreen();
  }

  /**
   * Clears the selected user and adjusts the z-index if no user is selected.
   * It resets the selected user to null and adjusts the z-index to the default value if no user is selected.
   */
  goBackTo() {
    this.us.selectedUser = null;
    if (!this.us.selectedUser) {
      this.us.changeZIndex(0);
    }
  }

  /**
   * Sets the flag to indicate that editing a contact is initiated.
   * It sets the 'editContact' flag in the 'us' service to true.
   */
  openEditContact() {
    this.us.editContact = true;
  }

  /**
   * Checks the screen width to determine if it's a mobile screen.
   * It sets the 'mobileScreen' flag in the 'us' service based on the screen width.
   * Additionally, it logs the value of 'mobileScreen' to the console.
   */
  checkScreen() {
    this.us.mobileScreen = window.innerWidth <= 700;
  }
}